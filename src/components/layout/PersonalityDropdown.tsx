'use client';

import Link from 'next/link';
import { useTranslations, useLocale, useMessages } from 'next-intl';

interface PersonalityDropdownProps {
  isOpen: boolean;
  onMouseEnter: () => void;
}

const categoryStyles = {
  analysts: {
    bg: 'hover:bg-purple-50',
    text: 'text-purple-800',
    buttonBg: 'bg-purple-100 hover:bg-purple-200 text-purple-800',
  },
  diplomats: {
    bg: 'hover:bg-green-50',
    text: 'text-green-800',
    buttonBg: 'bg-green-100 hover:bg-green-200 text-green-800',
  },
  sentinels: {
    bg: 'hover:bg-blue-50',
    text: 'text-blue-800',
    buttonBg: 'bg-blue-100 hover:bg-blue-200 text-blue-800',
  },
  explorers: {
    bg: 'hover:bg-orange-50',
    text: 'text-orange-800',
    buttonBg: 'bg-orange-100 hover:bg-orange-200 text-orange-800',
  },
};

export function PersonalityDropdown({ isOpen, onMouseEnter }: PersonalityDropdownProps) {
  const t = useTranslations('personalities');
  const locale = useLocale();
  const messages = useMessages();
  const personalityMessages = (messages.personalities as any) || {};

  const personalityTypes = {
    analysts: ['intj', 'intp', 'entj', 'entp'],
    diplomats: ['infj', 'infp', 'enfj', 'enfp'],
    sentinels: ['istj', 'isfj', 'estj', 'esfj'],
    explorers: ['istp', 'isfp', 'estp', 'esfp']
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed top-16 left-1/2 -translate-x-1/2 mt-2 w-screen max-w-6xl"
      onMouseEnter={onMouseEnter}
    >
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {Object.entries(personalityTypes).map(([category, types]) => (
            <div key={category}>
              <h3 className={`font-bold text-lg mb-2 ${categoryStyles[category as keyof typeof categoryStyles].text}`}>
                {t(category)}
              </h3>
              <p className="text-sm text-gray-600 mb-4 h-24">
                {t(`${category}_description`)}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {types
                  .filter(type => personalityMessages[type] && personalityMessages[type].name)
                  .map((type) => (
                  <Link
                    key={type}
                    href={`/${locale}/personalities/${type}`}
                    className={`min-h-16 px-2 py-4 text-sm font-medium rounded-xl transition-colors text-center flex items-center justify-center ${categoryStyles[category as keyof typeof categoryStyles].buttonBg}`}
                  >
                    {t(`${type}.name`)} ({type.toUpperCase()})
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}