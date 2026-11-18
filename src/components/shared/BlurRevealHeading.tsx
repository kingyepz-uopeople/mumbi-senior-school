'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { staggeredHoldMs, useReducedMotion } from '@/components/shared/motion-utils';

interface BlurRevealHeadingProps {
  id?: string;
  as?: 'h2' | 'h3';
  className?: string;
  /** Unique seed when children include JSX elements */
  seed?: string;
  /** Readable hold duration between calm loop replays while in view (ms) */
  holdMs?: number;
  children: ReactNode;
}

type RevealStage = 'idle' | 'pending' | 'enter' | 'replay-a' | 'replay-b';

/**
 * Reusable blur-to-focus section heading.
 * - Softly resolves from subtle optical blur + low opacity to crisp focus when
 *   scrolled into view (zero layout shift; `filter`/`opacity`/`transform` only).
 * - Holds finished sharp text for ~8.6–11.8s (uniquely staggered per heading),
 *   then gently replays only while in view and while the browser tab is visible.
 * - Renders static, sharp text immediately under `prefers-reduced-motion: reduce`,
 *   in print, and before hydration.
 */
export default function BlurRevealHeading({
  id,
  as: Tag = 'h2',
  className = '',
  seed,
  holdMs,
  children,
}: BlurRevealHeadingProps) {
  const isStaticOrReduced = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const [stage, setStage] = useState<RevealStage>('idle');
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const keySeed =
    seed ?? id ?? (typeof children === 'string' ? children : 'section-heading');
  const effectiveHoldMs =
    holdMs ?? staggeredHoldMs(`blur-heading:${keySeed}`, 8600, 11800);

  // Observe viewport entry/exit & tab visibility
  useEffect(() => {
    if (isStaticOrReduced || typeof window === 'undefined') return;

    const el = headingRef.current;
    if (!el) return;

    let enteredOnce = false;
    let initFrame: number | null = null;

    // Arm below-the-fold headings as `pending` so they blur-in on scroll;
    // headings already visible enter smoothly right away.
    initFrame = window.requestAnimationFrame(() => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const visibleNow =
        rect.bottom > 0 && rect.top < window.innerHeight * 0.94;
      if (visibleNow) {
        enteredOnce = true;
        setInView(true);
        setStage('enter');
      } else if (rect.top >= window.innerHeight * 0.94) {
        setStage('pending');
      } else {
        enteredOnce = true;
        setStage('enter');
      }
      if (document.hidden) {
        setTabHidden(true);
      }
    });

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              setInView(entry.isIntersecting);
              if (entry.isIntersecting && !enteredOnce) {
                enteredOnce = true;
                setStage('enter');
              }
            },
            {
              root: null,
              rootMargin: '0px 0px -28px 0px',
              threshold: 0.12,
            }
          )
        : null;

    observer?.observe(el);

    const onVisibilityChange = () => {
      setTabHidden(document.hidden);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (initFrame !== null) window.cancelAnimationFrame(initFrame);
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [isStaticOrReduced]);

  const active =
    !isStaticOrReduced &&
    inView &&
    !tabHidden &&
    (stage === 'enter' || stage === 'replay-a' || stage === 'replay-b');

  // Calm loop: hold crisp focused heading for 8.6–11.8s, then gently refocus
  useEffect(() => {
    if (!active) return;

    const animMs = stage === 'enter' ? 620 : 780;
    const timer = window.setTimeout(() => {
      setStage((prev) => (prev === 'replay-a' ? 'replay-b' : 'replay-a'));
    }, animMs + effectiveHoldMs);

    return () => window.clearTimeout(timer);
  }, [active, effectiveHoldMs, stage]);

  const motionClass = isStaticOrReduced
    ? ''
    : stage === 'pending'
      ? 'blur-heading-pending'
      : stage === 'enter'
        ? 'blur-heading-enter'
        : stage === 'replay-a'
          ? 'blur-heading-replay-a'
          : stage === 'replay-b'
            ? 'blur-heading-replay-b'
            : '';

  const style: CSSProperties | undefined =
    !isStaticOrReduced &&
    (stage === 'enter' || stage === 'replay-a' || stage === 'replay-b')
      ? { animationPlayState: inView && !tabHidden ? 'running' : 'paused' }
      : undefined;

  return (
    <Tag
      ref={headingRef}
      id={id}
      className={`${className}${motionClass ? ` ${motionClass}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
