'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PersonalityDropdown } from './PersonalityDropdown';

const Logo = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`} className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">MB</span>
      </div>
      <span className="text-xl font-bold">MBTITEST</span>
    </Link>
  );
}

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPersonalityOpen, setIsPersonalityOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsPersonalityOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsPersonalityOpen(false);
    }, 200);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              {t('nav.home')}
            </Link>
            
            <div 
              className="relative"
              onMouseLeave={handleDropdownLeave}
            >
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 font-medium transition-colors"
                onMouseEnter={handleDropdownEnter}
              >
                <span>{t('nav.personalities')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <PersonalityDropdown 
                isOpen={isPersonalityOpen}
                onMouseEnter={handleDropdownEnter}
              />
            </div>

            <Link href={`/${locale}/test`} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">{t('nav.test')}</Link>
            <Link href={`/${locale}/people`} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">{t('nav.people')}</Link>
            <Link href={`/${locale}/blog`} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">{t('nav.blog')}</Link>
            <Link href={`/${locale}/about`} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">{t('nav.about')}</Link>
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link href={`/${locale}/auth/login`} className="text-gray-700 hover:text-purple-600 font-medium transition-colors">{t('nav.login')}</Link>
            <Link href={`/${locale}/test`} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">{t('nav.test')}</Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="flex flex-col space-y-3 px-4">
            <Link href={`/${locale}`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
            <Link href={`/${locale}/personalities`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.personalities')}</Link>
            <Link href={`/${locale}/test`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.test')}</Link>
            <Link href={`/${locale}/people`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.people')}</Link>
            <Link href={`/${locale}/blog`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.blog')}</Link>
            <Link href={`/${locale}/about`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
            <div className="pt-4 border-t border-gray-200">
              <Link href={`/${locale}/auth/login`} className="block text-gray-700 hover:text-purple-600 font-medium transition-colors mb-3" onClick={() => setIsMenuOpen(false)}>{t('nav.login')}</Link>
              <Link href={`/${locale}/test`} className="block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-center" onClick={() => setIsMenuOpen(false)}>{t('nav.test')}</Link>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}