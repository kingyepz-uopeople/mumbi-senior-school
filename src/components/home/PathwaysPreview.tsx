'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cbcPathways } from '@/data/mock-school-data';

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
      {/* Pill WAI-ARIA Tablist */}
      <div
        role="tablist"
        aria-label="CBC Senior School Pathways"
        className="flex flex-wrap items-center gap-2 mb-6"
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
              className={`min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
                selected
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {pathway.name}
            </button>
          );
        })}
      </div>

      {/* Active Pathway Tabpanel */}
      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className="animate-fadeIn"
      >
        <p className="text-sm sm:text-base text-slate-700 max-w-2xl mb-8 leading-relaxed">
          {activePathway.summary}
        </p>

        <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          {activePathway.tracks.map((track) => (
            <article
              key={track.id}
              className="p-6 sm:p-7 flex flex-col justify-between gap-6"
            >
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  {track.name}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  {track.description}
                </p>

                <div>
                  <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-2">
                    Subjects Taught
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-800">
                    {track.subjects.map((subject) => (
                      <li key={subject} className="flex items-baseline gap-2">
                        <span
                          className="text-slate-400 select-none"
                          aria-hidden="true"
                        >
                          –
                        </span>
                        <span>{subject}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 mb-1.5">
                  Related University Fields
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {track.careers.join(' · ')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PathwaysPreview() {
  return (
    <section
      aria-labelledby="cbc-pathways-heading"
      className="py-16 sm:py-24 bg-slate-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          data-reveal=""
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Senior School Curriculum · Grades 10 – 12
            </p>
            <h2
              id="cbc-pathways-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              CBC Senior School Pathways
            </h2>
          </div>

          <Link
            href="/academics#departments"
            className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors shrink-0"
          >
            <span>View all five academic departments</span>
            <ArrowRight
              className="w-4 h-4 shrink-0 stroke-[1.75]"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div data-reveal="" data-reveal-delay="1">
          <PathwaysTabs idPrefix="home-pathway" />
        </div>
      </div>
    </section>
  );
}
