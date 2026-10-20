'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Timer, CreditCard, Gauge, FlaskConical,
  HeartHandshake, BookOpen, Library, Check, Sparkles,
} from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { useTranslations } from "@/components/providers/LocaleProvider";

const quizPoints = [
  { icon: Timer, key: "point1" },
  { icon: CreditCard, key: "point2" },
  { icon: Gauge, key: "point3" },
  { icon: FlaskConical, key: "point4" },
];

const moreTools = [
  { href: "/recovery", icon: HeartHandshake, titleKey: "recoveryTitle", descKey: "recoveryDesc", ctaKey: "recoveryCta" },
  { href: "/guides", icon: BookOpen, titleKey: "guidesTitle", descKey: "guidesDesc", ctaKey: "guidesCta" },
  { href: "/resources", icon: Library, titleKey: "resourcesTitle", descKey: "resourcesDesc", ctaKey: "resourcesCta" },
];

const trustChips = ["trust1", "trust2", "trust3"];

export default function FreeToolPage() {
  const t = useTranslations("freeToolPage");
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Free Tool", url: "/free-tool" },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30 mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              {t("heroBadge")}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t("heroTitle")} {t("heroTitleHighlight")}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main free tool: Identity Gap Assessment */}
      <section className="py-16 lg:py-24 bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-3xl mx-auto border-2 border-[#3DD4B0]/30 shadow-lg">
            <CardContent className="p-8 lg:p-12 text-center">
              <Badge variant="secondary" className="bg-[#3DD4B0]/10 text-[#1F6F78] mb-6">
                {t("quizBadge")}
              </Badge>
              <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                {t("quizTitle")}
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed max-w-xl mx-auto">
                {t("quizDesc")}
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-10 text-start">
                {quizPoints.map((point) => (
                  <div key={point.key} className="flex items-center gap-3 bg-white border border-slate-200 rounded-lg p-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#3DD4B0]/15 flex items-center justify-center">
                      <point.icon className="w-5 h-5 text-[#1F6F78]" />
                    </span>
                    <span className="text-sm text-[#0F1C2E] font-medium">
                      {t(point.key)}
                    </span>
                  </div>
                ))}
              </div>

              <Link href="/quiz">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8 text-base">
                  {t("quizCta")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-4">{t("quizNote")}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* More free tools */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#0F1C2E] mb-3">
                {t("moreTitle")}
              </h2>
              <p className="text-slate-600 max-w-xl mx-auto">
                {t("moreSubtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {moreTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-slate-200">
                    <CardContent className="p-6 lg:p-8">
                      <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#3DD4B0]/15 flex items-center justify-center mb-5">
                        <tool.icon className="w-6 h-6 text-[#1F6F78]" />
                      </span>
                      <h3 className="text-lg font-bold text-[#0F1C2E] mb-3">
                        {t(tool.titleKey)}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-5">
                        {t(tool.descKey)}
                      </p>
                      <span className="text-[#1F6F78] font-medium flex items-center gap-1 text-sm">
                        {t(tool.ctaKey)}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-12">
              {trustChips.map((chip) => (
                <span key={chip} className="flex items-center gap-2 bg-[#F6F8FA] border border-slate-200 rounded-full px-4 py-2 text-sm text-[#0F1C2E]">
                  <Check className="w-4 h-4 text-[#3DD4B0]" />
                  {t(chip)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#F6F8FA]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0F1C2E] mb-4">
            {t("ctaTitle")}
          </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">
            {t("ctaSubtitle")}
          </p>
          <Link href="/products">
            <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8">
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
