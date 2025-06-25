'use client';

import { useTranslations } from 'next-intl';
import { Brain, Users, TrendingUp, Shield, Globe, Zap } from 'lucide-react';

export function Features() {
  const t = useTranslations('home.features');

  const features = [
    {
      icon: Brain,
      title: t('accurate.title'),
      description: t('accurate.description'),
      color: 'text-purple-600 bg-purple-100'
    },
    {
      icon: Users,
      title: t('social.title'),
      description: t('social.description'),
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: TrendingUp,
      title: t('insights.title'),
      description: t('insights.description'),
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Shield,
      title: t('privacy.title'),
      description: t('privacy.description'),
      color: 'text-gray-600 bg-gray-100'
    },
    {
      icon: Globe,
      title: t('languages.title'),
      description: t('languages.description'),
      color: 'text-orange-600 bg-orange-100'
    },
    {
      icon: Zap,
      title: t('instant.title'),
      description: t('instant.description'),
      color: 'text-teal-600 bg-teal-100'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}