'use client';

import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, ArrowLeft } from 'lucide-react';

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

interface User {
  id: string;
  name: string | null;
  image: string | null;
  mbti: string | null;
}

interface ChatWindowProps {
  selectedUser: User;
  onSendMessage: (content: string) => Promise<void>;
  messages: Message[];
  isLoadingMessages: boolean;
  onBack: () => void;
}

export function ChatWindow({
  selectedUser,
  onSendMessage,
  messages,
  isLoadingMessages,
  onBack,
}: ChatWindowProps) {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    await onSendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-gray-800 h-full">
      <div className="p-4 border-b flex items-center space-x-3">
        <Button variant="ghost" className="md:hidden" onClick={onBack}>
          <ArrowLeft />
        </Button>
        <Image
          src={selectedUser.image || '/logo.png'}
          alt={selectedUser.name || 'User avatar'}
          width={40}
          height={40}
          className="rounded-full"
          unoptimized
        />
        <div>
          <h2 className="text-xl font-bold">{selectedUser.name}</h2>
          {selectedUser.mbti && <p className="text-sm text-purple-600">{selectedUser.mbti}</p>}
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-700">
        {isLoadingMessages ? (
          <div className="text-center">Loading messages...</div>
        ) : (
          messages
            .filter(msg => msg && msg.senderId != null) // Filter out invalid messages
            .map((msg) => (
              <div
                key={msg.id}
                className={`flex my-2 ${
                  msg.senderId?.toString() === session?.user?.id
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                    msg.senderId?.toString() === session?.user?.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleFormSubmit} className="p-4 border-t bg-white dark:bg-gray-800">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            autoComplete="off"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
} 