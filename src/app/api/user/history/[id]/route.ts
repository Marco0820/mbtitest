import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const testId = params.id;
  
  if (!testId) {
    return NextResponse.json({ error: 'Test ID is required' }, { status: 400 });
  }

  try {
    const testResult = await prisma.testResult.findUnique({
      where: {
        id: testId,
        userId: session.user.id,
      },
    });

    if (!testResult) {
      return NextResponse.json({ error: 'Test result not found' }, { status: 404 });
    }

    // The 'result' field in the database is expected to be a JSON string.
    // We parse it before sending it to the client.
    const resultData = JSON.parse(testResult.result as string);

    return NextResponse.json(resultData);

  } catch (error) {
    console.error('Error fetching test result:', error);
    if (error instanceof SyntaxError) {
        return NextResponse.json({ error: 'Failed to parse test result data.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 