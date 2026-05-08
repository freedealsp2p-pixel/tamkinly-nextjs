'use client';

import Link from "next/link";
import { Mail, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { useTranslations } from "@/components/providers/LocaleProvider";

const socialLinkData = [
  { href: "https://twitter.com/tamkinly", icon: Twitter, labelKey: "socialTwitter" as const },
  { href: "https://instagram.com/tamkinly", icon: Instagram, labelKey: "socialInstagram" as const },
  { href: "https://linkedin.com/company/tamkinly", icon: Linkedin, labelKey: "socialLinkedin" as const },
  { href: "https://youtube.com/@tamkinly", icon: Youtube, labelKey: "socialYoutube" as const },
  { href: "mailto:hello@tamkinly.com", icon: Mail, labelKey: "socialEmail" as const },
];

export function Footer() {
  const t = useTranslations("footer");

  const companyLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/methodology", label: t("ourMethodology") },
    { href: "/resources", label: t("resources") },
    { href: "/contact", label: t("contact") },
    { href: "/blog", label: t("blog") },
  ];

  const productLinks = [
    { href: "/products", label: t("allProducts") },
    { href: "/products/trial", label: t("trialProduct") },
    { href: "/products/planner", label: t("plannerProduct") },
    { href: "/products/bundle", label: t("bundleProduct") },
  ];

  const appsLinks = [
    { href: "/apps", label: t("allApps") },
    { href: "/apps/identity-gap-quiz", label: t("identityQuiz") },
    { href: "/apps/habit-tracker", label: t("habitTracker") },
    { href: "/apps/goal-system", label: t("goalSystem") },
    { href: "/apps/ai-identity-coach", label: t("aiCoach") },
  ];

  const supportLinks = [
    { href: "/faq", label: t("faq") },
    { href: "/privacy", label: t("privacyPolicy") },
    { href: "/terms", label: t("termsOfService") },
    { href: "/refund", label: t("refundPolicy") },
  ];

  const socialLinks = socialLinkData.map((s) => ({
    ...s,
    label: t(s.labelKey),
  }));

  return (
    <footer className="bg-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-serif text-xl font-bold text-accent mb-2">
              {t("newsletterTitle")}
            </h3>
            <p className="text-slate-300 text-sm mb-4">
              {t("newsletterDescription")}
            </p>
            <div className="max-w-md mx-auto">
              <Link 
                href="/quiz" 
                className="block bg-accent text-primary font-semibold py-3 px-6 rounded-lg hover:bg-accent/90 transition-colors text-center"
              >
                {t("startFreeAssessment")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-accent">
                Tamkinly
              </span>
            </Link>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed max-w-sm">
              {t("description")}
            </p>
            <p className="mt-2 text-accent italic text-sm">
              "{t("tagline")}"
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
                  title={social.label}
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

          {/* Apps Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("apps")}</h3>
            <ul className="space-y-3">
              {appsLinks.map((link) => (
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

        {/* Support Links Row */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            {supportLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              {t("copyright").replace('{year}', String(new Date().getFullYear()))}
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span>{t("madeWith")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
