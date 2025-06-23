import { cartAtom, cartTotalAtom } from "@/lib/store/store";
import type { CartItemWithRelations } from "@/lib/types/types";
import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

type UseCartReturn = {
  cart: CartItemWithRelations[];
  total: number;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeItem: (productId: string) => void;
  t: ReturnType<typeof useTranslations>;
};

export function useCart(): UseCartReturn {
  const [cart, setCart] = useAtom(cartAtom);
  const total = useAtomValue(cartTotalAtom);
  const t = useTranslations("CartPage");

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(productId);
      return;
    }

    setCart(
      cart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const removeItem = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
    toast.success(t("itemRemovedToast"));
  };

  return { cart, total, updateQuantity, removeItem, t };
}
