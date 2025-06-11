"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { formVariants, itemVariants } from "../_lib/animation";
import { useSignIn } from "../_lib/use-signin";

export function SigninForm(): React.JSX.Element {
  const {
    t,
    locale,
    form,
    isLoading,
    onSubmit,
    showPassword,
    setShowPassword,
  } = useSignIn();

  return (
    <motion.div
      className="mx-auto mt-8 max-w-md rounded-lg p-6 shadow-lg dark:shadow-slate-100"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.section variants={itemVariants} className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{t("WelcomeBack")}</h2>
        <p className="text-sm text-gray-500">{t("PleaseSignIn")}</p>
      </motion.section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("EmailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Password")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("PasswordPlaceholder")}
                        className={cn(
                          "transition-colors",
                          "border",
                          form.formState.errors.password
                            ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-400",
                        )}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                          "absolute top-1/2 -translate-y-1/2 transform text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300",
                          locale === "ar" ? "left-3" : "right-3",
                        )}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {t("SignIn")}
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.section variants={itemVariants} className="pt-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t("NoAccount")}{" "}
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("SignUpHere")}
            </motion.span>
          </Link>
        </p>
      </motion.section>
    </motion.div>
  );
}
