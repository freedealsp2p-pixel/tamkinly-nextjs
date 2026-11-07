'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from '@/components/providers/LocaleProvider';

interface SessionAudioProps {
  /** Protocol slug — resolves /audio/protocol-sessions/{slug}.{locale}.mp3 */
  slug: string;
  /** Protocol accent color */
  accentColor?: string;
  /** External pause state — stops playback when the session pauses */
  paused?: boolean;
}

type SessionAudioStatus = 'idle' | 'playing' | 'unavailable';

/**
 * SessionAudio — optional recorded voice guidance for a full protocol session.
 *
 * Plays the recorded session audio matching the browsing language, with a
 * one-tap fallback to the legacy unsuffixed file. Requirements honored here:
 *  - strictly optional — never autoplays; <audio preload="none"> downloads
 *    zero bytes until the listener taps Play;
 *  - one obvious control (single Play / Stop toggle) with shared i18n copy;
 *  - graceful failure — a missing file shows the calm "unavailable" note and
 *    the written experience stays untouched;
 *  - pauses with the session pause state, stops on unmount;
 *  - no analytics, no server calls — the privacy contract of the experience.
 */
export function SessionAudio({ slug, accentColor = '#1F6F78', paused }: SessionAudioProps) {
  const { locale, direction } = useLocale();
  const ts = useTranslations('recoveryProtocols.shared');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<SessionAudioStatus>('idle');

  const lang = locale === 'ar' ? 'ar' : 'en';
  const primarySrc = `/audio/protocol-sessions/${slug}.${lang}.mp3`;
  const fallbackSrc = `/audio/protocol-sessions/${slug}.mp3`;

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      try {
        audio.currentTime = 0;
      } catch {
        // ignore — element may not be ready
      }
    }
    setStatus('idle');
  }, []);

  // Stop when the session pauses.
  useEffect(() => {
    if (paused && status === 'playing') stop();
  }, [paused, status, stop]);

  // Hard stop on unmount.
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) audio.pause();
    };
  }, []);

  // Missing localized file → try the legacy base file once, then give up calmly.
  const handleError = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.src.endsWith(`.${lang}.mp3`) && fallbackSrc !== primarySrc) {
      audio.src = fallbackSrc;
      audio
        .play()
        .then(() => setStatus('playing'))
        .catch(() => setStatus('unavailable'));
      return;
    }
    setStatus('unavailable');
  }, [lang, fallbackSrc, primarySrc]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (status === 'playing') {
      stop();
    } else {
      audio
        .play()
        .then(() => setStatus('playing'))
        .catch(handleError);
    }
  }, [status, stop, handleError]);

  if (status === 'unavailable') {
    return (
      <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm" dir={direction}>
        <span className="text-xs text-[#0F1C2E]/50 leading-relaxed">
          {ts('session.audio.unavailable')}
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-slate-100 p-4 shadow-sm" dir={direction}>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={status === 'playing' ? ts('session.audio.stop') : ts('session.audio.play')}
          className="w-11 h-11 flex-shrink-0 rounded-full text-white flex items-center justify-center transition-all duration-200 active:scale-95"
          style={{ backgroundColor: accentColor }}
        >
          {status === 'playing' ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 ms-0.5" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5z" />
            </svg>
          )}
        </button>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#0F1C2E]">{ts('session.audio.label')}</p>
          <p className="text-xs text-[#0F1C2E]/50">{ts('session.audio.optional')}</p>
        </div>
      </div>
      <audio ref={audioRef} src={primarySrc} preload="none" onError={handleError} hidden />
    </div>
  );
}

export default SessionAudio;
