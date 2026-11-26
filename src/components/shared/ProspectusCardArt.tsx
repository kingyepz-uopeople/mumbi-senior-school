import type { ReactNode } from 'react';

export type ProspectusArtKey =
  | 'academic-excellence'
  | 'integrity-accountability'
  | 'discipline-governance'
  | 'innovation-creativity'
  | 'faith-morality'
  | 'inclusivity-respect'
  | 'girl-guides'
  | 'st-john'
  | 'red-cross'
  | 'journalism'
  | 'drama'
  | 'wildlife'
  | 'integrity-club'
  | 'volleyball'
  | 'netball'
  | 'basketball'
  | 'hockey'
  | 'athletics'
  | 'handball'
  | 'badminton'
  | 'christian-union'
  | 'young-christian-students'
  | 'sda-fellowship'
  | 'muslim-association'
  | 'dining-hall'
  | 'school-uniform'
  | 'boarding-welfare';

const PRIMARY_STROKE = {
  fill: 'none',
  stroke: '#115191',
  strokeWidth: 2.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const DEEP_STROKE = {
  fill: 'none',
  stroke: '#0C3D6E',
  strokeWidth: 2.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const ART: Record<ProspectusArtKey, ReactNode> = {
  'academic-excellence': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 96C64 84 47 79 25 81V34c22-2 39 3 55 15 16-12 33-17 55-15v47c-22-2-39 3-55 15Z" />
        <path d="M25 46c22-2 39 3 55 15 16-12 33-17 55-15M25 59c22-2 39 3 55 15 16-12 33-17 55-15" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M80 49v47M49 43l13 4M49 56l13 4M49 69l13 4M111 43l-13 4M111 56l-13 4M111 69l-13 4" />
        <path d="m80 17 3.5 7.5 8 1-5.8 5.5 1.5 8-7.2-4-7.2 4 1.5-8-5.8-5.5 8-1Z" />
      </g>
    </>
  ),
  'integrity-accountability': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 18 123 34v26c0 24-18 39-43 50C55 99 37 84 37 60V34l43-16Z" />
        <path d="m59 61 14 14 29-31" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M25 47c-7 8-10 17-10 28M135 47c7 8 10 17 10 28M19 77l-4-2 1-5M141 77l4-2-1-5" />
        <path d="M64 91c5 4 10 7 16 10 6-3 11-6 16-10" />
      </g>
    </>
  ),
  'discipline-governance': (
    <>
      <g {...PRIMARY_STROKE}>
        <rect x="39" y="24" width="82" height="83" rx="9" />
        <path d="M63 24v-7h34v7M55 51h9m12 0h33M55 69h9m12 0h33M55 87h9m12 0h33" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="m55 50 3 3 6-7M55 68l3 3 6-7M55 86l3 3 6-7" />
        <path d="M80 18v-6m31 19 5-4M49 31l-5-4" />
      </g>
    </>
  ),
  'innovation-creativity': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M54 53a26 26 0 1 1 52 0c0 11-6 17-13 25-4 4-5 8-5 13H72c0-5-1-9-5-13-7-8-13-14-13-25Z" />
        <path d="M72 99h16m-13 8h10M80 14V7m32 13 5-5M48 20l-5-5m-7 38h-7m103 0h-7" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="m80 35 5 12 13 1-10 8 3 13-11-7-11 7 3-13-10-8 13-1Z" />
        <path d="m121 77 18 18-7 7-18-18M117 73l8-8 8 8-8 8" />
      </g>
    </>
  ),
  'faith-morality': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 70C65 57 48 53 28 55v43c20-2 37 2 52 15 15-13 32-17 52-15V55c-20-2-37 2-52 15Z" />
        <path d="M80 70v43M28 69c20-2 37 2 52 15 15-13 32-17 52-15" />
        <path d="M80 17c-7 10-12 16-12 24a12 12 0 0 0 24 0c0-8-5-14-12-24Z" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M48 84h17m-17 10h17m30-10h17m-17 10h17" />
        <path d="M80 29v16m-6-8h12" />
      </g>
    </>
  ),
  'inclusivity-respect': (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="80" cy="37" r="15" />
        <circle cx="42" cy="49" r="12" />
        <circle cx="118" cy="49" r="12" />
        <path d="M50 101c1-22 12-35 30-35s29 13 30 35M18 99c1-19 9-30 24-30 7 0 13 2 17 7m83 23c-1-19-9-30-24-30-7 0-13 2-17 7" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M43 85c10 4 23 6 37 6s27-2 37-6M61 110h38" />
        <path d="M80 10v6M21 30l5 4m108-4-5 4" />
      </g>
    </>
  ),
  'girl-guides': (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="77" cy="62" r="38" />
        <path d="m77 34 7 21 21 7-21 7-7 21-7-21-21-7 21-7 7-21Z" />
        <path d="M114 38h24v30h-24M126 38v30M32 100h90" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="m126 38 12 7-12 7M126 54l12 7-12 7M77 17v7m-44 38h7m75 0h7" />
        <circle cx="77" cy="62" r="5" />
      </g>
    </>
  ),
  'st-john': (
    <>
      <g {...PRIMARY_STROKE}>
        <rect x="42" y="36" width="76" height="57" rx="9" />
        <path d="M59 36v-8a8 8 0 0 1 8-8h26a8 8 0 0 1 8 8v8M42 55h76" />
        <path d="M80 58v23M68.5 69.5h23" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M17 77h16l8-12 10 23 10-15 7 4h12" />
        <circle cx="131" cy="86" r="9" />
        <path d="M126 86h10m-5-5v10" />
      </g>
    </>
  ),
  'red-cross': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M27 72h34l13 12h26a9 9 0 0 1 0 18H64l-20-13H27M133 72H99L86 84H60a9 9 0 0 0 0 18h36l20-13h17" />
        <path d="M80 20v34m-17-17h34" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M67 39h26m-13-13v26" />
        <path d="M53 99h12m30 0h12" />
      </g>
    </>
  ),
  journalism: (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M34 26h77a7 7 0 0 1 7 7v63a7 7 0 0 1-7 7H34a7 7 0 0 1-7-7V33a7 7 0 0 1 7-7Z" />
        <path d="M43 42h59M43 52h59M43 67h22v25H43zM74 69h28m-28 9h28m-28 9h20" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="m121 27 16 9-25 44-16-9 25-44Z" />
        <path d="m96 71-3 15 14-6M43 32h59" />
      </g>
    </>
  ),
  drama: (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M34 35c13-10 31-11 49-6v45c-18-6-36-5-49 6V35ZM126 35c-13-10-31-11-49-6v45c18-6 36-5 49 6V35Z" />
        <path d="M48 48c4-4 10-4 14 0m-14 13c4 4 10 4 14 0m42-13c4-4 10-4 14 0m-14 13c4 4 10 4 14 0" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M26 88c10 14 25 20 45 20M134 88c-10 14-25 20-45 20" />
        <path d="M80 19v-7m-44 8-4-6m92 6 4-6" />
      </g>
    </>
  ),
  wildlife: (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 104V47m0 28L57 57m23 6 24-26M80 81 56 83m24 2 24-2" />
        <path d="M80 17c-10 0-17 8-17 17 0 6 3 11 8 14-2-10 2-16 9-19 7 3 11 9 9 19 5-3 8-8 8-14 0-9-7-17-17-17Z" />
        <path d="M51 58c-8-1-14-7-15-15 9 0 15 5 18 13M109 40c3-8 9-13 18-13-1 8-7 14-15 15" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M67 105h26M71 75l-10-6m37-8 10-11M68 88l-12 1m36-3 12 1" />
        <path d="M28 28c6-5 13-5 19 0-6 5-13 5-19 0Zm85-10c6-5 13-5 19 0-6 5-13 5-19 0Z" />
      </g>
    </>
  ),
  'integrity-club': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 22 116 36v23c0 20-15 33-36 43-21-10-36-23-36-43V36l36-14Z" />
        <path d="m62 61 12 12 25-27" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M26 35h24m-24 9h17M109 83h25m-25 9h18" />
        <path d="M18 26h34v26H34l-9 8v-8h-7zM108 74h34v26h-18l-9 8v-8h-7z" />
      </g>
    </>
  ),
  volleyball: (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="80" cy="62" r="42" />
        <path d="M80 20c-4 22 3 40 24 55M44 38c20 11 39 13 64 6M45 89c20-11 35-25 45-49" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M80 20c14 7 25 20 30 37M38 54c14-5 29-6 43-2m-39 42c7 9 17 15 29 18" />
      </g>
    </>
  ),
  netball: (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="52" cy="39" r="16" />
        <path d="M52 55v40m-15-26h30m-23 0-17 23m25-23 17 23M103 30v66m-16-56h32m-16 0v10" />
        <ellipse cx="103" cy="52" rx="15" ry="4" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M80 74h46m-39 0 16 22m16-22-16 22M89 57h28" />
        <circle cx="104" cy="67" r="7" />
      </g>
    </>
  ),
  basketball: (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="80" cy="62" r="42" />
        <path d="M80 20c-17 15-25 29-25 42s8 27 25 42M80 20c17 15 25 29 25 42s-8 27-25 42M38 62h84" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M48 31c17 10 26 21 32 31m32 27c-17-10-26-21-32-31m0 0c6-10 15-21 32-31M48 93c17-10 26-21 32-31" />
      </g>
    </>
  ),
  hockey: (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M45 23 86 84m-8-66 41 61M45 23l-9 6 41 61 9-6M78 18l8-5 41 61-8 5" />
        <path d="M39 91h71a10 10 0 0 1 10 10H42a10 10 0 0 1-3-10Z" />
      </g>
      <g {...DEEP_STROKE}>
        <circle cx="111" cy="82" r="5" />
        <path d="m31 41 13-9m56 45 12-9" />
      </g>
    </>
  ),
  athletics: (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="96" cy="25" r="9" />
        <path d="m88 38-18 18 20 11 16-18m-36 7-17-1-15 15m52-18 19 10 14-7m-44 3-9 26-21 13m30-13 21 20" />
        <path d="M26 105h111M37 95h11m-9-9h17" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M18 114c23-12 49-12 72 0m-50-19 5 9m10-20 4 9" />
        <path d="m79 42 12 4m-40 32 11 5" />
      </g>
    </>
  ),
  handball: (
    <>
      <g {...PRIMARY_STROKE}>
        <rect x="26" y="34" width="54" height="56" rx="4" />
        <path d="M26 48h54m-40-14v56m27-56v56M91 49c8-12 24-13 34-4l10 12-11 17c-6 9-18 12-27 6l-8-5 10-14-9-12Z" />
        <path d="M98 56 91 45m14 9 8-14m-6 20 16-4m-12 11 13 8" />
      </g>
      <g {...DEEP_STROKE}>
        <circle cx="110" cy="28" r="10" />
        <path d="M104 23c5 3 8 7 11 12M98 29l20-3" />
      </g>
    </>
  ),
  badminton: (
    <>
      <g {...PRIMARY_STROKE}>
        <ellipse cx="48" cy="78" rx="22" ry="28" transform="rotate(-28 48 78)" />
        <path d="M62 58 118 18m-8 4 8-4-3 9" />
        <path d="M38 62c8 2 14 8 16 16M42 90c6-2 12-1 17 4" />
      </g>
      <g {...DEEP_STROKE}>
        <circle cx="112" cy="78" r="9" />
        <path d="M112 69v-10m0 10-7-8m7 8 7-8M105 62l14 0" />
        <path d="M26 112h108" />
      </g>
    </>
  ),
  'christian-union': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 55V15m-15 14h30" />
        <path d="M80 69C65 57 48 53 28 55v43c20-2 37 2 52 15 15-13 32-17 52-15V55c-20-2-37 2-52 14Z" />
        <path d="M80 69v44M28 70c20-2 37 2 52 15 15-13 32-17 52-15" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M48 85h17m30 0h17M48 95h17m30 0h17" />
        <path d="M80 10v5m-8 0h16" />
      </g>
    </>
  ),
  'young-christian-students': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M55 25h50m-45 0v12l-11 36a13 13 0 0 0 13 17h36a13 13 0 0 0 13-17l-11-36V25" />
        <path d="M54 63c17-7 35-7 52 0M80 40v19m-8-10h16" />
        <path d="M80 102c-15-9-24-18-24-27 0-11 14-15 24-4 10-11 24-7 24 4 0 9-9 18-24 27Z" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M70 76h20m-15 8h10M70 15h20" />
      </g>
    </>
  ),
  'sda-fellowship': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M80 17v15m-33-2 9 12m-30 12 15 4m80-26-9 12m30 10-15 4" />
        <path d="M80 42c-15-12-32-15-52-13v39c20-2 37 2 52 15 15-13 32-17 52-15V29c-20-2-37 1-52 13Z" />
        <path d="M80 42v41m-52-1c20-2 37 2 52 15 15-13 32-17 52-15" />
      </g>
      <g {...DEEP_STROKE}>
        <circle cx="80" cy="35" r="13" />
        <path d="M49 59h18m26 0h18M49 69h18m26 0h18" />
      </g>
    </>
  ),
  'muslim-association': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M72 18a27 27 0 1 0 30 43A32 32 0 1 1 72 18Z" />
        <path d="m122 26 3.5 8 8.5 1-6.3 6 1.6 8-7.3-4.2-7.3 4.2 1.6-8-6.3-6 8.5-1Z" />
        <path d="M48 103V76a32 32 0 0 1 64 0v27M38 103h84" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M67 101V80l13-10 13 10v21m-18-12h10" />
        <path d="M80 75v7m-38 21h76" />
      </g>
    </>
  ),
  'dining-hall': (
    <>
      <g {...PRIMARY_STROKE}>
        <circle cx="82" cy="62" r="32" />
        <circle cx="82" cy="62" r="21" />
        <path d="M34 29v32m-7-32v13a7 7 0 0 0 14 0V29m-7 32v37m95-69v69m0-69c-12 10-16 22-16 38h16" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M57 62h50m-25-25v50" />
        <circle cx="82" cy="62" r="5" />
      </g>
    </>
  ),
  'school-uniform': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="m53 23 27 11 27-11 20 15-13 18-10-7v55H56V49l-10 7-13-18 20-15Z" />
        <path d="M67 27 80 42l13-15M80 42v62m-19-37h12m14 0h12" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="m73 42 7 8 7-8-4 19 5 25-8 11-8-11 5-25Z" />
        <path d="M56 51 44 43m60 8 12-8" />
      </g>
    </>
  ),
  'boarding-welfare': (
    <>
      <g {...PRIMARY_STROKE}>
        <path d="M26 102h108M35 102V52l45-30 45 30v50M51 102V72h22v30m18-34h17v16H91zM48 59h12m40-1h13" />
        <path d="m80 57 22 8v14c0 14-9 22-22 28-13-6-22-14-22-28V65l22-8Z" />
      </g>
      <g {...DEEP_STROKE}>
        <path d="M72 79v13m-7-6h14" />
        <path d="M31 48h98M76 21h8" />
      </g>
    </>
  ),
};

interface ProspectusCardArtProps {
  kind: ProspectusArtKey;
  className?: string;
}

export default function ProspectusCardArt({
  kind,
  className,
}: ProspectusCardArtProps) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 160 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {ART[kind]}
    </svg>
  );
}
