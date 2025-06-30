import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { users } from '@/lib/dummyUsers';
import { store } from '@/lib/mockStore';

// GET /api/messages - Fetches all conversations for the logged-in user
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = parseInt(session.user.id, 10);

    const userConversations = store.conversations.filter(c => c.participants.includes(userId));

    const response = userConversations.map(convo => {
        const otherUserId = convo.participants.find((p: number) => p !== userId);
        const otherUser = users.find(u => u.id === otherUserId);
        const lastMessage = store.messages
            .filter(m => m.conversationId === convo.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

        return {
            id: convo.id,
            lastMessage: lastMessage ? lastMessage.content : "No messages yet.",
            lastMessageTimestamp: lastMessage ? lastMessage.createdAt : convo.createdAt,
            otherUser: {
                id: otherUser?.id,
                name: otherUser?.name,
                avatar: otherUser?.avatar,
                mbti: otherUser?.mbti,
            }
        };
    }).sort((a,b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());
    
    return NextResponse.json(response);
}

// POST /api/messages - Creates a new message and potentially a new conversation
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const senderId = parseInt(session.user.id, 10);

    const { receiverId, content } = await request.json();

    if (!receiverId || !content) {
        return NextResponse.json({ error: 'Receiver ID and content are required' }, { status: 400 });
    }

    const participants = [senderId, parseInt(receiverId, 10)].sort();

    let conversation = store.conversations.find(c => 
        c.participants.length === participants.length && 
        c.participants.every((p: number) => participants.includes(p))
    );

    if (!conversation) {
        conversation = { 
            id: store.nextConversationId++, 
            participants, 
            createdAt: new Date().toISOString() 
        };
        store.conversations.push(conversation);
    }

    const sender = users.find(u => u.id === senderId);
    const newMessage = {
        id: store.nextMessageId++,
        conversationId: conversation.id,
        senderId: senderId,
        content,
        createdAt: new Date().toISOString(),
    };
    store.messages.push(newMessage);

    return NextResponse.json({
      message: {
        ...newMessage,
        sender: {
          id: sender?.id,
          name: sender?.name,
          image: sender?.avatar,
        }
      },
      conversationId: conversation.id
    });
} 