import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { 
  Filter, 
  Calendar, 
  Globe, 
  Tag, 
  Users, 
  X,
  Search 
} from 'lucide-react';
import { 
  getAllCategories, 
  getAllCountries, 
  getAllGenders, 
  getAllWeekdays 
} from '@/data/mockData';
import { FilterOptions } from '@/context/types';

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
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by title, author, or illustrator..."
            value={searchInput}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
        
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>Gender</span>
                      </div>
                      {filters.gender.length > 0 && (
                        <Badge variant="secondary">
                          {filters.gender.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Gender</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {genders.map(gender => (
                      <DropdownMenuCheckboxItem
                        key={gender}
                        checked={filters.gender.includes(gender)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('gender', gender, checked)
                        }
                      >
                        {gender}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Categories filter */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Tag size={16} />
                        <span>Categories</span>
                      </div>
                      {filters.categories.length > 0 && (
                        <Badge variant="secondary">
                          {filters.categories.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="max-h-60 overflow-y-auto">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map(category => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('categories', category, checked)
                        }
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Country filter */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Globe size={16} />
                        <span>Country</span>
                      </div>
                      {filters.country.length > 0 && (
                        <Badge variant="secondary">
                          {filters.country.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Country</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {countries.map(country => (
                      <DropdownMenuCheckboxItem
                        key={country}
                        checked={filters.country.includes(country)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('country', country, checked)
                        }
                      >
                        {country}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Release Day filter */}
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full flex justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>Release Day</span>
                      </div>
                      {filters.releaseDay.length > 0 && (
                        <Badge variant="secondary">
                          {filters.releaseDay.length}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Release Day</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {weekdays.map(day => (
                      <DropdownMenuCheckboxItem
                        key={day}
                        checked={filters.releaseDay.includes(day)}
                        onCheckedChange={(checked) => 
                          handleFilterChange('releaseDay', day, checked)
                        }
                      >
                        {day}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
        <div className="flex flex-wrap gap-2">
          {filters.query && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <span>Search: {filters.query}</span>
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => {
                  clearFilter('query');
                  setSearchInput('');
                  onSearch('');
                }}
              />
            </Badge>
          )}
          
          {filters.gender.map(gender => (
            <Badge key={gender} variant="secondary" className="flex items-center gap-1">
              <span>{gender}</span>
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => {
                  clearFilter('gender', gender);
                  onFilter({...filters, gender: filters.gender.filter(g => g !== gender)});
                }}
              />
            </Badge>
          ))}
          
          {filters.categories.map(category => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              <span>{category}</span>
              <X 
                size={14}
                className="cursor-pointer"
                onClick={() => {
                  clearFilter('categories', category);
                  onFilter({...filters, categories: filters.categories.filter(c => c !== category)});
                }}
              />
            </Badge>
          ))}
          
          {filters.country.map(country => (
            <Badge key={country} variant="secondary" className="flex items-center gap-1">
              <span>{country}</span>
              <X 
                size={14}
                className="cursor-pointer"
                onClick={() => {
                  clearFilter('country', country);
                  onFilter({...filters, country: filters.country.filter(c => c !== country)});
                }}
              />
            </Badge>
          ))}
          
          {filters.releaseDay.map(day => (
            <Badge key={day} variant="secondary" className="flex items-center gap-1">
              <span>{day}</span>
              <X 
                size={14}
                className="cursor-pointer"
                onClick={() => {
                  clearFilter('releaseDay', day);
                  onFilter({...filters, releaseDay: filters.releaseDay.filter(d => d !== day)});
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
