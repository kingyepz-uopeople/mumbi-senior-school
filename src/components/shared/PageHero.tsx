import type { CSSProperties, ReactNode } from 'react';
import HeroMaskedTitle from '@/components/shared/HeroMaskedTitle';
import HeroScrambleTitle from '@/components/shared/HeroScrambleTitle';
import HeroStemBackdrop, {
  type HeroBackdropVariant,
} from '@/components/shared/HeroStemBackdrop';
import HeroTypewriterText from '@/components/shared/HeroTypewriterText';

export interface PageHeroProps {
  /** Short uppercase kicker above the page heading */
  kicker?: string;
  /** Optional custom content above the heading (e.g. article back link + date) */
  topSlot?: ReactNode;
  /** Sole h1 for the page */
  title: string;
  /** Heading animation style (`scramble` on Academics & STEM pages, `mask` elsewhere) */
  titleEffect?: 'mask' | 'scramble';
  /** Optional page subtitle/description — typed with a fading caret on a calm loop */
  subtitle?: string;
  /** Optional school registry/summary items along the bottom hairline */
  meta?: string[];
  /** Curated, low-opacity animated school/STEM line-art backdrop preset */
  variant: Exclude<HeroBackdropVariant, 'home'>;
  /** Semantic landmark wrapper (`section` on index pages, `header` on articles) */
  as?: 'section' | 'header';
  /** Inner container width (`wide` = 80rem, `narrow` = 56rem for notice articles) */
  maxWidth?: 'wide' | 'narrow';
}

/**
 * Reusable inner-page hero shared across About, Academics, Student Life,
 * Downloads, Gallery, Contact & Admissions, Portal, and News notices.
 * Reuses the homepage's inline line-art backdrop, masked or sub-second
 * scramble heading, red accent rule draw, and zero-layout-shift typewriter
 * (without rotating pathway words).
 */
export default function PageHero({
  kicker,
  topSlot,
  title,
  titleEffect = 'mask',
  subtitle,
  meta,
  variant,
  as: Tag = 'section',
  maxWidth = 'wide',
}: PageHeroProps) {
  const wordCount = title.trim().split(/\s+/).length;
  const baseDelayMs = 90;
  const staggerMs = wordCount > 6 ? 58 : 72;
  const lastWordStartMs = baseDelayMs + Math.max(0, wordCount - 1) * staggerMs;
  const ruleDelayMs =
    titleEffect === 'scramble' ? 480 : Math.min(lastWordStartMs + 210, 660);
  const subtitleStartMs = ruleDelayMs + 200;
  const metaDelayMs = subtitle ? subtitleStartMs + 180 : ruleDelayMs + 160;

  const isNarrow = maxWidth === 'narrow';
  const headingClassName = isNarrow
    ? 'font-serif text-2xl sm:text-4xl font-bold text-white leading-tight'
    : 'font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] max-w-3xl';

  return (
    <Tag
      data-dark-surface
      className="relative overflow-hidden bg-primary text-white border-b border-primary-dark"
    >
      <HeroStemBackdrop variant={variant} />

      <div
        className={`relative z-10 ${
          isNarrow ? 'max-w-4xl' : 'max-w-7xl'
        } mx-auto px-4 sm:px-6 py-12 sm:py-16`}
      >
        {topSlot ? (
          <div
            className="hero-rise"
            style={{ '--hero-delay': '0ms' } as CSSProperties}
          >
            {topSlot}
          </div>
        ) : kicker ? (
          <p
            className="hero-rise text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 mb-3"
            style={{ '--hero-delay': '0ms' } as CSSProperties}
          >
            {kicker}
          </p>
        ) : null}

        {titleEffect === 'scramble' ? (
          <HeroScrambleTitle
            text={title}
            durationMs={780}
            startDelayMs={80}
            className={headingClassName}
          />
        ) : (
          <HeroMaskedTitle
            text={title}
            baseDelayMs={baseDelayMs}
            staggerMs={staggerMs}
            className={headingClassName}
          />
        )}

        <div
          className={`hero-rule w-12 h-0.5 bg-accent mt-5 ${
            subtitle ? 'mb-5' : ''
          }`}
          style={{ '--hero-delay': `${ruleDelayMs}ms` } as CSSProperties}
          aria-hidden="true"
        />

        {subtitle ? (
          <HeroTypewriterText
            key={subtitle}
            text={subtitle}
            startDelayMs={subtitleStartMs}
            charDelayMs={15}
            spaceDelayMs={22}
            punctuationDelayMs={52}
            caretHoldMs={1500}
            caretFadeMs={480}
            className="max-w-2xl text-white/90 text-base sm:text-lg leading-relaxed"
          />
        ) : null}

        {meta && meta.length > 0 ? (
          <ul
            className="hero-rise mt-7 pt-5 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-100 tabular-nums"
            style={{ '--hero-delay': `${metaDelayMs}ms` } as CSSProperties}
          >
            {meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Tag>
  );
}
