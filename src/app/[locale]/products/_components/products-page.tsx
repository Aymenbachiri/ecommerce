"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { Button } from "@/components/ui/button";
import {
  searchQueryAtom,
  selectedCategoryAtom,
  sortByAtom,
} from "@/lib/store/store";
import { useTranslations } from "next-intl";
import { ProductsSkeleton } from "./products-skeleton";
import type { ProductWithRelations } from "@/lib/types/types";
import { API_URL } from "@/lib/env/env";
import { PackageX } from "lucide-react";

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

export function ProductsPage(): React.JSX.Element {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy] = useAtom(sortByAtom);
  const t = useTranslations("ProductsPage");

  const fetchProducts = async () => {
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
        ` ${API_URL}/api/products?${params.toString()}`,
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
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const paginatedProducts = products;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Filters />
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {t("showingProducts", {
                  count: paginatedProducts.length,
                })}
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <ProductsSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.length === 0 ? (
                    <section className="text-muted-foreground flex flex-col items-center justify-center space-y-4 py-10 text-center">
                      <PackageX className="h-12 w-12 text-gray-400" />
                      <p>{t("noProducts")}</p>
                    </section>
                  ) : (
                    paginatedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))
                  )}
                </div>

                {totalPages > 1 && (
                  <section className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      {t("previous")}
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i + 1}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      {t("next")}
                    </Button>
                  </section>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
