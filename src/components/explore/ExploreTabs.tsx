'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Image from 'next/image';
import BoardingPhotos from '@/components/explore/BoardingPhotos';
import SportActivityVideo from '@/components/explore/SportActivityVideo';
import { fill } from '@/i18n/fill';
import { useLocale } from '@/i18n/locale-context';
import ProspectusCardArt, {
  type ProspectusArtKey,
} from '@/components/shared/ProspectusCardArt';
import SpotlightCardGroup from '@/components/shared/SpotlightCardGroup';
import {
  getBoardingSections,
  getClubs,
  getDailyRoutine,
  getFaithGroups,
  getHeadOfGames,
  getSports,
} from '@/i18n/content';

type RoutineFilterId = 'all' | 'morning' | 'school-day' | 'evening';

const SCHEDULE_FILTER_RANGES: Record<RoutineFilterId, string> = {
  all: '05:00–22:00',
  morning: '05:00–07:00',
  'school-day': '07:30–16:00',
  evening: '17:30–22:00',
};

const CLUB_ART: Record<string, ProspectusArtKey> = {
  'scout-association': 'scout-association',
  'st-john': 'st-john',
  'red-cross': 'red-cross',
  journalism: 'journalism',
  drama: 'drama',
  wildlife: 'wildlife',
  integrity: 'integrity-club',
};

const CLUB_LOGOS: Record<string, { src: string; alt: string }> = {
  'scout-association': {
    src: '/images/clubs/scout-association.png',
    alt: 'Kenya Scouts Association emblem',
  },
  'st-john': {
    src: '/images/clubs/st-john-ambulance.png',
    alt: 'St John Ambulance logo',
  },
  'red-cross': {
    src: '/images/clubs/kenya-red-cross.png',
    alt: 'Kenya Red Cross logo',
  },
};

const SPORT_ART: Record<string, ProspectusArtKey> = {
  volleyball: 'volleyball',
  netball: 'netball',
  basketball: 'basketball',
  hockey: 'hockey',
  athletics: 'athletics',
  handball: 'handball',
  football: 'athletics',
  'table-tennis': 'badminton',
  badminton: 'badminton',
};

/** Campus / activity photos for pathway-style sport cards. */
const SPORT_PHOTOS: Record<string, { src: string; alt: string }> = {
  volleyball: {
    src: '/images/sports/volleyball-team-1.jpg',
    alt: 'Mumbi Girls volleyball team with their patron on the school grounds',
  },
  netball: {
    src: '/images/school/hero-assembly.jpg',
    alt: 'Students assembled on the school grounds',
  },
  basketball: {
    src: '/images/school/gallery-campus-parade.jpg',
    alt: 'Open campus grounds used for afternoon games',
  },
  hockey: {
    src: '/images/school/hero-assembly.jpg',
    alt: 'School grounds used for field sports and drills',
  },
  athletics: {
    src: '/images/school/gallery-campus-parade.jpg',
    alt: 'Parade and athletics ground at Mumbi Girls',
  },
  handball: {
    src: '/images/school/hero-assembly.jpg',
    alt: 'Campus assembly area near games facilities',
  },
  football: {
    src: '/images/sports/football.jpg',
    alt: 'Mumbi Girls football team with coaches on the school grounds',
  },
  'table-tennis': {
    src: '/images/sports/table-tennis.jpg',
    alt: 'Table tennis learners and coaches at Mumbi Girls',
  },
  badminton: {
    src: '/images/sports/badminton.jpg',
    alt: 'Badminton learners and coaches at Mumbi Girls',
  },
};

const FAITH_ART: Record<string, ProspectusArtKey> = {
  cu: 'christian-union',
  ycs: 'young-christian-students',
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

function LifePreviewCard({
  index,
  code,
  title,
  description,
  photo,
  artKind,
  logo,
  chipsLabel,
  chips,
  footer,
}: {
  index: number;
  code: string;
  title: string;
  description: string;
  photo?: { src: string; alt: string };
  artKind?: ProspectusArtKey;
  logo?: { src: string; alt: string };
  chipsLabel?: string;
  chips?: string[];
  footer?: ReactNode;
}) {
  return (
    <div data-card-cycle className="pathway-preview-card h-full">
      <div className="pathway-preview-photo">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="pathway-preview-image object-cover"
          />
        ) : (
          <span className="pathway-photo-placeholder" aria-hidden="true">
            <span className="pathway-placeholder-orbit" />
            <span className="pathway-placeholder-mark" />
            {logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logo.src}
                alt=""
                width={160}
                height={112}
                className="absolute inset-0 m-auto max-h-24 max-w-[78%] w-auto object-contain drop-shadow-md sm:max-h-28"
              />
            ) : artKind ? (
              <ProspectusCardArt
                kind={artKind}
                className="absolute inset-0 m-auto h-24 w-32 opacity-90 brightness-0 invert"
              />
            ) : null}
          </span>
        )}
        <span
          className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-900/15 to-transparent"
          aria-hidden="true"
        />
        <span className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
          <span className="pathway-preview-code">
            {String(index + 1).padStart(2, '0')} · {code}
          </span>
        </span>
        <span className="absolute inset-x-5 bottom-3.5">
          <span className="block font-serif text-xl font-bold leading-snug text-white drop-shadow-sm sm:text-[1.35rem]">
            {title}
          </span>
          <span className="pathway-preview-underline mt-1.5" aria-hidden="true" />
        </span>
      </div>

      <div className="pathway-preview-body">
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        {footer}
        {chipsLabel && chips && chips.length > 0 ? (
          <div className="mt-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              {chipsLabel}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip} className="subject-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>
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
    <a href={href} className="pill-3d-secondary student-life-jump-link">
      <span>{label}</span>
      <span className="student-life-jump-count">{count}</span>
    </a>
  );
}

export default function ExploreTabs() {
  const { locale, dict } = useLocale();
  const e = dict.explore;

  const sports = useMemo(() => getSports(locale), [locale]);
  const headOfGames = useMemo(() => getHeadOfGames(locale), [locale]);
  const faithGroups = useMemo(() => getFaithGroups(locale), [locale]);
  const boardingSections = useMemo(
    () => getBoardingSections(locale),
    [locale]
  );
  const clubs = useMemo(() => getClubs(locale), [locale]);
  const dailyRoutine = useMemo(() => getDailyRoutine(locale), [locale]);

  const scheduleFilters: {
    id: RoutineFilterId;
    label: string;
    range: string;
  }[] = [
    { id: 'all', label: e.fullSchedule, range: SCHEDULE_FILTER_RANGES.all },
    { id: 'morning', label: e.morning, range: SCHEDULE_FILTER_RANGES.morning },
    {
      id: 'school-day',
      label: e.schoolDay,
      range: SCHEDULE_FILTER_RANGES['school-day'],
    },
    { id: 'evening', label: e.evening, range: SCHEDULE_FILTER_RANGES.evening },
  ];

  const [routineFilter, setRoutineFilter] = useState<RoutineFilterId>('all');
  const filteredRoutine = useMemo(
    () =>
      dailyRoutine.filter(
        (item) =>
          routineFilter === 'all' || getRoutinePeriod(item.time) === routineFilter
      ),
    [dailyRoutine, routineFilter]
  );

  return (
    <div className="space-y-16 sm:space-y-20">
      <nav aria-label={e.sectionsAria} className="student-life-jump-nav">
        <JumpLink href="#sports" label={e.jumpSports} count={sports.length} />
        <JumpLink href="#faith" label={e.jumpFaith} count={faithGroups.length} />
        <JumpLink
          href="#boarding"
          label={e.jumpBoarding}
          count={boardingSections.length}
        />
        <JumpLink
          href="#routine"
          label={e.jumpRoutine}
          count={dailyRoutine.length}
        />
        <JumpLink href="#clubs" label={e.jumpClubs} count={clubs.length} />
      </nav>

      <section
        id="sports"
        aria-labelledby="sports-heading"
        className="scroll-mt-28"
      >
        <SectionIntro
          id="sports"
          kicker={e.sportsKicker}
          title={e.sportsHeading}
          description={e.sportsIntro}
        />

        <aside
          data-reveal=""
          aria-label={`${headOfGames.role}, ${headOfGames.name}`}
          className="mb-8 border border-t-2 border-slate-200 border-t-primary bg-white/70 p-5 sm:p-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
            {fill(e.messageFrom, { role: headOfGames.role })}
          </p>
          <h3 className="mt-2 font-serif text-xl font-bold text-slate-900 sm:text-2xl">
            {headOfGames.name}
          </h3>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base">
            {headOfGames.message.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </aside>

        <SpotlightCardGroup
          cardCount={sports.length}
          role="list"
          aria-label={e.sportsAria}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {sports.map((sport, index) => {
            const activityPhoto =
              sport.imageSrc != null
                ? {
                    src: sport.imageSrc,
                    alt: SPORT_PHOTOS[sport.id]?.alt ?? `${sport.name} activity`,
                  }
                : undefined;

            return (
              <article
                key={sport.id}
                role="listitem"
                data-reveal=""
                data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
                className="h-full"
              >
                <LifePreviewCard
                  index={index}
                  code={sport.category}
                  title={sport.name}
                  description={sport.description}
                  photo={SPORT_PHOTOS[sport.id] ?? activityPhoto}
                  artKind={SPORT_ART[sport.id] ?? 'athletics'}
                  chipsLabel={e.coachPatron}
                  chips={[sport.patron, sport.meetingDay]}
                  footer={
                    <>
                      {sport.patronMessage && sport.patronMessage.length > 0 ? (
                        <aside className="mt-4 border border-slate-200 border-l-2 border-l-primary bg-slate-bg/70 px-3.5 py-3">
                          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            {e.patronMessageLabel}
                          </p>
                          <p className="mt-1 text-xs font-semibold text-slate-800">
                            {sport.patron}
                          </p>
                          <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-600">
                            {sport.patronMessage.map((paragraph) => (
                              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                            ))}
                          </div>
                        </aside>
                      ) : null}

                      {sport.videoSrc && activityPhoto ? (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-bg">
                            <Image
                              src={activityPhoto.src}
                              alt={activityPhoto.alt}
                              width={960}
                              height={540}
                              className="aspect-video h-full w-full object-cover"
                            />
                          </div>
                          <SportActivityVideo
                            src={sport.videoSrc}
                            label={`${sport.name} activity video`}
                            endSeconds={32}
                            className="h-full"
                          />
                        </div>
                      ) : sport.videoSrc ? (
                        <SportActivityVideo
                          src={sport.videoSrc}
                          label={`${sport.name} activity video`}
                          endSeconds={32}
                        />
                      ) : sport.mediaNote ? (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-bg/80">
                          <div className="flex aspect-video items-center justify-center px-4 text-center">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
                              {sport.mediaNote || e.videoComingSoon}
                            </p>
                          </div>
                        </div>
                      ) : null}

                      {sport.gallerySrcs && sport.gallerySrcs.length > 0 ? (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {sport.gallerySrcs.map((src, galleryIndex) => (
                            <div
                              key={src}
                              className="overflow-hidden rounded-xl border border-slate-200 bg-slate-bg"
                            >
                              <Image
                                src={src}
                                alt={`${sport.name} team photo ${galleryIndex + 1}`}
                                width={480}
                                height={360}
                                className="aspect-[4/3] w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </>
                  }
                />
              </article>
            );
          })}
        </SpotlightCardGroup>
      </section>

      <section
        id="faith"
        aria-labelledby="faith-heading"
        className="scroll-mt-28 border-t border-slate-200 pt-14 sm:pt-16"
      >
        <SectionIntro
          id="faith"
          kicker={e.faithKicker}
          title={e.faithHeading}
          description={e.faithIntro}
        />

        <SpotlightCardGroup
          cardCount={faithGroups.length}
          role="list"
          aria-label={e.faithAria}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
        >
          {faithGroups.map((group, index) => (
            <article
              key={group.id}
              role="listitem"
              data-reveal=""
              data-reveal-delay={index % 3 > 0 ? String(index % 3) : undefined}
              className="h-full"
            >
              <LifePreviewCard
                index={index}
                code={group.category}
                title={group.name}
                description={group.description}
                artKind={FAITH_ART[group.id]}
                chipsLabel={e.patron}
                chips={[group.patron, group.meetingDay]}
              />
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
          kicker={e.boardingKicker}
          title={e.boardingHeading}
          description={e.boardingIntro}
        />

        <div className="mb-8">
          <BoardingPhotos />
        </div>

        <SpotlightCardGroup
          cardCount={boardingSections.length}
          role="list"
          aria-label={e.boardingAria}
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
              <LifePreviewCard
                index={index}
                code={e.boardingWelfare}
                title={section.title}
                description={section.description}
                artKind={BOARDING_ART[section.id]}
                footer={
                  <ul className="mt-4 space-y-2 text-xs text-slate-700 sm:text-sm">
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
                }
              />
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
          kicker={e.routineKicker}
          title={e.routineHeading}
          description={e.routineIntro}
        />

        <div className="student-life-schedule-card">
          <div className="student-life-schedule-header">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {e.jumpRoutine}
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-slate-900">
                  05:00 <span className="text-primary">—</span> 22:00
                </h3>
              </div>
              <p
                className="text-xs font-medium tabular-nums text-slate-500"
                aria-live="polite"
              >
                {fill(e.showingActivities, {
                  shown: filteredRoutine.length,
                  total: dailyRoutine.length,
                })}
              </p>
            </div>

            <div
              className="student-life-time-range"
              aria-hidden="true"
              title={e.scheduleSpanTitle}
            >
              <span>05:00</span>
              <span className="student-life-time-range-line" />
              <span>22:00</span>
            </div>

            <div
              role="group"
              aria-label={e.routineFilterAria}
              className="student-life-schedule-filters"
            >
              {scheduleFilters.map((filter) => {
                const selected = routineFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    className={`student-life-filter-control ${selected ? 'pill-3d-primary' : 'pill-3d-secondary'}`}
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
            aria-label={e.routineListAria}
          >
            {filteredRoutine.map((item) => (
              <li key={item.time} className="student-life-schedule-row">
                <time className="student-life-schedule-time subject-chip" dateTime={item.time}>
                  {item.time} <span>{e.hrs}</span>
                </time>
                <span className="student-life-schedule-activity subject-chip">
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
          kicker={e.clubsKicker}
          title={e.clubsHeading}
          description={e.clubsIntro}
        />

        <SpotlightCardGroup
          cardCount={clubs.length}
          role="list"
          aria-label={e.clubsAria}
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
              <LifePreviewCard
                index={index}
                code={club.category}
                title={club.name}
                description={club.description}
                artKind={CLUB_ART[club.id]}
                logo={CLUB_LOGOS[club.id]}
                chipsLabel={e.patron}
                chips={[club.patron, club.meetingDay]}
              />
            </article>
          ))}
        </SpotlightCardGroup>
      </section>
    </div>
  );
}
