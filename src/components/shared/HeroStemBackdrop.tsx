'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import {
  STEM_ART,
  type StemDriftVariant,
  type StemMotifKey,
} from '@/components/shared/stem-motifs';

export type HeroBackdropVariant =
  | 'home'
  | 'about'
  | 'academics'
  | 'student-life'
  | 'downloads'
  | 'gallery'
  | 'contact'
  | 'portal'
  | 'news';

interface MotifPlacement {
  motif: StemMotifKey;
  /** Desktop horizontal anchor (%) */
  left: string;
  /** Desktop vertical anchor (%) */
  top: string;
  /** Rendered width in px on desktop */
  width: number;
  /** Resting drafting-table rotation (deg) */
  tilt: number;
  /** Low stroke opacity keeping full WCAG AA/AAA text contrast */
  opacity: number;
  /** Palette-faithful stroke tone (white or soft crest blue-100) */
  tone: 'white' | 'blue';
  /** Transform-only drift/rotation trajectory */
  drift: StemDriftVariant;
  /** Loop duration in seconds (22–40s, staggered so items never sync) */
  duration: number;
  /** Negative start offset in seconds so items begin mid-phase */
  delay: number;
  /** Subtle desktop pointer-parallax depth plane */
  layer: 'near' | 'far';
  /** Render on mobile (<640px) with optional edge position & scale */
  mobilePos?: { left: string; top: string; scale: number };
}

/**
 * Curated per-page compositions.
 * - `home`: full 17-item school/STEM spread (7 on mobile), 6.5%–11% opacity.
 * - Inner variants: calmer 8–9 themed items (4 on mobile), 5.5%–8.5% opacity,
 *   concentrated across the open right field and outer margins so headings and
 *   subtitles stay crisp and uncrowded on every screen size.
 */
const VARIANT_MOTIFS: Record<HeroBackdropVariant, MotifPlacement[]> = {
  home: [
    {
      motif: 'protractor',
      left: '83%',
      top: '5%',
      width: 118,
      tilt: -10,
      opacity: 0.11,
      tone: 'blue',
      drift: 'a',
      duration: 34,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '66%', top: '2%', scale: 0.74 },
    },
    {
      motif: 'atom',
      left: '56.5%',
      top: '8%',
      width: 96,
      tilt: 12,
      opacity: 0.105,
      tone: 'white',
      drift: 'b',
      duration: 38,
      delay: -13,
      layer: 'near',
      mobilePos: { left: '73%', top: '37%', scale: 0.74 },
    },
    {
      motif: 'compass',
      left: '58.5%',
      top: '61%',
      width: 96,
      tilt: 8,
      opacity: 0.11,
      tone: 'blue',
      drift: 'c',
      duration: 32,
      delay: -21,
      layer: 'near',
      mobilePos: { left: '74%', top: '62%', scale: 0.72 },
    },
    {
      motif: 'setSquare',
      left: '1.2%',
      top: '5%',
      width: 86,
      tilt: 11,
      opacity: 0.095,
      tone: 'blue',
      drift: 'c',
      duration: 35,
      delay: -24,
      layer: 'far',
    },
    {
      motif: 'ruler',
      left: '33%',
      top: '86%',
      width: 126,
      tilt: -12,
      opacity: 0.09,
      tone: 'white',
      drift: 'd',
      duration: 40,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'pencil',
      left: '91%',
      top: '39%',
      width: 96,
      tilt: -32,
      opacity: 0.1,
      tone: 'white',
      drift: 'a',
      duration: 27,
      delay: -19,
      layer: 'near',
    },
    {
      motif: 'conicalFlask',
      left: '89.5%',
      top: '69%',
      width: 84,
      tilt: -7,
      opacity: 0.105,
      tone: 'blue',
      drift: 'd',
      duration: 29,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '75%', top: '82%', scale: 0.76 },
    },
    {
      motif: 'beaker',
      left: '73%',
      top: '78%',
      width: 70,
      tilt: 6,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 33,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '1.5%',
      top: '77%',
      width: 100,
      tilt: -6,
      opacity: 0.095,
      tone: 'blue',
      drift: 'b',
      duration: 36,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '2%', top: '85%', scale: 0.74 },
    },
    {
      motif: 'graduationCap',
      left: '38%',
      top: '4%',
      width: 94,
      tilt: -7,
      opacity: 0.09,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -3,
      layer: 'far',
      mobilePos: { left: '42%', top: '11%', scale: 0.7 },
    },
    {
      motif: 'pi',
      left: '71%',
      top: '7%',
      width: 44,
      tilt: -7,
      opacity: 0.1,
      tone: 'white',
      drift: 'd',
      duration: 24,
      delay: -6,
      layer: 'far',
      mobilePos: { left: '82%', top: '19%', scale: 0.8 },
    },
    {
      motif: 'sqrt',
      left: '18%',
      top: '87%',
      width: 60,
      tilt: -4,
      opacity: 0.09,
      tone: 'blue',
      drift: 'c',
      duration: 28,
      delay: -9,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '1.2%',
      top: '45%',
      width: 44,
      tilt: 5,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 26,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'angle',
      left: '51%',
      top: '42%',
      width: 52,
      tilt: -5,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 25,
      delay: -22,
      layer: 'near',
    },
    {
      motif: 'eqPythagoras',
      left: '15%',
      top: '5.5%',
      width: 118,
      tilt: -3,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -14,
      layer: 'far',
    },
    {
      motif: 'eqEmc2',
      left: '77%',
      top: '48%',
      width: 88,
      tilt: 4,
      opacity: 0.065,
      tone: 'white',
      drift: 'd',
      duration: 30,
      delay: -26,
      layer: 'far',
    },
    {
      motif: 'sinePlot',
      left: '49%',
      top: '83%',
      width: 92,
      tilt: -3,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -31,
      layer: 'far',
    },
  ],

  /* About: scholarship, heritage since 1960, school anthems & leadership */
  about: [
    {
      motif: 'openBook',
      left: '84%',
      top: '12%',
      width: 92,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'b',
      duration: 36,
      delay: -6,
      layer: 'near',
      mobilePos: { left: '72%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'fountainNib',
      left: '69%',
      top: '16%',
      width: 56,
      tilt: 18,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -18,
      layer: 'near',
      mobilePos: { left: '80%', top: '44%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '56%',
      top: '10%',
      width: 82,
      tilt: -6,
      opacity: 0.07,
      tone: 'white',
      drift: 'c',
      duration: 34,
      delay: -11,
      layer: 'far',
      mobilePos: { left: '71%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'pencil',
      left: '76%',
      top: '68%',
      width: 88,
      tilt: -18,
      opacity: 0.08,
      tone: 'blue',
      drift: 'd',
      duration: 28,
      delay: -23,
      layer: 'near',
    },
    {
      motif: 'globe',
      left: '91%',
      top: '54%',
      width: 66,
      tilt: 5,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -14,
      layer: 'far',
    },
    {
      motif: 'musicNotes',
      left: '62%',
      top: '60%',
      width: 52,
      tilt: -8,
      opacity: 0.07,
      tone: 'blue',
      drift: 'b',
      duration: 27,
      delay: -4,
      layer: 'far',
      mobilePos: { left: '6%', top: '79%', scale: 0.7 },
    },
    {
      motif: 'ruler',
      left: '36%',
      top: '7%',
      width: 102,
      tilt: -9,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 38,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'compass',
      left: '1.2%',
      top: '56%',
      width: 68,
      tilt: 10,
      opacity: 0.06,
      tone: 'blue',
      drift: 'd',
      duration: 33,
      delay: -9,
      layer: 'far',
    },
  ],

  /* Academics: laboratory sciences, mathematics & CBC pathways */
  academics: [
    {
      motif: 'microscope',
      left: '86%',
      top: '12%',
      width: 72,
      tilt: -4,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 35,
      delay: -7,
      layer: 'near',
      mobilePos: { left: '76%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'atom',
      left: '68%',
      top: '10%',
      width: 82,
      tilt: 14,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 38,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '74%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'conicalFlask',
      left: '76%',
      top: '56%',
      width: 68,
      tilt: -7,
      opacity: 0.08,
      tone: 'blue',
      drift: 'd',
      duration: 29,
      delay: -12,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'dnaHelix',
      left: '93%',
      top: '52%',
      width: 48,
      tilt: 16,
      opacity: 0.075,
      tone: 'white',
      drift: 'c',
      duration: 37,
      delay: -25,
      layer: 'far',
    },
    {
      motif: 'beaker',
      left: '55%',
      top: '54%',
      width: 60,
      tilt: 6,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 32,
      delay: -4,
      layer: 'far',
    },
    {
      motif: 'eqPythagoras',
      left: '54%',
      top: '12%',
      width: 102,
      tilt: -3,
      opacity: 0.065,
      tone: 'blue',
      drift: 'c',
      duration: 40,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'sinePlot',
      left: '65%',
      top: '70%',
      width: 82,
      tilt: -4,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 34,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '40%',
      top: '8%',
      width: 38,
      tilt: 6,
      opacity: 0.06,
      tone: 'white',
      drift: 'd',
      duration: 26,
      delay: -9,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'sqrt',
      left: '1.2%',
      top: '66%',
      width: 52,
      tilt: -5,
      opacity: 0.06,
      tone: 'blue',
      drift: 'a',
      duration: 30,
      delay: -21,
      layer: 'far',
    },
  ],

  /* Student Life: KSSSA games, clubs, arts, choir & boarding timetable */
  'student-life': [
    {
      motif: 'trophyCup',
      left: '85%',
      top: '12%',
      width: 72,
      tilt: -6,
      opacity: 0.085,
      tone: 'blue',
      drift: 'b',
      duration: 33,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '76%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'palette',
      left: '67%',
      top: '14%',
      width: 82,
      tilt: 8,
      opacity: 0.08,
      tone: 'white',
      drift: 'a',
      duration: 36,
      delay: -20,
      layer: 'near',
      mobilePos: { left: '73%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'sportsBall',
      left: '77%',
      top: '58%',
      width: 64,
      tilt: 12,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 31,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.7 },
    },
    {
      motif: 'musicNotes',
      left: '57%',
      top: '12%',
      width: 56,
      tilt: -9,
      opacity: 0.075,
      tone: 'blue',
      drift: 'd',
      duration: 27,
      delay: -14,
      layer: 'far',
      mobilePos: { left: '5%', top: '79%', scale: 0.72 },
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '56%',
      width: 62,
      tilt: -5,
      opacity: 0.075,
      tone: 'blue',
      drift: 'a',
      duration: 39,
      delay: -27,
      layer: 'far',
    },
    {
      motif: 'globe',
      left: '61%',
      top: '55%',
      width: 64,
      tilt: 6,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 35,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '37%',
      top: '6%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -23,
      layer: 'far',
    },
    {
      motif: 'setSquare',
      left: '1.2%',
      top: '60%',
      width: 66,
      tilt: 12,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 30,
      delay: -16,
      layer: 'far',
    },
  ],

  /* Downloads & Circulars: joining papers, exam geometry & holiday work */
  downloads: [
    {
      motif: 'documentSheet',
      left: '85%',
      top: '12%',
      width: 68,
      tilt: 6,
      opacity: 0.085,
      tone: 'white',
      drift: 'a',
      duration: 34,
      delay: -9,
      layer: 'near',
      mobilePos: { left: '77%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'protractor',
      left: '66%',
      top: '12%',
      width: 96,
      tilt: -9,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 37,
      delay: -21,
      layer: 'near',
      mobilePos: { left: '70%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'setSquare',
      left: '76%',
      top: '55%',
      width: 68,
      tilt: 14,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 32,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '76%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'pencil',
      left: '58%',
      top: '66%',
      width: 86,
      tilt: -22,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 28,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '58%',
      width: 60,
      tilt: -4,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 39,
      delay: -30,
      layer: 'far',
    },
    {
      motif: 'pi',
      left: '56%',
      top: '14%',
      width: 40,
      tilt: -7,
      opacity: 0.07,
      tone: 'white',
      drift: 'b',
      duration: 25,
      delay: -12,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'ruler',
      left: '35%',
      top: '7%',
      width: 104,
      tilt: 8,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 40,
      delay: -18,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '1%',
      top: '62%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'd',
      duration: 35,
      delay: -26,
      layer: 'far',
    },
  ],

  /* Gallery: photography, prize giving, STEM fair & KSSSA albums */
  gallery: [
    {
      motif: 'cameraFrame',
      left: '84%',
      top: '14%',
      width: 84,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 35,
      delay: -6,
      layer: 'near',
      mobilePos: { left: '73%', top: '7%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '65%',
      top: '10%',
      width: 84,
      tilt: 7,
      opacity: 0.08,
      tone: 'white',
      drift: 'b',
      duration: 32,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '72%', top: '45%', scale: 0.7 },
    },
    {
      motif: 'atom',
      left: '74%',
      top: '56%',
      width: 72,
      tilt: -11,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 38,
      delay: -24,
      layer: 'near',
      mobilePos: { left: '75%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'trophyCup',
      left: '91%',
      top: '55%',
      width: 62,
      tilt: 6,
      opacity: 0.075,
      tone: 'blue',
      drift: 'd',
      duration: 30,
      delay: -10,
      layer: 'far',
    },
    {
      motif: 'conicalFlask',
      left: '57%',
      top: '54%',
      width: 60,
      tilt: -6,
      opacity: 0.07,
      tone: 'blue',
      drift: 'a',
      duration: 29,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'musicNotes',
      left: '53%',
      top: '14%',
      width: 50,
      tilt: -8,
      opacity: 0.065,
      tone: 'white',
      drift: 'b',
      duration: 26,
      delay: -3,
      layer: 'far',
      mobilePos: { left: '6%', top: '79%', scale: 0.72 },
    },
    {
      motif: 'protractor',
      left: '33%',
      top: '6%',
      width: 86,
      tilt: 9,
      opacity: 0.055,
      tone: 'blue',
      drift: 'd',
      duration: 36,
      delay: -15,
      layer: 'far',
    },
    {
      motif: 'angle',
      left: '1.2%',
      top: '64%',
      width: 48,
      tilt: -5,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 27,
      delay: -21,
      layer: 'far',
    },
  ],

  /* Contact & Admissions: postal correspondence, Grade 10 entry & campus office */
  contact: [
    {
      motif: 'envelope',
      left: '84%',
      top: '14%',
      width: 84,
      tilt: -8,
      opacity: 0.085,
      tone: 'white',
      drift: 'b',
      duration: 34,
      delay: -8,
      layer: 'near',
      mobilePos: { left: '73%', top: '7%', scale: 0.72 },
    },
    {
      motif: 'graduationCap',
      left: '66%',
      top: '12%',
      width: 84,
      tilt: 6,
      opacity: 0.08,
      tone: 'blue',
      drift: 'a',
      duration: 31,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '72%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'globe',
      left: '76%',
      top: '54%',
      width: 66,
      tilt: -5,
      opacity: 0.08,
      tone: 'blue',
      drift: 'c',
      duration: 38,
      delay: -12,
      layer: 'near',
      mobilePos: { left: '76%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'clockFace',
      left: '91%',
      top: '56%',
      width: 60,
      tilt: 5,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 36,
      delay: -26,
      layer: 'far',
    },
    {
      motif: 'fountainNib',
      left: '58%',
      top: '54%',
      width: 52,
      tilt: 20,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 29,
      delay: -4,
      layer: 'far',
      mobilePos: { left: '6%', top: '78%', scale: 0.7 },
    },
    {
      motif: 'compass',
      left: '55%',
      top: '8%',
      width: 66,
      tilt: -9,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 33,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'openBook',
      left: '36%',
      top: '6%',
      width: 78,
      tilt: -6,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 39,
      delay: -23,
      layer: 'far',
    },
    {
      motif: 'ruler',
      left: '1%',
      top: '68%',
      width: 96,
      tilt: -14,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 35,
      delay: -31,
      layer: 'far',
    },
  ],

  /* Portal: student & staff academic records, reports & circulars */
  portal: [
    {
      motif: 'graduationCap',
      left: '83%',
      top: '12%',
      width: 86,
      tilt: -7,
      opacity: 0.085,
      tone: 'blue',
      drift: 'a',
      duration: 33,
      delay: -5,
      layer: 'near',
      mobilePos: { left: '72%', top: '6%', scale: 0.72 },
    },
    {
      motif: 'documentSheet',
      left: '67%',
      top: '14%',
      width: 66,
      tilt: 7,
      opacity: 0.08,
      tone: 'white',
      drift: 'c',
      duration: 36,
      delay: -17,
      layer: 'near',
      mobilePos: { left: '77%', top: '44%', scale: 0.7 },
    },
    {
      motif: 'atom',
      left: '76%',
      top: '54%',
      width: 74,
      tilt: 11,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 39,
      delay: -24,
      layer: 'near',
      mobilePos: { left: '74%', top: '74%', scale: 0.68 },
    },
    {
      motif: 'openBook',
      left: '90%',
      top: '58%',
      width: 80,
      tilt: -6,
      opacity: 0.075,
      tone: 'white',
      drift: 'd',
      duration: 34,
      delay: -11,
      layer: 'far',
    },
    {
      motif: 'compass',
      left: '58%',
      top: '52%',
      width: 68,
      tilt: 9,
      opacity: 0.07,
      tone: 'white',
      drift: 'a',
      duration: 31,
      delay: -28,
      layer: 'far',
    },
    {
      motif: 'eqEmc2',
      left: '54%',
      top: '14%',
      width: 80,
      tilt: -4,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 29,
      delay: -8,
      layer: 'far',
    },
    {
      motif: 'sigma',
      left: '38%',
      top: '8%',
      width: 38,
      tilt: 5,
      opacity: 0.055,
      tone: 'white',
      drift: 'd',
      duration: 26,
      delay: -14,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.76 },
    },
    {
      motif: 'angle',
      left: '1.2%',
      top: '64%',
      width: 48,
      tilt: -6,
      opacity: 0.055,
      tone: 'blue',
      drift: 'c',
      duration: 28,
      delay: -21,
      layer: 'far',
    },
  ],

  /* News & Circular Articles: official notices, letters & academic results */
  news: [
    {
      motif: 'documentSheet',
      left: '87%',
      top: '12%',
      width: 66,
      tilt: -6,
      opacity: 0.08,
      tone: 'blue',
      drift: 'b',
      duration: 35,
      delay: -7,
      layer: 'near',
      mobilePos: { left: '77%', top: '6%', scale: 0.7 },
    },
    {
      motif: 'fountainNib',
      left: '75%',
      top: '16%',
      width: 52,
      tilt: 18,
      opacity: 0.075,
      tone: 'white',
      drift: 'a',
      duration: 30,
      delay: -19,
      layer: 'near',
      mobilePos: { left: '80%', top: '46%', scale: 0.7 },
    },
    {
      motif: 'openBook',
      left: '82%',
      top: '58%',
      width: 82,
      tilt: 6,
      opacity: 0.075,
      tone: 'white',
      drift: 'c',
      duration: 37,
      delay: -13,
      layer: 'near',
      mobilePos: { left: '73%', top: '75%', scale: 0.68 },
    },
    {
      motif: 'envelope',
      left: '2%',
      top: '14%',
      width: 78,
      tilt: -7,
      opacity: 0.07,
      tone: 'blue',
      drift: 'd',
      duration: 33,
      delay: -25,
      layer: 'far',
    },
    {
      motif: 'graduationCap',
      left: '3%',
      top: '60%',
      width: 80,
      tilt: 7,
      opacity: 0.07,
      tone: 'white',
      drift: 'a',
      duration: 36,
      delay: -4,
      layer: 'far',
    },
    {
      motif: 'pencil',
      left: '66%',
      top: '68%',
      width: 82,
      tilt: -20,
      opacity: 0.065,
      tone: 'blue',
      drift: 'b',
      duration: 28,
      delay: -16,
      layer: 'far',
    },
    {
      motif: 'protractor',
      left: '56%',
      top: '8%',
      width: 82,
      tilt: -8,
      opacity: 0.055,
      tone: 'white',
      drift: 'c',
      duration: 39,
      delay: -29,
      layer: 'far',
    },
    {
      motif: 'pi',
      left: '93%',
      top: '52%',
      width: 38,
      tilt: -6,
      opacity: 0.07,
      tone: 'blue',
      drift: 'd',
      duration: 24,
      delay: -10,
      layer: 'far',
      mobilePos: { left: '6%', top: '80%', scale: 0.74 },
    },
  ],
};

function MotifGroup({ items }: { items: MotifPlacement[] }) {
  return (
    <>
      {items.map((item, idx) => (
        <div
          key={`${item.motif}-${idx}`}
          className={`hero-stem-item absolute ${
            item.mobilePos ? '' : 'hidden sm:block'
          } ${item.tone === 'white' ? 'text-white' : 'text-blue-100'}`}
          style={
            {
              '--stem-x': item.left,
              '--stem-y': item.top,
              '--stem-mx': item.mobilePos?.left ?? item.left,
              '--stem-my': item.mobilePos?.top ?? item.top,
              '--stem-mscale': String(item.mobilePos?.scale ?? 1),
              '--stem-tilt': `${item.tilt}deg`,
              width: `${item.width}px`,
              opacity: item.opacity,
            } as CSSProperties
          }
        >
          <div
            data-drift={item.drift}
            className="hero-stem-float"
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
      ))}
    </>
  );
}

interface HeroStemBackdropProps {
  variant?: HeroBackdropVariant;
}

/**
 * Reusable animated school & STEM line-art backdrop shared by the homepage
 * hero and every inner page hero across the site.
 * - Pure inline stroke-only SVGs at low opacity (preserves WCAG AA contrast).
 * - Pauses CSS animations when off-screen or when the browser tab is hidden.
 * - Optional subtle desktop-only pointer parallax (transform-only, zero renders).
 * - Renders completely static under `prefers-reduced-motion: reduce`.
 */
export default function HeroStemBackdrop({
  variant = 'home',
}: HeroStemBackdropProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const items = VARIANT_MOTIFS[variant];
  const farItems = items.filter((m) => m.layer === 'far');
  const nearItems = items.filter((m) => m.layer === 'near');
  const maxParallaxX = variant === 'home' ? 9 : 6;
  const maxParallaxY = variant === 'home' ? 6 : 4;

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof window === 'undefined') return;

    const host = field.closest('section, header') ?? field;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px)'
    );

    let inView = true;
    let tabHidden = document.hidden;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

    const syncPauseState = () => {
      const paused = !inView || tabHidden || reducedMotion.matches;
      field.dataset.paused = paused ? 'true' : 'false';
      if (paused) {
        targetX = 0;
        targetY = 0;
      }
    };

    const stepParallax = () => {
      currentX += (targetX - currentX) * 0.065;
      currentY += (targetY - currentY) * 0.065;

      field.style.setProperty('--hero-px', `${currentX.toFixed(2)}px`);
      field.style.setProperty('--hero-py', `${currentY.toFixed(2)}px`);

      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        rafId = window.requestAnimationFrame(stepParallax);
      } else {
        rafId = null;
      }
    };

    const scheduleParallax = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(stepParallax);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (
        reducedMotion.matches ||
        !desktopPointer.matches ||
        !inView ||
        tabHidden
      ) {
        return;
      }
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = Math.max(-1, Math.min(1, nx)) * -maxParallaxX;
      targetY = Math.max(-1, Math.min(1, ny)) * -maxParallaxY;
      scheduleParallax();
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!reducedMotion.matches && desktopPointer.matches) {
        scheduleParallax();
      }
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

    observer?.observe(host);

    const onVisibilityChange = () => {
      tabHidden = document.hidden;
      syncPauseState();
    };

    const onMotionChange = () => {
      if (reducedMotion.matches) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        currentX = 0;
        currentY = 0;
        field.style.setProperty('--hero-px', '0px');
        field.style.setProperty('--hero-py', '0px');
      }
      syncPauseState();
    };

    syncPauseState();

    document.addEventListener('visibilitychange', onVisibilityChange);
    reducedMotion.addEventListener('change', onMotionChange);
    host.addEventListener('pointermove', onPointerMove as EventListener, {
      passive: true,
    });
    host.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
      host.removeEventListener('pointermove', onPointerMove as EventListener);
      host.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [maxParallaxX, maxParallaxY]);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-paused="false"
      data-variant={variant}
      className="hero-stem-field pointer-events-none select-none absolute inset-0 z-[2] overflow-hidden"
    >
      <div className="hero-stem-layer-far absolute inset-0">
        <MotifGroup items={farItems} />
      </div>
      <div className="hero-stem-layer-near absolute inset-0">
        <MotifGroup items={nearItems} />
      </div>
    </div>
  );
}
