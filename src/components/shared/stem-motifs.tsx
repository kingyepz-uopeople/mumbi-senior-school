import type { ReactNode } from 'react';

export type StemDriftVariant = 'a' | 'b' | 'c' | 'd';

export type StemMotifKey =
  | 'protractor'
  | 'compass'
  | 'setSquare'
  | 'ruler'
  | 'pencil'
  | 'conicalFlask'
  | 'beaker'
  | 'atom'
  | 'microscope'
  | 'dnaHelix'
  | 'openBook'
  | 'graduationCap'
  | 'fountainNib'
  | 'documentSheet'
  | 'envelope'
  | 'globe'
  | 'musicNotes'
  | 'trophyCup'
  | 'sportsBall'
  | 'palette'
  | 'clockFace'
  | 'cameraFrame'
  | 'pi'
  | 'sqrt'
  | 'sigma'
  | 'angle'
  | 'eqPythagoras'
  | 'eqEmc2'
  | 'sinePlot';

const STROKE_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * Shared library of pure inline stroke-only school, STEM, arts, sports, and
 * editorial drawings (zero image files, zero external icon packs), reused by
 * both `HeroStemBackdrop` (dark crest-blue heroes) and `SectionStemBackdrop`
 * (white and #F8FAFC content sections).
 */
export const STEM_ART: Record<StemMotifKey, ReactNode> = {
  protractor: (
    <svg viewBox="0 0 120 68" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M8 58 A52 52 0 0 1 112 58 L112 63 L8 63 Z" />
      <path d="M28 54 A32 32 0 0 1 92 54 Z" />
      <circle cx="60" cy="58" r="2" />
      <path d="M55 58 H65 M60 53 V61" />
      <path d="M60 6 V13 M86 13 L82.5 19 M34 13 L37.5 19 M105 32 L99 35.5 M15 32 L21 35.5" />
      <path d="M73.5 7.8 L72.4 11.8 M46.5 7.8 L47.6 11.8 M96.8 21.2 L93.9 24.1 M23.2 21.2 L26.1 24.1 M110.2 44.5 L106.2 45.6 M9.8 44.5 L13.8 45.6" />
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 92 112" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M43.5 6 H48.5 M46 6 V17" />
      <circle cx="46" cy="23" r="6" />
      <circle cx="46" cy="23" r="1.8" />
      <path d="M42 28 L22 86 L25.5 86 L45 29 M23.6 86 L19.8 99" />
      <path d="M50 28 L65.5 73 L62 74 L47 29" />
      <path d="M61.5 72 L73 68.5 M67 61 L71.5 59.8 L77 88 L75.5 98 L72.2 89.2 Z" />
      <path d="M27 56 H64 M46 51 V61 M43.5 52.8 V59.2 M48.5 52.8 V59.2" />
      <path d="M44 105 A54 22 0 0 0 84 96" strokeDasharray="3 3.5" />
    </svg>
  ),
  setSquare: (
    <svg viewBox="0 0 96 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M10 10 V86 H86 Z" />
      <path d="M23 40 V73 H56 Z" />
      <path d="M23 66 H30 V73" />
      <path d="M10 24 H15 M10 32 H13.5 M10 40 H15 M10 48 H13.5 M10 56 H15 M10 64 H13.5 M10 72 H15" />
      <path d="M24 86 V81 M32 86 V82.5 M40 86 V81 M48 86 V82.5 M56 86 V81 M64 86 V82.5 M72 86 V81" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 140 38" className="w-full h-auto" {...STROKE_PROPS}>
      <rect x="4" y="7" width="132" height="24" rx="2" />
      <circle cx="125" cy="19" r="3.2" />
      <path d="M14 7 V16 M20 7 V12 M26 7 V16 M32 7 V12 M38 7 V16 M44 7 V12 M50 7 V16 M56 7 V12 M62 7 V16 M68 7 V12 M74 7 V16 M80 7 V12 M86 7 V16 M92 7 V12 M98 7 V16 M104 7 V12 M110 7 V16" />
      <path d="M12 25.5 H112" />
    </svg>
  ),
  pencil: (
    <svg viewBox="0 0 112 28" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 8 H8 A3 3 0 0 0 8 20 H12" />
      <rect x="12" y="8" width="10" height="12" />
      <path d="M15.5 8 V20 M18.5 8 V20" />
      <path d="M22 8 H84 M22 20 H84 M22 12 H83 M22 16 H83" />
      <path d="M84 8 Q81 10 84 12 Q81 14 84 16 Q81 18 84 20" />
      <path d="M84 8 L106 14 L84 20 M99 12.1 V15.9" />
    </svg>
  ),
  conicalFlask: (
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
  beaker: (
    <svg viewBox="0 0 80 90" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 14 L18 20 V76 A6 6 0 0 0 24 82 H60 A6 6 0 0 0 66 76 V16 L69 14 Z" />
      <path d="M18 54 Q30 51 42 54 T66 54" />
      <path d="M48 30 H58 M51 38 H58 M48 46 H58 M51 62 H58 M48 70 H58" />
    </svg>
  ),
  atom: (
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
  microscope: (
    <svg viewBox="0 0 88 108" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M49 8 L59 12 L56.5 18 L46.5 14 Z" />
      <path d="M47.5 14.5 L38 38 L47 41.5 L56 18" />
      <path d="M36 37.5 L49 42.8 M38.5 40 L35 49 L39.5 50.8 L43 41.8 M44.5 42.2 L45.5 48.5" />
      <path d="M18 58 H52 M24 55.5 H44" />
      <path d="M51.5 30 C68 35 72 56 60 74 C55 81 47 84 40 84" />
      <circle cx="57" cy="44" r="5" />
      <circle cx="57" cy="44" r="1.8" />
      <path d="M34 58 V64 M27 73 L41 69 M34 71 V84 M54 79 V92" />
      <path d="M16 92 H72 A3 3 0 0 1 75 95 V98 H13 V95 A3 3 0 0 1 16 92 Z" />
    </svg>
  ),
  dnaHelix: (
    <svg viewBox="0 0 64 108" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M16 8 C48 22 48 42 32 54 C16 66 16 86 48 100" />
      <path d="M48 8 C16 22 16 42 32 54 C48 66 48 86 16 100" />
      <path d="M23 15 H41 M21 25 H43 M23 35 H41 M26 44 H38" />
      <path d="M26 64 H38 M23 73 H41 M21 83 H43 M23 93 H41" />
    </svg>
  ),
  openBook: (
    <svg viewBox="0 0 112 80" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M56 20 C44 13 24 12 12 16 V62 C24 58 44 59 56 66" />
      <path d="M56 20 C68 13 88 12 100 16 V62 C88 58 68 59 56 66" />
      <path d="M56 20 V66" />
      <path d="M8 20 V66 C22 62 43 63 56 70 C69 63 90 62 104 66 V20" />
      <path d="M20 27 C30 25 40 26 48 29 M20 35 C30 33 40 34 48 37 M20 43 C30 41 40 42 48 45 M20 51 C30 49 40 50 48 53" />
      <path d="M92 27 C82 25 72 26 64 29 M92 35 C82 33 72 34 64 37 M92 43 C82 41 72 42 64 45 M92 51 C82 49 72 50 64 53" />
    </svg>
  ),
  graduationCap: (
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
  fountainNib: (
    <svg viewBox="0 0 68 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M34 8 L53 47 L46.5 69 H21.5 L15 47 Z" />
      <path d="M34 8 V40.5" />
      <circle cx="34" cy="44.8" r="4" />
      <rect x="19" y="69" width="30" height="7" rx="1.5" />
      <path d="M22 76 V87 M46 76 V87" />
    </svg>
  ),
  documentSheet: (
    <svg viewBox="0 0 78 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M12 8 H52 L66 22 V88 H12 Z" />
      <path d="M52 8 V22 H66" />
      <circle cx="24" cy="22" r="4.2" />
      <path d="M33 20 H46 M33 25 H43" />
      <path d="M20 38 H58 M20 47 H58 M20 56 H58 M20 65 H51 M20 76 H37" />
      <path d="M44 77 Q48 73 51 77 T58 76" />
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 104 72" className="w-full h-auto" {...STROKE_PROPS}>
      <rect x="8" y="12" width="88" height="50" rx="2.5" />
      <path d="M9.5 13.5 L52 43 L94.5 13.5" />
      <path d="M9.5 60.5 L36 36 M94.5 60.5 L68 36" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 84 104" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="25" />
      <ellipse
        cx="42"
        cy="42"
        rx="11.5"
        ry="25"
        transform="rotate(-15 42 42)"
      />
      <path d="M18 48.5 Q42 43.5 66 35.5" />
      <path d="M21 35 Q41 31 60 25 M24 59.5 Q43 55.5 63 49" />
      <path d="M35 12 L36 17.5 M48.5 66.5 L50 72" />
      <path d="M34 11.5 A31 31 0 0 1 51 72.5" />
      <path d="M42 73.5 V90 M25 90 H59 M30 86 H54" />
    </svg>
  ),
  musicNotes: (
    <svg viewBox="0 0 78 78" className="w-full h-auto" {...STROKE_PROPS}>
      <ellipse
        cx="20"
        cy="58"
        rx="7.8"
        ry="5.6"
        transform="rotate(-18 20 58)"
      />
      <ellipse
        cx="56"
        cy="51"
        rx="7.8"
        ry="5.6"
        transform="rotate(-18 56 51)"
      />
      <path d="M27.4 56 V18 L63.4 11 V49 M27.4 26 L63.4 19" />
    </svg>
  ),
  trophyCup: (
    <svg viewBox="0 0 88 96" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M22 14 H66 V34 A22 22 0 0 1 22 34 Z" />
      <path d="M22 20 H66" />
      <path d="M22 19 H12 C11 32 16 40 25 41" />
      <path d="M66 19 H76 C77 32 72 40 63 41" />
      <path d="M44 56 V74 M38 64 H50" />
      <path d="M30 74 H58 V80 H30 Z M23 80 H65 V86 H23 Z" />
    </svg>
  ),
  sportsBall: (
    <svg viewBox="0 0 84 84" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="31" />
      <path d="M11 42 Q42 36 73 42" />
      <path d="M42 11 Q36 42 42 73" />
      <path d="M20 20.5 C33 32 33 52 20 63.5" />
      <path d="M64 20.5 C51 32 51 52 64 63.5" />
    </svg>
  ),
  palette: (
    <svg viewBox="0 0 100 84" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M49 13 C73 13 88 27 86 45 C84 57 74 61 65 57 C58 54 53 59 54 66 C55 72 47 74 39 72 C19 68 10 53 12 37 C14 21 29 13 49 13 Z" />
      <ellipse
        cx="43"
        cy="60"
        rx="5.2"
        ry="3.8"
        transform="rotate(-12 43 60)"
      />
      <circle cx="25" cy="42" r="3.8" />
      <circle cx="31" cy="27" r="3.8" />
      <circle cx="48" cy="22" r="3.8" />
      <circle cx="64" cy="27" r="3.8" />
      <path d="M63 72 L87 19 M87 19 C91 16 92 12 90 9 C87 11 84 14 84 18 Z" />
    </svg>
  ),
  clockFace: (
    <svg viewBox="0 0 84 84" className="w-full h-auto" {...STROKE_PROPS}>
      <circle cx="42" cy="42" r="32" />
      <path d="M42 13 V19 M71 42 H65 M42 71 V65 M13 42 H19" />
      <path d="M56.5 16.9 L54.5 20.3 M67.1 27.5 L63.7 29.5 M67.1 56.5 L63.7 54.5 M56.5 67.1 L54.5 63.7 M27.5 67.1 L29.5 63.7 M16.9 56.5 L20.3 54.5 M16.9 27.5 L20.3 29.5 M27.5 16.9 L29.5 20.3" />
      <circle cx="42" cy="42" r="2.2" />
      <path d="M42 39.8 V22 M40.1 43.1 L27.5 50.5" />
    </svg>
  ),
  cameraFrame: (
    <svg viewBox="0 0 100 76" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M34 18 L39 11 H61 L66 18 H84 A6 6 0 0 1 90 24 V60 A6 6 0 0 1 84 66 H16 A6 6 0 0 1 10 60 V24 A6 6 0 0 1 16 18 Z" />
      <path d="M20 18 V14 H28 V18" />
      <circle cx="50" cy="43" r="15.5" />
      <circle cx="50" cy="43" r="10" />
      <path d="M44.5 37.5 A8 8 0 0 1 53 35.5" />
      <rect x="73" y="25" width="9" height="6" rx="1" />
    </svg>
  ),
  pi: (
    <svg viewBox="0 0 56 52" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M10 16.5 C14 13 18 13 23 13 H46" />
      <path d="M22 13 C21 25 19 35 15 42" />
      <path d="M36 13 V35 C36 40 38.5 42 42 42 C44.5 42 46.2 40.5 47 38.5" />
    </svg>
  ),
  sqrt: (
    <svg viewBox="0 0 76 52" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M7 29 L12.5 26 L22 43 L35 10 H68" />
      <path d="M45 24 C48 24 50 28 53 35 C55 39 57 40 59 38 M59 24 L44 39" />
    </svg>
  ),
  sigma: (
    <svg viewBox="0 0 54 60" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M43 16 V10 H12 L30 30 L12 50 H43 V43" />
    </svg>
  ),
  angle: (
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
  eqPythagoras: (
    <svg viewBox="0 0 146 40" className="w-full h-auto" {...STROKE_PROPS}>
      <ellipse cx="13" cy="25" rx="5.5" ry="6.5" />
      <path d="M18.5 18.5 V31.5" />
      <path d="M23 11.5 C23 9 28.5 9 28.5 12 C28.5 14.5 23 17 23 18.5 H29" />
      <path d="M43 19 V30 M37.5 24.5 H48.5" />
      <path d="M59 11 V31.5" />
      <ellipse cx="64.5" cy="25" rx="5.5" ry="6.5" />
      <path d="M74 11.5 C74 9 79.5 9 79.5 12 C79.5 14.5 74 17 74 18.5 H80" />
      <path d="M91 22 H103 M91 27.5 H103" />
      <path d="M124 20.5 A6.5 6.5 0 1 0 124 29.5" />
      <path d="M129 11.5 C129 9 134.5 9 134.5 12 C134.5 14.5 129 17 129 18.5 H135" />
    </svg>
  ),
  eqEmc2: (
    <svg viewBox="0 0 116 40" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M21 13 H10 V31 H21 M10 22 H19" />
      <path d="M32 20 H44 M32 25.5 H44" />
      <path d="M56 19.5 V31 M56 23 A4.5 4 0 0 1 65 23 V31 M65 23 A4.5 4 0 0 1 74 23 V31" />
      <path d="M93 20.5 A6 6 0 1 0 93 29.5" />
      <path d="M99 11.5 C99 9 104.5 9 104.5 12 C104.5 14.5 99 17 99 18.5 H105" />
    </svg>
  ),
  sinePlot: (
    <svg viewBox="0 0 116 56" className="w-full h-auto" {...STROKE_PROPS}>
      <path d="M8 28 H108 M104 24.5 L108.5 28 L104 31.5" />
      <path d="M18 48 V8 M14.5 12 L18 7.5 L21.5 12" />
      <path d="M18 28 C26 8 38 8 46 28 S66 48 74 28 S94 8 102 28" />
      <path d="M15 13 H21 M15 43 H21" />
    </svg>
  ),
};
