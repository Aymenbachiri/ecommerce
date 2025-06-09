"use client";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "./animation";
import { ShoppingCart } from "lucide-react";
import { motion } from "motion/react";

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid gap-8 md:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <div className="mb-4 flex items-center space-x-2">
              <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <ShoppingCart className="text-primary-foreground h-5 w-5" />
              </div>
              <span className="text-xl font-bold">ShopFlow</span>
            </div>
            <p className="text-muted-foreground">
              The complete ecommerce platform for modern businesses.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="mb-4 font-semibold">Product</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Demo
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="mb-4 font-semibold">Company</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-foreground transition-colors"
                >
                  Status
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="text-muted-foreground mt-8 border-t pt-8 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p>&copy; 2024 ShopFlow. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
