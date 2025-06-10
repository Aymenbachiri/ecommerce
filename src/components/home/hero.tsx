"use client";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../ui/button";
import { fadeInUp, scaleOnHover, staggerContainer } from "./animation";
import { useTranslations } from "next-intl";

export function Hero(): React.JSX.Element {
  const t = useTranslations("Hero");

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-4">
              <Star className="mr-1 h-4 w-4" />
              {t("new_advanced_analytics")}
            </Badge>
          </motion.div>

          <motion.h1
            className="from-foreground to-muted-foreground mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl"
            variants={fadeInUp}
          >
            {t("the_future_of")}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t("ecommerce")}
            </span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
            variants={fadeInUp}
          >
            {t("build_stunning_online_stores")}
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={fadeInUp}
          >
            <Button size="lg" className="px-8 py-6 text-lg" {...scaleOnHover}>
              {t("start_free_trial")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg"
              {...scaleOnHover}
            >
              {t("watch_demo")}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
