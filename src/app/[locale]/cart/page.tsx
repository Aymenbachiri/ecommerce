import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { CartPage } from "./_component/cart-page";
import type { Locale } from "next-intl";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "CartPage.CartPageMetadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <CartPage />;
}
