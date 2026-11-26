import { notFound } from 'next/navigation';
import {
  defaultLocale,
  isLocale,
  type Locale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Dictionary } from '@/i18n/dictionaries/en';

export async function resolveLocale(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

export async function getLocaleDictionary(
  params: Promise<{ locale: string }>
): Promise<{ locale: Locale; dict: Dictionary }> {
  const locale = await resolveLocale(params);
  return { locale, dict: getDictionary(locale) };
}

export { fill } from '@/i18n/fill';

export { defaultLocale, getDictionary };
