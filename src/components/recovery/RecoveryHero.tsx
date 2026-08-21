'use client';

import { motion } from "framer-motion";
import { useTranslations } from "@/components/providers/LocaleProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Sparkles } from "lucide-react";

export default function RecoveryHero() {
  const t = useTranslations("recoveryPage");

  return (
    <section className="relative overflow-hidden bg-[#0F1C2E]">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1C2E] via-[#1F6F78]/20 to-[#3DD4B0]/10" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-36">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 border-[#3DD4B0]/20 bg-[#3DD4B0]/10 text-[#3DD4B0]">
              {t("hero.badge")}
            </Badge>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-relaxed text-slate-300">
              {t("hero.description")}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#3DD4B0]/90"
              >
                {t("hero.primaryButton")}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-white hover:bg-white/5"
              >
                {t("hero.secondaryButton")}
              </Button>
            </div>
          </motion.div>

          {/* Right column - card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-[#3DD4B0]/10 p-3">
                    <Brain className="h-6 w-6 text-[#3DD4B0]" />
                  </div>

                  <div className="rounded-xl bg-[#C97B7B]/10 p-3">
                    <Sparkles className="h-6 w-6 text-[#C97B7B]" />
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-semibold text-white">
                  {t("hero.cardTitle")}
                </h3>

                <p className="leading-relaxed text-slate-300">
                  {t("hero.cardDescription")}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[#3DD4B0]">
                  <span className="text-sm font-medium">
                    {t("hero.primaryButton")}
                  </span>

                  <ArrowRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
