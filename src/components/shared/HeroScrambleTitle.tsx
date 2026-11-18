'use client';

import { useEffect, useRef, useState } from 'react';
import {
  staggeredHoldMs,
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

const UPPER_GLYPHS = 'ABCDEFGHJKLMNPRSTUVWXYZ';
const LOWER_GLYPHS = 'acemnorsuvwxz';
const DIGIT_GLYPHS = '0123456789';

function scrambleWord(realWord: string, progress: number, tick: number): string {
  const len = realWord.length;
  let out = '';

  for (let i = 0; i < len; i += 1) {
    const ch = realWord[i];
    // Settle characters progressively left-to-right within the sub-1s window
    const lockAt = 0.2 + (i / Math.max(1, len)) * 0.72;
    if (progress >= lockAt) {
      out += ch;
      continue;
    }

    const idx = (i * 7 + tick * 5 + realWord.charCodeAt(i)) >>> 0;
    if (ch >= 'A' && ch <= 'Z') {
      out += UPPER_GLYPHS[idx % UPPER_GLYPHS.length];
    } else if (ch >= 'a' && ch <= 'z') {
      out += LOWER_GLYPHS[idx % LOWER_GLYPHS.length];
    } else if (ch >= '0' && ch <= '9') {
      out += DIGIT_GLYPHS[idx % DIGIT_GLYPHS.length];
    } else {
      // Preserve punctuation and symbols such as `&`
      out += ch;
    }
  }

  return out;
}

interface HeroScrambleTitleProps {
  id?: string;
  as?: 'h1' | 'h2' | 'h3';
  text: string;
  className?: string;
  /** Total decode duration in ms (kept strictly under 1000ms for crisp feel) */
  durationMs?: number;
  /** Initial delay before first decode begins (ms) */
  startDelayMs?: number;
  /** Readable hold duration between calm loop replays (ms; default 9–11.8s) */
  holdMs?: number;
}

/**
 * Subtle editorial scramble/decode `<h1>` used on Academics and STEM pathway
 * pages.
 * - Shuffles case-matched letters briefly and settles cleanly into the real
 *   title in under one second (`780ms` default).
 * - Locks every word inside its own stacked `inline-grid` sizer so proportional
 *   serif glyphs cause zero layout shift and zero line-wrap jitter.
 * - Holds the finished real title for ~9–12s, then gently replays only while
 *   in view and while the browser tab is visible.
 * - Shows the static final title immediately under `prefers-reduced-motion`.
 */
export default function HeroScrambleTitle({
  id,
  as: Tag = 'h1',
  text,
  className,
  durationMs = 780,
  startDelayMs = 80,
  holdMs,
}: HeroScrambleTitleProps) {
  const isStaticOrReduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { active } = useViewportActivity(headingRef, {
    observeHost: true,
    threshold: 0.05,
    disabled: isStaticOrReduced,
  });

  const realWords = text.trim().split(/\s+/);
  const [displayWords, setDisplayWords] = useState<string[] | null>(null);
  const [cycle, setCycle] = useState(0);

  const effectiveHoldMs =
    holdMs ?? staggeredHoldMs(`hero-scramble:${id ?? ''}:${text}`, 9000, 11800);

  useEffect(() => {
    if (isStaticOrReduced || !active) return;

    const totalMs = Math.min(durationMs, 920);
    const initialWait = cycle === 0 ? startDelayMs : 0;
    const stepIntervalMs = 45;

    let rafId: number | null = null;
    let holdTimer: number | null = null;
    let startTimer: number | null = null;
    let startTime = 0;
    let lastTick = -1;
    let cancelled = false;

    const words = text.trim().split(/\s+/);
    const totalChars = Math.max(1, words.reduce((sum, w) => sum + w.length, 0));

    const runFrame = (now: number) => {
      if (cancelled) return;
      if (startTime === 0) startTime = now;

      const elapsed = now - startTime;
      const overall = Math.min(1, elapsed / totalMs);
      const tick = Math.floor(elapsed / stepIntervalMs);

      if (overall >= 1) {
        setDisplayWords(null);
        holdTimer = window.setTimeout(() => {
          if (!cancelled) {
            setCycle((prev) => prev + 1);
          }
        }, effectiveHoldMs);
        return;
      }

      if (tick !== lastTick) {
        lastTick = tick;
        let seenChars = 0;
        const next = words.map((word) => {
          const wordStart = (seenChars / totalChars) * 0.42;
          const wordSpan = 1 - wordStart;
          const localProgress = Math.max(
            0,
            Math.min(1, (overall - wordStart) / wordSpan)
          );
          seenChars += word.length;
          return scrambleWord(word, localProgress, tick);
        });
        setDisplayWords(next);
      }

      rafId = window.requestAnimationFrame(runFrame);
    };

    if (initialWait > 0) {
      startTimer = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(runFrame);
      }, initialWait);
    } else {
      rafId = window.requestAnimationFrame(runFrame);
    }

    return () => {
      cancelled = true;
      if (startTimer !== null) window.clearTimeout(startTimer);
      if (holdTimer !== null) window.clearTimeout(holdTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [active, cycle, durationMs, effectiveHoldMs, isStaticOrReduced, startDelayMs, text]);

  if (isStaticOrReduced) {
    return (
      <Tag ref={headingRef} id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const isScrambling =
    active && displayWords !== null && displayWords.length === realWords.length;

  return (
    <Tag ref={headingRef} id={id} className={className}>
      <span className="sr-only" aria-live="off">
        {text}
      </span>
      <span aria-hidden="true">
        {realWords.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="inline-grid align-baseline">
              {/* Invisible real-word sizer locks exact word width & line breaks */}
              <span className="col-start-1 row-start-1 invisible select-none">
                {word}
              </span>
              <span
                className={`col-start-1 row-start-1 whitespace-nowrap overflow-x-clip ${
                  isScrambling && displayWords[index] !== word
                    ? 'opacity-90'
                    : 'opacity-100'
                }`}
              >
                {isScrambling ? displayWords[index] : word}
              </span>
            </span>
            {index < realWords.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
