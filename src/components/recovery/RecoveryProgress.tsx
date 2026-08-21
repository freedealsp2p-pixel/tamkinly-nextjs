'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Check, RotateCcw, X } from 'lucide-react';

import {
  useTranslations,
  useLocale,
} from '@/components/providers/LocaleProvider';

const steps = [
  'recognition',
  'brain',
  'attempts',
  'framework',
  'toolkit',
  'relapse',
  'identity',
  'future',
] as const;

type StepKey = (typeof steps)[number];

const STORAGE_KEY = 'tamkinly_recovery_progress';
const STORAGE_TS_KEY = 'tamkinly_recovery_progress_ts';

export default function RecoveryProgress() {
  const t = useTranslations('recoveryPage');
  const { direction } = useLocale();

  const [activeStep, setActiveStep] =
    useState<StepKey>('recognition');

  const [savedStep, setSavedStep] = useState<StepKey | null>(null);
  const [showResumeBanner, setShowResumeBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  const activeIndex = useMemo(
    () => steps.indexOf(activeStep),
    [activeStep]
  );

  const progressPercentage =
    ((activeIndex + 1) / steps.length) * 100;

  const { scrollYProgress } = useScroll();

  const smoothScrollProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 30,
      mass: 0.2,
    }
  );

  // On mount: check for saved progress
  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    try {
      const saved = localStorage.getItem(STORAGE_KEY) as StepKey | null;
      const savedTs = localStorage.getItem(STORAGE_TS_KEY);

      if (saved && steps.includes(saved) && saved !== 'recognition') {
        // Only show resume banner if user got past the first step
        setSavedStep(saved);

        // Show banner only if visit was > 30 minutes ago (returning user)
        if (savedTs) {
          const ts = parseInt(savedTs, 10);
          const ageMinutes = (Date.now() - ts) / (1000 * 60);
          if (ageMinutes > 30) {
            setShowResumeBanner(true);
          }
        }
      }
    } catch {
      // localStorage might be disabled — fail silently
    }
  }, []);

  // Save activeStep to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined' || !mounted) return;

    try {
      localStorage.setItem(STORAGE_KEY, activeStep);
      localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
    } catch {
      // fail silently
    }
  }, [activeStep, mounted]);

  // Scroll-based section tracking — more reliable than IntersectionObserver
  // for tall sections with varying heights
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;

    const updateActiveStep = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.4;

      let closestStep: StepKey = 'recognition';
      let closestDistance = Infinity;

      steps.forEach((step) => {
        const element = document.getElementById(step);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        // Check if viewport center is within this section
        if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
          closestStep = step;
          closestDistance = 0;
        } else {
          // Otherwise, find the closest section
          const distance = Math.min(
            Math.abs(viewportCenter - elementTop),
            Math.abs(viewportCenter - elementBottom)
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestStep = step;
          }
        }
      });

      setActiveStep(closestStep);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveStep);
        ticking = true;
      }
    };

    // Initial update
    updateActiveStep();

    // Listen to scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mounted]);

  const handleStepClick = (
    step: StepKey
  ) => {
    if (typeof window === 'undefined') return;

    document
      .getElementById(step)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  const handleResume = () => {
    if (savedStep) {
      handleStepClick(savedStep);
      setShowResumeBanner(false);
    }
  };

  const handleDismissResume = () => {
    setShowResumeBanner(false);
  };

  const handleResetProgress = () => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TS_KEY);
      setSavedStep(null);
      setShowResumeBanner(false);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      // fail silently
    }
  };

  return (
    <div
      dir={direction}
      className="
        sticky
        top-[64px]
        z-30
        border-b
        border-white/10
        bg-[#0F1C2E]/95
        backdrop-blur-md
      "
    >
      <motion.div
        className="h-1 origin-left bg-[#3DD4B0]"
        style={{
          scaleX: smoothScrollProgress,
        }}
      />

      {/* Resume Banner */}
      <AnimatePresence>
        {showResumeBanner && savedStep && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[#3DD4B0]/20 bg-[#3DD4B0]/5"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 shrink-0 text-[#3DD4B0]" />
                <span className="text-sm text-white">
                  {direction === 'rtl' ? 'تابع من حيث توقفت:' : 'Resume where you left off:'}
                  {' '}
                  <span className="font-semibold text-[#3DD4B0]">
                    {t(`progress.steps.${savedStep}`)}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResume}
                  className="
                    rounded-md
                    bg-[#3DD4B0]
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    text-[#0F1C2E]
                    transition-colors
                    hover:bg-[#34c3a2]
                  "
                >
                  {direction === 'rtl' ? 'متابعة' : 'Resume'}
                </button>
                <button
                  onClick={handleDismissResume}
                  className="
                    rounded-md
                    p-1.5
                    text-white/60
                    transition-colors
                    hover:bg-white/10
                    hover:text-white
                  "
                  aria-label={direction === 'rtl' ? 'إغلاق' : 'Close'}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 py-3 md:px-6">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">
              {t('progress.label')}
            </span>
            {mounted && savedStep && activeStep !== 'recognition' && (
              <button
                onClick={handleResetProgress}
                className="
                  ml-2
                  inline-flex
                  items-center
                  gap-1
                  text-xs
                  text-white/40
                  transition-colors
                  hover:text-white/70
                "
                aria-label={direction === 'rtl' ? 'إعادة تعيين التقدم' : 'Reset progress'}
              >
                <RotateCcw className="h-3 w-3" />
                {direction === 'rtl' ? 'إعادة' : 'Reset'}
              </button>
            )}
          </div>

          <span className="text-xs text-[#3DD4B0]">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {steps.map((step, index) => {
              const isCompleted =
                index < activeIndex;

              const isActive =
                index === activeIndex;

              return (
                <button
                  key={step}
                  onClick={() =>
                    handleStepClick(step)
                  }
                  className="flex shrink-0 items-center gap-2"
                >
                  <motion.div
                    animate={{
                      scale: isActive
                        ? 1.1
                        : 1,
                      boxShadow: isActive
                        ? '0 0 20px rgba(61, 212, 176, 0.5)'
                        : 'none',
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full
                      ${
                        isCompleted
                          ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                          : isActive
                          ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                          : 'border border-white/20 bg-white/5 text-white/40'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="h-2 w-2 rounded-full bg-current" />
                    )}
                  </motion.div>

                  {isActive && (
                    <span className="whitespace-nowrap text-sm font-medium text-white">
                      {t(
                        `progress.steps.${step}`
                      )}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between gap-2">
            {steps.map((step, index) => {
              const isCompleted =
                index < activeIndex;

              const isActive =
                index === activeIndex;

              return (
                <button
                  key={step}
                  onClick={() =>
                    handleStepClick(step)
                  }
                  className="group flex flex-col items-center gap-2"
                >
                  <motion.div
                    animate={{
                      scale: isActive
                        ? 1.1
                        : 1,
                      boxShadow: isActive
                        ? '0 0 20px rgba(61, 212, 176, 0.5)'
                        : 'none',
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full transition-all
                      ${
                        isCompleted
                          ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                          : isActive
                          ? 'bg-[#3DD4B0] text-[#0F1C2E]'
                          : 'border border-white/20 bg-white/5 text-white/40'
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    )}
                  </motion.div>

                  <span
                    className={`
                      text-center text-xs font-medium transition-colors
                      ${
                        isActive
                          ? 'text-[#3DD4B0]'
                          : isCompleted
                          ? 'text-white'
                          : 'text-white/50'
                      }
                    `}
                  >
                    {t(
                      `progress.steps.${step}`
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
