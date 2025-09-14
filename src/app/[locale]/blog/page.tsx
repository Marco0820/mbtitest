'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink } from 'lucide-react';

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations('blog');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // 总是获取英文文章，不管当前locale是什么
        const response = await fetch(`/api/blogs?locale=en`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading blog articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Loading Failed</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Knowledge Base</h1>
        <p className="text-xl text-gray-600">Explore our comprehensive collection of personality insights and research</p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">No Articles Available</h2>
          <p className="text-gray-500">Please check back later for our latest articles</p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {blogs.map((blog, index) => (
                <article key={blog.id} className={`${index === 0 ? 'border-b border-gray-200 pb-8' : 'border-b border-gray-100 pb-6'}`}>
                  <div className="flex items-start gap-4">
                    {index === 0 && (
                      <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">FEATURED</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                          {blog.trendingKeyword.replace('16personalities-', '').replace(/-/g, ' ').toUpperCase()}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-600">5-8 min read</span>
                      </div>
                      
                      <h2 className={`${index === 0 ? 'text-3xl' : 'text-xl'} font-bold text-gray-900 mb-3 leading-tight hover:text-blue-600 transition-colors font-serif`}>
                        <Link href={`/${locale}/blog/${blog.id}`}>
                          {blog.title}
                        </Link>
                      </h2>
                      
                      <p className={`${index === 0 ? 'text-lg' : 'text-base'} text-gray-700 leading-relaxed mb-4`}>
                        {blog.content.replace(/<[^>]*>/g, '').substring(0, index === 0 ? 300 : 150) + '...'}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <Link 
                          href={`/${locale}/blog/${blog.id}`}
                          className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          Read More →
                        </Link>
                        <a 
                          href={blog.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Source
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Forbes-style Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Newsletter Signup */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest insights on personality psychology and MBTI research.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button className="w-full text-sm">Subscribe</Button>
                  </div>
                </div>

                {/* Popular Articles */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Articles</h3>
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        Understanding Your MBTI Personality Type
                      </h4>
                      <p className="text-xs text-gray-600">5 min read</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        The Science Behind Personality Testing
                      </h4>
                      <p className="text-xs text-gray-600">7 min read</p>
                    </div>
                    <div className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        Career Paths for Different MBTI Types
                      </h4>
                      <p className="text-xs text-gray-600">6 min read</p>
                    </div>
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">MBTI</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Psychology</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Career</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Relationships</span>
                    <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">Self-Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* YouTube 视频部分 */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Related Videos</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/2FqUf4b521A"
              title="YouTube video player 1"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src="https://www.youtube.com/embed/pGX-Qgppy9k"
              title="YouTube video player 2"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
} 