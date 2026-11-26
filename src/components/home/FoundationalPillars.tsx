import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { schoolInfo } from '@/data/mock-school-data';

export default function FoundationalPillars() {
  return (
    <section
      aria-labelledby="school-ethos-heading"
      className="relative py-16 sm:py-24 bg-white border-y border-slate-200"
    >
      <SectionStemBackdrop variant="ethos" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Motto, Mission & Vision */}
          <div data-reveal="" className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              School Ethos
            </p>
            <BlurRevealHeading
              id="school-ethos-heading"
              seed="home-school-ethos"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mb-8"
            >
              Motto, Mission &amp; Vision
            </BlurRevealHeading>

            <div className="pl-5 border-l-2 border-accent mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 mb-1">
                School Motto
              </p>
              <p className="font-serif italic text-2xl sm:text-[1.65rem] font-bold text-slate-900 leading-snug">
                &ldquo;{schoolInfo.motto}&rdquo;
              </p>
            </div>

            <dl className="divide-y divide-slate-200 border-t border-slate-200">
              <div className="py-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-2">
                  Mission
                </dt>
                <dd className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {schoolInfo.mission}
                </dd>
              </div>
              <div className="py-5">
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-2">
                  Vision
                </dt>
                <dd className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {schoolInfo.vision}
                </dd>
              </div>
            </dl>
          </div>

          <section aria-labelledby="home-core-values-heading" className="lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-14">
            <h3
              id="home-core-values-heading"
              data-reveal=""
              className="border-b border-slate-300 pb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-600"
            >
              Core Values
            </h3>

            <ol role="list" className="grid grid-cols-2 gap-x-4 sm:gap-x-6">
              {schoolInfo.coreValues.map((value, idx) => (
                <li
                  key={value.id}
                  data-reveal=""
                  data-reveal-delay={idx % 2 === 1 ? '1' : undefined}
                  className="flex min-w-0 items-baseline gap-3 border-b border-slate-200 py-3"
                >
                  <span aria-hidden="true" className="shrink-0 text-xs font-semibold text-primary tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-base font-bold text-slate-900">
                    {value.title}
                  </span>
                </li>
              ))}
            </ol>

            <Link
              href="/about#core-values"
              className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:text-primary-dark hover:underline"
            >
              Read more about our core values
              <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
