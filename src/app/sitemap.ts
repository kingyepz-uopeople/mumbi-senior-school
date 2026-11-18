import type { MetadataRoute } from 'next';
import { newsItems } from '@/data/mock-school-data';
import { SITE_URL } from '@/lib/site';
import { parseDateKE } from '@/lib/utils';

const LATEST_CONTENT_DATE = new Date('2025-03-20T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/academics`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/admissions`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/explore`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/downloads`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/portal`,
      lastModified: LATEST_CONTENT_DATE,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = newsItems.map((item) => ({
    url: `${SITE_URL}/news/${item.slug}`,
    lastModified: parseDateKE(item.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
