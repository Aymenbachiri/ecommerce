import { useAtomValue } from "jotai";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { cartAtom } from "../store/store";
import type { CartItemWithRelations } from "../types/types";

type UseNavbarReturn = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  t: ReturnType<typeof useTranslations>;
  cart: CartItemWithRelations[];
  locale: Locale;
};

export function useNavbar(): UseNavbarReturn {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const t = useTranslations("HomePage.navbar");
  const cart = useAtomValue(cartAtom);
  const locale = useLocale();

  return {
    mobileMenuOpen,
    setMobileMenuOpen,
    t,
    cart,
    locale,
  };
}
