import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type {
  CartItemWithRelations,
  OrderWithRelations,
  ProductWithRelations,
} from "../types/types";

export const cartAtom = atomWithStorage<CartItemWithRelations[]>("cart", []);

export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
});

export const cartCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((count, item) => count + item.quantity, 0);
});

export const searchQueryAtom = atom("");
export const selectedCategoryAtom = atom<string>("all");
export const sortByAtom = atom<"name" | "price-low" | "price-high" | "rating">(
  "name",
);

export const ordersAtom = atomWithStorage<OrderWithRelations[]>("orders", []);
export const productsAtom = atomWithStorage<ProductWithRelations[]>(
  "products",
  [],
);
