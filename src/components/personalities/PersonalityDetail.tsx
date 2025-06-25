'use client';

import * as React from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { PersonalityHeader } from './PersonalityHeader';
import { CheckCircle, XCircle } from 'lucide-react';
import { PersonalitySidebar } from './PersonalitySidebar';

interface PersonalityDetailProps {
  type: string;
}

const PersonalityDetail: React.FC<PersonalityDetailProps> = ({ type }) => {
  const t = useTranslations('personalities');
  const messages = useMessages();
  
  const personalityMessages = (messages.personalities as any)?.[type] || {};

  // Helper to render sections with a title and multiple paragraphs
  const renderContentSection = (sectionName: string) => {
    const sectionTitleKey = `${type}.${sectionName}_title`;
    const sectionTitle = t(sectionTitleKey);

    if (sectionTitle === sectionTitleKey) return null;

    const paragraphs = [];

    // First, check for a single, non-numbered text entry.
    const singleTextKey = `${sectionName}_text`;
    if (personalityMessages[singleTextKey]) {
      paragraphs.push(<p key={0}>{t(`${type}.${singleTextKey}`)}</p>);
    }

    // Then, check for numbered text entries.
    const textKeys = Object.keys(personalityMessages)
      .filter(k => k.startsWith(`${sectionName}_text_`))
      .sort((a, b) => {
        const numA = parseInt(a.split('_').pop() || '0', 10);
        const numB = parseInt(b.split('_').pop() || '0', 10);
        return numA - numB;
      });

    for (const key of textKeys) {
      paragraphs.push(<p key={key}>{t(`${type}.${key}`)}</p>);
    }
    
    if (paragraphs.length === 0) return null;

    return (
      <div id={sectionName} className="mb-12">
        <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white border-l-4 border-purple-500 pl-4">
          {sectionTitle}
        </h3>
        <div className="space-y-4">{paragraphs}</div>
      </div>
    );
  };

  // Helper to render list-based sections like Strengths & Weaknesses
  const renderList = (listName: 'strength' | 'weakness') => {
    const listKeys = Object.keys(personalityMessages)
      .filter(k => k.startsWith(`${listName}_`) && k.endsWith('_title'))
      .sort((a, b) => {
        const numA = parseInt(a.replace(`${listName}_`, '').replace('_title', ''));
        const numB = parseInt(b.replace(`${listName}_`, '').replace('_title', ''));
        return numA - numB;
      });

    if (listKeys.length === 0) return null;

    return (
      <ul className="space-y-6">
        {listKeys.map(titleKey => {
          const textKey = titleKey.replace('_title', '_text');
          const itemTitle = t(`${type}.${titleKey}`);
          const itemText = personalityMessages[textKey] ? t(`${type}.${textKey}`) : '';
          return (
            <li key={titleKey}>
              <h4 className="font-bold text-lg text-gray-900 mb-1">{itemTitle}</h4>
              <p className="text-gray-600">{itemText}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  const strengthsWeaknessesTitleKey = `${type}.strengths_weaknesses_title`;
  const strengthsWeaknessesTitle = t.rich(strengthsWeaknessesTitleKey);
  const showStrengthsWeaknesses = strengthsWeaknessesTitle?.toString() !== strengthsWeaknessesTitleKey;

  return (
    <article>
      <PersonalityHeader type={type} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-x-12">
          <div className="hidden lg:block lg:col-span-1">
            <PersonalitySidebar type={type} />
          </div>

          <main className="lg:col-span-3">
            {renderContentSection('introduction')}
            
            {showStrengthsWeaknesses && (
              <section id="strengths_weaknesses" className="mb-12 scroll-mt-28">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b-2 border-gray-200 pb-2">{strengthsWeaknessesTitle}</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center">
                      <CheckCircle className="w-8 h-8 mr-3" />
                      {t(`${type}.strengths_title`)}
                    </h3>
                    {renderList('strength')}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center">
                      <XCircle className="w-8 h-8 mr-3" />
                      {t(`${type}.weaknesses_title`)}
                    </h3>
                    {renderList('weakness')}
                  </div>
                </div>
              </section>
            )}

            {renderContentSection('romantic_relationships')}
            {renderContentSection('friendships')}
            {renderContentSection('parenthood')}
            {renderContentSection('career_paths')}
            {renderContentSection('workplace_habits')}
            {renderContentSection('conclusion')}
          </main>
        </div>
    </div>
    </article>
  );
};

export default PersonalityDetail;