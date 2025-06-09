"use client";

import { motion } from "motion/react";
import {
  ShoppingCart,
  Search,
  CreditCard,
  Package,
  BarChart3,
  Settings,
  Smartphone,
  Zap,
  Star,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/home/theme-toggle";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whilehover: { scale: 1.05 },
  whiletap: { scale: 0.95 },
};

export default function Home(): React.JSX.Element {
  const features = [
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

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "50ms", label: "Response Time" },
    { number: "10K+", label: "Products Supported" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
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

      {/* Hero Section */}
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
                New: Advanced Analytics Dashboard
              </Badge>
            </motion.div>

            <motion.h1
              className="from-foreground to-muted-foreground mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl"
              variants={fadeInUp}
            >
              The Future of
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ecommerce
              </span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl md:text-2xl"
              variants={fadeInUp}
            >
              Build stunning online stores with our comprehensive platform
              featuring advanced analytics, seamless checkout, and powerful
              admin tools.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              variants={fadeInUp}
            >
              <Button size="lg" className="px-8 py-6 text-lg" {...scaleOnHover}>
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-6 text-lg"
                {...scaleOnHover}
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
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
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="text-primary mb-2 text-3xl font-bold md:text-4xl">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              From product management to advanced analytics, our platform
              provides all the tools you need to build and scale your online
              business.
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

      {/* Demo Section */}
      <section id="demo" className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              See It in Action
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Experience the power of our platform with interactive demos and
              real-world examples.
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
                      Intuitive Product Management
                    </h3>
                    <p className="text-muted-foreground">
                      Easily add, edit, and organize your products with our
                      drag-and-drop interface and bulk operations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Real-time Analytics
                    </h3>
                    <p className="text-muted-foreground">
                      Track sales, monitor inventory, and analyze customer
                      behavior with comprehensive dashboards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-500" />
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">
                      Mobile-First Design
                    </h3>
                    <p className="text-muted-foreground">
                      Optimized for all devices with responsive design and
                      progressive web app capabilities.
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
                    <div className="text-sm opacity-90">Sales Growth</div>
                  </div>
                  <div className="rounded-lg bg-white/20 p-4">
                    <Users className="mb-2 h-8 w-8" />
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm opacity-90">Active Users</div>
                  </div>
                </div>
                <div className="rounded-lg bg-white/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm opacity-90">Conversion Rate</span>
                    <span className="text-sm font-semibold">8.4%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/20">
                    <div className="h-2 w-4/5 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-5xl">
              Built with Modern Technology
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Powered by the latest technologies for performance, security, and
              scalability.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Next.js", icon: "⚡" },
              { name: "Framer Motion", icon: "🎭" },
              { name: "Jotai", icon: "⚛️" },
              { name: "Tailwind CSS", icon: "🎨" },
            ].map((tech, index) => (
              <motion.div
                key={index}
                className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg"
                variants={fadeInUp}
                {...scaleOnHover}
              >
                <div className="mb-4 text-4xl">{tech.icon}</div>
                <h3 className="font-semibold">{tech.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
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
                className="border-white px-8 py-6 text-lg text-white hover:bg-white hover:text-blue-600"
                {...scaleOnHover}
              >
                Schedule Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
