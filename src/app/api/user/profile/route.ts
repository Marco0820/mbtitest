import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const profileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  image: z.string().optional(),
  mbti: z.string().optional(),
  result: z.any().optional(),
  gender: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
});

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsedBody = profileSchema.parse(body);
    
    const updateData: { [key: string]: any } = {};
    if (parsedBody.name) updateData.name = parsedBody.name;
    if (parsedBody.bio) updateData.bio = parsedBody.bio;
    if (parsedBody.image) updateData.image = parsedBody.image;
    if (parsedBody.gender) updateData.gender = parsedBody.gender;
    if (parsedBody.country) updateData.country = parsedBody.country;
    if (parsedBody.state) updateData.state = parsedBody.state;
    if (parsedBody.city) updateData.city = parsedBody.city;
    if (parsedBody.mbti) updateData.mbti = parsedBody.mbti;

    const updatedUser = await prisma.$transaction(async (tx) => {
      if (parsedBody.mbti && parsedBody.result) {
        await tx.resultHistory.create({
          data: {
            userId: session.user!.id!,
            mbti: parsedBody.mbti,
            result: parsedBody.result,
          },
        });
      }

      // Then, update the user profile with any provided data
      const updatedUserResult = await tx.user.update({
        where: { id: session.user!.id! },
        data: updateData,
      });

      // If no user was updated, it means the user ID from the session is stale.
      if (!updatedUserResult) {
        throw new Error('User not found. Please re-login.');
      }
      
      return updatedUserResult;
    });

    const { password: _, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({ user: userWithoutPassword, message: 'Profile updated successfully' }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    console.error('Error updating profile:', error);

    if (error instanceof Error && error.message.includes('User not found')) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
} 