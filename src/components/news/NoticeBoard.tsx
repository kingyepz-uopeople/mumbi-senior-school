'use client';

import { useEffect, useRef, useState } from 'react';
import NoticeNote from '@/components/news/NoticeNote';
import { consumeReturningSlug } from '@/components/news/notice-theme';
import { useReducedMotion } from '@/components/shared/motion-utils';
import type { NewsItem } from '@/types';

export default function NoticeBoard({
  items,
  readMoreLabel,
  compact = false,
  variant = 'index',
  returningSlug = null,
  labelledBy,
}: {
  items: NewsItem[];
  readMoreLabel: string;
  compact?: boolean;
  variant?: 'index' | 'home' | 'related';
  returningSlug?: string | null;
  labelledBy?: string;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [inView, setInView] = useState(reducedMotion);
  const [pending, setPending] = useState(false);
  const isReturning = Boolean(returningSlug);

  useEffect(() => {
    const el = boardRef.current;
    if (!el || reducedMotion || isReturning) {
      setInView(true);
      setPending(false);
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setInView(true);
      setPending(false);
      return;
    }

    setPending(true);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setInView(true);
        setPending(false);
        observer.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isReturning, reducedMotion]);

  useEffect(() => {
    if (!returningSlug) return;
    const timer = window.setTimeout(() => consumeReturningSlug(), 800);
    return () => window.clearTimeout(timer);
  }, [returningSlug]);

  const boardClass = [
    'notice-board',
    compact ? 'notice-board--compact' : '',
    variant === 'home' ? 'notice-board--home' : '',
    variant === 'related' ? 'notice-board--compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={boardRef}
      className={boardClass}
      data-inview={inView ? 'true' : 'false'}
      data-pending={pending ? 'true' : undefined}
      data-returning={isReturning ? 'true' : undefined}
      data-light-surface=""
      aria-labelledby={labelledBy}
    >
      <ul className="notice-board__grid">
        {items.map((item, index) => (
          <li key={item.slug}>
            <NoticeNote
              item={item}
              index={index}
              compact={compact}
              returning={returningSlug === item.slug}
              headingAs={variant === 'home' || compact ? 'h3' : 'h2'}
              readMoreLabel={readMoreLabel}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
