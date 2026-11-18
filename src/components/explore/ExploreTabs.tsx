'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import {
  boardingSections,
  clubs,
  dailyRoutine,
  faithGroups,
  sports,
} from '@/data/mock-school-data';

type ExploreTabId = 'clubs' | 'sports' | 'routine' | 'faith' | 'boarding';

const TABS: { id: ExploreTabId; label: string }[] = [
  { id: 'clubs', label: 'Clubs & Movements' },
  { id: 'sports', label: 'Sports & Games' },
  { id: 'routine', label: 'Daily Routine' },
  { id: 'faith', label: 'Chaplaincy & Faith' },
  { id: 'boarding', label: 'Boarding & Uniform' },
];

const VALID_TAB_IDS = new Set<string>(TABS.map((t) => t.id));

function parseHashToTab(hash: string): ExploreTabId | null {
  const clean = hash.replace(/^#/, '').trim();
  return VALID_TAB_IDS.has(clean) ? (clean as ExploreTabId) : null;
}

export default function ExploreTabs() {
  const [activeTab, setActiveTab] = useState<ExploreTabId>('clubs');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tablistRef = useRef<HTMLDivElement>(null);

  const selectTab = useCallback((id: ExploreTabId, updateUrl = true) => {
    setActiveTab(id);
    if (updateUrl && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/explore#${id}`);
    }
  }, []);

  // Sync with URL hash on initial load, hashchange, and navbar dropdown clicks
  useEffect(() => {
    const syncFromHash = (scrollIntoView: boolean) => {
      const parsed = parseHashToTab(window.location.hash);
      if (!parsed) return;
      setActiveTab(parsed);
      if (scrollIntoView) {
        requestAnimationFrame(() => {
          tablistRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        });
      }
    };

    const initTimer = setTimeout(
      () => syncFromHash(Boolean(window.location.hash)),
      0
    );

    const onHashChange = () => syncFromHash(true);

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (
        event.target as HTMLElement | null
      )?.closest<HTMLAnchorElement>('a[href^="/explore#"]');
      if (!anchor) return;
      const hashIdx = anchor.href.indexOf('#');
      if (hashIdx === -1) return;
      const targetTab = parseHashToTab(anchor.href.slice(hashIdx));
      if (!targetTab) return;
      setActiveTab(targetTab);
      requestAnimationFrame(() => {
        tablistRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    };

    window.addEventListener('hashchange', onHashChange);
    document.addEventListener('click', onDocumentClick);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('hashchange', onHashChange);
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const total = TABS.length;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = (index + 1) % total;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + total) % total;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = total - 1;

    if (nextIndex !== null) {
      event.preventDefault();
      const target = TABS[nextIndex];
      selectTab(target.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <div className="space-y-12">
      {/* Left-Aligned Pill WAI-ARIA Tablist */}
      <div
        ref={tablistRef}
        id={activeTab}
        role="tablist"
        aria-label="Student life and boarding sections"
        className="scroll-mt-28 flex flex-wrap items-center gap-2"
      >
        {TABS.map((tab, index) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              id={`explore-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`explore-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
                selected
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panel 1: Clubs & Uniformed Movements */}
      {activeTab === 'clubs' && (
        <div
          id="explore-panel-clubs"
          role="tabpanel"
          aria-labelledby="explore-tab-clubs"
          tabIndex={0}
          className="space-y-8 animate-fadeIn"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Afternoon &amp; Weekend Societies
            </p>
            <BlurRevealHeading
              seed="explore-clubs"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Clubs &amp; Uniformed Movements
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Students join clubs and uniformed movements that meet after
              afternoon lessons and on Saturday afternoons under teacher
              patrons.
            </p>
          </div>

          <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
            {clubs.map((club) => (
              <article
                key={club.id}
                data-reveal=""
                className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start"
              >
                <div className="md:col-span-4">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary mb-0.5">
                    {club.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {club.name}
                  </h3>
                </div>

                <p className="md:col-span-5 text-sm text-slate-700 leading-relaxed">
                  {club.description}
                </p>

                <dl className="md:col-span-3 text-xs text-slate-600 space-y-1">
                  <div>
                    <dt className="inline font-semibold text-slate-800">
                      Patron:{' '}
                    </dt>
                    <dd className="inline">{club.patron}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-slate-800">
                      Meets:{' '}
                    </dt>
                    <dd className="inline tabular-nums">{club.meetingDay}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Panel 2: Sports & Games */}
      {activeTab === 'sports' && (
        <div
          id="explore-panel-sports"
          role="tabpanel"
          aria-labelledby="explore-tab-sports"
          tabIndex={0}
          className="space-y-8 animate-fadeIn"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              KSSSA &amp; Inter-House Games
            </p>
            <BlurRevealHeading
              seed="explore-sports"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Sports &amp; Games
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Games run daily from 16:00, with school teams entered in
              inter-house leagues and Murang&apos;a County KSSSA secondary
              school championships.
            </p>
          </div>

          <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 divide-slate-200">
            {sports.map((sport, index) => (
              <article
                key={sport.id}
                data-reveal=""
                data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
                className={`p-6 flex flex-col justify-between gap-5 border-slate-200 ${
                  index % 2 === 1 ? 'md:border-l lg:border-l-0' : ''
                } ${index >= 2 ? 'md:border-t lg:border-t-0' : ''} ${
                  index % 3 !== 0 ? 'lg:border-l' : ''
                } ${index >= 3 ? 'lg:border-t' : ''}`}
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                    {sport.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sport.description}
                  </p>
                </div>

                <dl className="pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <div>
                    <dt className="inline font-semibold text-slate-800">
                      Coach / Patron:{' '}
                    </dt>
                    <dd className="inline">{sport.patron}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-slate-800">
                      Training:{' '}
                    </dt>
                    <dd className="inline tabular-nums">{sport.meetingDay}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Panel 3: Daily Routine */}
      {activeTab === 'routine' && (
        <div
          id="explore-panel-routine"
          role="tabpanel"
          aria-labelledby="explore-tab-routine"
          tabIndex={0}
          className="space-y-8 animate-fadeIn"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2 tabular-nums">
              Weekday Bell Schedule · 05:00 – 22:00
            </p>
            <BlurRevealHeading
              seed="explore-routine"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Daily Boarding Timetable
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              The standard weekday schedule observed during the school term,
              from morning preps through evening roll call and lights out.
            </p>
          </div>

          <div className="max-w-3xl bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200">
            <ol className="divide-y divide-slate-200">
              {dailyRoutine.map((item) => (
                <li
                  key={item.time}
                  className="px-5 sm:px-6 py-3.5 grid grid-cols-12 gap-4 items-baseline"
                >
                  <span className="col-span-4 sm:col-span-3 text-sm font-bold text-primary tabular-nums">
                    {item.time} hrs
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-sm sm:text-base text-slate-800">
                    {item.activity}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {/* Panel 4: Chaplaincy & Faith */}
      {activeTab === 'faith' && (
        <div
          id="explore-panel-faith"
          role="tabpanel"
          aria-labelledby="explore-tab-faith"
          tabIndex={0}
          className="space-y-8 animate-fadeIn"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Pastoral Care
            </p>
            <BlurRevealHeading
              seed="explore-faith"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Chaplaincy &amp; Faith Fellowships
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Weekly services and student faith societies operate under staff
              patrons, with scheduled worship times for each group.
            </p>
          </div>

          <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-slate-200">
            {faithGroups.map((group, index) => (
              <article
                key={group.id}
                data-reveal=""
                data-reveal-delay={index % 2 === 1 ? '1' : undefined}
                className={`p-6 sm:p-7 flex flex-col justify-between gap-5 border-slate-200 ${
                  index % 2 === 1 ? 'md:border-l' : ''
                } ${index >= 2 ? 'md:border-t' : ''}`}
              >
                <div>
                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">
                    {group.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary tabular-nums mb-3">
                    {group.meetingDay}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <p className="pt-4 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="font-semibold text-slate-800">
                    Patron:
                  </strong>{' '}
                  {group.patron}
                </p>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Panel 5: Boarding, Meals & Uniform */}
      {activeTab === 'boarding' && (
        <div
          id="explore-panel-boarding"
          role="tabpanel"
          aria-labelledby="explore-tab-boarding"
          tabIndex={0}
          className="space-y-8 animate-fadeIn"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">
              Residential Life
            </p>
            <BlurRevealHeading
              seed="explore-boarding"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              Boarding, Dining &amp; School Uniform
            </BlurRevealHeading>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Practical arrangements for meals, official school dress, dormitory
              supervision, and student health during the term.
            </p>
          </div>

          <div className="bg-white/45 border-t-2 border-t-primary border-x border-b border-slate-200 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {boardingSections.map((section, idx) => (
              <article
                key={section.id}
                data-reveal=""
                data-reveal-delay={idx > 0 ? String(idx) : undefined}
                className="p-6 sm:p-7 flex flex-col"
              >
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">
                  {section.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {section.description}
                </p>
                <ul className="mt-auto pt-4 border-t border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
                  {section.highlights.map((point) => (
                    <li key={point} className="flex items-baseline gap-2">
                      <span
                        className="text-primary font-bold select-none"
                        aria-hidden="true"
                      >
                        –
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
