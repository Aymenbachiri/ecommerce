"use client";
import { motion } from "motion/react";
import { formVariants, itemVariants } from "../../signin/_lib/animation";
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
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { useSignup } from "../_lib/use-signup";

export function SignupForm(): React.JSX.Element {
  const {
    t,
    locale,
    form,
    isPending,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useSignup();

  return (
    <motion.div
      className="mx-auto mt-8 max-w-md rounded-lg p-6 shadow-lg dark:shadow-slate-100"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.section variants={itemVariants} className="mb-6 text-center">
        <h2 className="text-2xl font-bold">{t("title")}</h2>
        <p className="text-sm text-gray-500">{t("subtitle")}</p>
      </motion.section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700 dark:text-slate-300">
                    {t("nameLabel")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("namePlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700 dark:text-slate-300">
                    {t("emailLabel")}
                  </FormLabel>
                  <FormControl>
                    <Input placeholder={t("emailPlaceholder")} {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
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
                  <FormLabel className="font-medium text-slate-700 dark:text-slate-300">
                    {t("passwordLabel")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("passwordPlaceholder")}
                        className={cn(
                          "transition-colors",
                          "border",
                          form.formState.errors.password
                            ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-400",
                        )}
                        {...field}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowPassword(!showPassword)}
                        className={cn(
                          "absolute top-1/2 -translate-y-1/2 transform text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
                          locale === "ar" ? "left-3" : "right-3",
                        )}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-slate-700 dark:text-slate-300">
                    {t("confirmPasswordLabel")}
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder={t("confirmPasswordPlaceholder")}
                        className={cn(
                          "transition-colors",
                          "border",
                          form.formState.errors.confirmPassword
                            ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                            : "border-slate-200 focus:border-blue-500 dark:border-slate-700 dark:focus:border-blue-400",
                        )}
                        {...field}
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className={cn(
                          "absolute top-1/2 -translate-y-1/2 transform text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
                          locale === "ar" ? "left-3" : "right-3",
                        )}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </motion.button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="idle"
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              type="submit"
              disabled={isPending}
              className="flex w-full items-center justify-center font-medium shadow-lg transition-all duration-200 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              {t("submitButton")}
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.section variants={itemVariants} className="pt-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {t("haveAccountText")}{" "}
          <Link href="/signin">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {t("signInLink")}
            </motion.span>
          </Link>
        </p>
      </motion.section>
    </motion.div>
  );
}
