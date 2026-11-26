import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import LocaleLink from '@/i18n/LocaleLink';
import { getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  'use cache';
  const { locale, dict } = await getLocaleDictionary(params);
  const page = dict.studentLifePage;

  return buildPageMetadata({
    title: page.title,
    description: page.subtitle,
    path: `/${locale}/student-life`,
  });
}

export default async function StudentLifeLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const page = dict.studentLifePage;
  const e = dict.explore;

  const sections = [
    {
      n: '01',
      title: dict.nav.clubs,
      detail: e.clubsIntro,
      href: '/explore#clubs',
    },
    {
      n: '02',
      title: dict.nav.sports,
      detail: e.sportsIntro,
      href: '/explore#sports',
    },
    {
      n: '03',
      title: dict.nav.routine,
      detail: e.routineIntro,
      href: '/explore#routine',
    },
    {
      n: '04',
      title: dict.nav.faith,
      detail: e.faithIntro,
      href: '/explore#faith',
    },
    {
      n: '05',
      title: dict.nav.boarding,
      detail: e.boardingIntro,
      href: '/explore#boarding',
    },
  ] as const;

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="student-life"
        kicker={page.kicker}
        title={page.title}
        subtitle={page.subtitle}
        meta={[e.metaClubs, e.metaSports, e.metaRoutine, e.metaFaith]}
      />

      <section
        aria-labelledby="student-life-intro-heading"
        className="relative border-b border-slate-200 bg-white py-16 sm:py-20"
      >
        <SectionStemBackdrop variant="student-life" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div data-reveal="" className="max-w-2xl lg:col-span-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {page.kicker}
            </p>
            <BlurRevealHeading
              id="student-life-intro-heading"
              seed="student-life-intro"
              className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              {page.title}
            </BlurRevealHeading>
            <div className="mt-4 mb-6 h-0.5 w-10 bg-accent" aria-hidden="true" />
            <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
              {page.intro}
            </p>
          </div>

          <figure data-reveal="" data-reveal-delay="1" className="m-0 lg:col-span-5">
            <div className="relative aspect-4/3 w-full overflow-hidden border border-slate-300 bg-slate-100">
              <Image
                src="/images/school/gallery-campus-parade.jpg"
                alt={page.photoAlt}
                width={1600}
                height={1200}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 500px"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-slate-600">
              {page.photoCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        aria-labelledby="student-life-index-heading"
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            {page.indexKicker}
          </p>
          <h2
            id="student-life-index-heading"
            className="font-serif text-3xl leading-tight font-bold sm:text-4xl"
          >
            {page.indexHeading}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
            {page.indexBody}
          </p>

          <ol className="editorial-index mt-8 sm:mt-10">
            {sections.map((section) => (
              <li key={section.href} className="editorial-cell">
                <LocaleLink
                  href={section.href}
                  className="editorial-row"
                  data-reveal=""
                >
                  <span className="editorial-numeral" aria-hidden="true">
                    {section.n}
                  </span>
                  <span className="min-w-0">
                    <span className="font-serif text-lg font-semibold text-white sm:text-xl">
                      {section.title}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/80 sm:text-sm">
                      {section.detail}
                    </span>
                  </span>
                  <ArrowRight
                    className="editorial-arrow size-5 shrink-0 text-white"
                    aria-hidden="true"
                  />
                </LocaleLink>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
