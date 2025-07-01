import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { prisma } from '@/lib/db';

// GET /api/messages - Fetches all conversations for the logged-in user
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
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
                            mbti: true,
                        }
                    }
                }
            },
            messages: {
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            },
            _count: {
                select: {
                    messages: {
                        where: {
                            senderId: { not: userId },
                            isRead: false
                        }
                    }
                }
            }
        },
        orderBy: {
            updatedAt: 'desc',
        }
    });

    const response = conversations.map(convo => {
        const otherUserParticipant = convo.participants.find(p => p.userId !== userId);
        const lastMessage = convo.messages[0];
        return {
            id: convo.id,
            lastMessage: lastMessage ? lastMessage.content : "No messages yet.",
            lastMessageTimestamp: lastMessage ? lastMessage.createdAt : convo.updatedAt,
            otherUser: otherUserParticipant?.user,
            unreadCount: convo._count.messages
        };
    })
    
    return NextResponse.json(response);
}

// POST /api/messages - Creates a new message and potentially a new conversation
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const senderId = session.user.id;
    const { receiverId, content } = await request.json();

    if (!receiverId || !content) {
        return NextResponse.json({ error: 'Receiver ID and content are required' }, { status: 400 });
    }

    try {
        const { message, conversationId } = await prisma.$transaction(async (tx) => {
            // 1. Find if a conversation already exists between the two users
            const existingConversation = await tx.conversation.findFirst({
                where: {
                    AND: [
                        { participants: { some: { userId: senderId } } },
                        { participants: { some: { userId: receiverId } } },
                    ]
                }
            });

            let conversationId: string;

            if (existingConversation) {
                conversationId = existingConversation.id;
                // Also update the conversation's updatedAt timestamp to bring it to the top
                await tx.conversation.update({
                    where: { id: conversationId },
                    data: { updatedAt: new Date() }
                });
            } else {
                // 2. If not, create a new conversation and participants
                const newConversation = await tx.conversation.create({
                    data: {
                        participants: {
                            create: [
                                { userId: senderId },
                                { userId: receiverId },
                            ]
                        }
                    }
                });
                conversationId = newConversation.id;
            }

            // 3. Create the new message
            const newMessage = await tx.message.create({
                data: {
                    content,
                    senderId,
                    conversationId,
                },
                include: {
                    sender: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        }
                    }
                }
            });

            return { message: newMessage, conversationId: conversationId };
        });

        return NextResponse.json({ message, conversationId });

    } catch (error) {
        console.error("Failed to send message:", error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
} 