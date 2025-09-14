'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Share2, Bookmark } from 'lucide-react';

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
  createdAt: string;
}

export default function BlogPostClient({ blog }: { blog: Blog | null }) {
  const router = useRouter();
  const t = useTranslations('blog');

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Blog post not found.</h2>
          <Button variant="ghost" onClick={() => router.back()} className="mt-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header - Sticky */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-xs font-medium text-gray-600 border-gray-300">
                {blog.trendingKeyword.replace('16personalities-', '').replace(/-/g, ' ').toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">5-8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-xl max-w-none">
          {/* Article Title - NYT Style */}
          <header className="mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-8 font-serif">
              {blog.title}
            </h1>
            
            {/* Author and Meta Info - NYT Style */}
            <div className="border-b border-gray-300 pb-6 mb-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-white">16P</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">16Personalities Research Team</div>
                    <div className="text-gray-600">Personality Psychology Research</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 font-medium">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Published</div>
                </div>
              </div>
            </div>
            
            {/* Article Summary - NYT Style */}
            <div className="bg-gray-50 border-l-4 border-blue-600 p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed italic">
                {blog.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...'}
              </p>
            </div>
          </header>

          {/* Article Body - NYT Style */}
          <div 
            className="prose prose-xl max-w-none font-serif
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight prose-headings:font-serif
              prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-8 prose-h1:mt-16 prose-h1:leading-tight prose-h1:font-serif
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12 prose-h2:leading-tight prose-h2:font-serif
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-10 prose-h3:leading-tight prose-h3:font-serif
              prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:font-normal prose-p:font-serif
              prose-ul:text-gray-800 prose-ul:leading-relaxed prose-ul:mb-6 prose-ul:text-lg prose-ul:font-serif
              prose-ol:text-gray-800 prose-ol:leading-relaxed prose-ol:mb-6 prose-ol:text-lg prose-ol:font-serif
              prose-li:text-gray-800 prose-li:mb-3 prose-li:text-lg prose-li:font-serif
              prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:font-serif
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:font-serif
              prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-8 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:py-6 prose-blockquote:pr-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:text-lg prose-blockquote:leading-relaxed
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }} 
          />
        </article>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
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
      </main>
    </div>
  );
}