import { API_URL } from "@/lib/env/env";
import { cartAtom } from "@/lib/store/store";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type {
  CartItemWithRelations,
  ProductWithRelations,
} from "@/lib/types/types";

type UseProductReturn = {
  product: ProductWithRelations | null;
  loading: boolean;
  quantity: number;
  selectedImage: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
  addToCart: () => void;
  t: ReturnType<typeof useTranslations>;
};

export function useProduct(): UseProductReturn {
  const params = useParams();
  const [product, setProduct] = useState<ProductWithRelations | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cart, setCart] = useAtom(cartAtom);
  const t = useTranslations("ProductPage");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/products/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setProduct(null);
          }
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: ProductWithRelations = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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

  return {
    product,
    loading,
    quantity,
    selectedImage,
    setQuantity,
    setSelectedImage,
    addToCart,
    t,
  };
}
