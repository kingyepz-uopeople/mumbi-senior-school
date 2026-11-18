'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const REVEAL_SELECTOR = '[data-reveal]';
const PENDING_SELECTOR = '[data-reveal][data-reveal-state="pending"]';

function showImmediately(el: HTMLElement) {
  el.dataset.revealState = 'shown';
}

function animateIn(el: HTMLElement) {
  if (el.dataset.revealState !== 'pending') {
    el.dataset.revealState = 'shown';
    return;
  }
  el.dataset.revealState = 'visible';
  // Clear transform/transition rules once the one-time reveal settles
  const onDone = (event: TransitionEvent) => {
    if (event.target !== el || event.propertyName !== 'opacity') return;
    el.dataset.revealState = 'shown';
    el.removeEventListener('transitionend', onDone);
  };
  el.addEventListener('transitionend', onDone);
}

/**
 * Lightweight, dependency-free scroll-reveal observer.
 *
 * Progressive-enhancement & accessibility guarantees:
 * - Static HTML omits `data-reveal-state`, so every section and card is 100%
 *   visible if JavaScript fails, is disabled, or has not hydrated yet.
 * - Elements already in or above the viewport on load receive `"shown"`
 *   immediately (no flash of hidden content, zero CLS, zero LCP delay).
 * - Only below-the-fold elements receive `"pending"` and fade/rise gently once
 *   as they enter the viewport via native IntersectionObserver, then unobserve.
 * - Respects `prefers-reduced-motion: reduce` (including live OS toggles) and
 *   print media by displaying all content immediately with no animation.
 * - Keyboard focus (`focusin`) inside any pending element shows it instantly.
 */
export default function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const showAll = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        showImmediately(el);
      });
    };

    if (motionQuery.matches || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal when entering the viewport or already scrolled past above it
          if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            continue;
          }
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            animateIn(target);
          } else {
            showImmediately(target);
          }
          observer.unobserve(target);
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -36px 0px',
        threshold: 0.06,
      }
    );

    const registerElements = () => {
      const viewportCutoff = window.innerHeight * 0.96;
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        const state = el.dataset.revealState;
        if (state === 'visible' || state === 'shown') return;

        const rect = el.getBoundingClientRect();
        if (
          rect.top < viewportCutoff ||
          (rect.width === 0 && rect.height === 0) ||
          el.matches(':focus, :focus-within')
        ) {
          showImmediately(el);
          observer.unobserve(el);
          return;
        }

        if (state !== 'pending') {
          el.dataset.revealState = 'pending';
          observer.observe(el);
        }
      });
    };

    registerElements();

    // Re-check lazily mounted below-the-fold sections (e.g. tab panel switches)
    const mainEl = document.getElementById('main-content');
    let mutationFrame: number | null = null;
    const mutationObserver =
      mainEl && 'MutationObserver' in window
        ? new MutationObserver((mutations) => {
            const hasAddedElement = mutations.some((m) =>
              Array.from(m.addedNodes).some((n) => n.nodeType === 1)
            );
            if (!hasAddedElement || mutationFrame !== null) return;
            mutationFrame = window.requestAnimationFrame(() => {
              mutationFrame = null;
              if (!motionQuery.matches) registerElements();
            });
          })
        : null;

    if (mainEl && mutationObserver) {
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    // Reveal instantly when a keyboard user tabs into a below-the-fold element
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const pending = target.closest<HTMLElement>(PENDING_SELECTOR);
      if (pending) {
        showImmediately(pending);
        observer.unobserve(pending);
      }
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        observer.disconnect();
        mutationObserver?.disconnect();
        showAll();
      }
    };

    const handleBeforePrint = () => {
      observer.disconnect();
      showAll();
    };

    document.addEventListener('focusin', handleFocusIn, true);
    window.addEventListener('beforeprint', handleBeforePrint);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      if (mutationFrame !== null) {
        window.cancelAnimationFrame(mutationFrame);
      }
      observer.disconnect();
      mutationObserver?.disconnect();
      document.removeEventListener('focusin', handleFocusIn, true);
      window.removeEventListener('beforeprint', handleBeforePrint);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [pathname]);

  return null;
}
