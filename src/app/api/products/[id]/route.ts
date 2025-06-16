import { requireAuth } from "@/lib/api/require-auth";
import { prisma } from "@/lib/db/prisma";
import { updateProductSchema } from "@/lib/validation/api-validation";
import { Prisma } from "@prisma/client";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();

  if (!id) {
    return NextResponse.json(
      { error: "Missing product ID in URL" },
      { status: 400 },
    );
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: { orderBy: { order: "asc" } },
        categories: { include: { category: true } },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET /api/products/[id]", error);
    return NextResponse.json(
      { error: "Failed to fetch product", message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  await requireAuth();

  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  if (!id) {
    return NextResponse.json(
      { error: "Missing product ID in URL" },
      { status: 400 },
    );
  }

  const body = await request.json();
  const parseResult = updateProductSchema.safeParse({ ...body, id });

  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid request body", details: parseResult.error.format() },
      { status: 400 },
    );
  }

  const { id: productId, categoryIds, images, ...data } = parseResult.data;

  try {
    const categoryUpdates = categoryIds
      ? {
          categories: {
            deleteMany: {},
            create: categoryIds.map((cid) => ({
              category: { connect: { id: cid } },
            })),
          },
        }
      : {};

    const imageUpdates = images
      ? {
          images: {
            deleteMany: {},
            create: images.map((img) => ({
              url: img.url,
              alt: img.alt,
              order: img.order,
            })),
          },
        }
      : {};

    const updated = await prisma.product.update({
      where: { id: productId },
      data: {
        ...(data as Omit<Prisma.ProductUpdateInput, "categories" | "images">),
        ...categoryUpdates,
        ...imageUpdates,
      },
      include: {
        images: true,
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT /api/products/[id]", error);
    return NextResponse.json(
      { error: "Failed to update product", message: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  await requireAuth();

  const { pathname } = new URL(request.url);
  const id = pathname.split("/").pop();
  if (!id) {
    return NextResponse.json(
      { error: "Missing product ID in URL" },
      { status: 400 },
    );
  }

  try {
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true }, { status: 204 });
  } catch (error) {
    console.error("DELETE /api/products/[id]", error);
    return NextResponse.json(
      { error: "Failed to delete product", message: (error as Error).message },
      { status: 500 },
    );
  }
}
