'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

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

function AuthNav({ unreadCount }: { unreadCount: number }) {
  const { data: session } = useSession();
  const user = session?.user;
  const locale = useLocale();
  const t = useTranslations('nav');
  
  const handleLogout = () => {
    signOut({ callbackUrl: `/${locale}` });
  };

  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <LanguageSwitcher />
      {user ? (
        <>
        <Link href={`/${locale}/messages`} className="relative">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>
        <Link href={`/${locale}/profile`}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Image
                        src={user.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
                        alt={user.name || 'User avatar'}
                        fill
                        className="rounded-full object-cover"
                        unoptimized
                        />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
        </Link>
        </>
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
  const { data: session, status } = useSession();
  const user = session?.user;
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPersonalityOpen, setIsPersonalityOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch('/api/messages/unread-count');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count);
        }
      } catch (error) {
        console.error("Failed to fetch unread count", error);
      }
    };
    
    fetchUnreadCount(); // Fetch on initial load
    const intervalId = setInterval(fetchUnreadCount, 15000); // Poll every 15 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [status]);

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

  const handleCloseDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setIsPersonalityOpen(false);
  };

  const navLinkClasses = (path: string) => {
    const isActive = pathname ? (path === `/${locale}` ? pathname === path : pathname.startsWith(path)) : false;
    return `px-4 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white rounded-full dark:hover:bg-blue-700 transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'
    }`;
  };

  const buttonClasses = (path: string) => {
    const isActive = pathname ? pathname.startsWith(path) : false;
    return `flex items-center px-4 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white rounded-full dark:hover:bg-blue-700 transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'text-gray-700 dark:text-gray-300'
    }`;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:bg-gray-900/80">
      <div className="container flex h-16 items-center justify-between px-8">
        <div className="hidden md:flex">
          <Logo />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse p-1">
            <Link href={`/${locale}`} className={navLinkClasses(`/${locale}`)}>{t('home')}</Link>
            
            <div className="relative" onMouseLeave={handleDropdownLeave}>
              <button
                onMouseEnter={handleDropdownEnter}
                className={buttonClasses(`/${locale}/personalities`)}
              >
                <span>{t('personalities')}</span>
                <ChevronDown className="w-4 h-4 ms-1" />
              </button>
              <PersonalityDropdown isOpen={isPersonalityOpen} onMouseEnter={handleDropdownEnter} onClose={handleCloseDropdown} />
            </div>

            <Link href={`/${locale}/people`} className={navLinkClasses(`/${locale}/people`)}>{t('people')}</Link>
            <Link href={`/${locale}/test`} className={navLinkClasses(`/${locale}/test`)}>{t('test')}</Link>
            <Link href={`/${locale}/blog`} className={navLinkClasses(`/${locale}/blog`)}>{t('blog')}</Link>
            <Link href={`/${locale}/about`} className={navLinkClasses(`/${locale}/about`)}>{t('about')}</Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center justify-end">
          <AuthNav unreadCount={unreadCount} />
        </div>

        <div className="md:hidden flex flex-1 items-center justify-between">
          <div className="flex-1 flex justify-start rtl:justify-end">
            <Logo />
          </div>
          <div className="flex-1 flex justify-end rtl:justify-start">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 p-4 space-y-2 text-right rtl:text-left">
            <Link href={`/${locale}`} className="block" onClick={() => setIsMenuOpen(false)}>{t('home')}</Link>
            <Link href={`/${locale}/personalities`} className="block" onClick={() => setIsMenuOpen(false)}>{t('personalities')}</Link>
            <Link href={`/${locale}/people`} className="block" onClick={() => setIsMenuOpen(false)}>{t('people')}</Link>
            <Link href={`/${locale}/test`} className="block" onClick={() => setIsMenuOpen(false)}>{t('test')}</Link>
            <Link href={`/${locale}/blog`} className="block" onClick={() => setIsMenuOpen(false)}>{t('blog')}</Link>
            <Link href={`/${locale}/about`} className="block" onClick={() => setIsMenuOpen(false)}>{t('about')}</Link>
            <DropdownMenuSeparator />
            <div className="flex flex-col space-y-2 pt-2">
                <AuthNav unreadCount={unreadCount} />
            </div>
        </div>
      )}
    </header>
  );
} 