'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChatWindow } from '@/components/chat/ChatWindow';

interface BaseUser {
  id: string;
  name: string | null;
  image: string | null;
  mbti: string | null;
  bio?: string | null;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  gender?: string | null;
}

// Type for the object returned by /api/messages
interface Conversation {
    id: string;
    lastMessage: string | null;
    lastMessageTimestamp: string | null;
    otherUser: BaseUser;
}

// Flattened type for the selected user state
interface ConversationView extends BaseUser {
  conversationId: string | null;
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderId: string;
  sender: {
    id: string;
    name: string;
    image: string;
  };
}

export default function MessagesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<ConversationView | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Loading states
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Effect to fetch initial conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoadingConversations(true);
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) throw new Error('Failed to fetch conversations');
        const data = await res.json();
        setConversations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingConversations(false);
      }
    };
    if (session) {
      fetchConversations();
    }
  }, [session]);

  // Effect to handle selecting a user from URL
  useEffect(() => {
    const receiverId = searchParams?.get('receiverId');

    const handleNewChat = async (id: string) => {
      const existingConvo = conversations.find(c => c.otherUser.id.toString() === id);
      if (existingConvo) {
        setSelectedUser({
          ...existingConvo.otherUser,
          conversationId: existingConvo.id
        });
        return;
      }

      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('User not found');
        const userData: BaseUser = await res.json();
        setSelectedUser({
          ...userData,
          conversationId: null,
        });
        setMessages([]);
      } catch (error) {
        console.error("Failed to fetch user for new chat:", error);
        router.replace(pathname, { scroll: false });
      }
    };

    if (receiverId) {
      handleNewChat(receiverId);
      router.replace(pathname, { scroll: false });
    }
  }, [searchParams, conversations, router, pathname]);

  // Effect to fetch messages for the selected conversation
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUser?.conversationId) {
        setIsLoadingMessages(true);
        try {
          const res = await fetch(`/api/messages/${selectedUser.conversationId}`);
          if (!res.ok) throw new Error('Failed to fetch messages');
          const data = await res.json();
          setMessages(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoadingMessages(false);
        }
      }
    };
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !selectedUser || !session?.user?.id) return;

    const receiverId = selectedUser.id;
    const tempMessageId = `temp-${Date.now()}`;

    const optimisticMessage: Message = {
      id: tempMessageId,
      content: content,
      createdAt: new Date().toISOString(),
      senderId: session.user.id,
      sender: {
        id: session.user.id,
        name: session.user.name || 'Me',
        image: session.user.image || '/logo.png',
      },
    };
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: receiverId,
          content: content,
        }),
      });

      if (!res.ok) {
        const errorBody = await res.text();
        throw new Error(`Failed to send message: ${errorBody}`);
      }
      
      const sentMessage = await res.json();
      
      setMessages(prev => prev.map(msg => (msg.id === tempMessageId ? sentMessage.message : msg)));

      if (!selectedUser.conversationId) {
        const newConversationId = sentMessage.conversationId;
        setSelectedUser(prev => ({ ...prev!, conversationId: newConversationId }));
        
        const newConvoForList: Conversation = {
          id: newConversationId,
          otherUser: {
            id: selectedUser.id,
            name: selectedUser.name || 'User',
            image: selectedUser.image || '/logo.png',
            mbti: selectedUser.mbti,
          },
          lastMessage: sentMessage.message.content,
          lastMessageTimestamp: sentMessage.message.createdAt,
        };
        setConversations(prev => [newConvoForList, ...prev.filter(c => c.otherUser.id !== selectedUser.id)]);
      }

    } catch (error) {
      console.error("Failed to send message", error);
      setMessages(prev => prev.filter(msg => msg.id !== tempMessageId));
    }
  };

  const handleConversationSelect = (convo: Conversation) => {
    setSelectedUser({
      ...convo.otherUser,
      conversationId: convo.id,
    });
  }

  if (!session) {
    return <div className="flex items-center justify-center h-full"><p>Please log in to view your messages.</p></div>
  }

  return (
    <div className="flex h-[calc(100vh-80px)] border-t">
      {/* Conversations List */}
      <div className={`w-full md:w-1/3 border-r overflow-y-auto ${selectedUser ? 'hidden md:block' : 'block'}`}>
        <h2 className="text-xl font-bold p-4 border-b">Conversations</h2>
        {isLoadingConversations ? <div className="p-4">Loading...</div> : conversations.map((convo) => (
          <div
            key={convo.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedUser?.conversationId === convo.id ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
            onClick={() => handleConversationSelect(convo)}
          >
            <div className="flex items-center space-x-3">
              <Image src={convo.otherUser.image || '/logo.png'} alt={convo.otherUser.name || 'User'} width={40} height={40} className="rounded-full" unoptimized />
              <div>
                <h3 className="font-semibold">{convo.otherUser.name}</h3>
                <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area Container */}
      <div className={`w-full md:w-2/3 flex-col bg-gray-100 dark:bg-gray-900 ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
        {selectedUser ? (
          <div className="w-full h-full max-w-4xl mx-auto flex flex-col">
             <ChatWindow
              selectedUser={selectedUser}
              messages={messages}
              isLoadingMessages={isLoadingMessages}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedUser(null)}
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Select a conversation</h2>
              <p className="text-gray-500">Choose from your existing conversations or start a new one.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 