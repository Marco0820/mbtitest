import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const profileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  image: z.string().optional(),
  mbti: z.string().optional(),
});

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, bio, image, mbti } = profileSchema.parse(body);

    const updatedUser = await prisma.$transaction(async (tx) => {
      if (mbti) {
        const user = await tx.user.findUnique({
          where: { id: session.user!.id! },
          select: { country: true },
        });
        await tx.resultHistory.create({
          data: {
            userId: session.user!.id!,
            mbti,
            country: user?.country || 'unknown',
          },
        });
      }

      return tx.user.update({
        where: { id: session.user!.id! },
        data: {
          name,
          bio,
          image,
          mbti,
        },
      });
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword, message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
} 