'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { galleryAlbums } from '@/data/mock-school-data';
import type { GalleryImage } from '@/types';

interface GalleryBrowserProps {
  /**
   * Root-relative `/images/gallery/*.jpg` paths that currently exist in
   * `public/`. Frames without a matching file on disk display a clean neutral
   * "Photo coming soon" card rather than a placeholder illustration.
   */
  availableSrcs: string[];
}

export default function GalleryBrowser({ availableSrcs }: GalleryBrowserProps) {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [activeImageId, setActiveImageId] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

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

  // Only real photographs that exist on disk can be opened in the lightbox
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
    const next = viewableImages[(activeViewIndex + 1) % viewableImages.length];
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

  return (
    <div className="space-y-10">
      {/* Left-Aligned Album Filter Controls */}
      <div
        role="group"
        aria-label="Filter gallery by event album"
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

      {/* Album Heading & Grid */}
      <section aria-labelledby="gallery-album-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-4 border-b border-slate-300">
          <div className="max-w-2xl">
            <h2
              id="gallery-album-heading"
              className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
            >
              {selectedAlbum ? selectedAlbum.name : 'All Event Albums'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              {selectedAlbum
                ? selectedAlbum.description
                : viewableImages.length > 0
                  ? 'Select any photograph to view it at full size.'
                  : 'Verified photographs from the school office are being prepared for publication in each album below.'}
            </p>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-xs font-medium text-slate-600 tabular-nums shrink-0"
          >
            {displayedImages.length}{' '}
            {displayedImages.length === 1 ? 'frame' : 'frames'}
            {viewableImages.length > 0
              ? ` · ${viewableImages.length} published`
              : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {displayedImages.map((img, index) => {
            const hasPhoto = availableSet.has(img.src);
            const staggerDelay =
              index % 3 > 0 ? String(index % 3) : undefined;

            if (hasPhoto) {
              return (
                <article
                  key={img.id}
                  data-reveal=""
                  data-reveal-delay={staggerDelay}
                  className="flex flex-col"
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      lastTriggerRef.current = e.currentTarget;
                      setActiveImageId(img.id);
                    }}
                    aria-label={`View full size: ${img.alt}`}
                    className="group text-left flex flex-col w-full rounded-xs"
                  >
                    <div className="relative w-full aspect-3/2 overflow-hidden bg-slate-100 border border-slate-300 group-hover:border-primary transition-colors">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-3 space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary tabular-nums">
                        {img.event} · {img.year}
                      </p>
                      <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-primary leading-snug">
                        {img.alt}
                      </h3>
                    </div>
                  </button>
                </article>
              );
            }

            return (
              <article
                key={img.id}
                data-reveal=""
                data-reveal-delay={staggerDelay}
                className="flex flex-col"
              >
                <figure className="m-0 flex flex-col flex-1">
                  <div
                    role="img"
                    aria-label={`Photo coming soon — ${img.alt}`}
                    className="relative w-full aspect-3/2 bg-slate-100 border border-slate-300 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-2.5 border border-slate-200 pointer-events-none"
                    />
                    <Camera
                      className="w-5 h-5 text-slate-500 mb-2 stroke-[1.5]"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
                      Photo coming soon
                    </span>
                  </div>

                  <figcaption className="pt-3 space-y-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary tabular-nums">
                      {img.event} · {img.year}
                    </p>
                    <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                      {img.alt}
                    </h3>
                  </figcaption>
                </figure>
              </article>
            );
          })}
        </div>
      </section>

      {/* Accessible Lightbox Modal (renders when a real photograph is opened) */}
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
                  </strong>{' '}
                  · {activeImage.event} ({activeImage.year})
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

              <div className="relative bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="w-full h-auto max-h-[62vh] object-contain"
                />
              </div>

              <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2
                  id="gallery-lightbox-title"
                  className="font-serif text-base font-bold text-white leading-snug"
                >
                  {activeImage.alt}
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
