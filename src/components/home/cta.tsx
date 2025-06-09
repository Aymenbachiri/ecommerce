"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { fadeInUp, scaleOnHover, staggerContainer } from "./animation";
import { motion } from "motion/react";

export function CTA(): React.JSX.Element {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.h2
            className="mb-6 text-3xl font-bold md:text-5xl"
            variants={fadeInUp}
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-2xl text-xl opacity-90"
            variants={fadeInUp}
          >
            Join thousands of businesses already using ShopFlow to create
            amazing online shopping experiences.
          </motion.p>
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={fadeInUp}
          >
            <Button
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-lg"
              {...scaleOnHover}
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white px-8 py-6 text-lg text-black hover:bg-white hover:text-blue-600 dark:text-white"
              {...scaleOnHover}
            >
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
