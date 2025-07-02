'use client';

import * as React from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  // 当滚动超过300px时显示按钮
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 平滑滚动到页面顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  React.useEffect(() => {
    // 监听滚动事件
    window.addEventListener('scroll', toggleVisibility);

    // 组件卸载时移除监听
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        fixed bottom-8 left-8 z-50 p-3
        bg-gray-800 text-white rounded-full shadow-lg
        hover:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
        transition-opacity duration-300
      `}
      aria-label="Go to top"
    >
      <ArrowUp className="h-6 w-6" />
    </button>
  );
}; 