import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { searchSchema } from "@/lib/validation/api-validation";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    const { query, category, page, limit } = searchSchema.parse({
      ...params,
      page: params.page ? Number(params.page) : undefined,
      limit: params.limit ? Number(params.limit) : undefined,
    });

    const skip = (page - 1) * limit;

    const productWhere = {
      published: true,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    };

    if (category) {
      productWhere.categories = { some: { categoryId: category } };
    }

    const [products, productTotal, categories] = await Promise.all([
      prisma.product.findMany({
        where: productWhere,
        skip,
        take: limit,
        include: {
          images: { take: 1, orderBy: { order: "asc" } },
          categories: { include: { category: true } },
          reviews: { where: { published: true }, select: { rating: true } },
        },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      }),
      prisma.product.count({ where: productWhere }),
      prisma.category.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        take: 10,
      }),
    ]);

    const productsWithRating = products.map((product) => ({
      ...product,
      averageRating:
        product.reviews.length > 0
          ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            product.reviews.length
          : 0,
      reviewCount: product.reviews.length,
    }));

    return NextResponse.json(
      {
        products: {
          data: productsWithRating,
          total: productTotal,
          pagination: {
            page,
            limit,
            total: productTotal,
            totalPages: Math.ceil(productTotal / limit),
            hasMore: skip + limit < productTotal,
          },
        },
        categories,
        query,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/search", error);
    return NextResponse.json(
      { error: "Failed to get products", message: (error as Error).message },
      { status: 500 },
    );
  }
}
