'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Cookie, Settings, X, Check, Shield, BarChart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = 'mbti-cookie-consent';
const COOKIE_PREFERENCES_KEY = 'mbti-cookie-preferences';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const locale = useLocale();
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!hasConsent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    savePreferences(onlyNecessary);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
    setShowBanner(false);
    setShowDetails(false);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    
          // Apply cookie settings
      if (typeof window !== 'undefined') {
        // Google Analytics
        if (prefs.analytics && (window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: 'granted'
          });
        } else if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            analytics_storage: 'denied'
          });
        }
        
        // Marketing cookies
        if (prefs.marketing && (window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            ad_storage: 'granted'
          });
        } else if ((window as any).gtag) {
          (window as any).gtag('consent', 'update', {
            ad_storage: 'denied'
          });
        }
      }
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  const cookieTypes = [
    {
      key: 'necessary' as keyof CookiePreferences,
      icon: <Shield className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      required: true,
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      icon: <BarChart className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      required: false,
    },
    {
      key: 'functional' as keyof CookiePreferences,
      icon: <Settings className="w-5 h-5" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      required: false,
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      icon: <Users className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      required: false,
    },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-25 z-40" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
        <div className="max-w-7xl mx-auto p-6">
          {!showDetails ? (
            /* Simple Banner */
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <Cookie className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {t('banner_title')}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {t('banner_description')}
                    <button
                      onClick={() => setShowDetails(true)}
                      className="text-blue-600 hover:text-blue-700 underline ml-1"
                    >
                      {t('learn_more')}
                    </button>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="flex-1 lg:flex-initial"
                >
                  {t('reject_all')}
                </Button>
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="outline"
                  className="flex-1 lg:flex-initial"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  {t('manage_preferences')}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 lg:flex-initial bg-blue-600 hover:bg-blue-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t('accept_all')}
                </Button>
              </div>
            </div>
          ) : (
            /* Detailed Settings */
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {t('preferences_title')}
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('preferences_description')}
              </p>

              <div className="space-y-4 mb-6">
                {cookieTypes.map((type) => (
                  <div
                    key={type.key}
                    className="border border-gray-200 dark:border-gray-600 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${type.bgColor}`}>
                          <div className={type.color}>{type.icon}</div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                              {t(`${type.key}_title`)}
                            </h4>
                            {type.required && (
                              <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                {t('required')}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {t(`${type.key}_description`)}
                          </p>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            <strong>{t('examples')}:</strong> {t(`${type.key}_examples`)}
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences[type.key]}
                            onChange={() => togglePreference(type.key)}
                            disabled={type.required}
                            className="sr-only peer"
                          />
                          <div className={`
                            w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer 
                            dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white 
                            after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                            after:bg-white after:border-gray-300 after:border after:rounded-full 
                            after:h-5 after:w-5 after:transition-all dark:border-gray-600 
                            peer-checked:bg-blue-600 ${type.required ? 'opacity-50 cursor-not-allowed' : ''}
                          `} />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  className="flex-1"
                >
                  {t('reject_all')}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Check className="w-4 h-4 mr-2" />
                  {t('save_preferences')}
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {t('accept_all')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Hook to check if cookies are accepted
export function useCookieConsent() {
  const [hasConsent, setHasConsent] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const savedPrefs = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    
    if (consent) {
      setHasConsent(true);
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
      }
    }
  }, []);

  return { hasConsent, preferences };
}
