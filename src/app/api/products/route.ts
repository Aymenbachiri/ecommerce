import { prisma } from "@/lib/db/prisma";
import {
  createProductSchema,
  productFiltersSchema,
} from "@/lib/validation/api-validation";
import { NextResponse, type NextRequest } from "next/server";
import { requireAuth } from "@/lib/api/require-auth";
import type { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());

  const parseResult = productFiltersSchema.safeParse({
    ...params,
    minPrice: params.minPrice ? Number(params.minPrice) : undefined,
    maxPrice: params.maxPrice ? Number(params.maxPrice) : undefined,
    inStock: params.inStock === "true",
    featured: params.featured === "true",
    page: params.page ? Number(params.page) : undefined,
    limit: params.limit ? Number(params.limit) : undefined,
  });

  if (!parseResult.success) {
    return NextResponse.json(
      {
        error: "Invalid query parameters",
        details: parseResult.error.format(),
      },
      { status: 400 },
    );
  }

  const {
    page,
    limit,
    search,
    categoryId,
    minPrice,
    maxPrice,
    inStock,
    featured,
    sortBy,
    sortOrder,
  } = parseResult.data;

  const where: Prisma.ProductWhereInput = { published: true };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  if (categoryId) {
    where.categories = { some: { categoryId } };
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  if (inStock) {
    where.stock = { gt: 0 };
  }

  if (featured !== undefined) {
    where.featured = featured;
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput;
  switch (sortBy) {
    case "name":
      orderBy = { name: sortOrder };
      break;
    case "price":
      orderBy = { price: sortOrder };
      break;
    case "rating":
      orderBy = { reviews: { _count: sortOrder } };
      break;
    default:
      orderBy = { createdAt: sortOrder };
  }

  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        orderBy,
        skip,
        take: limit,
        include: {
          images: { orderBy: { order: "asc" } },
          categories: { include: { category: true } },
          reviews: { where: { published: true }, select: { rating: true } },
        },
      }),
      prisma.product.count({ where }),
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

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json(
      {
        data: productsWithRating,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/products", error);
    return NextResponse.json(
      { error: "Failed to get products", message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  await requireAuth();

  const body = await request.json();
  const parseResult = createProductSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parseResult.error.format() },
      { status: 400 },
    );
  }

  const { categoryIds, images, ...productData } = parseResult.data;

  try {
    const product = await prisma.product.create({
      data: {
        ...(productData as Omit<
          Prisma.ProductCreateInput,
          "categories" | "images"
        >),
        categories: {
          create: categoryIds.map((categoryId) => ({
            category: { connect: { id: categoryId } },
          })),
        },
        ...(images && images.length > 0
          ? {
              images: {
                create: images as Prisma.ProductImageCreateManyProductInput[],
              },
            }
          : {}),
      },
      include: { images: true, categories: { include: { category: true } } },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products", error);
    return NextResponse.json(
      { error: "Failed to add product", message: (error as Error).message },
      { status: 500 },
    );
  }
}
