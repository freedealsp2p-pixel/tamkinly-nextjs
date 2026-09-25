// RecoveryEligibilityNotice — R1-D Enhanced
// Integrates with journey model for context-aware guidance
// Shows who can start Identity directly vs who should pass through Recovery

'use client';

import { useLocale } from '@/components/providers/LocaleProvider';
import { useRouter } from 'next/navigation';
import { Sparkles, Shield, ArrowRight, ArrowLeft } from 'lucide-react';

interface RecoveryEligibilityNoticeProps {
  context?: 'recovery-hub' | 'porn-recovery' | 'trc' | 'methodology' | 'how-it-works';
}

export default function RecoveryEligibilityNotice({ context = 'recovery-hub' }: RecoveryEligibilityNoticeProps) {
  const { direction, locale } = useLocale();
  const router = useRouter();
  const isAr = locale === 'ar';

  // Only show CTAs in recovery-hub and methodology contexts
  const showCtas = context === 'recovery-hub' || context === 'methodology';

  return (
    <section className="py-8 px-4" dir={direction}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#0F1C2E' }}>
          {isAr ? 'هل أحتاج مسار التعافي؟' : 'Do I need a Recovery path?'}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Can start Identity directly */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#F0FDF9', border: '1px solid #3DD4B0' }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" style={{ color: '#3DD4B0' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                {isAr ? 'ابدأ برنامج الهوية مباشرة' : 'Start Identity Program directly'}
              </span>
            </div>
            <ul className="space-y-1.5 text-xs" style={{ color: '#374151' }}>
              <li>• {isAr ? 'المستخدم العادي' : 'General user'}</li>
              <li>• {isAr ? 'الباحث عن تطوير الذات' : 'Self-development seeker'}</li>
              <li>• {isAr ? 'من يريد تحسين العادات والقرارات' : 'Habit & decision improvement'}</li>
            </ul>
            {showCtas && (
              <button
                onClick={() => router.push('/quiz')}
                className="mt-3 w-full py-2 rounded-lg text-white text-xs font-medium"
                style={{ backgroundColor: '#3DD4B0' }}
              >
                {isAr ? 'ابدأ برنامج الهوية' : 'Start Identity Program'} →
              </button>
            )}
          </div>

          {/* Should pass through Recovery */}
          <div className="rounded-xl p-5" style={{ backgroundColor: '#F0F7F7', border: '1px solid #1F6F78' }}>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5" style={{ color: '#1F6F78' }} />
              <span className="font-semibold text-sm" style={{ color: '#0F1C2E' }}>
                {isAr ? 'ابدأ بمسار التعافي أولاً' : 'Start with Recovery first'}
              </span>
            </div>
            <ul className="space-y-1.5 text-xs" style={{ color: '#374151' }}>
              <li>• {isAr ? 'أنماط قهرية مرتبطة بالإباحية' : 'Compulsive porn-related behaviors'}</li>
              <li>• {isAr ? 'آثار صدمات أو تحرش أو اعتداء جنسي' : 'Effects of sexual trauma/assault'}</li>
              <li>• {isAr ? 'الأدوات تثير ضيقاً عاطفياً شديداً' : 'Tools trigger intense emotional responses'}</li>
            </ul>
            {showCtas && (
              <button
                onClick={() => router.push('/recovery')}
                className="mt-3 w-full py-2 rounded-lg text-white text-xs font-medium"
                style={{ backgroundColor: '#1F6F78' }}
              >
                {isAr ? 'استكشف مسارات التعافي' : 'Explore Recovery Paths'} →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
