import PeoplePageClient from '@/components/people/PeoplePageClient';
import { getUsersAndFilters } from '@/lib/data';

export default async function PeoplePage() {
  const { users, filters } = await getUsersAndFilters();

  return <PeoplePageClient initialUsers={users} initialFilters={filters} />;
}