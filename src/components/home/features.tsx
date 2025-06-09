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

type Feature = {
  icon: React.JSX.Element;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: <Package className="h-8 w-8" />,
    title: "Product Management",
    description:
      "Comprehensive product listing with pagination and infinite scroll for seamless browsing experience.",
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: "Smart Search & Filters",
    description:
      "Advanced category filters and intelligent search functionality to help users find exactly what they need.",
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Dynamic Shopping Cart",
    description:
      "Powered by Jotai state management for lightning-fast cart operations and real-time updates.",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Secure Checkout",
    description:
      "Robust validation and secure payment processing with comprehensive order management system.",
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Analytics Dashboard",
    description:
      "Real-time sales analytics and order insights to help you make data-driven business decisions.",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Admin Panel",
    description:
      "Full CRUD operations for product management with an intuitive administrative interface.",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Responsive Design",
    description:
      "Perfectly optimized for all devices with mobile-first approach and cross-platform compatibility.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Performance Optimized",
    description:
      "Skeleton loaders, lazy loading, and optimized animations for superior user experience.",
  },
];

export function Features(): React.JSX.Element {
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
          <h2 className="mb-4 text-3xl font-bold md:text-5xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            From product management to advanced analytics, our platform provides
            all the tools you need to build and scale your online business.
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
