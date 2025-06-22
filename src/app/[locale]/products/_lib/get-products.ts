import { API_URL } from "@/lib/env/env";

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
