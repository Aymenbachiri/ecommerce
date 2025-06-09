"use client";
import { fadeInUp, staggerContainer } from "./animation";
import { motion } from "motion/react";

const stats = [
  { number: "99.9%", label: "Uptime" },
  { number: "50ms", label: "Response Time" },
  { number: "10K+", label: "Products Supported" },
  { number: "24/7", label: "Support" },
];

export function Stats(): React.JSX.Element {
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
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
