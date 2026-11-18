import { NextResponse, type NextRequest } from 'next/server';
import { newsItems } from '@/data/mock-school-data';

const publishedSlugs = new Set(newsItems.map(({ slug }) => slug));

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.slice('/news/'.length).replace(/\/$/, '');

  try {
    if (publishedSlugs.has(decodeURIComponent(slug))) return NextResponse.next();
  } catch {
    // Malformed URL encoding cannot match a published notice.
  }

  // Reject unknown notices before the article's loading shell starts streaming.
  return NextResponse.rewrite(new URL('/404', request.url), { status: 404 });
}

export const config = { matcher: '/news/:slug' };
