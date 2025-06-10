import { redirectIfAuthenticated } from "@/lib/helpers/helpers";
import { getLocale, setRequestLocale } from "next-intl/server";

export default async function page(): Promise<React.JSX.Element> {
  const locale = await getLocale();
  await redirectIfAuthenticated(locale);
  setRequestLocale(locale);

  return <div>page</div>;
}
