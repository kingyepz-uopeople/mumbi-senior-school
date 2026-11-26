'use client';

import Image from 'next/image';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
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
    code: 'STEM',
  },
  'social-sciences': {
    src: '/images/pathways/pathways-social-sciences.jpg',
    alt: 'Students studying together in a school library',
    code: 'Social',
  },
  'arts-sports': {
    src: '/images/pathways/pathways-arts-sports-science.jpg',
    alt: 'Students training for an outdoor athletics event',
    code: 'Arts & Sports',
  },
} as const;

interface PathwaysTabsProps {
  idPrefix?: string;
}

export function PathwaysTabs({ idPrefix = 'home-pathway' }: PathwaysTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
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
              className="w-[82vw] max-w-sm shrink-0 snap-center text-left focus-visible:rounded-[1.25rem] lg:w-full lg:max-w-none"
            >
              <span
                data-card-cycle
                data-pathway-preview-card=""
                data-selected={selected ? 'true' : 'false'}
                className="pathway-preview-card"
              >
                <span className="pathway-preview-photo">
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    fill
                    sizes="(max-width: 639px) 82vw, (max-width: 1023px) 384px, 32vw"
                    className="pathway-preview-image object-cover"
                  />
                  <span
                    className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-900/15 to-transparent"
                    aria-hidden="true"
                  />

                  <span className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                    <span className="pathway-preview-code">{visual.code}</span>
                    <span className="pathway-preview-explore">
                      Explore{' '}
                      <span className="pathway-preview-explore-arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </span>

                  <span className="absolute inset-x-5 bottom-3.5">
                    <span className="block font-serif text-xl font-bold leading-snug text-white drop-shadow-sm sm:text-[1.35rem]">
                      {pathway.name}
                    </span>
                    <span className="pathway-preview-underline mt-1.5" aria-hidden="true" />
                  </span>
                </span>

                <span className="pathway-preview-body">
                  <span
                    id={`${idPrefix}-summary-${pathway.id}`}
                    className="block text-sm leading-relaxed text-slate-600"
                  >
                    {pathway.summary}
                  </span>

                  <span className="mt-4 block">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                      Tracks
                    </span>
                    <span className="mt-2.5 flex flex-wrap gap-1.5">
                      {pathway.tracks.map((track, trackIndex) => (
                        <span
                          key={track.id}
                          className="subject-chip"
                          style={
                            {
                              '--chip-delay': `${trackIndex * 35}ms`,
                            } as CSSProperties
                          }
                        >
                          {track.name}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </SpotlightCardGroup>

      <div
        id={activePanelId}
        role="tabpanel"
        aria-labelledby={activeTabId}
        tabIndex={0}
        className="mt-8 animate-fadeIn"
      >
        <div className="grid grid-cols-1 divide-y divide-slate-200 border-x border-b border-slate-200 border-t-2 border-t-primary bg-white/45 md:grid-cols-3 md:divide-x md:divide-y-0">
          {activePathway.tracks.map((track) => (
            <article
              key={track.id}
              className="flex flex-col justify-between gap-6 p-6 sm:p-7"
            >
              <div>
                <h3 className="mb-2 font-serif text-xl font-bold text-slate-900">
                  {track.name}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-slate-600">
                  {track.description}
                </p>

                <div>
                  <h4 className="mb-2 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    Subjects Taught
                  </h4>
                  <ul className="space-y-1 text-sm text-slate-800">
                    {track.subjects.map((subject) => (
                      <li key={subject} className="flex items-baseline gap-2">
                        <span
                          className="select-none text-slate-400"
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

              <div className="border-t border-slate-200 pt-4">
                <h4 className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  Related University Fields
                </h4>
                <p className="text-xs leading-relaxed text-slate-700">
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
      className="relative bg-slate-bg py-16 sm:py-24"
    >
      <SectionStemBackdrop variant="stem" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div
          data-reveal=""
          className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Senior School Curriculum · Grades 10 – 12
            </p>
            <BlurRevealHeading
              id="cbc-pathways-heading"
              seed="home-cbc-pathways"
              className="font-serif text-2xl font-bold leading-tight text-slate-900 sm:text-3xl lg:text-4xl"
            >
              CBC Senior School Pathways
            </BlurRevealHeading>
          </div>

          <Link
            href="/academics#departments"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 transition-colors hover:text-primary-dark hover:underline"
          >
            <span>View all five academic departments</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 stroke-[1.75]"
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
