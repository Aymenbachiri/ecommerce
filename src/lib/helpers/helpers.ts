import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import type { Session } from "next-auth";
import type { Locales } from "../types/types";

type ReturnType = Promise<Session | null>;

export async function redirectIfAuthenticated(locale: Locales): ReturnType {
  const session = await auth();
  if (session?.user) redirect({ href: "/dashboard", locale });

  return session;
}

export async function requireAuthentication(locale: Locales): ReturnType {
  const session = await auth();
  if (!session?.user) redirect({ href: "/signin", locale });

  return session;
}
