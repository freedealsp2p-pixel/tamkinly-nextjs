'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  Share2
} from 'lucide-react';

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

// Products data
const products = [
  {
    id: 'trial',
    name: '7-Day Identity Reset',
    nameAr: 'إعادة ضبط الهوية لمدة 7 أيام',
    price: '$7',
    originalPrice: '$15',
    description: 'A quick-start mini-guide to experience the Tamkinly methodology',
    descriptionAr: 'دليل مصغر للبدء السريع لتجربة منهجية تمكينلي',
    features: ['7-Day Guided Introduction', 'Daily Prompts Sample', 'Quick Assessment', 'PDF Download'],
    featuresAr: ['مقدمة موجهة لـ 7 أيام', 'عينة من التوجيهات اليومية', 'تقييم سريع', 'تحميل PDF'],
    bestFor: 'Curious explorers ready to test the waters',
    bestForAr: 'المستكشفون الفضوليون الجاهزون للتجربة',
    color: '#3DD4B0',
    productUrl: '/products/trial'
  },
  {
    id: 'planner',
    name: 'Identity Recode Planner',
    nameAr: 'مخطط إعادة صياغة الهوية',
    price: '$17',
    originalPrice: '$29',
    description: 'The complete 30-day identity transformation system',
    descriptionAr: 'نظام تحول الهوية الكامل لمدة 30 يوم',
    features: ['Full 30-Day Program', 'Digital + Print Version', 'Daily Prompts', 'Evidence Tracking', 'Lifetime Updates'],
    featuresAr: ['برنامج 30 يوم كامل', 'نسخة رقمية + مطبوعة', 'توجيهات يومية', 'تتبع الأدلة', 'تحديثات مدى الحياة'],
    bestFor: 'Those ready for deep transformation',
    bestForAr: 'الجاهزون لتحول عميق',
    color: '#1F6F78',
    popular: true,
    productUrl: '/products/planner'
  },
  {
    id: 'premium',
    name: 'Premium Transformation',
    nameAr: 'التحول المتميز',
    price: '$27',
    originalPrice: '$44',
    description: 'Comprehensive transformation with advanced tools',
    descriptionAr: 'تحول شامل مع أدوات متقدمة',
    features: ['Everything in Planner', 'Identity Reset Checklist', 'Advanced Worksheets', 'Priority Support', 'Quick-start Guide'],
    featuresAr: ['كل ما في المخطط', 'قائمة إعادة ضبط الهوية', 'أوراق عمل متقدمة', 'دعم ذو أولوية', 'دليل البدء السريع'],
    bestFor: 'Committed individuals seeking complete transformation',
    bestForAr: 'الأفراد الملتزمون بالتحول الكامل',
    color: '#0F1C2E',
    productUrl: '/products/premium'
  },
  {
    id: 'bundle',
    name: 'Complete Bundle',
    nameAr: 'الباقة الكاملة',
    price: '$47',
    originalPrice: '$91',
    description: 'The ultimate identity transformation experience',
    descriptionAr: 'تجربة تحول الهوية المثالية',
    features: ['All PDF Products', 'Interactive Apps Access', 'Executive Manual', 'Daily Planner App', 'Progress Dashboard', '1-on-1 Support'],
    featuresAr: ['جميع منتجات PDF', 'وصول للتطبيقات التفاعلية', 'دليل تنفيذي', 'تطبيق المخطط اليومي', 'لوحة التقدم', 'دعم فردي'],
    bestFor: 'Those who want the complete transformation experience',
    bestForAr: 'من يريدون تجربة التحول الكاملة',
    color: '#8A94A6',
    productUrl: '/products/bundle'
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
            <div className="w-3 h-3 rounded-full bg-red-400" />
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

// Main Results Page Component
export default function QuizResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { locale, direction } = useLocale();

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
  }, []);

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
      { name: 'Emotional Regulation', nameAr: 'التنظيم العاطفي', value: results.emotionalRegulation, color: '#E57373', icon: Heart },
      { name: 'Decision Quality', nameAr: 'جودة القرارات', value: results.decisionQuality, color: '#64B5F6', icon: Brain },
      { name: 'Progress Momentum', nameAr: 'زخم التقدم', value: results.progressMomentum, color: '#FFB74D', icon: TrendingUp }
    ];
  }, [results]);

  // Find recommended product
  const recommendedProduct = useMemo(() => {
    if (!results) return null;
    return products.find(p => p.id === results.recommendedProduct);
  }, [results]);

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
      {/* Results Header */}
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0] border border-[#3DD4B0]/30">
            <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
            {getText('Assessment Complete', 'اكتمل التقييم')}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {getText('Your Identity Transformation ', 'خارطة طريق تحول ')}
            <span className="text-[#3DD4B0]">{getText('Roadmap', 'هويتك')}</span>
          </h1>
          
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            {getText(
              "Based on your responses, we've identified your key growth areas and created a personalized transformation plan.",
              'بناءً على إجاباتك، حددنا مجالات نموك الرئيسية وأنشأنا خطة تحول شخصية.'
            )}
          </p>
        </div>
      </div>

      {/* Results Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 -mt-8">
        {/* Overall Score Card */}
        <Card className="border-0 shadow-xl bg-white mb-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-[#0F1C2E] p-8 text-center">
              <p className="text-slate-400 mb-2">{getText('Your Identity Alignment Score', 'درجة توافق هويتك')}</p>
              <div className="text-6xl md:text-7xl font-bold text-[#3DD4B0] mb-2">{results.overallScore}%</div>
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

        {/* Product Recommendation */}
        <div className="text-center mb-8">
          <Badge className="mb-4 px-4 py-2 bg-[#3DD4B0]/10 text-[#3DD4B0]">
            <Sparkles className="w-3.5 h-3.5 mr-2" />
            {getText('Recommended For You', 'موصى به لك')}
          </Badge>
          <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
            {getText('Your Perfect Transformation Match', 'منتجك المثالي للتحول')}
          </h2>
        </div>

        {/* Recommended Product */}
        {recommendedProduct && (
          <Card className="border-2 shadow-xl bg-white mb-6 overflow-hidden" style={{ borderColor: recommendedProduct.color }}>
            {recommendedProduct.popular && (
              <div className="bg-[#3DD4B0] text-[#0F1C2E] text-center py-2 text-sm font-semibold">
                {getText('Most Popular Choice', 'الخيار الأكثر شعبية')}
              </div>
            )}
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2">
                {/* Left - Product Info */}
                <div className="p-8" style={{ backgroundColor: `${recommendedProduct.color}10` }}>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6"
                    style={{ backgroundColor: recommendedProduct.color }}
                  >
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F1C2E] mb-2">
                    {getText(recommendedProduct.name, recommendedProduct.nameAr)}
                  </h3>
                  <p className="text-[#8A94A6] mb-4">
                    {getText(recommendedProduct.description, recommendedProduct.descriptionAr)}
                  </p>
                  <p className="text-sm text-[#0F1C2E] font-medium mb-6">
                    {getText(recommendedProduct.bestFor, recommendedProduct.bestForAr)}
                  </p>
                  
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold" style={{ color: recommendedProduct.color }}>
                      {recommendedProduct.price}
                    </span>
                    <span className="text-[#8A94A6] line-through">{recommendedProduct.originalPrice}</span>
                    <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0]">
                      {getText('Save', 'وفر')} {Math.round((1 - parseInt(recommendedProduct.price.slice(1)) / parseInt(recommendedProduct.originalPrice.slice(1))) * 100)}%
                    </Badge>
                  </div>
                </div>
                
                {/* Right - Features & CTA */}
                <div className="p-8">
                  <h4 className="font-semibold text-[#0F1C2E] mb-4">
                    {getText("What's Included:", 'ماذا يتضمن:')}
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {(locale === 'ar' ? recommendedProduct.featuresAr : recommendedProduct.features).map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0" />
                        <span className="text-[#2B2E34]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href={recommendedProduct.productUrl}>
                    <Button 
                      className="w-full h-14 text-lg font-semibold shadow-lg"
                      style={{ 
                        backgroundColor: recommendedProduct.color, 
                        color: recommendedProduct.id === 'premium' || recommendedProduct.id === 'bundle' ? 'white' : '#0F1C2E' 
                      }}
                    >
                      {getText('Start Your Transformation', 'ابدأ تحولك')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-[#8A94A6]">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span>{getText('30-Day Guarantee', 'ضمان 30 يوم')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{getText('Instant Access', 'وصول فوري')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Products */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#0F1C2E] text-center mb-6">
            {getText('All Transformation Options', 'جميع خيارات التحول')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={product.productUrl} className="block">
                <Card 
                  className={`border-2 hover:shadow-lg transition-all cursor-pointer h-full ${results.recommendedProduct === product.id ? 'border-[#3DD4B0]' : 'border-transparent hover:border-slate-200'}`}
                >
                  <CardContent className="p-6">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3"
                      style={{ backgroundColor: product.color }}
                    >
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-[#0F1C2E] mb-1">
                      {getText(product.name, product.nameAr)}
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold" style={{ color: product.color }}>{product.price}</span>
                      <span className="text-xs text-[#8A94A6] line-through">{product.originalPrice}</span>
                    </div>
                    {results.recommendedProduct === product.id && (
                      <Badge className="mt-3 bg-[#3DD4B0]/20 text-[#3DD4B0]">
                        {getText('Recommended', 'موصى به')}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

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

        {/* Final CTA */}
        <Card className="mt-12 bg-gradient-to-r from-[#0F1C2E] to-[#1F6F78] border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {getText('Ready to Transform Your Identity?', 'مستعد لتحويل هويتك؟')}
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              {getText(
                'Join thousands who have already begun their journey back to themselves. Your transformation starts with a single decision.',
                'انضم إلى الآلاف الذين بدأوا رحلة العودة إلى ذواتهم. تحولك يبدأ بقرار واحد.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {recommendedProduct && (
                <Link href={recommendedProduct.productUrl}>
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-10 h-14 text-lg font-semibold shadow-xl">
                    {getText('Begin Your Transformation', 'ابدأ تحولك')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="/products">
                <Button variant="outline" size="lg" className="px-8 h-14 font-semibold border-white text-white hover:bg-white/10">
                  {getText('View All Products', 'عرض جميع المنتجات')}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
