import { API_URL } from "@/lib/env/env";
import type { ProductWithRelations } from "@/lib/types/types";

export async function getProduct(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}`);
    const data: ProductWithRelations = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
