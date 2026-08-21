"use client";

import { useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { Eye, Wind, Shield, ArrowRight, ArrowLeft, Footprints, Brain } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    titleAr: 'لماذا يعمل التأريض؟',
    titleEn: 'Why Does Grounding Work?',
    bodyAr: 'عندما تنشط الصدمة، يغادر الدماغ اللحظة الحالية ويعود إلى زمن الخطر. التأريض يذكّر الدماغ أن "الآن آمن" — يفكّر ارتباط الحاضر من الماضي ويعيد تنشيط القشرة الجبهية المسؤولة عن التهدئة والتفكير المنطقي. البحوث تظهر أن تقنيات التأريض تقلل أعراض القلق والاكتئاب وأعراض ما بعد الصدمة بشكل ملحوظ.',
    bodyEn: 'When trauma activates, the brain leaves the present and returns to the time of danger. Grounding reminds the brain that "now is safe" — it breaks the link between present and past, reactivating the prefrontal cortex responsible for calming and logical thinking. Research shows grounding techniques significantly reduce anxiety, depression, and PTSD symptoms.',
  },
  {
    icon: Footprints,
    titleAr: 'كيف يعمل في جسدك؟',
    titleEn: 'How Does It Work in Your Body?',
    bodyAr: 'التأريض يفعّل العصب الحائر (Vagus Nerve) — الجزء المسؤول عن "الراحة والهضم". هذا يبطئ ضربات القلب، يعمّق التنفس، ويخفض الكورتيزول. تقنية 5-4-3-2-1 تستخدم الحواس الخمس لإعادة توجيه الانتباه من الداخل (الذكريات) إلى الخارج (الحاضر). الأبحاث على العلاج الجسدي تظهر أن الاتصال بالأرض والجسد يقلل التوتر المزمن ويحسن تنظيم المشاعر.',
    bodyEn: 'Grounding activates the Vagus Nerve — the part responsible for "rest and digest." This slows heart rate, deepens breathing, and lowers cortisol. The 5-4-3-2-1 technique uses the five senses to redirect attention from inside (memories) to outside (the present). Somatic therapy research shows that body-earth connection reduces chronic tension and improves emotion regulation.',
  },
  {
    icon: Brain,
    titleAr: 'متى تستخدم التأريض؟',
    titleEn: 'When Should You Use Grounding?',
    bodyAr: 'استخدم التأريض عندما: تشعر بالإرهاق الشديد، تلاحظ أنك تفارق عن الواقع، تعيش ذكريات اقتحامية، تشعر بنوبة هلع قادمة، أو تحتاج العودة للحاضر بسرعة. لا تستخدم التأريض كأداة لتجنب المشاعر دائماً — هو أداة طوارئ أولاً، ثم أداة تنظم بالتدريج.',
    bodyEn: 'Use grounding when: you feel overwhelmed, notice you are dissociating, experience intrusive memories, feel a panic attack coming, or need to return to the present quickly. Do not use grounding as a tool to always avoid emotions — it is an emergency tool first, then a gradual regulation tool.',
  },
  {
    icon: Shield,
    titleAr: 'ماذا تفعل الآن؟',
    titleEn: 'What Do You Do Now?',
    bodyAr: 'جرب أداة التأريض التفاعلية 5-4-3-2-1 الآن. هي تأخذ 5 دقائق فقط ويمكنك استخدامها في أي مكان. إذا كنت تتعامل مع محفزات متكررة، جرب أيضاً خريطة المحفزات لفهم أنماطك.',
    bodyEn: 'Try the interactive 5-4-3-2-1 grounding tool now. It takes only 5 minutes and you can use it anywhere. If you deal with recurring triggers, also try the Trigger Mapping tool to understand your patterns.',
    isCta: true,
  },
];

export default function GroundingGuidePage() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';
  const accent = '#1F6F78';

  return (
    <div className="min-h-screen bg-white" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <RecoveryBreadcrumb items={[
          { label: isAr ? 'التعافي' : 'Recovery', href: '/recovery' },
          { label: isAr ? 'التعافي من الصدمات' : 'TRC', href: '/recovery/trc' },
          { label: isAr ? 'دليل التأريض' : 'Grounding Guide' },
        ]} />
      </div>
      <SafetyResponse assetId="trc-grounding-guide" program="trc" />
      <TherapeuticExit fallbackHref="/recovery/trc" />

      <div className="max-w-2xl mx-auto px-4 py-8">
        <MedicalDisclaimer />
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-[#1F6F78]">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0F1C2E]">{isAr ? 'دليل التأريض: لماذا يعمل وكيف تستخدمه' : 'Grounding Guide: Why It Works and How to Use It'}</h1>
          <p className="text-[#0F1C2E]/70 mt-2">{isAr ? 'الفهم هو أول خطوة — وعندما تفهم، تتوقف عن لوم نفسك' : 'Understanding is the first step — and when you understand, you stop blaming yourself'}</p>
        </div>

        {sections.map((s, i) => (
          <div key={i} className="mb-8 rounded-xl p-6 border border-slate-100" style={{ backgroundColor: i % 2 === 0 ? '#F0F7F7' : 'white' }}>
            <div className="flex items-center gap-3 mb-3">
              <s.icon className="w-6 h-6 text-[#1F6F78]" />
              <h2 className="text-lg font-bold text-[#0F1C2E]">{isAr ? s.titleAr : s.titleEn}</h2>
            </div>
            <p className="text-[#0F1C2E]/80 leading-relaxed">{isAr ? s.bodyAr : s.bodyEn}</p>
            {s.isCta && (
              <div className="mt-4 flex gap-3">
                <a href="/recovery/trc/grounding" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1F6F78] text-white font-medium hover:bg-[#1a5e66] transition-colors">
                  {isAr ? 'جرب التأريض 5-4-3-2-1' : 'Try 5-4-3-2-1 Grounding'}
                  {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </a>
                <a href="/recovery/trc/worksheets/trigger-mapping" className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-[#1F6F78] text-[#1F6F78] font-medium hover:bg-[#F0F7F7] transition-colors text-sm">
                  {isAr ? 'خريطة المحفزات' : 'Trigger Mapping'}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
