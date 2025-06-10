"use client";
import { useTranslations } from "next-intl";
import { fadeInUp, staggerContainer } from "./animation";
import { motion } from "motion/react";

type Stats = {
  number: string;
  label: "uptime" | "response_time" | "products_supported" | "support";
};

const stats: Stats[] = [
  { number: "99.9%", label: "uptime" },
  { number: "50ms", label: "response_time" },
  { number: "10K+", label: "products_supported" },
  { number: "24/7", label: "support" },
];

export function Stats(): React.JSX.Element {
  const t = useTranslations("Stats");

  return (
    <section className="bg-muted/50 border-y py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} className="text-center" variants={fadeInUp}>
              <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{t(stat.label)}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
