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

const DISMISS_UNTIL_KEY = 'mumbi-install-banner-dismiss-until';
const LEGACY_DISMISSED_KEY = 'mumbi-install-banner-dismissed';
const DISMISS_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 30_000;
const SCROLL_PX_THRESHOLD = 480;

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
    const untilRaw = window.localStorage.getItem(DISMISS_UNTIL_KEY);
    if (untilRaw) {
      const until = Number(untilRaw);
      if (Number.isFinite(until) && Date.now() < until) return true;
    }

    if (window.localStorage.getItem(LEGACY_DISMISSED_KEY) === 'true') {
      const until = Date.now() + DISMISS_MS;
      window.localStorage.setItem(DISMISS_UNTIL_KEY, String(until));
      window.localStorage.removeItem(LEGACY_DISMISSED_KEY);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

function writeDismissedFlag(): void {
  try {
    window.localStorage.setItem(
      DISMISS_UNTIL_KEY,
      String(Date.now() + DISMISS_MS)
    );
    window.localStorage.removeItem(LEGACY_DISMISSED_KEY);
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

function hasScrolledMeaningfully(): boolean {
  const y = window.scrollY;
  if (y >= SCROLL_PX_THRESHOLD) return true;
  if (y >= window.innerHeight * 0.75) return true;
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;
  return scrollable > 0 && y / scrollable >= 0.35;
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
    let revealed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const revealBanner = () => {
      if (revealed) return;
      if (readDismissedFlag() || detectStandalone()) return;
      revealed = true;
      setBannerVisible(true);
      window.removeEventListener('scroll', onScroll);
      if (timer) clearTimeout(timer);
    };

    const onScroll = () => {
      if (hasScrolledMeaningfully()) revealBanner();
    };

    const onBeforeInstallPrompt = (event: Event) => {
      if (!isBeforeInstallPromptEvent(event)) return;
      event.preventDefault();
      setDeferredPrompt(event);
      setManualHint(null);
    };

    const onAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setBannerVisible(false);
      setManualHint(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
    window.addEventListener('appinstalled', onAppInstalled);

    const compactViewport = window.matchMedia('(max-width: 768px)');

    if (alreadyStandalone) {
      timer = setTimeout(() => setIsInstalled(true), 0);
    } else if (!readDismissedFlag() && compactViewport.matches) {
      timer = setTimeout(revealBanner, SHOW_DELAY_MS);
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt);
      window.removeEventListener('appinstalled', onAppInstalled);
      window.removeEventListener('scroll', onScroll);
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
