'use client';

import Image from 'next/image';
import { Target } from 'lucide-react';
import { ArrowRight } from '@/components/icons';
import { kcse2026Target } from '@/data/kcse';
import { useLocale } from '@/i18n/locale-context';
import { fill } from '@/i18n/fill';

export default function KcseTarget() {
  const { dict } = useLocale();
  const { year, schoolMean } = kcse2026Target;

  return (
    <section
      id="kcse-target"
      aria-labelledby="kcse-target-heading"
      className="scroll-mt-4 border-b border-slate-200 bg-white py-12 sm:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid overflow-hidden rounded-xl border border-slate-200 md:grid-cols-[minmax(0,1fr)_minmax(17rem,36%)]">
          <div
            data-dark-surface
            className="relative flex items-center overflow-hidden bg-linear-to-br from-primary to-primary-dark px-6 py-9 text-white sm:p-10 lg:p-14"
          >
            <Target
              className="pointer-events-none absolute -right-20 -bottom-24 size-80 text-white/10 sm:size-96"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div className="relative max-w-md">
              <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] text-blue-100">
                <span className="h-0.5 w-6 bg-accent" aria-hidden="true" />
                {dict.academics.kcseKicker}
              </p>
              <h2 id="kcse-target-heading" className="font-serif text-2xl font-bold sm:text-3xl lg:text-4xl">
                {fill(dict.academics.kcseTargetHeading, { year })}
              </h2>
              <p className="mt-4 font-serif text-6xl leading-none font-bold tracking-tight tabular-nums sm:text-7xl lg:text-[5.5rem]">
                {schoolMean}
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
                {dict.academics.targetMean}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-blue-50 sm:text-base">
                {fill(dict.academics.targetDisclaimer, { year })}
              </p>
              <a
                href="#kcse-results"
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/50 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                {dict.academics.browseResults}
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <figure className="m-0 grid justify-items-center gap-4 bg-slate-bg p-5 sm:p-6">
            <Image
              src="/images/school/dean-of-studies.jpg"
              alt="Mr. Kiruri holding a trophy beside the school's 2026 KCSE target banner"
              width={900}
              height={1600}
              quality={95}
              sizes="(max-width: 330px) calc(100vw - 74px), 256px"
              className="h-auto w-full max-w-64 rounded-md border border-slate-200"
            />
            <figcaption className="text-center">
              <p className="font-serif text-xl font-bold text-slate-900">Mr. Kiruri</p>
              <p className="mt-0.5 text-sm font-semibold text-primary">
                {dict.academics.deanOfStudies}
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}