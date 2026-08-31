'use client';

import { useState, useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface RepetitionCounterProps {
  totalReps?: number;
  phrase?: string;
  onIdeaProvided?: (idea: string) => void;
  accentColor?: string;
}

export function RepetitionCounter({
  totalReps = 7,
  phrase,
  onIdeaProvided,
  accentColor = '#0F1C2E',
}: RepetitionCounterProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const [customIdea, setCustomIdea] = useState('');
  const [idea, setIdea] = useState(phrase || '');
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleIdeaSubmit = useCallback(() => {
    if (customIdea.trim()) {
      setIdea(customIdea.trim());
      onIdeaProvided?.(customIdea.trim());
    }
  }, [customIdea, onIdeaProvided]);

  const handleRepeat = useCallback(() => {
    if (count < totalReps) {
      const next = count + 1;
      setCount(next);
      if (next >= totalReps) {
        setIsComplete(true);
      }
    }
  }, [count, totalReps]);

  const handleReset = useCallback(() => {
    setCount(0);
    setIsComplete(false);
  }, []);

  const progress = (count / totalReps) * 100;

  // Determine which view to show
  const showInput = Boolean(!idea);
  const showCounter = Boolean(idea && !isComplete);
  const showComplete = Boolean(isComplete);

  return (
    <div className="space-y-6" dir={direction}>
      {/* Step 1: Enter idea (if no phrase provided) */}
      {showInput && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#0F1C2E]/70">
            {isAr
              ? 'ادخل فكرتك الجديدة (هويتك المختارة)'
              : 'Type your new idea (your chosen identity)'}
          </label>
          <textarea
            value={customIdea}
            onChange={(e) => setCustomIdea(e.target.value)}
            placeholder={
              isAr
                ? 'مثال: أنا شخص حر أستحق السعادة'
                : 'e.g. I am a free person who deserves happiness'
            }
            className="w-full h-24 px-4 py-3 rounded-xl border border-slate-200 text-[#0F1C2E] text-base leading-relaxed focus:outline-none focus:ring-2 transition-all"
            dir={direction}
            maxLength={200}
          />
          <button
            onClick={handleIdeaSubmit}
            disabled={!customIdea.trim()}
            className="w-full py-3 rounded-xl text-white font-semibold transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {isAr ? 'أكّد الفكرة' : 'Confirm the idea'}
          </button>
        </div>
      )}

      {/* Step 2: Repeat with counter */}
      {showCounter && (
        <div className="space-y-6">
          {/* The idea display */}
          <div
            className="rounded-2xl p-5 text-center"
            style={{
              backgroundColor: accentColor + '08',
              borderLeft: isAr ? 'none' : '4px solid ' + accentColor,
              borderRight: isAr ? '4px solid ' + accentColor : 'none',
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              {isAr ? 'فكرتك الجديدة' : 'Your New Idea'}
            </p>
            <p className="text-[#0F1C2E] text-lg font-medium leading-relaxed">
              {isAr ? '«' + idea + '»' : '“' + idea + '”'}
            </p>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: totalReps }).map((_unused, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i < count ? accentColor : '#E2E8F0',
                  transform: i < count ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>

          {/* Counter text */}
          <p className="text-center text-sm text-[#0F1C2E]/50">
            {isAr
              ? 'التكرار ' + count + ' من ' + totalReps
              : 'Repetition ' + count + ' of ' + totalReps}
          </p>

          {/* Progress bar */}
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: progress + '%', backgroundColor: accentColor }}
            />
          </div>

          {/* Repeat button */}
          <button
            onClick={handleRepeat}
            className="w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-200 hover:shadow-lg active:scale-[0.98]"
            style={{ backgroundColor: accentColor }}
          >
            {isAr
              ? 'قُلها بصوتك الداخلي (' + (count + 1) + '/' + totalReps + ')'
              : 'Say it with your inner voice (' + (count + 1) + '/' + totalReps + ')'}
          </button>

          {/* Hint */}
          <p className="text-center text-xs text-[#0F1C2E]/30">
            {isAr
              ? 'انطقهها بييي تام، بنبرة حازمة وهادة'
              : 'Utter it with complete certainty, in a calm and firm tone'}
          </p>
        </div>
      )}

      {/* Step 3: Complete */}
      {showComplete && (
        <div className="text-center space-y-4">
          <div
            className="w-16 h-16 rounded-full mx-auto flex items-center justify-center"
            style={{ backgroundColor: accentColor + '15' }}
          >
            <svg className="w-8 h-8" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0F1C2E]">
            {isAr ? 'تم التكرار بنجاح'
              : 'Repetition Complete'}
          </h3>
          <p className="text-[#0F1C2E]/60 leading-relaxed">
            {isAr
              ? 'ما قلته بييه بيين مرات، يصبح حقيقتك. كرر هذا التمرين يومياً لمدة أسبوع.'
              : 'What you said with certainty seven times becomes your eighth truth. Repeat this exercise daily for a week.'}
          </p>
          <button
            onClick={handleReset}
            className="text-sm font-medium hover:underline"
            style={{ color: accentColor }}
          >
            {isAr ? 'أعد التكرار' : 'Repeat again'}
          </button>
        </div>
      )}
    </div>
  );
}

export default RepetitionCounter;
