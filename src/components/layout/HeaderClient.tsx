'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { PersonalityDropdown } from './PersonalityDropdown';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Logo = () => {
  const locale = useLocale();
  const colors = [
    '#4285F4', // Blue
    '#DB4437', // Red
    '#F4B400', // Yellow
    '#4285F4', // Blue
    '#0F9D58', // Green
    '#DB4437', // Red
    '#4285F4', // Blue
    '#DB4437', // Red
  ];
  const text = "MBTI TEST";

  return (
    <Link href={`/${locale}`} className="flex items-center space-x-2">
      <img src="/logo.png" alt="MBTITEST Logo" width={32} height={32} />
      <span className="text-xl font-bold">
        {text.split('').map((char, index) => (
          <span key={index} style={{ color: colors[index % colors.length] }}>
            {char}
          </span>
        ))}
      </span>
    </Link>
  );
}

function AuthNav() {
  const { data: session } = useSession();
  const user = session?.user;
  const locale = useLocale();
  const t = useTranslations('nav');
  
  const handleLogout = () => {
    // For server-side logout, we will use a link to the signout endpoint
    // This avoids needing client-side specific logic here
  };

  return (
    <div className="flex items-center space-x-4">
      <LanguageSwitcher />
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Image
                src={user.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                alt={user.name || 'User avatar'}
                fill
                className="rounded-full object-cover"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="focus:bg-blue-100 focus:text-blue-900">
              <Link href={`/${locale}/profile`}>
                <User className="mr-2 h-4 w-4" />
                <span>{t('profile')}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="focus:bg-blue-100 focus:text-blue-900">
               <Link href={`/api/auth/signout`}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('logout')}</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link href={`/${locale}/auth/login`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">{t('login')}</Link>
          <Link href={`/${locale}/auth/signup`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">{t('signup')}</Link>
        </>
      )}
    </div>
  )
}

export function HeaderClient() {
  const { data: session } = useSession();
  const user = session?.user;
  const t = useTranslations('nav');
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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between px-8">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <nav className="hidden md:flex items-center space-x-1 p-1">
            <Link href={`/${locale}`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors">{t('home')}</Link>
            
            <div className="relative" onMouseLeave={handleDropdownLeave}>
              <button
                onMouseEnter={handleDropdownEnter}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors"
              >
                <span>{t('personalities')}</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <PersonalityDropdown isOpen={isPersonalityOpen} onMouseEnter={handleDropdownEnter} />
            </div>

            <Link href={`/${locale}/people`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors">{t('people')}</Link>
            <Link href={`/${locale}/test`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors">{t('test')}</Link>
            <Link href={`/${locale}/blog`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors">{t('blog')}</Link>
            <Link href={`/${locale}/about`} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-600 hover:text-white rounded-full dark:text-gray-300 dark:hover:bg-blue-700 transition-colors">{t('about')}</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center justify-end">
          <AuthNav />
        </div>

        <div className="md:hidden flex flex-1 items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Logo />
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 space-y-2">
            <Link href={`/${locale}`} className="block" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href={`/${locale}/personalities`} className="block" onClick={() => setIsMenuOpen(false)}>{t('personalities')}</Link>
            <Link href={`/${locale}/people`} className="block" onClick={() => setIsMenuOpen(false)}>{t('people')}</Link>
            <Link href={`/${locale}/test`} className="block" onClick={() => setIsMenuOpen(false)}>{t('test')}</Link>
            <Link href={`/${locale}/blog`} className="block" onClick={() => setIsMenuOpen(false)}>{t('blog')}</Link>
            <Link href={`/${locale}/about`} className="block" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <div className="border-t pt-2">
              {user ? (
                <>
                  <Link href={`/${locale}/profile`} className="block mb-2" onClick={() => setIsMenuOpen(false)}>
                    {t('profile')}
                  </Link>
                   <Link href={`/api/auth/signout`} className="w-full">
                     <Button className="w-full">{t('logout')}</Button>
                   </Link>
                </>
              ) : (
                <>
                  <Link href={`/${locale}/auth/login`} className="block mb-2" onClick={() => setIsMenuOpen(false)}>{t('login')}</Link>
                  <Link href={`/${locale}/auth/signup`} className="block" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full">{t('signup')}</Button>
                  </Link>
                </>
              )}
            </div>
             <div className="border-t pt-2">
               <LanguageSwitcher />
             </div>
        </div>
      )}
    </header>
  );
} 