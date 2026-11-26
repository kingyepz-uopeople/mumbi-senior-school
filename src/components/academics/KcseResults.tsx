'use client';

import { useState } from 'react';
import KcsePerformance from '@/components/academics/KcsePerformance';
import KcseMultiYearTable from '@/components/academics/KcseMultiYearTable';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import WallOfFameGrid, { type HonourYear } from '@/components/shared/WallOfFameGrid';
import { kcseReports } from '@/data/kcse';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';

export default function KcseResults({ knecCode }: { knecCode: string }) {
  const { dict } = useLocale();
  const [reportYear, setReportYear] = useState(kcseReports[0].year);
  const [showAllHonourees, setShowAllHonourees] = useState(false);
  const report = kcseReports.find(({ year }) => year === reportYear) ?? kcseReports[0];

  function selectYear(year: HonourYear) {
    if (year === 'all') {
      setShowAllHonourees(true);
    } else {
      setReportYear(year);
      setShowAllHonourees(false);
    }
  }

  return (
    <>
      <KcsePerformance
        report={report}
        onYearChange={selectYear}
        onViewPerformers={() => setShowAllHonourees(false)}
      />

      <KcseMultiYearTable
        selectedYear={report.year}
        onSelectYear={(year) => {
          setReportYear(year);
          setShowAllHonourees(false);
        }}
      />

      <section
        id="wall-of-fame"
        aria-labelledby="academics-wof-heading"
        className="relative scroll-mt-4 bg-white py-16 sm:py-20"
      >
        <SectionStemBackdrop variant="honours" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div data-reveal="" className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {fill(dict.academics.resultsKicker, { code: knecCode })}
            </p>
            <BlurRevealHeading
              id="academics-wof-heading"
              seed="academics-roll-of-honour"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              {dict.academics.rollHeading}
            </BlurRevealHeading>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
              Top performers from the school&apos;s KCSE reports, with tied
              ranks shown as recorded.
            </p>
          </div>
          <div data-reveal="" data-reveal-delay="1">
            <WallOfFameGrid
              year={showAllHonourees ? 'all' : report.year}
              onYearChange={selectYear}
            />
          </div>
        </div>
      </section>
    </>
  );
}
