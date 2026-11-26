import type { Metadata } from 'next';
import Image from 'next/image';
import type { ComponentType } from 'react';
import {
  BookOpenCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  Eye,
  HandHeart,
  Leaf,
  Lightbulb,
  Target,
} from 'lucide-react';
import type { IconProps } from '@/components/icons';
import { Clock, MessagesSquare, ShieldCheck, UsersRound } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import RegistryLogo from '@/components/shared/RegistryLogo';
import ScrollHighlightText from '@/components/shared/ScrollHighlightText';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import {
  bomChairpersons,
  governanceRoles,
  principals,
  schoolAnthem,
  schoolInfo,
} from '@/data/mock-school-data';
import { fill } from '@/i18n/fill';
import { getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale, dict } = await getLocaleDictionary(params);

  return buildPageMetadata({
    title: dict.about.title,
    description: `Discover the history, values, anthems, and leadership of ${schoolInfo.name}, located in ${schoolInfo.physicalLocation}.`,
    path: `/${locale}/about`,
  });
}

const ROMAN = ['I', 'II', 'III'] as const;

const CORE_VALUE_ICONS: Record<string, ComponentType<IconProps>> = {
  hardwork: BookOpenCheck,
  honesty: ShieldCheck,
  accountability: ClipboardCheck,
  respect: HandHeart,
  professionalism: BriefcaseBusiness,
  teamwork: UsersRound,
  effectiveness: Target,
  creativity: Lightbulb,
  peace: Leaf,
  'time-conscientiousness': Clock,
  transparency: Eye,
  'customer-focus': MessagesSquare,
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="about"
        kicker={dict.about.kicker}
        title={schoolInfo.name}
        subtitle={fill(dict.about.subtitle, {
          category: dict.school.category,
          location: schoolInfo.physicalLocation,
          foundedOn: schoolInfo.foundedOn,
        })}
        meta={[
          `${dict.school.foundedLabel} ${schoolInfo.founded}`,
          `${dict.footer.knecCode} ${schoolInfo.knecCode}`,
          `${dict.footer.moeReg} ${schoolInfo.moeReg}`,
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
              {dict.about.historyKicker}
            </p>
            <BlurRevealHeading
              id="about-history-heading"
              seed="about-history"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mb-4"
            >
              {fill(dict.about.historyHeading, { year: schoolInfo.founded })}
            </BlurRevealHeading>
            <div className="w-10 h-0.5 bg-accent mb-6" aria-hidden="true" />

            <div className="space-y-4 text-slate-700 text-base leading-relaxed">
              <ScrollHighlightText
                seed="about-history-intro"
                segments={[
                  dict.about.historyIntroLead,
                  { text: dict.about.historyIntroDate, strong: true },
                  dict.about.historyIntroBy,
                  { text: schoolInfo.founder, strong: true },
                  dict.about.historyIntroTail,
                  { text: 'Mumbi', em: true },
                  dict.about.historyIntroMumbiNote,
                ]}
              />
              <p>
                {fill(dict.about.historySupport, {
                  category: dict.school.category,
                  knec: schoolInfo.knecCode,
                  moe: schoolInfo.moeReg,
                })}
              </p>
              <p>{dict.about.historyCbc}</p>
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
              {dict.about.officialRegistration}
            </p>
            <dl className="divide-y divide-slate-200 text-sm">
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.officialName}</dt>
                <dd className="font-serif font-bold text-base text-slate-900 mt-0.5">
                  {schoolInfo.name}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.foundationStone}</dt>
                <dd className="font-medium text-slate-900 mt-0.5">
                  {schoolInfo.foundedOn}
                </dd>
                <dd className="text-slate-700 mt-1 text-xs leading-relaxed">
                  {dict.about.laidBy} {schoolInfo.founder}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.category}</dt>
                <dd className="font-medium text-slate-900 mt-0.5">
                  {dict.school.category}
                </dd>
              </div>
              <div className="py-3.5 flex items-center justify-between gap-4 tabular-nums">
                <div>
                  <dt className="text-xs text-slate-600">{dict.footer.knecCode}</dt>
                  <dd className="font-semibold text-slate-900 mt-0.5">
                    {schoolInfo.knecCode}
                  </dd>
                </div>
                <RegistryLogo agency="knec" size="card" surface="light" />
              </div>
              <div className="py-3.5 flex flex-wrap items-center justify-between gap-4 tabular-nums">
                <div>
                  <dt className="text-xs text-slate-600">{dict.footer.moeReg}</dt>
                  <dd className="font-semibold text-slate-900 mt-0.5">
                    {schoolInfo.moeReg}
                  </dd>
                </div>
                <RegistryLogo agency="moe" size="card" surface="light" />
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.physicalLocation}</dt>
                <dd className="text-slate-800 mt-0.5">
                  {schoolInfo.physicalLocation}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.postalAddress}</dt>
                <dd className="text-slate-800 mt-0.5">
                  {schoolInfo.postalAddress}
                </dd>
              </div>
              <div className="py-3.5">
                <dt className="text-xs text-slate-600">{dict.about.officeHours}</dt>
                <dd className="text-slate-800 mt-0.5">
                  {dict.officeHours.full}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            <figure data-reveal="" className="m-0">
              <div className="relative w-full aspect-3/4 overflow-hidden bg-slate-100 border border-slate-300">
                <Image
                  src="/images/school/foundation-plaque.jpg"
                  alt="Foundation stone plaque laid by Hon. Dr. J. G. Kiano on 9 November 1968"
                  width={960}
                  height={1280}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-slate-600">
                {dict.about.foundationCaption}
              </figcaption>
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
              {dict.about.ethosKicker}
            </p>
            <BlurRevealHeading
              id="about-mission-heading"
              seed="about-mission"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {dict.about.ethosHeading}
            </BlurRevealHeading>
          </div>

          <div
            data-reveal=""
            data-reveal-delay="1"
            className="bg-white/35 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200"
          >
            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                {dict.home.schoolMotto}
              </h3>
              <p className="font-serif italic text-2xl font-bold text-slate-900 leading-snug">
                &ldquo;{dict.school.motto}&rdquo;
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                {dict.home.mission}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {dict.school.mission}
              </p>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary mb-3">
                {dict.home.vision}
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {dict.school.vision}
              </p>
            </div>
          </div>

          <section
            id="core-values"
            aria-labelledby="core-values-heading"
            className="scroll-mt-4 bg-[#F8FAFC] text-[#0C3D6E]"
          >
            <h3 id="core-values-heading" className="mb-6 font-serif text-xl font-bold sm:text-2xl">
              {dict.home.coreValues}
            </h3>
            <ol role="list" className="border-t border-[#115191]/20">
              {schoolInfo.coreValues.map((value, idx) => {
                const Icon = CORE_VALUE_ICONS[value.id];
                const localized =
                  dict.school.coreValues[
                    value.id as keyof typeof dict.school.coreValues
                  ];
                return (
                  <li
                    key={value.id}
                    data-reveal=""
                    data-reveal-delay={String(idx % 4)}
                    className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)] items-start gap-x-4 gap-y-2 border-b border-[#115191]/20 py-6 sm:grid-cols-[1.25rem_minmax(12rem,1fr)_minmax(0,2fr)] sm:gap-x-6 sm:py-7"
                  >
                    <Icon className="mt-1 size-5 text-[#115191]" strokeWidth={1.75} aria-hidden="true" />
                    <h4 className="font-serif text-lg font-bold">
                      {localized.title}
                    </h4>
                    <p className="col-start-2 text-sm leading-relaxed sm:col-start-3 sm:text-base">
                      {localized.description}
                    </p>
                  </li>
                );
              })}
            </ol>
          </section>
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
              {dict.about.anthemsKicker}
            </p>
            <BlurRevealHeading
              id="about-anthems-heading"
              seed="about-anthems"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {dict.about.anthemsHeading}
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {dict.about.anthemsIntro}
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
                  {dict.common.english}
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
                  {dict.common.kiswahili}
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
              {dict.about.leadershipKicker}
            </p>
            <BlurRevealHeading
              id="about-leadership-heading"
              seed="about-leadership"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {dict.about.leadershipHeading}
            </BlurRevealHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Roll of Principals */}
            <div data-reveal="">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b-2 border-primary">
                <h3 className="font-serif text-xl font-bold text-slate-900">
                  {dict.about.rollOfPrincipals}
                </h3>
                <span className="text-xs text-slate-600 tabular-nums">
                  {fill(dict.about.foundedPresent, { year: schoolInfo.founded })}
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
                          {dict.common.current}
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
                  {dict.about.bomChairs}
                </h3>
                <span className="text-xs text-slate-600 tabular-nums">
                  {fill(dict.about.foundedPresent, { year: schoolInfo.founded })}
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
                          {dict.common.incumbent}
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
                {dict.about.adminCouncil}
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
