import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return a subset of user data, excluding sensitive info like email
    const publicUserData = {
      id: user.id,
      name: user.name,
      image: user.image,
      mbti: user.mbti,
      bio: user.bio,
      country: user.country,
      state: user.state,
      city: user.city,
      gender: user.gender,
    };

    return NextResponse.json(publicUserData);
  } catch (error) {
    console.error(`[API_USER_ID] Failed to fetch user ${userId}:`, error);
    return NextResponse.json({ error: 'An internal server error occurred.' }, { status: 500 });
  }
} 