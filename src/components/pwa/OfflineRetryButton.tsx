'use client';

import { RotateCw } from '@/components/icons';
import { useLocale } from '@/i18n/locale-context';

export default function OfflineRetryButton() {
  const { dict } = useLocale();

  return (
    <button
      type="button"
      onClick={() => window.location.reload()}
      className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-colors"
    >
      <RotateCw className="w-4 h-4 shrink-0 stroke-[1.75]" aria-hidden="true" />
      <span>{dict.offline.tryAgain}</span>
    </button>
  );
}