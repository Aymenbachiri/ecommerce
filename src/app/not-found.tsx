"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <motion.div
        className="max-w-md text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <CardContent>
            <motion.h1
              className="mb-4 text-8xl font-extrabold text-gray-900 dark:text-gray-100"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              404
            </motion.h1>
            <motion.p
              className="mb-6 text-lg text-gray-600 dark:text-gray-300"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link href="/">Go Home</Link>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
