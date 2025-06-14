"use client";

import Image from "next/image";
import Link from "next/link";
import { useAtom } from "jotai";
import { motion } from "motion/react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cartAtom } from "@/lib/store/store";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import type {
  CartItemWithRelations,
  ProductWithRelations,
} from "@/lib/types/types";

type ProductCardProps = {
  product: ProductWithRelations;
};

export function ProductCard({ product }: ProductCardProps): React.JSX.Element {
  const [cart, setCart] = useAtom(cartAtom);
  const t = useTranslations("ProductsPage.ProductCard");

  const addToCart = () => {
    const existingItem = cart.find((item) => item.product.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { product, quantity: 1 } as CartItemWithRelations]);
    }

    toast.success(t("notification", { productName: product.name }));
  };

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100,
      )
    : 0;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Card className="group flex h-full flex-col overflow-hidden">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.images?.[0]?.url || "/placeholder.svg"}
              alt={product.name}
              width={400}
              height={400}
              className="h-64 w-full object-cover transition-transform group-hover:scale-105"
            />
          </Link>
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white">
              -{discount}%
            </Badge>
          )}
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-yellow-500 text-black">
              {t("featured")}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/70 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <Link href={`/products/${product.id}`} className="flex-grow">
            <h3 className="hover:text-primary mb-2 truncate text-lg font-semibold transition-colors">
              {product.name}
            </h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 h-10 text-sm">
              {product.description}
            </p>
          </Link>

          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < (product.averageRating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-muted-foreground ml-1 text-sm">
              {t("reviews", { count: product.reviews?.length || 0 })}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="mt-auto p-4 pt-0">
          <Button
            onClick={addToCart}
            className="w-full"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.stock === 0 ? t("outOfStock") : t("addToCart")}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
