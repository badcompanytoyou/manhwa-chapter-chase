
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { FilterOptions } from '@/context/types';

interface FilterBadgesProps {
  filters: FilterOptions;
  onClearFilter: (type: keyof FilterOptions, value?: string) => void;
  onFilterUpdate: (updatedFilters: FilterOptions) => void;
}

const FilterBadges: React.FC<FilterBadgesProps> = ({
  filters,
  onClearFilter,
  onFilterUpdate
}) => {
  // Helper to remove a specific filter and apply update
  const removeFilter = (type: keyof FilterOptions, value?: string) => {
    onClearFilter(type, value);
    
    if (type === 'query' && !value) {
      // Clear search query
      onFilterUpdate({...filters, query: ''});
    } else if (value) {
      // Remove specific array filter
      onFilterUpdate({
        ...filters, 
        [type]: (filters[type] as string[]).filter(v => v !== value)
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.query && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>Search: {filters.query}</span>
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => removeFilter('query')}
          />
        </Badge>
      )}
      
      {filters.gender.map(gender => (
        <Badge key={gender} variant="secondary" className="flex items-center gap-1">
          <span>{gender}</span>
          <X 
            size={14} 
            className="cursor-pointer" 
            onClick={() => removeFilter('gender', gender)}
          />
        </Badge>
      ))}
      
      {filters.categories.map(category => (
        <Badge key={category} variant="secondary" className="flex items-center gap-1">
          <span>{category}</span>
          <X 
            size={14}
            className="cursor-pointer"
            onClick={() => removeFilter('categories', category)}
          />
        </Badge>
      ))}
      
      {filters.country.map(country => (
        <Badge key={country} variant="secondary" className="flex items-center gap-1">
          <span>{country}</span>
          <X 
            size={14}
            className="cursor-pointer"
            onClick={() => removeFilter('country', country)}
          />
        </Badge>
      ))}
      
      {filters.releaseDay.map(day => (
        <Badge key={day} variant="secondary" className="flex items-center gap-1">
          <span>{day}</span>
          <X 
            size={14}
            className="cursor-pointer"
            onClick={() => removeFilter('releaseDay', day)}
          />
        </Badge>
      ))}
    </div>
  );
};

export default FilterBadges;
