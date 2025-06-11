"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 1. Define the Zod schema for sign-in
const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

// 2. Infer the form data type from the schema
type SignInFormValues = z.infer<typeof signInSchema>;

export function SigninForm(): React.JSX.Element {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // 3. Initialize React Hook Form with Zod resolver
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });
  const isLoading = form.formState.isSubmitting;

  // 4. Submission handler
  const onSubmit = (values: SignInFormValues) => {
    // TODO: Replace with your sign-in logic (e.g., call API or NextAuth)
    console.log("Signing in with:", values);
  };

  return (
    <motion.div
      className="mx-auto mt-8 max-w-md rounded-lg p-6 shadow-lg dark:shadow-slate-100"
      initial="hidden"
      animate="visible"
      variants={formVariants}
    >
      <motion.section variants={itemVariants} className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Welcome Back!</h2>
        <p className="text-sm text-gray-500">Please sign in to your account</p>
      </motion.section>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <motion.div variants={itemVariants}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
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
                        className="absolute top-1/2 right-3 -translate-y-1/2 transform text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
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
              Sign In
            </Button>
          </motion.div>
        </form>
      </Form>

      <motion.div variants={itemVariants} className="pt-4 text-center">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up here
            </motion.span>
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
