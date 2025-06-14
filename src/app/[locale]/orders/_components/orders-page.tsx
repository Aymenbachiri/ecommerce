"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { ordersAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { Eye, Package } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function OrdersPage(): React.JSX.Element {
  const [orders] = useAtom(ordersAtom);
  const t = useTranslations("OrdersPage");

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

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16 text-center"
        >
          <Package className="text-muted-foreground mx-auto mb-6 h-24 w-24" />
          <h1 className="mb-4 text-3xl font-bold">{t("noOrdersTitle")}</h1>
          <p className="text-muted-foreground mb-8">
            {t("noOrdersDescription")}
          </p>
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
        <h1 className="mb-8 text-3xl font-bold">{t("yourOrdersTitle")}</h1>

        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {t("orderNumber", { orderId: order.id })}
                    </CardTitle>
                    <Badge className={getStatusColor(order.status)}>
                      {t(`status.${order.status}`)}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {t("placedOn", {
                      date: new Date(order.createdAt).toLocaleDateString(),
                    })}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 space-y-2">
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

                  <div className="flex items-center justify-between">
                    <section>
                      <span className="font-semibold">
                        {t("total")}: ${order.total.toFixed(2)}
                      </span>
                    </section>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        {t("viewDetailsButton")}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
