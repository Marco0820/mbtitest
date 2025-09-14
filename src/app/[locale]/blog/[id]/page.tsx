
import { routing } from '@/routing';
import BlogPostForbes from '@/components/blog/BlogPostForbes';
import { getMessages } from 'next-intl/server';
import { createTranslator } from 'next-intl';
import type { Metadata } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface Blog {
  id: string;
  trendingKeyword: string;
  title: string;
  content: string;
  sourceUrl: string;
  imageUrl: string | null;
  createdAt: string;
}

export async function generateStaticParams() {
  const params: { id: string; locale: string }[] = [];
  
  try {
    const blogs = await prisma.blog.findMany({
      select: { id: true }
    });
    
    routing.locales.forEach((locale) => {
      blogs.forEach((blog) => {
        params.push({ locale, id: blog.id });
      });
    });
  } catch (error) {
    console.error('Error generating static params:', error);
  }

  return params;
}

export async function generateMetadata({ params }: { params: { id: string; locale: string } }): Promise<Metadata> {
  const { id, locale } = params;
  const messages = await getMessages({ locale });
  const t = createTranslator({ locale, messages });
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mbti16personalities.online';
  const canonicalUrl = `${siteUrl}/${locale}/blog/${id}`;
  
  let blogData: Blog | null = null;
  try {
    const blogFromPrisma = await prisma.blog.findUnique({
      where: { id }
    });

    if (blogFromPrisma) {
      blogData = {
        id: blogFromPrisma.id,
        trendingKeyword: blogFromPrisma.trendingKeyword,
        title: blogFromPrisma.title,
        content: blogFromPrisma.content,
        sourceUrl: blogFromPrisma.sourceUrl,
        imageUrl: blogFromPrisma.imageUrl,
        createdAt: blogFromPrisma.createdAt.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
  
  const title = blogData ? blogData.title : t('Layout.title');
  const description = blogData ? 
    `${blogData.title} - ${t('Layout.description')}` : 
    t('Layout.description');

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'MBTI TEST - 16型人格专业测评',
      images: blogData?.imageUrl ? [
        {
          url: blogData.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : [
        {
          url: `${siteUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'MBTI性格测试 - 16型人格测评',
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: blogData?.imageUrl ? [blogData.imageUrl] : [`${siteUrl}/logo.png`],
    },
  };
}

// This is now a Server Component
export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const id = params?.id;
  
  let blogData: Blog | null = null;
  try {
    const blogFromPrisma = await prisma.blog.findUnique({
      where: { id }
    });
    if (blogFromPrisma) {
      blogData = {
        id: blogFromPrisma.id,
        trendingKeyword: blogFromPrisma.trendingKeyword,
        title: blogFromPrisma.title,
        content: blogFromPrisma.content,
        sourceUrl: blogFromPrisma.sourceUrl,
        imageUrl: blogFromPrisma.imageUrl,
        createdAt: blogFromPrisma.createdAt.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }

  if (!blogData) {
    return <BlogPostForbes blog={null} />;
  }

  return <BlogPostForbes blog={blogData} />;
} 