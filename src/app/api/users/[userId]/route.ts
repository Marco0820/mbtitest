import { NextResponse } from 'next/server';
import { users } from '@/lib/dummyUsers';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const user = users.find(u => u.id.toString() === userId);

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Return a subset of user data, excluding sensitive info
  const publicUserData = {
    id: user.id,
    name: user.name,
    mbti: user.mbti,
    avatar: user.avatar,
    bio: user.bio,
    country: user.country,
    state: user.state,
    city: user.city,
  };

  return NextResponse.json(publicUserData);
} 