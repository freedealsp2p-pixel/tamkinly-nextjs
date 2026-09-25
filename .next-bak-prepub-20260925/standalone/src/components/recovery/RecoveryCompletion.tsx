// Enhanced RecoveryCompletion — R1-G
// Real completion state with maintenance/continuity/Identity handoff
// Donation ONLY on completion, never inside therapeutic tools

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { CheckCircle2, Heart, Shield, ArrowRight, ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import { RecoveryProgram } from '@/lib/recovery-journey';
import { markPornRecoveryStepCompleted, markTrcStepCompleted, getPornRecoveryState, getTrcState } from '@/lib/recovery-state';
import RecoveryDonation from './RecoveryDonation';

interface RecoveryCompletionProps {
  program: RecoveryProgram;
}

export default function RecoveryCompletion({ program }: RecoveryCompletionProps) {
  const router = useRouter();
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const [completionMarked, setCompletionMarked] = useState(false);

  useEffect(() => {
    // Mark the journey as completed in state
    if (!completionMarked) {
      if (program === 'porn-recovery') {
        markPornRecoveryStepCompleted('future-self');
      } else {
        markTrcStepCompleted('body-scan');
      }
      setCompletionMarked(true);
    }
  }, [program]);

  const isPR = program === 'porn-recovery';
  const accentColor = isPR ? '#3DD4B0' : '#1F6F78';
  const lightBg = isPR ? '#F0FDF9' : '#F0F7F7';
  const Icon = isPR ? Heart : Shield;

  // Program-specific messages
  const messages = isPR ? {
    titleAr: 'لقد أكملت رحلة التعافي من الأنماط القهرية',
    titleEn: 'You\'ve completed the Recovery from Compulsive Patterns journey',
    subtitleAr: 'لقد أكملت هذا الجزء من رحلة التعافي. يمكنك الآن متابعة بناء هويتك وأهدافك وعاداتك داخل Tamkinly.',
    subtitleEn: 'You\'ve completed this part of your recovery journey. You can now continue building your identity, goals, and habits within Tamkinly.',
    questionAr: 'ما الذي تغير؟',
    questionEn: 'What changed?',
    maintainAr: 'ماذا تحافظ عليه؟',
    maintainEn: 'What do you maintain?',
    readyAr: 'هل أنت جاهز للانتقال إلى برنامج إعادة برمجة الهوية؟',
    readyEn: 'Are you ready to transition to the Identity Transformation program?',
    ctaAr: 'ابدأ برنامج إعادة برمجة الهوية',
    ctaEn: 'Start Identity Transformation Program',
    maintainListAr: ['استمر في استخدام HALT عند كل رغبة قهرية', 'راجع سجل المحفزات أسبوعياً', 'لا تضع نفسك في مواقف محفزة عمداً', 'تذكر: الانتكاس رسالة، ليس نهاية'],
    maintainListEn: ['Continue using HALT for every compulsive urge', 'Review your trigger journal weekly', 'Don\'t deliberately put yourself in triggering situations', 'Remember: relapse is a message, not an ending'],
  } : {
    titleAr: 'لقد أكملت مرحلة الأمان والاستقرار',
    titleEn: 'You\'ve completed the Safety & Stabilization stage',
    subtitleAr: 'لقد أكملت هذه المرحلة من أدوات التنظيم والاستقرار. يمكنك الآن متابعة رحلتك داخل Tamkinly بالوتيرة المناسبة لك.',
    subtitleEn: 'You\'ve completed this phase of regulation and stabilization tools. You can now continue your journey within Tamkinly at your own pace.',
    questionAr: 'ما الأداة التي ساعدتك أكثر؟',
    questionEn: 'Which tool helped you most?',
    maintainAr: 'ماذا تحافظ عليه؟',
    maintainEn: 'What do you maintain?',
    readyAr: 'هل أنت جاهز للمتابعة داخل Tamkinly؟',
    readyEn: 'Are you ready to continue within Tamkinly?',
    ctaAr: 'متابعة رحلة إعادة برمجة الهوية',
    ctaEn: 'Continue to Identity Transformation',
    maintainListAr: ['استمر في التمرين اليومي: تنفس أو تنظيم حواس', 'استخدم Safe Place عند الحاجة', 'تذكر: الأمان أولاً، دائماً', 'لا تتخطى خطوات حتى لو شعرت بتحسن'],
    maintainListEn: ['Continue daily practice: breathing or grounding', 'Use Safe Place when needed', 'Remember: safety first, always', 'Don\'t skip steps even if you feel better'],
  };

  return (
    <section className="py-12 px-4" dir={direction}>
      <div className="max-w-2xl mx-auto">
        {/* Completion Card */}
        <div className="rounded-2xl p-8 text-center mb-8" style={{ backgroundColor: lightBg, border: `2px solid ${accentColor}` }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: accentColor }}>
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-xl font-bold mb-3" style={{ color: '#0F1C2E' }}>
            {isAr ? messages.titleAr : messages.titleEn}
          </h2>

          <p className="text-sm mb-6" style={{ color: '#374151' }}>
            {isAr ? messages.subtitleAr : messages.subtitleEn}
          </p>

          {/* What changed? */}
          <div className="text-start mb-6 rounded-xl p-4" style={{ backgroundColor: '#fff' }}>
            <h3 className="font-semibold text-sm mb-2" style={{ color: '#0F1C2E' }}>
              <Sparkles className="w-4 h-4 inline me-2" style={{ color: accentColor }} />
              {isAr ? messages.questionAr : messages.questionEn}
            </h3>
            <p className="text-xs" style={{ color: '#6B7280' }}>
              {isAr
                ? 'فكر لحظة: ما الفرق بينك الآن وبين بداية الرحلة؟'
                : 'Take a moment: what\'s the difference between you now and the start of the journey?'}
            </p>
          </div>

          {/* What to maintain */}
          <div className="text-start mb-6 rounded-xl p-4" style={{ backgroundColor: '#fff' }}>
            <h3 className="font-semibold text-sm mb-3" style={{ color: '#0F1C2E' }}>
              <RotateCcw className="w-4 h-4 inline me-2" style={{ color: accentColor }} />
              {isAr ? messages.maintainAr : messages.maintainEn}
            </h3>
            <ul className="space-y-1.5">
              {(isAr ? messages.maintainListAr : messages.maintainListEn).map((item, i) => (
                <li key={i} className="text-xs flex items-start gap-2" style={{ color: '#374151' }}>
                  <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ready for Identity Transformation? */}
          <div className="mb-4">
            <p className="text-sm font-medium mb-3" style={{ color: '#0F1C2E' }}>
              {isAr ? messages.readyAr : messages.readyEn}
            </p>
            <button
              onClick={() => router.push('/quiz')}
              className="px-8 py-3 rounded-xl text-white font-medium transition-all hover:opacity-90 shadow-lg"
              style={{ backgroundColor: accentColor }}
            >
              {isAr ? messages.ctaAr : messages.ctaEn}
              {isAr ? ' ←' : ' →'}
            </button>
          </div>

          {/* Not automatic — user chooses */}
          <p className="text-xs mt-4" style={{ color: '#9CA3AF' }}>
            {isAr
              ? 'الانتقال ليس تلقائياً. يمكنك العودة ومتابعة التعافي متى شئت.'
              : 'The transition isn\'t automatic. You can return and continue Recovery whenever you want.'}
          </p>
        </div>

        {/* Donation — ONLY on completion, never inside tools */}
        <RecoveryDonation context="completion" />
      </div>
    </section>
  );
}
