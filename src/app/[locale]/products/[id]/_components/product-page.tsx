"use client";

import { mockProducts } from "@/lib/data/data";
import { cartAtom } from "@/lib/store/store";
import { CartItemWithRelations, ProductWithRelations } from "@/lib/types/types";
import { useAtom } from "jotai";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Badge, Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProductSkeleton } from "./product-skeleton";
import { useTranslations } from "next-intl";

export function ProductPage(): React.JSX.Element {
  const params = useParams();
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cart, setCart] = useAtom(cartAtom);
  const t = useTranslations("ProductPage");

  useEffect(() => {
    setTimeout(() => {
      const foundProduct = mockProducts.find((p) => p.id === params.id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 1000);
  }, [params.id]);

  const addToCart = () => {
    if (!product) return;

    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity }] as CartItemWithRelations[]);
    }

    toast.success(
      t("notification", {
        quantity: quantity,
        productName: product.name,
      }),
    );
  };

  if (loading) return <ProductSkeleton />;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">{t("NotFound.title")}</h1>
          <p className="text-muted-foreground">{t("NotFound.description")}</p>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  const images = product.images;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={images[selectedImage].url || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="mb-4 h-96 w-full rounded-lg object-cover"
            />
          </motion.div>

          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-lg border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image.url || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              {product.featured && (
                <Badge className="bg-yellow-500">{t("featured")}</Badge>
              )}
              {discount > 0 && (
                <Badge className="bg-red-500">
                  -{discount}
                  {t("offer", { discount })}
                </Badge>
              )}
            </div>

            <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

            <div className="mb-4 flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.averageRating as number)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-muted-foreground text-sm">
                {product.averageRating as number} ({product.reviews.length}{" "}
                {t("reviews")})
              </span>
            </div>

            <p className="text-muted-foreground mb-6">{product.description}</p>
          </div>

          <Separator />

          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-xl line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-muted-foreground mb-4 text-sm">
              {product.stock > 0
                ? t("stock", { count: product.stock })
                : t("outOfStock")}
            </p>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("quantity")}
              </label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={addToCart}
                className="flex-1"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("addToCart")}
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="mb-2 font-semibold">{t("productInformation")}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{t("category")}</span>
                  <span className="capitalize">
                    {product.categories[0].category.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>{t("sku")}</span>
                  <span>{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t("availability")}</span>
                  <span>{product.stock > 0 ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
