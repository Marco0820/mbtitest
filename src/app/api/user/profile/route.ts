import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const profileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  image: z.string().optional(),
});

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, bio, image } = profileSchema.parse(body);

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name || undefined,
        bio: bio || undefined,
        image: image || undefined,
      },
    });

    const { password: _, ...updatedUser } = user;

    return NextResponse.json({ user: updatedUser, message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
} 