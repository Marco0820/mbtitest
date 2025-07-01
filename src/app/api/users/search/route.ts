import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { Prisma } from '@prisma/client';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const mbti = searchParams.get('mbti');
  const gender = searchParams.get('gender');
  const country = searchParams.get('country');
  const state = searchParams.get('state');
  const city = searchParams.get('city');

  const where: any = {
    AND: [
      { name: { not: null } },
      { mbti: { not: null } },
      { country: { not: null } },
      { state: { not: null } },
      { city: { not: null } },
    ]
  };

  if (name) {
    where.name = {
      contains: name,
      mode: 'insensitive',
    };
  }

  if (mbti) {
    where.mbti = {
      startsWith: mbti,
      mode: 'insensitive',
    };
  }

  if (gender) {
    where.gender = gender;
  }
  
  if (country) {
    where.country = country;
  }

  if (state) {
    where.state = state;
  }

  if (city) {
    where.city = city;
  }

  try {
    const users = await prisma.user.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: 100, // Limit results to avoid performance issues
    });
    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch filtered users:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
} 