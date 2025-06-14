"use client";

import { useState, useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data/data";
import type { ProductWithRelations } from "@/lib/types/types";
import {
  searchQueryAtom,
  selectedCategoryAtom,
  sortByAtom,
} from "@/lib/store/store";
import { useTranslations } from "next-intl";
import { ProductsSkeleton } from "./products-skeleton";

const PRODUCTS_PER_PAGE = 3;

export function ProductsPage(): React.JSX.Element {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy] = useAtom(sortByAtom);
  const t = useTranslations("ProductsPage");

  useEffect(() => {
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) =>
        product.categories.some(
          (catOnProd) => catOnProd.category.slug === selectedCategory,
        ),
      );
    }

    const sortedProducts = [...filtered];

    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sortedProducts.sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0),
        );
        break;
      case "name":
      default:
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return sortedProducts;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredAndSortedProducts.slice(
      startIndex,
      startIndex + PRODUCTS_PER_PAGE,
    );
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / PRODUCTS_PER_PAGE,
  );

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
                  count: filteredAndSortedProducts.length,
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
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center gap-2">
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
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
