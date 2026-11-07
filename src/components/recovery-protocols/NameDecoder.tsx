'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

interface NameDecoderProps {
  /**
   * The entered name — lifted state owned by the protocol client.
   * Stays in memory only: never sent to any backend, never persisted,
   * never reported to analytics. Input always starts blank; a person's
   * name is never pre-filled.
   */
  name: string;
  onNameChange: (name: string) => void;
  /** New word per letter index — also lifted (survives step navigation) */
  words: Record<number, string>;
  onWordChange: (index: number, word: string) => void;
  /**
   * 'decode' — step 1: type the name, see it split into bare letters.
   * 'build'  — step 2: assign a new word to every letter.
   */
  mode: 'decode' | 'build';
  accentColor?: string;
}

/**
 * NameDecoder — the central interaction of the Alternative Code protocol.
 *
 * Preserves the source's letter-based interaction:
 *   INPUT -> DECODE (separated letters) -> CREATE ALTERNATIVE ASSOCIATIONS.
 *
 * Privacy: processing is entirely client-side. The entered name exists only
 * in component state for the duration of the session — it is never
 * transmitted to the backend, analytics, or storage.
 */
export function NameDecoder({
  name,
  onNameChange,
  words,
  onWordChange,
  mode,
  accentColor = '#2A8A94',
}: NameDecoderProps) {
  const { direction, locale } = useLocale();
  const isAr = locale === 'ar';

  // Separate letters; spaces/punctuation are ignored.
  const letters = name.split('').filter((c) => c.trim());
  const allWordsFilled =
    letters.length > 0 && letters.every((_, idx) => (words[idx] || '').trim());

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-[#F8FBFB] p-5" dir={direction}>
      {/* Name input — blank, neutral placeholder, never pre-filled */}
      {(mode === 'decode' || letters.length === 0) && (
        <div>
          <label
            htmlFor="name-decoder-input"
            className="block text-sm font-medium text-[#0F1C2E]/70 mb-2"
          >
            {isAr ? 'اكتب الاسم هنا' : 'Type the name here'}
          </label>
          <input
            id="name-decoder-input"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder={isAr ? 'اكتب الاسم' : 'Type the name'}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-[#0F1C2E] text-lg text-center tracking-[0.3em] font-medium focus:outline-none focus:ring-2 transition-all duration-200"
            style={{ outlineColor: accentColor, ['--tw-ring-color' as string]: accentColor }}
            // Follows the direction of the typed content: Arabic names render
            // naturally RTL, Latin names LTR. When empty, it inherits the page
            // direction (so the localized placeholder reads correctly).
            dir="auto"
            maxLength={20}
          />
          <p className="mt-2 text-xs text-[#0F1C2E]/40 leading-relaxed">
            {isAr
              ? 'يبقى الاسم على جهازك فقط — لا يُرسل إلى أي مكان.'
              : 'The name stays on your device only — it is never sent anywhere.'}
          </p>
        </div>
      )}

      {/* Separated letters */}
      {letters.length > 0 && (
        <div>
          <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: accentColor }}>
            {isAr ? 'الحروف المنفصلة' : 'Separated Letters'}
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {letters.map((letter, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Bare letter — an abstract shape */}
                <div
                  className={
                    'w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold text-white transition-transform duration-200' +
                    (mode === 'decode' ? ' hover:scale-110' : '')
                  }
                  style={{ backgroundColor: accentColor }}
                  aria-label={isAr ? 'حرف' : 'letter'}
                >
                  {letter}
                </div>

                {/* New word for this letter (build mode) */}
                {mode === 'build' && (
                  <input
                    type="text"
                    value={words[idx] || ''}
                    onChange={(e) => onWordChange(idx, e.target.value)}
                    placeholder={isAr ? 'كلمة...' : 'word...'}
                    aria-label={isAr ? `كلمة للحرف ${idx + 1}` : `Word for letter ${idx + 1}`}
                    className="w-20 h-9 px-2 rounded-lg border border-slate-200 bg-white text-xs text-center text-[#0F1C2E] focus:outline-none focus:ring-1 transition-all"
                    style={{ ['--tw-ring-color' as string]: accentColor }}
                    dir={direction}
                    maxLength={15}
                  />
                )}
              </div>
            ))}
          </div>

          {mode === 'build' && (
            <p className="mt-4 text-center text-xs text-[#0F1C2E]/40">
              {allWordsFilled
                ? isAr
                  ? 'اكتملت شفرتك الجديدة.'
                  : 'Your new code is complete.'
                : isAr
                  ? 'اختر كلمة تبدأ بنفس الحرف لكل حرف.'
                  : 'Choose one word starting with the same letter for each letter.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default NameDecoder;
