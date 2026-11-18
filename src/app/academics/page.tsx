import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import { PathwaysTabs } from '@/components/home/PathwaysPreview';
import WallOfFameGrid from '@/components/shared/WallOfFameGrid';
import { departments, schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Academics & CBC Pathways',
  description:
    'CBC Senior School pathways (STEM, Social Sciences, and Arts & Sports Science for Grades 10–12), the five teaching departments and Heads of Department, and KCSE results at Mumbi Girls Senior School.',
  path: '/academics',
});

export default function AcademicsPage() {
  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="academics"
        kicker="Curriculum & Examinations"
        title="Academics & CBC Pathways"
        subtitle="Senior School pathways for Grades 10 to 12 under Kenya's Competency-Based Curriculum, our five teaching departments, and recorded KCSE placements."
        meta={[
          `KNEC Centre ${schoolInfo.knecCode}`,
          '3 Senior School Pathways',
          '5 Academic Departments',
        ]}
      />

      {/* 1. CBC Pathways */}
      <section
        id="pathways"
        aria-labelledby="academics-pathways-heading"
        className="scroll-mt-28 py-16 sm:py-20 bg-slate-bg border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div data-reveal="" className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Grades 10 – 12
            </p>
            <h2
              id="academics-pathways-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              CBC Senior School Pathways
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Incoming Senior School students at {schoolInfo.name} select one of
              three pathways according to subject placement and career plans.
            </p>
          </div>

          <div data-reveal="" data-reveal-delay="1">
            <PathwaysTabs idPrefix="academics-pathway" />
          </div>
        </div>
      </section>

      {/* 2. Academic Departments Directory */}
      <section
        id="departments"
        aria-labelledby="academics-departments-heading"
        className="scroll-mt-28 py-16 sm:py-20 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div data-reveal="" className="max-w-2xl mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Teaching Faculty
            </p>
            <h2
              id="academics-departments-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Academic Departments
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Subject teaching, laboratory practicals, and internal examinations
              are organised under five departments.
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
                    Head of Department: {dept.hod}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {dept.description}
                  </p>
                </div>

                <div className="md:col-span-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 mb-1.5">
                    Subjects
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

      {/* 3. KCSE Roll of Honour */}
      <section
        id="wall-of-fame"
        aria-labelledby="academics-wof-heading"
        className="scroll-mt-28 py-16 sm:py-20 bg-slate-bg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div data-reveal="" className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              National Examinations · KNEC {schoolInfo.knecCode}
            </p>
            <h2
              id="academics-wof-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              KCSE Roll of Honour
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Top candidates recorded from recent KCSE sittings and the
              university degree programmes to which they were admitted.
            </p>
          </div>

          <div data-reveal="" data-reveal-delay="1">
            <WallOfFameGrid />
          </div>
        </div>
      </section>
    </div>
  );
}
