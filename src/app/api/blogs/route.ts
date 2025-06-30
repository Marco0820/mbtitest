import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    const blogs = await prisma.blog.findMany({
      where: {
        locale: locale || undefined,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
} 