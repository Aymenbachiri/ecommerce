import { getLocale, setRequestLocale } from "next-intl/server";
import { ProductPage } from "./_components/product-page";

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <ProductPage />;
}
