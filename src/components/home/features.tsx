"use client";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { fadeInUp, scaleOnHover, staggerContainer } from "./animation";
import {
  BarChart3,
  CreditCard,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Smartphone,
  Zap,
} from "lucide-react";
import { useTranslations } from "next-intl";

type Feature = {
  icon: React.JSX.Element;
  title: string;
  description: string;
};

export function Features(): React.JSX.Element {
  const t = useTranslations("Features");

  const features: Feature[] = [
    {
      icon: <Package className="h-8 w-8" />,
      title: t("featureList.productManagement.title"),
      description: t("featureList.productManagement.description"),
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: t("featureList.smartSearch.title"),
      description: t("featureList.smartSearch.description"),
    },
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: t("featureList.dynamicCart.title"),
      description: t("featureList.dynamicCart.description"),
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: t("featureList.secureCheckout.title"),
      description: t("featureList.secureCheckout.description"),
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: t("featureList.analyticsDashboard.title"),
      description: t("featureList.analyticsDashboard.description"),
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: t("featureList.adminPanel.title"),
      description: t("featureList.adminPanel.description"),
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t("featureList.responsiveDesign.title"),
      description: t("featureList.responsiveDesign.description"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("featureList.performanceOptimized.title"),
      description: t("featureList.performanceOptimized.description"),
    },
  ];

  return (
    <section id="features" className="py-20">
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
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card
                className="h-full transition-shadow duration-300 hover:shadow-lg"
                {...scaleOnHover}
              >
                <CardHeader>
                  <div className="bg-primary/10 text-primary mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
