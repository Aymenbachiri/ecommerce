import { API_URL } from "@/lib/env/env";
import type { ProductWithRelations } from "@/lib/types/types";

type ApiResponse = {
  data: { products: ProductWithRelations[] };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
};

type getProductsReturnType = Promise<ProductWithRelations[] | undefined>;

export async function getProducts(): getProductsReturnType {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    const data: ApiResponse = await res.json();
    return data.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
