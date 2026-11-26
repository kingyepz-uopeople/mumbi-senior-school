'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  staggeredHoldMs,
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

interface ParsedStat {
  prefix: string;
  target: number;
  suffix: string;
  grouped: boolean;
  decimals: number;
}

function parseStatValue(raw: string): ParsedStat | null {
  const match = raw.match(/^([^0-9]*?)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/);
  if (!match) return null;

  const [, prefix, numPart, suffix] = match;
  const grouped = numPart.includes(',');
  const decimalIdx = numPart.indexOf('.');
  const decimals = decimalIdx >= 0 ? numPart.length - decimalIdx - 1 : 0;
  const target = Number(numPart.replace(/,/g, ''));

  if (!Number.isFinite(target)) return null;
  return { prefix, target, suffix, grouped, decimals };
}

function formatStatNumber(parsed: ParsedStat, current: number): string {
  const clamped = Math.max(0, Math.min(parsed.target, current));
  const rounded =
    parsed.decimals > 0
      ? clamped.toFixed(parsed.decimals)
      : String(Math.round(clamped));

  if (!parsed.grouped) {
    return `${parsed.prefix}${rounded}${parsed.suffix}`;
  }

  const [intPart, decPart] = rounded.split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const joined = decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
  return `${parsed.prefix}${joined}${parsed.suffix}`;
}

interface CountUpStatProps {
  /** Exact real figure string (e.g. `"1968"`, `"1,200+"`, `"78%"`, `"3"`) */
  value: string;
  /** Index in the stats strip for gentle initial & loop staggering */
  index?: number;
  /** Utility classes for the `<dd>` element */
  className?: string;
}

/**
 * Viewport-triggered count-up figure for the school statistics band.
 * - Counts smoothly from `0` to the exact final value when scrolled into view,
 *   preserving prefixes, comma separators (`1,200+`), `+`, `%`, and plain years
 *   (`1968`) unchanged.
 * - Locks exact final width with an invisible CSS `inline-grid` sizer +
 *   `tabular-nums` so zero layout shift occurs during initial count or replays.
 * - Holds the finished real figure for ~8.6–11.8s (staggered per column), then
 *   gently replays only while in view and while the browser tab is visible.
 * - Renders the static final figure immediately under `prefers-reduced-motion`.
 */
export default function CountUpStat({
  value,
  index = 0,
  className = '',
}: CountUpStatProps) {
  const isStaticOrReduced = useReducedMotion();
  const ddRef = useRef<HTMLElement>(null);
  const { active } = useViewportActivity(ddRef, {
    threshold: 0.2,
    disabled: isStaticOrReduced,
  });

  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [rendered, setRendered] = useState<string>(value);
  const [cycle, setCycle] = useState(0);

  // Spread the four stats cleanly across 8.6s–11.8s so they never sync
  const holdMs = useMemo(() => {
    const slots = [8700, 9800, 10850, 11750];
    if (index >= 0 && index < slots.length) return slots[index];
    return staggeredHoldMs(`stat:${index}:${value}`, 8600, 11800);
  }, [index, value]);

  useEffect(() => {
    if (isStaticOrReduced || !active || !parsed) return;

    const countDurationMs = parsed.target <= 10 ? 720 : 1120;
    const startDelayMs = cycle === 0 ? index * 95 : 0;

    let startTimer: number | null = null;
    let holdTimer: number | null = null;
    let rafId: number | null = null;
    let startTime = 0;
    let cancelled = false;

    const step = (now: number) => {
      if (cancelled) return;
      if (startTime === 0) startTime = now;

      const t = Math.min(1, (now - startTime) / countDurationMs);
      // Smooth ease-out cubic so numbers decelerate naturally onto final value
      const eased = 1 - (1 - t) ** 3;

      if (t >= 1) {
        setRendered(value);
        holdTimer = window.setTimeout(() => {
          if (!cancelled) {
            setCycle((prev) => prev + 1);
          }
        }, holdMs);
        return;
      }

      setRendered(formatStatNumber(parsed, parsed.target * eased));
      rafId = window.requestAnimationFrame(step);
    };

    startTimer = window.setTimeout(() => {
      if (cancelled) return;
      setRendered(formatStatNumber(parsed, 0));
      rafId = window.requestAnimationFrame(step);
    }, startDelayMs);

    return () => {
      cancelled = true;
      if (startTimer !== null) window.clearTimeout(startTimer);
      if (holdTimer !== null) window.clearTimeout(holdTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [active, cycle, holdMs, index, isStaticOrReduced, parsed, value]);

  const shown = isStaticOrReduced || !active ? value : rendered;

  return (
    <dd ref={ddRef} className={className}>
      <span className="sr-only" aria-live="off">
        {value}
      </span>
      <span aria-hidden="true" className="inline-grid items-baseline">
        <span className="col-start-1 row-start-1 invisible select-none">
          {value}
        </span>
        <span className="col-start-1 row-start-1">{shown}</span>
      </span>
    </dd>
  );
}
