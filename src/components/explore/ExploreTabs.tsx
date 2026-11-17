'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Activity,
  CheckCircle2,
  Circle,
  CircleDot,
  Clock,
  Compass,
  Cross,
  Footprints,
  Hand,
  Heart,
  HeartPulse,
  Moon,
  Newspaper,
  Shield,
  Shirt,
  Sun,
  Target,
  Theater,
  TreePine,
  Trophy,
  Utensils,
  type LucideIcon,
} from 'lucide-react';
import {
  boardingSections,
  clubs,
  dailyRoutine,
  faithGroups,
  sports,
} from '@/data/mock-school-data';

type ExploreTabId = 'clubs' | 'sports' | 'routine' | 'faith' | 'boarding';

const TABS: { id: ExploreTabId; label: string; icon: LucideIcon }[] = [
  { id: 'clubs', label: 'Clubs & Movements', icon: Compass },
  { id: 'sports', label: 'Sports & Games', icon: Trophy },
  { id: 'routine', label: 'Daily Routine', icon: Clock },
  { id: 'faith', label: 'Chaplaincy & Faith', icon: Heart },
  { id: 'boarding', label: 'Boarding & Uniform', icon: Utensils },
];

const VALID_TAB_IDS = new Set<string>(TABS.map((t) => t.id));

const iconMap: Record<string, LucideIcon> = {
  Compass,
  HeartPulse,
  Cross,
  Newspaper,
  Theater,
  TreePine,
  Shield,
  CircleDot,
  Circle,
  Target,
  Trophy,
  Footprints,
  Hand,
  Heart,
  Sun,
  Moon,
  Utensils,
  Shirt,
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

  // Sync with URL hash on initial load, hashchange, and same-page navbar dropdown clicks
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

    const initTimer = setTimeout(() => syncFromHash(Boolean(window.location.hash)), 0);

    const onHashChange = () => syncFromHash(true);

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        'a[href^="/explore#"]'
      );
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
      {/* Accessible WAI-ARIA Tablist */}
      <div
        ref={tablistRef}
        id={activeTab}
        role="tablist"
        aria-label="Student life and boarding sections"
        className="scroll-mt-28 grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap justify-center gap-2"
      >
        {TABS.map((tab, index) => {
          const Icon = tab.icon;
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
              className={`min-h-11 px-5 py-2.5 rounded-xl font-bold text-sm transition-all inline-flex items-center justify-center gap-2 ${
                selected
                  ? 'bg-maroon text-white shadow-sm'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-maroon hover:text-maroon'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  selected ? 'text-gold' : 'text-maroon'
                }`}
                aria-hidden="true"
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panel 1: Clubs & Societies */}
      {activeTab === 'clubs' && (
        <div
          id="explore-panel-clubs"
          role="tabpanel"
          aria-labelledby="explore-tab-clubs"
          tabIndex={0}
          className="space-y-8 animate-fadeIn rounded-2xl"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Leadership &amp; Service
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              Clubs, Societies &amp; Uniformed Movements
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Equipping young women with civic responsibility, first-aid
              readiness, environmental stewardship, and creative expression.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => {
              const Icon = iconMap[club.icon] ?? Activity;
              return (
                <article
                  key={club.id}
                  className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug">
                          {club.name}
                        </h3>
                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-maroon/10 text-maroon font-semibold mt-0.5">
                          {club.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      {club.description}
                    </p>
                  </div>

                  <dl className="pt-3.5 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex gap-1.5">
                      <dt className="font-bold text-slate-800">Patron:</dt>
                      <dd>{club.patron}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-bold text-slate-800">Schedule:</dt>
                      <dd>{club.meetingDay}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
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
          className="space-y-8 animate-fadeIn rounded-2xl"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Athletics &amp; Teamwork
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              Competitive Sports &amp; Games
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Active participation in inter-house leagues as well as
              Murang&apos;a County and KSSSA secondary school championships.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((sport) => {
              const Icon = iconMap[sport.icon] ?? Activity;
              return (
                <article
                  key={sport.id}
                  className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gold/25 text-maroon flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug">
                          {sport.name}
                        </h3>
                        <span className="inline-block text-xs px-2.5 py-0.5 rounded-full bg-gold/20 text-maroon font-semibold mt-0.5">
                          Competitive Sport
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      {sport.description}
                    </p>
                  </div>

                  <dl className="pt-3.5 border-t border-slate-100 text-xs space-y-1.5 text-slate-600">
                    <div className="flex gap-1.5">
                      <dt className="font-bold text-slate-800">
                        Coach / Patron:
                      </dt>
                      <dd>{sport.patron}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="font-bold text-slate-800">Training:</dt>
                      <dd>{sport.meetingDay}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
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
          className="space-y-8 animate-fadeIn rounded-2xl"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              05:00 – 22:00 Weekday Schedule
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              Structured Daily Boarding Routine
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Purposeful time management balancing academic lessons, personal
              study, nutritious meals, sports, devotion, and rest.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold shadow-xs p-5 sm:p-8">
            <ol className="relative border-l-2 border-maroon ml-3 sm:ml-5 pl-5 sm:pl-7 space-y-4">
              {dailyRoutine.map((item) => (
                <li key={item.time} className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[29px] sm:-left-[37px] top-3 w-4 h-4 rounded-full bg-gold border-4 border-maroon"
                  />
                  <div className="bg-slate-bg p-3.5 sm:p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-black text-maroon tracking-wider uppercase px-2.5 py-1 rounded-md bg-maroon/10 w-fit">
                      {item.time} hrs
                    </span>
                    <span className="text-sm font-semibold text-slate-900 sm:text-right">
                      {item.activity}
                    </span>
                  </div>
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
          className="space-y-8 animate-fadeIn rounded-2xl"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Pastoral Care &amp; Fellowship
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              Chaplaincy &amp; Spiritual Life
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              Nurturing moral uprightness, compassion, and spiritual well-being
              with respect for every student&apos;s faith tradition.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faithGroups.map((group) => {
              const Icon = iconMap[group.icon] ?? Heart;
              return (
                <article
                  key={group.id}
                  className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-snug">
                          {group.name}
                        </h3>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {group.meetingDay}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mb-5 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  <div className="pt-3.5 border-t border-slate-100 text-xs text-slate-600">
                    <strong className="text-slate-800">Patron:</strong>{' '}
                    {group.patron}
                  </div>
                </article>
              );
            })}
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
          className="space-y-8 animate-fadeIn rounded-2xl"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-maroon">
              Home Away From Home
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-2">
              Boarding, Meals &amp; School Uniform
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mb-3">
              A safe, caring, and well-organised boarding environment supporting
              health, dignity, and focused academic life.
            </p>
            <div
              className="w-16 h-1 bg-gold mx-auto rounded-full"
              aria-hidden="true"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {boardingSections.map((section) => {
              const Icon = iconMap[section.icon] ?? Shield;
              return (
                <article
                  key={section.id}
                  className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-maroon/10 text-maroon flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {section.description}
                  </p>
                  <ul className="mt-auto pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    {section.highlights.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-maroon shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
