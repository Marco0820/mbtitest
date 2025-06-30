import { User } from '@/lib/dummyUsers';

// In-memory store for messages and conversations.
// In a real application, this would be a database.

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  participants: number[];
  createdAt: string;
}

interface Store {
  conversations: Conversation[];
  messages: Message[];
  nextMessageId: number;
  nextConversationId: number;
}

export const store: Store = {
  conversations: [],
  messages: [],
  nextMessageId: 1,
  nextConversationId: 1,
}; 