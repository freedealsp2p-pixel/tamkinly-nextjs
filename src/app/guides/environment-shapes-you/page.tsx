'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, Clock, Home, Users, Smartphone, CheckCircle2,
  ArrowRight, Lightbulb, Shield, PenTool, Eye
} from "lucide-react";
import { useLocale } from '@/components/providers/LocaleProvider';

const guideContent = {
  en: {
    title: 'Your Environment Shapes You: A Personal Environment Audit Guide',
    subtitle: 'Your physical, digital, and social environment shapes your identity more than you think. Learn how to design an environment that automatically supports your new identity.',
    category: 'Environment Design',
    readTime: '5 min read',
    sections: [
      {
        title: 'The Invisible Hand of Environment',
        content: 'Every object in your environment sends a signal about who you are and what you should do. A fruit bowl on the counter says "I eat healthy." A treadmill in the living room says "I exercise." A phone loaded with social media says "I scroll." Your environment is constantly shaping your behavior without your awareness. Research by Wendy Wood shows that 43% of daily actions are performed automatically while thinking about something else. Your environment is the invisible hand guiding these automatic behaviors.',
        icon: 'eye',
      },
      {
        title: 'Physical Environment Audit',
        content: 'Walk through each room in your home and ask: "Does this space support the person I want to become?" Remove items that contradict your target identity. Add items that support it. Want to read more? Put a book on your pillow. Want to eat healthier? Make healthy food visible and junk food invisible. The key principle: make desired behaviors easy and undesired behaviors hard. Your physical space should make the right choice the easiest choice.',
        icon: 'home',
      },
      {
        title: 'Digital Environment Audit',
        content: 'Your phone and computer are the most powerful behavior-shaping tools you own. Audit your home screen: which apps are visible? Do they support your new identity? Delete or hide apps that drain your time and conflict with who you want to be. Follow accounts that inspire your target identity. Unfollow those that trigger comparison or distraction. Set up notification rules: only essential apps can interrupt you. Your digital environment should feel like a supportive workspace, not a casino designed to steal your attention.',
        icon: 'phone',
      },
      {
        title: 'Social Environment Audit',
        content: 'Jim Rohn famously said you are the average of the five people you spend the most time with. This is not just motivation talk - it is neuroscience. Mirror neurons cause us to unconsciously mimic the behaviors, speech patterns, and attitudes of those around us. Evaluate your social circle: who supports your new identity? Who undermines it? You do not need to cut people off, but you can be intentional about how much time you spend with each person. Seek communities where your target identity is normal.',
        icon: 'users',
      },
      {
        title: 'The Environment Audit Worksheet',
        content: 'Create a simple three-column worksheet: Environment | Current Signal | Desired Signal. List every element of your physical, digital, and social environment. For each, write what signal it currently sends and what signal you want it to send. Then make one change per day. Do not try to overhaul everything at once. Small, consistent changes compound over time. Within 30 days, your environment will be unrecognizable - and so will your behavior.',
        icon: 'pen',
      },
    ],
    keyTakeaway: 'You do not rise to the level of your goals - you fall to the level of your environment. Design an environment that makes your target identity the path of least resistance, and change becomes almost effortless.',
  },
  ar: {
    title: 'بيئتك تصنعك: دليل تدقيق البيئة الشخصية',
    subtitle: 'بيئتك المادية والرقمية والاجتماعية تشكل هويتك أكثر مما تظن. تعلم كيف تصمم بيئة تدعم هويتك الجديدة تلقائياً.',
    category: 'تصميم البيئة',
    readTime: '5 دقائق قراءة',
    sections: [
      {
        title: 'اليد الخفية للبيئة',
        content: 'كل شيء في بيئتك يرسل إشارة عن من أنت وماذا يجب أن تفعل. وعاء فواكه على الطاولة يقول "أنا آكل صحي." جهاز مشي في الصالة يقول "أنا أتمرن." هاتف محمّل بوسائل التواصل يقول "أنا أتصفح." بيئتك تشكل سلوكك باستمرار دون وعيك. تظهر أبحاث ويندي وود أن 43% من الأفعال اليومية تؤدى تلقائياً بينما تفكر في شيء آخر. بيئتك هي اليد الخفية التي توجه هذه السلوكيات التلقائية.',
        icon: 'eye',
      },
      {
        title: 'تدقيق البيئة المادية',
        content: 'امشِ في كل غرفة في منزلك واسأل: "هل هذه المساحة تدعم الشخص الذي أريد أن أصبحه؟" أزل الأشياء التي تتعارض مع هويتك المستهدفة. أضف أشياء تدعمها. تريد القراءة أكثر؟ ضع كتاباً على وسادتك. تريد الأكل الصحي؟ اجعل الطعام الصحي مرئياً والطعام غير الصحي مخفياً. المبدأ الأساسي: اجعل السلوكيات المرغوبة سهلة وغير المرغوبة صعبة. مساحتك المادية يجب أن تجعل الخيار الصحي هو الأسهل.',
        icon: 'home',
      },
      {
        title: 'تدقيق البيئة الرقمية',
        content: 'هاتفك وحاسوبك هما أقوى أدوات تشكيل السلوك التي تمتلكها. راجع شاشتك الرئيسية: أي تطبيقات مرئية؟ هل تدعم هويتك الجديدة؟ احذف أو أخفِ التطبيقات التي تستنزف وقتك وتتعارض مع من تريد أن تكون. تابع حسابات تلهم هويتك المستهدفة. ألغِ متابعة ما يثير المقارنة أو الإلهاء. قم بإعداد قواعد الإشعارات: فقط التطبيقات الأساسية يمكنها مقاطعتك. بيئتك الرقمية يجب أن تشعر كمساحة عمل داعمة، لا كازينو مصمم لسرقة انتباهك.',
        icon: 'phone',
      },
      {
        title: 'تدقيق البيئة الاجتماعية',
        content: 'قال جيم رون الشهير أنك متوسط الأشخاص الخمسة الذين تقضي معهم أكثر وقت. هذا ليس مجرد حديث تحفيزي - إنه علم أعصاب. الخلايا العصبية المرآتية تجعلنا نحاكي بلا وعي سلوكيات وأنماط كلام ومواقف من حولنا. قيّم دائرة معارفك: من يدعم هويتك الجديدة؟ من يقوضها؟ لا تحتاج لقطع علاقات، لكن يمكنك أن تكون متعمداً حول مقدار الوقت الذي تقضيه مع كل شخص. ابحث عن مجتمعات حيث هويتك المستهدفة هي القاعدة.',
        icon: 'users',
      },
      {
        title: 'ورقة تدقيق البيئة',
        content: 'أنشئ ورقة عمل بسيطة من ثلاثة أعمدة: البيئة | الإشارة الحالية | الإشارة المطلوبة. اذكر كل عنصر في بيئتك المادية والرقمية والاجتماعية. لكل عنصر، اكتب ما الإشارة التي يرسلها حالياً وما الإشارة التي تريدها أن ترسلها. ثم أجرِ تغييراً واحداً يومياً. لا تحاول إصلاح كل شيء دفعة واحدة. التغييرات الصغيرة والمتسقة تتراكم مع الوقت. خلال 30 يوماً، ستكون بيئتك غير قابلة للتعرف - وكذلك سلوكك.',
        icon: 'pen',
      },
    ],
    keyTakeaway: 'أنت لا ترتقي لمستوى أهدافك - أنت تنحدر لمستوى بيئتك. صمم بيئة تجعل هويتك المستهدفة هي طريق المقاومة الأقل، والتغيير يصبح شبه تلقائي.',
  },
};

const iconMap: Record<string, React.ReactNode> = {
  eye: <Eye className="w-6 h-6 text-[#3DD4B0]" />,
  home: <Home className="w-6 h-6 text-[#3DD4B0]" />,
  phone: <Smartphone className="w-6 h-6 text-[#3DD4B0]" />,
  users: <Users className="w-6 h-6 text-[#3DD4B0]" />,
  pen: <PenTool className="w-6 h-6 text-[#3DD4B0]" />,
};

export default function EnvironmentGuide() {
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
          <h3 className="text-xl font-bold text-[#0F1C2E] mb-4">{getText('Ready to Design Your Environment?', 'مستعد لتصميم بيئتك؟')}</h3>
          <Link href="/products/bundle">
            <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold h-12 px-8">
              {getText('Get the Environment Audit Tool', 'احصل على أداة تدقيق البيئة')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
