import { cartAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import type {
  CartItemWithRelations,
  ProductWithRelations,
} from "@/lib/types/types";

type UseProductCardReturn = {
  cart: CartItemWithRelations[];
  setCart: React.Dispatch<React.SetStateAction<CartItemWithRelations[]>>;
  addToCart: () => void;
  discount: number;
  t: ReturnType<typeof useTranslations>;
};

export function useProductCard(
  product: ProductWithRelations,
): UseProductCardReturn {
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

  return { cart, setCart, addToCart, discount, t };
}
