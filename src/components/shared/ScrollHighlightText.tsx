'use client';

import { useEffect, useMemo, useRef } from 'react';
import { staggeredHoldMs, useReducedMotion } from '@/components/shared/motion-utils';

export type HighlightSegment =
  | string
  | {
      text: string;
      strong?: boolean;
      em?: boolean;
    };

interface WordToken {
  word: string;
  strong: boolean;
  em: boolean;
}

function tokenizeSegments(segments: HighlightSegment[]): {
  tokens: WordToken[];
  plainText: string;
} {
  const tokens: WordToken[] = [];
  const plainParts: string[] = [];

  for (const seg of segments) {
    const text = typeof seg === 'string' ? seg : seg.text;
    const strong = typeof seg === 'string' ? false : Boolean(seg.strong);
    const em = typeof seg === 'string' ? false : Boolean(seg.em);
    plainParts.push(text);

    const words = text.trim().split(/\s+/).filter(Boolean);
    for (const word of words) {
      tokens.push({ word, strong, em });
    }
  }

  return { tokens, plainText: plainParts.join('') };
}

interface ScrollHighlightTextProps {
  /** Ordered text/emphasis segments preserving exact original copy & styling */
  segments: HighlightSegment[];
  /** Paragraph utility classes */
  className?: string;
  /** Unique seed for staggered ~9–12s replay timing */
  seed?: string;
  /** Readable hold on full-colour text before calm loop replay (ms) */
  holdMs?: number;
}

const MIN_WORD_OPACITY = 0.34;
const REPLAY_DURATION_MS = 1350;

/**
 * Scroll-linked word-by-word highlight paragraph used on the Homepage and
 * About page intro paragraphs.
 * - Smoothly illuminates words from soft faded opacity to full text colour as
 *   the reader scrolls through the paragraph (opacity-only, zero React renders,
 *   zero layout shift).
 * - Once highlighted in view, holds full readable colour for ~9–12s (staggered),
 *   then gently replays a left-to-right word illumination wave while in view,
 *   pausing immediately when off-screen or when the browser tab is hidden.
 * - Renders static full-colour text immediately under `prefers-reduced-motion`
 *   and in print media.
 */
export default function ScrollHighlightText({
  segments,
  className = '',
  seed = 'intro',
  holdMs,
}: ScrollHighlightTextProps) {
  const isStaticOrReduced = useReducedMotion();
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const { tokens, plainText } = useMemo(
    () => tokenizeSegments(segments),
    [segments]
  );

  const effectiveHoldMs =
    holdMs ?? staggeredHoldMs(`scroll-highlight:${seed}`, 9200, 11700);

  useEffect(() => {
    const el = paragraphRef.current;
    const total = tokens.length;
    if (!el || total === 0 || typeof window === 'undefined') return;

    const setAllFull = () => {
      for (let i = 0; i < total; i += 1) {
        const span = wordRefs.current[i];
        if (span) span.style.opacity = '1';
      }
    };

    if (isStaticOrReduced) {
      setAllFull();
      return;
    }

    let inView = false;
    let tabHidden = document.hidden;
    let scrollRaf: number | null = null;
    let replayRaf: number | null = null;
    let replayTimer: number | null = null;
    let isReplaying = false;
    let lastProgress = 0;

    const applyScrollProgress = (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      const band = Math.min(0.22, Math.max(0.08, 3.5 / total));

      for (let i = 0; i < total; i += 1) {
        const span = wordRefs.current[i];
        if (!span) continue;
        const wordStart = (i / total) * (1 - band);
        const local = Math.max(
          0,
          Math.min(1, (clamped - wordStart) / band)
        );
        const opacity = MIN_WORD_OPACITY + local * (1 - MIN_WORD_OPACITY);
        span.style.opacity = opacity >= 0.995 ? '1' : opacity.toFixed(3);
      }
    };

    const computeScrollProgress = (): number => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      // Guarantee 100% full colour if the user reaches the bottom of the page
      const doc = document.documentElement;
      const atPageBottom =
        window.scrollY + vh >= doc.scrollHeight - 12;
      if (atPageBottom) return 1;

      // Sweep smoothly from 0 -> 1 as paragraph travels from 90% vh to 44% vh
      const startY = vh * 0.9;
      const endY = vh * 0.44;
      const span = Math.max(1, startY - endY);
      return Math.max(0, Math.min(1, (startY - rect.top) / span));
    };

    const stopReplay = (restoreFull: boolean) => {
      if (replayTimer !== null) {
        window.clearTimeout(replayTimer);
        replayTimer = null;
      }
      if (replayRaf !== null) {
        window.cancelAnimationFrame(replayRaf);
        replayRaf = null;
      }
      isReplaying = false;
      if (restoreFull) {
        setAllFull();
      }
    };

    const scheduleReplay = () => {
      if (replayTimer !== null) window.clearTimeout(replayTimer);
      if (!inView || tabHidden || lastProgress < 0.96) return;

      replayTimer = window.setTimeout(() => {
        replayTimer = null;
        if (!inView || tabHidden || lastProgress < 0.96) return;

        isReplaying = true;
        let startTime = 0;

        const stepReplay = (now: number) => {
          if (!inView || tabHidden) {
            stopReplay(true);
            return;
          }
          if (startTime === 0) startTime = now;
          const t = Math.min(1, (now - startTime) / REPLAY_DURATION_MS);

          if (t >= 1) {
            isReplaying = false;
            replayRaf = null;
            setAllFull();
            scheduleReplay();
            return;
          }

          // Gentle fade-then-illuminate sweep in reading order (words -> 0.34 -> 1)
          const prepPhase = 0.16;
          if (t < prepPhase) {
            const fadeT = t / prepPhase;
            const op = 1 - fadeT * (1 - MIN_WORD_OPACITY);
            const val = op.toFixed(3);
            for (let i = 0; i < total; i += 1) {
              const span = wordRefs.current[i];
              if (span) span.style.opacity = val;
            }
          } else {
            const sweepProgress = (t - prepPhase) / (1 - prepPhase);
            applyScrollProgress(sweepProgress);
          }

          replayRaf = window.requestAnimationFrame(stepReplay);
        };

        replayRaf = window.requestAnimationFrame(stepReplay);
      }, effectiveHoldMs);
    };

    const updateFromScroll = () => {
      scrollRaf = null;
      if (!inView || tabHidden) return;

      const nextProgress = computeScrollProgress();
      lastProgress = nextProgress;

      if (isReplaying) {
        stopReplay(false);
      }

      applyScrollProgress(nextProgress);

      if (nextProgress >= 0.96) {
        if (replayTimer === null && !isReplaying) {
          scheduleReplay();
        }
      } else if (replayTimer !== null) {
        window.clearTimeout(replayTimer);
        replayTimer = null;
      }
    };

    const onScrollOrResize = () => {
      if (!inView || tabHidden || scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(updateFromScroll);
    };

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              inView = entry.isIntersecting;
              if (inView && !tabHidden) {
                if (scrollRaf === null) {
                  scrollRaf = window.requestAnimationFrame(updateFromScroll);
                }
              } else {
                // Pause loop cleanly when off-screen
                stopReplay(false);
              }
            },
            { root: null, threshold: 0 }
          )
        : null;

    if (observer) {
      observer.observe(el);
    } else {
      setAllFull();
    }

    const onVisibilityChange = () => {
      tabHidden = document.hidden;
      if (tabHidden) {
        stopReplay(true);
      } else if (inView && scrollRaf === null) {
        scrollRaf = window.requestAnimationFrame(updateFromScroll);
      }
    };

    const onBeforePrint = () => {
      stopReplay(true);
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    window.addEventListener('beforeprint', onBeforePrint);
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (scrollRaf !== null) window.cancelAnimationFrame(scrollRaf);
      stopReplay(true);
      observer?.disconnect();
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('beforeprint', onBeforePrint);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [effectiveHoldMs, isStaticOrReduced, tokens]);

  // Preserve clean native rendering under reduced motion & during SSR
  if (isStaticOrReduced) {
    return (
      <p ref={paragraphRef} className={className}>
        {segments.map((seg, idx) => {
          if (typeof seg === 'string') return <span key={idx}>{seg}</span>;
          if (seg.strong && seg.em) {
            return (
              <strong key={idx}>
                <em>{seg.text}</em>
              </strong>
            );
          }
          if (seg.strong) return <strong key={idx}>{seg.text}</strong>;
          if (seg.em) return <em key={idx}>{seg.text}</em>;
          return <span key={idx}>{seg.text}</span>;
        })}
      </p>
    );
  }

  return (
    <p ref={paragraphRef} className={`scroll-highlight-text ${className}`}>
      <span className="sr-only" aria-live="off">
        {plainText}
      </span>
      <span aria-hidden="true">
        {tokens.map((token, index) => {
          const inner =
            token.strong && token.em ? (
              <strong>
                <em>{token.word}</em>
              </strong>
            ) : token.strong ? (
              <strong>{token.word}</strong>
            ) : token.em ? (
              <em>{token.word}</em>
            ) : (
              token.word
            );

          return (
            <span key={`${token.word}-${index}`}>
              <span
                ref={(node) => {
                  wordRefs.current[index] = node;
                }}
                className="scroll-highlight-word"
              >
                {inner}
              </span>
              {index < tokens.length - 1 ? ' ' : null}
            </span>
          );
        })}
      </span>
    </p>
  );
}
