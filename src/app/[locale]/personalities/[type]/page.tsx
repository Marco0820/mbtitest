import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { createTranslator } from 'next-intl';
import PersonalityDetail from '@/components/personalities/PersonalityDetail';
import PersonalityDetailRTL from '@/components/personalities/PersonalityDetailRTL';
import { routing } from '@/routing';

const validTypes = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp'
];

interface PersonalityPageProps {
  params: {
    locale: string;
    type: string;
  };
}

export async function generateMetadata({ params: { locale, type } }: PersonalityPageProps) {
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-website.com';

  const personalityName = t(`personalities.${type.toLowerCase()}.name`);
  const pageTitle = `${type.toUpperCase()} - ${personalityName} | 16 Personalities | MBTI Test`;
  const pageDescription = `Learn all about the ${type.toUpperCase()} personality type, also known as the ${personalityName}. Discover their strengths, weaknesses, career paths, and more.`;

  const canonicalUrl = `${siteUrl}/${locale}/personalities/${type.toLowerCase()}`;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${siteUrl}/en/personalities/${type.toLowerCase()}`,
        'zh-CN': `${siteUrl}/zh-CN/personalities/${type.toLowerCase()}`,
      },
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: canonicalUrl,
      siteName: 'MBTI TEST',
      images: [
        {
          url: `${siteUrl}/og-image-${type.toLowerCase()}.png`, // You should create these images
          width: 800,
          height: 600,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [`${siteUrl}/og-image-${type.toLowerCase()}.png`], // You should create these images
    },
  };
}

export function generateStaticParams() {
  const params: { type: string; locale: string }[] = [];
  routing.locales.forEach((locale) => {
    validTypes.forEach((type: string) => {
      params.push({ locale, type });
    });
  });
  return params;
}

export default function PersonalityPage({ params }: PersonalityPageProps) {
  setRequestLocale(params.locale);
  const { type, locale } = params;

  if (!validTypes.includes(type.toLowerCase())) {
    notFound();
  }

  const isRTL = ['ar'].includes(locale);

  return (
    <main>
      {isRTL ? (
        <PersonalityDetailRTL type={type.toLowerCase()} locale={locale} />
      ) : (
        <PersonalityDetail type={type.toLowerCase()} locale={locale} />
      )}
    </main>
  );
}