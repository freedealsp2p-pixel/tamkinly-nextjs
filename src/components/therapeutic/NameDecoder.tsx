'use client';

import { useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface NameDecoderProps {
  /** Callback when user completes the name input */
  onNameReady?: (name: string) => void;
  /** Current protocol accent color */
  accentColor?: string;
}

/**
 * NameDecoder — Interactive component for Alternative Code protocol.
 * Step 1: User types a name, sees it split into individual letters.
 * Step 2: User assigns a new word to each letter.
 *
 * Uses Tamkinly brand colors. No external palette.
 */
export function NameDecoder({ onNameReady, accentColor = '#2A8A94' }: NameDecoderProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';
  const [name, setName] = useState('');
  const [letterWords, setLetterWords] = useState<Record<number, string>>({});

  const letters = name.split('').filter(c => c.trim());

  const handleLetterWordChange = (index: number, word: string) => {
    setLetterWords(prev => ({ ...prev, [index]: word }));
    // Notify parent when all letters have words
    const updated = { ...letterWords, [index]: word };
    if (Object.keys(updated).length === letters.length && letters.length > 0) {
      onNameReady?.(name);
    }
  };

  return (
    <div className="space-y-4" dir={direction}>
      {/* Name Input */}
      <div>
        <label className="block text-sm font-medium text-[#0F1C2E]/70 mb-2">
          {isAr ? 'اكتب الاسم هنا' : 'Type the name here'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); setLetterWords({}); }}
          placeholder={isAr ? 'مثال: ريان' : 'e.g. RAYAN'}
          className="w-full h-12 px-4 rounded-xl border border-slate-200 text-[#0F1C2E] text-lg text-center tracking-[0.3em] font-medium focus:outline-none focus:ring-2 transition-all duration-200"
          style={{ outlineColor: accentColor }}
          dir="ltr"
          maxLength={20}
        />
      </div>

      {/* Letter Display */}
      {letters.length > 0 && (
        <div className="pt-2">
          <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            {isAr ? 'الحروف المنفصلة' : 'Separated Letters'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {letters.map((letter, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Letter circle */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-transform duration-200 hover:scale-110"
                  style={{ backgroundColor: accentColor }}
                >
                  {letter}
                </div>
                {/* Word input for this letter */}
                <input
                  type="text"
                  value={letterWords[idx] || ''}
                  onChange={(e) => handleLetterWordChange(idx, e.target.value)}
                  placeholder={isAr ? 'كلمة...' : 'word...'}
                  className="w-20 h-8 px-2 rounded-lg border border-slate-200 text-xs text-center text-[#0F1C2E] focus:outline-none focus:ring-1 transition-all"
                  style={{ '--tw-ring-color': accentColor } as React.CSSProperties}
                  dir={direction}
                  maxLength={15}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NameDecoder;
