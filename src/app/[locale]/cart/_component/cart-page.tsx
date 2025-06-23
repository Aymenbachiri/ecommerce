"use client";

import { motion } from "motion/react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@radix-ui/react-select";
import { useCart } from "../_lib/use-cart";

export function CartPage(): React.JSX.Element {
  const { cart, total, updateQuantity, removeItem, t } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 text-center"
        >
          <ShoppingBag className="text-muted-foreground mx-auto mb-6 h-24 w-24" />
          <h1 className="mb-4 text-3xl font-bold">{t("emptyCartTitle")}</h1>
          <p className="text-muted-foreground mb-8">{t("emptyCartMessage")}</p>
          <Button size="lg" asChild>
            <Link href="/products">{t("startShoppingButton")}</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-8 text-3xl font-bold">{t("shoppingCartTitle")}</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item, index) => (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Image
                        src={
                          item.product.images?.[0]?.url || "/placeholder.svg"
                        }
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="h-24 w-24 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="mb-2 text-lg font-semibold">
                          {item.product.name}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm">
                          {item.product.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <section className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              disabled={item.quantity >= item.product.stock}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </section>

                          <section className="flex items-center gap-4">
                            <span className="text-lg font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.product.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </section>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{t("orderSummaryTitle")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-2">
                  {cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </section>

                <Separator />

                <div className="space-y-2">
                  <section className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>${total.toFixed(2)}</span>
                  </section>
                  <section className="flex justify-between">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </section>
                  <section className="flex justify-between">
                    <span>{t("tax")}</span>
                    <span>${(total * 0.1).toFixed(2)}</span>
                  </section>
                </div>

                <Separator />

                <section className="flex justify-between text-lg font-semibold">
                  <span>{t("total")}</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </section>

                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">{t("proceedToCheckoutButton")}</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/products">{t("continueShoppingButton")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
