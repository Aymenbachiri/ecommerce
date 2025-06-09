import { Navbar } from "@/components/home/navbar";
import { Hero } from "@/components/home/hero";
import { Stats } from "@/components/home/stats";
import { Features } from "@/components/home/features";
import { Demo } from "@/components/home/demo";
import { CTA } from "@/components/home/cta";
import { Footer } from "@/components/home/footer";
import { use } from "react";
import { setRequestLocale } from "next-intl/server";
import { Locale } from "next-intl";

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default function LocaleHomePage({ params }: Props): React.JSX.Element {
  const { locale } = use(params);

  setRequestLocale(locale);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Demo />
      <CTA />
      <Footer />
    </div>
  );
}
