"use client";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "../ui/button";

export function Navbar(): React.JSX.Element {
  return (
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
          <span className="text-xl font-bold">ShopFlow</span>
        </motion.div>

        <div className="hidden items-center space-x-8 md:flex">
          <Link
            href="#features"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#demo"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Demo
          </Link>
          <Link
            href="#pricing"
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
          <Button>Get Started</Button>
        </div>
      </div>
    </motion.nav>
  );
}
