import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { LocaleSwitcherSelect } from "./locale-switcher-select";

export function LocaleSwitcher(): React.JSX.Element {
  const t = useTranslations("HomePage.LocaleSwitcher");
  const locale = useLocale();

  const localeOptions = routing.locales.map((cur) => ({
    value: cur,
    label: t("locale", { locale: cur }),
  }));

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      label={t("label")}
      options={localeOptions}
    />
  );
}
