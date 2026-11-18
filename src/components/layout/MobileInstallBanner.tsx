'use client';

import Image from 'next/image';
import { Download, Share, X } from 'lucide-react';
import { usePwa } from '@/components/pwa/PwaProvider';

export default function MobileInstallBanner() {
  const { bannerVisible, manualHint, handleBannerInstall, dismissBanner } =
    usePwa();

  if (!bannerVisible) return null;

  return (
    <aside
      data-light-surface
      aria-label="Install Mumbi Portal App"
      className="fixed bottom-0 inset-x-0 md:inset-x-auto md:right-5 md:bottom-5 z-50 p-3 md:p-0 pointer-events-none"
    >
      <div className="pointer-events-auto bg-white rounded-sm shadow-lg border border-slate-300 border-t-2 border-t-primary p-4 max-w-md md:w-96 mx-auto">
        <div className="flex items-start gap-3">
          <Image
            src="/icons/icon-192x192.png"
            alt="Mumbi Girls' Senior School crest"
            width={44}
            height={44}
            sizes="44px"
            className="w-11 h-11 rounded-xs bg-white border border-slate-200 object-contain shrink-0"
          />

          <div className="flex-1 min-w-0">
            <p className="font-serif text-slate-900 font-bold text-sm leading-snug">
              Save Mumbi Portal to Home Screen
            </p>
            <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">
              Quick access to term circulars, holiday assignments, and school
              contact details.
            </p>
          </div>

          <button
            type="button"
            onClick={dismissBanner}
            className="inline-flex items-center justify-center w-11 h-11 -mr-2 -mt-2 rounded-full text-slate-600 hover:text-primary transition-colors shrink-0"
            aria-label="Dismiss install app banner"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {manualHint ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-3 pt-3 border-t border-slate-200 text-xs text-slate-700 space-y-2.5"
          >
            {manualHint === 'ios' ? (
              <p className="flex items-start gap-2 leading-relaxed">
                <Share
                  className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[1.75]"
                  aria-hidden="true"
                />
                <span>
                  In Safari, tap <strong>Share</strong> at the bottom of the
                  screen, then select <strong>Add to Home Screen</strong>.
                </span>
              </p>
            ) : (
              <p className="leading-relaxed">
                Open your browser menu (<strong>⋮</strong>) and choose{' '}
                <strong>Install app</strong> or{' '}
                <strong>Add to Home screen</strong>.
              </p>
            )}
            <button
              type="button"
              onClick={dismissBanner}
              className="w-full min-h-11 px-4 py-2.5 rounded-full bg-primary text-white font-semibold text-xs hover:bg-primary-dark transition-colors"
            >
              Close &amp; Don&apos;t Show Again
            </button>
          </div>
        ) : (
          <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              onClick={handleBannerInstall}
              className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
              <span>Install App</span>
            </button>
            <button
              type="button"
              onClick={dismissBanner}
              className="min-h-11 px-3.5 py-2.5 rounded-full border border-slate-300 text-slate-700 hover:text-primary hover:border-primary text-xs font-medium transition-colors"
            >
              Not Now
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
