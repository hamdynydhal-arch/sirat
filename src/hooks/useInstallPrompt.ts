import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sirat_install_dismissed_until';
const DISMISS_DAYS = 7;

type PromptState = 'hidden' | 'android' | 'ios';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function isIOS(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isInStandaloneMode(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as Navigator & { standalone: boolean }).standalone === true)
  );
}

function isDismissed(): boolean {
  const until = localStorage.getItem(STORAGE_KEY);
  if (!until) return false;
  return Date.now() < Number(until);
}

function saveDismissal(): void {
  const until = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(STORAGE_KEY, String(until));
}

export function useInstallPrompt() {
  const [promptState, setPromptState] = useState<PromptState>('hidden');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Already installed or dismissed recently — do nothing
    if (isInStandaloneMode() || isDismissed()) return;

    // iOS: no beforeinstallprompt, show manual instructions instead
    if (isIOS()) {
      // Small delay so the page settles before showing the prompt
      const t = setTimeout(() => setPromptState('ios'), 1500);
      return () => clearTimeout(t);
    }

    // Android / Chrome / Edge: listen for the native event
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setPromptState('android');
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setPromptState('hidden');
    } else {
      dismiss();
    }
    setDeferredPrompt(null);
  };

  const dismiss = () => {
    saveDismissal();
    setPromptState('hidden');
  };

  return { promptState, install, dismiss };
}
