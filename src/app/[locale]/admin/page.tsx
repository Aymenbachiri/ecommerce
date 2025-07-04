import { requireAuthentication } from "@/lib/helpers/helpers";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { AdminPage } from "./_components/admin-page";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "AdminPage.AdminPageMetadata",
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

  return <AdminPage />;
}
