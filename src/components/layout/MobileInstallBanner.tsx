'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import type { BeforeInstallPromptEvent } from '@/types';
import { isBeforeInstallPromptEvent } from '@/lib/utils';

const DISMISSED_KEY = 'mumbi-install-banner-dismissed';

export default function MobileInstallBanner() {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Don't show on desktop or if previously dismissed
    const isDismissed = localStorage.getItem(DISMISSED_KEY) === 'true';
    if (isDismissed) return;

    const mediaQuery = window.matchMedia('(max-width: 768px)');
    if (!mediaQuery.matches) return;

    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const handler = (e: Event) => {
      if (!isBeforeInstallPromptEvent(e)) return;
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Also show banner on mobile even without the prompt (for awareness)
    const timer = setTimeout(() => {
      if (!isDismissed && mediaQuery.matches) {
        setVisible(true);
      }
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    setVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="bg-gold mx-3 mb-3 rounded-xl shadow-xl p-4">
        <div className="flex items-center gap-3">
          {/* App icon placeholder */}
          <div className="w-12 h-12 rounded-xl bg-maroon flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">MGS</span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-maroon font-bold text-sm">
              Install Mumbi Portal App
            </p>
            <p className="text-maroon/70 text-xs">
              Quick access to downloads, news & more
            </p>
          </div>

          {/* Dismiss */}
          <button
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-maroon/10 transition-colors shrink-0"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-maroon" />
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-maroon text-white rounded-lg text-sm font-semibold hover:bg-maroon/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Install Now
          </button>
          <button
            onClick={handleDismiss}
            className="px-4 py-2.5 text-maroon border border-maroon/30 rounded-lg text-sm font-medium hover:bg-maroon/5 transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
}
