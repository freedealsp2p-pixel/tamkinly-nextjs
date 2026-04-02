'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sun, 
  ArrowRight, 
  RefreshCw,
  Lightbulb,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

export default function DailyReflectionPreview() {
  const t = useTranslations();
  const { direction } = useLocale();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [reflection, setReflection] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const previewPrompts = [
    {
      theme: t("reflection.promptsList.selfAwareness.theme"),
      prompt: t("reflection.promptsList.selfAwareness.prompt"),
      color: '#3DD4B0'
    },
    {
      theme: t("reflection.promptsList.identityShift.theme"),
      prompt: t("reflection.promptsList.identityShift.prompt"),
      color: '#1F6F78'
    },
    {
      theme: t("reflection.promptsList.growthMindset.theme"),
      prompt: t("reflection.promptsList.growthMindset.prompt"),
      color: '#64B5F6'
    },
    {
      theme: t("reflection.promptsList.valuesAlignment.theme"),
      prompt: t("reflection.promptsList.valuesAlignment.prompt"),
      color: '#E57373'
    },
    {
      theme: t("reflection.promptsList.futureSelf.theme"),
      prompt: t("reflection.promptsList.futureSelf.prompt"),
      color: '#81C784'
    }
  ];

  const themePills = [
    { name: t("reflection.themePills.selfAwareness"), color: '#3DD4B0' },
    { name: t("reflection.themePills.identityShift"), color: '#1F6F78' },
    { name: t("reflection.themePills.growthMindset"), color: '#64B5F6' },
    { name: t("reflection.themePills.valuesAlignment"), color: '#E57373' },
    { name: t("reflection.themePills.emotionalIntelligence"), color: '#BA68C8' },
    { name: t("reflection.themePills.environmentalDesign"), color: '#FFB74D' },
    { name: t("reflection.themePills.futureSelf"), color: '#81C784' }
  ];

  const currentPrompt = previewPrompts[currentPromptIndex];

  // Auto-rotate prompts every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPromptIndex((prev) => (prev + 1) % previewPrompts.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);

    return () => clearInterval(interval);
  }, [previewPrompts.length]);

  const handleNextPrompt = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % previewPrompts.length);
      setIsAnimating(false);
    }, 300);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setReflection(text);
    setCharCount(text.length);
  };

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            <Sun className="w-3.5 h-3.5 mr-1" />
            {t("reflection.badge")}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-6">
            {t("reflection.title")} <span className="text-[#3DD4B0]">{t("reflection.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            {t("reflection.subtitle")}
          </p>
        </div>

        {/* Main Preview Card */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] overflow-hidden">
            <CardContent className="p-0">
              {/* Prompt Display Area */}
              <div className="p-6 sm:p-8">
                {/* Theme Badge & Controls */}
                <div className="flex items-center justify-between mb-6">
                  <Badge 
                    className="font-medium px-3 py-1.5"
                    style={{ 
                      backgroundColor: `${currentPrompt.color}20`, 
                      color: currentPrompt.color,
                      border: `1px solid ${currentPrompt.color}30`
                    }}
                  >
                    <Lightbulb className="w-3 h-3 mr-1.5" />
                    {currentPrompt.theme}
                  </Badge>
                  <Button
                    onClick={handleNextPrompt}
                    variant="ghost"
                    size="sm"
                    className="text-white/70 hover:text-white hover:bg-white/10"
                    title="Next prompt"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </div>

                {/* Prompt Text with Animation */}
                <div 
                  className={`transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}
                >
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed mb-6">
                    &ldquo;{currentPrompt.prompt}&rdquo;
                  </h3>
                </div>

                {/* Textarea for Quick Reflection */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/80">
                    {t("reflection.quickReflection")}
                  </label>
                  <Textarea
                    placeholder={t("reflection.placeholder")}
                    value={reflection}
                    onChange={handleTextChange}
                    className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#3DD4B0]/50 focus:ring-[#3DD4B0]/20 resize-none"
                  />
                  <div className="flex justify-between items-center text-xs text-white/50">
                    <span>{charCount} {t("reflection.characters")}</span>
                    <span>35 {t("reflection.promptsAvailable")}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Stats Bar */}
              <div className="bg-[#0F1C2E]/50 border-t border-white/10 p-4 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Mini Stats */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-[#3DD4B0]" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">35</div>
                        <div className="text-xs text-white/50">{t("reflection.prompts")}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
                      </div>
                      <div>
                        <div className="text-white font-semibold">7</div>
                        <div className="text-xs text-white/50">{t("reflection.themes")}</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href="/apps/daily-reflection">
                    <Button 
                      className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold group"
                    >
                      {t("reflection.tryFullTool")}
                      <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} w-4 h-4 group-hover:translate-x-1 transition-transform`} />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {themePills.map((theme) => (
              <span
                key={theme.name}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 cursor-default"
                style={{ 
                  backgroundColor: `${theme.color}15`, 
                  color: theme.color,
                  border: `1px solid ${theme.color}20`
                }}
              >
                {theme.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
