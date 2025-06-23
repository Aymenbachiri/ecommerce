import { ordersAtom } from "@/lib/store/store";
import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import type { OrderWithRelations } from "@/lib/types/types";

type UseOrdersReturn = {
  orders: OrderWithRelations[];
  t: ReturnType<typeof useTranslations>;
  getStatusColor: (status: string) => string;
};

export function useOrders(): UseOrdersReturn {
  const orders = useAtomValue(ordersAtom);
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

  return { orders, t, getStatusColor };
}
