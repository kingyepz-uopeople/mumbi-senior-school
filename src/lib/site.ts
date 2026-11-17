import type { Metadata } from 'next';

export const SITE_URL = 'https://mumbiseniorschool.sc.ke';
export const SITE_NAME = 'Mumbi Girls Senior School';
export const DEFAULT_OG_IMAGE = {
  url: '/images/og-image.png',
  width: 1200,
  height: 630,
  alt: 'Mumbi Girls Senior School — Education for Empowerment (KNEC 10204102)',
};

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  type = 'website',
  publishedTime,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const fullTitle =
    path === '/'
      ? `${SITE_NAME} | Education for Empowerment`
      : `${title} | ${SITE_NAME}`;
  const canonicalUrl = new URL(path, SITE_URL).toString();

  return {
    title: path === '/' ? { absolute: fullTitle } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'en_KE',
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
  };
}
