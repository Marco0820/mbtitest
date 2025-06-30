'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
// import { Blog } from '@prisma/client'; // Temporarily commented out due to generation issue
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Loader2 } from 'lucide-react';

type Blog = any; // Temporary type until Prisma issue is resolved

export default function BlogPostPage() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center py-20">Blog post not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-4xl">
      <Button variant="ghost" onClick={() => router.back()} className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Button>
      <article>
        <header className="mb-8">
          <Badge variant="secondary" className="mb-4">{blog.trendingKeyword}</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Published on {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </header>

        {blog.imageUrl && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p>{blog.content}</p>
        </div>
        
        <footer className="mt-12">
            <a href={blog.sourceUrl} target="_blank" rel="noopener noreferrer">
                 <Button>
                    Read Original Article
                    <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </a>
        </footer>
      </article>
    </div>
  );
} 