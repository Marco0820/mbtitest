'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, UserPlus } from 'lucide-react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface Conversation {
  id: string; // conversationId
  name: string;
  image: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  otherUserId: string;
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
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoadingConversations, setIsLoadingConversations] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoadingConversations(true);
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) throw new Error('Failed to fetch conversations');
        const data = await res.json();
        setConversations(data);
        
        // After fetching, check if we need to auto-select a conversation
        const receiverId = searchParams?.get('receiverId');
        if (receiverId) {
          const existingConvo = data.find((c: Conversation) => c.otherUserId === receiverId);
          if (existingConvo) {
            setSelectedConversation(existingConvo);
          } else {
            // This is a new chat. We can't know the user's details without another API call.
            // For now, we'll show a placeholder and the first message will create the conversation.
            // A better implementation might fetch the user's details here.
            setSelectedConversation({
              id: `new-${receiverId}`, // Temporary ID
              name: 'New Conversation',
              image: '', // Placeholder image
              lastMessage: 'Start the conversation!',
              lastMessageTimestamp: new Date().toISOString(),
              otherUserId: receiverId,
            });
            setMessages([]); // Clear messages for new convo
          }
           // Clean the URL
           router.replace(pathname, { scroll: false });
        }

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingConversations(false);
      }
    };
    if (session) fetchConversations();
  }, [session, searchParams, pathname, router]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation && !selectedConversation.id.startsWith('new-')) {
        setIsLoadingMessages(true);
        try {
          const res = await fetch(`/api/messages/${selectedConversation.id}`);
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
    fetchMessages();
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    
    const receiverId = selectedConversation.otherUserId;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: receiverId,
          content: newMessage,
        }),
      });

      if (res.ok) {
        const sentMessage = await res.json();
        
        // If it was a new conversation, we need to refresh the conversation list
        // and select the newly created one.
        if(selectedConversation.id.startsWith('new-')) {
            const newConvoResponse = await fetch('/api/messages');
            const updatedConversations = await newConvoResponse.json();
            setConversations(updatedConversations);
            const newConvo = updatedConversations.find((c: Conversation) => c.otherUserId === receiverId);
            setSelectedConversation(newConvo);
        } else {
             setMessages((prev) => [...prev, { ...sentMessage, sender: { id: session!.user!.id!, name: session!.user!.name!, image: session!.user!.image! } }]);
        }
        setNewMessage('');
      }
    } catch(error) {
        console.error("Failed to send message", error);
    }
  };

  if (!session) {
      return <div className="flex items-center justify-center h-full"><p>Please log in to view your messages.</p></div>
  }

  return (
    <div className="flex h-[calc(100vh-80px)] border-t">
      {/* Conversations List */}
      <div className="w-1/3 border-r overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b">Conversations</h2>
        {isLoadingConversations ? <div className="p-4">Loading...</div> : conversations.map((convo) => (
          <div
            key={convo.id}
            className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 ${selectedConversation?.id === convo.id ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
            onClick={() => setSelectedConversation(convo)}
          >
            <div className="flex items-center space-x-3">
              <Image src={convo.image || '/default-avatar.png'} alt={convo.name} width={40} height={40} className="rounded-full" />
              <div>
                <h3 className="font-semibold">{convo.name}</h3>
                <p className="text-sm text-gray-500 truncate">{convo.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-white dark:bg-gray-800">
        {selectedConversation ? (
          <>
            <div className="p-4 border-b flex items-center space-x-3">
              <Image src={selectedConversation.image || '/default-avatar.png'} alt={selectedConversation.name} width={40} height={40} className="rounded-full" />
              <h2 className="text-xl font-bold">{selectedConversation.name}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
              {isLoadingMessages ? <div className="text-center">Loading messages...</div> : messages.map((msg) => (
                <div key={msg.id} className={`flex my-2 ${msg.senderId === session?.user?.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex items-end gap-2 ${msg.senderId === session?.user?.id ? 'flex-row-reverse' : 'flex-row'}`}>
                     <Image src={msg.sender.image || '/default-avatar.png'} alt={msg.sender.name} width={24} height={24} className="rounded-full" />
                    <div className={`p-3 rounded-lg max-w-lg ${msg.senderId === session?.user?.id ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                      <p>{msg.content}</p>
                      <p className="text-xs mt-1 opacity-75 text-right">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t flex items-center bg-white dark:bg-gray-800">
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
                disabled={isLoadingMessages}
              />
              <Button type="submit" className="ml-2" disabled={!newMessage.trim()}>
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <UserPlus className="w-16 h-16 text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold">Welcome to your messages</h2>
            <p className="text-gray-500">Select a conversation or start a new one by messaging someone from the People page.</p>
          </div>
        )}
      </div>
    </div>
  );
} 