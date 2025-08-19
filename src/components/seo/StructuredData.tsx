'use client';

import { useLocale } from 'next-intl';

interface StructuredDataProps {
  type: 'website' | 'article' | 'faq' | 'organization';
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const locale = useLocale();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mbti16personalities.online';
  
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          '@type': 'WebSite',
          name: locale === 'zh-CN' ? 'MBTI TEST - 16型人格专业测评' : 'MBTI TEST - Professional 16 Personality Assessment',
          alternateName: locale === 'zh-CN' ? ['MBTI测试', '16型人格测试', '性格测试'] : ['MBTI Test', '16 Personality Test', 'Personality Test'],
          url: siteUrl,
          description: locale === 'zh-CN' ? '专业的MBTI性格测试平台，基于权威心理学理论，提供16型人格深度分析。免费测试，即时结果，准确率95%以上。' : 'Professional MBTI personality test platform based on authoritative psychological theory, providing in-depth analysis of 16 personality types. Free test, instant results, over 95% accuracy.',
          inLanguage: locale,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${siteUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string'
          },
          publisher: {
            '@type': 'Organization',
            name: 'MBTI TEST',
            url: siteUrl,
            logo: `${siteUrl}/logo.png`
          }
        };

      case 'organization':
        return {
          ...baseData,
          '@type': 'Organization',
          name: 'MBTI TEST',
          url: siteUrl,
          logo: `${siteUrl}/logo.png`,
          description: locale === 'zh-CN' ? '全球领先的16型人格测评平台，为超过1000万用户提供精准的MBTI测评服务。' : 'World-leading 16 personality assessment platform providing accurate MBTI assessment services to over 10 million users.',
          foundingDate: '2024',
          knowsAbout: locale === 'zh-CN' ? [
            'MBTI测试',
            '16型人格',
            '性格分析',
            '心理测评',
            '职业规划',
            '人际关系',
            '个人发展'
          ] : [
            'MBTI Test',
            '16 Personality Types',
            'Personality Analysis',
            'Psychological Assessment',
            'Career Planning',
            'Interpersonal Relationships',
            'Personal Development'
          ],
          areaServed: {
            '@type': 'Place',
            name: 'Worldwide'
          },
          serviceType: locale === 'zh-CN' ? [
            '性格测试服务',
            '心理评估',
            '个人发展咨询',
            '职业规划指导'
          ] : [
            'Personality Testing Service',
            'Psychological Assessment',
            'Personal Development Consulting',
            'Career Planning Guidance'
          ]
        };

      case 'faq':
        return {
          ...baseData,
          '@type': 'FAQPage',
          mainEntity: data?.faqs?.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          })) || []
        };

      case 'article':
        return {
          ...baseData,
          '@type': 'Article',
          headline: data?.title,
          description: data?.description,
          author: {
            '@type': 'Organization',
            name: 'MBTI TEST'
          },
          publisher: {
            '@type': 'Organization',
            name: 'MBTI TEST',
            logo: {
              '@type': 'ImageObject',
              url: `${siteUrl}/logo.png`
            }
          },
          datePublished: data?.publishedDate,
          dateModified: data?.modifiedDate,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data?.url
          },
          image: data?.image && {
            '@type': 'ImageObject',
            url: data.image,
            width: 1200,
            height: 630
          }
        };

      default:
        return baseData;
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
