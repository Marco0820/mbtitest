'use client';

import { useTranslations } from 'next-intl';

interface PersonalityHeaderProps {
  type: string;
}

const typeColorMapping: { [key: string]: string } = {
  intj: 'purple', intp: 'purple', entj: 'purple', entp: 'purple',
  infj: 'green', infp: 'green', enfj: 'green', enfp: 'green',
  istj: 'blue', isfj: 'blue', estj: 'blue', esfj: 'blue',
  istp: 'orange', isfp: 'orange', estp: 'orange', esfp: 'orange',
};

const colorStyles: { [key: string]: { bg: string; text: string } } = {
  purple: { bg: 'bg-purple-600', text: 'text-purple-100' },
  green: { bg: 'bg-green-600', text: 'text-green-100' },
  blue: { bg: 'bg-blue-600', text: 'text-blue-100' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-100' },
};

export const PersonalityHeader: React.FC<PersonalityHeaderProps> = ({ type }) => {
  const t = useTranslations('personalities');
  const colorKey = typeColorMapping[type] || 'purple';
  const styles = colorStyles[colorKey];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          {t(`${type}.title`)}
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-purple-100 max-w-3xl mx-auto">
          {t(`${type}.subtitle`)}
        </p>
      </div>
    </div>
  );
}; 