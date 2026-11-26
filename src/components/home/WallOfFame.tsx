'use client';

import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import WallOfFameGrid from '@/components/shared/WallOfFameGrid';
import { kcse2026Target } from '@/data/kcse';
import LocaleLink from '@/i18n/LocaleLink';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';

export default function WallOfFame() {
  const { dict } = useLocale();
  const h = dict.home;

  return (
    <section
      aria-labelledby="home-wof-heading"
      className="relative py-16 sm:py-24 bg-white border-y border-slate-200"
    >
      <SectionStemBackdrop variant="honours" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          data-reveal=""
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              {h.wofKicker}
            </p>
            <BlurRevealHeading
              id="home-wof-heading"
              seed="home-roll-of-honour"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              {h.wofHeading}
            </BlurRevealHeading>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              {h.wofBody}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end lg:shrink-0">
            <LocaleLink
              href="/academics#kcse-target"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-primary-dark hover:border-primary hover:bg-white"
            >
              <span>
                {fill(h.wofTarget, {
                  year: kcse2026Target.year,
                  mean: kcse2026Target.schoolMean,
                })}
              </span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </LocaleLink>
            <LocaleLink
              href="/academics#kcse-results"
              className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors"
            >
              <span>{h.wofResultsLink}</span>
              <ArrowRight className="size-4 shrink-0 stroke-[1.75]" aria-hidden="true" />
            </LocaleLink>
          </div>
        </div>

        <div data-reveal="" data-reveal-delay="1">
          <WallOfFameGrid />
        </div>
      </div>
    </section>
  );
}