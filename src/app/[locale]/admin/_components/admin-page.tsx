"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockAnalytics } from "@/lib/data/data";
import { productsAtom } from "@/lib/store/store";
import type { ProductWithRelations } from "@/lib/types/types";
import { useAtom } from "jotai";
import {
  BarChart3,
  DollarSign,
  Edit,
  Package,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { type CreateProductInput } from "@/lib/validation/api-validation";
import { ProductForm } from "./product-form";

export function AdminPage(): React.JSX.Element {
  const t = useTranslations("AdminPage");
  const locale = useLocale();
  const [products, setProducts] = useAtom(productsAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ProductWithRelations | null>(null);

  const createProduct = async (data: CreateProductInput) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      const newProduct = await response.json();

      setProducts([...products, newProduct]);

      toast.success(t("ToastMessages.productCreated"));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create product",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: ProductWithRelations) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== productId));
      toast.success(t("ToastMessages.productDeleted"));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const getDefaultValues = (
    product: ProductWithRelations | null,
  ): Partial<CreateProductInput> => {
    if (!product) return {};

    return {
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      stock: product.stock,
      sku: product.sku || "",
      featured: product.featured,
      published: product.published,
      categoryIds: product.categories.map((c) => c.category.id),
      images: product.images.map((img) => ({
        url: img.url,
        alt: img.alt || "",
        order: img.order,
      })),
    };
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-8 text-3xl font-bold">{t("Dashboard.title")}</h1>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.totalSales")}
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAnalytics.totalSales.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.totalOrders")}
              </CardTitle>
              <Package className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.totalOrders}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.products")}
              </CardTitle>
              <BarChart3 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.avgOrderValue")}
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAnalytics.averageOrderValue}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("ProductManagement.title")}</CardTitle>
              <Dialog
                open={isDialogOpen}
                onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) {
                    setEditingProduct(null);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("ProductManagement.addProduct")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct
                        ? t("ProductManagement.editProduct")
                        : t("ProductManagement.addNewProduct")}
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    createProduct={createProduct}
                    defaultValues={getDefaultValues(editingProduct)}
                    isLoading={isLoading}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table dir={locale === "ar" ? "rtl" : "ltr"}>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("ProductManagement.table.name")}</TableHead>
                  <TableHead>{t("ProductManagement.table.category")}</TableHead>
                  <TableHead>{t("ProductManagement.table.price")}</TableHead>
                  <TableHead>{t("ProductManagement.table.stock")}</TableHead>
                  <TableHead>{t("ProductManagement.table.status")}</TableHead>
                  <TableHead>{t("ProductManagement.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody dir="ltr">
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.category ?? "-"}
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.stock > 0 ? "default" : "destructive"}
                      >
                        {product.stock > 0
                          ? t("ProductManagement.table.inStock")
                          : t("ProductManagement.table.outOfStock")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
