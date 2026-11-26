'use client';

import Image from 'next/image';
import { Download, Share, X } from '@/components/icons';
import { usePwa } from '@/components/pwa/PwaProvider';
import { useLocale } from '@/i18n/locale-context';

export default function MobileInstallBanner() {
  const { dict } = useLocale();
  const i = dict.install;
  const { bannerVisible, manualHint, handleBannerInstall, dismissBanner } =
    usePwa();

  if (!bannerVisible) return null;

  return (
    <aside
      data-light-surface
      aria-label={i.ariaLabel}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:inset-x-auto md:right-5 md:bottom-5 md:p-0 md:pb-0"
    >
      <div className="pointer-events-auto mx-auto max-w-sm rounded-sm border border-slate-300 border-t-2 border-t-primary bg-white px-3 py-2 shadow-lg md:w-96 md:max-w-md md:p-4">
        <div className="flex items-center gap-2.5 md:items-start md:gap-3">
          <Image
            src="/icons/icon-192x192.png"
            alt="Mumbi Girls' Senior School crest"
            width={44}
            height={44}
            sizes="44px"
            className="h-8 w-8 shrink-0 rounded-xs border border-slate-200 bg-white object-contain md:h-11 md:w-11"
          />

          <div className="min-w-0 flex-1">
            <p className="font-serif text-[13px] leading-snug font-bold text-slate-900 md:text-sm">
              {i.title}
            </p>
            <p className="mt-0.5 hidden text-xs leading-relaxed text-slate-600 md:block">
              {i.body}
            </p>
          </div>

          <button
            type="button"
            onClick={dismissBanner}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:text-primary md:-mt-2 md:-mr-2 md:h-11 md:w-11"
            aria-label={i.dismissAria}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {manualHint ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-2 space-y-2 border-t border-slate-200 pt-2 text-xs text-slate-700 md:mt-3 md:space-y-2.5 md:pt-3"
          >
            {manualHint === 'ios' ? (
              <p className="flex items-start gap-2 leading-relaxed">
                <Share
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary stroke-[1.75]"
                  aria-hidden="true"
                />
                <span>
                  {i.iosHintBefore} <strong>{i.iosShare}</strong>{' '}
                  {i.iosHintMid} <strong>{i.iosAdd}</strong>
                  {i.iosHintEnd}
                </span>
              </p>
            ) : (
              <p className="leading-relaxed">
                {i.androidHintBefore}
                <strong>{i.androidMenu}</strong>
                {i.androidHintMid} <strong>{i.androidInstall}</strong>{' '}
                {i.androidOr} <strong>{i.androidAdd}</strong>
                {i.androidHintEnd}
              </p>
            )}
            <button
              type="button"
              onClick={dismissBanner}
              className="min-h-9 w-full rounded-full bg-primary px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-primary-dark md:min-h-11 md:py-2.5 md:text-xs"
            >
              {i.closeDontShow}
            </button>
          </div>
        ) : (
          <div className="mt-2 flex items-center gap-2 border-t border-slate-200 pt-2 md:mt-3 md:pt-3">
            <button
              type="button"
              onClick={handleBannerInstall}
              className="inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-primary-dark md:min-h-11 md:gap-2 md:px-4 md:py-2.5 md:text-xs"
            >
              <Download className="h-3.5 w-3.5 stroke-[1.75] md:h-4 md:w-4" aria-hidden="true" />
              <span>{i.installApp}</span>
            </button>
            <button
              type="button"
              onClick={dismissBanner}
              className="min-h-9 rounded-full border border-slate-300 px-3 py-2 text-[11px] font-medium text-slate-700 transition-colors hover:border-primary hover:text-primary md:min-h-11 md:px-3.5 md:py-2.5 md:text-xs"
            >
              {i.notNow}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
