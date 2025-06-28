'use client';

import * as React from 'react';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { PersonalityHeader } from './PersonalityHeader';
import { PersonalitySidebar } from './PersonalitySidebar';
import { CheckCircle, XCircle } from 'lucide-react';

// --- DATA STRUCTURES --- //
interface TitledBlock { title: string; }
interface ListItem { title: string; text: string; }

interface ContentItem {
    type: 'paragraph' | 'subheading' | 'illustration' | 'pullquote';
    text?: string;
    src?: string;
}

interface ContentBlock extends TitledBlock {
    quote?: string;
    content?: ContentItem[];
    text?: string;
}

interface StrengthsWeaknessesBlock extends TitledBlock {
    strengths: { title: string; list: ListItem[]; };
    weaknesses: { title: string; list: ListItem[]; };
}

interface PersonalityData {
  name?: string;
  title?: string;
  subtitle?: string;
  introduction?: ContentBlock;
  strengths_weaknesses?: StrengthsWeaknessesBlock;
  romantic_relationships?: ContentBlock;
  friendships?: ContentBlock;
  parenthood?: ContentBlock;
  career_paths?: ContentBlock;
  workplace_habits?: ContentBlock;
  conclusion?: ContentBlock;
}

// --- RENDERER COMPONENTS --- //
const ContentItemRenderer: React.FC<{ item: ContentItem }> = ({ item }) => {
    const [imageError, setImageError] = React.useState(false);

    if (imageError) {
        return null; // Don't render anything if the image fails to load
    }

    switch (item.type) {
        case 'paragraph':
            return <p className="mb-4">{item.text}</p>;
        case 'subheading':
            return <h3 className="text-2xl font-bold mt-10 mb-4 text-gray-800 dark:text-gray-200">{item.text}</h3>;
        case 'illustration':
            return (
                <div className="my-8 relative h-56 w-full">
                    <Image 
                        src={item.src!} 
                        alt={item.src!} 
                        layout="fill" 
                        objectFit="contain"
                        onError={() => setImageError(true)}
                    />
                </div>
            );
        case 'pullquote':
            return (
                <blockquote className="my-6 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-300 dark:border-gray-600 rounded-r-lg">
                    <p className="italic text-gray-600 dark:text-gray-400">"{item.text}"</p>
                </blockquote>
            );
        default:
            return null;
    }
};

// --- MAIN COMPONENT --- //
interface PersonalityDetailProps {
  type: string;
}

const PersonalityDetail: React.FC<PersonalityDetailProps> = ({ type }) => {
  const locale = useLocale();
  const [data, setData] = React.useState<PersonalityData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/personalities/${type}?locale=${locale}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const jsonData: PersonalityData = await response.json();
        setData(jsonData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [type, locale]);

  const renderStandardSection = (section: ContentBlock) => {
    if (section.content) {
        return (
            <>
              {section.quote && (
                <blockquote className="my-6 p-4 border-l-4 border-purple-400 bg-purple-50 dark:bg-gray-800 rounded-r-lg">
                  <p className="text-xl italic text-gray-700 dark:text-gray-300">"{section.quote}"</p>
                </blockquote>
              )}
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                {section.content.map((item, index) => <ContentItemRenderer key={index} item={item} />)}
              </div>
            </>
        );
    }
    
    if (section.text) {
        let mainText = section.text;
        let introQuote = section.quote;
        
        const pascalQuote = "Thought constitutes the greatness of man. Man is a reed, the feeblest thing in nature, but he is a thinking reed. - Blaise Pascal";
        if (mainText.includes(pascalQuote)) {
            introQuote = pascalQuote;
            mainText = mainText.replace(pascalQuote, '').trim();
        }

        const paragraphs = mainText.split('\n').filter(p => p.trim() !== '').map((p, index) => (
            <p key={index}>{p}</p>
        ));

        return (
            <>
              {introQuote && (
                <blockquote className="my-6 p-4 border-l-4 border-purple-400 bg-purple-50 dark:bg-gray-800 rounded-r-lg">
                  <p className="text-xl italic text-gray-700 dark:text-gray-300">"{introQuote}"</p>
                </blockquote>
              )}
              <div className="prose prose-lg max-w-none dark:prose-invert text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  {paragraphs}
              </div>
            </>
        );
    }

    return null;
  };

  const renderStrengthsWeaknessesSection = (section: StrengthsWeaknessesBlock) => (
    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-green-600 mb-6 flex items-center">
          <CheckCircle className="w-8 h-8 mr-3 flex-shrink-0" />
          <span>{section.strengths.title}</span>
        </h3>
        <ul className="space-y-6">
          {section.strengths.list.map(item => (
            <li key={item.title}>
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-200 mb-1">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-red-600 mb-6 flex items-center">
          <XCircle className="w-8 h-8 mr-3 flex-shrink-0" />
          <span>{section.weaknesses.title}</span>
        </h3>
        <ul className="space-y-6">
          {section.weaknesses.list.map(item => (
            <li key={item.title}>
              <h4 className="font-bold text-lg text-gray-900 dark:text-gray-200 mb-1">{item.title}</h4>
              <p className="text-gray-600 dark:text-gray-400">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center py-20">No data found for this personality type.</div>;

  // Manually define sections to ensure order and type safety
  const finalSections = [
    { id: 'introduction', data: data.introduction },
    { id: 'strengths_weaknesses', data: data.strengths_weaknesses },
    { id: 'romantic_relationships', data: data.romantic_relationships },
    { id: 'friendships', data: data.friendships },
    { id: 'parenthood', data: data.parenthood },
    { id: 'career_paths', data: data.career_paths },
    { id: 'workplace_habits', data: data.workplace_habits },
    { id: 'conclusion', data: data.conclusion },
  ].filter(sec => sec.data);


  return (
    <article>
      <PersonalityHeader type={type} name={data.name || ''} title={data.title || ''} subtitle={data.subtitle || ''} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <PersonalitySidebar sections={finalSections.map(s => ({ id: s.id, title: s.data!.title }))} />
            </div>
          </aside>
          <main className="lg:col-span-9">
            {finalSections.map(section => {
              if (!section.data) return null;
              return (
                <section key={section.id} id={section.id} className="mb-12 scroll-mt-24">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-l-4 border-purple-500 pl-4">
                    {section.data.title}
                  </h2>
                  {section.id === 'strengths_weaknesses'
                    ? renderStrengthsWeaknessesSection(section.data as StrengthsWeaknessesBlock)
                    : renderStandardSection(section.data as ContentBlock)
                  }
                </section>
              );
            })}
          </main>
        </div>
      </div>
    </article>
  );
};

export default PersonalityDetail;