import type { Category } from "@/lib/types/types";
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
      const mockCategories: Category[] = [
        {
          id: "684ed955d04a123e49ea3add",
          name: "Electronics",
          slug: "electronics",
          parentId: null,
          createdAt: new Date("2025-06-15T10:00:00Z"),
          updatedAt: new Date("2025-06-15T10:00:00Z"),
          description: "Electronics and gadgets",
          image: "",
        },
        {
          id: "684edb90d04a123e49ea3ae0",
          name: "Clothing",
          slug: "clothing",
          parentId: null,
          createdAt: new Date("2025-06-15T11:00:00Z"),
          updatedAt: new Date("2025-06-15T11:00:00Z"),
          description: "Clothing and apparel",
          image: "",
        },
        {
          id: "684edc47d04a123e49ea3ae3",
          name: "Books",
          slug: "books",
          parentId: null,
          createdAt: new Date("2025-06-15T12:00:00Z"),
          updatedAt: new Date("2025-06-15T12:00:00Z"),
          description: "Books and literature",
          image: "",
        },
        {
          id: "684edcadd04a123e49ea3ae5",
          name: "Home & Garden",
          slug: "home-garden",
          parentId: null,
          createdAt: new Date("2025-06-15T13:00:00Z"),
          updatedAt: new Date("2025-06-15T13:00:00Z"),
          description: "Home and garden supplies",
          image: "",
        },
      ];

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
