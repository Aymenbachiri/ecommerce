import { getLocale, setRequestLocale } from "next-intl/server";
import { ProductPage } from "./_components/product-page";
import type { Metadata } from "next";
import { getProduct } from "./_lib/get-product";
import { API_URL } from "@/lib/env/env";
import { ProductWithRelations } from "@/lib/types/types";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product?.name || "",
    description: product?.description || "",
  };
}

// export async function generateStaticParams(): Promise<{ id: string }[]> {
//   const products = await fetch(`${API_URL}/api/products`).then((res) =>
//     res.json(),
//   );

//   return products.map((product: ProductWithRelations) => ({ id: product.id }));
// }

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <ProductPage />;
}
