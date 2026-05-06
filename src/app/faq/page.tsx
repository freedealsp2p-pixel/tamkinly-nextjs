'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  ArrowRight,
  Package,
  CreditCard,
  Download,
  RefreshCw,
  Shield,
  Clock
} from 'lucide-react';
import { useTranslations } from '@/components/providers/LocaleProvider';

const categoryIcons = [Package, CreditCard, Download, RefreshCw];
const quickAnswerIcons = [Clock, Shield, RefreshCw, Download];

export default function FAQPage() {
  const t = useTranslations("faqPage");

  // Build FAQ categories from translation data
  const faqCategories = [0, 1, 2, 3].map((catIndex) => {
    const questionCount = catIndex === 3 ? 2 : 3; // Returns & Refunds has 2 questions
    return {
      title: t(`categories.${catIndex}.title`),
      icon: categoryIcons[catIndex],
      questions: Array.from({ length: questionCount }, (_, qIndex) => ({
        q: t(`categories.${catIndex}.questions.${qIndex}.q`),
        a: t(`categories.${catIndex}.questions.${qIndex}.a`)
      }))
    };
  });

  // Build quick answers from translation data
  const quickAnswers = [0, 1, 2, 3].map((index) => ({
    icon: quickAnswerIcons[index],
    title: t(`quickAnswers.${index}.title`),
    description: t(`quickAnswers.${index}.description`)
  }));

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
              <HelpCircle className="w-3.5 h-3.5 mr-2" />
              {t("heroBadge")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickAnswers.map((item, index) => (
              <Card key={index} className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#8A94A6]">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            {faqCategories.map((category, catIndex) => (
              <Card key={catIndex} className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-[#0F1C2E] flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#1F6F78]/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${catIndex}-${index}`} className="border-b border-slate-200 last:border-0">
                        <AccordionTrigger className="text-left text-[#0F1C2E] hover:text-[#1F6F78] py-4">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-[#2B2E34] leading-relaxed pb-4">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0F1C2E] mb-4">
              {t("stillHaveQuestions")}
            </h2>
            <p className="text-[#8A94A6] mb-8">
              {t("supportTeamHere")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                  <Mail className="w-4 h-4 mr-2" />
                  {t("contactSupport")}
                </Button>
              </Link>
              <a href="mailto:hello@tamkinly.com">
                <Button variant="outline" className="h-12 px-8">
                  hello@tamkinly.com
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
