import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

import { requireAuth } from "@/lib/api/require-auth";

export async function GET() {
  try {
    await requireAuth();

    const categories = await prisma.category.findMany({
      include: { subcategories: true },
    });

    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("GET /api/products/categories", error);
    return NextResponse.json(
      {
        error: "Failed to get categories",
        message: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
