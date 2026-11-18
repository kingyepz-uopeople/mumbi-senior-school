'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  getReducedMotionServerSnapshot,
  getReducedMotionSnapshot,
  staggeredHoldMs,
  subscribeReducedMotion,
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

export {
  getReducedMotionServerSnapshot,
  getReducedMotionSnapshot,
  subscribeReducedMotion,
};

type TypePhase = 'waiting' | 'typing' | 'blinking' | 'fading' | 'holding';

export interface HeroTypewriterTextProps {
  /** Exact text to type out */
  text: string;
  /** Optional static opening mark (e.g. left curly quote on the homepage motto) */
  prefix?: string;
  /** Optional static closing mark (e.g. right curly quote on the homepage motto) */
  suffix?: string;
  /** Paragraph utility classes */
  className?: string;
  /** Use inline-grid for short single-line taglines/mottos; grid for full subtitles */
  inline?: boolean;
  /** Delay before first typing cycle begins so it follows the title & rule (ms) */
  startDelayMs?: number;
  /** Per-character typing interval (ms) */
  charDelayMs?: number;
  /** Interval on whitespace (ms) */
  spaceDelayMs?: number;
  /** Slightly longer natural pause after commas, semicolons, and dashes (ms) */
  punctuationDelayMs?: number;
  /** How long the caret blinks after typing finishes before fading out (ms) */
  caretHoldMs?: number;
  /** Duration of the caret opacity fade (ms) */
  caretFadeMs?: number;
  /** Readable hold on finished text before calm loop replay (ms; 8.5–11.8s) */
  loopHoldMs?: number;
}

/**
 * Accessible, zero-layout-shift looping typewriter shared by the homepage
 * motto and inner-page hero subtitles.
 * - Reserves exact single- or multi-line space via a stacked CSS grid sizer.
 * - Types out smoothly, blinks caret briefly, fades caret out, holds the clean
 *   finished text for ~9–12s (staggered from the title), and gently replays
 *   while in view and while the browser tab is visible.
 * - Exposes the full static sentence to assistive tech (`aria-live="off"`).
 * - Pauses cleanly when off-screen or when the browser tab is hidden.
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
  caretHoldMs = 1500,
  caretFadeMs = 480,
  loopHoldMs,
}: HeroTypewriterTextProps) {
  const isStaticOrReduced = useReducedMotion();
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { active } = useViewportActivity(paragraphRef, {
    observeHost: true,
    threshold: 0.05,
    disabled: isStaticOrReduced,
  });

  const [charCount, setCharCount] = useState(0);
  const [phase, setPhase] = useState<TypePhase>('waiting');

  const effectiveLoopHoldMs =
    loopHoldMs ?? staggeredHoldMs(`hero-typewriter:${text}`, 8600, 11800);

  // Calm looping state machine: waiting -> typing -> blinking -> fading -> holding -> typing
  useEffect(() => {
    if (isStaticOrReduced || !active) return;

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
          prevChar === ',' ||
          prevChar === ';' ||
          prevChar === '—' ||
          prevChar === ':'
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
    } else if (phase === 'fading') {
      timer = window.setTimeout(() => {
        setPhase('holding');
      }, caretFadeMs);
    } else {
      // Hold crisp, complete text readable for ~8.6–11.8s, then gently replay
      timer = window.setTimeout(() => {
        setCharCount(0);
        setPhase('typing');
      }, effectiveLoopHoldMs);
    }

    return () => window.clearTimeout(timer);
  }, [
    active,
    caretFadeMs,
    caretHoldMs,
    charCount,
    charDelayMs,
    effectiveLoopHoldMs,
    isStaticOrReduced,
    phase,
    punctuationDelayMs,
    spaceDelayMs,
    startDelayMs,
    text,
  ]);

  const displayedText =
    isStaticOrReduced || phase === 'holding' ? text : text.slice(0, charCount);

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
              isStaticOrReduced || phase === 'holding'
                ? 'hero-caret-gone'
                : phase === 'blinking'
                  ? active
                    ? 'hero-caret-blink'
                    : ''
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
