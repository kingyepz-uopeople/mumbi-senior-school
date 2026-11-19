'use client';

import { useEffect } from 'react';

const INDEX_SELECTOR = '[data-prospectus-index]';

/**
 * Staggers the homepage prospectus index rows into view once, on scroll.
 *
 * Markup ships with no state attribute, so every row is visible by default:
 * the list still works without JavaScript and in print. Only when the index
 * starts below the fold do we mark it `hidden`; scrolling it into view
 * switches to `shown`, and CSS fades and rises each row on a short stagger.
 * Rows already on screen are never re-animated, so there is no flash after
 * hydration, and `prefers-reduced-motion: reduce` keeps the still list.
 */
export default function ProspectusIndexReveal() {
  useEffect(() => {
    const index = document.querySelector<HTMLElement>(INDEX_SELECTOR);
    if (!index) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | null = null;
    let revealed = false;

    const settle = () => {
      if (revealed) return;
      revealed = true;
      observer?.disconnect();
      observer = null;
      delete index.dataset.pqState;
    };

    const arm = () => {
      if (revealed || motion.matches || !('IntersectionObserver' in window)) {
        settle();
        return;
      }
      // Already visible, or holding keyboard focus: leave the rows untouched.
      if (
        index.getBoundingClientRect().top < window.innerHeight * 0.85 ||
        index.contains(document.activeElement)
      ) {
        settle();
        return;
      }

      observer?.disconnect();
      index.dataset.pqState = 'hidden';

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some(({ isIntersecting }) => isIntersecting)) return;
          if (revealed) return;
          revealed = true;
          observer?.disconnect();
          observer = null;
          index.dataset.pqState = 'shown';
        },
        { rootMargin: '0px 0px -6% 0px', threshold: 0.05 }
      );
      observer.observe(index);
    };

    arm();

    const handleMotionChange = () => {
      if (motion.matches) settle();
    };

    index.addEventListener('focusin', settle);
    motion.addEventListener('change', handleMotionChange);
    window.addEventListener('beforeprint', settle);

    return () => {
      observer?.disconnect();
      index.removeEventListener('focusin', settle);
      motion.removeEventListener('change', handleMotionChange);
      window.removeEventListener('beforeprint', settle);
    };
  }, []);

  return null;
}
