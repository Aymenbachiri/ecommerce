import { redirectIfAuthenticated } from "@/lib/helpers/helpers";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { SignupPage } from "./_components/signup-page";
import type { Metadata } from "next";
import type { Locale } from "next-intl";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "SignupPage.SignupPageMetadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  await redirectIfAuthenticated(locale);
  setRequestLocale(locale);

  return <SignupPage />;
}
