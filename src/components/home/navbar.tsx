"use client";

import { ShoppingCart, Menu, X, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";
import { Link } from "@/i18n/navigation";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export function Navbar({ session }: Props): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const t = useTranslations("HomePage.navbar");

  return (
    <>
      <motion.nav
        className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
              <ShoppingCart className="text-primary-foreground h-5 w-5" />
            </div>
            <Link href="/#" className="text-xl font-bold transition-colors">
              ShopFlow
            </Link>
          </motion.div>

          <section className="hidden items-center space-x-8 md:flex">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("features")}
            </Link>
            <Link
              href="/#demo"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("demo")}
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("pricing")}
            </Link>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("products")}
            </Link>
          </section>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <LocaleSwitcher />

            {session?.user ? (
              <>
                <section className="flex items-center gap-2">
                  <User />
                  <h2>{session?.user?.name}</h2>
                </section>
                <Button
                  onClick={() => signOut()}
                  variant="destructive"
                  className="hidden sm:inline-flex"
                >
                  {t("Signout")}
                </Button>
                <Button
                  asChild
                  variant="link"
                  className="hidden sm:inline-flex"
                >
                  <Link href="/admin">{t("dashboard")}</Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" className="hidden sm:inline-flex">
                <Link href="/signin">{t("signIn")}</Link>
              </Button>
            )}

            <button
              className="text-muted-foreground hover:text-foreground inline-flex items-center justify-center rounded-md p-2 focus:outline-none md:hidden"
              aria-label="Toggle menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="bg-background border-muted-foreground/20 border-t md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 px-4 py-6">
              <Link
                href="/#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("features")}
              </Link>
              <Link
                href="/#demo"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("demo")}
              </Link>
              <Link
                href="/#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("pricing")}
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("products")}
              </Link>
              <div className="flex flex-col space-y-2">
                {session?.user ? (
                  <>
                    <section className="text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                      <User />
                      <h2>{session?.user?.name}</h2>
                    </section>
                    <Button
                      asChild
                      variant="link"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Link href="/admin">{t("dashboard")}</Link>
                    </Button>
                    <Button variant="destructive" onClick={() => signOut()}>
                      {t("Signout")}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link href="/signin">{t("signIn")}</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <div className="h-20" />
    </>
  );
}
