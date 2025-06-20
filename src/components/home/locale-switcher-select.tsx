"use client";

import { useParams } from "next/navigation";
import { Locale } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type LocaleOption = {
  value: string;
  label: string;
};

type Props = {
  defaultValue: string;
  label: string;
  options: LocaleOption[];
};

export function LocaleSwitcherSelect({
  defaultValue,
  label,
  options,
}: Props): React.JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onValueChange(value: string): void {
    const nextLocale = value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  return (
    <div className="relative">
      <Select
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-auto border bg-transparent text-gray-400 shadow focus:ring-0">
          <SelectValue aria-label={label} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="sr-only">{label}</span>
    </div>
  );
}
