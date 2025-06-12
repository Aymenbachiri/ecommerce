import { signup } from "@/lib/actions/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Locale, useLocale, useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createSignUpSchema, type SignUpFormValues } from "./validation";

type UseSignupReturn = {
  t: ReturnType<typeof useTranslations>;
  locale: Locale;
  form: ReturnType<typeof useForm<SignUpFormValues>>;
  isPending: boolean;
  onSubmit: (values: SignUpFormValues) => Promise<void>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useSignup(): UseSignupReturn {
  const t = useTranslations("Signup");
  const validationMessages = useTranslations("Signup.Validation");
  const locale = useLocale();
  const signUpSchema = createSignUpSchema(validationMessages);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: SignUpFormValues) {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = await signup(formData);

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(t("accountCreated"));
        setTimeout(() => {
          window.location.replace("/signin");
        }, 1000);
      }
    });
  }

  return {
    t,
    locale,
    form,
    isPending,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
}
