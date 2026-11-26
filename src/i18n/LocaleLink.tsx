'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useLocale } from '@/i18n/locale-context';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/** Next.js Link that prefixes internal paths with the active locale. */
export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { href: localize } = useLocale();
  return <Link href={localize(href)} {...props} />;
}
