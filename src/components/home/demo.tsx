"use client";
import { CheckCircle, TrendingUp, Users } from "lucide-react";
import { fadeInUp, staggerContainer } from "./animation";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function Demo(): React.JSX.Element {
  const t = useTranslations("Demo");

  return (
    <section id="demo" className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">{t("title")}</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          className="grid items-center gap-12 lg:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeInUp}>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t("features.productManagement.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.productManagement.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t("features.analytics.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.analytics.description")}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
                    {t("features.mobileFirst.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.mobileFirst.description")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/20 p-4">
                  <TrendingUp className="mb-2 h-8 w-8" />
                  <div className="text-2xl font-bold">+127%</div>
                  <div className="text-sm opacity-90">
                    {t("stats.salesGrowth")}
                  </div>
                </div>
                <div className="rounded-lg bg-white/20 p-4">
                  <Users className="mb-2 h-8 w-8" />
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm opacity-90">
                    {t("stats.activeUsers")}
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white/20 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm opacity-90">
                    {t("stats.conversionRate")}
                  </span>
                  <span className="text-sm font-semibold">8.4%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-white/20">
                  <div className="h-2 w-4/5 rounded-full bg-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
