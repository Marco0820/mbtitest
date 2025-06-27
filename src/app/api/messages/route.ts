import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/db';
import * as z from 'zod';

const sendMessageSchema = z.object({
  receiverId: z.string(),
  content: z.string().min(1, 'Message content cannot be empty.'),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { receiverId, content } = sendMessageSchema.parse(body);

    const sender = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { country: true }
    });
    
    const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: { country: true }
    });

    if (!receiver) {
      return NextResponse.json({ message: 'Receiver not found' }, { status: 404 });
    }

    const message = await prisma.userMessage.create({
      data: {
        senderId: session.user.id,
        receiverId,
        content,
        senderCountry: sender?.country,
        receiverCountry: receiver.country,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const userId = session.user.id;
  
      const conversations = await prisma.conversation.findMany({
        where: {
          participants: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          participants: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: 'desc',
        }
      });
  
      const formattedConversations = conversations.map((convo) => {
        const otherParticipant = convo.participants.find(
          (p) => p.userId !== userId
        );
        return {
          id: convo.id,
          name: otherParticipant?.user.name || 'Unknown User',
          image: otherParticipant?.user.image || '',
          lastMessage: convo.messages[0]?.content || 'No messages yet.',
          lastMessageTimestamp: convo.messages[0]?.createdAt || convo.updatedAt,
          otherUserId: otherParticipant?.user.id,
        };
      });
  
      return NextResponse.json(formattedConversations);
  
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
} 