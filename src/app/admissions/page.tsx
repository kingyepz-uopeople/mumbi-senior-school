import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, CalendarDays, MapPin, ReceiptText } from 'lucide-react';
import HeroStemBackdrop from '@/components/shared/HeroStemBackdrop';
import { grade10Intake } from '@/data/admissions';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

const placementPortalUrl = 'https://placement.education.go.ke/';
const schoolOfficeHref = '/contact#school-office';
const uniformPhoto = '/images/school/about-prize-1.jpg';

const guideSections = [
  { id: 'reporting', label: 'Reporting' },
  { id: 'fees', label: 'School fees' },
  { id: 'uniform', label: 'Uniform photo' },
  { id: 'help', label: 'Get help' },
];

const textLinkClass =
  'inline-flex min-h-11 items-center gap-2 font-semibold text-primary underline-offset-4 hover:text-primary-dark hover:underline';

export const metadata: Metadata = buildPageMetadata({
  title: `Grade 10 Admissions ${grade10Intake.year}`,
  description:
    `A guide for learners and families joining Mumbi Girls Senior School in ${grade10Intake.year}: Grade 10 placement, reporting day, school fees, and a school uniform photo.`,
  path: '/admissions',
});

export default function AdmissionsPage() {
  const { year, reportingDate, reportingDateProvisional, fees } = grade10Intake;
  const reportingDay = new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'full',
    timeZone: 'Africa/Nairobi',
  }).format(new Date(`${reportingDate}T00:00:00Z`));
  const feeAmountFormat = new Intl.NumberFormat('en-KE', {
    maximumFractionDigits: 2,
  });
  const hasFeeDetails = fees.amounts.length > 0 || Boolean(fees.scheduleUrl);

  return (
    <div className="bg-slate-bg">
      <header
        data-dark-surface
        className="relative overflow-hidden border-b border-primary-dark bg-linear-to-br from-primary to-primary-dark text-white"
      >
        <HeroStemBackdrop variant="contact" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 md:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-16">
          <div>
            <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
              <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
              {year} intake · Senior School
            </p>
            <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
              Grade 10 Admissions
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
              Joining Mumbi Girls Senior School? Find out how to prepare for
              reporting day, confirm school fees, and check the uniform colours
              before you shop.
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

          <section
            data-light-surface
            aria-labelledby="reporting-day-label"
            className="rounded-lg border border-white/30 bg-white p-5 text-slate-900 shadow-lg sm:p-7"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-50 text-primary">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <h2 id="reporting-day-label" className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary-dark">
                  Reporting day
                </h2>
              </div>
              {reportingDateProvisional && (
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-200 ring-inset">
                  Provisional
                </span>
              )}
            </div>
            <time dateTime={reportingDate} className="mt-4 block font-serif text-2xl leading-tight font-bold sm:text-3xl">
              {reportingDay}
            </time>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {reportingDateProvisional
                ? 'This date may change. Confirm the date and arrival time with the school office before travelling.'
                : 'Check your joining instructions for your arrival time before travelling.'}
            </p>
          </section>
        </div>
      </header>

      <nav aria-label="On this page" className="border-b border-slate-200 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3 sm:px-6">
          <li className="mr-1 hidden text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 sm:block" aria-hidden="true">
            On this page
          </li>
          {guideSections.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex min-h-11 items-center justify-between gap-2 rounded-md px-3 text-sm font-semibold text-primary-dark hover:bg-blue-50"
              >
                {label}
                <ArrowDown className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:space-y-14 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
          <section id="reporting" aria-labelledby="reporting-heading" className="scroll-mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Before you arrive
            </p>
            <h2 id="reporting-heading" className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Reporting checklist
            </h2>
            <ol className="mt-5 divide-y divide-slate-200 border-y border-slate-200" role="list">
              <li className="flex items-start gap-4 py-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-primary-dark" aria-hidden="true">01</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Confirm your placement</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Check the Ministry of Education&apos;s{' '}
                    <a href={placementPortalUrl} className="font-semibold text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary">
                      Grade 10 placement portal
                    </a>{' '}
                    for your placement and admission letter. If you can&apos;t
                    find your letter, ask your junior school for help.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-primary-dark" aria-hidden="true">02</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Read your joining instructions</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    Use the current instructions to check which documents and
                    forms to bring, what to pack for boarding, and which uniform
                    items to buy.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 py-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-blue-100 text-xs font-bold text-primary-dark" aria-hidden="true">03</span>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900">Check before you travel</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    The school is in {schoolInfo.physicalLocation}. Confirm your
                    arrival time and where to check in before travelling.
                  </p>
                </div>
              </li>
            </ol>
          </section>

          <section id="fees" aria-labelledby="fees-heading" className="scroll-mt-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-50 text-primary">
                <ReceiptText className="size-5" aria-hidden="true" />
              </span>
              <h2 id="fees-heading" className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
                {year} Grade 10 school fees
              </h2>
            </div>
            {fees.amounts.length > 0 && (
              <dl className="mt-4 divide-y divide-slate-200 border-y border-slate-200 text-sm">
                {fees.amounts.map(({ label, amountKes }) => (
                  <div key={label} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                    <dt className="text-slate-700">{label}</dt>
                    <dd className="font-semibold text-slate-900 tabular-nums">KSh {feeAmountFormat.format(amountKes)}</dd>
                  </div>
                ))}
              </dl>
            )}
            {fees.scheduleUrl && (
              <a href={fees.scheduleUrl} className={`${textLinkClass} mt-3 text-sm`}>
                View the approved fee schedule
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            )}
            {!hasFeeDetails && (
              <p className="mt-4 font-semibold text-slate-900">The {year} fee structure isn&apos;t available on this site yet.</p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Ask the school office to confirm the amount due on reporting day,
              any later instalments, and the official payment instructions before
              sending money.
            </p>
            <Link href={schoolOfficeHref} className={`${textLinkClass} mt-2 text-sm`}>
              School office contact details
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </section>
        </div>

        <section
          id="uniform"
          aria-labelledby="uniform-heading"
          className="grid scroll-mt-4 items-start gap-6 rounded-lg border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-8 sm:py-9 md:grid-cols-[1fr_1fr] md:items-center lg:gap-12"
        >
          <div className="max-w-lg">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">Uniform colour reference</p>
            <h2 id="uniform-heading" className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
              Grade 10 uniform photo
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              This school prize-giving photo shows the blue top with the school
              crest and the blue-and-white checked skirt. Open the full-size
              photo for a closer look at the shade and check pattern.
            </p>
            <div className="mt-5 border-l-2 border-primary bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
              <p className="mb-1 font-semibold text-primary-dark">Before you buy</p>
              <p>
                Screens can show colours differently. Confirm the current {year}{' '}
                uniform list with the school office and, if available, compare
                the fabric with a school-approved sample.
              </p>
            </div>
            <Link href="/explore#boarding" className={`${textLinkClass} mt-3 text-sm`}>
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
              <a href={uniformPhoto} target="_blank" rel="noreferrer" className={textLinkClass}>
                Full-size photo <span className="sr-only">(opens in a new tab)</span>
                <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </section>

        <section id="help" aria-labelledby="help-heading" className="flex scroll-mt-4 flex-col gap-5 rounded-lg border border-blue-100 bg-blue-50 p-5 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 id="help-heading" className="font-serif text-xl font-bold text-slate-900 sm:text-2xl">
              Questions about joining?
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-slate-700">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{schoolInfo.physicalLocation} · {schoolInfo.officeHoursShort}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={schoolOfficeHref} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
              Contact the school
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link href="/academics#pathways" className="inline-flex min-h-11 items-center rounded-full border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50">
              Explore pathways
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
