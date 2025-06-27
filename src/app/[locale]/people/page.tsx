'use client';

import { useState, ChangeEvent, useMemo, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { users, User } from '@/lib/dummyUsers';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


const ITEMS_PER_PAGE = 6;

function UserCard({ user }: { user: User }) {
  const t = useTranslations('people');

  return (
    <Card className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <CardContent className="p-4 flex items-start space-x-4">
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src={user.avatar}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200 object-cover w-full h-full"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h3>
          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{user.mbti}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{user.bio}</p>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {user.city}, {user.state}, {user.country}
          </div>
          <Button size="sm" className="mt-2">
            <MessageSquare className="w-4 h-4 mr-2" />
            {t('message')}
          </Button>
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
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return (appliedFilters.mbti === 'all' ? true : user.mbti.startsWith(appliedFilters.mbti)) &&
             (appliedFilters.country === 'all' ? true : user.country === appliedFilters.country) &&
             (appliedFilters.state === 'all' ? true : user.state === appliedFilters.state) &&
             (appliedFilters.city === 'all' ? true : user.city === appliedFilters.city) &&
             (appliedFilters.gender === 'all' ? true : user.gender === appliedFilters.gender) &&
             (appliedFilters.searchTerm ? user.name.toLowerCase().includes(appliedFilters.searchTerm.toLowerCase()) : true);
    });
  }, [appliedFilters]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const uniqueMbti = Array.from(new Set(users.map(u => u.mbti)));
  const uniqueCountries = Array.from(new Set(users.map(user => user.country)));
  const uniqueStates = Array.from(new Set(users.filter(user => filters.country === 'all' || user.country === filters.country).map(user => user.state)));
  const uniqueCities = Array.from(new Set(users.filter(user => (filters.country === 'all' || user.country === filters.country) && (filters.state === 'all' || user.state === filters.state)).map(user => user.city)));

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
    setFilters(prev => {
      const newFilters = {...prev, [filterName]: value};
      // Reset dependent filters
      if (filterName === 'country') {
        newFilters.state = 'all';
        newFilters.city = 'all';
      }
      if (filterName === 'state') {
        newFilters.city = 'all';
      }
      return newFilters;
    });
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
                  {uniqueMbti.map(mbti => (
                    <SelectItem key={mbti} value={mbti}>{mbti}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.gender} onValueChange={(v) => handleFilterChange('gender', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_gender')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_genders')}</SelectItem>
                  <SelectItem value="male">{t('male')}</SelectItem>
                  <SelectItem value="female">{t('female')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.country} onValueChange={(v) => handleFilterChange('country', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_country')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_countries')}</SelectItem>
                  {uniqueCountries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.state} onValueChange={(v) => handleFilterChange('state', v)} disabled={filters.country === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_state')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_states')}</SelectItem>
                  {uniqueStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.city} onValueChange={(v) => handleFilterChange('city', v)} disabled={filters.state === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-200 transition-colors">
                  <SelectValue placeholder={t('filter_by_city')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_cities')}</SelectItem>
                  {uniqueCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
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
              paginatedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))
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
                    onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href="#"
                      onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(i + 1); }}
                      isActive={currentPage === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
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