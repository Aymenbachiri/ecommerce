import type { useTranslations } from "next-intl";
import { z } from "zod";

export const createSignUpSchema = (t: ReturnType<typeof useTranslations>) => {
  return z
    .object({
      name: z
        .string()
        .min(2, { message: t("name.min") })
        .max(50, { message: t("name.max") }),
      email: z
        .string()
        .min(1, { message: t("email.required") })
        .email({ message: t("email.invalid") }),
      password: z.string().min(8, { message: t("password.min") }),
      confirmPassword: z
        .string()
        .min(1, { message: t("confirmPassword.required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("confirmPassword.match"),
      path: ["confirmPassword"],
    });
};

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;
