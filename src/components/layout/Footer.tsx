'use client';

import Link from "next/link";
import { Mail, Twitter, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "@/components/providers/LocaleProvider";

const socialLinks = [
  { href: "https://twitter.com/tamkinly", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/tamkinly", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com/company/tamkinly", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@tamkinly.com", icon: Mail, label: "Email" },
];

export function Footer() {
  const t = useTranslations("footer");

  const companyLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/methodology", label: t("ourMethodology") },
    { href: "/resources", label: t("resources") },
    { href: "/contact", label: t("contact") },
  ];

  const productLinks = [
    { href: "/products", label: t("allProducts") },
    { href: "/products#planner", label: t("identityRecodePlanner") },
    { href: "/products#bundle", label: t("bundlePackages") },
  ];

  const supportLinks = [
    { href: "/faq", label: t("faq") },
    { href: "/privacy", label: t("privacyPolicy") },
    { href: "/terms", label: t("termsOfService") },
    { href: "/refund", label: t("refundPolicy") },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-accent">
                Tamkinly
              </span>
            </Link>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("company")}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("products")}</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("support")}</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              © {new Date().getFullYear()} Tamkinly. All rights reserved.
            </p>
            <p className="text-sm text-accent italic">
              &quot;{t("tagline")}&quot;
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
