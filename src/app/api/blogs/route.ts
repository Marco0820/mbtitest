import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getBlogs } from '@/lib/blog-actions';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale');

    const blogs = await getBlogs(locale || undefined);
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Failed to fetch blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
} 