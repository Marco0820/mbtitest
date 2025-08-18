'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Share2, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'horizontal' | 'vertical' | 'compact';
}

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  shareUrl: (url: string, title: string, description?: string, hashtags?: string[]) => string;
}

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Facebook',
    icon: <FacebookIcon />,
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
    shareUrl: (url, title, description) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title + (description ? ' - ' + description : ''))}`
  },
  {
    name: 'Twitter/X',
    icon: <TwitterIcon />,
    color: 'bg-black',
    hoverColor: 'hover:bg-gray-800',
    shareUrl: (url, title, description, hashtags) => {
      const text = title + (description ? ' - ' + description : '');
      const hashtagString = hashtags ? ' ' + hashtags.map(tag => `#${tag}`).join(' ') : '';
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + hashtagString)}&url=${encodeURIComponent(url)}`;
    }
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon />,
    color: 'bg-blue-700',
    hoverColor: 'hover:bg-blue-800',
    shareUrl: (url, title, description) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description || '')}`
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon />,
    color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    shareUrl: (url, title) => 
      `https://www.instagram.com/?url=${encodeURIComponent(url)}`
  }
];

export function ShareButton({ 
  url, 
  title, 
  description, 
  hashtags, 
  className = '', 
  size = 'medium',
  variant = 'horizontal'
}: ShareButtonProps) {
  const t = useTranslations('share');
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(url, title, description, hashtags);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      setShowShareMenu(!showShareMenu);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8 text-xs';
      case 'large':
        return 'w-14 h-14 text-lg';
      default:
        return 'w-10 h-10 text-sm';
    }
  };

  const getButtonSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'large':
        return 'px-6 py-3 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleNativeShare}
          className={`
            inline-flex items-center gap-2 ${getButtonSizeClasses()}
            bg-gradient-to-r from-purple-600 to-blue-600 text-white
            rounded-full font-medium transition-all duration-200
            hover:from-purple-700 hover:to-blue-700 hover:scale-105
            shadow-lg hover:shadow-xl active:scale-95
          `}
        >
          <Share2 className="w-4 h-4" />
          {t('share')}
        </button>

        {showShareMenu && (
          <div className="absolute top-full mt-2 left-0 z-50 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 min-w-[280px]">
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 text-center mb-3">{t('share_to')}</p>
              
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg text-white font-medium
                      transition-all duration-200 hover:scale-105 active:scale-95
                      ${platform.color} ${platform.hoverColor}
                    `}
                  >
                    <div className="w-5 h-5">{platform.icon}</div>
                    <span className="text-xs">{platform.name}</span>
                  </button>
                ))}
              </div>

              <div className="border-t pt-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center gap-2 p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500">{t('copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="text-sm">{t('copy_link')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const isVertical = variant === 'vertical';
  const containerClasses = isVertical ? 'flex flex-col gap-3' : 'flex flex-wrap gap-3';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={isVertical ? 'text-center' : 'flex items-center gap-2'}>
        <Share2 className={`${size === 'large' ? 'w-6 h-6' : 'w-5 h-5'} text-gray-600`} />
        <span className="text-gray-700 font-medium">{t('share')}:</span>
      </div>
      
      <div className={isVertical ? 'flex justify-center gap-2' : 'flex gap-2'}>
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className={`
              ${getSizeClasses()} ${platform.color} ${platform.hoverColor}
              rounded-full text-white flex items-center justify-center
              transition-all duration-200 hover:scale-110 active:scale-95
              shadow-lg hover:shadow-xl group relative
            `}
            title={`${t('share_on')} ${platform.name}`}
          >
            <div className="w-5 h-5">{platform.icon}</div>
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              {platform.name}
            </div>
          </button>
        ))}
        
        <button
          onClick={handleCopyLink}
          className={`
            ${getSizeClasses()} bg-gray-600 hover:bg-gray-700
            rounded-full text-white flex items-center justify-center
            transition-all duration-200 hover:scale-110 active:scale-95
            shadow-lg hover:shadow-xl group relative
          `}
          title={t('copy_link')}
        >
          {copied ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <Copy className="w-5 h-5" />
          )}
          
          {/* Tooltip */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {copied ? t('copied') : t('copy_link')}
          </div>
        </button>
      </div>
    </div>
  );
}
