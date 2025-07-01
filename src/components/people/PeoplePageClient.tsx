'use client';

import { useState, useEffect, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
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
} from "@/components/ui/pagination"
import { Country, State, City } from 'country-state-city';

const ALL_MBTI_TYPES = [
  'INTJ-A', 'INTJ-T', 'INTP-A', 'INTP-T', 'ENTJ-A', 'ENTJ-T', 'ENTP-A', 'ENTP-T',
  'INFJ-A', 'INFJ-T', 'INFP-A', 'INFP-T', 'ENFJ-A', 'ENFJ-T', 'ENFP-A', 'ENFP-T',
  'ISTJ-A', 'ISTJ-T', 'ISFJ-A', 'ISFJ-T', 'ESTJ-A', 'ESTJ-T', 'ESFJ-A', 'ESFJ-T',
  'ISTP-A', 'ISTP-T', 'ISFP-A', 'ISFP-T', 'ESTP-A', 'ESTP-T', 'ESFP-A', 'ESFP-T'
];

const ALL_GENDERS = ['male', 'female', 'other'];

// Manually define User type based on schema.prisma
// This avoids issues with Prisma client generation paths
export type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    password?: string | null;
    mbti: string | null;
    bio: string | null;
    gender: string | null;
    country: string | null;
    state: string | null;
    city: string | null;
};

const ITEMS_PER_PAGE = 6;

function UserCard({ user }: { user: User }) {
  const t = useTranslations('people');
  const location = [user.city, user.state, user.country].filter(Boolean).join(', ');

  return (
    <Card className="overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out">
      <CardContent className="p-4 flex items-start space-x-4">
        <div className="w-20 h-20 flex-shrink-0">
          <Image
            src={user.image || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
            alt={user.name || 'User avatar'}
            width={128}
            height={128}
            className="rounded-full w-full h-full object-cover border-2 border-gray-200"
            unoptimized
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h3>
          <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">{user.mbti}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{user.bio}</p>
          {location && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {location}
            </div>
          )}
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

interface PeoplePageClientProps {
    initialUsers: User[];
}

export default function PeoplePageClient({ initialUsers }: PeoplePageClientProps) {
  const t = useTranslations('people');
  const [filters, setFilters] = useState(initialFilters);
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (filters.country && filters.country !== 'all') {
      setStates(State.getStatesOfCountry(filters.country));
    } else {
      setStates([]);
    }
    setCities([]);
  }, [filters.country]);
  
  useEffect(() => {
    if (filters.country && filters.state && filters.state !== 'all') {
      setCities(City.getCitiesOfState(filters.country, filters.state));
    } else {
      setCities([]);
    }
  }, [filters.country, filters.state]);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearch = async () => {
    setCurrentPage(1);
    setIsLoading(true);
    const queryParams = new URLSearchParams();
    if(filters.mbti !== 'all') queryParams.append('mbti', filters.mbti);
    if(filters.gender !== 'all') queryParams.append('gender', filters.gender);
    if(filters.country !== 'all') queryParams.append('country', Country.getCountryByCode(filters.country)?.name || '');
    if(filters.state !== 'all') queryParams.append('state', State.getStateByCodeAndCountry(filters.state, filters.country)?.name || '');
    if(filters.city !== 'all') queryParams.append('city', filters.city);
    if(filters.searchTerm) queryParams.append('name', filters.searchTerm);
    
    try {
      const response = await fetch(`/api/users/search?${queryParams.toString()}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      // You might want to show an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFilters(initialFilters);
    setUsers(initialUsers);
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
                className="lg:col-span-2 focus:ring-blue-500 hover:bg-blue-100 transition-colors"
              />
              <Select value={filters.mbti} onValueChange={(v) => handleFilterChange('mbti', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-100 transition-colors">
                  <SelectValue placeholder={t('filter_by_mbti')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_mbti')}</SelectItem>
                  {ALL_MBTI_TYPES.map(mbti => (
                    <SelectItem key={mbti} value={mbti}>{mbti}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.gender} onValueChange={(v) => handleFilterChange('gender', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-100 transition-colors">
                  <SelectValue placeholder={t('filter_by_gender')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700">
                  <SelectItem value="all">{t('all_genders')}</SelectItem>
                  {ALL_GENDERS.map(gender => (
                      <SelectItem key={gender} value={gender}>{t(gender)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.country} onValueChange={(v) => handleFilterChange('country', v)}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-100 transition-colors">
                  <SelectValue placeholder={t('filter_by_country')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 max-h-60">
                  <SelectItem value="all">{t('all_countries')}</SelectItem>
                  {countries.map(country => (
                    <SelectItem key={country.isoCode} value={country.isoCode}>{country.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.state} onValueChange={(v) => handleFilterChange('state', v)} disabled={filters.country === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-100 transition-colors">
                  <SelectValue placeholder={t('filter_by_state')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 max-h-60">
                  <SelectItem value="all">{t('all_states')}</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state.isoCode} value={state.isoCode}>{state.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.city} onValueChange={(v) => handleFilterChange('city', v)} disabled={filters.state === 'all'}>
                <SelectTrigger className="focus:ring-blue-500 hover:bg-blue-100 transition-colors">
                  <SelectValue placeholder={t('filter_by_city')} />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 max-h-60">
                  <SelectItem value="all">{t('all_cities')}</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleClear} className="hover:bg-blue-100 transition-colors">{t('clear')}</Button>
              <Button onClick={handleSearch} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('search')}
              </Button>
            </div>
          </div>
          
          {isLoading ? (
             <div className="flex justify-center items-center min-h-[40vh]">
              <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
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
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                    
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            isActive={currentPage === i + 1}
                            onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(i + 1); }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e: MouseEvent) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
} 