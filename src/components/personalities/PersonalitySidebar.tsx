'use client';

import * as React from 'react';
import { ChevronRight } from 'lucide-react';

interface Section {
  id: string;
  title: string;
}

interface PersonalitySidebarProps {
  sections: Section[];
}

export const PersonalitySidebar: React.FC<PersonalitySidebarProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' } // Adjust rootMargin to better detect active section
    );

    const elements = sections.map(section => document.getElementById(section.id)).filter(Boolean);
    elements.forEach((el) => observer.observe(el!));

    return () => {
      elements.forEach((el) => observer.unobserve(el!));
    };
  }, [sections]);

  if (sections.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-4 uppercase tracking-wide">Explore This Type</h3>
      <nav>
        <ul className="space-y-1 border-l border-gray-200 dark:border-gray-700">
          {sections.map(section => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={`-ml-px border-l-2 flex justify-between items-center px-4 py-2 font-medium transition-colors duration-150 text-sm ${
                  activeSection === section.id
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-400 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <span>{section.title}</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}; 