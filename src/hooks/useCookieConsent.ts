import { useState, useEffect, useCallback } from 'react';

export interface CookiePreferences {
  essential: boolean; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'cookie_consent';
const PREFERENCES_KEY = 'cookie_preferences';

const defaultPreferences: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export function useCookieConsent() {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    const savedPreferences = localStorage.getItem(PREFERENCES_KEY);

    if (consent === 'true' && savedPreferences) {
      setHasConsented(true);
      setPreferences(JSON.parse(savedPreferences));
      setShowBanner(false);
    } else {
      setHasConsented(false);
      setShowBanner(true);
    }
  }, []);

  const acceptAll = useCallback(() => {
    const allAccepted: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem(CONSENT_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const acceptSelected = useCallback((selected: CookiePreferences) => {
    const finalPreferences = {
      ...selected,
      essential: true, // Always required
    };
    localStorage.setItem(CONSENT_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(finalPreferences));
    setPreferences(finalPreferences);
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const rejectAll = useCallback(() => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem(CONSENT_KEY, 'true');
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(essentialOnly));
    setPreferences(essentialOnly);
    setHasConsented(true);
    setShowBanner(false);
  }, []);

  const openSettings = useCallback(() => {
    setShowBanner(true);
  }, []);

  return {
    hasConsented,
    preferences,
    showBanner,
    acceptAll,
    acceptSelected,
    rejectAll,
    openSettings,
  };
}
