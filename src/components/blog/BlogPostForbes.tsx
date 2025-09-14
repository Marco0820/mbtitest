'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bookmark, Share2, ExternalLink, Calendar, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function BlogPostForbes({ blog }: { blog: Blog | null }) {
  const router = useRouter();

  if (!blog) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Button variant="outline" onClick={() => router.back()} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Forbes-style Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {blog.trendingKeyword.replace('16personalities-', '').replace(/-/g, ' ').toUpperCase()}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-600">5-8 min read</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-sm">
                <Bookmark className="h-4 w-4 mr-1" />
                Save
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 text-sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Forbes-style Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <article className="prose prose-lg max-w-none">
              {/* Forbes-style Title */}
              <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 font-serif">
                  {blog.title}
                </h1>
                
                {/* Forbes-style Author Info */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-white">16P</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">16Personalities Research Team</div>
                      <div className="text-sm text-gray-600">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })} • 5-8 min read
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
                  prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-8 prose-h2:leading-tight
                  prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-6 prose-h3:leading-tight
                  prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                  prose-ul:text-gray-800 prose-ul:leading-relaxed prose-ul:mb-4 prose-ul:text-base
                  prose-ol:text-gray-800 prose-ol:leading-relaxed prose-ol:mb-4 prose-ol:text-base
                  prose-li:text-gray-800 prose-li:mb-2 prose-li:text-base
                  prose-strong:text-gray-900 prose-strong:font-semibold
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg
                  prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: blog.content }} 
              />
            </article>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <a 
                    href={blog.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors group"
                  >
                    <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    <span className="text-sm font-medium">Read Original Article</span>
                  </a>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div className="text-sm text-gray-500">
                    Source: mbti16personalities.online
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </footer>
          </div>

          {/* Forbes-style Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Related Articles */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
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

              {/* Social Share */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Article</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
