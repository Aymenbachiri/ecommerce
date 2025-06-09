"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";

export function Navbar(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <>
      <motion.nav
        className="bg-background/80 fixed top-0 z-50 w-full border-b backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
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

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/#features"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#demo"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Demo
            </Link>
            <Link
              href="/#pricing"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>

            <Button className="hidden sm:inline-flex">Get Started</Button>

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
                Features
              </Link>
              <Link
                href="/#demo"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Link
                href="/#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <div className="h-20" />
    </>
  );
}
