'use client';

import { useState, ChangeEvent, useEffect, Suspense } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Loader2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface HistoryItem {
  id: string;
  mbti: string;
  createdAt: string;
}

function ProfileContent() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('profile');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState('');
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isUpdatingDetails, setIsUpdatingDetails] = useState(false);
  const [details, setDetails] = useState({
    gender: '',
    country: '',
    state: '',
    city: '',
  });

  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || '');
      setDetails({
        gender: session.user.gender || '',
        country: session.user.country || '',
        state: session.user.state || '',
        city: session.user.city || '',
      });
    }
  }, [session]);

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

  const handleSaveName = async () => {
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }
    if (name.trim() === session?.user?.name) {
      setIsEditingName(false);
      return;
    }

    setError(null);
    setSuccess(null);
    setIsUpdatingName(true);

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update name.');
      }

      const { user: updatedUser } = await response.json();
      await update({ name: updatedUser.name });
      setSuccess('Name updated successfully!');
      setIsEditingName(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdatingName(false);
    }
  };

  const handleSaveDetails = async () => {
    setError(null);
    setSuccess(null);
    setIsUpdatingDetails(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update details.');
      }

      const { user: updatedUser } = await response.json();
      await update({
        gender: updatedUser.gender,
        country: updatedUser.country,
        state: updatedUser.state,
        city: updatedUser.city,
      });
      setSuccess('Details updated successfully!');
      setIsEditingDetails(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdatingDetails(false);
    }
  };

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
      {from === 'messaging' && (
        <Alert className="mb-8 border-blue-500 bg-blue-50 text-blue-800">
          <Info className="h-4 w-4 !text-blue-800" />
          <AlertTitle>{t('infoRequiredTitle')}</AlertTitle>
          <AlertDescription>{t('infoRequiredDescription')}</AlertDescription>
        </Alert>
      )}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
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
                {!isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                    <Button variant="ghost" size="icon" onClick={() => setIsEditingName(true)} className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="text-2xl font-bold bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveName} disabled={isUpdatingName}>
                        {isUpdatingName && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('save')}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setIsEditingName(false);
                          setName(session?.user?.name || '');
                        }}
                        disabled={isUpdatingName}
                      >
                        {t('cancel')}
                      </Button>
                    </div>
                  </div>
                )}
                <p className="text-gray-500 dark:text-gray-400">{session.user?.email}</p>
                {isUploading && <p className="text-sm text-blue-500 mt-2">{t('uploading')}</p>}
                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                {success && <p className="text-sm text-green-500 mt-2">{success}</p>}
                <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })} className="mt-2">{t('signOut')}</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{t('detailsTitle')}</CardTitle>
                <CardDescription>{t('detailsDescription')}</CardDescription>
              </div>
              {!isEditingDetails && (
                <Button variant="ghost" size="icon" onClick={() => setIsEditingDetails(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditingDetails ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('gender')}</label>
                    <select
                      value={details.gender}
                      onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                      <option value="">{t('selectGender')}</option>
                      <option value="male">{t('male')}</option>
                      <option value="female">{t('female')}</option>
                      <option value="other">{t('other')}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('country')}</label>
                    <input
                      type="text"
                      value={details.country}
                      onChange={(e) => setDetails({ ...details, country: e.target.value })}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('state')}</label>
                    <input
                      type="text"
                      value={details.state}
                      onChange={(e) => setDetails({ ...details, state: e.target.value })}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">{t('city')}</label>
                    <input
                      type="text"
                      value={details.city}
                      onChange={(e) => setDetails({ ...details, city: e.target.value })}
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveDetails} disabled={isUpdatingDetails}>
                      {isUpdatingDetails && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {t('save')}
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setIsEditingDetails(false)}
                      disabled={isUpdatingDetails}
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>{t('gender')}:</strong> {details.gender || t('notSet')}</p>
                  <p><strong>{t('country')}:</strong> {details.country || t('notSet')}</p>
                  <p><strong>{t('state')}:</strong> {details.state || t('notSet')}</p>
                  <p><strong>{t('city')}:</strong> {details.city || t('notSet')}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>{t('historyTitle')}</CardTitle>
              <CardDescription>{t('historyDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingHistory ? (
                <p>{t('loadingHistory')}</p>
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
                <p>{t('noHistory')}</p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t('messagesTitle')}</CardTitle>
              <CardDescription>{t('messagesDescription')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('messagesContent')}</p>
              <Button asChild className="mt-4">
                <a href={`/${locale}/messages`}>{t('goToMessages')}</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    )
} 