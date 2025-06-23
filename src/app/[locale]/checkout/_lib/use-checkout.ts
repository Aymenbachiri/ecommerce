import { useRouter } from "@/i18n/navigation";
import { cartAtom, cartTotalAtom, ordersAtom } from "@/lib/store/store";
import type {
  CartItemWithRelations,
  CustomerInfo,
  Order,
  OrderStatus,
  OrderWithRelations,
  PaymentStatus,
} from "@/lib/types/types";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

type PaymentInfo = {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
};

type UseCheckoutReturn = {
  cart: CartItemWithRelations[];
  setCart: React.Dispatch<React.SetStateAction<CartItemWithRelations[]>>;
  total: number;
  orders: OrderWithRelations[];
  loading: boolean;
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo;
  handleSubmit: (e: React.FormEvent) => void;
  t: ReturnType<typeof useTranslations>;
  setCustomerInfo: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  setPaymentInfo: React.Dispatch<React.SetStateAction<PaymentInfo>>;
  router: ReturnType<typeof useRouter>;
};

export function useCheckout(): UseCheckoutReturn {
  const [cart, setCart] = useAtom(cartAtom);
  const total = useAtomValue(cartTotalAtom);
  const [orders, setOrders] = useAtom(ordersAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("CheckoutPage");

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const subtotal = total;
      const tax = subtotal * 0.08;
      const shipping = 10;
      const finalTotal = subtotal + tax + shipping;

      const newOrder: Order = {
        id: Date.now().toString(),
        userId: "temp-user-id",
        status: "PENDING" as OrderStatus,
        total: finalTotal,
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        shippingAddressId: null,
        billingAddressId: null,
        paymentIntentId: null,
        paymentStatus: "PENDING" as PaymentStatus,
        notes: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const orderWithItems = {
        ...newOrder,
        items: [...cart],
        customerInfo,
      };

      setOrders([...orders, orderWithItems] as OrderWithRelations[]);
      setCart([]);

      toast.success(t("orderPlacedSuccess", { orderId: newOrder.id }));

      router.push(`/orders/${newOrder.id}`);
      setLoading(false);
    }, 2000);
  };

  return {
    cart,
    setCart,
    total,
    orders,
    loading,
    customerInfo,
    paymentInfo,
    handleSubmit,
    t,
    setCustomerInfo,
    setPaymentInfo,
    router,
  };
}
