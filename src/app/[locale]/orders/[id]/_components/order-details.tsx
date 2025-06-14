"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ordersAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { ArrowLeft, CheckCircle, Clock, Package, Truck } from "lucide-react";
import { useParams } from "next/navigation";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export function OrderDetails(): React.JSX.Element {
  const params = useParams();
  const [orders] = useAtom(ordersAtom);
  const t = useTranslations("OrderDetailsPage");

  const order = orders.find((o) => o.id === params.id);

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="py-16 text-center">
          <h1 className="mb-4 text-3xl font-bold">{t("orderNotFound")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("orderNotFoundMessage")}
          </p>
          <Button asChild>
            <Link href="/orders">{t("backToOrders")}</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-gray-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      case "pending":
        return "bg-gray-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <section>
            <h1 className="text-3xl font-bold">
              {t("orderNumber", { orderId: order.id })}
            </h1>
            <p className="text-muted-foreground">
              {t("placedOn", {
                date: new Date(order.createdAt).toLocaleDateString(),
              })}
            </p>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  {t("orderStatus")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <section className="flex items-center gap-2">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <span className="text-muted-foreground text-sm">
                    {t("lastUpdated", {
                      date: new Date(order.updatedAt).toLocaleDateString(),
                    })}
                  </span>
                </section>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("orderItems")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-lg border p-4"
                    >
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-muted-foreground mb-2 text-sm">
                          {item.product.description}
                        </p>
                        <section className="flex items-center justify-between">
                          <span className="text-sm">
                            {t("quantity", { quantity: item.quantity })}
                          </span>
                          <span className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </section>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("shippingAddress")}</CardTitle>
              </CardHeader>
              <CardContent>
                <section className="space-y-1">
                  <p className="font-semibold">
                    {t("name", { name: order.customerInfo.name })}
                  </p>
                  <p>
                    {t("street", { street: order.customerInfo.address.street })}
                  </p>
                  <p>
                    {t("address", {
                      city: order.customerInfo.address.city,
                      state: order.customerInfo.address.state,
                      zipCode: order.customerInfo.address.zipCode,
                    })}
                  </p>
                  <p>
                    {t("country", {
                      country: order.customerInfo.address.country,
                    })}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {t("phone", { phone: order.customerInfo.phone })}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t("email", { email: order.customerInfo.email })}
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>{t("orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <section
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </section>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <section className="flex justify-between">
                    <span>{t("subtotal")}</span>
                    <span>${(order.total / 1.1).toFixed(2)}</span>
                  </section>
                  <section className="flex justify-between">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </section>
                  <section className="flex justify-between">
                    <span>{t("tax")}</span>
                    <span>${(order.total - order.total / 1.1).toFixed(2)}</span>
                  </section>
                </div>

                <Separator />

                <section className="flex justify-between text-lg font-semibold">
                  <span>{t("total")}</span>
                  <span>${order.total.toFixed(2)}</span>
                </section>

                <section className="space-y-2 pt-4">
                  <Button className="w-full" variant="outline">
                    {t("trackPackage")}
                  </Button>
                  <Button className="w-full" variant="outline">
                    {t("downloadInvoice")}
                  </Button>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
