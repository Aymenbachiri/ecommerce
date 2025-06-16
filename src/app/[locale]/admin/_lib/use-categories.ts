import type { Category } from "@/lib/types/types";
import { productCategories } from "@/lib/utils/utils";
import { useState, useEffect } from "react";

type UseCategoriesReturn = {
  categories: Category[];
  loading: boolean;
};

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = async () => {
    try {
      setCategories(productCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading };
}
