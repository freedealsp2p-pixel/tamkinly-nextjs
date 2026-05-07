'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  FileText,
  AppWindow,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { useState, Suspense } from 'react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

// Searchable content with bilingual support
const searchableContent = [
  // Main Pages
  { title: 'Home', titleAr: 'الرئيسية', path: '/', type: 'page', description: 'Tamkinly - Return to your center', descriptionAr: 'تمكينلي - عد إلى مركزك', keywords: ['home', 'main', 'start', 'landing'] },
  { title: 'Products & Pricing', titleAr: 'المنتجات والأسعار', path: '/products', type: 'page', description: 'Start free with powerful identity tools, then upgrade as you grow', descriptionAr: 'ابدأ مجاناً مع أدوات هوية قوية، ثم قم بالترقية مع نموك', keywords: ['pricing', 'buy', 'purchase', 'planner', 'bundle', 'premium', 'trial'] },
  { title: 'Apps', titleAr: 'التطبيقات', path: '/apps', type: 'page', description: 'Interactive transformation tools', descriptionAr: 'أدوات تحول تفاعلية', keywords: ['tools', 'applications', 'apps'] },
  { title: 'Methodology', titleAr: 'المنهجية', path: '/methodology', type: 'page', description: 'Our evidence-based transformation approach', descriptionAr: 'نهجنا المبني على الأدلة للتحول', keywords: ['method', 'approach', 'how', 'process'] },
  { title: 'About Us', titleAr: 'من نحن', path: '/about', type: 'page', description: 'Learn about Tamkinly and our mission', descriptionAr: 'تعرف على تمكينلي ومهمتنا', keywords: ['about', 'team', 'founders', 'story', 'mission'] },
  { title: 'Contact', titleAr: 'تواصل معنا', path: '/contact', type: 'page', description: 'Get in touch with us', descriptionAr: 'تواصل معنا', keywords: ['contact', 'support', 'help', 'email'] },
  { title: 'Blog', titleAr: 'المدونة', path: '/blog', type: 'page', description: 'Research-backed insights and articles', descriptionAr: 'رؤى ومقالات مبنية على الأبحاث', keywords: ['blog', 'articles', 'posts', 'news'] },
  
  // Quiz
  { title: 'Identity Gap Quiz', titleAr: 'اختبار فجوة الهوية', path: '/quiz', type: 'app', description: 'Free 5-minute assessment to discover your identity gap', descriptionAr: 'تقييم مجاني لمدة 5 دقائق لاكتشاف فجوة هويتك', keywords: ['quiz', 'assessment', 'test', 'identity', 'gap', 'free'] },
  { title: 'Quiz Results', titleAr: 'نتائج الاختبار', path: '/quiz/results', type: 'app', description: 'View your assessment results', descriptionAr: 'عرض نتائج تقييمك', keywords: ['results', 'score', 'outcome'] },
  
  // Apps
  { title: 'Identity Gap Assessment', titleAr: 'تقييم فجوة الهوية', path: '/apps/identity-gap-quiz', type: 'app', description: '12-question assessment with detailed analysis', descriptionAr: 'تقييم من 12 سؤال مع تحليل تفصيلي', keywords: ['identity', 'quiz', 'gap', 'assessment', 'self-trust', 'clarity'] },
  { title: 'Habit Tracker', titleAr: 'متتبع العادات', path: '/apps/habit-tracker', type: 'app', description: 'Track and build identity-based habits', descriptionAr: 'تتبع وبناء عادات مبنية على الهوية', keywords: ['habit', 'tracker', 'habits', 'consistency'] },
  { title: 'Goal System', titleAr: 'نظام الأهداف', path: '/apps/goal-system', type: 'app', description: 'Set and achieve identity-aligned goals', descriptionAr: 'حدد وحقق أهدافاً متوافقة مع هويتك', keywords: ['goal', 'goals', 'system', 'achievement'] },
  { title: 'AI Identity Coach', titleAr: 'مدرب الهوية بالذكاء الاصطناعي', path: '/apps/ai-identity-coach', type: 'app', description: '24/7 AI-powered transformation guidance', descriptionAr: 'إرشاد تحول مدعوم بالذكاء الاصطناعي على مدار الساعة', keywords: ['ai', 'coach', 'artificial', 'intelligence', 'gpt'] },
  { title: 'Daily Reflection', titleAr: 'التأمل اليومي', path: '/apps/daily-reflection', type: 'app', description: 'Guided daily prompts for self-awareness', descriptionAr: 'مطالبات يومية موجهة للوعي الذاتي', keywords: ['daily', 'reflection', 'journal', 'prompts'] },
  { title: 'Values Clarification', titleAr: 'تحديد القيم', path: '/apps/values-clarification', type: 'app', description: 'Discover your core values', descriptionAr: 'اكتشف قيمك الأساسية', keywords: ['values', 'clarification', 'core', 'priorities'] },
  { title: 'Decision Analysis', titleAr: 'تحليل القرارات', path: '/apps/decision-analysis', type: 'app', description: 'Analyze and improve your decision patterns', descriptionAr: 'حلل وحسّن أنماط قراراتك', keywords: ['decision', 'analysis', 'choices', 'patterns'] },
  { title: 'Progress Dashboard', titleAr: 'لوحة التقدم', path: '/apps/progress-dashboard', type: 'app', description: 'Track your transformation journey', descriptionAr: 'تتبع رحلة تحولك', keywords: ['progress', 'dashboard', 'tracking', 'metrics'] },
  { title: 'Evidence Tracking', titleAr: 'تتبع الأدلة', path: '/apps/evidence-tracking', type: 'app', description: 'Document proof of your growth', descriptionAr: 'وثّق دليل نموك', keywords: ['evidence', 'tracking', 'proof', 'growth'] },
  { title: 'Environmental Audit', titleAr: 'التدقيق البيئي', path: '/apps/environmental-audit', type: 'app', description: 'Assess your environment for growth', descriptionAr: 'قيّم بيئتك للنمو', keywords: ['environment', 'audit', 'surroundings', 'space'] },
  { title: 'Identity Baseline', titleAr: 'خط الأساس للهوية', path: '/apps/identity-baseline', type: 'app', description: 'Establish your identity starting point', descriptionAr: 'حدد نقطة بداية هويتك', keywords: ['baseline', 'identity', 'starting', 'foundation'] },
  { title: 'Executive Manual', titleAr: 'الدليل التنفيذي', path: '/apps/executive-manual', type: 'app', description: 'Comprehensive transformation guide', descriptionAr: 'دليل تحول شامل', keywords: ['manual', 'guide', 'executive'] },
  
  // Products
  { title: '7-Day Trial', titleAr: 'تجربة 7 أيام', path: '/products/trial', type: 'product', description: 'Quick-start mini-guide', descriptionAr: 'دليل مصغر للبدء السريع', keywords: ['trial', '7-day', 'starter'] },
  { title: 'Identity Recode Planner', titleAr: 'مخطط إعادة صياغة الهوية', path: '/products/planner', type: 'product', description: 'Complete 30-day transformation system', descriptionAr: 'نظام تحول كامل لمدة 30 يوم', keywords: ['planner', '30-day', 'recode'] },
  { title: 'Premium Transformation', titleAr: 'التحول المتميز', path: '/products/premium', type: 'product', description: 'Advanced tools and analytics', descriptionAr: 'أدوات وتحليلات متقدمة', keywords: ['premium', 'advanced', 'analytics'] },
  { title: 'Complete Bundle', titleAr: 'الحزمة الكاملة', path: '/products/bundle', type: 'product', description: 'All products and features', descriptionAr: 'جميع المنتجات والميزات', keywords: ['bundle', 'complete', 'all'] },
  
  // Blog Articles
  { title: 'Identity Recode System Guide', titleAr: 'دليل نظام إعادة صياغة الهوية', path: '/blog/identity-recode-system-guide', type: 'article', description: 'Complete transformation system guide', descriptionAr: 'دليل نظام التحول الكامل', keywords: ['recode', 'system', 'guide'] },
  { title: 'AI Identity Coach Guide', titleAr: 'دليل مدرب الهوية بالذكاء الاصطناعي', path: '/blog/ai-identity-coach-guide', type: 'article', description: '24/7 AI coaching guide', descriptionAr: 'دليل التدريب بالذكاء الاصطناعي على مدار الساعة', keywords: ['ai', 'coach', 'guide'] },
  { title: 'Who Am I Worksheet', titleAr: 'ورقة عمل من أنا', path: '/blog/who-am-i-worksheet', type: 'article', description: 'Complete identity exploration', descriptionAr: 'استكشاف هوية كامل', keywords: ['who', 'worksheet', 'identity', 'exploration'] },
  { title: 'Identity-Based Habits Worksheet', titleAr: 'ورقة عمل العادات المبنية على الهوية', path: '/blog/identity-based-habits-worksheet', type: 'article', description: "James Clear's method for habit change", descriptionAr: 'طريقة جيمس كلير لتغيير العادات', keywords: ['habits', 'worksheet', 'clear', 'method'] },
  { title: 'Self-Authorship Worksheet', titleAr: 'ورقة عمل تأليف الذات', path: '/blog/self-authorship-worksheet', type: 'article', description: 'Your internal voice journey', descriptionAr: 'رحلة صوتك الداخلي', keywords: ['self', 'authorship', 'internal', 'voice'] },
  { title: 'Identity Baseline 8D Worksheet', titleAr: 'ورقة عمل خط الأساس 8D للهوية', path: '/blog/identity-baseline-8d-worksheet', type: 'article', description: 'Holistic self-assessment', descriptionAr: 'تقييم ذاتي شامل', keywords: ['baseline', '8d', 'holistic', 'assessment'] },
  { title: 'Environmental Audit Worksheet', titleAr: 'ورقة عمل التدقيق البيئي', path: '/blog/environmental-audit-worksheet', type: 'article', description: 'Design your growth space', descriptionAr: 'صمّم مساحة نموك', keywords: ['environmental', 'audit', 'space', 'design'] },
  { title: 'ERQ Emotional Regulation', titleAr: 'تنظيم المشاعر ERQ', path: '/blog/erq-emotional-regulation-worksheet', type: 'article', description: 'Master your inner world', descriptionAr: 'أتقن عالمك الداخلي', keywords: ['erq', 'emotional', 'regulation'] },
  { title: 'Physics of Momentum', titleAr: 'فيزياء الزخم', path: '/blog/physics-of-momentum', type: 'article', description: 'Why 18 minutes changes everything', descriptionAr: 'لماذا تغير 18 دقيقة كل شيء', keywords: ['physics', 'momentum', 'time'] },
  { title: 'Magic in Work You Avoid', titleAr: 'السحر في العمل الذي تتجنبه', path: '/blog/magic-in-work-you-avoid', type: 'article', description: 'The key in transformation', descriptionAr: 'المفتاح في التحول', keywords: ['magic', 'avoid', 'work'] },
  { title: 'Identity Millionaire', titleAr: 'المليونير بالهوية', path: '/blog/identity-millionaire', type: 'article', description: 'Building wealth through transformation', descriptionAr: 'بناء الثروة من خلال التحول', keywords: ['millionaire', 'wealth', 'success'] },
  { title: 'All In or Nothing', titleAr: 'كل شيء أو لا شيء', path: '/blog/all-in-or-nothing', type: 'article', description: 'The power of full commitment', descriptionAr: 'قوة الالتزام الكامل', keywords: ['all', 'commitment', 'dedication'] },
  { title: 'Five Steps to Miracles', titleAr: 'خمس خطوات نحو المعجزات', path: '/blog/five-steps-to-miracles', type: 'article', description: 'Framework for identity liberation', descriptionAr: 'إطار لتحرير الهوية', keywords: ['miracles', 'steps', 'liberation'] },
  { title: 'Inversion Thinking', titleAr: 'التفكير العكسي', path: '/blog/inversion-thinking', type: 'article', description: 'How to win by avoiding failure', descriptionAr: 'كيف تفوز بتجنب الفشل', keywords: ['inversion', 'thinking', 'munger'] },
  { title: 'Speed as Strategy', titleAr: 'السرعة كاستراتيجية', path: '/blog/speed-as-strategy', type: 'article', description: 'The execution edge', descriptionAr: 'ميزة التنفيذ', keywords: ['speed', 'strategy', 'execution'] },
  { title: '10-Minute Block System', titleAr: 'نظام الكتل العشر دقائق', path: '/blog/ten-minute-block-system', type: 'article', description: 'Breaking through every obstacle', descriptionAr: 'اختراق كل عقبة', keywords: ['block', '10-minute', 'obstacle'] },
  { title: 'Work on Yourself', titleAr: 'اعمل على نفسك', path: '/blog/work-on-yourself', type: 'article', description: 'The psycho-cybernetics of identity', descriptionAr: 'السيبرانيكا النفسية للهوية', keywords: ['work', 'psycho', 'cybernetics'] },
  { title: 'Becoming Exceptional', titleAr: 'أن تصبح استثنائياً', path: '/blog/becoming-exceptional', type: 'article', description: 'Why ordinary can never build legacy', descriptionAr: 'لماذا لا يمكن للعادي بناء إرث', keywords: ['exceptional', 'legacy', 'extraordinary'] },
  { title: 'Dopamine Reset', titleAr: 'إعادة ضبط الدوبامين', path: '/blog/dopamine-reset', type: 'article', description: 'Reclaiming your focus', descriptionAr: 'استعادة تركيزك', keywords: ['dopamine', 'reset', 'focus'] },
  { title: 'Daily Reflection Practice', titleAr: 'ممارسة التأمل اليومي', path: '/blog/daily-reflection-practice', type: 'article', description: 'Science of self-transformation', descriptionAr: 'علم التحول الذاتي', keywords: ['daily', 'reflection', 'practice'] },
  { title: 'Identity Gap Assessment', titleAr: 'تقييم فجوة الهوية', path: '/blog/identity-gap-assessment', type: 'article', description: "Discover what's holding you back", descriptionAr: 'اكتشف ما يعيقك', keywords: ['identity', 'gap', 'assessment'] },
  { title: 'Values Clarification Tool', titleAr: 'أداة توضيح القيم', path: '/blog/values-clarification-tool', type: 'article', description: 'Find what truly matters', descriptionAr: 'اكتشف ما يهمك حقاً', keywords: ['values', 'clarification', 'tool'] },
];

function getTypeColor(type: string): string {
  switch (type) {
        case 'app': return 'text-[#3DD4B0] border-[#3DD4B0]';
        case 'article': return 'text-[#1F6F78] border-[#1F6F78]';
        case 'product': return 'text-[#0F1C2E] border-[#0F1C2E]';
        default: return 'text-slate-600 border-slate-300';
    }
}

function getTypeIcon(type: string) {
    switch (type) {
        case 'app': return <AppWindow className="h-4 w-4 text-[#3DD4B0]" />;
        case 'article': return <FileText className="h-4 w-4 text-[#1F6F78]" />;
        case 'product': return <Sparkles className="h-4 w-4 text-[#0F1C2E]" />;
        default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
}

// Type label translations
const typeLabels: Record<string, { en: string; ar: string }> = {
  page: { en: 'Page', ar: 'صفحة' },
  app: { en: 'App', ar: 'تطبيق' },
  article: { en: 'Article', ar: 'مقال' },
  product: { en: 'Product', ar: 'منتج' },
};

function SearchContent() {
    const searchParams = useSearchParams();
    const urlQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(urlQuery);
    const [hasSearched, setHasSearched] = useState(!!urlQuery);
    const t = useTranslations('searchPage');
    const { locale } = useLocale();
    const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
    
    // Compute results based on query (search both English and Arabic)
    const results = query.trim() ? searchableContent.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase().trim()) ||
        item.titleAr.includes(query.trim()) ||
        item.description.toLowerCase().includes(query.toLowerCase().trim()) ||
        item.descriptionAr.includes(query.trim()) ||
        item.keywords.some(keyword => keyword.includes(query.toLowerCase().trim()))
    ) : [];
    
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
        // Update URL with search query
        if (query.trim()) {
            const url = new URL(window.location.href);
            url.searchParams.set('q', query.trim());
            window.history.replaceState({}, '', url.toString());
        }
    };

    
    return (
        <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <Badge variant="outline" className="mb-6 px-4 py-2 border-[#3DD4B0]/30 text-[#3DD4B0] bg-[#3DD4B0]/10">
                            <Search className="w-3.5 h-3.5 mr-2" />
                            {t('badge')}
                        </Badge>
                        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
                            {t('title')}
                        </h1>
                        <p className="text-lg text-slate-300 mb-8">
                            {t('subtitle')}
                        </p>
                        
                        {/* Search Form */}
                        <form onSubmit={handleSearch} className="relative">
                            <Input
                                type="search"
                                placeholder={t('placeholder')}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 text-lg bg-white rounded-xl border-0 shadow-lg"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        </form>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-12 lg:py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        {/* Results Count */}
                        {hasSearched && (
                            <div className="mb-8">
                                <p className="text-slate-600">
                                    {results.length > 0 
                                        ? t('foundResults').replace('{count}', String(results.length)).replace('{query}', query)
                                        : t('noResultsFor').replace('{query}', query)
                                    }
                                </p>
                            </div>
                        )}

                        {/* No Results */}
                        {hasSearched && results.length === 0 && (
                            <Card className="border-0 shadow-sm bg-white">
                                <CardContent className="p-8 text-center">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertCircle className="h-8 w-8 text-slate-400" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#0F1C2E] mb-2">{t('noResultsTitle')}</h2>
                                    <p className="text-slate-600 mb-6">
                                        {t('noResultsSubtitle')}
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <Link href="/quiz">
                                            <Button variant="outline" className="border-[#3DD4B0] text-[#3DD4B0]">
                                                {t('takeQuiz')}
                                            </Button>
                                        </Link>
                                        <Link href="/apps">
                                            <Button variant="outline" className="border-[#1F6F78] text-[#1F6F78]">
                                                {t('browseApps')}
                                            </Button>
                                        </Link>
                                        <Link href="/blog">
                                            <Button variant="outline">
                                                {t('readBlog')}
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Results List */}
                        {results.length > 0 && (
                            <div className="space-y-4">
                                {results.map((item, index) => (
                                    <Link key={index} href={item.path}>
                                        <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 mt-1">
                                                        {getTypeIcon(item.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="font-semibold text-lg text-[#0F1C2E] group-hover:text-[#3DD4B0] transition-colors">
                                                                {getText(item.title, item.titleAr)}
                                                            </h3>
                                                            <Badge variant="outline" className={`text-xs capitalize ${getTypeColor(item.type)}`}>
                                                                {getText(typeLabels[item.type]?.en || item.type, typeLabels[item.type]?.ar || item.type)}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-slate-600 text-sm mb-2">{getText(item.description, item.descriptionAr)}</p>
                                                        <p className="text-xs text-slate-400">{item.path}</p>
                                                    </div>
                                                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-[#3DD4B0] group-hover:translate-x-1 transition-all flex-shrink-0" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Initial State - Popular Pages */}
                        {!hasSearched && (
                            <div>
                                <h2 className="text-xl font-bold text-[#0F1C2E] mb-6">{t('popularPages')}</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: t('popularQuizTitle'), path: '/quiz', description: t('popularQuizDesc') },
                                        { title: t('popularAppsTitle'), path: '/apps', description: t('popularAppsDesc') },
                                        { title: t('popularProductsTitle'), path: '/products', description: t('popularProductsDesc') },
                                        { title: t('popularBlogTitle'), path: '/blog', description: t('popularBlogDesc') },
                                    ].map((item, index) => (
                                        <Link key={index} href={item.path}>
                                            <Card className="border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer group h-full">
                                                <CardContent className="p-5">
                                                    <h3 className="font-semibold text-[#0F1C2E] group-hover:text-[#3DD4B0] transition-colors mb-1">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-slate-600">{item.description}</p>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default function SearchPage() {
    const t = useTranslations('searchPage');
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
                <div className="animate-pulse">{t('loading')}</div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
