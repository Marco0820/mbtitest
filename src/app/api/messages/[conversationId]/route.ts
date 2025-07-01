import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from '@/lib/db';

// GET /api/messages/[conversationId] - Fetches all messages for a specific conversation
export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;
  const conversationId = params.conversationId;

  // Security check: ensure the logged-in user is part of this conversation
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      participants: {
        some: {
          userId: userId,
        },
      },
    },
  });

  if (!conversation) {
    return NextResponse.json({ error: 'Forbidden: You are not a participant in this conversation or it does not exist.' }, { status: 403 });
  }

  // When a user loads a conversation, mark all messages sent by the other party as read.
  await prisma.message.updateMany({
    where: {
      conversationId: conversationId,
      senderId: {
        not: userId, // Only mark messages sent by the other user
      },
      isRead: false,
    },
    data: {
      isRead: true,
    },
  });

  const messages = await prisma.message.findMany({
    where: {
      conversationId: conversationId,
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return NextResponse.json(messages);
} 