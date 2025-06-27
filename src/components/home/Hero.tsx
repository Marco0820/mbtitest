'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Play, Users, ArrowRight } from 'lucide-react';
import React from 'react';

const HeroComponent = () => {
  const t = useTranslations('home');
  const locale = useLocale();

  return (
    <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-125"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
          {t('hero.title')}
        </h1>
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

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold">10M+</div>
            <div className="text-gray-200">Tests Completed</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">190+</div>
            <div className="text-gray-200">Countries</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">21</div>
            <div className="text-gray-200">Languages</div>
          </div>
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