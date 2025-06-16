"use client";

import { motion } from "motion/react";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { Button } from "@/components/ui/button";
import { ProductsSkeleton } from "./products-skeleton";
import { PackageX } from "lucide-react";
import { useProducts } from "../_lib/use-products";

export function ProductsPage(): React.JSX.Element {
  const {
    t,
    paginatedProducts,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useProducts();

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
