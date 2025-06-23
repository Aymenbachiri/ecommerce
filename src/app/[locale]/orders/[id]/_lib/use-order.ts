import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { ordersAtom } from "@/lib/store/store";
import { useAtomValue } from "jotai";
import type { OrderWithRelations } from "@/lib/types/types";

type UseOrderReturn = {
  order: OrderWithRelations | undefined;
  t: ReturnType<typeof useTranslations>;
  getStatusColor: (status: string) => string;
};

export function useOrder(): UseOrderReturn {
  const params = useParams();
  const orders = useAtomValue(ordersAtom);
  const t = useTranslations("OrderDetailsPage");
  const order = orders.find((o) => o.id === params.id);

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

  return { order, t, getStatusColor };
}
