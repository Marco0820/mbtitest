import { prisma } from '@/lib/db';

export async function getBlogs(locale?: string) {
    return prisma.blog.findMany({
      where: {
        locale: locale || undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  } 