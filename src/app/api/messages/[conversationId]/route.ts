import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { users } from '@/lib/dummyUsers';
import { store } from '@/lib/mockStore';

// GET /api/messages/[conversationId] - Fetches all messages for a specific conversation
export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const userId = parseInt(session.user.id, 10);
  const conversationId = parseInt(params.conversationId, 10);

  const conversation = store.conversations.find(c => c.id === conversationId);

  // Security check: ensure the logged-in user is part of this conversation
  if (!conversation || !conversation.participants.includes(userId)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const conversationMessages = store.messages
    .filter(m => m.conversationId === conversationId)
    .map(message => {
      const sender = users.find(u => u.id === message.senderId);
      return {
        ...message,
        sender: {
          id: sender?.id,
          name: sender?.name,
          image: sender?.avatar
        }
      };
    })
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return NextResponse.json(conversationMessages);
} 