'use client';

import { useState, useMemo } from 'react';
import type { Business } from '@/lib/types';
import { BusinessCard } from '@/components/app/business-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type BusinessListingsProps = {
  initialBusinesses: Business[];
};

const CITIES = ['All', 'Pune', 'Nagpur', 'Mumbai'];
const CATEGORIES = ['All', 'Restaurant', 'Electronics', 'Medical', 'Clothing', 'Services'];

export default function BusinessListings({ initialBusinesses }: BusinessListingsProps) {
  const [businesses] = useState(initialBusinesses);
  const [searchTerm, setSearchTerm] = useState('');
  const [city, setCity] = useState('All');
  const [category, setCategory] = useState('All');
  
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter(b => city === 'All' || b.city === city)
      .filter(b => category === 'All' || b.category === category)
      .filter(b => b.businessName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [businesses, city, category, searchTerm]);

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 p-6 bg-card rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="relative lg:col-span-2">
            <label htmlFor="search" className="text-sm font-medium text-muted-foreground mb-1 block">Search</label>
            <Search className="absolute left-3 bottom-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by business name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-1 block">City</label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
             <label className="text-sm font-medium text-muted-foreground mb-1 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    {CATEGORIES.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <h2 className="text-2xl font-semibold text-foreground">No Businesses Found</h2>
          <p className="mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}
