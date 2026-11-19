'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from '@/components/icons';
import { galleryAlbums } from '@/data/mock-school-data';
import type { GalleryImage } from '@/types';

interface GalleryBrowserProps {
  /** Root-relative `/images/school/...` paths that currently exist in `public/`. */
  availableSrcs: string[];
  /** Campus photographs for the opening drift strip. */
  driftImages?: GalleryImage[];
}

/** Short touch gesture that advances or rewinds the lightbox. */
const SWIPE_THRESHOLD_PX = 48;

export default function GalleryBrowser({
  availableSrcs,
  driftImages = [],
}: GalleryBrowserProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const suppressClickRef = useRef(false);

  const availableSet = useMemo(() => new Set(availableSrcs), [availableSrcs]);

  const allImages: GalleryImage[] = useMemo(
    () => galleryAlbums.flatMap((album) => album.images),
    []
  );

  const selectedAlbum = useMemo(
    () => galleryAlbums.find((album) => album.id === selectedAlbumId) ?? null,
    [selectedAlbumId]
  );

  const displayedImages = selectedAlbum ? selectedAlbum.images : allImages;

  // Only real photographs that exist on disk are shown or opened in the lightbox.
  const viewableImages = useMemo(
    () => displayedImages.filter((img) => availableSet.has(img.src)),
    [displayedImages, availableSet]
  );

  const activeViewIndex = useMemo(
    () =>
      activeImageId === null
        ? -1
        : viewableImages.findIndex((img) => img.id === activeImageId),
    [activeImageId, viewableImages]
  );

  const activeImage =
    activeViewIndex >= 0 ? viewableImages[activeViewIndex] : null;

  const closeLightbox = useCallback(() => {
    setActiveImageId(null);
  }, []);

  const showNext = useCallback(() => {
    if (viewableImages.length === 0 || activeViewIndex < 0) return;
    const next =
      viewableImages[(activeViewIndex + 1) % viewableImages.length];
    setActiveImageId(next.id);
  }, [viewableImages, activeViewIndex]);

  const showPrev = useCallback(() => {
    if (viewableImages.length === 0 || activeViewIndex < 0) return;
    const prev =
      viewableImages[
        (activeViewIndex - 1 + viewableImages.length) % viewableImages.length
      ];
    setActiveImageId(prev.id);
  }, [viewableImages, activeViewIndex]);

  // Campus photographs that exist on disk, used by the opening drift strip.
  const driftFrames = useMemo(
    () => driftImages.filter((img) => availableSet.has(img.src)).slice(0, 8),
    [driftImages, availableSet]
  );

  const openLightbox = useCallback(
    (imageId: number, trigger: HTMLButtonElement) => {
      lastTriggerRef.current = trigger;
      setActiveImageId(imageId);
    },
    []
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = touchStartRef.current;
      const touch = event.changedTouches[0];
      touchStartRef.current = null;
      if (!start || !touch) return;

      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX || Math.abs(dx) < Math.abs(dy)) {
        return;
      }

      // Stop the trailing synthetic click from closing the lightbox.
      suppressClickRef.current = true;
      if (dx < 0) showNext();
      else showPrev();
    },
    [showNext, showPrev]
  );

  const isLightboxOpen = activeImage !== null;

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerEl = lastTriggerRef.current;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
        return;
      }

      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      triggerEl?.focus();
    };
  }, [isLightboxOpen, closeLightbox, showNext, showPrev]);

  const filterBtnClass = (active: boolean) =>
    `min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-colors ${
      active
        ? 'bg-primary border-primary text-white'
        : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
    }`;

  const driftStrip =
    driftFrames.length > 0 ? (
      <div className="gallery-drift-viewport -mx-1 px-1" aria-hidden="true">
        <div className="gallery-drift-track">
          {[0, 1].map((pass) => (
            <div
              key={pass}
              className="flex gap-3.5 pr-3.5"
              data-clone={pass === 1 ? 'true' : 'false'}
            >
              {driftFrames.map((img) => (
                <span key={`${pass}-${img.id}`} className="gallery-drift-frame">
                  <Image
                    src={img.src}
                    alt=""
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 768px) 55vw, 320px"
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div className="space-y-10">
      {/* Opening drift of real campus photographs */}
      {driftStrip && (
        <section aria-label="Recent campus photographs" className="space-y-3">
          {driftStrip}
          <p className="text-xs font-medium tracking-wide text-slate-500">
            Recent photographs from the campus and school events.
          </p>
        </section>
      )}

      {/* Album filter */}
      <div
        role="group"
        aria-label="Filter gallery by album"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={selectedAlbumId === 'all'}
          onClick={() => {
            setSelectedAlbumId('all');
            setActiveImageId(null);
          }}
          className={filterBtnClass(selectedAlbumId === 'all')}
        >
          All Albums ({allImages.length})
        </button>

        {galleryAlbums.map((album) => {
          const active = selectedAlbumId === album.id;
          return (
            <button
              key={album.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setSelectedAlbumId(album.id);
                setActiveImageId(null);
              }}
              className={filterBtnClass(active)}
            >
              {album.name} ({album.images.length})
            </button>
          );
        })}
      </div>

      {/* Album heading & masonry */}
      <section aria-labelledby="gallery-album-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-300">
          <div className="max-w-2xl">
            <h2
              id="gallery-album-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {selectedAlbum ? selectedAlbum.name : 'All Albums'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {selectedAlbum
                ? selectedAlbum.description
                : 'Photographs of the campus and school events.'}
            </p>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-xs font-medium text-slate-600 tabular-nums shrink-0"
          >
            {viewableImages.length}{' '}
            {viewableImages.length === 1 ? 'photograph' : 'photographs'}
          </p>
        </div>

        {viewableImages.length > 0 ? (
          <div className="editorial-masonry">
            {viewableImages.map((img, index) => {
              const caption = img.caption ?? img.alt;
              const event = img.event === caption ? null : img.event;
              const albumLabel = [event, img.year].filter(Boolean).join(' · ');
              const photoLabel = event === null && caption !== img.alt
                ? `${caption} — ${img.alt}`
                : caption;

              return (
                <figure key={img.id} className="group relative m-0" data-reveal="" data-reveal-delay={(index % 6) + 1}>
                  <div className="relative w-full overflow-hidden bg-slate-100 border border-slate-300 group-hover:border-primary transition-colors">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => openLightbox(img.id, e.currentTarget)}
                    aria-label={`View photo: ${photoLabel}`}
                    className="absolute inset-0 z-10 rounded-xs focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                  />
                  <figcaption className="pt-3 space-y-1">
                    {albumLabel && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary tabular-nums">
                        {albumLabel}
                      </p>
                    )}
                    <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary leading-snug">
                      {caption}
                    </h3>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          <div className="py-12 px-6 bg-white border border-slate-200">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Photographs coming to this album
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Verified photographs will be added here by the school office.
            </p>
          </div>
        )}
      </section>

      {/* Accessible lightbox modal */}
      {activeImage &&
        activeViewIndex >= 0 &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dialogRef}
            data-dark-surface
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            aria-describedby="gallery-lightbox-meta"
            className="fixed inset-0 z-[70] bg-slate-950/92 flex items-center justify-center p-3 sm:p-6"
            onClick={(e) => {
              if (suppressClickRef.current) {
                suppressClickRef.current = false;
                return;
              }
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <div className="max-w-4xl w-full bg-slate-900 rounded-sm overflow-hidden border border-white/20 flex flex-col max-h-[92vh]">
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-slate-950 border-b border-white/15">
                <p
                  id="gallery-lightbox-meta"
                  role="status"
                  aria-live="polite"
                  className="text-xs sm:text-sm text-slate-200 truncate tabular-nums"
                >
                  <strong className="text-white">
                    {activeViewIndex + 1} / {viewableImages.length}
                  </strong>
                  {activeImage.event !== (activeImage.caption ?? activeImage.alt) && ` · ${activeImage.event}`}
                  {activeImage.year ? ` (${activeImage.year})` : ''}
                </p>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close photo lightbox"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-white/15 text-white transition-colors shrink-0"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              <div
                className="lightbox-stage mx-auto h-[52vh] w-full sm:h-[62vh]"
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  key="previous-frame"
                  src={activeImage.src}
                  alt=""
                  aria-hidden="true"
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="lightbox-layer"
                />
                <Image
                  key={`current-${activeImage.id}`}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="lightbox-layer lightbox-layer--current"
                />
              </div>

              <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2
                  id="gallery-lightbox-title"
                  className="font-serif text-base font-bold text-white leading-snug"
                >
                  {activeImage.caption ?? activeImage.alt}
                </h2>

                {viewableImages.length > 1 && (
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={showPrev}
                      aria-label="Previous photo"
                      className="flex-1 sm:flex-none min-h-11 px-4 py-2 rounded-full border border-white/30 hover:bg-white/15 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      <span>Previous</span>
                    </button>
                    <button
                      type="button"
                      onClick={showNext}
                      aria-label="Next photo"
                      className="flex-1 sm:flex-none min-h-11 px-4 py-2 rounded-full bg-white hover:bg-blue-50 text-primary text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
