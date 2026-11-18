'use client';

import type { RefObject } from 'react';
import { useEffect, useState, useSyncExternalStore } from 'react';

export function subscribeReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', onStoreChange);
  return () => query.removeEventListener('change', onStoreChange);
}

export function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Returns `true` during SSR so pre-rendered HTML carries complete, crisp final
 * text and real numbers when JavaScript is disabled or before hydration, with
 * zero hydration mismatch and zero layout shift.
 */
export function getReducedMotionServerSnapshot() {
  return true;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

/**
 * Deterministic hash mapping any seed string into `[minMs, maxMs]` (default
 * 8.5s–11.8s) so looping text animations sit comfortably in an 8–12 second
 * hold window without two elements restarting at the same instant.
 */
export function staggeredHoldMs(
  seed: string,
  minMs = 8500,
  maxMs = 11800
): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const normalized = (hash >>> 0) / 4294967295;
  return Math.round(minMs + normalized * (maxMs - minMs));
}

interface ViewportActivityOptions {
  /** Observe nearest section/header landmark instead of the element itself */
  observeHost?: boolean;
  /** IntersectionObserver rootMargin (default slightly inset for scroll reveals) */
  rootMargin?: string;
  /** Minimum visible ratio to count as in view */
  threshold?: number;
  /** Disable observer work when reduced motion is active */
  disabled?: boolean;
}

/**
 * Tracks whether an element is currently visible on screen AND the browser tab
 * is in the foreground. Used by every looping text component to start on
 * viewport entry and pause cleanly when off-screen or when the tab is hidden.
 */
export function useViewportActivity(
  ref: RefObject<HTMLElement | null>,
  {
    observeHost = false,
    rootMargin = '0px',
    threshold = 0.08,
    disabled = false,
  }: ViewportActivityOptions = {}
) {
  const [inView, setInView] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const el = ref.current;
    if (!el) return;

    const target = observeHost ? (el.closest('section, header') ?? el) : el;

    let observer: IntersectionObserver | null = null;
    let fallbackFrame: number | null = null;

    if (typeof window.IntersectionObserver === 'function') {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          setInView(entry.isIntersecting);
        },
        { root: null, rootMargin, threshold }
      );
      observer.observe(target);
    } else {
      fallbackFrame = window.requestAnimationFrame(() => {
        setInView(true);
      });
    }

    const onVisibilityChange = () => {
      setTabHidden(document.hidden);
    };

    if (document.hidden) {
      fallbackFrame = window.requestAnimationFrame(() => {
        setTabHidden(true);
      });
    }

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (fallbackFrame !== null) {
        window.cancelAnimationFrame(fallbackFrame);
      }
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [disabled, observeHost, ref, rootMargin, threshold]);

  return {
    inView,
    tabHidden,
    active: !disabled && inView && !tabHidden,
  };
}
