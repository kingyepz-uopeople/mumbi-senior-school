'use client';

import { useEffect, useRef, useState } from 'react';

export interface ReportingStep {
  title: string;
  detail: string;
}

interface ReportingDayTimelineProps {
  steps: ReportingStep[];
}

/**
 * Vertical reporting-day timeline. A crest-blue line is revealed with
 * `scaleY()` as the reader scrolls, and each step's circular marker fills in
 * as the line passes it. Only transform/opacity change; under
 * `prefers-reduced-motion: reduce` the timeline renders fully drawn.
 */
export default function ReportingDayTimeline({
  steps,
}: ReportingDayTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const frameRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const measure = () => {
      frameRef.current = null;

      if (motion.matches) {
        setReducedMotion(true);
        setProgress(1);
        return;
      }

      setReducedMotion(false);

      const rect = list.getBoundingClientRect();
      if (rect.height === 0) return;

      // The line is fully drawn once the bottom of the list reaches 72% of
      // the viewport; it starts drawing when the top passes that same line.
      const trigger = window.innerHeight * 0.72;
      const travelled = trigger - rect.top;
      const next = Math.min(1, Math.max(0, travelled / rect.height));
      setProgress(next);
    };

    const schedule = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener('change', schedule);

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener('change', schedule);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, []);

  return (
    <ol
      ref={listRef}
      className="reporting-timeline"
      data-drawn={progress > 0 ? 'true' : 'false'}
      style={{ '--timeline-progress': progress } as React.CSSProperties}
    >
      {steps.map((step, index) => {
        // Each step fills in as the drawn line reaches its marker.
        const threshold = (index + 0.35) / steps.length;
        const ticked = reducedMotion || progress >= threshold;

        return (
          <li
            key={step.title}
            className="reporting-step"
            data-ticked={ticked ? 'true' : 'false'}
          >
            <span className="reporting-marker" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="reporting-step-body">
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
