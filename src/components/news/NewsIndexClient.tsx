'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/types';

function parseDateValue(dateStr: string): number {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return 0;
  const [day, month, year] = parts.map(Number);
  return year * 10000 + month * 100 + day;
}

function toIsoDate(dateStr: string): string {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

const categoryBadgeClasses: Record<string, string> = {
  Event: 'text-blue-100 border-white/30',
  Circular: 'text-white bg-accent border-accent',
  Download: 'text-blue-100 border-white/30',
  Newsletter: 'text-blue-100 border-white/30',
};

export default function NewsIndexClient({ items }: { items: NewsItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => parseDateValue(b.date) - parseDateValue(a.date)
      ),
    [items]
  );

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(sortedItems.map((item) => item.category))
    );
    return ['All', ...unique];
  }, [sortedItems]);

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'All'
        ? sortedItems
        : sortedItems.filter((item) => item.category === selectedCategory),
    [selectedCategory, sortedItems]
  );

  const filterBtnClass = (active: boolean) =>
    `min-h-10 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
      active
        ? 'bg-white text-primary-dark border-white'
        : 'bg-transparent text-white border-white/40 hover:border-white'
    }`;

  return (
    <div className="space-y-8">
      {/* Category filter */}
      <div
        role="group"
        aria-label="Filter notices by category"
        className="flex flex-wrap items-center gap-2"
      >
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(category)}
              className={filterBtnClass(isActive)}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Editorial notices list */}
      <ol className="editorial-index" aria-label="School notices">
        {filteredItems.map((item, index) => {
          const badgeClass =
            categoryBadgeClasses[item.category] ?? categoryBadgeClasses.Event;

          return (
            <li key={item.id} className="editorial-cell">
              <Link
                href={`/news/${item.slug}`}
                className="editorial-row"
                data-reveal=""
                data-reveal-delay={(index % 6) + 1}
              >
                <span className="editorial-numeral" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em]">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-sm border ${badgeClass}`}
                    >
                      {item.category}
                    </span>
                    <span className="text-white/40" aria-hidden="true">
                      ·
                    </span>
                    <time
                      dateTime={toIsoDate(item.date)}
                      className="text-blue-100 tabular-nums"
                    >
                      {item.date}
                    </time>
                  </span>
                  <span className="mt-1.5 block font-serif text-lg font-bold text-white sm:text-xl leading-snug">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/80 sm:text-sm">
                    {item.excerpt}
                  </span>
                </span>
                <ArrowRight
                  className="editorial-arrow size-5 shrink-0 text-white"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {filteredItems.length === 0 && (
        <div className="py-12 px-6 bg-white/5 border border-white/15">
          <h3 className="font-serif text-lg font-bold text-white">
            No notices in this category yet
          </h3>
          <p className="mt-1 text-sm text-blue-100/85">
            Circulars, newsletters, and event notices are published by the
            school office.
          </p>
        </div>
      )}
    </div>
  );
}
