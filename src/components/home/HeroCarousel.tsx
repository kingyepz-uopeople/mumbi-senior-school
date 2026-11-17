'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Pause,
  Play,
} from 'lucide-react';
import { heroSlides } from '@/data/mock-school-data';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isPaused = userPaused || interactionPaused || reducedMotion;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Respect OS reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mq.matches);
    const initTimer = setTimeout(handleChange, 0);
    mq.addEventListener('change', handleChange);
    return () => {
      clearTimeout(initTimer);
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const activeSlide = heroSlides[current];

  return (
    <section
      ref={sectionRef}
      data-dark-surface
      aria-roledescription="carousel"
      aria-label="Mumbi Girls Senior School highlights"
      className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] bg-primary overflow-hidden flex flex-col justify-between border-b border-primary-dark"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(e) => {
        if (
          sectionRef.current &&
          !sectionRef.current.contains(e.relatedTarget as Node | null)
        ) {
          setInteractionPaused(false);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          next();
        }
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(delta) > 48) {
          if (delta < 0) next();
          else prev();
        }
      }}
    >
      {/* Local Optimized Slide Backgrounds */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden={index !== current}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* High-contrast crest-blue readability gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary-dark/65 via-primary-dark/50 to-slate-950/80"
        aria-hidden="true"
      />

      {/* Desktop Side Arrows */}
      <button
        type="button"
        onClick={prev}
        className="hidden md:inline-flex items-center justify-center w-12 h-12 absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/35 border border-white/30 text-white hover:bg-primary hover:border-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={next}
        className="hidden md:inline-flex items-center justify-center w-12 h-12 absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/35 border border-white/30 text-white hover:bg-primary hover:border-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" aria-hidden="true" />
      </button>

      {/* Single Active Slide Foreground (strictly one h1 on homepage) */}
      <div
        aria-live={userPaused ? 'polite' : 'off'}
        aria-atomic="true"
        className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-8 md:px-20 pt-12 pb-6"
      >
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 border border-white/35 text-white text-xs font-semibold uppercase tracking-wider mb-5">
            <span
              className="w-2 h-2 rounded-full bg-accent shrink-0"
              aria-hidden="true"
            />
            <span>{activeSlide.eyebrow}</span>
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4">
            {activeSlide.title}
          </h1>

          <div
            className="w-16 h-1 rounded-full bg-accent mx-auto mb-5"
            aria-hidden="true"
          />

          <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed mb-8">
            {activeSlide.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={activeSlide.ctaHref}
              className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-blue-50 text-primary font-bold text-sm shadow-lg transition-colors"
            >
              <span>{activeSlide.ctaLabel}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link
              href="/downloads"
              className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold text-sm backdrop-blur-xs transition-colors"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Circulars &amp; Downloads</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Accessible Carousel Controls Bar (fits cleanly at 360px+) */}
      <div className="relative z-20 px-4 pb-5 pt-2 flex items-center justify-center gap-2">
        <button
          type="button"
          onClick={prev}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/30 text-white hover:bg-white/20 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" aria-hidden="true" />
        </button>

        <div
          className="flex items-center gap-0.5"
          role="group"
          aria-label="Choose slide"
        >
          {heroSlides.map((slide, index) => {
            const selected = index === current;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Slide ${index + 1} of ${heroSlides.length}: ${slide.title}`}
                aria-current={selected ? 'true' : undefined}
                className="inline-flex items-center justify-center min-w-7 sm:min-w-11 h-11 px-1 rounded-full"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    selected
                      ? 'w-6 sm:w-8 bg-accent ring-1 ring-white/90'
                      : 'w-2.5 bg-white/60 hover:bg-white'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={next}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/30 text-white hover:bg-white/20 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => setUserPaused((prevState) => !prevState)}
          className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/30 text-white hover:bg-white/20 transition-colors"
          aria-label={
            userPaused || reducedMotion
              ? 'Play automatic slide rotation'
              : 'Pause automatic slide rotation'
          }
          aria-pressed={userPaused}
        >
          {userPaused || reducedMotion ? (
            <Play className="w-4 h-4 text-white" aria-hidden="true" />
          ) : (
            <Pause className="w-4 h-4 text-white" aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
}
