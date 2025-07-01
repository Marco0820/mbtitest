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
    unreadCount: number;
}

const truncateText = (text: string | null | undefined, maxLength: number): string => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

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
  const { data: session, status } = useSession();
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

  // Effect to fetch initial conversations
  useEffect(() => {
    if (status === 'authenticated') {
      fetchConversations();
    }
  }, [status]);

  // Effect to handle selecting a user from URL
  useEffect(() => {
    const receiverId = searchParams?.get('receiverId');

    if (!receiverId) {
      return;
    }
    
    // Prevent re-running selection logic if the correct user is already selected.
    // This stops the "flash" when the conversations list is updated after sending a message.
    if (selectedUser?.id === receiverId) {
      return;
    }

    const handleNewChat = async (id: string) => {
      // If conversation already exists, select it
      const existingConvo = conversations.find(c => c.otherUser.id.toString() === id);
      if (existingConvo) {
        setSelectedUser({
          ...existingConvo.otherUser,
          conversationId: existingConvo.id
        });
        return;
      }

      // If it's a new chat, fetch user data
      try {
        const res = await fetch(`/api/users/${id}`);
        if (!res.ok) throw new Error('User not found');
        const userData: BaseUser = await res.json();
        setSelectedUser({
          ...userData,
          conversationId: null, // No conversation ID yet
        });
        setMessages([]); // Clear previous messages
      } catch (error) {
        console.error("Failed to fetch user for new chat:", error);
        if (pathname) {
            const cleanPath = pathname.split('?')[0];
            router.replace(cleanPath, { scroll: false });
        }
      }
    };
    
    if (receiverId) {
      handleNewChat(receiverId);
    }
  }, [searchParams, conversations, router, pathname, selectedUser]);

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

          // Manually update the unread count for the selected conversation on the client
          setConversations(prevConvos =>
            prevConvos.map(convo =>
              convo.id === selectedUser.conversationId
                ? { ...convo, unreadCount: 0 }
                : convo
            )
          );

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

    // Optimistic UI update
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
      
      // Replace optimistic message with actual message from server
      setMessages(prev => prev.map(msg => (msg.id === tempMessageId ? sentMessage.message : msg)));

      // If it was a new conversation, update the state
      if (!selectedUser.conversationId) {
        const newConversationId = sentMessage.conversationId;
        setSelectedUser(prev => ({ ...prev!, conversationId: newConversationId }));
      }
      
      // Refresh conversations to show the latest message on the list
      fetchConversations();

    } catch (error) {
      console.error("Failed to send message", error);
      // Rollback optimistic update on failure
      setMessages(prev => prev.filter(msg => msg.id !== tempMessageId));
    }
  };

  const handleConversationSelect = (convo: Conversation) => {
    const newPath = `${pathname}?receiverId=${convo.otherUser.id}`;
    router.push(newPath, { scroll: false });
  };

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-full"><p>Loading...</p></div>
  }

  if (status === 'unauthenticated' || !session) {
    return <div className="flex items-center justify-center h-full"><p>Please log in to view your messages.</p></div>
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
        <div className="flex h-[calc(80vh)] border rounded-lg">
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
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{convo.otherUser.name}</h3>
                      {convo.unreadCount > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                          {convo.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{truncateText(convo.lastMessage, 40)}</p>
                  </div>
                </div>
              </div>
            ))}
            {conversations.length === 0 && !isLoadingConversations && <div className="p-4 text-gray-500">No conversations yet.</div>}
          </div>

          {/* Chat Window */}
          <div className={`w-full md:w-2/3 flex flex-col ${selectedUser ? 'block' : 'hidden md:flex'}`}>
            {selectedUser ? (
               <ChatWindow
                  key={selectedUser.id} // Re-mount component when user changes
                  selectedUser={selectedUser}
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  isLoadingMessages={isLoadingMessages}
                  onBack={() => setSelectedUser(null)}
              />
            ) : (
              <div className="hidden md:flex flex-col items-center justify-center h-full text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                <h2 className="text-2xl font-semibold">Select a conversation</h2>
                <p>Choose from your existing conversations or start a new one.</p>
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
