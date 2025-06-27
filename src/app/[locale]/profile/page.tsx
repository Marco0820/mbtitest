'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface HistoryItem {
  id: string;
  mbti: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/user/history');
          if (!response.ok) {
            throw new Error('Failed to fetch history');
          }
          const data = await response.json();
          setHistory(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoadingHistory(false);
        }
      } else {
        setIsLoadingHistory(false);
      }
    };

    if (status === 'authenticated') {
      fetchHistory();
    }
  }, [session, status]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    
    setError(null);
    setSuccess(null);
    setIsUploading(true);

    try {
      const uploadResponse = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`Upload failed: ${errorData.message}`);
      }
      
      const { url } = await uploadResponse.json();
      
      const profileResponse = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: url }),
      });
      
      if (!profileResponse.ok) {
          const errorResult = await profileResponse.json();
          const errorMessage = typeof errorResult === 'object' ? JSON.stringify(errorResult) : 'Failed to update profile.';
          throw new Error(errorMessage);
      }
      
      const { user: updatedUser } = await profileResponse.json();

      await update({ image: updatedUser.image });

      setSuccess('Avatar updated successfully!');

    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsUploading(false);
    }
  };
  
  if (status === 'loading') {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    router.push(`/${locale}/auth/login`);
    return null;
  }

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">个人中心</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-4 flex items-start space-x-4">
              <div className="w-20 h-20 flex-shrink-0 relative">
                <Image 
                  src={session.user?.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                  alt={session.user?.name || 'User'} 
                  width={80} 
                  height={80} 
                  className="rounded-full border-2 border-gray-200 dark:border-gray-800 object-cover w-full h-full"
                  key={session.user?.image}
                  unoptimized
                />
                <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
                </label>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                <p className="text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
                <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })} className="mt-2">Sign Out</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>测试历史记录</CardTitle>
              <CardDescription>这里是您过往的MBTI测试结果。</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <p>加载历史记录中...</p>
              ) : history.length > 0 ? (
                <ul className="space-y-3">
                  {history.map((item) => (
                    <li key={item.id}>
                      <Link href={`/${locale}/results/${item.mbti}?historyId=${item.id}`} className="block p-3 border rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <span className="font-semibold text-lg">{item.mbti}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>暂无测试记录。</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>我的私信</CardTitle>
              <CardDescription>查看并管理您的站内信。</CardDescription>
            </CardHeader>
            <CardContent>
              <p>与其他用户进行交流，分享您的见解。</p>
              <Button asChild className="mt-4">
                <a href={`/${locale}/messages`}>进入私信</a>
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
} 