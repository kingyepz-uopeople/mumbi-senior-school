'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import BlurRevealHeading from '@/components/shared/BlurRevealHeading';
import ProspectusCardArt, {
  type ProspectusArtKey,
} from '@/components/shared/ProspectusCardArt';
import SpotlightCardGroup from '@/components/shared/SpotlightCardGroup';
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

const MOBILE_CARD_RAIL =
  '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 pt-2 sm:mx-0 sm:grid sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 sm:pt-2';

const CLUB_ART: Record<string, ProspectusArtKey> = {
  'girl-guides': 'girl-guides',
  'st-john': 'st-john',
  'red-cross': 'red-cross',
  journalism: 'journalism',
  drama: 'drama',
  wildlife: 'wildlife',
  integrity: 'integrity-club',
};

const SPORT_ART: Record<string, ProspectusArtKey> = {
  volleyball: 'volleyball',
  netball: 'netball',
  basketball: 'basketball',
  hockey: 'hockey',
  athletics: 'athletics',
  handball: 'handball',
};

const FAITH_ART: Record<string, ProspectusArtKey> = {
  cu: 'christian-union',
  ycs: 'young-christian-students',
  sda: 'sda-fellowship',
  muslim: 'muslim-association',
};

const BOARDING_ART: Record<string, ProspectusArtKey> = {
  meals: 'dining-hall',
  uniform: 'school-uniform',
  welfare: 'boarding-welfare',
};

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

          <SpotlightCardGroup
            cardCount={clubs.length}
            className={`${MOBILE_CARD_RAIL} sm:grid-cols-2 lg:grid-cols-3`}
          >
            {clubs.map((club, index) => (
              <article
                key={club.id}
                data-reveal=""
                data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
                className="w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div
                  data-card-cycle
                  className="flex h-full min-h-[480px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[500px] sm:p-6"
                >
                  <div>
                    <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {club.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                      {club.name}
                    </h3>
                  </div>

                  <div className="my-5 flex min-h-36 flex-1 items-center justify-center rounded-2xl bg-slate-bg py-4">
                    <ProspectusCardArt
                      kind={CLUB_ART[club.id]}
                      className="h-28 w-36 sm:h-32 sm:w-40"
                    />
                  </div>

                  <dl className="space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
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

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                    {club.description}
                  </p>
                </div>
              </article>
            ))}
          </SpotlightCardGroup>
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

          <SpotlightCardGroup
            cardCount={sports.length}
            className={`${MOBILE_CARD_RAIL} sm:grid-cols-2 lg:grid-cols-3`}
          >
            {sports.map((sport, index) => (
              <article
                key={sport.id}
                data-reveal=""
                data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
                className="w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div
                  data-card-cycle
                  className="flex h-full min-h-[460px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[480px] sm:p-6"
                >
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {sport.name}
                  </h3>

                  <div className="my-5 flex min-h-36 flex-1 items-center justify-center rounded-2xl bg-slate-bg py-4">
                    <ProspectusCardArt
                      kind={SPORT_ART[sport.id]}
                      className="h-28 w-36 sm:h-32 sm:w-40"
                    />
                  </div>

                  <dl className="space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
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

                  <p className="mt-4 border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-700">
                    {sport.description}
                  </p>
                </div>
              </article>
            ))}
          </SpotlightCardGroup>
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

          <SpotlightCardGroup
            cardCount={faithGroups.length}
            className={`${MOBILE_CARD_RAIL} sm:grid-cols-2 xl:grid-cols-4`}
          >
            {faithGroups.map((group, index) => (
              <article
                key={group.id}
                data-reveal=""
                data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
                className="w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div
                  data-card-cycle
                  className="flex h-full min-h-[500px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[520px] sm:p-6"
                >
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {group.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tabular-nums text-primary">
                    {group.meetingDay}
                  </p>

                  <div className="my-5 flex min-h-36 flex-1 items-center justify-center rounded-2xl bg-slate-bg py-4">
                    <ProspectusCardArt
                      kind={FAITH_ART[group.id]}
                      className="h-28 w-36 sm:h-32 sm:w-40"
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-slate-700">
                    {group.description}
                  </p>
                  <p className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-600">
                    <strong className="font-semibold text-slate-800">
                      Patron:
                    </strong>{' '}
                    {group.patron}
                  </p>
                </div>
              </article>
            ))}
          </SpotlightCardGroup>
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

          <SpotlightCardGroup
            cardCount={boardingSections.length}
            className={`${MOBILE_CARD_RAIL} sm:grid-cols-2 lg:grid-cols-3`}
          >
            {boardingSections.map((section, idx) => (
              <article
                key={section.id}
                data-reveal=""
                data-reveal-delay={idx % 3 > 0 ? String(idx % 3) : undefined}
                className="w-[82vw] max-w-sm shrink-0 snap-center sm:w-auto sm:max-w-none"
              >
                <div
                  data-card-cycle
                  className="flex h-full min-h-[580px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[600px] sm:p-6"
                >
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {section.title}
                  </h3>

                  <div className="my-5 flex min-h-36 items-center justify-center rounded-2xl bg-slate-bg py-4">
                    <ProspectusCardArt
                      kind={BOARDING_ART[section.id]}
                      className="h-28 w-36 sm:h-32 sm:w-40"
                    />
                  </div>

                  <p className="text-sm leading-relaxed text-slate-700">
                    {section.description}
                  </p>
                  <ul className="mt-auto space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-700 sm:text-sm">
                    {section.highlights.map((point) => (
                      <li key={point} className="flex items-baseline gap-2">
                        <span
                          className="select-none font-bold text-primary"
                          aria-hidden="true"
                        >
                          –
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </SpotlightCardGroup>
        </div>
      )}
    </div>
  );
}
