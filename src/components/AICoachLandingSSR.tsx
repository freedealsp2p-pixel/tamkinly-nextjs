import Link from 'next/link';
import { Sparkles, MessageCircle, Shield, CheckCircle2, Lock, ArrowLeft, Brain, Heart, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  { icon: Brain, en: 'Identity Clarity', ar: 'وضوح الهوية', desc_en: 'Understand who you are and who you want to become', desc_ar: 'افهم من أنت ومن تريد أن تصبح' },
  { icon: Heart, en: 'Emotional Regulation', ar: 'التنظيم العاطفي', desc_en: 'Manage your emotions instead of being managed by them', desc_ar: 'أدر مشاعرك بدلاً من أن تُدار بها' },
  { icon: Target, en: 'Habit Architecture', ar: 'هندسة العادات', desc_en: 'Build identity-aligned habits that stick automatically', desc_ar: 'ابنِ عادات متوافقة مع هويتك تلتصق تلقائياً' },
];

const starters = [
  { en: "I feel stuck and don't know how to move forward", ar: 'أشعر بالتعثر ولا أعرف كيف أتحرك للأمام' },
  { en: 'Help me understand my identity gap', ar: 'ساعدني في فهم فجوة هويتي' },
  { en: "I want to build better habits but keep failing", ar: 'أريد بناء عادات أفضل لكنني أفشل دائماً' },
];

export function AICoachLandingSSR({ locale }: { locale: string }) {
  const isRTL = locale === 'ar';
  const getText = (en: string, ar: string) => isRTL ? ar : en;

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              {getText('Back to Apps', 'العودة للتطبيقات')}
            </Link>
            <div className="w-20 h-20 rounded-2xl bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-[#3DD4B0]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              {getText('AI Identity Coach', 'مدرب الهوية الذكي')}
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              {getText(
                'Your personal transformation companion powered by AI. Ask anything about identity change, habits, or the Tamkinly system. Available 24/7 with personalized guidance.',
                'رفيق تحوّلك الشخصي المدعوم بالذكاء الاصطناعي. اسأل أي شيء عن تغيير الهوية أو العادات أو نظام تمكينلي. متاح على مدار الساعة مع إرشادات مخصصة.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#coach-app">
                <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 text-lg font-bold">
                  <MessageCircle className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                  {getText('Start Chatting', 'ابدأ المحادثة')}
                </Button>
              </a>
              <Link href="/quiz">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 h-14">
                  {getText('Take Free Quiz', 'خذ الكويز المجاني')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#0F1C2E] mb-4 text-center">
              {getText('What Your Coach Helps With', 'ما يساعدك فيه المدرب')}
            </h2>
            <p className="text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              {getText(
                'Grounded in psychology and neuroscience, your AI coach provides evidence-based guidance for real transformation.',
                'مبني على علم النفس والعلوم العصبية، يقدم مدربك إرشادات مبنية على الأدلة لتحول حقيقي.'
              )}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-7 w-7 text-[#3DD4B0]" />
                    </div>
                    <h3 className="font-semibold text-[#0F1C2E] mb-2">{getText(f.en, f.ar)}</h3>
                    <p className="text-sm text-slate-600">{getText(f.desc_en, f.desc_ar)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-8 text-center">
              {getText('Try Asking...', 'جرّب أن تسأل...')}
            </h2>
            <div className="space-y-4">
              {starters.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F6F8FA] rounded-xl">
                  <MessageCircle className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{getText(s.en, s.ar)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#3DD4B0]" />
                <span className="text-sm text-slate-600">{getText('Private & Secure', 'خاص وآمن')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                <span className="text-sm text-slate-600">{getText('No Email Required', 'بدون بريد إلكتروني')}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-slate-900 rounded-2xl p-8 text-white">
              <Lock className="w-8 h-8 text-[#3DD4B0] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                {getText('Available with Mastery subscription', 'متاح مع اشتراك الإتقان')}
              </h3>
              <p className="text-slate-300 mb-6">
                {getText(
                  'The AI Identity Coach is part of the Mastery subscription, our premium package. Get unlimited access to the coach plus all 20 transformation tools.',
                  'مدرب الهوية الذكي جزء من الباقة الشاملة، أكثر باقاتنا شعبية. احصل على وصول غير محدود للمدرب بالإضافة إلى جميع أدوات التحول الـ 15+.'
                )}
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-6 h-12 font-bold">
                  {getText('View Plans', 'عرض الخطط')}
                  <ArrowLeft className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coach App Anchor */}
      <div id="coach-app">
        {/* Client-side chat component loads here */}
      </div>
    </div>
  );
}

