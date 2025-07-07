'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
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
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t('back_button')}
      </Button>
      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">{blog.trendingKeyword}</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {blog.title}
          </h1>
        </header>

        {blog.imageUrl && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }} 
        />
        
        <footer className="mt-12 border-t pt-8">
            <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900">
                 Source Link
                <ExternalLink className="ml-2 h-4 w-4 inline-block" />
            </a>
        </footer>
      </article>
    </div>
  );
} 