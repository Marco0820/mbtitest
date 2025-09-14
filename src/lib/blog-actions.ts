import { prisma } from '@/lib/db';

export async function getBlogs(locale?: string) {
    return prisma.blog.findMany({
      where: {
        locale: locale || 'en', // 默认显示英文文章
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } 