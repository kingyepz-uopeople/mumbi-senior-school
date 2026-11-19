'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import SpotlightCardGroup from '@/components/shared/SpotlightCardGroup';
import { cbcPathways } from '@/data/mock-school-data';

const PATHWAY_VISUALS = {
  stem: {
    src: '/images/pathways/pathways-stem.jpg',
    alt: 'Students conducting a science practical in a laboratory',
  },
  'social-sciences': {
    src: '/images/pathways/pathways-social-sciences.jpg',
    alt: 'Students studying together in a school library',
  },
  'arts-sports': {
    src: '/images/pathways/pathways-arts-sports-science.jpg',
    alt: 'Students training for an outdoor athletics event',
  },
} as const;

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
      {/* Tall pathway-card WAI-ARIA Tablist */}
      <SpotlightCardGroup
        cardCount={cbcPathways.length}
        role="tablist"
        aria-label="CBC Senior School Pathways"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-2 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pt-2"
      >
        {cbcPathways.map((pathway, index) => {
          const selected = index === activeIndex;
          const visual = PATHWAY_VISUALS[pathway.id];
          return (
            <button
              key={pathway.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`${idPrefix}-tab-${pathway.id}`}
              type="button"
              role="tab"
              aria-label={pathway.name}
              aria-describedby={`${idPrefix}-summary-${pathway.id}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel-${pathway.id}`}
              tabIndex={selected ? 0 : -1}
              data-reveal=""
              data-reveal-delay={index > 0 ? String(index) : undefined}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleTabKeyDown(e, index)}
              className="w-[82vw] max-w-sm shrink-0 snap-center text-left focus-visible:rounded-3xl lg:w-full lg:max-w-none"
            >
              <span
                data-card-cycle
                className={`flex h-full min-h-[430px] flex-col rounded-3xl border border-t-2 bg-white p-5 text-left sm:min-h-[460px] sm:p-6 ${
                  selected
                    ? 'border-primary ring-1 ring-primary/15'
                    : 'border-slate-200 border-t-primary'
                }`}
              >
                <span className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                  {pathway.name}
                </span>
                <span className="relative mt-5 block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-bg">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 384px, 32vw"
                    className="object-cover"
                  />
                </span>
                <span
                  id={`${idPrefix}-summary-${pathway.id}`}
                  className="mt-auto pt-5 text-sm leading-relaxed text-slate-700"
                >
                  {pathway.summary}
                </span>
              </span>
            </button>
          );
        })}
      </SpotlightCardGroup>

      {/* Active Pathway Tabpanel */}
      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className="mt-8 animate-fadeIn"
      >
        <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
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
      className="relative py-16 sm:py-24 bg-slate-bg"
    >
      <SectionStemBackdrop variant="stem" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div
          data-reveal=""
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Senior School Curriculum · Grades 10 – 12
            </p>
            <BlurRevealHeading
              id="cbc-pathways-heading"
              seed="home-cbc-pathways"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight"
            >
              CBC Senior School Pathways
            </BlurRevealHeading>
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
