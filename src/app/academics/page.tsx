import type { Metadata } from 'next';
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Globe,
  GraduationCap,
  Languages,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { PathwaysTabs } from '@/components/home/PathwaysPreview';
import WallOfFameGrid from '@/components/shared/WallOfFameGrid';
import { departments, schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Academics & CBC Pathways',
  description:
    'Explore CBC Senior School Pathways (STEM, Social Sciences, and Arts & Sports Science for Grades 10–12), academic departments with Heads of Department, and the KCSE Wall of Fame at Mumbi Girls Senior School.',
  path: '/academics',
});

const deptIconMap: Record<string, LucideIcon> = {
  Calculator,
  FlaskConical,
  Languages,
  Globe,
  Wrench,
};

export default function AcademicsPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Curriculum & Academic Excellence"
        title="Academics & CBC Pathways"
        description="Holistic senior secondary scholarship aligned with Kenya's Competency-Based Curriculum (Grades 10–12) and KNEC national examinations."
        icon={GraduationCap}
        chips={[
          `KNEC Centre: ${schoolInfo.knecCode}`,
          '3 CBC Senior School Pathways',
          '5 Academic Departments',
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
        {/* CBC Pathways Explorer */}
        <section
          id="pathways"
          aria-labelledby="academics-pathways-heading"
          className="scroll-mt-28"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Senior School Pathways Hub
            </span>
            <h2
              id="academics-pathways-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2"
            >
              CBC Senior School Pathways (Grades 10 – 12)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Under Kenya&apos;s Basic Education Curriculum Framework,{' '}
              {schoolInfo.name} offers three specialised pathways tailored to
              diverse student aptitudes and university career goals.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <PathwaysTabs idPrefix="academics-pathway" />
        </section>

        {/* Academic Departments Directory */}
        <section
          id="departments"
          aria-labelledby="academics-departments-heading"
          className="scroll-mt-28"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Faculty &amp; Subject Areas
            </span>
            <h2
              id="academics-departments-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2"
            >
              Academic Departments Directory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Experienced teaching faculty organised into five collaborative
              departments supporting every learner from orientation through
              final examinations.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept) => {
              const Icon = deptIconMap[dept.icon] ?? BookOpen;
              return (
                <article
                  key={dept.id}
                  className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug">
                          {dept.name}
                        </h3>
                        <p className="text-xs text-maroon font-bold mt-0.5">
                          HOD: {dept.hod}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                      {dept.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-2">
                      Subjects Offered
                    </span>
                    <ul className="flex flex-wrap gap-1.5">
                      {dept.subjects.map((sub) => (
                        <li
                          key={sub}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-bg border border-slate-200 text-slate-800 font-medium"
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Full KCSE Wall of Fame */}
        <section
          id="wall-of-fame"
          aria-labelledby="academics-wof-heading"
          className="scroll-mt-28"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Academic Distinction
            </span>
            <h2
              id="academics-wof-heading"
              className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2"
            >
              KCSE Wall of Fame (Top Scholars)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Celebrating top-performing alumnae admitted to competitive
              university degree programmes across Kenya. Filter by examination
              year below.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <WallOfFameGrid />
        </section>
      </div>
    </div>
  );
}
