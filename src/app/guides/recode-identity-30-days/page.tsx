'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Clock, Target, Brain, RefreshCw, CheckCircle2,
  ArrowRight, Lightbulb, Sparkles, Calendar, Zap, Shield
} from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

const guideContent = {
  en: {
    title: 'How to Recode Your Identity in 30 Days',
    subtitle: 'A practical step-by-step guide to transforming your identity from the inside out',
    category: 'Identity Transformation',
    readTime: '8 min read',
    sections: [
      {
        title: 'Why 30 Days?',
        content: 'Neuroscience research shows that it takes approximately 21-30 days for new neural pathways to begin forming. While complete identity transformation takes longer, 30 days is enough to establish the foundation of a new identity. During this period, your brain begins to accept your new self-concept as real, making it progressively easier to act in alignment with who you want to become. The key is consistency and intentionality throughout the process.',
        icon: 'calendar',
      },
      {
        title: 'Phase 1: Awareness (Days 1-7)',
        content: 'The first week is about understanding your current identity. Write down every "I am" statement you catch yourself thinking or saying. These reveal your current identity code. Most people discover they carry identities they never consciously chose - inherited from parents, shaped by past failures, or adopted from social pressure. Document without judgment. Awareness itself begins the transformation process.',
        icon: 'brain',
      },
      {
        title: 'Phase 2: Declaration (Days 8-14)',
        content: 'Now you consciously choose your new identity. Write your new "I am" statements. The trick is to bridge where you are and where you want to be. Instead of "I am fit" (which your brain rejects as false), try "I am becoming someone who moves daily." Your brain accepts process identities more readily than outcome identities. Declare these new identities daily, preferably in writing each morning.',
        icon: 'target',
      },
      {
        title: 'Phase 3: Evidence Collection (Days 15-21)',
        content: 'Your brain needs proof that your new identity is real. Every small action that aligns with your new identity is evidence. Did you choose water over soda? Evidence that you are someone who prioritizes health. Did you speak up in a meeting? Evidence that you are someone who expresses their ideas. Track these daily - even tiny actions count. The more evidence you collect, the more real your new identity becomes.',
        icon: 'zap',
      },
      {
        title: 'Phase 4: Integration (Days 22-30)',
        content: 'In the final phase, your new identity starts feeling natural. Actions that required willpower in Phase 3 now feel like expressions of who you are. This is where identity truly shifts - when behavior flows from identity rather than willpower. Continue collecting evidence and start raising the bar. Your new identity can now handle bigger challenges because it is anchored in accumulated proof.',
        icon: 'refresh',
      },
    ],
    keyTakeaway: 'Identity change is not about forcing new behaviors - it is about becoming someone for whom those behaviors are natural. The 30-day framework gives your brain the structure it needs to accept and integrate a new self-concept.',
  },
  ar: {
    title: 'كيف تعيد برمجة هويتك في 30 يوماً',
    subtitle: 'دليل عملي خطوة بخطوة لتحويل هويتك من الداخل للخارج',
    category: 'تحول الهوية',
    readTime: '8 دقائق قراءة',
    sections: [
      {
        title: 'لماذا 30 يوماً؟',
        content: 'تظهر أبحاث علم الأعصاب أن الأمر يستغرق حوالي 21-30 يوماً لتبدأ المسارات العصبية الجديدة بالتشكل. بينما يستغرق التحول الكامل للهوية وقتاً أطول، إلا أن 30 يوماً كافية لتأسيس قاعدة الهوية الجديدة. خلال هذه الفترة، يبدأ عقلك بقبول مفهومك الذاتي الجديد كحقيقة، مما يجعل من الأسهل تدريجياً التصرف بما يتوافق مع من تريد أن تصبح. المفتاح هو الاتساق والقصدية طوال العملية.',
        icon: 'calendar',
      },
      {
        title: 'المرحلة 1: الوعي (الأيام 1-7)',
        content: 'الأسبوع الأول يتعلق بفهم هويتك الحالية. اكتب كل عبارة "أنا" تلاحظ نفسك تفكر فيها أو تقولها. هذه تكشف كود هويتك الحالي. يكتشف معظم الناس أنهم يحملون هويات لم يختاروها أبداً بوعي - موروثة من الوالدين، أو شكلتها الإخفاقات السابقة، أو تبنوها من ضغط اجتماعي. وثّق بدون حكم. الوعي بحد ذاته يبدأ عملية التحول.',
        icon: 'brain',
      },
      {
        title: 'المرحلة 2: الإعلان (الأيام 8-14)',
        content: 'الآن تختار هويتك الجديدة بوعي. اكتب عبارات "أنا" الجديدة. الحيلة هي بناء جسر بين حيث أنت وحيث تريد أن تكون. بدلاً من "أنا لائق" (الذي يرفضه عقلك كغير صحيح)، جرب "أنا أصبح شخصاً يتحرك يومياً". عقلك يقبل هويات العملية أكثر من هويات النتيجة. أعلن هذه الهويات الجديدة يومياً، ويفضل كتابياً كل صباح.',
        icon: 'target',
      },
      {
        title: 'المرحلة 3: جمع الأدلة (الأيام 15-21)',
        content: 'عقلك يحتاج إلى دليل على أن هويتك الجديدة حقيقية. كل فعل صغير يتوافق مع هويتك الجديدة هو دليل. هل اخترت الماء بدلاً من المشروبات الغازية؟ دليل على أنك شخص يعطي الأولوية للصحة. هل تحدثت في اجتماع؟ دليل على أنك شخص يعبر عن أفكاره. تتبع هذه يومياً - حتى الأفعال الصغيرة تحسب. كلما جمعت أدلة أكثر، أصبحت هويتك الجديدة أكثر واقعية.',
        icon: 'zap',
      },
      {
        title: 'المرحلة 4: الاندماج (الأيام 22-30)',
        content: 'في المرحلة الأخيرة، تبدأ هويتك الجديدة بالشعور بالطبيعية. الأفعال التي كانت تتطلب إرادة في المرحلة 3 أصبحت الآن تعبيراً عن هويتك. هنا يحدث التحول الحقيقي - عندما ينبع السلوك من الهوية بدلاً من الإرادة. استمر في جمع الأدلة وابدأ برفع السقف. هويتك الجديدة يمكنها الآن التعامل مع تحديات أكبر لأنها مرساة في دليل متراكم.',
        icon: 'refresh',
      },
    ],
    keyTakeaway: 'تغيير الهوية ليس عن فرض سلوكيات جديدة - بل عن أن تصبح شخصاً تكون تلك السلوكيات طبيعية بالنسبة له. إطار الـ 30 يوماً يعطي عقلك البنية التي يحتاجها لقبول ودمج المفهوم الذاتي الجديد.',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-6 h-6 text-[#3DD4B0]" />,
  brain: <Brain className="w-6 h-6 text-[#3DD4B0]" />,
  target: <Target className="w-6 h-6 text-[#3DD4B0]" />,
  zap: <Zap className="w-6 h-6 text-[#3DD4B0]" />,
  refresh: <RefreshCw className="w-6 h-6 text-[#3DD4B0]" />,
};

export default function RecodeIdentityGuide() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const content = locale === 'ar' ? guideContent.ar : guideContent.en;

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Link href="/guides" className="text-slate-400 hover:text-white flex items-center gap-2 mb-6">
            <ArrowLeft className="w-4 h-4" />
            {getText('Back to Guides', 'العودة للأدلة')}
          </Link>
          <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30 mb-4">{content.category}</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{content.title}</h1>
          <p className="text-lg text-slate-300">{content.subtitle}</p>
          <div className="flex items-center gap-2 mt-4 text-slate-400">
            <Clock className="w-4 h-4" />
            <span>{content.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div className="space-y-8">
          {content.sections.map((section, i) => (
            <Card key={i} className="border border-slate-200">
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                    {iconMap[section.icon]}
                  </div>
                  <h2 className="text-xl font-bold text-[#0F1C2E]">{section.title}</h2>
                </div>
                <p className="text-slate-600 leading-relaxed">{section.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Takeaway */}
        <Card className="mt-8 border-2 border-[#3DD4B0]/30 bg-[#3DD4B0]/5">
          <CardContent className="p-6 lg:p-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-[#3DD4B0] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[#0F1C2E] mb-2">{getText('Key Takeaway', 'النقطة الأساسية')}</h3>
                <p className="text-slate-700 leading-relaxed">{content.keyTakeaway}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{getText('Ready to Start Your Transformation?', 'مستعد لبدء تحولك؟')}</h3>
          <Link href="/products/bundle">
            <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8">
              {getText('Get the Full 30-Day Program', 'احصل على برنامج الـ 30 يوماً الكامل')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
