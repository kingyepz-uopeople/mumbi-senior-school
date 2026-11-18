'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const PATHWAYS = [
  'STEM',
  'Social Sciences',
  'Arts & Sports Science',
] as const;

const LONGEST_PATHWAY = 'Arts & Sports Science';

/** Choreographed entrance timings (paired with word-mask + red rule in globals.css) */
const MOTTO_START_MS = 780;
const MOTTO_CHAR_MS = 44;
const MOTTO_SPACE_MS = 62;
const MOTTO_CARET_HOLD_MS = 2200;
const MOTTO_CARET_FADE_MS = 500;

const ROTATOR_INITIAL_DELAY_MS = 1760;
const ROTATOR_TYPE_MS = 52;
const ROTATOR_DELETE_MS = 30;
const ROTATOR_HOLD_MS = 2100;
const ROTATOR_BETWEEN_MS = 260;

function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns `true` during SSR so pre-rendered HTML contains the full readable
 * motto and `"STEM"` if JavaScript is disabled, with zero hydration mismatch.
 */
function getReducedMotionServerSnapshot() {
  return true;
}

type MottoPhase = 'waiting' | 'typing' | 'blinking' | 'fading' | 'settled';
type RotatorPhase = 'initial' | 'typing' | 'pausing' | 'deleting' | 'next';

interface HeroTypewriterLinesProps {
  motto: string;
}

export default function HeroTypewriterLines({
  motto,
}: HeroTypewriterLinesProps) {
  const isStaticOrReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // One-shot motto typewriter state
  const [mottoCount, setMottoCount] = useState(0);
  const [mottoPhase, setMottoPhase] = useState<MottoPhase>('waiting');

  // Looping pathway rotator state
  const [pathwayIndex, setPathwayIndex] = useState(0);
  const [pathwayCount, setPathwayCount] = useState(0);
  const [rotatorPhase, setRotatorPhase] = useState<RotatorPhase>('initial');

  // Pause the looping pathway typewriter when off-screen or when the tab is hidden
  useEffect(() => {
    if (isStaticOrReduced || typeof window === 'undefined') return;

    const el = containerRef.current;
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

  // One-shot motto typewriter: plays once on load, blinks caret ~2.2s, fades caret out
  useEffect(() => {
    if (isStaticOrReduced || mottoPhase === 'settled') return;

    let timer: number;

    if (mottoPhase === 'waiting') {
      timer = window.setTimeout(() => {
        setMottoPhase('typing');
      }, MOTTO_START_MS);
    } else if (mottoPhase === 'typing') {
      if (mottoCount < motto.length) {
        const nextChar = motto[mottoCount];
        const delay = nextChar === ' ' ? MOTTO_SPACE_MS : MOTTO_CHAR_MS;
        timer = window.setTimeout(() => {
          setMottoCount((prev) => prev + 1);
        }, delay);
      } else {
        timer = window.setTimeout(() => {
          setMottoPhase('blinking');
        }, 40);
      }
    } else if (mottoPhase === 'blinking') {
      timer = window.setTimeout(() => {
        setMottoPhase('fading');
      }, MOTTO_CARET_HOLD_MS);
    } else {
      timer = window.setTimeout(() => {
        setMottoPhase('settled');
      }, MOTTO_CARET_FADE_MS);
    }

    return () => window.clearTimeout(timer);
  }, [isStaticOrReduced, motto, mottoCount, mottoPhase]);

  // Looping pathway typewriter: STEM -> Social Sciences -> Arts & Sports Science
  useEffect(() => {
    if (isStaticOrReduced || paused) return;

    const currentWord = PATHWAYS[pathwayIndex];
    let timer: number;

    if (rotatorPhase === 'initial') {
      timer = window.setTimeout(() => {
        setRotatorPhase('typing');
      }, ROTATOR_INITIAL_DELAY_MS);
    } else if (rotatorPhase === 'typing') {
      if (pathwayCount < currentWord.length) {
        timer = window.setTimeout(() => {
          setPathwayCount((prev) => prev + 1);
        }, ROTATOR_TYPE_MS);
      } else {
        timer = window.setTimeout(() => {
          setRotatorPhase('pausing');
        }, 40);
      }
    } else if (rotatorPhase === 'pausing') {
      timer = window.setTimeout(() => {
        setRotatorPhase('deleting');
      }, ROTATOR_HOLD_MS);
    } else if (rotatorPhase === 'deleting') {
      if (pathwayCount > 0) {
        timer = window.setTimeout(() => {
          setPathwayCount((prev) => prev - 1);
        }, ROTATOR_DELETE_MS);
      } else {
        timer = window.setTimeout(() => {
          setRotatorPhase('next');
        }, ROTATOR_BETWEEN_MS);
      }
    } else {
      timer = window.setTimeout(() => {
        setPathwayIndex((prev) => (prev + 1) % PATHWAYS.length);
        setRotatorPhase('typing');
      }, 20);
    }

    return () => window.clearTimeout(timer);
  }, [isStaticOrReduced, paused, pathwayIndex, pathwayCount, rotatorPhase]);

  const displayedMotto = isStaticOrReduced
    ? motto
    : mottoPhase === 'settled'
      ? motto
      : motto.slice(0, mottoCount);

  const displayedPathway = isStaticOrReduced
    ? PATHWAYS[0]
    : PATHWAYS[pathwayIndex].slice(0, pathwayCount);

  return (
    <div ref={containerRef} className="space-y-2">
      {/* Motto inside existing curly quotes — inline-grid reserves exact width & height (0 CLS) */}
      <p className="hero-motto-hold font-serif italic text-xl sm:text-2xl text-white/95 leading-snug">
        <span className="sr-only" aria-live="off">
          &ldquo;{motto}&rdquo;
        </span>

        <span aria-hidden="true" className="inline-grid items-baseline">
          <span className="col-start-1 row-start-1 invisible select-none">
            &ldquo;{motto}
            <span className="inline-block w-[0.14em]" />
            &rdquo;
          </span>
          <span className="col-start-1 row-start-1">
            &ldquo;
            <span>{displayedMotto}</span>
            <span
              className={`hero-caret ${
                isStaticOrReduced || mottoPhase === 'settled'
                  ? 'hero-caret-gone'
                  : mottoPhase === 'blinking'
                    ? 'hero-caret-blink'
                    : mottoPhase === 'fading'
                      ? 'hero-caret-fade'
                      : ''
              }`}
            />
            &rdquo;
          </span>
        </span>
      </p>

      {/* Rotating pathways line — full static sentence for screen readers, rotating part aria-hidden */}
      <p
        data-hero-step="pathways"
        className="hero-rise font-sans text-sm sm:text-base text-blue-100 leading-relaxed"
      >
        <span className="sr-only" aria-live="off">
          Senior School pathways in STEM, Social Sciences, and Arts &amp; Sports
          Science.
        </span>

        {/* Shown immediately via CSS when prefers-reduced-motion: reduce is enabled */}
        <span aria-hidden="true" className="hero-pathways-static">
          Senior School pathways in{' '}
          <span className="font-semibold text-white">
            STEM, Social Sciences &amp; Arts &amp; Sports Science
          </span>
        </span>

        {/* Shown when motion is allowed — fixed grid sizer keeps width & height locked (0 CLS) */}
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
                    !paused &&
                    (rotatorPhase === 'pausing' || rotatorPhase === 'initial')
                      ? 'hero-caret-blink'
                      : ''
                  }`}
                />
              )}
            </span>
          </span>
        </span>
      </p>
    </div>
  );
}
