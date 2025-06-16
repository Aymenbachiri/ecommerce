import { useTranslations } from "next-intl";
import { useCategories } from "./use-categories";
import { FieldArrayWithId, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  createProductSchema,
  type CreateProductInput,
} from "@/lib/validation/api-validation";
import type { Category, ProductWithRelations } from "@/lib/types/types";

type useProductFormProps = {
  createProduct: (data: CreateProductInput) => Promise<void>;
  updateProduct: (id: string, data: CreateProductInput) => Promise<void>;
  editingProduct: ProductWithRelations | null;
  defaultValues?: Partial<CreateProductInput> | undefined;
};

type useProductFormReturn = {
  t: ReturnType<typeof useTranslations>;
  categories: Category[];
  categoriesLoading: boolean;
  isEditing: boolean;
  form: ReturnType<typeof useForm<CreateProductInput>>;
  imageFields: FieldArrayWithId<ProductWithRelations["images"]>[];
  removeImage: ReturnType<typeof useFieldArray>["remove"];
  selectedCategoryIds: string[];
  onSubmit: (data: CreateProductInput) => Promise<void>;
  addImage: () => void;
  toggleCategory: (categoryId: string) => void;
};

export function useProductForm(
  editingProduct: useProductFormProps["editingProduct"],
  defaultValues: useProductFormProps["defaultValues"],
  updateProduct: useProductFormProps["updateProduct"],
  createProduct: useProductFormProps["createProduct"],
): useProductFormReturn {
  const { categories, loading: categoriesLoading } = useCategories();
  const t = useTranslations("AdminPage.ProductForm");
  const isEditing = !!editingProduct;

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      originalPrice: undefined,
      stock: 0,
      sku: "",
      featured: true,
      published: false,
      categoryIds: [],
      images: [],
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: "",
        description: "",
        price: 0,
        originalPrice: undefined,
        stock: 0,
        sku: "",
        featured: true,
        published: false,
        categoryIds: [],
        images: [],
        ...defaultValues,
      });
    }
  }, [defaultValues, form]);

  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const selectedCategoryIds = form.watch("categoryIds");

  const onSubmit = async (data: CreateProductInput) => {
    try {
      if (isEditing && editingProduct) {
        await updateProduct(editingProduct.id, data);
      } else {
        await createProduct(data);
      }

      if (!isEditing) {
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const addImage = () => {
    appendImage({ url: "", alt: "", order: imageFields.length });
  };

  const toggleCategory = (categoryId: string) => {
    const current = selectedCategoryIds || [];
    const updated = current.includes(categoryId)
      ? current.filter((id) => id !== categoryId)
      : [...current, categoryId];
    form.setValue("categoryIds", updated);
  };

  return {
    t,
    categories,
    categoriesLoading,
    isEditing,
    form,
    imageFields,
    removeImage,
    selectedCategoryIds,
    onSubmit,
    addImage,
    toggleCategory,
  };
}
