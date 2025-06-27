'use client';

import { useState, ChangeEvent } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];
    
    setError(null);
    setSuccess(null);
    setIsUploading(true);

    try {
      // Step 1: Upload file to our own API route
      const uploadResponse = await fetch(`/api/avatar/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json();
        throw new Error(`Upload failed: ${errorData.message}`);
      }
      
      const { url } = await uploadResponse.json();
      
      // Step 2: Update the user profile with the new Vercel Blob URL
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

      // Step 3: Update the session to reflect changes immediately
      await update({ image: updatedUser.image });

      setSuccess('Avatar updated successfully!');

    } catch (err: any) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsUploading(false);
    }
  };
  
  if (status === 'loading' || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <div className='relative'>
              <Image 
                src={session.user?.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                alt={session.user?.name || 'User'} 
                width={120} 
                height={120} 
                className="rounded-full border-4 border-white shadow-lg"
                key={session.user?.image} // Force re-render on image change
              />
               <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isUploading} />
               </label>
            </div>
            
            <div>
              <CardTitle className="text-2xl text-center">{session.user?.name}</CardTitle>
              <CardDescription className="text-center">{session.user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center">
            {isUploading && <p className="text-blue-500">Uploading to Vercel...</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <div className="mt-6">
              <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
} 