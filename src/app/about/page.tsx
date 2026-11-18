import type { Metadata } from 'next';
import Image from 'next/image';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import RegistryLogo from '@/components/shared/RegistryLogo';
import ScrollHighlightText from '@/components/shared/ScrollHighlightText';
import ProspectusCardArt, {
  type ProspectusArtKey,
} from '@/components/shared/ProspectusCardArt';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import SpotlightCardGroup from '@/components/shared/SpotlightCardGroup';
import {
  bomChairpersons,
  governanceRoles,
  principals,
  schoolAnthem,
  schoolInfo,
} from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'About the School',
  description:
    "History of Mumbi Girls Senior School since 1960, official motto (Determined to Excel), mission, vision, core values, English and Kiswahili school anthems, roll of principals, BOM chairpersons, and student council governance in Mukuyu, Murang'a County.",
  path: '/about',
});

const ROMAN = ['I', 'II', 'III'] as const;

const CORE_VALUE_ART: ProspectusArtKey[] = [
  'academic-excellence',
  'integrity-accountability',
  'discipline-governance',
  'innovation-creativity',
  'faith-morality',
  'inclusivity-respect',
];

export default function AboutPage() {
  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="about"
        kicker="About the School"
        title={schoolInfo.name}
        subtitle={`A ${schoolInfo.category} in Mukuyu Sub-location, Kiharu Constituency, Murang'a East, established in ${schoolInfo.founded}.`}
        meta={[
          `Est. ${schoolInfo.founded}`,
          `KNEC ${schoolInfo.knecCode}`,
          `MoE ${schoolInfo.moeReg}`,
          schoolInfo.postalAddress,
        ]}
      />

      {/* 1. History & School Registry */}
      <section
        id="history"
        aria-labelledby="about-history-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-200"
      >
        <SectionStemBackdrop variant="history" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div data-reveal="" className="lg:col-span-7 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              School History
            </p>
            <BlurRevealHeading
              id="about-history-heading"
              seed="about-history"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
            >
              Mukuyu, Murang&apos;a — Since {schoolInfo.founded}
            </BlurRevealHeading>
            <div className="w-10 h-0.5 bg-accent mb-6" aria-hidden="true" />

            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <ScrollHighlightText
                seed="about-history-intro"
                segments={[
                  `${schoolInfo.name} was founded in `,
                  { text: String(schoolInfo.founded), strong: true },
                  " in Mukuyu, within Kiharu Constituency in Murang'a East, Murang'a County. The school carries the name ",
                  { text: 'Mumbi', em: true },
                  ", the matriarch of the Agikuyu people, and opened to expand public secondary schooling for girls in Murang'a and the wider region.",
                ]}
              />
              <p>
                Supported over six decades by successive Boards of Management,
                parents, teaching and non-teaching staff, and the Ministry of
                Education, the institution operates today as a registered{' '}
                <strong>{schoolInfo.category}</strong> (KNEC Centre Code{' '}
                <strong>{schoolInfo.knecCode}</strong>, Ministry of Education
                Registration <strong>{schoolInfo.moeReg}</strong>) with a
                boarding enrolment of over 1,200 students.
              </p>
              <p>
                In line with Kenya&apos;s Competency-Based Curriculum (CBC), the
                school admits Senior School students in Grades 10 to 12 across
                three pathways — <strong>STEM</strong>,{' '}
                <strong>Social Sciences</strong>, and{' '}
                <strong>Arts &amp; Sports Science</strong> — alongside a full
                boarding timetable of supervised study, sports, clubs, and
                chaplaincy.
              </p>
            </div>
          </div>

          {/* Registry Sidebar */}
          <aside
            data-reveal=""
            data-reveal-delay="1"
            aria-label="Official school registration particulars"
            className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-12"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 pb-3 border-b border-slate-300">
              Official Registration
            </p>
            <dl className="divide-y divide-slate-200 text-sm">
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">Official Name</dt>
                <dd className="font-serif font-bold text-base text-slate-900 mt-0.5">
                  {schoolInfo.name}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">Category</dt>
                <dd className="font-medium text-slate-900 mt-0.5">
                  {schoolInfo.category}
                </dd>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4 tabular-nums">
                <div>
                  <dt className="text-xs text-slate-600">KNEC Centre Code</dt>
                  <dd className="font-semibold text-slate-900 mt-0.5">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
                <RegistryLogo agency="knec" size="card" surface="light" />
              </div>
              <div className="py-3.5 flex flex-wrap items-center justify-between gap-4 tabular-nums">
                <div>
                  <dt className="text-xs text-slate-600">MoE Registration</dt>
                  <dd className="font-semibold text-slate-900 mt-0.5">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
                <RegistryLogo agency="moe" size="card" surface="light" />
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">Physical Location</dt>
                <dd className="text-slate-800 mt-0.5">
                  {schoolInfo.physicalLocation}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">Postal Address</dt>
                <dd className="text-slate-800 mt-0.5">
                  {schoolInfo.postalAddress}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">Office Hours</dt>
                <dd className="text-slate-800 mt-0.5">
                  {schoolInfo.officeHours}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <figure data-reveal="" className="m-0">
              <div className="relative w-full aspect-3/4 overflow-hidden bg-slate-100 border border-slate-300">
                <Image
                  src="/images/school/about-prize-1.jpg"
                  alt="Student receiving a prize from school staff"
                  width={960}
                  height={1280}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>

            <figure data-reveal="" data-reveal-delay="1" className="m-0">
              <div className="relative w-full aspect-3/4 overflow-hidden bg-slate-100 border border-slate-300">
                <Image
                  src="/images/school/about-prize-2.jpg"
                  alt="Student accepting a trophy during prize giving"
                  width={1200}
                  height={1600}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Motto, Mission, Vision & Core Values */}
      <section
        id="mission"
        aria-labelledby="about-mission-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-slate-bg border-b border-slate-200"
      >
        <SectionStemBackdrop variant="about-ethos" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div data-reveal="" className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Charter &amp; Values
            </p>
            <BlurRevealHeading
              id="about-mission-heading"
              seed="about-mission"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Motto, Mission, Vision &amp; Core Values
            </BlurRevealHeading>
          </div>

          <div
            data-reveal=""
            data-reveal-delay="1"
            className="bg-white/35 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          >
            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                School Motto
              </h3>
              <p className="font-serif italic text-2xl font-bold text-slate-900 leading-snug">
                &ldquo;{schoolInfo.motto}&rdquo;
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                Mission
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {schoolInfo.mission}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                Vision
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {schoolInfo.vision}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-slate-600 pb-3 border-b border-slate-300 mb-6">
              Six Core Values
            </h3>
            <SpotlightCardGroup cardCount={schoolInfo.coreValues.length}>
              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {schoolInfo.coreValues.map((val, idx) => (
                  <li
                    key={val.title}
                    data-reveal=""
                    data-reveal-delay={
                      idx % 3 > 0 ? String(idx % 3) : undefined
                    }
                    className="min-w-0"
                  >
                    <article
                      data-card-cycle
                      className="flex h-full min-h-[380px] flex-col rounded-3xl border border-t-2 border-t-primary bg-white p-5 sm:min-h-[400px] sm:p-6"
                    >
                      <span className="mb-1 block text-xs font-semibold tabular-nums text-primary">
                        0{idx + 1}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-primary-dark sm:text-xl">
                        {val.title}
                      </h4>
                      <div className="flex flex-1 items-center justify-center py-5">
                        <ProspectusCardArt
                          kind={CORE_VALUE_ART[idx]}
                          className="h-28 w-36 sm:h-32 sm:w-40"
                        />
                      </div>
                      <p className="mt-auto border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600">
                        {val.description}
                      </p>
                    </article>
                  </li>
                ))}
              </ol>
            </SpotlightCardGroup>
          </div>
        </div>
      </section>

      {/* 3. School Anthems (English & Kiswahili) */}
      <section
        id="anthems"
        aria-labelledby="about-anthems-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-200"
      >
        <SectionStemBackdrop variant="anthems" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div data-reveal="" className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Assembly Tradition
            </p>
            <BlurRevealHeading
              id="about-anthems-heading"
              seed="about-anthems"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              School Anthem &amp; Wimbo wa Shule
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Sung in English and Kiswahili at morning assemblies and official
              school functions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* English Anthem */}
            <article
              data-reveal=""
              className="bg-slate-bg/45 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {schoolAnthem.english.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  English
                </span>
              </div>
              <ol className="space-y-6">
                {schoolAnthem.english.verses.map((verse, i) => (
                  <li key={i} className="grid grid-cols-12 gap-3">
                    <span
                      aria-hidden="true"
                      className="col-span-2 sm:col-span-1 font-serif text-xs font-bold text-slate-500 pt-1"
                    >
                      {ROMAN[i] ?? i + 1}.
                    </span>
                    <p className="col-span-10 sm:col-span-11 whitespace-pre-line font-serif italic text-base sm:text-[1.05rem] text-slate-800 leading-relaxed">
                      {verse}
                    </p>
                  </li>
                ))}
              </ol>
            </article>

            {/* Kiswahili Anthem */}
            <article
              lang="sw"
              data-reveal=""
              data-reveal-delay="1"
              className="bg-slate-bg/45 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10"
            >
              <div className="flex items-baseline justify-between gap-4 pb-4 mb-6 border-b border-slate-200">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                  {schoolAnthem.kiswahili.title}
                </h3>
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  Kiswahili
                </span>
              </div>
              <ol className="space-y-6">
                {schoolAnthem.kiswahili.verses.map((verse, i) => (
                  <li key={i} className="grid grid-cols-12 gap-3">
                    <span
                      aria-hidden="true"
                      className="col-span-2 sm:col-span-1 font-serif text-xs font-bold text-slate-500 pt-1"
                    >
                      {ROMAN[i] ?? i + 1}.
                    </span>
                    <p className="col-span-10 sm:col-span-11 whitespace-pre-line font-serif italic text-base sm:text-[1.05rem] text-slate-800 leading-relaxed">
                      {verse}
                    </p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      {/* 4. Leadership & Governance */}
      <section
        id="leadership"
        aria-labelledby="about-leadership-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-slate-bg"
      >
        <SectionStemBackdrop variant="leadership" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 space-y-14">
          <div data-reveal="" className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Leadership &amp; Governance
            </p>
            <BlurRevealHeading
              id="about-leadership-heading"
              seed="about-leadership"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Principals, Board of Management &amp; Student Council
            </BlurRevealHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Roll of Principals */}
            <div data-reveal="">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b-2 border-primary">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Roll of Principals
                </h3>
                <span className="text-xs text-slate-600 tabular-nums">
                  {schoolInfo.founded} – Present
                </span>
              </div>
              <ol className="bg-white/45 border-x border-b border-slate-200 divide-y divide-slate-200">
                {principals.map((principal) => (
                  <li
                    key={principal.id}
                    className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${
                      principal.isCurrent ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-slate-900">
                        {principal.name}
                      </span>
                      {principal.isCurrent && (
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-accent text-white">
                          Current
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 tabular-nums shrink-0">
                      {principal.period}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* BOM Chairpersons */}
            <div data-reveal="" data-reveal-delay="1">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b-2 border-primary">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  Board of Management Chairpersons
                </h3>
                <span className="text-xs text-slate-600 tabular-nums">
                  {schoolInfo.founded} – Present
                </span>
              </div>
              <ol className="bg-white/45 border-x border-b border-slate-200 divide-y divide-slate-200">
                {bomChairpersons.map((chair) => (
                  <li
                    key={chair.id}
                    className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 ${
                      chair.isCurrent ? 'bg-primary/5' : ''
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-serif font-bold text-base text-slate-900">
                        {chair.name}
                      </span>
                      {chair.isCurrent && (
                        <span className="px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-wider bg-accent text-white">
                          Incumbent
                        </span>
                      )}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-600 tabular-nums shrink-0">
                      {chair.period}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Administrative Deputies & Student Council (solid deep blue, ruled columns) */}
          <div
            data-dark-surface
            data-reveal=""
            className="bg-primary-dark text-white border border-primary-dark"
          >
            <div className="px-6 sm:px-8 py-5 border-b border-white/15">
              <h3 className="font-serif text-xl font-bold text-white">
                Administration &amp; Elected Student Council
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/15">
              {governanceRoles.map((item) => (
                <article key={item.id} className="p-6 sm:p-8 flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-100 mb-1.5">
                    {item.role}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white mb-2.5">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/85 leading-relaxed mb-5">
                    {item.description}
                  </p>
                  <ul className="mt-auto pt-4 border-t border-white/15 space-y-2 text-xs text-white/90">
                    {item.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-baseline gap-2">
                        <span
                          className="text-blue-200 select-none"
                          aria-hidden="true"
                        >
                          –
                        </span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
