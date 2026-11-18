'use client';

import type { CSSProperties } from 'react';
import { useRef } from 'react';
import {
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';
import {
  STEM_ART,
  type StemDriftVariant,
  type StemMotifKey,
} from '@/components/shared/stem-motifs';

export type SectionBackdropVariant =
  | 'stats'
  | 'welcome'
  | 'ethos'
  | 'about-ethos'
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

type MobilePlacement = readonly [left: string, top: string, scale: number];

type SectionMotifTuple = readonly [
  motif: StemMotifKey,
  left: string,
  top: string,
  width: number,
  tilt: number,
  opacity: number,
  drift: StemDriftVariant,
  duration: number,
  delay: number,
  mobile?: MobilePlacement,
];

/**
 * Full-canvas crest-blue (#115191) inline stroke-only school & STEM line-art
 * spreads for every white (#FFFFFF) and light slate (#F8FAFC) section across
 * the site:
 * - 6–10 motifs per section on desktop (~1.5x drafting scale, 56–142px) and
 *   3–5 responsive motifs on mobile.
 * - 0.144–0.193 opacity distributed across section headers, open spaces, column
 *   gutters, and outer margins — slightly gentler (0.144–0.158) near interior
 *   text columns so body copy remains high-contrast and effortless to read.
 * - Slow 28–44s transform-only drift loops with staggered negative phase offsets.
 */
const SECTION_VARIANT_MOTIFS: Record<
  SectionBackdropVariant,
  readonly SectionMotifTuple[]
> = {
  /* Homepage QuickStats strip (bg-white, compact 4-column band) */
  stats: [
    ['protractor', '14%', '12%', 112, -9, 0.166, 'a', 36, -6, ['30%', '8%', 0.72]],
    ['pi', '2%', '52%', 56, -7, 0.175, 'd', 30, -18],
    ['atom', '41%', '10%', 88, 12, 0.158, 'b', 40, -12, ['76%', '12%', 0.72]],
    ['sqrt', '66%', '16%', 76, -5, 0.166, 'c', 33, -24],
    ['ruler', '82%', '56%', 126, -8, 0.175, 'd', 42, -9, ['66%', '68%', 0.72]],
    ['angle', '93%', '10%', 64, 6, 0.175, 'a', 31, -29],
  ],
  /* Homepage Principal Welcome (#F8FAFC, portrait + editorial letter) */
  welcome: [
    ['openBook', '84%', '6%', 124, -7, 0.184, 'b', 38, -7, ['68%', '3%', 0.74]],
    ['graduationCap', '58%', '5%', 118, 6, 0.166, 'a', 34, -19, ['72%', '26%', 0.72]],
    ['setSquare', '1.5%', '5%', 96, 11, 0.166, 'c', 41, -13],
    ['fountainNib', '29%', '38%', 72, 18, 0.154, 'd', 32, -26, ['76%', '52%', 0.74]],
    ['compass', '89%', '42%', 98, -9, 0.184, 'a', 37, -4],
    ['eqPythagoras', '48%', '85%', 136, -3, 0.166, 'c', 43, -16, ['4%', '74%', 0.72]],
    ['globe', '4%', '76%', 92, -5, 0.175, 'b', 39, -31],
    ['pencil', '77%', '82%', 122, -16, 0.175, 'd', 31, -22, ['65%', '91%', 0.74]],
  ],
  /* Homepage Motto, Mission & Vision + Core Values (bg-white) */
  ethos: [
    ['protractor', '82%', '4%', 132, -8, 0.184, 'a', 37, -8, ['66%', '2%', 0.74]],
    ['openBook', '28%', '5%', 118, 6, 0.166, 'b', 40, -21],
    ['sigma', '1.5%', '6%', 60, 6, 0.166, 'd', 29, -14, ['78%', '22%', 0.78]],
    ['compass', '37%', '40%', 98, 9, 0.158, 'c', 35, -5, ['72%', '45%', 0.72]],
    ['atom', '66%', '34%', 102, -11, 0.144, 'b', 42, -27],
    ['fountainNib', '91%', '46%', 72, 18, 0.175, 'a', 33, -17, ['76%', '69%', 0.74]],
    ['globe', '2.5%', '74%', 92, -5, 0.175, 'd', 44, -11],
    ['ruler', '44%', '87%', 142, -7, 0.166, 'c', 39, -32, ['8%', '92%', 0.74]],
    ['graduationCap', '81%', '80%', 120, -6, 0.184, 'a', 36, -23],
  ],
  /* About #mission: Motto, Mission & Vision card + Six Core Values (#F8FAFC) */
  'about-ethos': [
    ['openBook', '83%', '4%', 128, -7, 0.193, 'b', 38, -6, ['66%', '2%', 0.74]],
    ['graduationCap', '56%', '5%', 124, 6, 0.184, 'a', 34, -18, ['70%', '22%', 0.72]],
    ['setSquare', '1.5%', '4%', 96, 12, 0.175, 'c', 41, -25],
    ['compass', '18%', '33%', 98, 8, 0.175, 'd', 36, -11, ['72%', '44%', 0.72]],
    ['protractor', '74%', '43%', 136, -9, 0.184, 'a', 39, -29],
    ['atom', '44%', '46%', 102, 13, 0.166, 'b', 43, -4, ['70%', '66%', 0.72]],
    ['conicalFlask', '26%', '68%', 90, -7, 0.158, 'd', 32, -15],
    ['fountainNib', '61%', '69%', 72, 18, 0.158, 'c', 30, -22],
    ['globe', '89%', '74%', 94, -5, 0.193, 'a', 42, -9, ['70%', '87%', 0.74]],
    ['eqPythagoras', '4%', '88%', 138, -3, 0.175, 'b', 44, -33],
  ],
  /* CBC Senior School Pathways — Homepage & Academics (#F8FAFC) */
  stem: [
    ['atom', '84%', '4%', 112, 12, 0.193, 'b', 39, -9, ['69%', '2%', 0.74]],
    ['protractor', '55%', '6%', 136, -8, 0.184, 'a', 35, -21],
    ['eqPythagoras', '34%', '4%', 138, -3, 0.158, 'c', 43, -14, ['58%', '24%', 0.72]],
    ['conicalFlask', '70%', '24%', 92, -7, 0.175, 'd', 31, -5],
    ['setSquare', '1.5%', '36%', 98, 12, 0.175, 'a', 38, -28, ['72%', '48%', 0.72]],
    ['compass', '29%', '54%', 96, 8, 0.158, 'c', 36, -17],
    ['microscope', '62%', '56%', 92, -5, 0.158, 'b', 41, -32, ['74%', '72%', 0.72]],
    ['sinePlot', '83%', '82%', 124, -4, 0.184, 'a', 44, -11, ['62%', '91%', 0.74]],
    ['beaker', '8%', '80%', 84, 6, 0.175, 'd', 33, -23],
  ],
  /* Academics #departments: Five Teaching Departments (bg-white) */
  laboratory: [
    ['microscope', '85%', '4%', 96, -5, 0.193, 'a', 37, -7, ['72%', '2%', 0.74]],
    ['atom', '62%', '5%', 108, 14, 0.184, 'b', 41, -19, ['70%', '24%', 0.72]],
    ['dnaHelix', '91%', '34%', 68, 16, 0.175, 'c', 39, -12],
    ['conicalFlask', '26%', '30%', 88, -7, 0.149, 'd', 32, -25, ['74%', '48%', 0.72]],
    ['beaker', '1.5%', '52%', 84, 6, 0.166, 'a', 35, -4],
    ['sinePlot', '66%', '58%', 120, -3, 0.149, 'b', 43, -29, ['66%', '72%', 0.72]],
    ['sqrt', '34%', '74%', 80, -5, 0.154, 'c', 30, -16],
    ['eqEmc2', '80%', '86%', 114, 4, 0.175, 'd', 38, -22, ['64%', '92%', 0.74]],
    ['ruler', '6%', '89%', 140, -8, 0.175, 'a', 44, -34],
  ],
  /* KCSE Roll of Honour — Homepage (bg-white) & Academics (#F8FAFC) */
  honours: [
    ['graduationCap', '82%', '5%', 124, -6, 0.193, 'a', 36, -8, ['66%', '2%', 0.74]],
    ['trophyCup', '60%', '6%', 92, 6, 0.184, 'b', 33, -22, ['74%', '25%', 0.72]],
    ['pi', '2%', '8%', 60, -7, 0.166, 'd', 28, -13],
    ['eqEmc2', '74%', '30%', 114, 3, 0.158, 'c', 40, -5],
    ['compass', '1.5%', '48%', 94, 9, 0.166, 'a', 37, -27, ['72%', '52%', 0.72]],
    ['atom', '44%', '54%', 100, -10, 0.149, 'b', 42, -17],
    ['openBook', '82%', '78%', 120, 6, 0.184, 'd', 39, -31, ['66%', '86%', 0.74]],
    ['angle', '14%', '84%', 72, -5, 0.175, 'c', 31, -10],
  ],
  /* News & Announcements, 404 & Offline (#F8FAFC) */
  notices: [
    ['documentSheet', '86%', '5%', 88, 6, 0.193, 'b', 37, -9, ['74%', '2%', 0.74]],
    ['envelope', '58%', '6%', 108, -7, 0.184, 'c', 35, -21, ['68%', '26%', 0.72]],
    ['pencil', '2%', '6%', 118, -14, 0.166, 'a', 32, -14],
    ['fountainNib', '20%', '42%', 72, 18, 0.154, 'd', 34, -6, ['76%', '54%', 0.72]],
    ['clockFace', '89%', '46%', 88, -5, 0.175, 'a', 42, -28],
    ['protractor', '54%', '60%', 126, -8, 0.149, 'b', 40, -18],
    ['openBook', '5%', '80%', 118, -6, 0.184, 'c', 44, -32],
    ['graduationCap', '79%', '82%', 120, 6, 0.184, 'd', 36, -11, ['66%', '88%', 0.74]],
  ],
  /* About #history: School History & Official Registration (bg-white) */
  history: [
    ['openBook', '83%', '5%', 122, -6, 0.184, 'b', 38, -10, ['66%', '2%', 0.74]],
    ['graduationCap', '46%', '5%', 118, 6, 0.175, 'a', 34, -23],
    ['ruler', '2%', '4%', 138, -7, 0.166, 'c', 42, -7, ['62%', '26%', 0.72]],
    ['fountainNib', '52%', '40%', 72, 18, 0.166, 'd', 31, -16, ['76%', '52%', 0.74]],
    ['globe', '90%', '44%', 92, 5, 0.175, 'a', 40, -29],
    ['setSquare', '1%', '50%', 92, 11, 0.158, 'b', 36, -4],
    ['compass', '48%', '76%', 96, 9, 0.175, 'c', 35, -20, ['72%', '76%', 0.72]],
    ['pencil', '12%', '88%', 122, -12, 0.175, 'a', 33, -12],
    ['protractor', '80%', '84%', 128, -8, 0.184, 'd', 43, -34, ['62%', '92%', 0.72]],
  ],
  /* About #anthems: School Anthem & Wimbo wa Shule (bg-white) */
  anthems: [
    ['musicNotes', '85%', '5%', 82, -8, 0.193, 'a', 32, -7, ['74%', '2%', 0.76]],
    ['openBook', '60%', '5%', 124, 6, 0.184, 'c', 39, -20, ['66%', '24%', 0.72]],
    ['fountainNib', '46%', '34%', 74, 16, 0.175, 'b', 35, -13, ['76%', '49%', 0.74]],
    ['palette', '90%', '42%', 100, 7, 0.166, 'd', 41, -27],
    ['globe', '1%', '40%', 90, -5, 0.166, 'a', 43, -5],
    ['musicNotes', '34%', '68%', 74, 9, 0.154, 'c', 30, -17, ['74%', '72%', 0.74]],
    ['graduationCap', '78%', '84%', 120, -6, 0.184, 'b', 37, -31, ['64%', '91%', 0.72]],
    ['pencil', '8%', '88%', 120, -14, 0.175, 'd', 34, -9],
  ],
  /* About #leadership: Principals, BoM Chairpersons & Student Council (#F8FAFC) */
  leadership: [
    ['graduationCap', '82%', '4%', 126, -7, 0.193, 'b', 37, -6, ['66%', '2%', 0.74]],
    ['documentSheet', '60%', '4%', 88, 6, 0.184, 'a', 35, -18, ['74%', '24%', 0.72]],
    ['compass', '46%', '28%', 96, 8, 0.166, 'c', 39, -26, ['72%', '48%', 0.72]],
    ['openBook', '86%', '36%', 116, -6, 0.166, 'd', 42, -11],
    ['setSquare', '1%', '38%', 94, 12, 0.166, 'a', 36, -4],
    ['ruler', '34%', '57%', 142, -8, 0.175, 'b', 44, -22],
    ['clockFace', '74%', '55%', 88, 5, 0.175, 'c', 40, -30],
    ['globe', '5%', '90%', 86, -5, 0.175, 'd', 38, -15, ['68%', '92%', 0.72]],
  ],
  /* Explore: Student Life, Clubs, Sports, Routine, Chaplaincy & Boarding (#F8FAFC) */
  'student-life': [
    ['trophyCup', '85%', '4%', 94, -6, 0.193, 'b', 35, -8, ['72%', '2%', 0.74]],
    ['palette', '62%', '8%', 108, 7, 0.184, 'a', 39, -21, ['68%', '24%', 0.72]],
    ['musicNotes', '44%', '14%', 78, -8, 0.166, 'd', 31, -13],
    ['sportsBall', '89%', '40%', 90, 11, 0.175, 'c', 36, -5, ['72%', '50%', 0.72]],
    ['clockFace', '1.5%', '36%', 88, -4, 0.166, 'a', 43, -28],
    ['globe', '32%', '54%', 90, 6, 0.154, 'b', 40, -17],
    ['openBook', '66%', '68%', 118, -6, 0.158, 'c', 38, -32, ['66%', '74%', 0.72]],
    ['setSquare', '8%', '84%', 96, 12, 0.175, 'd', 34, -10],
    ['graduationCap', '82%', '86%', 120, 6, 0.184, 'a', 41, -24, ['64%', '92%', 0.72]],
  ],
  /* Downloads & Circulars: Filter Controls & Document Register (#F8FAFC) */
  downloads: [
    ['protractor', '81%', '3%', 132, -7, 0.184, 'c', 38, -10, ['66%', '2%', 0.74]],
    ['documentSheet', '56%', '26%', 88, 6, 0.175, 'a', 35, -23, ['74%', '26%', 0.72]],
    ['ruler', '2%', '28%', 138, -8, 0.166, 'b', 42, -7],
    ['setSquare', '89%', '42%', 96, 12, 0.175, 'd', 36, -16, ['72%', '52%', 0.72]],
    ['compass', '26%', '54%', 94, 9, 0.154, 'a', 40, -29],
    ['clockFace', '1.5%', '68%', 86, -4, 0.166, 'c', 44, -4],
    ['pi', '68%', '70%', 62, -6, 0.158, 'b', 29, -19, ['78%', '75%', 0.76]],
    ['pencil', '10%', '90%', 122, -14, 0.175, 'd', 33, -12],
    ['openBook', '81%', '88%', 120, -6, 0.184, 'a', 39, -33, ['66%', '92%', 0.72]],
  ],
  /* Photo Gallery: Event Album Filters & Frame Archive (#F8FAFC) */
  gallery: [
    ['cameraFrame', '84%', '4%', 108, -6, 0.193, 'a', 37, -8, ['68%', '2%', 0.74]],
    ['graduationCap', '60%', '8%', 120, 6, 0.184, 'b', 34, -21, ['68%', '25%', 0.72]],
    ['atom', '89%', '38%', 102, 10, 0.175, 'c', 41, -14, ['70%', '52%', 0.72]],
    ['trophyCup', '1.5%', '34%', 88, 6, 0.166, 'd', 35, -5],
    ['protractor', '44%', '50%', 128, -8, 0.158, 'a', 43, -27],
    ['musicNotes', '4%', '82%', 78, -8, 0.175, 'b', 31, -17],
    ['conicalFlask', '34%', '84%', 88, -7, 0.166, 'c', 36, -31],
    ['palette', '82%', '84%', 106, 7, 0.184, 'd', 39, -11, ['68%', '89%', 0.74]],
  ],
  /* Admissions & Contact: Admissions Band, Office Details & Inquiry Form (#F8FAFC) */
  contact: [
    ['envelope', '84%', '3%', 108, -7, 0.193, 'b', 36, -9, ['68%', '2%', 0.74]],
    ['graduationCap', '56%', '18%', 120, 6, 0.175, 'a', 34, -22, ['68%', '24%', 0.72]],
    ['compass', '38%', '36%', 96, -8, 0.166, 'c', 39, -13, ['72%', '48%', 0.72]],
    ['globe', '90%', '44%', 92, -5, 0.175, 'd', 43, -5],
    ['fountainNib', '1.5%', '44%', 72, 18, 0.166, 'a', 32, -27],
    ['clockFace', '40%', '72%', 88, 5, 0.166, 'b', 41, -17, ['72%', '72%', 0.72]],
    ['ruler', '6%', '90%', 138, -9, 0.175, 'c', 44, -31],
    ['openBook', '81%', '88%', 120, -6, 0.184, 'd', 38, -11, ['66%', '92%', 0.72]],
  ],
  /* School Portal: Availability Notice & Planned Portal Sections (#F8FAFC) */
  portal: [
    ['graduationCap', '84%', '5%', 122, -6, 0.193, 'a', 36, -7, ['66%', '2%', 0.74]],
    ['documentSheet', '2%', '14%', 88, 7, 0.184, 'c', 38, -20],
    ['eqEmc2', '58%', '44%', 114, -3, 0.175, 'b', 34, -12, ['64%', '42%', 0.72]],
    ['atom', '88%', '44%', 104, 11, 0.184, 'd', 42, -28],
    ['compass', '2.5%', '54%', 94, 8, 0.175, 'a', 37, -4, ['72%', '68%', 0.72]],
    ['protractor', '30%', '68%', 126, -8, 0.158, 'c', 41, -16],
    ['openBook', '80%', '84%', 120, -5, 0.184, 'b', 39, -31, ['66%', '90%', 0.74]],
    ['sigma', '10%', '88%', 60, 5, 0.175, 'd', 30, -10],
  ],
  /* News Article: Full School Notice & Other School Notices (#F8FAFC) */
  article: [
    ['documentSheet', '87%', '6%', 90, -6, 0.184, 'b', 38, -8, ['74%', '2%', 0.74]],
    ['envelope', '2.5%', '10%', 106, -7, 0.184, 'd', 36, -22],
    ['fountainNib', '89%', '36%', 74, 18, 0.175, 'a', 33, -13, ['76%', '38%', 0.72]],
    ['openBook', '2%', '44%', 118, 6, 0.184, 'c', 41, -5],
    ['protractor', '60%', '56%', 128, -8, 0.166, 'b', 43, -27, ['66%', '66%', 0.72]],
    ['graduationCap', '84%', '68%', 118, 6, 0.184, 'd', 37, -17],
    ['compass', '3%', '76%', 94, 9, 0.175, 'a', 39, -31],
    ['pencil', '74%', '90%', 120, -14, 0.175, 'c', 32, -11, ['64%', '92%', 0.74]],
  ],
};

interface SectionStemBackdropProps {
  variant: SectionBackdropVariant;
}

/**
 * Soft crest-blue (#115191) school & STEM blueprint backdrop for light and
 * white sections. Automatically pauses off-screen and when the browser tab is
 * hidden, renders completely static under `prefers-reduced-motion: reduce`,
 * and hides cleanly when printed.
 */
export default function SectionStemBackdrop({
  variant,
}: SectionStemBackdropProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { active } = useViewportActivity(fieldRef, {
    threshold: 0,
    disabled: reducedMotion,
  });
  const items = SECTION_VARIANT_MOTIFS[variant];

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-paused={active ? 'false' : 'true'}
      data-section-variant={variant}
      className="section-stem-field pointer-events-none select-none absolute inset-0 overflow-hidden text-primary"
    >
      {items.map(
        (
          [motif, left, top, width, tilt, opacity, drift, duration, delay, mobile],
          idx
        ) => (
          <div
            key={`${motif}-${idx}`}
            className={`section-stem-item absolute ${
              mobile ? '' : 'hidden sm:block'
            }`}
            style={
              {
                '--s-x': left,
                '--s-y': top,
                '--s-mx': mobile ? mobile[0] : left,
                '--s-my': mobile ? mobile[1] : top,
                '--s-mscale': String(mobile ? mobile[2] : 1),
                '--stem-tilt': `${tilt}deg`,
                width: `${width}px`,
                opacity,
              } as CSSProperties
            }
          >
            <div
              data-drift={drift}
              className="section-stem-float"
              style={
                {
                  '--stem-duration': `${duration}s`,
                  '--stem-delay': `${delay}s`,
                } as CSSProperties
              }
            >
              {STEM_ART[motif]}
            </div>
          </div>
        )
      )}
    </div>
  );
}
