'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { getRecommendation } from '@/lib/quiz-recommendations';
import type { QuizRecommendation } from '@/lib/quiz-recommendations';
import { 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Heart, 
  User,
  Compass,
  TrendingUp,
  CheckCircle2,
  Target,
  Shield,
  Clock,
  Zap,
  RefreshCw,
  Share2,
  Save,
  LogIn,
  ArrowUpRight,
  BarChart3,
  Package,
  CircleDot,
  ChevronRight,
  Mail,
  Loader2,
} from 'lucide-react';

import { Input } from "@/components/ui/input";
// Types
type QuizResults = {
  overallScore: number;
  identityClarity: number;
  environmentalAlignment: number;
  emotionalRegulation: number;
  decisionQuality: number;
  progressMomentum: number;
  dominantChallenge: string;
  dominantChallengeAr: string;
  recommendedProduct: string;
  personalizedMessage: string;
  personalizedMessageAr: string;
  timestamp: string;
};

// Products data — NEW MODEL: 3 monthly subscription tiers
const products = [
  {
    id: 'basic',
    name: 'Basic (Monthly)',
    nameAr: 'أساسي (شهري)',
    price: '$7/mo',
    originalPrice: '$15',
    description: 'Start with a focused 7-day discipline journey into identity transformation',
    descriptionAr: 'ابدأ برحلة انضباط لمدة 7 أيام في تحول الهوية',
    features: ['7-Day Guided Discipline Journey', 'Daily identity prompts', 'Evidence tracking basics', 'Progress dashboard', 'Cancel anytime'],
    featuresAr: ['رحلة انضباط موجهة لمدة 7 أيام', 'مطالبات الهوية اليومية', 'أساسيات تتبع الأدلة', 'لوحة تتبع التقدم', 'إلغاء في أي وقت'],
    bestFor: 'Curious explorers ready to test the methodology',
    bestForAr: 'المستكشفون الفضوليون الجاهزون لتجربة المنهجية',
    color: '#3DD4B0',
    productUrl: '/products/basic'
  },
  {
    id: 'premium',
    name: 'Premium (Monthly)',
    nameAr: 'مميز (شهري)',
    price: '$17/mo',
    originalPrice: '$29',
    description: 'The complete 30-day transformation system with interactive apps',
    descriptionAr: 'نظام التحول الكامل لمدة 30 يوماً مع تطبيقات تفاعلية',
    features: ['Everything in Basic', '30-Day Identity Planner', 'Executive Manual', 'Identity Baseline Worksheet', 'Digital + Print PDFs', 'Cancel anytime'],
    featuresAr: ['كل ما في الأساسي', 'مخطط الهوية لمدة 30 يوم', 'الدليل التنفيذي', 'ورقة عمل خط الأساس', 'PDF رقمي + للطباعة', 'إلغاء في أي وقت'],
    bestFor: 'Those ready for deep transformation',
    bestForAr: 'الجاهزون لتحول عميق',
    color: '#1F6F78',
    popular: true,
    productUrl: '/products/premium'
  },
  {
    id: 'mastery',
    name: 'Mastery (Monthly)',
    nameAr: 'إتقان (شهري)',
    price: '$27/mo',
    originalPrice: '$91',
    description: 'The ultimate package: All apps + AI coaching + community access',
    descriptionAr: 'الحزمة النهائية: كل التطبيقات + مدرب AI + مجتمع',
    features: ['Everything in Premium', 'All Interactive Apps', 'AI Identity Coach', 'Transformation Community', 'Priority Support', 'Emotion Regulation Toolkit', 'Cancel anytime'],
    featuresAr: ['كل ما في المميز', 'جميع التطبيقات التفاعلية', 'مدرب الهوية AI', 'مجتمع التحول', 'دعم ذو أولوية', 'أدوات تنظيم المشاعر', 'إلغاء في أي وقت'],
    bestFor: 'Those who want the complete transformation experience',
    bestForAr: 'من يريدون تجربة التحول الكاملة',
    color: '#0F1C2E',
    productUrl: '/products/mastery'
  }
];

// Dimension visualization component
const DimensionBar = ({ 
  label, 
  labelAr, 
  value, 
  color, 
  icon: Icon,
  locale 
}: { 
  label: string; 
  labelAr: string; 
  value: number; 
  color: string; 
  icon: React.ElementType;
  locale: 'en' | 'ar';
}) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
    <div className="flex items-center gap-3 mb-3">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-[#0F1C2E]">{locale === 'ar' ? labelAr : label}</h4>
        <p className="text-sm text-[#8A94A6]">{value}%</p>
      </div>
      <div 
        className="text-2xl font-bold"
        style={{ color }}
      >
        {value}%
      </div>
    </div>
    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out"
        style={{ 
          width: `${value}%`,
          backgroundColor: color
        }}
      />
    </div>
  </div>
);

// Transformation map visualization
const TransformationMap = ({ 
  scores, 
  locale 
}: { 
  scores: { overall: number; dimensions: { name: string; nameAr: string; value: number; color: string }[] };
  locale: 'en' | 'ar';
}) => {
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const currentStateLabel = getText('Current State', 'الحالة الحالية');
  const targetStateLabel = getText('Target State', 'الحالة المستهدفة');
  
  return (
    <div className="bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] rounded-2xl p-6 md:p-8 text-white">
      <h3 className="text-xl font-bold mb-2">
        {getText('Personal Transformation Map', 'خارطة التحول الشخصية')}
      </h3>
      <p className="text-slate-300 mb-6">
        {getText('Your journey from current state to your target identity', 'رحلتك من الحالة الحالية إلى هويتك المستهدفة')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-white/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#B88A8E]" />
            <h4 className="font-semibold">{currentStateLabel}</h4>
          </div>
          <div className="space-y-3">
            {scores.dimensions.map((dim) => (
              <div key={dim.name} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{getText(dim.name, dim.nameAr)}</span>
                <span className="font-semibold" style={{ color: dim.color }}>{dim.value}%</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{getText('Overall Identity Score', 'درجة الهوية العامة')}</span>
              <span className="text-xl font-bold text-[#3DD4B0]">{scores.overall}%</span>
            </div>
          </div>
        </div>
        
        {/* Target State */}
        <div className="bg-white/10 rounded-xl p-5 border-2 border-[#3DD4B0]/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#3DD4B0]" />
            <h4 className="font-semibold">{targetStateLabel}</h4>
          </div>
          <div className="space-y-3">
            {scores.dimensions.map((dim) => (
              <div key={dim.name} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{getText(dim.name, dim.nameAr)}</span>
                <span className="font-semibold text-[#3DD4B0]">85%+</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">{getText('Target Goal', 'الهدف المثالي')}</span>
              <span className="text-xl font-bold text-[#3DD4B0]">85%+</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gap indicator */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{85 - scores.overall}%</div>
          <div className="text-sm text-slate-300">{getText('Transformation Gap', 'فجوة التحول')}</div>
        </div>
        <div className="h-12 w-px bg-white/30" />
        <div className="text-center">
          <div className="text-3xl font-bold text-[#3DD4B0]">{Math.ceil((85 - scores.overall) / 5)}</div>
          <div className="text-sm text-slate-300">{getText('Est. Weeks', 'أسابيع مقدرة')}</div>
        </div>
      </div>
    </div>
  );
};

// Dynamic Recommendation Hero Section
const RecommendationHero = ({ 
  recommendation, 
  score, 
  locale 
}: { 
  recommendation: QuizRecommendation; 
  score: number; 
  locale: 'en' | 'ar';
}) => {
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const isAr = locale === 'ar';
  const tierColor = recommendation.color;

  return (
    <div 
      className="relative overflow-hidden rounded-2xl"
      style={{ 
        background: `linear-gradient(135deg, ${tierColor}15 0%, ${tierColor}08 50%, transparent 100%)` 
      }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: tierColor }}
      />
      <div 
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full blur-2xl opacity-10"
        style={{ backgroundColor: tierColor }}
      />
      
      <div className="relative p-6 md:p-8 lg:p-10">
        {/* Tier badge and score */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div 
            className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
            style={{ 
              backgroundColor: `${tierColor}20`,
              color: tierColor,
              border: `1px solid ${tierColor}40`
            }}
          >
            {recommendation.tier}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8A94A6]">
              {getText('Identity Alignment Score:', 'درجة توافق الهوية:')}
            </span>
            <span className="text-2xl font-bold" style={{ color: tierColor }}>{score}%</span>
          </div>
        </div>

        {/* Tier title */}
        <h2 
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
          style={{ color: tierColor }}
        >
          {getText(recommendation.titleEn, recommendation.titleAr)}
        </h2>

        {/* Personalized description */}
        <p className="text-base md:text-lg text-[#0F1C2E] leading-relaxed max-w-3xl mb-8">
          {getText(recommendation.descriptionEn, recommendation.descriptionAr)}
        </p>

        {/* Recommended Product Card */}
        <Card className="border-2 bg-white/95 backdrop-blur-sm overflow-hidden mb-6" style={{ borderColor: `${tierColor}40` }}>
          <CardContent className="p-0">
            {/* Product card header with gradient */}
            <div 
              className="p-5 md:p-6"
              style={{ 
                background: `linear-gradient(135deg, ${tierColor}12 0%, transparent 100%)` 
              }}
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tierColor}20` }}
                >
                  <Package className="w-6 h-6" style={{ color: tierColor }} />
                </div>
                <div className="flex-1">
                  <Badge 
                    className="mb-2 text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${tierColor}15`,
                      color: tierColor,
                      border: `1px solid ${tierColor}30`
                    }}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {getText('Recommended for you', 'موصى به لك')}
                  </Badge>
                  <h3 className="text-xl font-bold text-[#0F1C2E] mb-1">
                    {getText(recommendation.productNameEn, recommendation.productNameAr)}
                  </h3>
                </div>
              </div>
            </div>
            
            {/* Why this fits */}
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: tierColor }}>
                {getText('Why this fits you', 'لماذا يناسبك هذا')}
              </h4>
              <p className="text-[#0F1C2E] leading-relaxed text-sm mb-5">
                {getText(recommendation.productReasonEn, recommendation.productReasonAr)}
              </p>
              <Link href={`/products/${recommendation.recommendedProduct}`}>
                <Button 
                  className="h-12 px-8 font-semibold text-base"
                  style={{ 
                    backgroundColor: tierColor,
                    color: tierColor === '#3DD4B0' || tierColor === '#7AEEE0' ? '#0F1C2E' : '#FFFFFF'
                  }}
                >
                  {getText(recommendation.ctaEn, recommendation.ctaAr)}
                  <ArrowRight className={`${isAr ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps Checklist */}
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 md:p-6 border border-slate-100">
          <h4 className="font-bold text-[#0F1C2E] mb-4 flex items-center gap-2">
            <CircleDot className="w-5 h-5" style={{ color: tierColor }} />
            {getText('Your Next Steps', 'خطواتك التالية')}
          </h4>
          <div className="space-y-3">
            {recommendation.nextSteps.map((step, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5"
                  style={{ 
                    backgroundColor: `${tierColor}15`,
                    color: tierColor
                  }}
                >
                  {index + 1}
                </div>
                <p className="text-[#0F1C2E] text-sm leading-relaxed">
                  {getText(step.stepEn, step.stepAr)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Results Page Component
export default function QuizResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const { locale, direction } = useLocale();
  const { data: session } = useSession();

  useEffect(() => {
    // Load results from localStorage
    const loadResults = () => {
      const storedResults = localStorage.getItem('quizResults');
      if (storedResults) {
        try {
          const parsed = JSON.parse(storedResults);
          // Use microtask to avoid synchronous setState warning
          Promise.resolve().then(() => {
            setResults(parsed);
            setIsLoading(false);
            // Auto-save for logged-in users
            if (session?.user?.id) {
              saveResultsToDB(parsed);
            }
          });
        } catch (e) {
          console.error('Error parsing quiz results:', e);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    loadResults();
  }, [session]);

  // Save results to database for logged-in users
  const saveResultsToDB = async (quizResults: QuizResults) => {
    if (!session?.user?.id || saveSuccess) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quiz-results',
          data: {
            overallScore: quizResults.overallScore,
            identityClarity: quizResults.identityClarity,
            environmentalAlignment: quizResults.environmentalAlignment,
            emotionalRegulation: quizResults.emotionalRegulation,
            decisionQuality: quizResults.decisionQuality,
            progressMomentum: quizResults.progressMomentum,
            dominantChallenge: quizResults.dominantChallenge,
            recommendedProduct: quizResults.recommendedProduct,
            personalizedMessage: quizResults.personalizedMessage,
          },
        }),
      });
      if (response.ok) {
        setSaveSuccess(true);
      }
    } catch (error) {
      console.error('Failed to save results:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Get text based on language
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  // Get score description
  const getScoreDescription = (score: number) => {
    if (score >= 70) return getText('Strong foundation with room for optimization', 'أساس قوي مع مجال للتحسين');
    if (score >= 50) return getText('Good potential with clear growth opportunities', 'إمكانات جيدة مع فرص نمو واضحة');
    if (score >= 35) return getText('Significant transformation potential', 'إمكانات تحول كبيرة');
    return getText('Major breakthrough opportunity ahead', 'فرصة اختراق كبيرة في الأفق');
  };

  // Memoized dimension scores
  const dimensionScores = useMemo(() => {
    if (!results) return [];
    return [
      { name: 'Identity Clarity', nameAr: 'وضوح الهوية', value: results.identityClarity, color: '#3DD4B0', icon: User },
      { name: 'Environmental Alignment', nameAr: 'التوافق البيئي', value: results.environmentalAlignment, color: '#1F6F78', icon: Compass },
      { name: 'Emotional Regulation', nameAr: 'التنظيم العاطفي', value: results.emotionalRegulation, color: '#C97B7B', icon: Heart },
      { name: 'Decision Quality', nameAr: 'جودة القرارات', value: results.decisionQuality, color: '#2A8A94', icon: Brain },
      { name: 'Progress Momentum', nameAr: 'زخم التقدم', value: results.progressMomentum, color: '#2A8A94', icon: TrendingUp }
    ];
  }, [results]);

  // Find recommended product (legacy)
  const recommendedProduct = useMemo(() => {
    if (!results) return null;
    return products.find(p => p.id === results.recommendedProduct);
  }, [results]);

  // Get dynamic recommendation based on score
  const recommendation = useMemo(() => {
    if (!results) return null;
    return getRecommendation(results.overallScore);
  }, [results]);
  // Flag Recovery as discovered for Dashboard integration
  useEffect(() => {
    if (results?.emotionalRegulation != null && results.emotionalRegulation < 40) {
      try { localStorage.setItem('tamkinly_recovery_discovered', 'true'); } catch {}
    }
  }, [results?.emotionalRegulation]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#3DD4B0] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#8A94A6]">{getText('Loading your results...', 'تحميل نتائجك...')}</p>
        </div>
      </div>
    );
  }

  // No results state
  if (!results) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center shadow-xl">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-[#3DD4B0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Target className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F1C2E] mb-4">
              {getText('No Results Available', 'لا توجد نتائج متاحة')}
            </h2>
            <p className="text-[#8A94A6] mb-6">
              {getText('Please complete the assessment first to view your results.', 'يرجى إكمال التقييم أولاً لعرض نتائجك.')}
            </p>
            <Link href="/quiz">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-12 font-semibold">
                <RefreshCw className="mr-2 h-5 w-5" />
                {getText('Take Assessment', 'ابدأ التقييم')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Results Header - Now with dynamic tier color */}
      <div 
        className="py-16 px-4 relative overflow-hidden"
        style={{ 
          background: recommendation 
            ? `linear-gradient(135deg, #0F1C2E 0%, #0F1C2E 60%, ${recommendation.color}30 100%)`
            : 'linear-gradient(135deg, #0F1C2E, #0F1C2E)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge 
            className="mb-6 px-4 py-2 border"
            style={{ 
              backgroundColor: recommendation ? `${recommendation.color}15` : '#3DD4B015',
              color: recommendation ? recommendation.color : '#3DD4B0',
              borderColor: recommendation ? `${recommendation.color}40` : '#3DD4B040'
            }}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
            {getText('Assessment Complete', 'اكتمل التقييم')}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {getText('Your Identity Transformation ', 'خارطة طريق تحول ')}
            <span style={{ color: recommendation ? recommendation.color : '#3DD4B0' }}>
              {getText('Roadmap', 'هويتك')}
            </span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {getText(
              "Based on your responses, we've identified your key growth areas and created a personalized transformation plan.",
              'بناءً على إجاباتك، حددنا مجالات نموك الرئيسية وأنشأنا خطة تحول شخصية.'
            )}
          </p>
        </div>

        {/* Decorative glow */}
        {recommendation && (
          <div 
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ backgroundColor: recommendation.color }}
          />
        )}
      </div>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-8">
        {/* Overall Score Card */}
        <Card className="border-0 shadow-xl bg-white mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div 
              className="p-8 text-center"
              style={{ 
                backgroundColor: '#0F1C2E',
                backgroundImage: recommendation 
                  ? `linear-gradient(135deg, #0F1C2E 0%, ${recommendation.color}20 100%)`
                  : undefined
              }}
            >
              <p className="text-slate-400 mb-2">{getText('Your Identity Alignment Score', 'درجة توافق هويتك')}</p>
              <div 
                className="text-6xl md:text-7xl font-bold mb-2"
                style={{ color: recommendation ? recommendation.color : '#3DD4B0' }}
              >
                {results.overallScore}%
              </div>
              <p className="text-slate-300">
                {getScoreDescription(results.overallScore)}
              </p>
            </div>
            
            <div className="p-8">
              <h3 className="text-xl font-bold text-[#0F1C2E] mb-6">
                {getText('Your Detailed Breakdown', 'تفصيل نتائجك')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {dimensionScores.map((dim) => (
                  <div key={dim.name} className="text-center p-4 rounded-xl bg-slate-50">
                    <dim.icon className="w-8 h-8 mx-auto mb-2" style={{ color: dim.color }} />
                    <div className="text-2xl font-bold text-[#0F1C2E]">{dim.value}%</div>
                    <div className="text-sm text-[#8A94A6]">{locale === 'ar' ? dim.nameAr : dim.name}</div>
                    <Progress value={dim.value} className="h-1.5 mt-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Recommendation Section - NEW */}
        {recommendation && (
          <div className="mb-8">
            <RecommendationHero 
              recommendation={recommendation} 
              score={results.overallScore} 
              locale={locale} 
            />
          </div>
        )}

        {/* Dimensions with detailed bars */}
        <Card className="border-0 shadow-lg bg-white mb-8">
          <CardContent className="p-6 md:p-8">
            <h3 className="text-xl font-bold text-[#0F1C2E] mb-6">
              {getText('Identity Gap Score by Dimension', 'درجة فجوة الهوية حسب البُعد')}
            </h3>
            <div className="space-y-4">
              {dimensionScores.map((dim) => (
                <DimensionBar
                  key={dim.name}
                  label={dim.name}
                  labelAr={dim.nameAr}
                  value={dim.value}
                  color={dim.color}
                  icon={dim.icon}
                  locale={locale}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Transformation Map */}
        <div className="mb-8">
          <TransformationMap 
            scores={{
              overall: results.overallScore,
              dimensions: dimensionScores.map(d => ({ name: d.name, nameAr: d.nameAr, value: d.value, color: d.color }))
            }} 
            locale={locale} 
          />
        </div>

        {/* Key Insight */}
        <Card className="border-2 border-[#3DD4B0]/30 bg-white mb-8">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-[#3DD4B0]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F1C2E] mb-2">
                  {getText('Your Dominant Growth Area', 'مجال نموك الرئيسي')}
                </h3>
                <p className="text-[#8A94A6] mb-4">
                  {getText(
                    `Your assessment reveals that ${results.dominantChallenge} is your primary opportunity for transformation. Addressing this area will create the most significant positive impact on your overall identity alignment.`,
                    `يكشف تقييمك أن ${results.dominantChallengeAr} هو فرصتك الأساسية للتحول. معالجة هذا المجال سيخلق أكبر تأثير إيجابي على توافق هويتك العام.`
                  )}
                </p>
                <p className="text-[#0F1C2E] font-medium">
                  {getText(results.personalizedMessage, results.personalizedMessageAr)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Results Section */}
        <Card className="border-0 shadow-sm bg-[#F6F8FA] mb-8">
          <CardContent className="p-6 md:p-8">
            {session?.user?.id ? (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                  {saveSuccess ? (
                    <CheckCircle2 className="w-6 h-6 text-[#3DD4B0]" />
                  ) : isSaving ? (
                    <div className="w-5 h-5 border-2 border-[#3DD4B0] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-6 h-6 text-[#3DD4B0]" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F1C2E]">
                    {saveSuccess 
                      ? getText('Results saved successfully.', 'تم حفظ النتائج بنجاح.')
                      : isSaving
                        ? getText('Saving your results...', 'جاري حفظ نتائجك...')
                        : getText('Saving your results...', 'جاري حفظ نتائجك...')
                    }
                  </h3>
                  <p className="text-slate-500 text-sm">
                    {saveSuccess 
                      ? getText('You can track your progress anytime from your dashboard.', 'يمكنك تتبع تقدمك في أي وقت من لوحة التحكم.')
                      : getText('Your results are being saved to your account.', 'يتم حفظ نتائجك في حسابك.')
                    }
                  </p>
                </div>
                {saveSuccess && (
                  <Link href="/dashboard" className="ml-auto">
                    <Button variant="outline" className="border-[#3DD4B0] text-[#3DD4B0] text-sm">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      {getText('View Dashboard', 'عرض لوحة التحكم')}
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0">
                    <Save className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0F1C2E]">
                      {getText('Save your results', 'احفظ نتائجك')}
                    </h3>
                    <p className="text-slate-500 text-sm">
                      {getText(
                        'Create a free account to track your progress over time.',
                        'أنشئ حساباً مجانياً لتتبع تقدمك عبر الوقت.'
                      )}
                    </p>
                  </div>
                </div>
                <Link href="/auth/signup" className="whitespace-nowrap">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-11 font-semibold">
                    <LogIn className="mr-2 h-4 w-4" />
                    {getText('Sign in to save', 'سجّل لحفظ النتائج')}
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Products — Quick Comparison */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-[#0F1C2E] text-center mb-4">
            {getText('All Transformation Options', 'جميع خيارات التحول')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {products.map((product) => (
              <Link key={product.id} href={product.productUrl} className="block">
                <Card 
                  className={`border hover:shadow-lg transition-all cursor-pointer h-full ${recommendation?.recommendedProduct === product.id ? `border-2` : 'border-slate-100 hover:border-slate-200'}`}
                  style={recommendation?.recommendedProduct === product.id ? { borderColor: recommendation.color } : undefined}
                >
                  <CardContent className="p-4 text-center">
                    <h4 className="font-bold text-[#0F1C2E] text-sm mb-1">
                      {getText(product.name, product.nameAr)}
                    </h4>
                    <span className="text-lg font-bold" style={{ color: product.color }}>{product.price}</span>
                    {recommendation?.recommendedProduct === product.id && (
                      <Badge 
                        className="mt-2 text-xs"
                        style={{ 
                          backgroundColor: recommendation ? `${recommendation.color}20` : '#3DD4B020',
                          color: recommendation ? recommendation.color : '#3DD4B0'
                        }}
                      >
                        {getText('Recommended', 'موصى به')}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {/* Link to full pricing comparison */}
          <div className="text-center mt-4">
            <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-[#1F6F78] hover:text-[#3DD4B0] transition-colors font-medium">
              <BarChart3 className="w-4 h-4" />
              {getText('View full pricing comparison', 'عرض مقارنة الأسعار الكاملة')}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Universal Closing */}
        <Card className="border-0 shadow-sm bg-white mt-8">
          <CardContent className="p-6 text-center">
            <p className="text-slate-500 text-sm leading-relaxed">
              {getText(
                "Not ready to invest yet? Start with the free Values Clarification Tool — the natural next step after any identity assessment.",
                'لست مستعداً للاستثمار بعد؟ ابدأ بأداة تحديد القيم المجانية — الخطوة الطبيعية التالية بعد أي تقييم هوية.'
              )}
            </p>
            <Link href="/apps" className="inline-block mt-3">
              <Button variant="outline" className="border-[#1F6F78] text-[#1F6F78] hover:bg-[#1F6F78] hover:text-white text-sm">
                {getText('Explore free tools', 'استكشف الأدوات المجانية')}
                <ArrowRight className={`${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} h-3.5 w-3.5`} />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Email Capture - Save results & get personalized roadmap */}

        {/* Recovery Resources — shown when emotional regulation is low */}
        {results.emotionalRegulation < 40 && (
          <Card className="border-2 border-[#1F6F78]/30 bg-gradient-to-br from-[#1F6F78]/5 to-[#F0FDF9] mt-8">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-[#1F6F78]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#0F1C2E] mb-1">
                    {getText('Recovery Resources', 'موارد التعافي')}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {getText(
                      'Your assessment shows indicators of emotional dysregulation or compulsive patterns. Recovery programs can help you build a foundation of safety and self-understanding before focusing on identity growth.',
                      'يُظهر تقييمك مؤشرات خلل التنظيم العاطفي أو أنماط قهرية. برامج التعافي يمكن أن تساعدك في بناء أساس من الأمان والفهم الذاتي قبل التركيز على نمو الهوية.'
                    )}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Link href="/recovery/porn-recovery" className="group">
                  <div className="rounded-xl border border-[#3DD4B0]/30 bg-white p-4 hover:shadow-md transition-all group-hover:border-[#3DD4B0]/60">
                    <div className="flex items-center gap-3 mb-2">
                      <Brain className="w-5 h-5 text-[#3DD4B0]" />
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">
                        {getText('Recovery from Compulsive Patterns', 'التعافي من الأنماط القهرية')}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      {getText(
                        'Understand your patterns and build practical recovery tools with self-compassion.',
                        'افهم أنماطك وابنِ أدوات تعافي عملية برأفة ذاتية.'
                      )}
                    </p>
                  </div>
                </Link>
                <Link href="/recovery/trc" className="group">
                  <div className="rounded-xl border border-[#1F6F78]/30 bg-white p-4 hover:shadow-md transition-all group-hover:border-[#1F6F78]/60">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-[#1F6F78]" />
                      <h4 className="font-semibold text-[#0F1C2E] text-sm">
                        {getText('Trauma Recovery', 'التعافي من الصدمات')}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600">
                      {getText(
                        'Evidence-based techniques for grounding, breathing, and building internal safety.',
                        'تقنيات مبنية على الأدلة للتأريض والتنفس وبناء الأمان الداخلي.'
                      )}
                    </p>
                  </div>
                </Link>
              </div>
              <div className="mt-4 text-center">
                <Link href="/recovery">
                  <Button className="bg-[#1F6F78] text-white hover:bg-[#1F6F78]/90 font-semibold">
                    {getText('Explore Recovery Resources', 'استكشف موارد التعافي')}
                    <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
        <EmailCaptureSection results={results} locale={locale} getText={getText} />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link href="/quiz">
            <Button variant="outline" className="px-6 h-12 font-semibold">
              <RefreshCw className="mr-2 h-5 w-5" />
              {getText('Retake Assessment', 'أعد التقييم')}
            </Button>
          </Link>
          <Button 
            variant="outline" 
            className="px-6 h-12 font-semibold"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: locale === 'ar' ? 'نتائج تقييم هويتي' : 'My Identity Assessment Results',
                  text: locale === 'ar' 
                    ? `حصلت على ${results.overallScore}% في تقييم فجوة الهوية!` 
                    : `I scored ${results.overallScore}% on the Identity Gap Assessment!`,
                  url: window.location.origin + '/quiz'
                });
              }
            }}
          >
            <Share2 className="mr-2 h-5 w-5" />
            {getText('Share Results', 'شارك نتائجك')}
          </Button>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-6 mb-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-[#1F6F78] transition-colors"
          >
            <ChevronRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            {getText('Back to top', 'العودة للأعلى')}
          </button>
        </div>
      </div>
    </div>
  );
}


// ============================================
// EMAIL CAPTURE COMPONENT
// Captures email after quiz completion for lead nurturing
// Adds contact to Brevo + triggers FREE_SUBSCRIBER sequence
// ============================================
function EmailCaptureSection({ results, locale, getText }: { 
  results: QuizResults; 
  locale: string;
  getText: (en: string, ar: string) => string;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('submitting');
    setErrorMsg('');
    
    try {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setErrorMsg(getText('Please enter a valid email', 'يرجى إدخال بريد إلكتروني صحيح'));
        setStatus('error');
        return;
      }
      
      // Submit to Brevo via API
      const response = await fetch('/api/email/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: name || email.split('@')[0],
          source: 'quiz_results',
          quizScore: results.overallScore,
          dominantChallenge: results.dominantChallenge,
          recommendedProduct: results.recommendedProduct,
          locale: locale === 'ar' ? 'ar' : 'en',
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        // Track conversion event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'quiz_email_capture', {
            'event_category': 'engagement',
            'event_label': 'quiz_results',
            'value': results.overallScore,
          });
        }
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || getText('Something went wrong. Try again.', 'حدث خطأ. حاول مرة أخرى.'));
        setStatus('error');
      }
    } catch (err) {
      setErrorMsg(getText('Network error. Try again.', 'خطأ في الشبكة. حاول مرة أخرى.'));
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card className="border-2 border-[#3DD4B0] bg-gradient-to-br from-[#3DD4B0]/10 to-white mt-8">
        <CardContent className="p-6 text-center">
          <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-[#3DD4B0]" />
          </div>
          <h3 className="font-bold text-xl text-[#0F1C2E] mb-2">
            {getText('Your results are on the way! 📧', 'نتائجك في الطريق! 📧')}
          </h3>
          <p className="text-slate-600 text-sm">
            {getText(
              'Check your inbox for a detailed breakdown of your Identity Gap Score, plus personalized recommendations for your transformation journey.',
              'تحقق من بريدك الوارد للاطلاع على تفصيل درجة فجوة هويتك، بالإضافة إلى توصيات شخصية لرحلة تحولك.'
            )}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-[#1F6F78]/30 bg-gradient-to-br from-[#1F6F78]/5 to-white mt-8">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-[#1F6F78]" />
          </div>
          <h3 className="font-bold text-lg text-[#0F1C2E] mb-1">
            {getText('Get your full results by email', 'احصل على نتائجك الكاملة بالبريد')}
          </h3>
          <p className="text-slate-600 text-sm">
            {getText(
              'Save your Identity Gap Score and receive a personalized transformation roadmap. Free, no spam, unsubscribe anytime.',
              'احفظ درجة فجوة هويتك واحصل على خارطة تحول شخصية. مجاناً، بدون رسائل مزعجة، إلغاء الاشتراك في أي وقت.'
            )}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            type="email"
            placeholder={getText('Your email address', 'بريدك الإلكتروني')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-[#1F6F78]/30 focus:border-[#3DD4B0] h-11"
          />
          <Input
            type="text"
            placeholder={getText('Your name (optional)', 'اسمك (اختياري)')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-[#1F6F78]/30 focus:border-[#3DD4B0] h-11"
          />
          {errorMsg && (
            <p className="text-[#C97B7B] text-sm">{errorMsg}</p>
          )}
          <Button 
            type="submit" 
            disabled={status === 'submitting'}
            className="w-full bg-[#1F6F78] hover:bg-[#154d54] text-white h-11 font-semibold"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {getText('Sending...', 'جار الإرسال...')}
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                {getText('Send me my results', 'أرسل لي نتائجي')}
              </>
            )}
          </Button>
          <p className="text-xs text-slate-400 text-center">
            {getText(
              '🔒 We respect your privacy. No spam, ever.',
              '🔒 نحترم خصوصيتك. لا رسائل مزعجة، أبداً.'
            )}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
