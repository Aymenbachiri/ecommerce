import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { OrdersPage } from "./_components/orders-page";
import { requireAuthentication } from "@/lib/helpers/helpers";
import type { Locale } from "next-intl";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "OrdersPage.OrdersPageMetadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  await requireAuthentication(locale);
  setRequestLocale(locale);

  return <OrdersPage />;
}
