import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin, ReceiptText } from 'lucide-react';
import { grade10Intake } from '@/data/admissions';
import ReportingDayTimeline from '@/components/admissions/ReportingDayTimeline';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

const placementPortalUrl = 'https://placement.education.go.ke/';
const schoolOfficeHref = '/contact#school-office';
const uniformPhoto = '/images/school/about-prize-1.jpg';

export const metadata: Metadata = buildPageMetadata({
  title: `Grade 10 Admissions ${grade10Intake.year}`,
  description: `Reporting, school fees, and uniform for learners joining Mumbi Girls Senior School in ${grade10Intake.year}.`,
  path: '/admissions',
});

const steps = [
  {
    n: '01',
    title: 'Confirm your placement',
    detail:
      'Check the Ministry of Education Grade 10 placement portal for your placement and admission letter. If you cannot find your letter, ask your junior school.',
    href: placementPortalUrl,
    external: true,
  },
  {
    n: '02',
    title: 'Read your joining instructions',
    detail:
      'Use the current instructions to see which documents and forms to bring, what to pack for boarding, and which uniform items to buy.',
    href: '/downloads',
    external: false,
  },
  {
    n: '03',
    title: 'Check before you travel',
    detail: `The school is in ${schoolInfo.physicalLocation}. Confirm your arrival time and where to check in before travelling.`,
    href: schoolOfficeHref,
    external: false,
  },
] as const;

export default function AdmissionsPage() {
  const { year, reportingDate, reportingDateProvisional } = grade10Intake;
  const reportingDay = new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'full',
    timeZone: 'Africa/Nairobi',
  }).format(new Date(`${reportingDate}T00:00:00Z`));

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            {year} Intake · Senior School
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Grade 10 Admissions
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            Reporting, school fees, and uniform for learners joining Mumbi Girls
            Senior School in {year}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#uniform"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50"
            >
              View uniform photo
              <ArrowDown className="size-4 shrink-0" aria-hidden="true" />
            </a>
            <a
              href={placementPortalUrl}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Check placement
              <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
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
                  Reporting day
                </h2>
              </div>
              {reportingDateProvisional && (
                <span className="rounded-full border border-accent bg-white px-2.5 py-1 text-xs font-semibold text-accent">
                  Provisional
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
                ? 'This date may change. Confirm the date and arrival time with the school office before travelling.'
                : 'Check your joining instructions for your arrival time before travelling.'}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Before you arrive
            </p>
            <h2
              id="reporting-heading"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              What to prepare
            </h2>
            <div className="mt-5">
              <ReportingDayTimeline
                steps={[
                  {
                    title: 'Your placement letter',
                    detail:
                      'Bring the admission letter from the Ministry of Education Grade 10 placement portal.',
                  },
                  {
                    title: 'Documents and forms',
                    detail:
                      'Pack the forms named in your joining instructions and what you need for boarding.',
                  },
                  {
                    title: 'Uniform and arrival time',
                    detail:
                      'Buy the uniform items listed by the school and confirm your arrival time before travelling.',
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
            How to join
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            Three steps before reporting day.
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
                      className="editorial-arrow size-5 shrink-0 text-white"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <Link href={step.href} className="editorial-row" data-reveal="">
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
                  </Link>
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
              <ReceiptText className="size-5" aria-hidden="true" />
            </span>
            <h2
              id="fees-heading"
              className="font-serif text-xl font-bold text-slate-900 sm:text-2xl"
            >
              {year} Grade 10 school fees
            </h2>
          </div>
          <p className="mt-4 font-semibold text-slate-900">
            The {year} fee structure isn&apos;t published on this site yet.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            Ask the school office to confirm the amount due on reporting day, any
            later instalments, and the official payment instructions before
            sending money.
          </p>
          <Link
            href={schoolOfficeHref}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
          >
            School office contact details
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
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
              Uniform colour reference
            </p>
            <h2
              id="uniform-heading"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Grade 10 uniform photo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              This school prize-giving photo shows the blue top with the school
              crest and the blue-and-white checked skirt. Open the full-size
              photo to see the shade and check pattern.
            </p>
            <div className="mt-5 border-l-2 border-primary bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
              <p className="mb-1 font-semibold text-primary-dark">
                Before you buy
              </p>
              <p>
                Screens show colours differently. Confirm the current {year}{' '}
                uniform list with the school office and, if available, compare
                the fabric with a school-approved sample.
              </p>
            </div>
            <Link
              href="/explore#boarding"
              className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
            >
              Boarding and uniform overview
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </div>

          <figure className="m-0 w-full max-w-sm justify-self-center overflow-hidden rounded-md border border-slate-200 bg-slate-bg">
            <Image
              src={uniformPhoto}
              alt="A student at prize giving wearing a blue top with the school crest and a blue-and-white checked skirt"
              width={960}
              height={1280}
              quality={95}
              sizes="(max-width: 430px) calc(100vw - 74px), 384px"
              className="block h-auto w-full"
            />
            <figcaption className="flex items-center justify-between gap-3 border-t border-slate-200 px-3 text-sm sm:px-4">
              <span className="text-xs text-slate-600">School prize giving</span>
              <a
                href={uniformPhoto}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
              >
                Full-size photo
                <span className="sr-only">(opens in a new tab)</span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
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
              Questions about joining?
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                {schoolInfo.physicalLocation} · {schoolInfo.officeHoursShort}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={schoolOfficeHref}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              Contact the school
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="/academics#pathways"
              className="inline-flex min-h-11 items-center rounded-full border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50"
            >
              Explore pathways
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
