'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from '@/components/icons';
import {
  useReducedMotion,
  useViewportActivity,
} from '@/components/shared/motion-utils';

const SWAP_MS = 3000;

const HERO_PHOTOS = [
  {
    src: '/images/school/hero-assembly.jpg',
    alt: 'Entrance to the school parade and assembly ground with the campus pine and school bus',
    position: 'object-center',
  },
  {
    src: '/images/school/hero-assembly-students.jpg',
    alt: 'Mumbi Girls learners gathered at morning assembly',
    position: 'object-center',
  },
  {
    src: '/images/school/hero-assembly-grounds.jpg',
    alt: 'Wide view of assembly on the school grounds with the school bus',
    position: 'object-center',
  },
  {
    src: '/images/school/hero-prize-giving-1.jpg',
    alt: 'Students and staff at a prize-giving ceremony on campus',
    position: 'object-center',
  },
  {
    src: '/images/school/hero-prize-giving-2.jpg',
    alt: 'Award recipients with staff outside a school building',
    position: 'object-center',
  },
  {
    src: '/images/school/gallery-campus-gate.jpg',
    alt: 'Blue main gate with the school motto Determined to Excel',
    position: 'object-center',
  },
  {
    src: '/images/school/gallery-campus-academic-block.jpg',
    alt: 'Three-storey academic block with blue trim and the Mumbi Girls sign',
    position: 'object-center',
  },
  {
    src: '/images/school/gallery-campus-serenity.jpg',
    alt: 'Elevated view of campus lawns, palm trees, paths, and blue-pillared buildings',
    position: 'object-center',
  },
  {
    src: '/images/school/gallery-campus-green-walk.jpg',
    alt: 'Paved campus walkway with trees and lawns behind low blue walls',
    position: 'object-center',
  },
  {
    src: '/images/school/gallery-campus-learning-corridors.jpg',
    alt: 'Long covered corridor beside a landscaped courtyard',
    position: 'object-center',
  },
] as const;

/**
 * Full-bleed campus photographs for the homepage hero.
 * Advances every 3 seconds while the hero is on screen, and holds the first
 * photograph when the visitor prefers reduced motion.
 */
export default function HeroPhotoLoop() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { active } = useViewportActivity(rootRef, { threshold: 0.25 });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || !active) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_PHOTOS.length);
    }, SWAP_MS);
    return () => window.clearInterval(timer);
  }, [active, paused, reduced]);

  return (
    <div ref={rootRef} className="absolute inset-0 bg-primary-dark">
      <div className="absolute inset-0" aria-hidden="true">
        {HERO_PHOTOS.map((photo, photoIndex) => (
          <Image
            key={photo.src}
            src={photo.src}
            alt=""
            fill
            priority={photoIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={75}
            className={`object-cover transition-opacity duration-700 ${photo.position} ${
              photoIndex === index ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>
      <p className="sr-only">{HERO_PHOTOS[index].alt}</p>

      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-linear-to-t from-primary-dark/80 to-transparent px-3 pt-10 pb-3 motion-reduce:hidden sm:px-4">
        <ol className="flex items-center">
          {HERO_PHOTOS.map((photo, photoIndex) => {
            const selected = photoIndex === index;
            return (
              <li key={photo.src}>
                <button
                  type="button"
                  aria-label={`Show photograph ${photoIndex + 1} of ${HERO_PHOTOS.length}`}
                  aria-current={selected ? 'true' : undefined}
                  onClick={() => setIndex(photoIndex)}
                  className="inline-flex min-h-11 min-w-8 items-center justify-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      selected ? 'w-6 bg-white' : 'w-2.5 bg-white/65'
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={() => setPaused((current) => !current)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary-dark/80 px-3 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          {paused ? (
            <Play className="size-3.5 shrink-0" aria-hidden="true" />
          ) : (
            <Pause className="size-3.5 shrink-0" aria-hidden="true" />
          )}
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      </div>
    </div>
  );
}
