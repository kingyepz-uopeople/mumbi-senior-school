'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type DriftVariant = 'a' | 'b' | 'c' | 'd';

interface StemMotif {
  id: string;
  /** Desktop horizontal anchor (%) */
  left: string;
  /** Desktop vertical anchor (%) */
  top: string;
  /** Rendered width in px on desktop (scales slightly smaller on mobile) */
  width: number;
  /** Static resting rotation in degrees so the sheet reads like a drafting table */
  tilt: number;
  /** Stroke opacity in 0.06–0.115 range to keep WCAG AA/AAA text contrast intact */
  opacity: number;
  /** Brand-consistent stroke tone: crisp white or soft crest blue-100 */
  tone: 'white' | 'blue';
  /** Which of the 4 sinusoidal CSS drift/rotation keyframes to run */
  drift: DriftVariant;
  /** Loop duration in seconds (22–40s, non-harmonic so nothing syncs) */
  duration: number;
  /** Negative start offset in seconds so every item begins mid-phase */
  delay: number;
  /** Parallax depth group on desktop pointer devices */
  layer: 'near' | 'far';
  /** Whether to render on compact mobile viewports (<640px) */
  mobile?: boolean;
  /** Optional mobile anchor & scale overrides so items frame edges without crowding text */
  mobilePos?: { left: string; top: string; scale: number };
  svg: ReactNode;
}

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const MOTIFS: StemMotif[] = [
  {
    id: 'protractor',
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
    mobile: true,
    mobilePos: { left: '66%', top: '2%', scale: 0.74 },
    svg: (
      <svg viewBox="0 0 120 68" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M8 58 A52 52 0 0 1 112 58 L112 63 L8 63 Z" />
        <path d="M28 54 A32 32 0 0 1 92 54 Z" />
        <circle cx="60" cy="58" r="2" />
        <path d="M55 58 H65 M60 53 V61" />
        {/* Major 30° ticks */}
        <path d="M60 6 V13 M86 13 L82.5 19 M34 13 L37.5 19 M105 32 L99 35.5 M15 32 L21 35.5" />
        {/* Minor 15° ticks */}
        <path d="M73.5 7.8 L72.4 11.8 M46.5 7.8 L47.6 11.8 M96.8 21.2 L93.9 24.1 M23.2 21.2 L26.1 24.1 M110.2 44.5 L106.2 45.6 M9.8 44.5 L13.8 45.6" />
      </svg>
    ),
  },
  {
    id: 'atom',
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
    mobile: true,
    mobilePos: { left: '73%', top: '37%', scale: 0.74 },
    svg: (
      <svg viewBox="0 0 104 104" className="w-full h-auto" {...STROKE_PROPS}>
        <circle cx="52" cy="52" r="4.2" />
        <ellipse cx="52" cy="52" rx="44" ry="17" />
        <ellipse
          cx="52"
          cy="52"
          rx="44"
          ry="17"
          transform="rotate(60 52 52)"
        />
        <ellipse
          cx="52"
          cy="52"
          rx="44"
          ry="17"
          transform="rotate(120 52 52)"
        />
        <circle cx="96" cy="52" r="2.4" />
        <circle cx="30" cy="13.9" r="2.4" />
        <circle cx="30" cy="90.1" r="2.4" />
      </svg>
    ),
  },
  {
    id: 'compass',
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
    mobile: true,
    mobilePos: { left: '74%', top: '62%', scale: 0.72 },
    svg: (
      <svg viewBox="0 0 92 112" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M43.5 6 H48.5 M46 6 V17" />
        <circle cx="46" cy="23" r="6" />
        <circle cx="46" cy="23" r="1.8" />
        {/* Left needle leg */}
        <path d="M42 28 L22 86 L25.5 86 L45 29 M23.6 86 L19.8 99" />
        {/* Right leg + clamped drafting pencil */}
        <path d="M50 28 L65.5 73 L62 74 L47 29" />
        <path d="M61.5 72 L73 68.5 M67 61 L71.5 59.8 L77 88 L75.5 98 L72.2 89.2 Z" />
        {/* Adjusting screw bar & thumbwheel */}
        <path d="M27 56 H64 M46 51 V61 M43.5 52.8 V59.2 M48.5 52.8 V59.2" />
        {/* Swept construction arc */}
        <path d="M44 105 A54 22 0 0 0 84 96" strokeDasharray="3 3.5" />
      </svg>
    ),
  },
  {
    id: 'set-square',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 96 96" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M10 10 V86 H86 Z" />
        <path d="M23 40 V73 H56 Z" />
        <path d="M23 66 H30 V73" />
        {/* Vertical & base millimetre graduations */}
        <path d="M10 24 H15 M10 32 H13.5 M10 40 H15 M10 48 H13.5 M10 56 H15 M10 64 H13.5 M10 72 H15" />
        <path d="M24 86 V81 M32 86 V82.5 M40 86 V81 M48 86 V82.5 M56 86 V81 M64 86 V82.5 M72 86 V81" />
      </svg>
    ),
  },
  {
    id: 'ruler',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 140 38" className="w-full h-auto" {...STROKE_PROPS}>
        <rect x="4" y="7" width="132" height="24" rx="2" />
        <circle cx="125" cy="19" r="3.2" />
        <path d="M14 7 V16 M20 7 V12 M26 7 V16 M32 7 V12 M38 7 V16 M44 7 V12 M50 7 V16 M56 7 V12 M62 7 V16 M68 7 V12 M74 7 V16 M80 7 V12 M86 7 V16 M92 7 V12 M98 7 V16 M104 7 V12 M110 7 V16" />
        <path d="M12 25.5 H112" />
      </svg>
    ),
  },
  {
    id: 'pencil',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 112 28" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M12 8 H8 A3 3 0 0 0 8 20 H12" />
        <rect x="12" y="8" width="10" height="12" />
        <path d="M15.5 8 V20 M18.5 8 V20" />
        <path d="M22 8 H84 M22 20 H84 M22 12 H83 M22 16 H83" />
        <path d="M84 8 Q81 10 84 12 Q81 14 84 16 Q81 18 84 20" />
        <path d="M84 8 L106 14 L84 20 M99 12.1 V15.9" />
      </svg>
    ),
  },
  {
    id: 'conical-flask',
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
    mobile: true,
    mobilePos: { left: '75%', top: '82%', scale: 0.76 },
    svg: (
      <svg viewBox="0 0 84 100" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M29 10 H55 M31 10 V14 H53 V10" />
        <path d="M33 14 V34 L13 82 A6 6 0 0 0 18.5 90 H65.5 A6 6 0 0 0 71 82 L51 34 V14" />
        <path d="M20.5 65 Q31.5 61.5 42 65 T63.5 65" />
        <path d="M47 51 H53 M51 59 H56 M55 70 H62 M58 78 H64" />
        <circle cx="35" cy="76" r="2.2" />
        <circle cx="44" cy="72" r="1.6" />
        <circle cx="39" cy="54" r="1.5" />
      </svg>
    ),
  },
  {
    id: 'beaker',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 80 90" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M12 14 L18 20 V76 A6 6 0 0 0 24 82 H60 A6 6 0 0 0 66 76 V16 L69 14 Z" />
        <path d="M18 54 Q30 51 42 54 T66 54" />
        <path d="M48 30 H58 M51 38 H58 M48 46 H58 M51 62 H58 M48 70 H58" />
      </svg>
    ),
  },
  {
    id: 'open-book',
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
    mobile: true,
    mobilePos: { left: '2%', top: '85%', scale: 0.74 },
    svg: (
      <svg viewBox="0 0 112 80" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M56 20 C44 13 24 12 12 16 V62 C24 58 44 59 56 66" />
        <path d="M56 20 C68 13 88 12 100 16 V62 C88 58 68 59 56 66" />
        <path d="M56 20 V66" />
        <path d="M8 20 V66 C22 62 43 63 56 70 C69 63 90 62 104 66 V20" />
        {/* Ruled book lines */}
        <path d="M20 27 C30 25 40 26 48 29 M20 35 C30 33 40 34 48 37 M20 43 C30 41 40 42 48 45 M20 51 C30 49 40 50 48 53" />
        <path d="M92 27 C82 25 72 26 64 29 M92 35 C82 33 72 34 64 37 M92 43 C82 41 72 42 64 45 M92 51 C82 49 72 50 64 53" />
      </svg>
    ),
  },
  {
    id: 'graduation-cap',
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
    mobile: true,
    mobilePos: { left: '42%', top: '11%', scale: 0.7 },
    svg: (
      <svg viewBox="0 0 112 76" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M56 12 L102 31 L56 50 L10 31 Z" />
        <path d="M10 31 V34.5 L56 53.5 L102 34.5 V31" />
        <path d="M30 42 V56 C40 64 72 64 82 56 V42" />
        <circle cx="56" cy="31" r="2.2" />
        <path d="M56 31 L92 38.5 V54.5" />
        <circle cx="92" cy="56.5" r="1.8" />
        <path d="M89 65 L92 58.3 L95 65 M92 58.3 V66" />
      </svg>
    ),
  },
  {
    id: 'symbol-pi',
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
    mobile: true,
    mobilePos: { left: '82%', top: '19%', scale: 0.8 },
    svg: (
      <svg viewBox="0 0 56 52" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M10 16.5 C14 13 18 13 23 13 H46" />
        <path d="M22 13 C21 25 19 35 15 42" />
        <path d="M36 13 V35 C36 40 38.5 42 42 42 C44.5 42 46.2 40.5 47 38.5" />
      </svg>
    ),
  },
  {
    id: 'symbol-sqrt',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 76 52" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M7 29 L12.5 26 L22 43 L35 10 H68" />
        <path d="M45 24 C48 24 50 28 53 35 C55 39 57 40 59 38 M59 24 L44 39" />
      </svg>
    ),
  },
  {
    id: 'symbol-sigma',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 54 60" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M43 16 V10 H12 L30 30 L12 50 H43 V43" />
      </svg>
    ),
  },
  {
    id: 'symbol-angle',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 64 56" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M48 11 L10 46 H56" />
        <path d="M31 46 A21 21 0 0 0 25.4 31.8" />
        <ellipse
          cx="40"
          cy="33"
          rx="4"
          ry="6"
          transform="rotate(10 40 33)"
        />
        <path d="M36 33 H44" />
      </svg>
    ),
  },
  {
    id: 'eq-pythagoras',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 146 40" className="w-full h-auto" {...STROKE_PROPS}>
        {/* a² */}
        <ellipse cx="13" cy="25" rx="5.5" ry="6.5" />
        <path d="M18.5 18.5 V31.5" />
        <path d="M23 11.5 C23 9 28.5 9 28.5 12 C28.5 14.5 23 17 23 18.5 H29" />
        {/* + */}
        <path d="M43 19 V30 M37.5 24.5 H48.5" />
        {/* b² */}
        <path d="M59 11 V31.5" />
        <ellipse cx="64.5" cy="25" rx="5.5" ry="6.5" />
        <path d="M74 11.5 C74 9 79.5 9 79.5 12 C79.5 14.5 74 17 74 18.5 H80" />
        {/* = */}
        <path d="M91 22 H103 M91 27.5 H103" />
        {/* c² */}
        <path d="M124 20.5 A6.5 6.5 0 1 0 124 29.5" />
        <path d="M129 11.5 C129 9 134.5 9 134.5 12 C134.5 14.5 129 17 129 18.5 H135" />
      </svg>
    ),
  },
  {
    id: 'eq-emc2',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 116 40" className="w-full h-auto" {...STROKE_PROPS}>
        {/* E */}
        <path d="M21 13 H10 V31 H21 M10 22 H19" />
        {/* = */}
        <path d="M32 20 H44 M32 25.5 H44" />
        {/* m */}
        <path d="M56 19.5 V31 M56 23 A4.5 4 0 0 1 65 23 V31 M65 23 A4.5 4 0 0 1 74 23 V31" />
        {/* c² */}
        <path d="M93 20.5 A6 6 0 1 0 93 29.5" />
        <path d="M99 11.5 C99 9 104.5 9 104.5 12 C104.5 14.5 99 17 99 18.5 H105" />
      </svg>
    ),
  },
  {
    id: 'sine-plot',
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
    mobile: false,
    svg: (
      <svg viewBox="0 0 116 56" className="w-full h-auto" {...STROKE_PROPS}>
        <path d="M8 28 H108 M104 24.5 L108.5 28 L104 31.5" />
        <path d="M18 48 V8 M14.5 12 L18 7.5 L21.5 12" />
        <path d="M18 28 C26 8 38 8 46 28 S66 48 74 28 S94 8 102 28" />
        <path d="M15 13 H21 M15 43 H21" />
      </svg>
    ),
  },
];

const NEAR_MOTIFS = MOTIFS.filter((m) => m.layer === 'near');
const FAR_MOTIFS = MOTIFS.filter((m) => m.layer === 'far');

function MotifGroup({ items }: { items: StemMotif[] }) {
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className={`hero-stem-item absolute ${
            item.mobile ? '' : 'hidden sm:block'
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
            {item.svg}
          </div>
        </div>
      ))}
    </>
  );
}

/**
 * Decorative animated school & STEM line-art layer for the homepage hero.
 * - Pure inline stroke SVGs at 6–11% opacity (zero images, zero icon libraries).
 * - Pauses CSS drift when scrolled off-screen or when the browser tab is hidden.
 * - Optional subtle damped pointer parallax on desktop fine-pointer devices only.
 * - Renders completely static under `prefers-reduced-motion: reduce`.
 */
export default function HeroStemBackdrop() {
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || typeof window === 'undefined') return;

    const section = field.closest('section') ?? field;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const desktopPointer = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (min-width: 1024px)'
    );

    let inView = true;
    let tabHidden = document.hidden;

    const syncPauseState = () => {
      const paused = !inView || tabHidden || reducedMotion.matches;
      field.dataset.paused = paused ? 'true' : 'false';
      if (paused) {
        targetX = 0;
        targetY = 0;
      }
    };

    // Subtle damped desktop parallax via two CSS custom properties (no React re-renders)
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;

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
      const rect = section.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      // Keep amplitude gentle (±9px x, ±6px y) so it feels tactile, never distracting
      targetX = Math.max(-1, Math.min(1, nx)) * -9;
      targetY = Math.max(-1, Math.min(1, ny)) * -6;
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

    observer?.observe(section);

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
    section.addEventListener('pointermove', onPointerMove, { passive: true });
    section.addEventListener('pointerleave', onPointerLeave, { passive: true });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      reducedMotion.removeEventListener('change', onMotionChange);
      section.removeEventListener('pointermove', onPointerMove);
      section.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-paused="false"
      className="hero-stem-field pointer-events-none select-none absolute inset-0 z-[2] overflow-hidden"
    >
      <div className="hero-stem-layer-far absolute inset-0">
        <MotifGroup items={FAR_MOTIFS} />
      </div>
      <div className="hero-stem-layer-near absolute inset-0">
        <MotifGroup items={NEAR_MOTIFS} />
      </div>
    </div>
  );
}
