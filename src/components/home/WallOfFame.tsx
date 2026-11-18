import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import WallOfFameGrid from '@/components/shared/WallOfFameGrid';

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
            <h2
              id="home-wof-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              KCSE Roll of Honour
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
              Recorded top candidates from recent KCSE sittings and their
              university degree placements.
            </p>
          </div>

          <Link
            href="/academics#wall-of-fame"
            className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors shrink-0"
          >
            <span>Academics &amp; results</span>
            <ArrowRight
              className="w-4 h-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div data-reveal="" data-reveal-delay="1">
          <WallOfFameGrid />
        </div>
      </div>
    </section>
  );
}
