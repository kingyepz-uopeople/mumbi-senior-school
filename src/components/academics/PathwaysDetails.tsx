'use client';

import Image from 'next/image';
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  RefObject,
} from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, Pause, Play, X } from 'lucide-react';
import CountUpStat from '@/components/shared/CountUpStat';
import HeroScrambleTitle from '@/components/shared/HeroScrambleTitle';
import HeroTypewriterText from '@/components/shared/HeroTypewriterText';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { useReducedMotion, useViewportActivity } from '@/components/shared/motion-utils';
import { cbcPathways, departments } from '@/data/mock-school-data';
import type { CBCPathway, PathwayTrack } from '@/types';

interface TrackVisual {
  src: string;
  alt: string;
}

const TRACK_VISUALS: Partial<Record<string, TrackVisual>> = {
  'pure-sciences': {
    src: '/images/pathways/pathways-stem.jpg',
    alt: 'Students conducting a science practical in a laboratory',
  },
  'applied-sciences': {
    src: '/images/school/gallery-14.jpg',
    alt: 'Students working together around classroom tables',
  },
  'technical-engineering': {
    src: '/images/pathways/gemini-stem-technical-engineering.jpg',
    alt: 'Robotics tools and a 3D printer in a workshop',
  },
  humanities: {
    src: '/images/pathways/pathways-social-sciences.jpg',
    alt: 'Students studying together in a school library',
  },
  'business-studies': {
    src: '/images/pathways/gemini-social-business-studies.jpg',
    alt: 'Business classroom with books and a globe',
  },
  'languages-literature': {
    src: '/images/school/gallery-14.jpg',
    alt: 'Students working together around classroom tables',
  },
  'performing-arts': {
    src: '/images/school/gallery-05.jpg',
    alt: 'Students gathered in the assembly hall',
  },
  'visual-arts': {
    src: '/images/pathways/gemini-arts-visual-arts.jpg',
    alt: 'Painting and sculpture in an art studio',
  },
  'sports-science': {
    src: '/images/pathways/pathways-arts-sports-science.jpg',
    alt: 'Students training for an outdoor athletics event',
  },
};

const ROTATING_PATHWAY_NAMES = cbcPathways.map((pathway) => pathway.name);
const LONGEST_PATHWAY_NAME = ROTATING_PATHWAY_NAMES.reduce((longest, name) =>
  name.length > longest.length ? name : longest
);

interface SelectedTrack {
  pathway: CBCPathway;
  track: PathwayTrack;
  trackIndex: number;
}

type PathwayViewMode = 'loop' | 'grid';

const CAROUSEL_SPEEDS = [
  { id: 'slow', label: 'Slow', duration: 72 },
  { id: 'normal', label: 'Normal', duration: 54 },
  { id: 'fast', label: 'Fast', duration: 36 },
] as const;

type CarouselSpeed = (typeof CAROUSEL_SPEEDS)[number]['id'];

interface TrackCardProps {
  pathway: CBCPathway;
  track: PathwayTrack;
  trackIndex: number;
  duplicate?: boolean;
  onOpen: (
    pathway: CBCPathway,
    track: PathwayTrack,
    trackIndex: number,
    trigger: HTMLButtonElement
  ) => void;
}

function TrackArtwork({ track }: { track: PathwayTrack }) {
  const visual = TRACK_VISUALS[track.id];

  if (!visual) {
    return (
      <div
        className="pathway-photo-placeholder"
        role="img"
        aria-label={`Blue placeholder image for ${track.name} track`}
      >
        <span className="pathway-placeholder-orbit" aria-hidden="true" />
        <span className="pathway-placeholder-mark" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={visual.src}
      alt={visual.alt}
      fill
      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 42vw, 380px"
      className="pathway-track-image"
    />
  );
}

function TrackCard({
  pathway,
  track,
  trackIndex,
  duplicate = false,
  onOpen,
}: TrackCardProps) {
  const trackNumber = String(trackIndex + 1).padStart(2, '0');

  return (
    <article className="pathway-track-card" role="listitem">
      <div className="pathway-track-card-photo">
        <TrackArtwork track={track} />
        <span className="pathway-track-code">
          Track {trackNumber} <span aria-hidden="true">·</span> {pathway.name}
        </span>
      </div>

      <div className="pathway-track-card-content">
        <div>
          <p className="pathway-track-eyebrow">CBC Senior School pathway</p>
          <h3 className="pathway-track-title">{track.name}</h3>
          <p className="pathway-track-description">{track.description}</p>
        </div>

        <div className="pathway-subject-block">
          <h4 className="pathway-subject-heading">Subjects taught</h4>
          <ul className="pathway-subject-list" aria-label={`${track.name} subjects`}>
            {track.subjects.map((subject, index) => (
              <li
                key={subject}
                className="subject-chip"
                style={{ '--chip-delay': `${index * 35}ms` } as CSSProperties}
              >
                {subject}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="pill-3d-secondary pathway-track-open"
          aria-label={`Explore ${track.name} track details`}
          tabIndex={duplicate ? -1 : undefined}
          onClick={(event) =>
            onOpen(pathway, track, trackIndex, event.currentTarget)
          }
        >
          <span>Explore track details</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function RotatingPathwayWord() {
  const wordRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();
  const { active } = useViewportActivity(wordRef, {
    threshold: 0.05,
    disabled: reducedMotion,
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || !active || ROTATING_PATHWAY_NAMES.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % ROTATING_PATHWAY_NAMES.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [active, reducedMotion]);

  const currentName = ROTATING_PATHWAY_NAMES[index];

  return (
    <span ref={wordRef} className="pathway-word-frame" aria-hidden="true">
      <span className="pathway-word-sizer">{LONGEST_PATHWAY_NAME}</span>
      <span
        key={currentName}
        className="pathway-word-swap"
        style={{ animationPlayState: active ? 'running' : 'paused' }}
      >
        {currentName}
      </span>
    </span>
  );
}

function TrackDetailDialog({
  selected,
  onClose,
  closeButtonRef,
  dialogRef,
}: {
  selected: SelectedTrack | null;
  onClose: () => void;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  dialogRef: RefObject<HTMLDivElement | null>;
}) {
  if (!selected) return null;

  const trackNumber = String(selected.trackIndex + 1).padStart(2, '0');

  return (
    <div
      className="pathway-dialog-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="pathway-dialog-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pathway-track-dialog-title"
        aria-describedby="pathway-track-dialog-description"
        tabIndex={-1}
      >
        <div className="pathway-dialog-photo">
          <TrackArtwork track={selected.track} />
          <span className="pathway-track-code">
            Track {trackNumber} <span aria-hidden="true">·</span>{' '}
            {selected.pathway.name}
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className="pill-3d-secondary pathway-dialog-close"
            onClick={onClose}
            aria-label="Close track details"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="pathway-dialog-content">
          <p className="pathway-track-eyebrow">CBC Senior School pathway</p>
          <h2 id="pathway-track-dialog-title" className="pathway-dialog-title">
            {selected.track.name}
          </h2>
          <p
            id="pathway-track-dialog-description"
            className="pathway-track-description"
          >
            {selected.track.description}
          </p>

          <div className="pathway-dialog-detail">
            <h3 className="pathway-subject-heading">Subjects taught</h3>
            <ul className="pathway-subject-list" aria-label="Subjects taught">
              {selected.track.subjects.map((subject, index) => (
                <li
                  key={subject}
                  className="subject-chip"
                  style={{ '--chip-delay': `${index * 35}ms` } as CSSProperties}
                >
                  {subject}
                </li>
              ))}
            </ul>
          </div>

          <div className="pathway-dialog-detail">
            <h3 className="pathway-subject-heading">Related university fields</h3>
            <p className="pathway-career-list">
              {selected.track.careers.join(' · ')}
            </p>
          </div>

          <div className="pathway-dialog-actions">
            <button
              type="button"
              className="pill-3d-primary pathway-dialog-done"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PathwaysDetails() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [viewMode, setViewMode] = useState<PathwayViewMode>('loop');
  const [carouselSpeed, setCarouselSpeed] = useState<CarouselSpeed>('normal');
  const [selectedTrack, setSelectedTrack] = useState<SelectedTrack | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const returnFocusRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { active: sectionActive } = useViewportActivity(sectionRef, {
    threshold: 0.02,
    disabled: reducedMotion,
  });

  const activeViewMode: PathwayViewMode = reducedMotion ? 'grid' : viewMode;
  const carouselDuration =
    CAROUSEL_SPEEDS.find((speed) => speed.id === carouselSpeed)?.duration ?? 54;
  const activePathway = cbcPathways[activeIndex];
  const activeTabId = `academics-detail-tab-${activePathway.id}`;
  const trackCount = activePathway.tracks.length;
  const subjectCount = activePathway.tracks.reduce(
    (sum, track) => sum + track.subjects.length,
    0
  );

  const openTrackDetails = useCallback(
    (
      pathway: CBCPathway,
      track: PathwayTrack,
      trackIndex: number,
      trigger: HTMLButtonElement
    ) => {
      returnFocusRef.current = trigger;
      setSelectedTrack({ pathway, track, trackIndex });
    },
    []
  );

  const closeTrackDetails = useCallback(() => {
    setSelectedTrack(null);
  }, []);

  useEffect(() => {
    if (!selectedTrack) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeTrackDetails();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.getAttribute('aria-hidden') !== 'true');

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || !dialog.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (current === last || !dialog.contains(current))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onDialogKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('keydown', onDialogKeyDown);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [closeTrackDetails, selectedTrack]);

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

  const carouselRunning =
    activeViewMode === 'loop' && sectionActive && !userPaused && !reducedMotion;

  return (
    <section
      ref={sectionRef}
      id="pathway-details"
      data-pathway-motion-active={sectionActive && !reducedMotion ? 'true' : 'false'}
      aria-labelledby="academics-pathway-details-heading"
      className="relative scroll-mt-28 border-y border-slate-200 bg-white py-16 sm:py-20"
    >
      <SectionStemBackdrop variant="laboratory" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-end gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="max-w-3xl lg:col-span-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Grades 10 – 12 · Senior School curriculum
            </p>
            <p className="mb-3 text-sm font-medium text-slate-600">
              Pathways to <RotatingPathwayWord />
              <span className="sr-only">
                {' '}
                STEM, Social Sciences, and Arts &amp; Sports Science.
              </span>
            </p>
            <HeroScrambleTitle
              id="academics-pathway-details-heading"
              as="h2"
              text="Explore pathway tracks"
              durationMs={760}
              startDelayMs={60}
              className="font-serif text-3xl font-bold leading-tight text-slate-900 sm:text-4xl"
            />
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Choose a pathway to view its tracks, subjects, and related university fields.
            </p>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <dl
              className="grid grid-cols-3 gap-2 sm:gap-3"
              aria-label={`${activePathway.name} pathway overview`}
            >
              <div className="pathway-stat-pill">
                <dt className="pathway-stat-label">Tracks</dt>
                <CountUpStat
                  key={`${activePathway.id}-tracks`}
                  value={String(trackCount)}
                  index={0}
                  className="pathway-stat-value"
                />
              </div>
              <div className="pathway-stat-pill">
                <dt className="pathway-stat-label">Subject listings</dt>
                <CountUpStat
                  key={`${activePathway.id}-subjects`}
                  value={String(subjectCount)}
                  index={1}
                  className="pathway-stat-value"
                />
              </div>
              <div className="pathway-stat-pill">
                <dt className="pathway-stat-label">Departments</dt>
                <CountUpStat
                  key="academic-departments"
                  value={String(departments.length)}
                  index={2}
                  className="pathway-stat-value"
                />
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-y border-slate-200 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div
            className="flex flex-wrap items-center gap-2.5"
            role="tablist"
            aria-label="CBC Senior School Pathways"
          >
            {cbcPathways.map((pathway, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={pathway.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`academics-detail-tab-${pathway.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="academics-pathway-detail-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={`pathway-tab-control ${selected ? 'pill-3d-primary' : 'pill-3d-secondary'}`}
                >
                  {pathway.name}
                </button>
              );
            })}
          </div>

          <div className="pathway-carousel-controls">
            <div
              className="pathway-carousel-control-group"
              role="group"
              aria-label="Track display mode"
            >
              <button
                type="button"
                className={`pathway-carousel-option ${activeViewMode === 'loop' ? 'pill-3d-primary' : 'pill-3d-secondary'}`}
                aria-pressed={activeViewMode === 'loop'}
                disabled={reducedMotion}
                onClick={() => setViewMode('loop')}
              >
                Loop
              </button>
              <button
                type="button"
                className={`pathway-carousel-option ${activeViewMode === 'grid' ? 'pill-3d-primary' : 'pill-3d-secondary'}`}
                aria-pressed={activeViewMode === 'grid'}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </button>
            </div>

            <div
              className="pathway-carousel-control-group"
              role="group"
              aria-label="Carousel speed"
            >
              {CAROUSEL_SPEEDS.map((speed) => {
                const selected = carouselSpeed === speed.id;
                return (
                  <button
                    key={speed.id}
                    type="button"
                    className={`pathway-carousel-option ${selected ? 'pill-3d-primary' : 'pill-3d-secondary'}`}
                    aria-pressed={selected}
                    disabled={activeViewMode !== 'loop' || reducedMotion}
                    onClick={() => setCarouselSpeed(speed.id)}
                  >
                    {speed.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="pill-3d-secondary pathway-carousel-control"
              aria-pressed={userPaused}
              aria-label={userPaused ? 'Resume track carousel' : 'Pause track carousel'}
              disabled={activeViewMode !== 'loop' || reducedMotion}
              onClick={() => setUserPaused((paused) => !paused)}
            >
              {userPaused ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{userPaused ? 'Resume carousel' : 'Pause carousel'}</span>
            </button>
          </div>
        </div>

        <div
          id="academics-pathway-detail-panel"
          role="tabpanel"
          aria-labelledby={activeTabId}
          tabIndex={0}
          className="pt-6"
        >
          <div className="mb-6 min-h-12 max-w-4xl text-sm leading-relaxed text-slate-600 sm:text-base">
            <HeroTypewriterText
              key={activePathway.id}
              text={activePathway.summary}
              startDelayMs={160}
              charDelayMs={12}
              spaceDelayMs={18}
              punctuationDelayMs={42}
              caretHoldMs={1200}
              className="min-h-12 text-sm leading-relaxed text-slate-600 sm:text-base"
            />
          </div>

          <div
            className={`pathways-carousel-desktop pathways-carousel marquee-viewport${activeViewMode === 'grid' ? ' pathways-carousel--grid' : ''}`}
            role="region"
            aria-roledescription={activeViewMode === 'loop' ? 'carousel' : undefined}
            aria-label={`${activePathway.name} tracks`}
          >
            <div
              className="pathways-carousel-track marquee-track"
              data-running={carouselRunning ? 'true' : 'false'}
              style={{ '--loop-duration': `${carouselDuration}s` } as CSSProperties}
            >
              {[false, true].map((duplicate) => (
                <div
                  key={duplicate ? 'clone' : 'original'}
                  className={`pathway-carousel-group${duplicate ? ' pathway-carousel-group--clone' : ''}`}
                  role="list"
                  aria-label={duplicate ? undefined : `${activePathway.name} tracks`}
                  aria-hidden={duplicate ? true : undefined}
                >
                  {activePathway.tracks.map((track, index) => (
                    <TrackCard
                      key={`${duplicate ? 'clone-' : ''}${track.id}`}
                      pathway={activePathway}
                      track={track}
                      trackIndex={index}
                      duplicate={duplicate}
                      onOpen={openTrackDetails}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div
            className="pathways-mobile-grid"
            role="list"
            aria-label={`${activePathway.name} tracks`}
          >
            {activePathway.tracks.map((track, index) => (
              <TrackCard
                key={track.id}
                pathway={activePathway}
                track={track}
                trackIndex={index}
                onOpen={openTrackDetails}
              />
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Select a track to view its subjects and related university fields.
          </p>
        </div>
      </div>

      <TrackDetailDialog
        selected={selectedTrack}
        onClose={closeTrackDetails}
        closeButtonRef={closeButtonRef}
        dialogRef={dialogRef}
      />
    </section>
  );
}
