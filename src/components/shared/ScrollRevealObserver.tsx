'use client';

import { useEffect } from 'react';

const REVEAL_SELECTOR = '[data-reveal]';

/** Reveal below-the-fold content once, without mutating React-owned markup. */
export default function ScrollRevealObserver() {
  useEffect(() => {
    const main = document.getElementById('main-content');
    if (!main || !('IntersectionObserver' in window) || !('animate' in Element.prototype)) {
      return;
    }

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shown = new WeakSet<HTMLElement>();
    const tracked = new Map<HTMLElement, Animation | null>();
    let frame: number | null = null;
    let isPrinting = false;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        if (tracked.get(el) !== null) continue;
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;

        observer.unobserve(el);
        shown.add(el);
        if (!entry.isIntersecting || motion.matches || isPrinting || el.matches(':focus-within')) {
          tracked.delete(el);
          continue;
        }

        // Start just before entering the viewport. Web Animations changes the
        // presentation only, so React can safely hydrate or stream this node.
        const styles = getComputedStyle(el);
        const animation = el.animate(
          [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 520,
            delay: Number.parseFloat(styles.getPropertyValue('--reveal-delay')) || 0,
            easing: styles.getPropertyValue('--ease-editorial').trim() || 'ease-out',
            fill: 'backwards',
          },
        );
        tracked.set(el, animation);
        animation.onfinish = () => tracked.delete(el);
      }
    }, { rootMargin: '0px 0px 64px 0px' });

    const stopTracking = (el: HTMLElement) => {
      observer.unobserve(el);
      tracked.get(el)?.cancel();
      tracked.delete(el);
    };

    const register = () => {
      // Tab panels and cached routes may mount or detach in the same layout.
      for (const el of tracked.keys()) {
        if (!main.contains(el)) stopTracking(el);
      }
      if (motion.matches || isPrinting) return;

      for (const el of main.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)) {
        if (shown.has(el) || tracked.has(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight || !el.getClientRects().length || el.matches(':focus-within')) {
          // Keep initial above-the-fold content visible, including anchor links.
          shown.add(el);
        } else {
          tracked.set(el, null);
          observer.observe(el);
        }
      }
    };

    const mutations = new MutationObserver((records) => {
      const hasElementChanges = records.some(({ addedNodes, removedNodes }) =>
        [...addedNodes, ...removedNodes].some((node) => node.nodeType === Node.ELEMENT_NODE),
      );
      if (!hasElementChanges || frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        register();
      });
    });

    const stopAll = () => {
      observer.disconnect();
      for (const animation of tracked.values()) animation?.cancel();
      tracked.clear();
    };

    const handleFocus = ({ target }: FocusEvent) => {
      if (!(target instanceof Element)) return;
      let el = target.closest<HTMLElement>(REVEAL_SELECTOR);
      while (el) {
        stopTracking(el);
        shown.add(el);
        el = el.parentElement?.closest<HTMLElement>(REVEAL_SELECTOR) ?? null;
      }
    };

    const handleMotionChange = () => {
      if (motion.matches) stopAll();
      else register();
    };
    const handleBeforePrint = () => {
      isPrinting = true;
      stopAll();
    };
    const handleAfterPrint = () => {
      isPrinting = false;
      register();
    };

    register();
    mutations.observe(main, { childList: true, subtree: true });
    main.addEventListener('focusin', handleFocus);
    motion.addEventListener('change', handleMotionChange);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      stopAll();
      mutations.disconnect();
      main.removeEventListener('focusin', handleFocus);
      motion.removeEventListener('change', handleMotionChange);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, []);

  return null;
}
