import PeoplePageClient from '@/components/people/PeoplePageClient';
import { APP_URL } from '@/lib/constants';

async function getUsersData() {
  const res = await fetch(`${APP_URL}/api/users`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch users data');
  }
  
  return res.json();
}

export default async function PeoplePage() {
  const { users, filters } = await getUsersData();

  return <PeoplePageClient initialUsers={users} initialFilters={filters} />;
}