'use client';

import { useMemo, useState, useSyncExternalStore } from 'react';
import NoticeBoard from '@/components/news/NoticeBoard';
import {
  getReturningSlugServerSnapshot,
  getReturningSlugSnapshot,
  subscribeReturningSlug,
} from '@/components/news/notice-theme';
import { useLocale } from '@/i18n/locale-context';
import { parseDateKE } from '@/lib/utils';
import type { NewsItem } from '@/types';

export default function NewsIndexClient({ items }: { items: NewsItem[] }) {
  const { dict } = useLocale();
  const n = dict.news;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const returningSlug = useSyncExternalStore(
    subscribeReturningSlug,
    getReturningSlugSnapshot,
    getReturningSlugServerSnapshot
  );

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
      ),
    [items]
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
    [selectedCategory, sortedItems]
  );

  const categoryLabel = (category: string) =>
    category === 'All' ? dict.common.all : category;

  return (
    <div className="space-y-6 sm:space-y-8">
      <div
        role="group"
        aria-label={n.filterByCategory}
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
              className="notice-filter"
            >
              {categoryLabel(category)}
            </button>
          );
        })}
      </div>

      {filteredItems.length > 0 ? (
        <NoticeBoard
          items={filteredItems}
          readMoreLabel={dict.common.readMore}
          returningSlug={returningSlug}
          labelledBy="news-notices-heading"
        />
      ) : (
        <div className="rounded-md border border-primary/20 bg-white px-6 py-12">
          <h2 className="font-serif text-lg font-bold text-primary-dark">
            {n.empty}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{n.emptyHint}</p>
        </div>
      )}
    </div>
  );
}
