// RecoveryPage (Porn Recovery) — R1-E Enhanced
// Integrates with journey state, marks steps as viewed

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import RecoveryProgress from "./RecoveryProgress";
import RecoveryHero from "./RecoveryHero";
import RecoveryRecognition from "./RecoveryRecognition";
import RecoveryBrain from "./RecoveryBrain";
import RecoveryFailedAttempts from "./RecoveryFailedAttempts";
import RecoveryFramework from "./RecoveryFramework";
import RecoveryToolkitApps from "./RecoveryToolkitApps";
import RecoveryRelapse from "./RecoveryRelapse";
import RecoveryIdentity from "./RecoveryIdentity";
import RecoveryFutureSelf from "./RecoveryFutureSelf";
import RecoveryCTA from "./RecoveryCTA";
import RecoveryEligibilityNotice from "./RecoveryEligibilityNotice";
import RecoveryCompletion from "./RecoveryCompletion";
import { usePornRecoveryState } from '@/hooks/useRecoveryState';

export default function RecoveryPage() {
  const { init, markStepStarted } = usePornRecoveryState();
  const router = useRouter();
  const { locale } = useLocale();

  useEffect(() => {
    try {
      localStorage.setItem('tamkinly_recovery_discovered', 'true');
    } catch {}
    // Initialize state on first visit
    init();
  }, []);

  return (
    <main>
      <RecoveryProgress />
      <RecoveryHero />
      <RecoveryEligibilityNotice context="porn-recovery" />
      <div id="recognition">
        <RecoveryRecognition />
      </div>
      <div id="brain">
        <RecoveryBrain />
      </div>
      <div id="failed-attempts">
        <RecoveryFailedAttempts />
      </div>
      <div id="framework">
        <RecoveryFramework />
      </div>
      <div id="toolkit">
        <RecoveryToolkitApps />
      </div>
      <div id="relapse">
        <RecoveryRelapse />
      </div>
      <div id="identity">
        <RecoveryIdentity />
      </div>
      <div id="future-self">
        <RecoveryFutureSelf />
      </div>
      <RecoveryCTA />
      <RecoveryCompletion program="porn-recovery" />

      {/* Journey page link */}
      <div className="py-6 px-4 text-center">
        <button
          onClick={() => router.push('/recovery/porn-recovery/journey')}
          className="text-sm font-medium"
          style={{ color: '#3DD4B0' }}
        >
          {locale === 'ar' ? 'عرض رحلة التعافي الكاملة →' : 'View full Recovery Journey →'}
        </button>
      </div>
    </main>
  );
}
