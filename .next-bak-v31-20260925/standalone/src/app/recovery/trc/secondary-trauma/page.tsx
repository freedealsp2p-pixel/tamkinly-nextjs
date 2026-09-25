"use client";

import { useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { Heart, AlertTriangle, Shield, ArrowRight, ArrowLeft, Users, Brain } from 'lucide-react';

const sections = [
  {
    icon: Users,
    titleAr: 'ما هي الصدمة الثانوية؟',
    titleEn: 'What Is Secondary Trauma?',
    bodyAr: 'الصدمة الثانوية (STS) تحدث عندما تتأثر أنت نفسك بالتعرض لصدمة شخص آخر. الآباء الذين يسمعون قصة طفلهم، المعالجون الذين يروون الجروح يومياً، الأزواج الذين يعيشون مع ناجٍ — كلهم معرضون. الأبحاث تظهر أن 69% من المهنيين النفسيين يعانون من مستوى متوسط أو أعلى من STS. هذا ليس ضعفاً — هذا استجابة طبيعية للإنسان الذي يهتم.',
    bodyEn: 'Secondary Trauma (STS) occurs when you are affected by exposure to another person\'s trauma. Parents who hear their child\'s story, therapists who witness wounds daily, spouses who live with a survivor — all are at risk. Research shows 69% of mental health professionals experience moderate or higher STS. This is not weakness — it is a natural response for a caring human.',
  },
  {
    icon: AlertTriangle,
    titleAr: 'علامات الصدمة الثانوية',
    titleEn: 'Signs of Secondary Trauma',
    bodyAr: 'ثلاث مجموعات أعراض — مثل PTSD لكن من التعرض غير المباشر: (1) اقتحام: أفكار أو صور من تجربة الشخص الآخر تأتيك رغمًا. (2) تجنب: تتجنب مواضيع أو أماكن أو أشخاص يذكرونك. (3) فرط تنشيط: يقظة مفرطة، صعوبة نوم، تهيج. قد تلاحظ أيضاً: تراجع في التعاطف، شعور بالعجز، فقدان المعنى، تغيّر في نظرة العالم.',
    bodyEn: 'Three symptom clusters — like PTSD but from indirect exposure: (1) Intrusion: thoughts or images from the other person is experience coming unbidden. (2) Avoidance: avoiding topics, places, or people that remind you. (3) Hyperarousal: hypervigilance, sleep difficulty, irritability. You may also notice: reduced empathy, feelings of helplessness, loss of meaning, worldview changes.',
  },
  {
    icon: Brain,
    titleAr: 'شفاؤك جزء من شفاء طفلك',
    titleEn: 'Your Healing Is Part of Your Child is Healing',
    bodyAr: 'الطفل يقرأ وجوه والديه قبل أن يسمع كلماتهم. إذا رأى رعباً مستمراً، يستنتج أن العالم خطير. شفاؤك أنت — من خلال إرشاد نفسي، علاج فردي، مجموعات دعم — ضروري لأنك يجب أن تكون "مرساة أمان عاطفية". هذا ليس أنانياً — هذا ضرورة. لا يمكنك إعطاء ما لا تملك.',
    bodyEn: 'A child reads their parents is faces before hearing their words. If they see ongoing terror, they conclude the world is dangerous. Your healing — through counseling, individual therapy, support groups — is essential because you must be an "emotional safety anchor." This is not selfish — it is necessity. You cannot give what you do not have.',
  },
  {
    icon: Shield,
    titleAr: 'ماذا تفعل الآن؟',
    titleEn: 'What Do You Do Now?',
    bodyAr: 'إذا كنت تشعر بأعراض الصدمة الثانوية، ابدأ بالارتكاز والتنفس. أنشئ خطة أمان خاصة بك — ليس فقط لطفلك. إذا استمرت الأعراض، اطلب إرشاداً نفسياً متخصصاً.',
    bodyEn: 'If you are experiencing secondary trauma symptoms, start with grounding and breathing. Create a safety plan for yourself — not just your child. If symptoms persist, seek specialized counseling.',
    isCta: true,
  },
];

export default function SecondaryTraumaPage() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <RecoveryBreadcrumb items={[
          { label: isAr ? 'التعافي' : 'Recovery', href: '/recovery' },
          { label: isAr ? 'التعافي من الصدمات' : 'TRC', href: '/recovery/trc' },
          { label: isAr ? 'الصدمة الثانوية' : 'Secondary Trauma' },
        ]} />
      </div>
      <SafetyResponse assetId="trc-secondary-trauma" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <MedicalDisclaimer />
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#1F6F78]">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1C2E]">{isAr ? 'الصدمة الثانوية: عندما تتأثر بصرخة شخص آخر' : 'Secondary Trauma: When You Are Affected by Another\'s Cry'}</h1>
        </div>

        {sections.map((s, i) => (
          <div key={i} className="mb-8 rounded-xl p-6 border border-slate-100" style={{ backgroundColor: i % 2 === 0 ? '#F0F7F7' : 'white' }}>
            <div className="flex items-center gap-3 mb-3">
              <s.icon className="w-6 h-6 text-[#1F6F78]" />
              <h2 className="text-lg font-bold text-[#0F1C2E]">{isAr ? s.titleAr : s.titleEn}</h2>
            </div>
            <p className="text-[#0F1C2E]/80 leading-relaxed">{isAr ? s.bodyAr : s.bodyEn}</p>
            {s.isCta && (
              <div className="mt-4 flex gap-3 flex-wrap">
                <a href="/recovery/trc/grounding" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F6F78] text-white font-medium hover:bg-[#1a5e66] transition-colors">
                  {isAr ? 'جرب التأريض الآن' : 'Try Grounding Now'}
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </a>
                <a href="/recovery/trc/worksheets/safety-plan" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-[#1F6F78] text-[#1F6F78] font-medium hover:bg-[#F0F7F7] transition-colors text-sm">
                  {isAr ? 'أنشئ خطة أمانك' : 'Build Your Safety Plan'}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
