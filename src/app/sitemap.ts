import type { MetadataRoute } from 'next';
import { newsItems } from '@/data/mock-school-data';
import { locales } from '@/i18n/config';
import { SITE_URL } from '@/lib/site';
import { parseDateKE } from '@/lib/utils';

const LATEST_CONTENT_DATE = new Date('2025-03-20T00:00:00.000Z');

const staticPaths = [
  '',
  '/about',
  '/academics',
  '/admissions',
  '/explore',
  '/downloads',
  '/gallery',
  '/contact',
  '/portal',
  '/news',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path, index) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency:
        path === '' || path === '/admissions' || path === '/downloads'
          ? 'weekly'
          : path === '/contact'
            ? 'yearly'
            : 'monthly',
      priority: path === '' ? 1 : index < 4 ? 0.9 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [alt, `${SITE_URL}/${alt}${path}`])
        ),
      },
    }))
  );

  const newsRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    newsItems.map((item) => ({
      url: `${SITE_URL}/${locale}/news/${item.slug}`,
      lastModified: parseDateKE(item.date),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          locales.map((alt) => [
            alt,
            `${SITE_URL}/${alt}/news/${item.slug}`,
          ])
        ),
      },
    }))
  );

  return [...staticRoutes, ...newsRoutes];
}
