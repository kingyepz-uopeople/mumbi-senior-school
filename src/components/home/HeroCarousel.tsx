'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '@/data/mock';

const gradients = [
  'linear-gradient(135deg, #800020 0%, #4a0012 50%, #2d000b 100%)',
  'linear-gradient(135deg, #2d000b 0%, #800020 50%, #D4AF37 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #800020 0%, #D4AF37 40%, #800020 100%)',
  'linear-gradient(135deg, #0f3460 0%, #533483 50%, #800020 100%)',
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section
      className="relative w-full h-[60vh] min-h-[400px] md:h-[75vh] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            background: gradients[index % gradients.length],
            opacity: index === current ? 1 : 0,
            transform: index === current ? 'scale(1)' : 'scale(1.05)',
            zIndex: index === current ? 1 : 0,
          }}
        >
          {/* Overlay pattern */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-4xl leading-tight transition-all duration-700"
              style={{
                transform: index === current ? 'translateY(0)' : 'translateY(30px)',
                opacity: index === current ? 1 : 0,
                transitionDelay: '200ms',
              }}
            >
              {slide.title}
            </h1>
            <p
              className="text-base md:text-xl lg:text-2xl max-w-3xl leading-relaxed transition-all duration-700"
              style={{
                color: '#D4AF37',
                transform: index === current ? 'translateY(0)' : 'translateY(30px)',
                opacity: index === current ? 1 : 0,
                transitionDelay: '400ms',
              }}
            >
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/40 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="transition-all duration-300"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: index === current ? '2rem' : '0.75rem',
                height: '0.75rem',
                backgroundColor: index === current ? '#D4AF37' : 'rgba(255,255,255,0.5)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
