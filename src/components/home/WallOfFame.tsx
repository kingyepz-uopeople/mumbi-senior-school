import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import WallOfFameGrid from '@/components/shared/WallOfFameGrid';
import { kcse2026Target } from '@/data/kcse';

export default function WallOfFame() {
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
              National Examinations · KNEC 10204102
            </p>
            <BlurRevealHeading
              id="home-wof-heading"
              seed="home-roll-of-honour"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              KCSE Roll of Honour
            </BlurRevealHeading>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Celebrate the top performers from the 2022–2025 KCSE reports.
              Select an examination year to see its honourees and their ranks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:justify-end lg:shrink-0">
            <Link
              href="/academics#kcse-target"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-primary-dark hover:border-primary hover:bg-white"
            >
              <span>{kcse2026Target.year} KCSE target: {kcse2026Target.schoolMean}</span>
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="/academics#kcse-results"
              className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors"
            >
              <span>KCSE results by year</span>
              <ArrowRight className="size-4 shrink-0 stroke-[1.75]" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div data-reveal="" data-reveal-delay="1">
          <WallOfFameGrid />
        </div>
      </div>
    </section>
  );
}
