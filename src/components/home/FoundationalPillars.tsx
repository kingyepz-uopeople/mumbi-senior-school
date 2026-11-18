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

          {/* Right Column: Ruled Core Values Ledger */}
          <div className="lg:col-span-7 lg:border-l lg:border-slate-200 lg:pl-14">
            <p
              data-reveal=""
              className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 pb-3 border-b border-slate-300 mb-2"
            >
              Core Values
            </p>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 divide-y divide-slate-200">
              {schoolInfo.coreValues.map((value, idx) => (
                <li
                  key={value.title}
                  data-reveal=""
                  data-reveal-delay={idx % 2 === 1 ? '1' : undefined}
                  className={`py-6 ${
                    idx === 1 ? 'sm:border-t-0' : ''
                  }`}
                >
                  <span className="block text-xs font-semibold text-primary tabular-nums mb-1.5">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-1.5">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {value.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
