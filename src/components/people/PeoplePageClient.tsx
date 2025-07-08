'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Loader2 } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

// Define the User type based on what the API returns
export interface User {
  id: string;
  name: string | null;
  image: string | null;
  mbti: string | null;
  bio: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  gender: string | null;
}

const ITEMS_PER_PAGE = 6;

function UserCard({ user }: { user: User }) {
  const t = useTranslations('people');
  const locale = useLocale();
  const { data: session } = useSession();

  const isProfileComplete = 
    session?.user?.gender &&
    session?.user?.country &&
    session?.user?.state &&
    session?.user?.city;
  
  const messageHref = isProfileComplete 
    ? `/${locale}/messages?receiverId=${user.id}` 
    : `/${locale}/profile?from=messaging`;

  return (
    <Card className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <CardContent className="p-4 flex items-start space-x-4">
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src={user.image || '/logo.png'}
            alt={user.name || 'User Avatar'}
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200 object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name || 'Anonymous User'}</h3>
          {user.mbti && <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{user.mbti}</p>}
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-12 overflow-hidden">{user.bio}</p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {[user.city, user.state, user.country].filter(Boolean).join(', ')}
          </div>
          <Link href={messageHref} passHref>
            <Button size="sm" className="mt-2">
              <MessageSquare className="w-4 h-4 mr-2" />
              {t('message')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

const initialFilters = {
  mbti: 'all',
  country: 'all',
  state: 'all',
  city: 'all',
  gender: 'all',
  searchTerm: '',
};

interface PeoplePageClientProps {
    initialUsers: User[];
    initialFilters: {
        mbti: string[];
        countries: string[];
        states: string[];
        cities: string[];
        genders: string[];
    }
}

export default function PeoplePageClient({ initialUsers, initialFilters: fetchedFilters }: PeoplePageClientProps) {
  const t = useTranslations('people');
  const [allUsers, setAllUsers] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState(fetchedFilters);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      return (appliedFilters.mbti === 'all' ? true : user.mbti?.startsWith(appliedFilters.mbti)) &&
             (appliedFilters.country === 'all' ? true : user.country === appliedFilters.country) &&
             (appliedFilters.state === 'all' ? true : user.state === appliedFilters.state) &&
             (appliedFilters.city === 'all' ? true : user.city === appliedFilters.city) &&
             (appliedFilters.gender === 'all' ? true : user.gender === appliedFilters.gender) &&
             (appliedFilters.searchTerm ? user.name?.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase()) : true);
    });
  }, [appliedFilters, allUsers]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = () => {
    setCurrentPage(1);
    setAppliedFilters(filters);
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({...prev, [filterName]: value}));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <Input
                type="text"
                placeholder={t('search_by_name')}
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="lg:col-span-2 focus:ring-blue-500 hover:bg-blue-200 transition-colors"
              />
              <Select value={filters.mbti} onValueChange={(v) => handleFilterChange('mbti', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_mbti')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_mbti')}</SelectItem>
                  {filterOptions.mbti.map(mbti => <SelectItem key={mbti} value={mbti}>{mbti}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.gender} onValueChange={(v) => handleFilterChange('gender', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_gender')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_genders')}</SelectItem>
                  {filterOptions.genders.map(gender => <SelectItem key={gender} value={gender}>{gender}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.country} onValueChange={(v) => handleFilterChange('country', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_country')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_countries')}</SelectItem>
                  {filterOptions.countries.map(country => <SelectItem key={country} value={country}>{country}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={filters.state} onValueChange={(v) => handleFilterChange('state', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_state')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_states')}</SelectItem>
                  {filterOptions.states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                </SelectContent>
              </Select>
               <Select value={filters.city} onValueChange={(v) => handleFilterChange('city', v)}>
                 <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                   <SelectValue placeholder={t('filter_by_city')} />
                 </SelectTrigger>
                 <SelectContent className="bg-white dark:bg-gray-700">
                   <SelectItem value="all">{t('all_cities')}</SelectItem>
                   {filterOptions.cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                 </SelectContent>
               </Select>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">{t('search')}</Button>
              <Button onClick={handleClear} variant="outline">{t('clear')}</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      onClick={() => handlePageChange(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
    </div>
  );
} 