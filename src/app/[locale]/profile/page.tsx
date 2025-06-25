'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { users, User } from '@/lib/dummyUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Let's assume we're editing the first user for simplicity
const USER_ID_TO_EDIT = 1;

const profileFormSchema = z.object({
  country: z.string().min(1, "Country is required."),
  state: z.string().min(1, "State is required."),
  city: z.string().min(1, "City is required."),
  gender: z.enum(['male', 'female', 'other'], { required_error: "Gender is required." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  // Find the user to edit. In a real app, this would come from session or a route param.
  const [user, setUser] = useState<User | undefined>(users.find(u => u.id === USER_ID_TO_EDIT));

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      country: user?.country || '',
      state: user?.state || '',
      city: user?.city || '',
      gender: user?.gender,
    },
    mode: 'onChange'
  });

  if (!user) {
    return <div>User not found</div>;
  }
  
  const uniqueCountries = Array.from(new Set(users.map(user => user.country)));
  const uniqueStates = Array.from(new Set(users.map(user => user.state)));
  const uniqueCities = Array.from(new Set(users.map(user => user.city)));

  const onSubmit = (data: ProfileFormValues) => {
    // In a real app, you'd send this to your server.
    // For now, we'll just update the local state.
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    console.log("Profile updated:", updatedUser);
    setIsEditing(false);

    // This part is just to show the data has "persisted" in our dummy data.
    const userIndex = users.findIndex(u => u.id === USER_ID_TO_EDIT);
    if(userIndex !== -1) {
      users[userIndex] = updatedUser;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Image
                src={user.avatar}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full border-4 border-white shadow-lg"
                unoptimized
              />
              <div>
                <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
                <p className="text-lg text-purple-600">{user.mbti}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Bio</h4>
                <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
              </div>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg mb-2">Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-medium">Gender</label>
                      {isEditing ? (
                         <Select onValueChange={(value) => form.setValue('gender', value as 'male'|'female'|'other')} defaultValue={form.getValues('gender')}>
                           <SelectTrigger>
                             <SelectValue placeholder="Select gender" />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="male">Male</SelectItem>
                             <SelectItem value="female">Female</SelectItem>
                             <SelectItem value="other">Other</SelectItem>
                           </SelectContent>
                         </Select>
                      ) : (
                        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md capitalize">{user.gender}</p>
                      )}
                      {form.formState.errors.gender && <p className="text-red-500 text-xs mt-1">{form.formState.errors.gender.message}</p>}
                    </div>
                     <div>
                      <label className="font-medium">Country</label>
                      {isEditing ? (
                        <Input {...form.register('country')} placeholder="Country" />
                      ) : (
                        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{user.country}</p>
                      )}
                      {form.formState.errors.country && <p className="text-red-500 text-xs mt-1">{form.formState.errors.country.message}</p>}
                    </div>
                     <div>
                      <label className="font-medium">State/Province</label>
                      {isEditing ? (
                        <Input {...form.register('state')} placeholder="State" />
                      ) : (
                        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{user.state}</p>
                      )}
                      {form.formState.errors.state && <p className="text-red-500 text-xs mt-1">{form.formState.errors.state.message}</p>}
                    </div>
                     <div>
                      <label className="font-medium">City</label>
                      {isEditing ? (
                        <Input {...form.register('city')} placeholder="City" />
                      ) : (
                        <p className="p-2 bg-gray-100 dark:bg-gray-800 rounded-md">{user.city}</p>
                      )}
                      {form.formState.errors.city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.city.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                      <Button type="submit">Save Changes</Button>
                    </>
                  ) : (
                    <Button type="button" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 