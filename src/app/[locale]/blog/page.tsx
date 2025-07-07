'use client'

// import Image from 'next/image';
// import Link from 'next/link';
// import { useLocale, useTranslations } from 'next-intl';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Loader2 } from 'lucide-react';

// Manually define the Blog type as a workaround for client components
/*
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
*/


export default function BlogPage() {
  /*
  const locale = useLocale();
  const t = useTranslations('blog');

  const blogs: Blog[] = staticBlogs.map((blog, index) => ({
    ...blog,
    id: blog.trendingKeyword.toLowerCase().replace(/\s+/g, '-'),
  }));
  */

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl aspect-w-16 aspect-h-9">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/OjTngPFo6eE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
      </div>
    </div>
  );
} 