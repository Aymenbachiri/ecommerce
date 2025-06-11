import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignInSchema, type SignInFormValues } from "./validation";
import { type Locale, useLocale, useTranslations } from "next-intl";

type UseSignInReturn = {
  form: ReturnType<typeof useForm<SignInFormValues>>;
  isLoading: boolean;
  onSubmit: (values: SignInFormValues) => void;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
};

export function useSignIn(): UseSignInReturn {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const validationMessages = useTranslations("Signin.Validation");
  const t = useTranslations("Signin");
  const locale = useLocale();
  const signInSchema = createSignInSchema(validationMessages);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = (values: SignInFormValues) => {
    // TODO: Replace with your sign-in logic (e.g., call API or NextAuth)
    console.log("Signing in with:", values);
  };

  return {
    form,
    isLoading,
    onSubmit,
    showPassword,
    setShowPassword,
    t,
    locale,
  };
}
