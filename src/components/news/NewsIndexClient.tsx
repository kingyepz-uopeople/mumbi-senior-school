'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/types';

export interface FeaturedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

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

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** Splits a DD/MM/YYYY string into display parts (no timezone maths). */
function dateParts(dateStr: string): { day: string; monthYear: string } {
  const [day, month, year] = dateStr.split('/');
  const monthIndex = Number(month) - 1;
  return {
    day,
    monthYear: `${MONTHS[monthIndex] ?? month} ${year}`,
  };
}

const categoryBadgeClasses: Record<string, string> = {
  Event: 'text-blue-100 border-white/30',
  Circular: 'text-white bg-accent border-accent',
  Download: 'text-blue-100 border-white/30',
  Newsletter: 'text-blue-100 border-white/30',
};

function CategoryBadge({ category }: { category: string }) {
  const badgeClass =
    categoryBadgeClasses[category] ?? categoryBadgeClasses.Event;
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
    >
      {category}
    </span>
  );
}

/** Small date block: large serif day over an abbreviated month + year. */
function DateBlock({
  date,
  className = '',
}: {
  date: string;
  className?: string;
}) {
  const { day, monthYear } = dateParts(date);
  return (
    <time
      dateTime={toIsoDate(date)}
      className={`flex items-baseline gap-2 text-blue-100 tabular-nums md:flex-col md:items-start md:gap-0 ${className}`}
    >
      <span className="font-serif text-2xl leading-none font-bold text-white md:text-3xl">
        {day}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
        {monthYear}
      </span>
    </time>
  );
}

export default function NewsIndexClient({
  items,
  featuredImages = {},
}: {
  items: NewsItem[];
  /** Slug → real photograph in `public/`, resolved on the server. */
  featuredImages?: Record<string, FeaturedImage>;
}) {
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

  // The newest notice leads the page; the rest follow as a dated list.
  const [lead, ...restItems] = filteredItems;
  const leadImage = lead ? featuredImages[lead.slug] : undefined;

  const filterBtnClass = (active: boolean) =>
    `min-h-10 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
      active
        ? 'bg-white text-primary-dark border-white'
        : 'bg-transparent text-white border-white/40 hover:border-white'
    }`;

  return (
    <div className="space-y-10">
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

      {/* Lead story */}
      {lead && (
        <article
          data-reveal=""
          className="news-lead grid overflow-hidden rounded-lg border border-white/20 bg-white/5 md:grid-cols-[1.05fr_1fr]"
        >
          {leadImage && (
            <Link
              href={`/news/${lead.slug}`}
              tabIndex={-1}
              aria-hidden="true"
              className="kenburns-frame relative block min-h-56 border-b border-white/15 md:min-h-full md:border-b-0 md:border-r"
            >
              <Image
                src={leadImage.src}
                alt={leadImage.alt}
                width={leadImage.width}
                height={leadImage.height}
                sizes="(max-width: 768px) 100vw, 48vw"
                quality={95}
                className="kenburns-image absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 bg-linear-to-t from-primary-dark/55 via-transparent to-transparent" />
            </Link>
          )}

          <div className="flex min-w-0 flex-col justify-center gap-3 p-5 sm:p-7 lg:p-9">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.12em]">
              <CategoryBadge category={lead.category} />
              <span className="text-white/40" aria-hidden="true">
                ·
              </span>
              <time
                dateTime={toIsoDate(lead.date)}
                className="text-blue-100 tabular-nums"
              >
                {lead.date}
              </time>
            </div>

            <h2 className="font-serif text-2xl leading-tight font-bold text-white sm:text-3xl lg:text-4xl">
              <Link
                href={`/news/${lead.slug}`}
                className="hover:underline underline-offset-4 decoration-white/50"
              >
                {lead.title}
              </Link>
            </h2>

            <p className="max-w-prose text-sm leading-relaxed text-blue-100/85 sm:text-base">
              {lead.excerpt}
            </p>

            <Link
              href={`/news/${lead.slug}`}
              className="mt-1 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-blue-50"
            >
              Read the full notice
              <ArrowRight className="h-4 w-4 stroke-[1.75]" aria-hidden="true" />
            </Link>
          </div>
        </article>
      )}

      {/* Dated list */}
      {restItems.length > 0 && (
        <ol className="editorial-index" aria-label="More school notices">
          {restItems.map((item, index) => (
            <li key={item.id} className="editorial-cell">
              <Link
                href={`/news/${item.slug}`}
                className="editorial-row"
                data-reveal=""
                data-reveal-delay={(index % 6) + 1}
              >
                <DateBlock date={item.date} className="md:w-24 md:shrink-0" />
                <span className="min-w-0">
                  <span className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={item.category} />
                  </span>
                  <span className="mt-1.5 block font-serif text-lg font-bold leading-snug text-white sm:text-xl">
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
          ))}
        </ol>
      )}

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
