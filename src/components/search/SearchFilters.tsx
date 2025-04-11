
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Calendar, 
  Globe, 
  Tag, 
  Users,
} from 'lucide-react';
import { 
  getAllCategories, 
  getAllCountries, 
  getAllGenders, 
  getAllWeekdays 
} from '@/data/mockData';
import { FilterOptions } from '@/context/types';
import SearchInput from './SearchInput';
import FilterGroup from './FilterGroup';
import FilterBadges from './FilterBadges';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilter,
  currentFilters,
  onClearFilters
}) => {
  const [searchInput, setSearchInput] = useState(currentFilters.query);
  const [filters, setFilters] = useState<FilterOptions>(currentFilters);
  
  // Get filter options
  const categories = getAllCategories();
  const countries = getAllCountries();
  const genders = getAllGenders();
  const weekdays = getAllWeekdays();
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setFilters(prev => ({ ...prev, query: value }));
    onSearch(value);
  };
  
  // Handle filter changes
  const handleFilterChange = (
    type: keyof FilterOptions, 
    value: string,
    checked: boolean
  ) => {
    if (type === 'query') {
      setFilters(prev => ({ ...prev, [type]: value }));
    } else {
      setFilters(prev => {
        const currentValues = prev[type] as string[];
        let newValues;
        
        if (checked) {
          newValues = [...currentValues, value];
        } else {
          newValues = currentValues.filter(v => v !== value);
        }
        
        return { ...prev, [type]: newValues };
      });
    }
  };
  
  // Apply filters
  const applyFilters = () => {
    onFilter(filters);
  };
  
  // Clear a single filter
  const clearFilter = (type: keyof FilterOptions, value?: string) => {
    if (value) {
      setFilters(prev => ({
        ...prev,
        [type]: (prev[type] as string[]).filter(v => v !== value)
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [type]: type === 'query' ? '' : []
      }));
    }
  };
  
  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (filters.query) count++;
    count += filters.gender.length;
    count += filters.categories.length;
    count += filters.country.length;
    count += filters.releaseDay.length;
    return count;
  };
  
  // Apply filters and then clear them in UI
  const handleClearAllFilters = () => {
    setSearchInput('');
    setFilters({
      query: '',
      gender: [],
      categories: [],
      country: [],
      releaseDay: [],
    });
    onClearFilters();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Search input */}
        <SearchInput 
          value={searchInput}
          onChange={handleSearchChange}
        />
        
        {/* Filters popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              <span>Filters</span>
              {countActiveFilters() > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {countActiveFilters()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Filter Manhwas</h3>
              
              {/* Gender filter */}
              <div>
                <FilterGroup
                  title="Gender"
                  icon={Users}
                  options={genders}
                  selectedValues={filters.gender}
                  onChange={(value, checked) => handleFilterChange('gender', value, checked)}
                />
              </div>
              
              {/* Categories filter */}
              <div>
                <FilterGroup
                  title="Categories"
                  icon={Tag}
                  options={categories}
                  selectedValues={filters.categories}
                  onChange={(value, checked) => handleFilterChange('categories', value, checked)}
                />
              </div>
              
              {/* Country filter */}
              <div>
                <FilterGroup
                  title="Country"
                  icon={Globe}
                  options={countries}
                  selectedValues={filters.country}
                  onChange={(value, checked) => handleFilterChange('country', value, checked)}
                />
              </div>
              
              {/* Release Day filter */}
              <div>
                <FilterGroup
                  title="Release Day"
                  icon={Calendar}
                  options={weekdays}
                  selectedValues={filters.releaseDay}
                  onChange={(value, checked) => handleFilterChange('releaseDay', value, checked)}
                />
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearAllFilters}
                >
                  Clear all
                </Button>
                <Button onClick={applyFilters}>Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {/* Active filters */}
      {countActiveFilters() > 0 && (
        <FilterBadges 
          filters={filters} 
          onClearFilter={clearFilter}
          onFilterUpdate={onFilter}
        />
      )}
    </div>
  );
};

export default SearchFilters;
