'use client';

import Link from 'next/link';
import { useTranslations, useLocale, useMessages } from 'next-intl';

export function PersonalityTypes() {
  const t = useTranslations('personalities');
  const locale = useLocale();
  const messages = useMessages();

  const personalityMessages = (messages.personalities as any) || {};

  const groupsConfig = [
    {
      groupKey: 'analysts',
      color: 'purple',
      types: ['intj', 'intp', 'entj', 'entp'],
    },
    {
      groupKey: 'diplomats',
      color: 'green',
      types: ['infj', 'infp', 'enfj', 'enfp'],
    },
    {
      groupKey: 'sentinels',
      color: 'blue',
      types: ['istj', 'isfj', 'estj', 'esfj'],
    },
    {
      groupKey: 'explorers',
      color: 'orange',
      types: ['istp', 'isfp', 'estp', 'esfp'],
    },
  ];

  const personalityGroups = groupsConfig.map(group => {
    const types = group.types
      .filter(code => personalityMessages[code] && personalityMessages[code].name)
      .map(code => ({ code, name: t(`${code}.name`) }));
    
    if (types.length === 0) {
      return null;
    }

    return {
      ...group,
      title: t(group.groupKey),
      description: t(`${group.groupKey}_description`),
      types,
    };
  }).filter(Boolean);

  const colorStyles = {
    purple: {
      text: 'text-purple-700',
      bg: 'bg-purple-100/50',
      buttonBg: 'bg-purple-200/50 hover:bg-purple-200',
      buttonText: 'text-purple-800'
    },
    green: {
      text: 'text-green-700',
      bg: 'bg-green-100/50',
      buttonBg: 'bg-green-200/50 hover:bg-green-200',
      buttonText: 'text-green-800'
    },
    blue: {
      text: 'text-blue-700',
      bg: 'bg-blue-100/50',
      buttonBg: 'bg-blue-200/50 hover:bg-blue-200',
      buttonText: 'text-blue-800'
    },
    orange: {
      text: 'text-orange-700',
      bg: 'bg-orange-100/50',
      buttonBg: 'bg-orange-200/50 hover:bg-orange-200',
      buttonText: 'text-orange-800'
    },
  };


  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {personalityGroups.map((group) => {
              if (!group) return null;
              const styles = colorStyles[group.color as keyof typeof colorStyles] || colorStyles.purple;
              return (
                <div key={group.groupKey} className={`p-6 rounded-xl ${styles.bg} flex flex-col min-h-[380px]`}>
                  <h3 className={`text-2xl font-bold ${styles.text} mb-3`}>
                    {group.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {group.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    {group.types.map((type) => (
                      <Link
                        key={type.code}
                        href={`/${locale}/personalities/${type.code}`}
                        className={`block p-4 rounded-xl text-center transition-colors duration-200 ${styles.buttonBg}`}
                      >
                        <span className={`font-bold text-sm ${styles.buttonText}`}>
                          {type.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({type.code.toUpperCase()})
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}