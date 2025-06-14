import { getLocale, setRequestLocale } from "next-intl/server";
import { OrderDetails } from "./_components/order-details";
import { requireAuthentication } from "@/lib/helpers/helpers";

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  await requireAuthentication(locale);
  setRequestLocale(locale);

  return <OrderDetails />;
}
