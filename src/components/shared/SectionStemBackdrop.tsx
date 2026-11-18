'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import {
  STEM_ART,
  type StemDriftVariant,
  type StemMotifKey,
} from '@/components/shared/stem-motifs';

export type SectionBackdropVariant =
  | 'stats'
  | 'welcome'
  | 'ethos'
  | 'stem'
  | 'laboratory'
  | 'honours'
  | 'notices'
  | 'history'
  | 'anthems'
  | 'leadership'
  | 'student-life'
  | 'downloads'
  | 'gallery'
  | 'contact'
  | 'portal'
  | 'article';

type VisibilityTier = 'all' | 'sm' | 'md' | 'xl' | '2xl';

interface SectionMotifPlacement {
  motif: StemMotifKey;
  /** Anchored strictly to section edges, padding bands, and corners */
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  /** Rendered width in px (slightly scaled down on <640px when visible) */
  width: number;
  /** Resting drafting rotation in degrees */
  tilt: number;
  /** Faint crest-blue (#115191) opacity in the 3%–5% range (0.032–0.048) */
  opacity: number;
  /** Slow, calm transform-only drift path */
  drift: StemDriftVariant;
  /** Long loop duration in seconds (34–50s, slower and calmer than heroes) */
  duration: number;
  /** Negative start offset in seconds so items never drift in lockstep */
  delay: number;
  /** Minimum viewport tier so edge/gutter motifs never crowd body text */
  showFrom?: VisibilityTier;
}

const VISIBILITY_CLASSES: Record<VisibilityTier, string> = {
  all: 'section-stem-mobile-scale',
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  xl: 'hidden xl:block',
  '2xl': 'hidden 2xl:block',
};

/**
 * Sparse, corner- and margin-anchored crest-blue (#115191) compositions for
 * white (#FFFFFF) and light slate (#F8FAFC) sections below the heroes.
 * - Opacity: 0.032–0.048 (3.2%–4.8%), lighter and calmer than hero banners.
 * - Top/bottom items live inside section vertical padding bands and open
 *   top-right header corners; side-margin items appear only in empty gutters
 *   so motifs never sit behind body text while preserving full WCAG AA/AAA
 *   contrast everywhere.
 */
const SECTION_VARIANT_MOTIFS: Record<
  SectionBackdropVariant,
  SectionMotifPlacement[]
> = {
  /* Compact school figures strip (bg-white) */
  stats: [
    {
      motif: 'pi',
      top: '12px',
      right: '1.4%',
      width: 34,
      tilt: -7,
      opacity: 0.038,
      drift: 'd',
      duration: 42,
      delay: -9,
      showFrom: 'sm',
    },
    {
      motif: 'ruler',
      bottom: '8px',
      right: '5.5%',
      width: 82,
      tilt: -6,
      opacity: 0.034,
      drift: 'c',
      duration: 48,
      delay: -23,
      showFrom: 'xl',
    },
    {
      motif: 'angle',
      top: '14px',
      left: '0.8%',
      width: 38,
      tilt: 6,
      opacity: 0.035,
      drift: 'b',
      duration: 44,
      delay: -15,
      showFrom: '2xl',
    },
  ],

  /* Chief Principal's Welcome (#F8FAFC) */
  welcome: [
    {
      motif: 'openBook',
      top: '16px',
      right: '2.4%',
      width: 74,
      tilt: -7,
      opacity: 0.045,
      drift: 'b',
      duration: 44,
      delay: -8,
      showFrom: 'all',
    },
    {
      motif: 'fountainNib',
      bottom: '16px',
      right: '3.2%',
      width: 44,
      tilt: 18,
      opacity: 0.042,
      drift: 'a',
      duration: 38,
      delay: -21,
      showFrom: 'all',
    },
    {
      motif: 'graduationCap',
      bottom: '14px',
      left: '2.2%',
      width: 72,
      tilt: 6,
      opacity: 0.038,
      drift: 'c',
      duration: 46,
      delay: -14,
      showFrom: 'sm',
    },
    {
      motif: 'compass',
      top: '44%',
      right: '1.6%',
      width: 58,
      tilt: -9,
      opacity: 0.036,
      drift: 'd',
      duration: 42,
      delay: -31,
      showFrom: 'xl',
    },
  ],

  /* Motto, Mission, Vision & Core Values (bg-white & #F8FAFC) */
  ethos: [
    {
      motif: 'globe',
      top: '12px',
      right: '2.5%',
      width: 50,
      tilt: -5,
      opacity: 0.044,
      drift: 'a',
      duration: 46,
      delay: -11,
      showFrom: 'all',
    },
    {
      motif: 'pencil',
      bottom: '16px',
      left: '2.4%',
      width: 82,
      tilt: -14,
      opacity: 0.04,
      drift: 'd',
      duration: 39,
      delay: -24,
      showFrom: 'all',
    },
    {
      motif: 'ruler',
      top: '16px',
      left: '2%',
      width: 90,
      tilt: 6,
      opacity: 0.035,
      drift: 'c',
      duration: 48,
      delay: -6,
      showFrom: 'md',
    },
    {
      motif: 'sigma',
      bottom: '14px',
      right: '2.8%',
      width: 36,
      tilt: 6,
      opacity: 0.038,
      drift: 'b',
      duration: 36,
      delay: -18,
      showFrom: 'sm',
    },
    {
      motif: 'compass',
      top: '46%',
      left: '0.9%',
      width: 54,
      tilt: 10,
      opacity: 0.034,
      drift: 'a',
      duration: 45,
      delay: -33,
      showFrom: '2xl',
    },
  ],

  /* CBC Senior School Pathways (#F8FAFC) */
  stem: [
    {
      motif: 'atom',
      top: '12px',
      right: '2.6%',
      width: 62,
      tilt: 12,
      opacity: 0.046,
      drift: 'b',
      duration: 46,
      delay: -13,
      showFrom: 'all',
    },
    {
      motif: 'protractor',
      bottom: '12px',
      right: '3%',
      width: 78,
      tilt: -8,
      opacity: 0.042,
      drift: 'a',
      duration: 42,
      delay: -5,
      showFrom: 'all',
    },
    {
      motif: 'eqPythagoras',
      top: '18px',
      right: '15%',
      width: 96,
      tilt: -3,
      opacity: 0.035,
      drift: 'c',
      duration: 50,
      delay: -27,
      showFrom: 'md',
    },
    {
      motif: 'conicalFlask',
      bottom: '12px',
      left: '2%',
      width: 50,
      tilt: -6,
      opacity: 0.04,
      drift: 'd',
      duration: 38,
      delay: -19,
      showFrom: 'sm',
    },
    {
      motif: 'setSquare',
      top: '46%',
      right: '0.9%',
      width: 56,
      tilt: 12,
      opacity: 0.035,
      drift: 'b',
      duration: 44,
      delay: -34,
      showFrom: '2xl',
    },
  ],

  /* Academic Departments Directory (bg-white) */
  laboratory: [
    {
      motif: 'microscope',
      top: '14px',
      right: '2.8%',
      width: 54,
      tilt: -5,
      opacity: 0.046,
      drift: 'a',
      duration: 45,
      delay: -7,
      showFrom: 'all',
    },
    {
      motif: 'sinePlot',
      bottom: '14px',
      right: '2.6%',
      width: 78,
      tilt: -3,
      opacity: 0.04,
      drift: 'b',
      duration: 48,
      delay: -22,
      showFrom: 'all',
    },
    {
      motif: 'dnaHelix',
      top: '18px',
      right: '14%',
      width: 40,
      tilt: 16,
      opacity: 0.038,
      drift: 'c',
      duration: 43,
      delay: -15,
      showFrom: 'md',
    },
    {
      motif: 'beaker',
      bottom: '12px',
      left: '2%',
      width: 48,
      tilt: 6,
      opacity: 0.038,
      drift: 'd',
      duration: 40,
      delay: -29,
      showFrom: 'sm',
    },
    {
      motif: 'sqrt',
      top: '48%',
      left: '0.8%',
      width: 50,
      tilt: -4,
      opacity: 0.034,
      drift: 'a',
      duration: 37,
      delay: -11,
      showFrom: '2xl',
    },
  ],

  /* KCSE Roll of Honour (bg-white & #F8FAFC) */
  honours: [
    {
      motif: 'graduationCap',
      top: '14px',
      right: '2.5%',
      width: 74,
      tilt: -6,
      opacity: 0.045,
      drift: 'a',
      duration: 43,
      delay: -9,
      showFrom: 'all',
    },
    {
      motif: 'trophyCup',
      bottom: '12px',
      right: '2.8%',
      width: 50,
      tilt: 6,
      opacity: 0.042,
      drift: 'b',
      duration: 40,
      delay: -25,
      showFrom: 'all',
    },
    {
      motif: 'eqEmc2',
      top: '18px',
      right: '15%',
      width: 82,
      tilt: 3,
      opacity: 0.034,
      drift: 'd',
      duration: 47,
      delay: -16,
      showFrom: 'md',
    },
    {
      motif: 'angle',
      bottom: '14px',
      left: '2.2%',
      width: 44,
      tilt: -5,
      opacity: 0.038,
      drift: 'c',
      duration: 36,
      delay: -4,
      showFrom: 'sm',
    },
  ],

  /* School Office Notices & Circulars (#F8FAFC) */
  notices: [
    {
      motif: 'documentSheet',
      top: '12px',
      right: '2.6%',
      width: 50,
      tilt: 6,
      opacity: 0.045,
      drift: 'b',
      duration: 44,
      delay: -10,
      showFrom: 'all',
    },
    {
      motif: 'envelope',
      bottom: '14px',
      left: '2.2%',
      width: 68,
      tilt: -7,
      opacity: 0.04,
      drift: 'c',
      duration: 42,
      delay: -23,
      showFrom: 'all',
    },
    {
      motif: 'fountainNib',
      bottom: '12px',
      right: '3%',
      width: 42,
      tilt: 18,
      opacity: 0.04,
      drift: 'a',
      duration: 38,
      delay: -6,
      showFrom: 'sm',
    },
    {
      motif: 'clockFace',
      top: '14px',
      right: '14%',
      width: 48,
      tilt: -5,
      opacity: 0.035,
      drift: 'd',
      duration: 49,
      delay: -30,
      showFrom: 'md',
    },
  ],

  /* About: School History & Registry (bg-white) */
  history: [
    {
      motif: 'openBook',
      top: '12px',
      right: '2.4%',
      width: 72,
      tilt: -6,
      opacity: 0.044,
      drift: 'b',
      duration: 45,
      delay: -12,
      showFrom: 'all',
    },
    {
      motif: 'compass',
      bottom: '12px',
      right: '2.6%',
      width: 50,
      tilt: 9,
      opacity: 0.04,
      drift: 'c',
      duration: 41,
      delay: -26,
      showFrom: 'all',
    },
    {
      motif: 'pencil',
      bottom: '16px',
      left: '2.2%',
      width: 82,
      tilt: -12,
      opacity: 0.038,
      drift: 'a',
      duration: 37,
      delay: -7,
      showFrom: 'sm',
    },
    {
      motif: 'globe',
      top: '45%',
      left: '0.8%',
      width: 52,
      tilt: 5,
      opacity: 0.034,
      drift: 'd',
      duration: 48,
      delay: -19,
      showFrom: '2xl',
    },
  ],

  /* About: School Anthem & Wimbo wa Shule (bg-white) */
  anthems: [
    {
      motif: 'musicNotes',
      top: '14px',
      right: '3%',
      width: 52,
      tilt: -8,
      opacity: 0.046,
      drift: 'a',
      duration: 39,
      delay: -8,
      showFrom: 'all',
    },
    {
      motif: 'openBook',
      bottom: '12px',
      right: '2.4%',
      width: 70,
      tilt: 6,
      opacity: 0.04,
      drift: 'c',
      duration: 46,
      delay: -21,
      showFrom: 'all',
    },
    {
      motif: 'fountainNib',
      top: '16px',
      right: '15%',
      width: 44,
      tilt: 16,
      opacity: 0.036,
      drift: 'b',
      duration: 42,
      delay: -14,
      showFrom: 'md',
    },
    {
      motif: 'pi',
      bottom: '14px',
      left: '2.2%',
      width: 36,
      tilt: -6,
      opacity: 0.035,
      drift: 'd',
      duration: 35,
      delay: -28,
      showFrom: 'sm',
    },
  ],

  /* About: Leadership & Governance (#F8FAFC) */
  leadership: [
    {
      motif: 'graduationCap',
      top: '14px',
      right: '2.6%',
      width: 74,
      tilt: -7,
      opacity: 0.045,
      drift: 'b',
      duration: 44,
      delay: -6,
      showFrom: 'all',
    },
    {
      motif: 'ruler',
      bottom: '16px',
      right: '2.8%',
      width: 88,
      tilt: -8,
      opacity: 0.038,
      drift: 'd',
      duration: 47,
      delay: -24,
      showFrom: 'all',
    },
    {
      motif: 'documentSheet',
      top: '14px',
      right: '15%',
      width: 48,
      tilt: 6,
      opacity: 0.038,
      drift: 'a',
      duration: 41,
      delay: -17,
      showFrom: 'md',
    },
    {
      motif: 'setSquare',
      bottom: '12px',
      left: '2%',
      width: 50,
      tilt: 12,
      opacity: 0.036,
      drift: 'c',
      duration: 43,
      delay: -31,
      showFrom: 'sm',
    },
  ],

  /* Student Life & Boarding (#F8FAFC) */
  'student-life': [
    {
      motif: 'trophyCup',
      top: '10px',
      right: '2.4%',
      width: 48,
      tilt: -6,
      opacity: 0.045,
      drift: 'b',
      duration: 42,
      delay: -9,
      showFrom: 'all',
    },
    {
      motif: 'palette',
      bottom: '10px',
      right: '2.6%',
      width: 62,
      tilt: 7,
      opacity: 0.042,
      drift: 'a',
      duration: 46,
      delay: -22,
      showFrom: 'all',
    },
    {
      motif: 'sportsBall',
      bottom: '10px',
      left: '2.2%',
      width: 46,
      tilt: 11,
      opacity: 0.04,
      drift: 'c',
      duration: 40,
      delay: -13,
      showFrom: 'sm',
    },
    {
      motif: 'musicNotes',
      top: '12px',
      right: '12%',
      width: 44,
      tilt: -8,
      opacity: 0.036,
      drift: 'd',
      duration: 37,
      delay: -29,
      showFrom: 'xl',
    },
    {
      motif: 'clockFace',
      top: '46%',
      right: '0.9%',
      width: 50,
      tilt: -4,
      opacity: 0.035,
      drift: 'a',
      duration: 49,
      delay: -5,
      showFrom: '2xl',
    },
  ],

  /* Downloads & Circulars (#F8FAFC) */
  downloads: [
    {
      motif: 'protractor',
      top: '10px',
      right: '2.4%',
      width: 72,
      tilt: -7,
      opacity: 0.044,
      drift: 'c',
      duration: 45,
      delay: -11,
      showFrom: 'all',
    },
    {
      motif: 'documentSheet',
      bottom: '8px',
      right: '2.6%',
      width: 44,
      tilt: 6,
      opacity: 0.042,
      drift: 'a',
      duration: 41,
      delay: -25,
      showFrom: 'all',
    },
    {
      motif: 'pencil',
      bottom: '14px',
      left: '2.2%',
      width: 80,
      tilt: -14,
      opacity: 0.038,
      drift: 'd',
      duration: 38,
      delay: -7,
      showFrom: 'sm',
    },
    {
      motif: 'pi',
      top: '10px',
      left: '1.8%',
      width: 34,
      tilt: -6,
      opacity: 0.036,
      drift: 'b',
      duration: 36,
      delay: -18,
      showFrom: 'md',
    },
    {
      motif: 'setSquare',
      top: '48%',
      left: '0.8%',
      width: 54,
      tilt: 12,
      opacity: 0.035,
      drift: 'c',
      duration: 47,
      delay: -32,
      showFrom: '2xl',
    },
  ],

  /* Photo Gallery (#F8FAFC) */
  gallery: [
    {
      motif: 'cameraFrame',
      top: '10px',
      right: '2.4%',
      width: 62,
      tilt: -6,
      opacity: 0.045,
      drift: 'a',
      duration: 44,
      delay: -8,
      showFrom: 'all',
    },
    {
      motif: 'atom',
      bottom: '10px',
      right: '2.6%',
      width: 50,
      tilt: 10,
      opacity: 0.04,
      drift: 'c',
      duration: 48,
      delay: -23,
      showFrom: 'all',
    },
    {
      motif: 'musicNotes',
      bottom: '10px',
      left: '2.2%',
      width: 44,
      tilt: -8,
      opacity: 0.038,
      drift: 'b',
      duration: 37,
      delay: -14,
      showFrom: 'sm',
    },
    {
      motif: 'trophyCup',
      top: '46%',
      right: '0.9%',
      width: 50,
      tilt: 6,
      opacity: 0.035,
      drift: 'd',
      duration: 43,
      delay: -30,
      showFrom: '2xl',
    },
  ],

  /* Contact & Campus Location (#F8FAFC) */
  contact: [
    {
      motif: 'envelope',
      top: '10px',
      right: '2.4%',
      width: 64,
      tilt: -7,
      opacity: 0.045,
      drift: 'b',
      duration: 43,
      delay: -10,
      showFrom: 'all',
    },
    {
      motif: 'clockFace',
      bottom: '10px',
      right: '2.6%',
      width: 46,
      tilt: 5,
      opacity: 0.04,
      drift: 'd',
      duration: 47,
      delay: -26,
      showFrom: 'all',
    },
    {
      motif: 'ruler',
      bottom: '14px',
      left: '2.2%',
      width: 84,
      tilt: -9,
      opacity: 0.038,
      drift: 'c',
      duration: 45,
      delay: -6,
      showFrom: 'sm',
    },
    {
      motif: 'fountainNib',
      top: '42%',
      left: '0.9%',
      width: 46,
      tilt: 18,
      opacity: 0.036,
      drift: 'a',
      duration: 39,
      delay: -19,
      showFrom: '2xl',
    },
    {
      motif: 'globe',
      top: '58%',
      right: '0.9%',
      width: 52,
      tilt: -5,
      opacity: 0.035,
      drift: 'b',
      duration: 49,
      delay: -33,
      showFrom: '2xl',
    },
  ],

  /* Student & Staff Portal (#F8FAFC — max-w-5xl leaves generous side margins) */
  portal: [
    {
      motif: 'graduationCap',
      top: '12px',
      right: '2.4%',
      width: 68,
      tilt: -6,
      opacity: 0.045,
      drift: 'a',
      duration: 44,
      delay: -7,
      showFrom: 'all',
    },
    {
      motif: 'openBook',
      bottom: '10px',
      left: '2.2%',
      width: 66,
      tilt: -5,
      opacity: 0.04,
      drift: 'd',
      duration: 46,
      delay: -21,
      showFrom: 'all',
    },
    {
      motif: 'documentSheet',
      top: '38%',
      left: '1.6%',
      width: 52,
      tilt: 7,
      opacity: 0.038,
      drift: 'c',
      duration: 42,
      delay: -14,
      showFrom: 'xl',
    },
    {
      motif: 'atom',
      top: '52%',
      right: '1.6%',
      width: 58,
      tilt: 11,
      opacity: 0.038,
      drift: 'b',
      duration: 49,
      delay: -29,
      showFrom: 'xl',
    },
    {
      motif: 'compass',
      bottom: '10px',
      right: '2.8%',
      width: 44,
      tilt: 8,
      opacity: 0.036,
      drift: 'a',
      duration: 40,
      delay: -3,
      showFrom: 'sm',
    },
  ],

  /* News & Circular Article Body (#F8FAFC — max-w-4xl leaves wide side margins) */
  article: [
    {
      motif: 'fountainNib',
      top: '12px',
      right: '2.8%',
      width: 44,
      tilt: 18,
      opacity: 0.044,
      drift: 'a',
      duration: 41,
      delay: -9,
      showFrom: 'all',
    },
    {
      motif: 'envelope',
      bottom: '12px',
      right: '2.6%',
      width: 64,
      tilt: -7,
      opacity: 0.04,
      drift: 'd',
      duration: 45,
      delay: -24,
      showFrom: 'all',
    },
    {
      motif: 'documentSheet',
      top: '28%',
      left: '2%',
      width: 54,
      tilt: -6,
      opacity: 0.04,
      drift: 'b',
      duration: 46,
      delay: -15,
      showFrom: 'xl',
    },
    {
      motif: 'openBook',
      top: '58%',
      right: '2%',
      width: 68,
      tilt: 6,
      opacity: 0.038,
      drift: 'c',
      duration: 48,
      delay: -31,
      showFrom: 'xl',
    },
    {
      motif: 'protractor',
      bottom: '10px',
      left: '2.4%',
      width: 68,
      tilt: 8,
      opacity: 0.036,
      drift: 'a',
      duration: 43,
      delay: -5,
      showFrom: 'sm',
    },
  ],
};

interface SectionStemBackdropProps {
  variant: SectionBackdropVariant;
}

/**
 * Reusable, ultra-calm crest-blue (#115191) inline stroke-only STEM & school
 * line-art backdrop for white (#FFFFFF) and light (#F8FAFC) content sections.
 * - Sparse corner/margin placement so line art never sits behind body text.
 * - Faint 3.2%–4.8% opacity preserving full WCAG AA/AAA text contrast.
 * - Slow 35–50s transform-only drift, paused automatically when off-screen or
 *   when the browser tab is hidden, and static under `prefers-reduced-motion`.
 */
export default function SectionStemBackdrop({
  variant,
}: SectionStemBackdropProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const items = SECTION_VARIANT_MOTIFS[variant];

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof window === 'undefined') return;

    const host = field.parentElement ?? field;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let inView = false;
    let tabHidden = document.hidden;

    const syncPauseState = () => {
      const paused = !inView || tabHidden || reducedMotion.matches;
      field.dataset.paused = paused ? 'true' : 'false';
    };

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (!entry) return;
              inView = entry.isIntersecting;
              syncPauseState();
            },
            { threshold: 0 }
          )
        : null;

    if (observer) {
      observer.observe(host);
    } else {
      inView = true;
    }

    const onVisibilityChange = () => {
      tabHidden = document.hidden;
      syncPauseState();
    };

    syncPauseState();

    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', syncPauseState);

    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', syncPauseState);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-paused="true"
      data-section-variant={variant}
      className="section-stem-field pointer-events-none select-none absolute inset-0 overflow-hidden text-primary"
    >
      {items.map((item, idx) => {
        const tier = item.showFrom ?? 'sm';
        return (
          <div
            key={`${item.motif}-${idx}`}
            className={`section-stem-item absolute ${VISIBILITY_CLASSES[tier]}`}
            style={
              {
                top: item.top,
                bottom: item.bottom,
                left: item.left,
                right: item.right,
                width: `${item.width}px`,
                opacity: item.opacity,
                '--stem-tilt': `${item.tilt}deg`,
              } as CSSProperties
            }
          >
            <div
              data-drift={item.drift}
              className="section-stem-float"
              style={
                {
                  '--stem-duration': `${item.duration}s`,
                  '--stem-delay': `${item.delay}s`,
                } as CSSProperties
              }
            >
              {STEM_ART[item.motif]}
            </div>
          </div>
        );
      })}
    </div>
  );
}
