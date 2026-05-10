'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Clock, Target, Brain, AlertTriangle, CheckCircle2,
  ArrowRight, Lightbulb, TrendingDown, Repeat, ArrowUpRight
} from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

const guideContent = {
  en: {
    title: 'The Behavior Trap: Why Habits Fail and How They Succeed',
    subtitle: 'Most people focus on changing behavior while ignoring identity. Learn why behavioral change alone fails and how to build a new identity that supports your goals.',
    category: 'Habits & Behavior',
    readTime: '6 min read',
    sections: [
      {
        title: 'The Willpower Myth',
        content: 'Society teaches us that change comes from willpower and discipline. If you fail to stick with a habit, you simply need more discipline. This is fundamentally wrong. Research by Roy Baumeister shows that willpower is a depletable resource - like a muscle that tires. Relying on willpower alone is like trying to drive a car with no fuel. Eventually, you run out. The people who successfully maintain habits are not those with more willpower - they are those who have built identities that make those habits automatic.',
        icon: 'trending',
      },
      {
        title: 'The Behavior-Identity Gap',
        content: 'When you try to change behavior without changing identity, you create an internal conflict. Your brain knows "who you are" and rejects actions that do not fit. A person who identifies as "not a runner" will find every excuse to skip running, no matter how motivated they feel on day one. This is the behavior-identity gap: the space between what you are trying to do and who you believe you are. Closing this gap is the key to lasting change.',
        icon: 'alert',
      },
      {
        title: 'The Identity-First Approach',
        content: 'Instead of starting with "I need to run every day," start with "I am becoming a runner." This small shift changes everything. When your identity supports your behavior, actions feel like expressions of self rather than impositions on self. Every run becomes evidence for your new identity rather than a chore to complete. The question shifts from "Do I have to run?" to "What would a runner do?" - and the answer becomes obvious.',
        icon: 'brain',
      },
      {
        title: 'Building Identity Evidence',
        content: 'Your brain updates your identity based on evidence, not affirmations. Telling yourself "I am confident" without any confident actions is empty. But even one small act of courage - speaking up, making eye contact, asking a question - provides genuine evidence. Start with the smallest possible version of your target behavior. Each small win becomes a brick in the foundation of your new identity. Over time, the evidence accumulates and your self-concept shifts naturally.',
        icon: 'repeat',
      },
      {
        title: 'From Effort to Automatic',
        content: 'The ultimate goal is not to maintain habits through willpower but to reach the point where the behavior is the natural expression of your identity. A non-smoker does not use willpower to not smoke - they simply do not smoke because they are not a smoker. When your identity fully aligns with your desired behavior, the behavior requires zero willpower. It becomes automatic, like brushing your teeth. This is the destination of identity-based change.',
        icon: 'arrow',
      },
    ],
    keyTakeaway: 'Lasting behavioral change does not come from more willpower or better systems. It comes from aligning your identity with your desired behavior. When you become the type of person who does something, doing it requires no willpower at all.',
  },
  ar: {
    title: 'فخ السلوك: لماذا تفشل العادات وكيف تنجح',
    subtitle: 'أغلب الناس يركزون على تغيير السلوك لكنهم يتجاهلون الهوية. تعلم لماذا التغيير السلوكي وحده لا يكفي وكيف تبني هوية جديدة تدعم أهدافك.',
    category: 'العادات والسلوك',
    readTime: '6 دقائق قراءة',
    sections: [
      {
        title: 'خرافة الإرادة',
        content: 'المجتمع يعلمنا أن التغيير يأتي من الإرادة والانضباط. إذا فشلت في الحفاظ على عادة، فأنت ببساطة تحتاج لمزيد من الانضباط. هذا خطأ جوهري. تظهر أبحاث روي بوميستر أن الإرادة مورد ناضب - مثل العضلة التي تتعب. الاعتماد على الإرادة وحدها مثل محاولة قيادة سيارة بدون وقود. في النهاية، ستنفد. الأشخاص الذين ينجحون في الحفاظ على العادات ليسوا أصحاب إرادة أقوى - بل هم من بنوا هويات تجعل تلك العادات تلقائية.',
        icon: 'trending',
      },
      {
        title: 'فجوة السلوك والهوية',
        content: 'عندما تحاول تغيير السلوك بدون تغيير الهوية، تخلق صراعاً داخلياً. عقلك يعرف "من أنت" ويرفض الأفعال التي لا تتناسب. شخص يعرّف نفسه بأنه "عدّاء غير" سيجد كل عذر لتخطي الجري، مهما كان متحمساً في اليوم الأول. هذه هي فجوة السلوك والهوية: المسافة بين ما تحاول فعله ومن تعتقد أنك عليه. إغلاق هذه الفجوة هو مفتاح التغيير الدائم.',
        icon: 'alert',
      },
      {
        title: 'نهج الهوية أولاً',
        content: 'بدلاً من البدء بـ "أحتاج للجري كل يوم"، ابدأ بـ "أنا أصبح عدّاءً". هذا التحول الصغير يغير كل شيء. عندما تدعم هويتك سلوكك، تشعر الأفعال كتعبير عن الذات بدلاً من فرض عليها. كل جري يصبح دليلاً لهويتك الجديدة بدلاً من مهمة يجب إكمالها. السؤال يتحول من "هل يجب أن أجري؟" إلى "ماذا سيفعل العدّاء؟" - والإجابة تصبح واضحة.',
        icon: 'brain',
      },
      {
        title: 'بناء دليل الهوية',
        content: 'عقلك يحدّث هويتك بناءً على الأدلة، لا التأكيدات. إخبار نفسك "أنا واثق" بدون أي أفعال واثقة هو كلام فارغ. لكن حتى فعل شجاع صغير واحد - التحدث، التواصل البصري، طرح سؤال - يوفر دليلاً حقيقياً. ابدأ بأصغر نسخة ممكنة من سلوكك المستهدف. كل انتصار صغير يصبح لبنة في أساس هويتك الجديدة. مع الوقت، تتراكم الأدلة ويتحول مفهومك الذاتي بشكل طبيعي.',
        icon: 'repeat',
      },
      {
        title: 'من الجهد إلى التلقائية',
        content: 'الهدف النهائي ليس الحفاظ على العادات عبر الإرادة بل الوصول لنقطة يكون فيها السلوك تعبيراً طبيعياً عن هويتك. غير المدخن لا يستخدم إرادته لعدم التدخين - هو ببساطة لا يدخن لأنه ليس مدخناً. عندما تتوافق هويتك بالكامل مع سلوكك المرغوب، السلوك لا يتطلب أي إرادة. يصبح تلقائياً، مثل تنظيف الأسنان. هذه هي وجهة التغيير المبني على الهوية.',
        icon: 'arrow',
      },
    ],
    keyTakeaway: 'التغيير السلوكي الدائم لا يأتي من إرادة أقوى أو أنظمة أفضل. يأتي من توافق هويتك مع سلوكك المرغوب. عندما تصبح نوع الشخص الذي يفعل شيئاً، فعله لا يتطلب أي إرادة على الإطلاق.',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  trending: <TrendingDown className="w-6 h-6 text-[#3DD4B0]" />,
  alert: <AlertTriangle className="w-6 h-6 text-[#3DD4B0]" />,
  brain: <Brain className="w-6 h-6 text-[#3DD4B0]" />,
  repeat: <Repeat className="w-6 h-6 text-[#3DD4B0]" />,
  arrow: <ArrowUpRight className="w-6 h-6 text-[#3DD4B0]" />,
};

export default function BehaviorTrapGuide() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const content = locale === 'ar' ? guideContent.ar : guideContent.en;

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
            <Clock className="w-4 h-4" /><span>{content.readTime}</span>
          </div>
        </div>
      </div>
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
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{getText('Ready to Break the Behavior Trap?', 'مستعد لكسر فخ السلوك؟')}</h3>
          <Link href="/products/bundle">
            <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8">
              {getText('Start Your Identity Transformation', 'ابدأ تحول هويتك')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
