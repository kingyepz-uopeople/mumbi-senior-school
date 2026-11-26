'use client';

import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { schoolInfo } from '@/data/mock-school-data';
import LocaleLink from '@/i18n/LocaleLink';
import { useLocale } from '@/i18n/locale-context';

export default function FoundationalPillars() {
  const { dict } = useLocale();

  return (
    <section
      aria-labelledby="school-ethos-heading"
      className="relative border-y border-slate-200 bg-white py-16 sm:py-24"
    >
      <SectionStemBackdrop variant="ethos" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal="" className="lg:col-span-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {dict.home.ethosKicker}
            </p>
            <BlurRevealHeading
              id="school-ethos-heading"
              seed="home-school-ethos"
              className="mb-8 font-serif text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              {dict.home.ethosHeading}
            </BlurRevealHeading>

            <div className="mb-8 border-l-2 border-accent pl-5">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">
                {dict.home.schoolMotto}
              </p>
              <p className="font-serif text-2xl font-bold leading-snug text-slate-900 italic sm:text-[1.65rem]">
                &ldquo;{dict.school.motto}&rdquo;
              </p>
            </div>

            <dl className="divide-y divide-slate-200 border-t border-slate-200">
              <div className="py-5">
                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {dict.home.mission}
                </dt>
                <dd className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {dict.school.mission}
                </dd>
              </div>
              <div className="py-5">
                <dt className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {dict.home.vision}
                </dt>
                <dd className="text-sm leading-relaxed text-slate-700 sm:text-base">
                  {dict.school.vision}
                </dd>
              </div>
            </dl>
          </div>

          <section
            aria-labelledby="home-core-values-heading"
            className="lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-14"
          >
            <h3
              id="home-core-values-heading"
              data-reveal=""
              className="border-b border-slate-300 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600"
            >
              {dict.home.coreValues}
            </h3>

            <ol role="list" className="grid grid-cols-2 gap-x-4 sm:gap-x-6">
              {schoolInfo.coreValues.map((value, idx) => {
                const localized =
                  dict.school.coreValues[
                    value.id as keyof typeof dict.school.coreValues
                  ];
                return (
                  <li
                    key={value.id}
                    data-reveal=""
                    data-reveal-delay={idx % 2 === 1 ? '1' : undefined}
                    className="flex min-w-0 items-baseline gap-3 border-b border-slate-200 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-xs font-semibold tabular-nums text-primary"
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-base font-bold text-slate-900">
                      {localized?.title ?? value.title}
                    </span>
                  </li>
                );
              })}
            </ol>

            <LocaleLink
              href="/about#core-values"
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:text-primary-dark hover:underline"
            >
              {dict.home.readCoreValues}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </LocaleLink>
          </section>
        </div>
      </div>
    </section>
  );
}
