'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Settings, Cookie } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCookieConsent } from './CookieBanner';

export function CookieManager() {
  const t = useTranslations('cookies');
  const [showManager, setShowManager] = useState(false);
  const { hasConsent, preferences } = useCookieConsent();

  // Only show the manager button if user has given consent
  if (!hasConsent) return null;

  const openCookieSettings = () => {
    // Remove the existing consent to show the banner again
    localStorage.removeItem('mbti-cookie-consent');
    // Reload the page to show the cookie banner
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        onClick={openCookieSettings}
        variant="outline"
        size="sm"
        className="bg-white shadow-lg border-gray-300 hover:bg-gray-50"
        title={t('manage_preferences')}
      >
        <Cookie className="w-4 h-4 mr-2" />
        <Settings className="w-4 h-4" />
      </Button>
    </div>
  );
}
