'use client'

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
  content: string; // This will now be a short summary
  sourceUrl: string; // The link to the full article page
  imageUrl: string | null;
  createdAt?: Date; // Optional now
}

const staticBlogs: Omit<Blog, 'id'>[] = [
    {
    trendingKeyword: 'INTJ Careers',
    title: 'INTJ Careers: 7 Perfect Paths for the Strategic Architect',
    content: `Discover the best career paths for the INTJ personality type. Explore jobs that leverage the Architect's strategic mind, love for logic, and innovative thinking.`,
    sourceUrl: '/blog/intj-careers',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
  {
    trendingKeyword: 'INFP INFJ Compatibility',
    title: 'INFP and INFJ Compatibility: A Deep and Complex Connection',
    content: `Explore the unique relationship compatibility between INFP and INFJ personality types. Understand their shared values, potential conflicts, and how they can build a lasting bond.`,
    sourceUrl: '/blog/infp-infj-compatibility',
    imageUrl: 'https://images.unsplash.com/photo-1505526543118-2469491CFde1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
  },
];


export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations('blog');

  const blogs: Blog[] = staticBlogs.map((blog, index) => ({
    ...blog,
    id: blog.trendingKeyword.toLowerCase().replace(/\s+/g, '-'),
  }));

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          {t('title')}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1">
        {blogs.map((blog) => (
          <Link href={`/${locale}${blog.sourceUrl}`} key={blog.id} className="block">
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
                 {/* You can add a read more button or date here later */}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 