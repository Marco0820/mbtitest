import { setRequestLocale, getMessages } from 'next-intl/server';
import { createTranslator } from 'next-intl';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Community } from '@/components/home/Community';
import { PersonalityTypes } from '@/components/home/PersonalityTypes';
import { routing } from '@/routing';
import type { Metadata } from 'next';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <Features />
      <Community />
      <PersonalityTypes />
    </main>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params;
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti16personalities.online';
  const canonicalUrl = `${siteUrl}/${locale}`;
  
  return {
    title: {
      default: t('Layout.title'),
      template: `%s | ${t('Layout.title')}`,
    },
    description: t('Layout.description'),
    keywords: locale === 'zh-CN' ? [
      // 核心MBTI关键词
      'MBTI测试', 'MBTI性格测试', '免费MBTI测试', '16型人格', '16personalities',
      'Myers-Briggs', '迈尔斯布里格斯', '性格类型测试', '人格测试',
      
      // 长尾关键词
      'MBTI职业规划', 'MBTI恋爱配对', 'MBTI人际关系', 'MBTI性格分析',
      '哪种MBTI类型适合我', '如何知道自己的MBTI类型', 'MBTI测试准确吗',
      
      // 具体类型关键词
      'INTJ建筑师', 'ENFP竞选者', 'INFJ倡导者', 'ESTP企业家',
      'ISFJ守护者', 'ENTP辩论家', 'INFP调停者', 'ESTJ执行官',
      'ISTP鉴赏家', 'ENFJ主人公', 'INTP逻辑学家', 'ESFP表演者',
      'ISTJ物流师', 'ENTJ指挥官', 'ISFP冒险家', 'ESFJ领事',
      
      // 社交和应用场景
      '性格测试社交', 'MBTI交友', 'MBTI约会', '同城找人', '性格匹配',
      '心理测试', '职业性格测试', '团队协作测试', '婚恋匹配',
      
      // 心理学相关
      '心理学测试', '认知功能', '性格特征', '心理类型学', '人格心理学',
      '内向外向测试', '直觉感觉测试', '思维情感测试', '判断感知测试'
    ] : [
      // Core MBTI keywords
      'MBTI test', 'MBTI personality test', 'free MBTI test', '16 personalities', '16personalities',
      'Myers-Briggs', 'personality type test', 'personality test',
      
      // Long-tail keywords
      'MBTI career planning', 'MBTI relationships', 'MBTI personality analysis',
      'which MBTI type am I', 'how to know my MBTI type', 'is MBTI test accurate',
      
      // Specific type keywords
      'INTJ architect', 'ENFP campaigner', 'INFJ advocate', 'ESTP entrepreneur',
      'ISFJ protector', 'ENTP debater', 'INFP mediator', 'ESTJ executive',
      'ISTP virtuoso', 'ENFJ protagonist', 'INTP logician', 'ESFP entertainer',
      'ISTJ logistician', 'ENTJ commander', 'ISFP adventurer', 'ESFJ consul',
      
      // Social and application scenarios
      'personality test social', 'MBTI friends', 'MBTI dating', 'personality matching',
      'psychology test', 'career personality test', 'team collaboration test',
      
      // Psychology related
      'psychology test', 'cognitive functions', 'personality traits', 'personality psychology',
      'introversion extraversion test', 'intuition sensing test', 'thinking feeling test'
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en-US': `${siteUrl}/en`,
        'zh-CN': `${siteUrl}/zh-CN`,
        'ja': `${siteUrl}/ja`,
        'ko': `${siteUrl}/ko`,
        'es': `${siteUrl}/es`,
        'fr': `${siteUrl}/fr`,
        'de': `${siteUrl}/de`,
        'ru': `${siteUrl}/ru`,
        'pt': `${siteUrl}/pt`,
        'ar': `${siteUrl}/ar`,
        'hi': `${siteUrl}/hi`,
        'it': `${siteUrl}/it`,
        'th': `${siteUrl}/th`,
        'vi': `${siteUrl}/vi`,
        'tr': `${siteUrl}/tr`,
        'pl': `${siteUrl}/pl`,
        'nl': `${siteUrl}/nl`,
        'sv': `${siteUrl}/sv`,
        'id': `${siteUrl}/id`,
        'ur': `${siteUrl}/ur`,
        'fa': `${siteUrl}/fa`,
        'zh-TW': `${siteUrl}/zh-TW`,
      },
    },
    openGraph: {
      title: t('Layout.title'),
      description: t('Layout.description'),
      url: canonicalUrl,
      siteName: 'MBTI TEST - 16型人格专业测评',
      images: [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'MBTI性格测试 - 16型人格测评',
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('Layout.title'),
      description: t('Layout.description'),
      images: [`${siteUrl}/logo.png`],
    },
    icons: {
      icon: '/logo.png',
    },
  };
}