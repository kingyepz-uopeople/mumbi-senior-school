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
  Event: 'text-primary bg-blue-50 border-blue-200',
  Circular: 'text-[#C22F2F] bg-red-50 border-red-200',
  Download: 'text-primary-dark bg-slate-100 border-slate-300',
  Newsletter: 'text-primary bg-blue-50 border-blue-200',
};

export default function NewsIndexClient({ items }: { items: NewsItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => parseDateValue(b.date) - parseDateValue(a.date)),
    [items],
  );

  const categories = useMemo(() => {
    const unique = Array.from(new Set(sortedItems.map((item) => item.category)));
    return ['All', ...unique];
  }, [sortedItems]);

  const filteredItems = useMemo(
    () =>
      selectedCategory === 'All'
        ? sortedItems
        : sortedItems.filter((item) => item.category === selectedCategory),
    [selectedCategory, sortedItems],
  );

  return (
    <div className="space-y-8">
      {/* Category Filter */}
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
              onClick={() => setSelectedCategory(category)}
              aria-pressed={isActive}
              className={`min-h-10 px-4 py-1.5 rounded-sm text-xs font-semibold uppercase tracking-[0.1em] border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Articles List */}
      <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
        {filteredItems.map((item) => {
          const badgeClass =
            categoryBadgeClasses[item.category] ?? categoryBadgeClasses.Event;

          return (
            <article
              key={item.id}
              className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-5 items-start"
            >
              <div className="md:col-span-10">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <time
                    dateTime={toIsoDate(item.date)}
                    className="text-xs sm:text-sm font-medium text-slate-600 tabular-nums"
                  >
                    {item.date}
                  </time>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-sm border text-[11px] font-bold uppercase tracking-[0.1em] ${badgeClass}`}
                  >
                    {item.category}
                  </span>
                </div>

                <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
                  <Link
                    href={`/news/${item.slug}`}
                    className="hover:text-primary hover:underline underline-offset-4 transition-colors"
                  >
                    {item.title}
                  </Link>
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="md:col-span-2 md:text-right flex md:justify-end items-center">
                <Link
                  href={`/news/${item.slug}`}
                  className="min-h-11 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark hover:underline underline-offset-4 transition-colors"
                >
                  <span>Read notice</span>
                  <ArrowRight className="w-4 h-4 shrink-0 stroke-[1.75]" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
