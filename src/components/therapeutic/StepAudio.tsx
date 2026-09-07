'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Volume2, Square } from 'lucide-react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface StepAudioProps {
  /**
   * Narration segments, in order. MUST come from the protocol source
   * (intro -> instructions -> hypnotic cue). No text is invented here.
   */
  segments: string[];
  /** Protocol accent color */
  accentColor?: string;
  /** External pause state — pauses/stops audio when the session pauses */
  paused?: boolean;
}

type AudioStatus = 'idle' | 'loading' | 'playing' | 'failed';

/**
 * StepAudio — optional audio guidance for a protocol step.
 *
 * Uses the browser's built-in speech synthesis (Web Speech API) to read the
 * step's source-derived narration. Requirements honored here:
 *  - clearly optional (labelled "Optional");
 *  - one obvious control (single Play / Stop toggle);
 *  - loading state while voices load;
 *  - graceful failure — if speech synthesis is unavailable or fails, the
 *    control disappears or shows a calm note and the text experience is
 *    never blocked.
 *
 * No audio is downloaded, no backend is involved, nothing is transmitted.
 */
export function StepAudio({ segments, accentColor = '#1F6F78', paused }: StepAudioProps) {
  const { locale, direction } = useLocale();
  const ts = useTranslations('therapeuticProtocols.shared');

  const [supported, setSupported] = useState<boolean | null>(null);
  const [status, setStatus] = useState<AudioStatus>('idle');
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const failedRef = useRef(false);

  // Detect support once on mount.
  useEffect(() => {
    const ok = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setSupported(ok);
    if (!ok) return;

    // Voices may load asynchronously.
    const loadVoices = () => {
      try {
        voicesRef.current = window.speechSynthesis.getVoices();
      } catch {
        // leave empty; will fall back to default voice on play
      }
    };
    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  // Hard stop helper — cancels anything queued.
  const hardStop = useCallback(() => {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }, []);

  // Stop when unmounting, when step content changes, or when session pauses.
  useEffect(() => {
    return () => {
      hardStop();
    };
  }, [segments, hardStop]);

  useEffect(() => {
    if (paused && status === 'playing') {
      hardStop();
      setStatus('idle');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  const pickVoice = (): SpeechSynthesisVoice | null => {
    const voices = voicesRef.current;
    if (!voices.length) return null;
    const exact = voices.find((v) => v.lang.toLowerCase().startsWith(locale));
    return exact || null; // null -> browser default voice for utterance lang
  };

  const handlePlay = useCallback(() => {
    if (supported === false || failedRef.current) return;
    let utterances: SpeechSynthesisUtterance[] = [];
    try {
      hardStop();
      setStatus('loading');

      const voice = pickVoice();
      utterances = segments
        .map((s) => (s || '').trim())
        .filter(Boolean)
        .map((text) => {
          const u = new SpeechSynthesisUtterance(text);
          u.lang = locale === 'ar' ? 'ar-SA' : 'en-US';
          u.rate = 0.9; // calm pace
          u.pitch = 1;
          if (voice) u.voice = voice;
          return u;
        });

      if (!utterances.length) {
        setStatus('idle');
        return;
      }

      const last = utterances[utterances.length - 1];
      last.onend = () => setStatus('idle');
      last.onerror = () => {
        // Graceful failure: calm note, text experience unaffected.
        failedRef.current = true;
        setStatus('failed');
      };

      utterances.forEach((u) => window.speechSynthesis.speak(u));
      setStatus('playing');
    } catch {
      failedRef.current = true;
      setStatus('failed');
    }
  }, [segments, locale, supported, hardStop]);

  const handleStop = useCallback(() => {
    hardStop();
    setStatus('idle');
  }, [hardStop]);

  // Unsupported -> render nothing at all (silent, never blocks text).
  if (supported === false) return null;

  const isPlaying = status === 'playing';

  return (
    <div
      className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
      dir={direction}
    >
      <button
        type="button"
        onClick={isPlaying ? handleStop : handlePlay}
        disabled={status === 'loading' || status === 'failed'}
        aria-label={isPlaying ? ts('session.audio.stop') : ts('session.audio.play')}
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-[0.97] hover:shadow-md disabled:opacity-50"
        style={{ backgroundColor: accentColor }}
      >
        {status === 'loading' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Square className="w-4 h-4" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>

      <div className="min-w-0">
        <p className="text-sm font-medium text-[#0F1C2E] flex items-center gap-2">
          {ts('session.audio.label')}
          <span className="text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded-full bg-slate-100 text-[#0F1C2E]/45">
            {ts('session.audio.optional')}
          </span>
        </p>
        <p className="text-xs text-[#0F1C2E]/45 leading-relaxed">
          {status === 'failed'
            ? ts('session.audio.unavailable')
            : isPlaying
              ? ts('session.audio.playing')
              : ts('session.audio.play')}
        </p>
      </div>
    </div>
  );
}

export default StepAudio;
