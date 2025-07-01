'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

// Manually define the Blog type as a workaround for client components
interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations('blog');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`/api/blogs?locale=${locale}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, [locale]);

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
      </div>

      {isLoading ? (
         <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
          {blogs.map((blog) => (
            <Link href={`/${locale}/blog/${blog.id}`} key={blog.id} className="block">
              <Card className="h-full flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative w-full h-48">
                    <Image
                      src={blog.imageUrl || `https://source.unsplash.com/random/500x300?tech,${blog.trendingKeyword}`}
                      alt={blog.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-6">
                  <Badge variant="secondary" className="mb-2">{blog.trendingKeyword}</Badge>
                  <CardTitle className="text-xl font-semibold leading-snug">{blog.title}</CardTitle>
                  <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                    {blog.content}
                  </p>
                </CardContent>
                <CardFooter>
                   {/* <p className="text-xs text-gray-500">{new Date(blog.createdAt).toLocaleDateString()}</p> */}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 