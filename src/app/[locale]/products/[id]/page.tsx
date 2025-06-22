import { getLocale, setRequestLocale } from "next-intl/server";
import { ProductPage } from "./_components/product-page";
import { getProduct } from "./_lib/get-product";
import { getProducts } from "../_lib/get-products";
import type { Metadata } from "next";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return { title: "Product Not Found", description: "Product Not Found" };
  }

  return {
    title: product?.name || "",
    description: product?.description || "",
  };
}

export async function generateStaticParams(): Promise<{ id: string }[]> {
  const products = await getProducts();
  if (!products) return [];

  return products.map((product) => ({ id: product.id }));
}

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <ProductPage />;
}
