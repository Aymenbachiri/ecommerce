import { Locale, NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { Navbar } from "@/components/home/navbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<Props, "children">,
): Promise<Metadata> {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: "HomePage.localeLayoutMetadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <div lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <NextIntlClientProvider>
        <Navbar />
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
