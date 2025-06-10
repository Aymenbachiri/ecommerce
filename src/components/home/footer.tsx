"use client";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "./animation";
import { Heart, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import React from "react";

type FooterSection = {
  title: string;
  links: { name: string; href: string }[];
};

export function Footer(): React.JSX.Element {
  const t = useTranslations("Footer");

  const footerSections: FooterSection[] = [
    {
      title: t("productSection.title"),
      links: [
        { name: t("productSection.features"), href: "#" },
        { name: t("productSection.pricing"), href: "#" },
        { name: t("productSection.demo"), href: "#" },
      ],
    },
    {
      title: t("companySection.title"),
      links: [
        { name: t("companySection.about"), href: "#" },
        { name: t("companySection.blog"), href: "#" },
        { name: t("companySection.careers"), href: "#" },
      ],
    },
    {
      title: t("supportSection.title"),
      links: [
        { name: t("supportSection.helpCenter"), href: "#" },
        { name: t("supportSection.contact"), href: "#" },
        { name: t("supportSection.status"), href: "#" },
      ],
    },
  ];

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
            <p className="text-muted-foreground">{t("description")}</p>
          </motion.div>

          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="mb-4 font-semibold">{section.title}</h3>
              <ul className="text-muted-foreground space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-muted-foreground mt-8 border-t pt-8 text-center"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <p className="flex items-center justify-center gap-2">
            {t.rich("builtBy", {
              heartIcon: () => <Heart className="fill-red-600 text-red-600" />,
            })}{" "}
            <a
              className="underline"
              href="https://www.linkedin.com/in/aymen-bachiri-9442b5287/"
              target="_blank"
            >
              Aymen
            </a>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
