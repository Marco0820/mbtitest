import { NextResponse } from 'next/server';
import { getUsersAndFilters } from '@/lib/data';

export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const data = await getUsersAndFilters();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
} 