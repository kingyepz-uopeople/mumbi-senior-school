'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { BeforeInstallPromptEvent } from '@/types';
import { isBeforeInstallPromptEvent } from '@/lib/utils';

const DISMISSED_KEY = 'mumbi-install-banner-dismissed';

export type ManualInstallHint = 'ios' | 'browser' | null;

interface PwaContextValue {
  canNativeInstall: boolean;
  isInstalled: boolean;
  bannerVisible: boolean;
  manualHint: ManualInstallHint;
  triggerNativeInstall: () => Promise<void>;
  handleBannerInstall: () => Promise<void>;
  dismissBanner: () => void;
}

const PwaContext = createContext<PwaContextValue | null>(null);

function readDismissedFlag(): boolean {
  try {
    return window.localStorage.getItem(DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeDismissedFlag(): void {
  try {
    window.localStorage.setItem(DISMISSED_KEY, 'true');
  } catch {
    // Ignore storage errors in restricted/private browsing contexts
  }
}

function detectStandalone(): boolean {
  if (window.matchMedia('(display-mode: standalone)').matches) return true;
  if (
    'standalone' in window.navigator &&
    (window.navigator as Navigator & { standalone?: boolean }).standalone ===
      true
  ) {
    return true;
  }
  return false;
}

function detectIos(): boolean {
  const ua = window.navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (window.navigator.platform === 'MacIntel' &&
      window.navigator.maxTouchPoints > 1)
  );
}

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [manualHint, setManualHint] = useState<ManualInstallHint>(null);

  useEffect(() => {
    // Register lightweight offline-fallback service worker in production
    if (
      process.env.NODE_ENV === 'production' &&
      'serviceWorker' in window.navigator
    ) {
      window.navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // Non-fatal if service worker registration is blocked
        });
    }

    const alreadyStandalone = detectStandalone();
    const dismissed = readDismissedFlag();
    const compactViewportQuery = window.matchMedia('(max-width: 768px)');

    const onBeforeInstallPrompt = (event: Event) => {
      if (!isBeforeInstallPromptEvent(event)) return;
      event.preventDefault();
      setDeferredPrompt(event);
      setManualHint(null);
      if (!readDismissedFlag() && !detectStandalone()) {
        setBannerVisible(true);
      }
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setBannerVisible(false);
      setManualHint(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (alreadyStandalone) {
      timer = setTimeout(() => setIsInstalled(true), 0);
    } else if (!dismissed && compactViewportQuery.matches) {
      timer = setTimeout(() => {
        if (!readDismissedFlag() && !detectStandalone()) {
          setBannerVisible(true);
        }
      }, 2500);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const dismissBanner = useCallback(() => {
    writeDismissedFlag();
    setBannerVisible(false);
    setManualHint(null);
  }, []);

  const triggerNativeInstall = useCallback(async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    if (choice.outcome === 'accepted') {
      setIsInstalled(true);
      setBannerVisible(false);
    }
  }, [deferredPrompt]);

  const handleBannerInstall = useCallback(async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      } else {
        writeDismissedFlag();
      }
      setBannerVisible(false);
      setManualHint(null);
      return;
    }

    // Fallback instructions for browsers without beforeinstallprompt (e.g. iOS Safari)
    setManualHint(detectIos() ? 'ios' : 'browser');
  }, [deferredPrompt]);

  const value = useMemo<PwaContextValue>(
    () => ({
      canNativeInstall: !!deferredPrompt && !isInstalled,
      isInstalled,
      bannerVisible: bannerVisible && !isInstalled,
      manualHint,
      triggerNativeInstall,
      handleBannerInstall,
      dismissBanner,
    }),
    [
      deferredPrompt,
      isInstalled,
      bannerVisible,
      manualHint,
      triggerNativeInstall,
      handleBannerInstall,
      dismissBanner,
    ]
  );

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
}

export function usePwa(): PwaContextValue {
  const ctx = useContext(PwaContext);
  if (!ctx) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return ctx;
}
