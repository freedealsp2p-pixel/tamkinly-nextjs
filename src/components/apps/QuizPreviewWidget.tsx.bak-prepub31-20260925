'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Brain, 
  Target, 
  TrendingUp,
  User,
  Heart,
  Compass
} from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

/**
 * Quiz Preview Widget
 * Interactive preview of the Identity Gap Assessment
 */
export default function QuizPreviewWidget() {
  const t = useTranslations();
  const { direction } = useLocale();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const sampleQuestions = [
    {
      question: t("quiz.q1.question"),
      options: [
        { text: t("quiz.q1.option1"), icon: Target },
        { text: t("quiz.q1.option2"), icon: User },
        { text: t("quiz.q1.option3"), icon: Compass },
        { text: t("quiz.q1.option4"), icon: Heart }
      ]
    },
    {
      question: t("quiz.q2.question"),
      options: [
        { text: t("quiz.q2.option1"), icon: Target },
        { text: t("quiz.q2.option2"), icon: Brain },
        { text: t("quiz.q2.option3"), icon: Heart },
        { text: t("quiz.q2.option4"), icon: TrendingUp }
      ]
    }
  ];

  const handleSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] relative">
      {/* Background Pattern - contained within overflow wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("quiz.title")}&nbsp;<span className="text-[#3DD4B0]">{t("quiz.titleHighlight")}</span>
            </h2>
            <p className="text-slate-300 text-lg">
              {t("quiz.subtitle")}
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              {!showResult ? (
                <>
                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-slate-400 mb-2">
                      <span>{t("quiz.questionOf")} {currentQuestion + 1} {t("quiz.of")} {sampleQuestions.length}</span>
                      <span>{t("quiz.previewMode")}</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-white/20" />
                  </div>

                  {/* Question */}
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">
                    {sampleQuestions[currentQuestion].question}
                  </h3>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {sampleQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelect(index)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-3 ${
                          selectedAnswer === index
                            ? 'border-[#3DD4B0] bg-[#3DD4B0]/10 text-white'
                            : 'border-white/20 bg-white/5 text-slate-300 hover:border-white/40 hover:bg-white/10'
                        }`}
                      >
                        <option.icon className={`h-5 w-5 flex-shrink-0 ${
                          selectedAnswer === index ? 'text-[#3DD4B0]' : ''
                        }`} />
                        <span className="text-sm sm:text-base">{option.text}</span>
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400">
                      {t("quiz.fullAssessment")}
                    </p>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                      className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                    >
                      {currentQuestion < sampleQuestions.length - 1 ? t("quiz.next") : t("quiz.seeResult")}
                      <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
                    </Button>
                  </div>
                </>
              ) : (
                /* Preview Result */
                <div className="text-center py-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#3DD4B0]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t("quiz.previewComplete")}
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-md mx-auto">
                    {t("quiz.previewDescription")}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={handleRestart}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      {t("quiz.tryAgain")}
                    </Button>
                    <Link href="/quiz">
                      <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                        <Play className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                        {t("quiz.startFull")}
                        <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
                      </Button>
                    </Link>
                  </div>

                  <p className="text-xs text-slate-400 mt-6">
                    {t("quiz.freeInstant")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-slate-400">
              <User className="h-5 w-5 text-[#3DD4B0]" />
              <span className="font-semibold text-white">2,847+</span>
              <span>{t("quiz.assessed")}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <TrendingUp className="h-5 w-5 text-[#3DD4B0]" />
              <span className="font-semibold text-white">94%</span>
              <span>{t("quiz.accuracy")}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <Target className="h-5 w-5 text-[#3DD4B0]" />
              <span className="font-semibold text-white">5</span>
              <span>{t("quiz.dimensions")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
