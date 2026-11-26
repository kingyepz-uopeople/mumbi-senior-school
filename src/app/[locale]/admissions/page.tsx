import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight, MapPin, ReceiptText } from 'lucide-react';
import { ArrowDown, ArrowRight, CalendarDays } from '@/components/icons';
import { grade10Intake } from '@/data/admissions';
import ReportingDayTimeline from '@/components/admissions/ReportingDayTimeline';
import { schoolInfo } from '@/data/mock-school-data';
import DirectionsLink from '@/components/shared/DirectionsLink';
import LocaleLink from '@/i18n/LocaleLink';
import { fill, getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

const placementPortalUrl = 'https://placement.education.go.ke/';
const schoolOfficeHref = '/contact#school-office';
const uniformShirtPhoto = '/images/school/grade-10-uniform-shirt.jpg';
const uniformSkirtPhoto = '/images/school/grade-10-uniform-skirt.jpg';

export const metadata: Metadata = buildPageMetadata({
  title: `Grade 10 Admissions ${grade10Intake.year}`,
  description: `Reporting, school fees, and uniform for learners joining Mumbi Girls Senior School in ${grade10Intake.year}.`,
  path: '/admissions',
});

export default async function AdmissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale, dict } = await getLocaleDictionary(params);
  const a = dict.admissions;
  const { year, reportingDate, reportingDateProvisional } = grade10Intake;
  const reportingDay = new Intl.DateTimeFormat(
    locale === 'sw' ? 'sw-KE' : 'en-KE',
    {
      dateStyle: 'full',
      timeZone: 'Africa/Nairobi',
    }
  ).format(new Date(`${reportingDate}T00:00:00Z`));

  const steps = [
    {
      n: '01',
      title: a.step1Title,
      detail: a.step1Detail,
      href: placementPortalUrl,
      external: true,
    },
    {
      n: '02',
      title: a.step2Title,
      detail: a.step2Detail,
      href: '/downloads',
      external: false,
    },
    {
      n: '03',
      title: a.step3Title,
      detail: fill(a.step3Detail, { location: schoolInfo.physicalLocation }),
      href: schoolOfficeHref,
      external: false,
    },
  ] as const;

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            {fill(a.kicker, { year })}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {a.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {a.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#uniform"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50"
            >
              {a.viewUniform}
              <ArrowDown className="size-4 shrink-0" aria-hidden="true" />
            </a>
            <a
              href={placementPortalUrl}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {a.checkPlacement}
              <ArrowUpRight strokeWidth={1.75} className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:space-y-14 sm:px-6 sm:py-14">
        {/* Reporting day */}
        <section
          id="reporting"
          aria-labelledby="reporting-heading"
          data-reveal=""
          className="scroll-mt-4 grid items-start gap-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[1fr_1.2fr] lg:gap-12"
        >
          <div
            data-light-surface
            aria-labelledby="reporting-day-label"
            className="flex flex-col justify-center rounded-lg border border-primary/20 bg-blue-50/60 p-5 sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-white text-primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h2
                  id="reporting-day-label"
                  className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary-dark"
                >
                  {a.reportingDay}
                </h2>
              </div>
              {reportingDateProvisional && (
                <span className="rounded-full border border-accent bg-white px-2.5 py-1 text-xs font-semibold text-accent">
                  {a.provisional}
                </span>
              )}
            </div>
            <time
              dateTime={reportingDate}
              className="mt-4 block font-serif text-2xl leading-tight font-bold sm:text-3xl"
            >
              {reportingDay}
            </time>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {reportingDateProvisional
                ? a.reportingProvisionalNote
                : a.reportingConfirmNote}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {a.beforeArrive}
            </p>
            <h2
              id="reporting-heading"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              {a.whatToPrepare}
            </h2>
            <div className="mt-5">
              <ReportingDayTimeline
                steps={[
                  {
                    title: a.timelinePlacementTitle,
                    detail: a.timelinePlacementDetail,
                  },
                  {
                    title: a.timelineDocsTitle,
                    detail: a.timelineDocsDetail,
                  },
                  {
                    title: a.timelineUniformTitle,
                    detail: a.timelineUniformDetail,
                  },
                ]}
              />
            </div>
          </div>
        </section>

        {/* Numbered editorial steps (deep-blue panel) */}
        <section
          aria-labelledby="steps-heading"
          data-dark-surface
          className="scroll-mt-4 rounded-xl bg-primary-dark px-5 py-9 text-white sm:px-8 sm:py-12"
        >
          <h2
            id="steps-heading"
            className="font-serif text-2xl font-bold text-white sm:text-3xl"
          >
            {a.howToJoin}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            {a.threeSteps}
          </p>
          <ol className="editorial-index mt-8">
            {steps.map((step) => (
              <li key={step.n} className="editorial-cell">
                {step.external ? (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-row"
                    data-reveal=""
                  >
                    <span className="editorial-numeral" aria-hidden="true">
                      {step.n}
                    </span>
                    <span className="min-w-0">
                      <span className="font-serif text-lg font-semibold text-white sm:text-xl">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/80 sm:text-sm">
                        {step.detail}
                      </span>
                    </span>
                    <ArrowUpRight
                      strokeWidth={1.75}
                      className="editorial-arrow size-5 shrink-0 text-white"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <LocaleLink href={step.href} className="editorial-row" data-reveal="">
                    <span className="editorial-numeral" aria-hidden="true">
                      {step.n}
                    </span>
                    <span className="min-w-0">
                      <span className="font-serif text-lg font-semibold text-white sm:text-xl">
                        {step.title}
                      </span>
                      <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/80 sm:text-sm">
                        {step.detail}
                      </span>
                    </span>
                    <ArrowRight
                      className="editorial-arrow size-5 shrink-0 text-white"
                      aria-hidden="true"
                    />
                  </LocaleLink>
                )}
              </li>
            ))}
          </ol>
        </section>

        {/* School fees */}
        <section
          id="fees"
          aria-labelledby="fees-heading"
          data-reveal=""
          className="scroll-mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-50 text-primary">
              <ReceiptText strokeWidth={1.75} className="size-5" aria-hidden="true" />
            </span>
            <h2
              id="fees-heading"
              className="font-serif text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {fill(a.feesHeading, { year })}
            </h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-700">
            {a.feesUnpublished}
          </p>
          <LocaleLink
            href={schoolOfficeHref}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
          >
            {a.officeContact}
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </LocaleLink>
        </section>

        {/* Uniform */}
        <section
          id="uniform"
          aria-labelledby="uniform-heading"
          data-reveal=""
          className="scroll-mt-4 grid items-start gap-6 rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-9 md:grid-cols-[1fr_1fr] md:items-center lg:gap-12"
        >
          <div className="max-w-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {a.uniformHeading}
            </p>
            <h2
              id="uniform-heading"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              {a.uniformPhoto}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              {a.uniformBody}
            </p>
            <div className="mt-5 border-l-2 border-primary bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
              <p className="mb-1 font-semibold text-primary-dark">
                {a.beforeBuy}
              </p>
              <p>{fill(a.uniformConfirm, { year })}</p>
            </div>
            <LocaleLink
              href="/explore#boarding"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
            >
              {a.boardingUniform}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </LocaleLink>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 justify-self-center sm:gap-4">
            <figure className="m-0 overflow-hidden rounded-md border border-slate-200 bg-slate-bg">
              <Image
                src={uniformShirtPhoto}
                alt={a.uniformShirtAlt}
                width={768}
                height={1024}
                quality={95}
                sizes="(max-width: 768px) 42vw, 220px"
                className="block h-auto w-full"
              />
              <figcaption className="border-t border-slate-200 px-2 py-2 sm:px-3">
                <span className="block text-[0.7rem] leading-snug text-slate-600 sm:text-xs">
                  {a.uniformShirtCaption}
                </span>
                <a
                  href={uniformShirtPhoto}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary-dark sm:text-sm"
                >
                  {a.uniformFullSize}
                  <span className="sr-only">{dict.common.opensNewTab}</span>
                  <ArrowUpRight strokeWidth={1.75} className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>

            <figure className="m-0 overflow-hidden rounded-md border border-slate-200 bg-slate-bg">
              <Image
                src={uniformSkirtPhoto}
                alt={a.uniformSkirtAlt}
                width={768}
                height={1024}
                quality={95}
                sizes="(max-width: 768px) 42vw, 220px"
                className="block h-auto w-full"
              />
              <figcaption className="border-t border-slate-200 px-2 py-2 sm:px-3">
                <span className="block text-[0.7rem] leading-snug text-slate-600 sm:text-xs">
                  {a.uniformSkirtCaption}
                </span>
                <a
                  href={uniformSkirtPhoto}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary-dark sm:text-sm"
                >
                  {a.uniformFullSize}
                  <span className="sr-only">{dict.common.opensNewTab}</span>
                  <ArrowUpRight strokeWidth={1.75} className="size-3.5 shrink-0" aria-hidden="true" />
                </a>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Questions */}
        <section
          id="help"
          aria-labelledby="help-heading"
          data-reveal=""
          className="flex scroll-mt-4 flex-col gap-5 rounded-lg border border-blue-100 bg-blue-50 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2
              id="help-heading"
              className="font-serif text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {a.questions}
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
              <MapPin strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                <span className="block">
                  {schoolInfo.physicalLocation} · {dict.officeHours.schedule}
                </span>
                <DirectionsLink />
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LocaleLink
              href={schoolOfficeHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              {a.contactSchool}
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </LocaleLink>
            <LocaleLink
              href="/academics#pathways"
              className="inline-flex min-h-11 items-center rounded-full border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50"
            >
              {a.explorePathways}
            </LocaleLink>
          </div>
        </section>
      </div>
    </div>
  );
}