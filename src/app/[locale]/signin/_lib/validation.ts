import type { useTranslations } from "next-intl";
import { z } from "zod";

export const createSignInSchema = (t: ReturnType<typeof useTranslations>) => {
  return z.object({
    email: z.string().email({ message: t("emailInvalid") }),
    password: z.string().min(6, { message: t("passwordMin") }),
  });
};

export type SignInFormValues = z.infer<ReturnType<typeof createSignInSchema>>;
