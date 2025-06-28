import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get('locale');
  const { type } = params;

  if (!locale) {
    return NextResponse.json(
      { error: "Missing 'locale' query parameter" },
      { status: 400 }
    );
  }

  if (!type) {
    return NextResponse.json(
      { error: "Missing 'type' in path parameter" },
      { status: 400 }
    );
  }

  try {
    const personalityDetails = await prisma.personalityDetails.findUnique({
      where: {
        type_locale: {
          type: type.toUpperCase(),
          locale,
        },
      },
    });

    if (!personalityDetails) {
      return NextResponse.json(
        { error: 'Personality details not found' },
        { status: 404 }
      );
    }

    // The 'details' field is already a JSON object, so we can return it directly.
    return NextResponse.json(personalityDetails.details);
  } catch (error) {
    console.error('API Error fetching personality details:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred' },
      { status: 500 }
    );
  }
} 