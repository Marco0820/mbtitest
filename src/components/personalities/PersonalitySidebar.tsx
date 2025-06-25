'use client';

import { useTranslations } from 'next-intl';

interface PersonalitySidebarProps {
  type: string;
}

const sections = [
  'introduction',
  'strengths_weaknesses',
  'romantic_relationships',
  'friendships',
  'parenthood',
  'career_paths',
  'workplace_habits',
  'conclusion',
];

export const PersonalitySidebar: React.FC<PersonalitySidebarProps> = ({ type }) => {
  const t = useTranslations('personalities');

  const availableSections = sections.map(section => {
    const titleKey = `${type}.${section}_title`;
    const renderedTitle = t(titleKey);

    // Don't show a link if the section title doesn't exist for this personality
    if (renderedTitle === titleKey) {
      return null;
    }
    return {
      id: section,
      title: renderedTitle,
    };
  }).filter(Boolean) as { id: string, title: string }[];

  // Don't render sidebar if there are no sections
  if (availableSections.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-28 h-[calc(100vh-7rem)]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wider">On this page</h3>
      <nav>
        <ul className="space-y-3">
          {availableSections.map(section => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-gray-500 hover:text-gray-900 font-medium transition-colors duration-200 block text-sm"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}; 