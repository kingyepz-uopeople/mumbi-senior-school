'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Cpu,
  FlaskConical,
  Globe,
  Microscope,
  Music,
  Palette,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { cbcPathways } from '@/data/mock-school-data';

export const pathwayTrackIconMap: Record<string, LucideIcon> = {
  FlaskConical,
  Microscope,
  Cpu,
  Globe,
  TrendingUp,
  BookOpen,
  Music,
  Palette,
  Trophy,
};

interface PathwaysTabsProps {
  idPrefix?: string;
}

export function PathwaysTabs({ idPrefix = 'home-pathway' }: PathwaysTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = cbcPathways.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % total;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + total) % total;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = total - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const activePathway = cbcPathways[activeIndex];
  const activeTabId = `${idPrefix}-tab-${activePathway.id}`;
  const activePanelId = `${idPrefix}-panel-${activePathway.id}`;

  return (
    <div>
      {/* Accessible Mobile-First Tablist */}
      <div className="flex justify-center mb-8">
        <div
          role="tablist"
          aria-label="CBC Senior School Pathways"
          className="grid grid-cols-1 sm:inline-flex w-full sm:w-auto gap-1.5 p-1.5 rounded-2xl bg-slate-200/80 border border-slate-300"
        >
          {cbcPathways.map((pathway, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={pathway.id}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                id={`${idPrefix}-tab-${pathway.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${idPrefix}-panel-${pathway.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`min-h-11 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selected
                    ? 'bg-maroon text-white shadow-sm'
                    : 'text-slate-700 hover:text-maroon hover:bg-white/70'
                }`}
              >
                {pathway.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Pathway Tabpanel */}
      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className="animate-fadeIn rounded-2xl"
      >
        <p className="text-center text-sm text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          {activePathway.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePathway.tracks.map((track) => {
            const Icon = pathwayTrackIconMap[track.icon] ?? FlaskConical;
            return (
              <article
                key={track.id}
                className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold shadow-xs hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {track.name}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                    {track.description}
                  </p>

                  {/* Subjects */}
                  <div className="mb-5">
                    <h4 className="text-xs font-bold text-maroon uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Key Subjects</span>
                    </h4>
                    <ul className="flex flex-wrap gap-1.5">
                      {track.subjects.map((subject) => (
                        <li
                          key={subject}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-bg border border-slate-200 text-slate-800"
                        >
                          {subject}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Career Prospects */}
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase
                      className="w-3.5 h-3.5 text-maroon"
                      aria-hidden="true"
                    />
                    <span>Career Prospects</span>
                  </h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {track.careers.map((career) => (
                      <li
                        key={career}
                        className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/20 text-maroon"
                      >
                        {career}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function PathwaysPreview() {
  return (
    <section
      aria-labelledby="cbc-pathways-heading"
      className="py-14 sm:py-20 bg-slate-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-maroon">
            Senior School Curriculum (Grades 10–12)
          </span>
          <h2
            id="cbc-pathways-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
          >
            CBC Senior School Pathways
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-3">
            Explore our three accredited pathways designed to nurture every
            learner&apos;s strengths, talents, and university aspirations.
          </p>
          <div
            className="w-16 h-1 rounded-full bg-gold mx-auto"
            aria-hidden="true"
          />
        </div>

        <PathwaysTabs idPrefix="home-pathway" />

        <div className="mt-10 text-center">
          <Link
            href="/academics#departments"
            className="min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-maroon text-maroon hover:bg-maroon hover:text-white font-bold text-sm transition-colors"
          >
            <span>Explore Academic Departments</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
