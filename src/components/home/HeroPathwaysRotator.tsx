'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {
  getReducedMotionServerSnapshot,
  getReducedMotionSnapshot,
  subscribeReducedMotion,
} from '@/components/shared/HeroTypewriterText';

const PATHWAYS = [
  'STEM',
  'Social Sciences',
  'Arts & Sports Science',
] as const;

const LONGEST_PATHWAY = 'Arts & Sports Science';

const ROTATOR_INITIAL_DELAY_MS = 1760;
const ROTATOR_TYPE_MS = 52;
const ROTATOR_DELETE_MS = 30;
const ROTATOR_HOLD_MS = 2100;
const ROTATOR_BETWEEN_MS = 260;

type RotatorPhase = 'initial' | 'typing' | 'pausing' | 'deleting' | 'next';

/**
 * Homepage-only rotating Senior School pathways line cycling
 * STEM -> Social Sciences -> Arts & Sports Science.
 * Exposes the full static sentence to screen readers (`aria-live="off"`),
 * locks layout space via a CSS grid sizer, pauses off-screen or in hidden tabs,
 * and shows static copy instantly when `prefers-reduced-motion: reduce` is set.
 */
export default function HeroPathwaysRotator() {
  const isStaticOrReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const lineRef = useRef<HTMLParagraphElement>(null);
  const [paused, setPaused] = useState(false);
  const [pathwayIndex, setPathwayIndex] = useState(0);
  const [pathwayCount, setPathwayCount] = useState(0);
  const [phase, setPhase] = useState<RotatorPhase>('initial');

  useEffect(() => {
    if (isStaticOrReduced || typeof window === 'undefined') return;

    const el = lineRef.current;
    const section = el?.closest('section') ?? el;
    let inView = true;
    let hidden = document.hidden;

    const update = () => {
      setPaused(!inView || hidden);
    };

    const observer =
      section && 'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              inView = entry.isIntersecting;
              update();
            },
            { threshold: 0 }
          )
        : null;

    if (section) observer?.observe(section);

    const onVisibility = () => {
      hidden = document.hidden;
      update();
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [isStaticOrReduced]);

  useEffect(() => {
    if (isStaticOrReduced || paused) return;

    const currentWord = PATHWAYS[pathwayIndex];
    let timer: number;

    if (phase === 'initial') {
      timer = window.setTimeout(() => {
        setPhase('typing');
      }, ROTATOR_INITIAL_DELAY_MS);
    } else if (phase === 'typing') {
      if (pathwayCount < currentWord.length) {
        timer = window.setTimeout(() => {
          setPathwayCount((prev) => prev + 1);
        }, ROTATOR_TYPE_MS);
      } else {
        timer = window.setTimeout(() => {
          setPhase('pausing');
        }, 40);
      }
    } else if (phase === 'pausing') {
      timer = window.setTimeout(() => {
        setPhase('deleting');
      }, ROTATOR_HOLD_MS);
    } else if (phase === 'deleting') {
      if (pathwayCount > 0) {
        timer = window.setTimeout(() => {
          setPathwayCount((prev) => prev - 1);
        }, ROTATOR_DELETE_MS);
      } else {
        timer = window.setTimeout(() => {
          setPhase('next');
        }, ROTATOR_BETWEEN_MS);
      }
    } else {
      timer = window.setTimeout(() => {
        setPathwayIndex((prev) => (prev + 1) % PATHWAYS.length);
        setPhase('typing');
      }, 20);
    }

    return () => window.clearTimeout(timer);
  }, [isStaticOrReduced, paused, pathwayIndex, pathwayCount, phase]);

  const displayedPathway = isStaticOrReduced
    ? PATHWAYS[0]
    : PATHWAYS[pathwayIndex].slice(0, pathwayCount);

  return (
    <p
      ref={lineRef}
      data-hero-step="pathways"
      className="hero-rise font-sans text-sm sm:text-base text-blue-100 leading-relaxed"
    >
      <span className="sr-only" aria-live="off">
        Senior School pathways in STEM, Social Sciences, and Arts &amp; Sports
        Science.
      </span>

      {/* Shown immediately via CSS when prefers-reduced-motion: reduce is active */}
      <span aria-hidden="true" className="hero-pathways-static">
        Senior School pathways in{' '}
        <span className="font-semibold text-white">
          STEM, Social Sciences &amp; Arts &amp; Sports Science
        </span>
      </span>

      {/* Shown when motion is allowed — fixed grid cell prevents layout shift */}
      <span aria-hidden="true" className="hero-pathways-animated">
        <span>Senior School pathways in </span>
        <span className="inline-grid items-baseline align-baseline">
          <span className="col-start-1 row-start-1 invisible select-none font-semibold whitespace-nowrap pr-2">
            {LONGEST_PATHWAY}
          </span>
          <span className="col-start-1 row-start-1 font-semibold text-white whitespace-nowrap">
            {displayedPathway}
            {!isStaticOrReduced && (
              <span
                className={`hero-caret ${
                  !paused && (phase === 'pausing' || phase === 'initial')
                    ? 'hero-caret-blink'
                    : ''
                }`}
              />
            )}
          </span>
        </span>
      </span>
    </p>
  );
}
