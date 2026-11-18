'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  staggeredHoldMs,
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

interface HeroMaskedTitleProps {
  id?: string;
  text: string;
  className?: string;
  /** Delay before the first word slides up on initial entrance (ms) */
  baseDelayMs?: number;
  /** Stagger interval between consecutive words (ms) */
  staggerMs?: number;
  /** Readable hold duration between calm loop replays (ms; default 8.6–11.8s) */
  holdMs?: number;
}

/**
 * Word-by-word clipped baseline mask-reveal heading shared by the homepage
 * hero and inner page heroes.
 * - Slides each word up cleanly from behind its baseline clip with zero CLS.
 * - Holds the finished title steady for ~9–12s, then gently replays while the
 *   banner is in view and the browser tab is visible (pausing when off-screen).
 * - Renders static final text immediately under `prefers-reduced-motion: reduce`.
 */
export default function HeroMaskedTitle({
  id,
  text,
  className,
  baseDelayMs = 95,
  staggerMs = 70,
  holdMs,
}: HeroMaskedTitleProps) {
  const isStaticOrReduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { active } = useViewportActivity(headingRef, {
    observeHost: true,
    threshold: 0.05,
    disabled: isStaticOrReduced,
  });

  const [cycle, setCycle] = useState(0);
  const words = text.trim().split(/\s+/);

  // Offset seed from subtitles so title & subtitle never replay simultaneously
  const effectiveHoldMs =
    holdMs ?? staggeredHoldMs(`hero-mask:${id ?? ''}:${text}`, 8800, 11800);

  const revealSpanMs =
    (cycle === 0 ? baseDelayMs : 40) +
    Math.max(0, words.length - 1) * staggerMs +
    560;

  useEffect(() => {
    if (isStaticOrReduced || !active) return;

    const timer = window.setTimeout(() => {
      setCycle((prev) => prev + 1);
    }, revealSpanMs + effectiveHoldMs);

    return () => window.clearTimeout(timer);
  }, [active, cycle, effectiveHoldMs, isStaticOrReduced, revealSpanMs]);

  if (isStaticOrReduced) {
    return (
      <h1 ref={headingRef} id={id} className={className}>
        {text}
      </h1>
    );
  }

  const effectiveBase = cycle === 0 ? baseDelayMs : 40;

  return (
    <h1 ref={headingRef} id={id} className={className}>
      <span className="sr-only" aria-live="off">
        {text}
      </span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="hero-word-mask">
              <span
                className={
                  cycle % 2 === 0 ? 'hero-word' : 'hero-word hero-word-alt'
                }
                style={
                  {
                    '--word-delay': `${effectiveBase + index * staggerMs}ms`,
                    animationPlayState: active ? 'running' : 'paused',
                  } as CSSProperties
                }
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </h1>
  );
}
