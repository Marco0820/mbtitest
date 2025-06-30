import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc', // Order by creation date, newest first
      },
      select: {
        id: true,
        name: true,
        email: true, // For admin or specific purposes, otherwise might want to omit
        image: true,
        mbti: true,
        bio: true,
        country: true,
        state: true,
        city: true,
        gender: true,
        createdAt: true,
      },
    });

    const mbti = (await prisma.user.findMany({
      select: { mbti: true },
      distinct: ['mbti'],
      where: { mbti: { not: null } },
    })).map(u => u.mbti!);
    
    const countries = (await prisma.user.findMany({
      select: { country: true },
      distinct: ['country'],
       where: { country: { not: null } },
    })).map(u => u.country!);

    const states = (await prisma.user.findMany({
        select: { state: true },
        distinct: ['state'],
         where: { state: { not: null } },
    })).map(u => u.state!);

    const cities = (await prisma.user.findMany({
        select: { city: true },
        distinct: ['city'],
         where: { city: { not: null } },
    })).map(u => u.city!);

    const genders = (await prisma.user.findMany({
        select: { gender: true },
        distinct: ['gender'],
         where: { gender: { not: null } },
    })).map(u => u.gender!);


    return NextResponse.json({ 
        users, 
        filters: { 
            mbti, 
            countries,
            states,
            cities,
            genders
        } 
    });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
} 