import { API_URL } from "@/lib/env/env";
import { productsAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useState } from "react";
import { toast } from "sonner";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { type ProductWithRelations } from "@/lib/types/types";
import { type CreateProductInput } from "@/lib/validation/api-validation";

type UseAdminReturn = {
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
  products: ProductWithRelations[];
  isDialogOpen: boolean;
  isLoading: boolean;
  editingProduct: ProductWithRelations | null;
  createProduct: (data: CreateProductInput) => Promise<void>;
  updateProduct: (id: string, data: CreateProductInput) => Promise<void>;
  handleEdit: (product: ProductWithRelations) => void;
  handleDelete: (productId: string) => Promise<void>;
  getDefaultValues: (
    product: ProductWithRelations | null,
  ) => Partial<CreateProductInput>;
  setIsDialogOpen: (open: boolean) => void;
  setEditingProduct: (product: ProductWithRelations | null) => void;
  onDelete: (productId: string) => void;
};

export function useAdmin(): UseAdminReturn {
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
      const response = await fetch(`${API_URL}/api/products`, {
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

  const updateProduct = async (id: string, data: CreateProductInput) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      const updatedProduct = await response.json();

      setProducts(products.map((p) => (p.id === id ? updatedProduct : p)));

      toast.success(t("ToastMessages.productUpdated"));
      setIsDialogOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : t("ToastMessages.failedToUpdateProduct"),
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
    if (!confirm(t("ToastMessages.confirmationModalDescription"))) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((p) => p.id !== productId));
      toast.success(t("ToastMessages.productDeleted"));
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(t("ToastMessages.failedToDeleteProduct"));
    }
  };

  const onDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
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

  return {
    t,
    locale,
    products,
    isDialogOpen,
    isLoading,
    editingProduct,
    createProduct,
    updateProduct,
    handleEdit,
    handleDelete,
    getDefaultValues,
    setIsDialogOpen,
    setEditingProduct,
    onDelete,
  };
}
