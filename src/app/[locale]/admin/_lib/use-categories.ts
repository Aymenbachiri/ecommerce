import { mockCategories } from "@/lib/data/data";
import { useState, useEffect } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type UseCategoriesReturn = {
  categories: Category[];
  loading: boolean;
};

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setCategories(mockCategories);
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
