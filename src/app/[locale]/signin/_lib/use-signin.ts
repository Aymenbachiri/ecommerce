import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSignInSchema, type SignInFormValues } from "./validation";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { login } from "@/lib/actions/auth";
import { toast } from "sonner";

type UseSignInReturn = {
  form: ReturnType<typeof useForm<SignInFormValues>>;
  isLoading: boolean;
  onSubmit: (values: SignInFormValues) => Promise<void>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
  isPending: boolean;
};

export function useSignIn(): UseSignInReturn {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const validationMessages = useTranslations("Signin.Validation");
  const t = useTranslations("Signin");
  const locale = useLocale();
  const signInSchema = createSignInSchema(validationMessages);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: SignInFormValues) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = await login(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t("signinSuccess"));
        setTimeout(() => {
          window.location.replace("/dashboard");
        }, 1000);
      }
    });
  }

  return {
    form,
    isLoading,
    onSubmit,
    showPassword,
    setShowPassword,
    t,
    locale,
    isPending,
  };
}
