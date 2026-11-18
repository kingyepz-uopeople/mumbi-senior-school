'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

export function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

export function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns `true` during SSR so pre-rendered HTML carries the full static copy
 * if JavaScript is disabled, with zero hydration mismatch.
 */
export function getReducedMotionServerSnapshot() {
  return true;
}

type TypePhase = 'waiting' | 'typing' | 'blinking' | 'fading' | 'settled';

export interface HeroTypewriterTextProps {
  /** Exact text to type out once on load */
  text: string;
  /** Optional static opening mark (e.g. left curly quote on the homepage motto) */
  prefix?: string;
  /** Optional static closing mark (e.g. right curly quote on the homepage motto) */
  suffix?: string;
  /** Paragraph utility classes */
  className?: string;
  /** Use inline-grid for short single-line taglines/mottos; grid for full subtitles */
  inline?: boolean;
  /** Delay before typing begins so it follows the title mask reveal & red rule (ms) */
  startDelayMs?: number;
  /** Per-character typing interval (ms) */
  charDelayMs?: number;
  /** Interval on whitespace (ms) */
  spaceDelayMs?: number;
  /** Slightly longer natural pause after commas, semicolons, and dashes (ms) */
  punctuationDelayMs?: number;
  /** How long the caret blinks after typing finishes before fading out (ms) */
  caretHoldMs?: number;
  /** Duration of the final caret opacity fade (ms) */
  caretFadeMs?: number;
}

/**
 * Accessible, zero-layout-shift one-shot typewriter shared by the homepage
 * motto and inner-page hero subtitles.
 * - Reserves exact single- or multi-line space via a stacked CSS grid sizer.
 * - Exposes the full static sentence to assistive tech (`aria-live="off"`).
 * - Pauses cleanly if the tab is hidden or the banner leaves the viewport.
 * - Shows final static text immediately under `prefers-reduced-motion: reduce`.
 */
export default function HeroTypewriterText({
  text,
  prefix = '',
  suffix = '',
  className = '',
  inline = false,
  startDelayMs = 700,
  charDelayMs = 16,
  spaceDelayMs = 22,
  punctuationDelayMs = 55,
  caretHoldMs = 1800,
  caretFadeMs = 500,
}: HeroTypewriterTextProps) {
  const isStaticOrReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const [paused, setPaused] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<TypePhase>('waiting');

  // Pause timers when the hero leaves the viewport or when the tab is hidden
  useEffect(() => {
    if (isStaticOrReduced || phase === 'settled' || typeof window === 'undefined') {
      return;
    }

    const el = paragraphRef.current;
    const host = el?.closest('section, header') ?? el;
    let inView = true;
    let hidden = document.hidden;

    const sync = () => {
      setPaused(!inView || hidden);
    };

    const observer =
      host && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              inView = entry.isIntersecting;
              sync();
            },
            { threshold: 0 }
          )
        : null;

    if (host) observer?.observe(host);

    const onVisibility = () => {
      hidden = document.hidden;
      sync();
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isStaticOrReduced, phase]);

  // One-shot typing state machine -> brief caret blink -> smooth caret fade-out
  useEffect(() => {
    if (isStaticOrReduced || paused || phase === 'settled') return;

    let timer: number;

    if (phase === 'waiting') {
      timer = window.setTimeout(() => {
        setPhase('typing');
      }, startDelayMs);
    } else if (phase === 'typing') {
      if (charCount < text.length) {
        const prevChar = charCount > 0 ? text[charCount - 1] : '';
        const nextChar = text[charCount];
        const delay =
          prevChar === ',' || prevChar === ';' || prevChar === '—' || prevChar === ':'
            ? punctuationDelayMs
            : nextChar === ' '
              ? spaceDelayMs
              : charDelayMs;

        timer = window.setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, delay);
      } else {
        timer = window.setTimeout(() => {
          setPhase('blinking');
        }, 40);
      }
    } else if (phase === 'blinking') {
      timer = window.setTimeout(() => {
        setPhase('fading');
      }, caretHoldMs);
    } else {
      timer = window.setTimeout(() => {
        setPhase('settled');
      }, caretFadeMs);
    }

    return () => window.clearTimeout(timer);
  }, [
    caretFadeMs,
    caretHoldMs,
    charCount,
    charDelayMs,
    isStaticOrReduced,
    paused,
    phase,
    punctuationDelayMs,
    spaceDelayMs,
    startDelayMs,
    text,
  ]);

  const displayedText =
    isStaticOrReduced || phase === 'settled' ? text : text.slice(0, charCount);

  const holdDelayMs = Math.max(0, startDelayMs - 40);

  return (
    <p
      ref={paragraphRef}
      className={`hero-typewriter-hold ${className}`}
      style={{ '--typewriter-hold': `${holdDelayMs}ms` } as CSSProperties}
    >
      <span className="sr-only" aria-live="off">
        {prefix}
        {text}
        {suffix}
      </span>

      <span
        aria-hidden="true"
        className={inline ? 'inline-grid items-baseline' : 'grid'}
      >
        {/* Invisible sizer keeps exact final width & line count locked (zero CLS) */}
        <span className="col-start-1 row-start-1 invisible select-none">
          {prefix}
          {text}
          <span className="inline-block w-[0.14em]" />
          {suffix}
        </span>

        <span className="col-start-1 row-start-1">
          {prefix}
          <span>{displayedText}</span>
          <span
            className={`hero-caret ${
              isStaticOrReduced || phase === 'settled'
                ? 'hero-caret-gone'
                : phase === 'blinking'
                  ? paused
                    ? ''
                    : 'hero-caret-blink'
                  : phase === 'fading'
                    ? 'hero-caret-fade'
                    : ''
            }`}
          />
          {suffix}
        </span>
      </span>
    </p>
  );
}
