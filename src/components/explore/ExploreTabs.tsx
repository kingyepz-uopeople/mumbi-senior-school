'use client';

import { useMemo, useState } from 'react';
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

type RoutineFilterId = 'all' | 'morning' | 'school-day' | 'evening';

const SCHEDULE_FILTERS: {
  id: RoutineFilterId;
  label: string;
  range: string;
}[] = [
  { id: 'all', label: 'Full schedule', range: '05:00–22:00' },
  { id: 'morning', label: 'Morning', range: '05:00–07:00' },
  { id: 'school-day', label: 'School day', range: '07:30–16:00' },
  { id: 'evening', label: 'Evening', range: '17:30–22:00' },
];

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

function minutesOfDay(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function getRoutinePeriod(time: string): Exclude<RoutineFilterId, 'all'> {
  const minutes = minutesOfDay(time);
  if (minutes < 7 * 60 + 30) return 'morning';
  if (minutes <= 16 * 60) return 'school-day';
  return 'evening';
}

function SectionIntro({
  id,
  kicker,
  title,
  description,
}: {
  id: string;
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div data-reveal="" className="mb-8 max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        {kicker}
      </p>
      <h2
        id={`${id}-heading`}
        className="font-serif text-2xl font-bold text-slate-900 sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function StudentLifeArtwork({
  kind,
  index,
}: {
  kind: ProspectusArtKey;
  index: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="relative flex min-h-36 items-center justify-center overflow-hidden rounded-2xl border border-blue-100/80 bg-gradient-to-br from-blue-50 via-white to-slate-bg py-4"
    >
      <span className="absolute right-4 top-3 font-mono text-[11px] font-semibold tracking-[0.12em] text-primary/45">
        {String(index + 1).padStart(2, '0')}
      </span>
      <ProspectusCardArt kind={kind} className="h-28 w-36 sm:h-32 sm:w-40" />
    </div>
  );
}

function JumpLink({
  href,
  label,
  count,
}: {
  href: string;
  label: string;
  count: number;
}) {
  return (
    <a href={href} className="student-life-jump-pill">
      <span>{label}</span>
      <span className="student-life-jump-count">{count}</span>
    </a>
  );
}

export default function ExploreTabs() {
  const [routineFilter, setRoutineFilter] = useState<RoutineFilterId>('all');
  const filteredRoutine = useMemo(
    () =>
      dailyRoutine.filter(
        (item) =>
          routineFilter === 'all' || getRoutinePeriod(item.time) === routineFilter
      ),
    [routineFilter]
  );

  return (
    <div className="space-y-16 sm:space-y-20">
      <nav aria-label="Student life sections" className="student-life-jump-nav">
        <JumpLink href="#sports" label="Sports & Games" count={sports.length} />
        <JumpLink href="#faith" label="Chaplaincy" count={faithGroups.length} />
        <JumpLink
          href="#boarding"
          label="Boarding"
          count={boardingSections.length}
        />
        <JumpLink
          href="#routine"
          label="Daily routine"
          count={dailyRoutine.length}
        />
        <JumpLink href="#clubs" label="Clubs & Movements" count={clubs.length} />
      </nav>

      <section
        id="sports"
        aria-labelledby="sports-heading"
        className="scroll-mt-28"
      >
        <SectionIntro
          id="sports"
          kicker="KSSSA & Inter-House Games"
          title="Sports & Games"
          description="Games run daily from 16:00, with school teams entered in inter-house leagues and Murang'a County KSSSA secondary school championships."
        />

        <SpotlightCardGroup
          cardCount={sports.length}
          role="list"
          aria-label="School sports"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {sports.map((sport, index) => (
            <article
              key={sport.id}
              role="listitem"
              data-reveal=""
              data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
              className="h-full"
            >
              <div
                data-card-cycle
                className="student-life-card flex h-full min-h-[450px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[470px] sm:p-6"
              >
                <StudentLifeArtwork kind={SPORT_ART[sport.id]} index={index} />
                <div className="mt-5 flex-1">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {sport.category}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {sport.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {sport.description}
                  </p>
                </div>
                <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
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
              </div>
            </article>
          ))}
        </SpotlightCardGroup>
      </section>

      <section
        id="faith"
        aria-labelledby="faith-heading"
        className="scroll-mt-28 border-t border-slate-200 pt-14 sm:pt-16"
      >
        <SectionIntro
          id="faith"
          kicker="Pastoral Care"
          title="Chaplaincy & Faith Fellowships"
          description="Weekly services and student faith societies operate under staff patrons, with scheduled worship times for each group."
        />

        <SpotlightCardGroup
          cardCount={faithGroups.length}
          role="list"
          aria-label="Chaplaincy and faith fellowships"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {faithGroups.map((group, index) => (
            <article
              key={group.id}
              role="listitem"
              data-reveal=""
              data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
              className="h-full"
            >
              <div
                data-card-cycle
                className="student-life-card flex h-full min-h-[480px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[500px] sm:p-6"
              >
                <StudentLifeArtwork kind={FAITH_ART[group.id]} index={index} />
                <div className="mt-5">
                  <p className="mb-1 text-xs font-semibold tabular-nums text-primary">
                    {group.meetingDay}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {group.name}
                  </h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                  {group.description}
                </p>
                <p className="mt-5 border-t border-slate-200 pt-4 text-xs text-slate-600">
                  <strong className="font-semibold text-slate-800">Patron:</strong>{' '}
                  {group.patron}
                </p>
              </div>
            </article>
          ))}
        </SpotlightCardGroup>
      </section>

      <section
        id="boarding"
        aria-labelledby="boarding-heading"
        className="scroll-mt-28 border-t border-slate-200 pt-14 sm:pt-16"
      >
        <SectionIntro
          id="boarding"
          kicker="Residential Life"
          title="Boarding, Dining & School Uniform"
          description="Practical arrangements for meals, official school dress, dormitory supervision, and student health during the term."
        />

        <SpotlightCardGroup
          cardCount={boardingSections.length}
          role="list"
          aria-label="Boarding, meals, and uniform"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {boardingSections.map((section, index) => (
            <article
              key={section.id}
              role="listitem"
              data-reveal=""
              data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
              className="h-full"
            >
              <div
                data-card-cycle
                className="student-life-card flex h-full min-h-[540px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[560px] sm:p-6"
              >
                <StudentLifeArtwork kind={BOARDING_ART[section.id]} index={index} />
                <div className="mt-5">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    Boarding &amp; welfare
                  </p>
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {section.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
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
      </section>

      <section
        id="routine"
        aria-labelledby="routine-heading"
        className="scroll-mt-28 border-t border-slate-200 pt-14 sm:pt-16"
      >
        <SectionIntro
          id="routine"
          kicker="Weekday Bell Schedule · 05:00 – 22:00"
          title="Daily Boarding Timetable"
          description="The standard weekday schedule observed during the school term, from morning preps through evening roll call and lights out."
        />

        <div className="student-life-schedule-card">
          <div className="student-life-schedule-header">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  Daily routine
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
                  05:00 <span className="text-primary">—</span> 22:00
                </h3>
              </div>
              <p
                className="text-xs font-medium tabular-nums text-slate-500"
                aria-live="polite"
              >
                Showing {filteredRoutine.length} of {dailyRoutine.length} activities
              </p>
            </div>

            <div
              className="student-life-time-range"
              aria-hidden="true"
              title="Schedule spans 05:00 to 22:00"
            >
              <span>05:00</span>
              <span className="student-life-time-range-line" />
              <span>22:00</span>
            </div>

            <div
              role="group"
              aria-label="Filter daily schedule by time of day"
              className="student-life-schedule-filters"
            >
              {SCHEDULE_FILTERS.map((filter) => {
                const selected = routineFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    className="student-life-filter-pill"
                    aria-pressed={selected}
                    aria-label={`${filter.label}, ${filter.range}`}
                    aria-controls="daily-routine-list"
                    onClick={() => setRoutineFilter(filter.id)}
                  >
                    <span>{filter.label}</span>
                    <span className="student-life-filter-range">{filter.range}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ol
            id="daily-routine-list"
            className="student-life-schedule-list"
            aria-label="Daily routine activities"
          >
            {filteredRoutine.map((item) => (
              <li key={item.time} className="student-life-schedule-row">
                <time className="student-life-schedule-time" dateTime={item.time}>
                  {item.time} <span>hrs</span>
                </time>
                <span className="student-life-schedule-activity">
                  {item.activity}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="clubs"
        aria-labelledby="clubs-heading"
        className="scroll-mt-28 border-t border-slate-200 pt-14 sm:pt-16"
      >
        <SectionIntro
          id="clubs"
          kicker="Afternoon & Weekend Societies"
          title="Clubs & Uniformed Movements"
          description="Students join clubs and uniformed movements that meet after afternoon lessons and on Saturday afternoons under teacher patrons."
        />

        <SpotlightCardGroup
          cardCount={clubs.length}
          role="list"
          aria-label="Clubs and uniformed movements"
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {clubs.map((club, index) => (
            <article
              key={club.id}
              role="listitem"
              data-reveal=""
              data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
              className="h-full"
            >
              <div
                data-card-cycle
                className="student-life-card flex h-full min-h-[490px] flex-col rounded-3xl border border-t-2 border-slate-200 border-t-primary bg-white p-5 sm:min-h-[510px] sm:p-6"
              >
                <StudentLifeArtwork kind={CLUB_ART[club.id]} index={index} />
                <div className="mt-5 flex-1">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {club.category}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-primary-dark sm:text-2xl">
                    {club.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">
                    {club.description}
                  </p>
                </div>
                <dl className="mt-5 space-y-2 border-t border-slate-200 pt-4 text-xs text-slate-600">
                  <div>
                    <dt className="inline font-semibold text-slate-800">Patron:</dt>{' '}
                    <dd className="inline">{club.patron}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-slate-800">Meets:</dt>{' '}
                    <dd className="inline tabular-nums">{club.meetingDay}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </SpotlightCardGroup>
      </section>
    </div>
  );
}
