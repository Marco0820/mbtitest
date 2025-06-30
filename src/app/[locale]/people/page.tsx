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
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 h-12 overflow-hidden">{user.bio || 'No bio available.'}</p>
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

export default function PeoplePage() {
  const t = useTranslations('people');
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState<{
    mbti: string[];
    countries: string[];
    states: string[];
    cities: string[];
    genders: string[];
  }>({
    mbti: [],
    countries: [],
    states: [],
    cities: [],
    genders: [],
  });
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const { users, filters: fetchedFilters } = await response.json();
        setAllUsers(users);
        setFilterOptions(fetchedFilters);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

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
  
  if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
        </div>
      )
  }

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
                  {filterOptions.genders.map(gender => <SelectItem key={gender} value={gender}>{t(gender.toLowerCase())}</SelectItem>)}
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

              <Select value={filters.state} onValueChange={(v) => handleFilterChange('state', v)} disabled={filters.country === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_state')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_states')}</SelectItem>
                   {Array.from(new Set(allUsers.filter(u => u.country === filters.country).map(u => u.state).filter(Boolean))).map(state => <SelectItem key={state} value={state!}>{state}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select value={filters.city} onValueChange={(v) => handleFilterChange('city', v)} disabled={filters.state === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_city')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_cities')}</SelectItem>
                   {Array.from(new Set(allUsers.filter(u => u.state === filters.state).map(u => u.city).filter(Boolean))).map(city => <SelectItem key={city} value={city!}>{city}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClear} className="hover:bg-blue-200 transition-colors">{t('clear')}</Button>
              <Button onClick={handleSearch} className="bg-blue-600 text-white hover:bg-blue-700">{t('search')}</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => <UserCard key={user.id} user={user} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-gray-500">{t('no_users_found')}</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#"
                      onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
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