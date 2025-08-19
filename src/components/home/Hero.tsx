'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Users, ArrowRight } from 'lucide-react';
import React from 'react';

const HeroComponent = () => {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Static Image Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-background.jpg" // Replace with your optimized image path
          alt="Abstract background"
          fill={true}
          style={{ objectFit: 'cover' }}
          quality={80} // Adjust quality as needed
          priority // Load this image first
        />
        {/* Add a semi-transparent overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>
        <div className="mb-4">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            🔬 {locale === 'zh-CN' ? '权威MBTI测试 | 科学性格分析' : 'Authoritative MBTI Test | Scientific Personality Analysis'}
          </span>
        </div>
        <p className="text-xl sm:text-2xl mb-8 text-gray-100 animate-slide-up">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
          <Link
            href={`/${locale}/test`}
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 group shadow-lg"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{t('hero.cta')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href={`/${locale}/people`}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center space-x-2 group"
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>{t('hero.secondary_cta')}</span>
          </Link>
        </div>

        {/* Trust proof statistics */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-yellow-300">{locale === 'zh-CN' ? '1000万+' : '10M+'}</div>
            <div className="text-gray-200 text-sm">{locale === 'zh-CN' ? '用户选择' : 'Users Choice'}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-300">95%+</div>
            <div className="text-gray-200 text-sm">{locale === 'zh-CN' ? '准确率' : 'Accuracy'}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-blue-300">{locale === 'zh-CN' ? '10分钟' : '10 mins'}</div>
            <div className="text-gray-200 text-sm">{locale === 'zh-CN' ? '快速测评' : 'Quick Test'}</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-300">21</div>
            <div className="text-gray-200 text-sm">{locale === 'zh-CN' ? '种语言' : 'Languages'}</div>
          </div>
        </div>
        
        {/* SEO keywords information */}
        <div className="mt-12 text-center">
          <p className="text-gray-300 text-lg mb-4">
            🏆 {locale === 'zh-CN' ? '专业的MBTI性格测试平台 | 16型人格权威测评' : 'Professional MBTI Personality Test Platform | Authoritative 16 Personality Assessment'}
          </p>
          <p className="text-gray-400 text-sm">
            {locale === 'zh-CN' ? '基于迈尔斯-布里格斯类型指标 | 免费测试 | 科学分析 | 即时结果' : 'Based on Myers-Briggs Type Indicator | Free Test | Scientific Analysis | Instant Results'}
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full animate-bounce mt-2" />
        </div>
      </div>
    </section>
  );
};

export const Hero = React.memo(HeroComponent);