import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { useCategories } from "../_lib/use-categories";
import {
  type CreateProductInput,
  createProductSchema,
} from "@/lib/validation/api-validation";
import { cn } from "@/lib/utils/utils";
import { useTranslations } from "next-intl";

type ProductFormProps = {
  createProduct: (data: CreateProductInput) => Promise<void>;
  defaultValues?: Partial<CreateProductInput> | undefined;
  isLoading: boolean;
};

export function ProductForm({
  createProduct,
  defaultValues,
  isLoading,
}: ProductFormProps): React.JSX.Element {
  const { categories, loading: categoriesLoading } = useCategories();
  const t = useTranslations("AdminPage.ProductForm");

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
      await createProduct(data);
      form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("nameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("namePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("skuLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("skuPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("descriptionLabel")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("descriptionPlaceholder")}
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("priceLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="originalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("originalPriceLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("stockLabel")}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="categoryIds"
          render={() => (
            <FormItem>
              <FormLabel>{t("categoriesLabel")}</FormLabel>
              <FormDescription>{t("categoriesDescription")}</FormDescription>
              <div className={cn("mt-2 flex flex-wrap gap-2")}>
                {categoriesLoading ? (
                  <div>{t("loadingCategories")}</div>
                ) : (
                  categories.map((category) => {
                    const isSelected = selectedCategoryIds?.includes(
                      category.id,
                    );
                    return (
                      <Badge
                        key={category.id}
                        variant={isSelected ? "default" : "secondary"}
                        className={cn(
                          "cursor-pointer",
                          form.formState.errors.categoryIds && "text-red-500",
                        )}
                        onClick={() => toggleCategory(category.id)}
                      >
                        {category.name}
                        {isSelected && <X className="ml-1 h-3 w-3" />}
                      </Badge>
                    );
                  })
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <FormLabel>{t("imagesLabel")}</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImage}
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("addImageButton")}
            </Button>
          </div>

          {imageFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 gap-4 rounded-lg border p-4 md:grid-cols-3"
            >
              <FormField
                control={form.control}
                name={`images.${index}.url`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("imageUrlLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("imageUrlPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`images.${index}.alt`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("altTextLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("altTextPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <section className="flex items-end">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </section>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-6">
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("featuredLabel")}</FormLabel>
                  <FormDescription>{t("featuredDescription")}</FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{t("publishedLabel")}</FormLabel>
                  <FormDescription>{t("publishedDescription")}</FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("submitButtonLoading") : t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
