'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { useTranslations } from "@/components/providers/LocaleProvider";

function formatReadTime(readTime: string, t: (key: string) => string): string {
  const match = readTime.match(/^(\d+)\s+min\s+read$/);
  if (match) {
    return match[1] + ' ' + t('minRead');
  }
  return readTime;
}

const guides = [
  {
    slug: "identity-vs-behavior-change",
    titleKey: "guide1Title",
    excerptKey: "guide1Excerpt",
    categoryKey: "guide1Category",
    readTimeKey: "guide1ReadTime",
    featured: true,
  },
  {
    slug: "recode-identity-30-days",
    titleKey: "guide2Title",
    excerptKey: "guide2Excerpt",
    categoryKey: "guide2Category",
    readTimeKey: "guide2ReadTime",
    featured: false,
  },
  {
    slug: "behavior-trap-why-habits-fail",
    titleKey: "guide3Title",
    excerptKey: "guide3Excerpt",
    categoryKey: "guide3Category",
    readTimeKey: "guide3ReadTime",
    featured: false,
  },
  {
    slug: "environment-shapes-you",
    titleKey: "guide4Title",
    excerptKey: "guide4Excerpt",
    categoryKey: "guide4Category",
    readTimeKey: "guide4ReadTime",
    featured: false,
  },
];

export default function GuidesPage() {
  const t = useTranslations('guidesPage');
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
  ]);

  return (
    <>
      <JsonLd data={[breadcrumbSchema]} />

      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30 mb-6">
              <BookOpen className="w-4 h-4 mr-2" />
              {t('heroBadge')}
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {guides.map((guide, index) => (
              <Link key={index} href={'/guides/' + guide.slug}>
                <Card className={'h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ' + (guide.featured ? 'border-2 border-[#3DD4B0]/30 md:col-span-2' : 'border border-slate-200')}>
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="bg-[#3DD4B0]/10 text-[#1F6F78]">
                        {t(guide.categoryKey)}
                      </Badge>
                      {guide.featured && (
                        <Badge className="bg-[#3DD4B0] text-[#0F1C2E]">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-bold text-[#0F1C2E] mb-3">
                      {t(guide.titleKey)}
                    </h2>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {t(guide.excerptKey)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" />
                        {formatReadTime(t(guide.readTimeKey), t)}
                      </div>
                      <span className="text-[#1F6F78] font-medium flex items-center gap-1 text-sm">
                        {t('readGuide')}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#0F1C2E] mb-4">
              {t('ctaTitle')}{t('ctaTitleHighlight')}{t('ctaTitleEnd')}
            </h2>
          <p className="text-slate-600 mb-8 max-w-xl mx-auto">{t('ctaSubtitle')}</p>
          <Link href="/products/mastery">
            <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8">
              {t('viewProducts')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
