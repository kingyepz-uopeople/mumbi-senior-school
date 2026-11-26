import type { Metadata } from 'next';
import Image from 'next/image';
import KcseResults from '@/components/academics/KcseResults';
import KcseTarget from '@/components/academics/KcseTarget';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { PathwaysTabs } from '@/components/home/PathwaysPreview';
import { departments, schoolInfo } from '@/data/mock-school-data';
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
    title: dict.academics.title,
    description: dict.academics.subtitle,
    path: `/${locale}/academics`,
  });
}

export default async function AcademicsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="academics"
        titleEffect="scramble"
        kicker={dict.academics.kicker}
        title={dict.academics.title}
        subtitle={dict.academics.subtitle}
        meta={[
          `${dict.footer.knecCode} ${schoolInfo.knecCode}`,
          dict.academics.metaPathways,
          dict.academics.metaDepartments,
        ]}
      />

      {/* 1. CBC Pathways */}
      <section
        id="pathways"
        aria-labelledby="academics-pathways-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-slate-bg border-b border-slate-200"
      >
        <SectionStemBackdrop variant="stem" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <div data-reveal="" className="max-w-2xl mb-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
                  {dict.academics.pathwaysKicker}
                </p>
                <BlurRevealHeading
                  id="academics-pathways-heading"
                  seed="academics-pathways"
                  className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
                >
                  {dict.academics.pathwaysHeading}
                </BlurRevealHeading>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {fill(dict.academics.pathwaysIntro, { name: schoolInfo.name })}
                </p>
              </div>

              <div data-reveal="" data-reveal-delay="1">
                <PathwaysTabs idPrefix="academics-pathway" />
              </div>
            </div>

            <figure data-reveal="" className="m-0 lg:col-span-5">
              <div className="relative w-full aspect-16/9 overflow-hidden bg-slate-100 border border-slate-300">
                <Image
                  src="/images/school/academics-study.jpg"
                  alt="Students studying together at classroom tables"
                  width={1599}
                  height={899}
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 40vw, 500px"
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. Academic Departments Directory */}
      <section
        id="departments"
        aria-labelledby="academics-departments-heading"
        className="relative scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-200"
      >
        <SectionStemBackdrop variant="laboratory" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div data-reveal="" className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              {dict.academics.departmentsKicker}
            </p>
            <BlurRevealHeading
              id="academics-departments-heading"
              seed="academics-departments"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {dict.academics.departmentsHeading}
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              {dict.academics.departmentsIntro}
            </p>
          </div>

          <div className="border-t-2 border-primary divide-y divide-slate-200 border-b border-slate-200">
            {departments.map((dept) => (
              <article
                key={dept.id}
                data-reveal=""
                className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <div className="md:col-span-4">
                  <h3 className="font-serif text-xl font-bold text-slate-900">
                    {dept.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary mt-1">
                    {dict.academics.hod} {dept.hod}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 mb-1.5">
                    {dict.academics.subjects}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {dept.subjects.join(' · ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <KcseTarget />
      <KcseResults knecCode={schoolInfo.knecCode} />
    </div>
  );
}