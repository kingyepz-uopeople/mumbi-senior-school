import type { Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionaries/en';
import en from '@/i18n/dictionaries/en';
import sw from '@/i18n/dictionaries/sw';

const dictionaries: Record<Locale, Dictionary> = {
  en,
  sw,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
