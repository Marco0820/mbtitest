import { MetadataRoute } from 'next';
import { routing } from '@/routing';
import { getBlogs } from '@/lib/blog-actions';

const URL = 'https://www.mbti16personalities.online';

const personalityTypes = [
  'intj', 'intp', 'entj', 'entp',
  'infj', 'infp', 'enfj', 'enfp',
  'istj', 'isfj', 'estj', 'esfj',
  'istp', 'isfp', 'estp', 'esfp'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { locales } = routing;

  // Static routes
  const staticRoutes = ['', '/about', '/blog', '/people', '/test', '/faq'];
  const staticUrls = staticRoutes.flatMap((route: string) =>
    locales.map((locale: string) => ({
      url: `${URL}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );

  // Dynamic routes for blogs
  const blogs = await getBlogs();
  const blogUrls = blogs.flatMap((blog: { id: string; updatedAt: string | number | Date; }) =>
    locales.map((locale: string) => ({
      url: `${URL}/${locale}/blog/${blog.id}`,
      lastModified: new Date(blog.updatedAt),
    }))
  );

  // Dynamic routes for personalities
  const personalityUrls = personalityTypes.flatMap((type: string) =>
    locales.map((locale: string) => ({
      url: `${URL}/${locale}/personalities/${type.toLowerCase()}`,
      lastModified: new Date(),
    }))
  );

  return [
    ...staticUrls,
    ...blogUrls,
    ...personalityUrls,
  ];
} 