import { API_URL } from "@/lib/env/env";
import {
  searchQueryAtom,
  selectedCategoryAtom,
  sortByAtom,
} from "@/lib/store/store";
import type { ProductWithRelations } from "@/lib/types/types";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const PRODUCTS_PER_PAGE = 3;

type ApiResponse = {
  data: ProductWithRelations[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
};

type UseProductsReturn = {
  t: ReturnType<typeof useTranslations>;
  paginatedProducts: ProductWithRelations[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export function useProducts(): UseProductsReturn {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy] = useAtom(sortByAtom);
  const t = useTranslations("ProductsPage");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      params.append("page", currentPage.toString());
      params.append("limit", PRODUCTS_PER_PAGE.toString());

      if (searchQuery?.trim()) {
        params.append("search", searchQuery.trim());
      }

      if (selectedCategory && selectedCategory !== "all") {
        params.append("categoryId", selectedCategory);
      }

      if (sortBy) {
        switch (sortBy) {
          case "price-low":
            params.append("sortBy", "price");
            params.append("sortOrder", "asc");
            break;
          case "price-high":
            params.append("sortBy", "price");
            params.append("sortOrder", "desc");
            break;
          case "rating":
            params.append("sortBy", "rating");
            params.append("sortOrder", "desc");
            break;
          case "name":
            params.append("sortBy", "name");
            params.append("sortOrder", "asc");
            break;
          default:
            params.append("sortBy", "createdAt");
            params.append("sortOrder", "desc");
        }
      }

      const response = await fetch(
        `${API_URL}/api/products?${params.toString()}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      setProducts(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const paginatedProducts = products;

  return {
    t,
    paginatedProducts,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
