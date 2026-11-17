'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { galleryAlbums } from '@/data/mock-school-data';
import type { GalleryImage } from '@/types';

export default function GalleryBrowser() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const allImages: GalleryImage[] = useMemo(
    () => galleryAlbums.flatMap((album) => album.images),
    []
  );

  const selectedAlbum = useMemo(
    () => galleryAlbums.find((album) => album.id === selectedAlbumId) ?? null,
    [selectedAlbumId]
  );

  const displayedImages = selectedAlbum ? selectedAlbum.images : allImages;

  const activeImage =
    activeIndex !== null && displayedImages[activeIndex]
      ? displayedImages[activeIndex]
      : null;

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showNext = useCallback(() => {
    if (displayedImages.length === 0) return;
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % displayedImages.length
    );
  }, [displayedImages.length]);

  const showPrev = useCallback(() => {
    if (displayedImages.length === 0) return;
    setActiveIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + displayedImages.length) % displayedImages.length
    );
  }, [displayedImages.length]);

  const isLightboxOpen = activeIndex !== null;

  // Focus management, keyboard shortcuts (Esc, Arrows, Tab trap), and body scroll lock
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

  return (
    <div className="space-y-10">
      {/* Album Filter Buttons */}
      <div
        role="group"
        aria-label="Filter gallery by event album"
        className="flex justify-center flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={selectedAlbumId === 'all'}
          onClick={() => {
            setSelectedAlbumId('all');
            setActiveIndex(null);
          }}
          className={`min-h-11 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
            selectedAlbumId === 'all'
              ? 'bg-maroon text-white shadow-xs'
              : 'bg-white border border-slate-300 text-slate-700 hover:border-maroon hover:text-maroon'
          }`}
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
                setActiveIndex(null);
              }}
              className={`min-h-11 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors ${
                active
                  ? 'bg-maroon text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-maroon hover:text-maroon'
              }`}
            >
              {album.name} ({album.images.length})
            </button>
          );
        })}
      </div>

      {/* Album Heading & Description (proper h2 before card h3s) */}
      <section aria-labelledby="gallery-album-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h2
              id="gallery-album-heading"
              className="text-xl sm:text-2xl font-bold text-slate-900"
            >
              {selectedAlbum ? selectedAlbum.name : 'All Campus Albums'}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              {selectedAlbum
                ? selectedAlbum.description
                : 'Select any card below to inspect in the fullscreen viewer. Official campus photographs will replace illustrated placeholders.'}
            </p>
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-xs font-semibold text-slate-600 shrink-0"
          >
            {displayedImages.length}{' '}
            {displayedImages.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Keyboard-Accessible Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedImages.map((img, index) => (
            <article
              key={img.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:border-maroon hover:shadow-md transition-all flex flex-col"
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTriggerRef.current = e.currentTarget;
                  setActiveIndex(index);
                }}
                aria-label={`Open full view: ${img.alt}`}
                className="group text-left flex flex-col flex-1 w-full rounded-2xl"
              >
                <div className="relative w-full aspect-3/2 overflow-hidden bg-maroon">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-maroon/75 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white"
                  >
                    <Maximize2 className="w-5 h-5 text-gold" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      Open Lightbox
                    </span>
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between w-full">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-maroon transition-colors leading-snug">
                    {img.alt}
                  </h3>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-600 mt-3 pt-2.5 border-t border-slate-100">
                    <span className="truncate">{img.event}</span>
                    <span className="font-bold text-maroon shrink-0">
                      {img.year}
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* Accessible Lightbox Modal Dialog */}
      {activeImage &&
        activeIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dialogRef}
            data-dark-surface
            role="dialog"
            aria-modal="true"
            aria-labelledby="gallery-lightbox-title"
            aria-describedby="gallery-lightbox-meta"
            className="fixed inset-0 z-[70] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col max-h-[92vh]">
              {/* Top Bar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 bg-slate-950/70 border-b border-white/10">
                <p
                  id="gallery-lightbox-meta"
                  role="status"
                  aria-live="polite"
                  className="text-xs sm:text-sm font-semibold text-slate-200 truncate"
                >
                  <span className="text-gold font-bold">
                    {activeIndex + 1} / {displayedImages.length}
                  </span>{' '}
                  • {activeImage.event} ({activeImage.year})
                </p>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close photo lightbox"
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Image Viewport */}
              <div className="relative bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              {/* Caption & Accessible Prev/Next Controls */}
              <div className="p-4 sm:p-5 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2
                  id="gallery-lightbox-title"
                  className="text-sm sm:text-base font-bold text-white leading-snug"
                >
                  {activeImage.alt}
                </h2>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={showPrev}
                    aria-label="Previous photo"
                    className="flex-1 sm:flex-none min-h-11 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 text-gold" aria-hidden="true" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    aria-label="Next photo"
                    className="flex-1 sm:flex-none min-h-11 px-4 py-2 rounded-xl bg-gold hover:bg-white text-slate-900 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
