'use client';

import type { ComponentPropsWithoutRef } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

interface SpotlightCardGroupProps extends ComponentPropsWithoutRef<'div'> {
  cardCount: number;
}

/**
 * Progressively enables a three-second, one-card-at-a-time spotlight loop.
 * Scroll reveals and card content remain complete in SSR/static HTML; the loop
 * pauses outside the viewport, in hidden tabs, and under reduced motion.
 */
export default function SpotlightCardGroup({
  cardCount,
  children,
  className,
  ...props
}: SpotlightCardGroupProps) {
  const groupRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { active } = useViewportActivity(groupRef, {
    threshold: 0.02,
    disabled: reducedMotion,
  });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    if (!active || reducedMotion || cardCount < 1) return;

    const initialTimer = window.setTimeout(() => {
      setActiveCard((current) => current ?? 0);
    }, 0);
    const timer = window.setInterval(() => {
      setActiveCard((current) =>
        current === null ? 0 : (current + 1) % cardCount
      );
    }, 3000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(timer);
    };
  }, [active, cardCount, reducedMotion]);

  useEffect(() => {
    const cards = groupRef.current?.querySelectorAll<HTMLElement>(
      '[data-card-cycle]'
    );
    cards?.forEach((card, index) => {
      if (!reducedMotion && activeCard === index) {
        card.dataset.cycleActive = 'true';
      } else {
        card.removeAttribute('data-cycle-active');
      }
    });
  }, [activeCard, cardCount, reducedMotion]);

  const cycleState = reducedMotion
    ? 'static'
    : active
      ? 'running'
      : activeCard === null
        ? 'waiting'
        : 'paused';

  return (
    <div
      {...props}
      ref={groupRef}
      data-card-spotlight-group=""
      data-card-cycle-state={cycleState}
      className={className}
    >
      {children}
    </div>
  );
}
