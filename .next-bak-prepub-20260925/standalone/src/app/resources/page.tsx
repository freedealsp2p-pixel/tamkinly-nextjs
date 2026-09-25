'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight,
  BookOpen,
  Video,
  FileText,
  Mail,
  ExternalLink,
  Brain,
  Target,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  Clock
} from "lucide-react";
import { useTranslations, useLocale } from "@/components/providers/LocaleProvider";

// Hero Section
function HeroSection() {
  const t = useTranslations('resourcesPage');
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            {t('heroBadge')}
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('heroTitle')}{" "}
            <span className="text-accent">{t('heroTitleHighlight')}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </div>
    </section>
  );
}

// Free Resources Section
function ResourcesSection() {
  const t = useTranslations('resourcesPage');
  const resources = [
    {
      icon: FileText,
      category: t('categoryAssessment'),
      title: t('resourceQuizTitle'),
      description: t('resourceQuizDesc'),
      action: t('takeQuiz'),
      href: "/quiz",
      free: true
    },
    {
      icon: BookOpen,
      category: t('categoryGuide'),
      title: t('resourceGuideTitle'),
      description: t('resourceGuideDesc'),
      action: t('readGuide'),
      href: "#identity-research",
      free: true
    },
    {
      icon: Video,
      category: t('categoryVideo'),
      title: t('resourceVideoTitle'),
      description: t('resourceVideoDesc'),
      action: t('comingSoon'),
      href: "#",
      free: true,
      comingSoon: true
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource, idx) => (
            <Card key={idx} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                      <resource.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {resource.category}
                      </Badge>
                      {resource.comingSoon && (
                        <Badge className="bg-[#e6f3f4] text-[#2A8A94] text-xs">
                          {t('comingSoon')}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {resource.description}
                    </p>
                    {resource.comingSoon ? (
                      <span className="text-slate-400 text-sm flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {t('availableSoon')}
                      </span>
                    ) : (
                      <Button asChild variant="link" className="p-0 h-auto text-accent">
                        <Link href={resource.href}>
                          {resource.action}
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Identity vs Behavior Change Research Section
function IdentityResearchSection() {
  const t = useTranslations('resourcesPage');
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const keyInsights = [
    {
      title: "Habits and Identity: Behavioral, Cognitive, Affective, and Motivational Aspects",
      titleAr: "العادات والهوية: الجوانب السلوكية والمعرفية والعاطفية والتحفيزية",
      source: "Verplanken & Sui",
      authorAr: "فيربلانكن وسوي",
      insight: "Explains how habits become linked to identity and the \"true self,\" showing that connecting behavior to identity strengthens self-esteem and self-integration. This is one of the best sources for understanding why change becomes more durable when it becomes \"part of who I am\" rather than just a new habit.",
      descriptionAr: "يشرح كيف ترتبط العادات بالهوية و'الذات الحقيقية'، مبيناً أن ربط السلوك بالهوية يعزز تقدير الذات والتكامل الذاتي. هذا أحد أفضل المصادر لفهم سبب استدامة التغيير عندما يصبح 'جزءاً من هويتي' بدلاً من مجرد عادة جديدة.",
      icon: Brain
    },
    {
      title: "Centered Identity Transformation to Reduce Executive Function Burden",
      titleAr: "تحويل الهوية المتمركز لتقليل عبء الوظائف التنفيذية",
      source: "Caldwell et al.",
      authorAr: "كالدويل وآخرون",
      insight: "Research demonstrating that identity transformation can reduce the executive burden required to maintain behavior change. When behavior is integrated into identity, it requires less willpower and conscious effort to sustain.",
      descriptionAr: "بحث يوضح أن تحويل الهوية يمكن أن يقلل العبء التنفيذي المطلوب للحفاظ على تغيير السلوك. عندما يندمج السلوك في الهوية، يتطلب قوة إرادة وجهداً واعياً أقل للحفاظ عليه.",
      icon: Target
    },
    {
      title: "The Influence of Identity Within-Person and Between Behaviours",
      titleAr: "تأثير الهوية بين الأشخاص والسلوكيات",
      source: "PMC Study (2025)",
      authorAr: "دراسة PMC (2025)",
      insight: "Discusses the relationship between identity and behavior, showing that identity may be difficult to change, but is highly valuable when designing behavioral interventions. Identity interacts with intention, habit, and self-determined motivation.",
      descriptionAr: "يناقش العلاقة بين الهوية والسلوك، مبيناً أن الهوية قد يصعب تغييرها، لكنها ذات قيمة عالية عند تصميم التدخلات السلوكية. تتفاعل الهوية مع النية والعادة والتحفيز الذاتي.",
      icon: TrendingUp
    },
    {
      title: "Does Monitoring Goal Progress Promote Goal Attainment?",
      titleAr: "هل مراقبة تقدم الأهداف تعزز تحقيقها؟",
      source: "Harkin et al. (Meta-Analysis)",
      authorAr: "هاركين وآخرون (تحليل تلوي)",
      insight: "Shows that progress monitoring supports goal achievement. This is crucial because identity-based change needs a practical system to see behavioral evidence over time—exactly what tracking provides.",
      descriptionAr: "يوضح أن مراقبة التقدم تدعم تحقيق الأهداف. هذا أمر حاسم لأن التغيير القائم على الهوية يحتاج إلى نظام عملي لرؤية الأدلة السلوكية بمرور الوقت—وهو بالضبط ما توفره المتابعة.",
      icon: CheckCircle2
    }
  ];

  return (
    <section id="identity-research" className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent">
              <BookOpen className="w-3 h-3 mr-1" />
              {t('researchBasedGuide')}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
              {t('identityVsBehavior')}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('identityVsBehaviorDesc')}
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">{t('whatIsBehavior')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('behaviorChangeDesc')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">{t('whatIsIdentity')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('identityChangeDesc')}
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary to-[#1F6F78] rounded-xl p-8 shadow-sm mb-8">
              <h3 className="font-serif text-2xl font-bold text-white mb-4">{t('whyDurable')}</h3>
              <p className="text-slate-300 leading-relaxed">
                {t('whyDurableDesc')}
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">{t('howConnected')}</h3>
              <p className="text-slate-600 leading-relaxed">
                {t('howConnectedDesc')}
              </p>
            </div>
          </div>

          {/* Research Insights */}
          <div className="mb-12">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
              {t('keyResearchFindings')}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {keyInsights.map((insight, idx) => (
                <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                          <insight.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary text-sm mb-1">
                          {getText(insight.title, insight.titleAr)}
                        </h4>
                        <p className="text-xs text-accent mb-2">{getText(insight.source, insight.authorAr)}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {getText(insight.insight, insight.descriptionAr)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Practical Application */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-primary mb-6">
              {t('practicalMeaning')}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              {t('practicalMeaningDesc')}
            </p>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">1</span>
                <div>
                  <h4 className="font-semibold text-primary">{t('step1Title')}</h4>
                  <p className="text-sm text-slate-600">{t('step1Desc')}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">2</span>
                <div>
                  <h4 className="font-semibold text-primary">{t('step2Title')}</h4>
                  <p className="text-sm text-slate-600">{t('step2Desc')}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">3</span>
                <div>
                  <h4 className="font-semibold text-primary">{t('step3Title')}</h4>
                  <p className="text-sm text-slate-600">{t('step3Desc')}</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-primary text-sm flex items-center justify-center font-semibold">4</span>
                <div>
                  <h4 className="font-semibold text-primary">{t('step4Title')}</h4>
                  <p className="text-sm text-slate-600">{t('step4Desc')}</p>
                </div>
              </li>
            </ol>

            <div className="mt-8 p-6 bg-accent/5 rounded-lg border-l-4 border-accent">
              <h4 className="font-semibold text-primary mb-2">{t('keyTakeaway')}</h4>
              <p className="text-slate-600 leading-relaxed">
                {t('keyTakeawayDesc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter Section
function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const t = useTranslations('resourcesPage');

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto border-0 shadow-lg overflow-hidden">
          <div className="grid sm:grid-cols-2">
            <div className="bg-primary p-8 lg:p-10">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-2">
                {t('weeklyInsights')}
              </h3>
              <p className="text-slate-300 text-sm">
                {t('weeklyInsightsDesc')}
              </p>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              {subscribed ? (
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-primary">{t('subscribed')}</p>
                  <p className="text-sm text-slate-500">{t('checkInbox')}</p>
                </div>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email) return;
                  setSubscribing(true);
                  try {
                    const res = await fetch('/api/email/subscribe', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email, source: 'resources-page' })
                    });
                    if (res.ok) {
                      setSubscribed(true);
                    }
                  } catch { /* silent fail */ }
                  finally { setSubscribing(false); }
                }} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('enterEmail')}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                  <Button disabled={subscribing} className="w-full bg-accent text-primary hover:bg-accent/90">
                    {subscribing ? t('subscribing') : t('subscribe')}
                  </Button>
                  <p className="text-xs text-slate-500 text-center">
                    {t('noSpam')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

// Articles Section
const resourcesArticleCategoryMap: Record<string, string> = {
  'Identity Shift': 'categoryIdentityShift',
  'Transformation': 'categoryTransformation',
  'Wealth & Identity': 'categoryWealthIdentity',
  'Self-Liberation': 'categorySelfLiberation',
  'Self-Image': 'categorySelfImage',
  'Mental Clarity': 'categoryMentalClarity',
};

function formatReadTime(readTime: string, t: (key: string) => string): string {
  const match = readTime.match(/^(\d+)\s+min\s+read$/);
  if (match) {
    return `${match[1]} ${t('minRead')}`;
  }
  return readTime;
}

function ArticlesSection() {
  const t = useTranslations('resourcesPage');
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const articles = [
    {
      title: "The Physics of Momentum: Why 18 Minutes Changes Everything",
      titleAr: "فيزياء الزخم: لماذا تغير 18 دقيقة كل شيء",
      excerpt: "Discover how the science of momentum and habit formation can transform your identity.",
      excerptAr: "اكتشف كيف يمكن لعلم الزخم وتكوين العادات أن يحوّل هويتك.",
      readTime: "8 min read",
      category: "Identity Shift",
      slug: "physics-of-momentum"
    },
    {
      title: "The Magic Is in the Work You Avoid",
      titleAr: "السحر في العمل الذي تتجنبه",
      excerpt: "That uncomfortable task you keep putting off? It holds the key to your transformation.",
      excerptAr: "تلك المهمة غير المريحة التي تؤجلها باستمرار؟ إنها تحمل مفتاح تحولك.",
      readTime: "6 min read",
      category: "Transformation",
      slug: "magic-in-work-you-avoid"
    },
    {
      title: "The Identity Millionaire: Building Wealth Through Self-Transformation",
      titleAr: "المليونير بالهوية: بناء الثروة من خلال التحول الذاتي",
      excerpt: "True wealth starts with who you become, not what you acquire.",
      excerptAr: "الثروة الحقيقية تبدأ بمن تصبح، وليس بما تمتلك.",
      readTime: "9 min read",
      category: "Wealth & Identity",
      slug: "identity-millionaire"
    },
    {
      title: "Five Steps to Miracles: A Framework for Identity Liberation",
      titleAr: "خمس خطوات نحو المعجزات: إطار لتحرير الهوية",
      excerpt: "Surrender the old versions of yourself. Step into who you were meant to be.",
      excerptAr: "استسلم للنسخ القديمة من نفسك. خمس خطوات تكسر الأنماط وتفتح الباب لمن كنت مقدراً أن تكونه.",
      readTime: "10 min read",
      category: "Self-Liberation",
      slug: "five-steps-to-miracles"
    },
    {
      title: "Work on Yourself: The Psycho-Cybernetics of Identity",
      titleAr: "اعمل على نفسك: السيبرانيكا النفسية للهوية",
      excerpt: "Your self-image controls everything. Change the inner image, change everything.",
      excerptAr: "صورتك الذاتية تتحكم في كل شيء. غيّر الصورة الداخلية، يتغير كل شيء.",
      readTime: "10 min read",
      category: "Self-Image",
      slug: "work-on-yourself"
    },
    {
      title: "The 24-Hour Dopamine Reset: Reclaiming Your Focus",
      titleAr: "إعادة ضبط الدوبامين في 24 ساعة: استعد تركيزك",
      excerpt: "Reset your motivation system in just one day and rediscover natural drive.",
      excerptAr: "أعد ضبط نظام التحفيز لديك في يوم واحد فقط واستعد دافعك الطبيعي.",
      readTime: "12 min read",
      category: "Mental Clarity",
      slug: "dopamine-reset"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4">
            {t('latestArticles')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            {t('deepDives')}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {articles.map((article, idx) => (
            <Link key={idx} href={`/blog/${article.slug}`}>
              <Card className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 text-xs text-[#1F6F78] border-[#1F6F78]/30">
                    {resourcesArticleCategoryMap[article.category] ? t(resourcesArticleCategoryMap[article.category]) : article.category}
                  </Badge>
                  <h3 className="font-semibold text-lg text-primary mb-2 group-hover:text-accent transition-colors">
                    {getText(article.title, article.titleAr)}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {getText(article.excerpt, article.excerptAr)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{formatReadTime(article.readTime, t)}</span>
                    <span className="text-accent text-sm flex items-center gap-1">
                      {t('readGuide')} <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const t = useTranslations('resourcesPage');
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            {t('ctaSubtitle')}
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-semibold">
              {t('viewProducts')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ResourcesPage() {
  const { locale } = useLocale();
  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <HeroSection />
      <ResourcesSection />
      <IdentityResearchSection />
      <NewsletterSection />
      <ArticlesSection />
      <CTASection />
    </div>
  );
}
