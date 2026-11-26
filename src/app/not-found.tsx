import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import { schoolInfo } from '@/data/mock-school-data';
import {
  defaultLocale,
  isLocale,
  localizeHref,
  LOCALE_COOKIE,
  type Locale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { fill } from '@/i18n/fill';

export default async function NotFound() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale: Locale = raw && isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  const n = dict.notFound;

  return (
    <div className="relative bg-slate-bg py-14 sm:py-20 px-4 sm:px-6">
      <SectionStemBackdrop variant="notices" />
      <div className="relative max-w-2xl mx-auto bg-white/55 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <Image
            src="/images/mumbi-logo.png"
            alt="Mumbi Girls' Senior School crest"
            width={56}
            height={57}
            sizes="56px"
            className="w-14 h-14 rounded-xs bg-[#f7f7f7] border border-slate-200 p-1 object-contain shrink-0"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-1 tabular-nums">
              {n.error}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {n.title}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {fill(n.body, { name: schoolInfo.name })}
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
          <Link
            href={localizeHref('/', locale)}
            className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
          >
            {n.home}
          </Link>
          <Link
            href={localizeHref('/downloads', locale)}
            className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold transition-colors"
          >
            {n.downloads}
          </Link>
          <Link
            href={localizeHref('/contact', locale)}
            className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center px-4 py-2.5 rounded-full text-slate-700 hover:text-primary hover:underline underline-offset-4 text-sm font-medium transition-colors"
          >
            {n.contact}
          </Link>
        </div>
      </div>
    </div>
  );
}
