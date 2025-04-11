
import { Manhwa } from '@/types';
import { FilterOptions } from '@/context/types';

export const useSearchAndFilter = (
  manhwaList: Manhwa[],
  setFilteredManhwaList: React.Dispatch<React.SetStateAction<Manhwa[]>>,
  currentFilters: FilterOptions,
  setCurrentFilters: React.Dispatch<React.SetStateAction<FilterOptions>>
) => {
  // Search function
  const searchManhwa = (query: string) => {
    setCurrentFilters((prev) => ({ ...prev, query }));
    applyFilters({ ...currentFilters, query });
  };

  // Filter function
  const filterManhwa = (filters: FilterOptions) => {
    setCurrentFilters(filters);
    applyFilters(filters);
  };

  // Clear all filters
  const clearFilters = (initialFilters: FilterOptions) => {
    setCurrentFilters(initialFilters);
    setFilteredManhwaList(manhwaList);
  };

  // Apply all filters
  const applyFilters = (filters: FilterOptions) => {
    let filtered = [...manhwaList];

    // Apply text search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(
        (manhwa) =>
          manhwa.title.toLowerCase().includes(query) ||
          manhwa.author.toLowerCase().includes(query) ||
          manhwa.illustrator.toLowerCase().includes(query)
      );
    }

    // Apply gender filter
    if (filters.gender.length > 0) {
      filtered = filtered.filter((manhwa) => 
        filters.gender.includes(manhwa.gender)
      );
    }

    // Apply categories filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((manhwa) =>
        manhwa.categories.some((category) => filters.categories.includes(category))
      );
    }

    // Apply country filter
    if (filters.country.length > 0) {
      filtered = filtered.filter((manhwa) => 
        filters.country.includes(manhwa.country)
      );
    }

    // Apply release day filter
    if (filters.releaseDay.length > 0) {
      filtered = filtered.filter((manhwa) => 
        filters.releaseDay.includes(manhwa.releaseDay)
      );
    }

    setFilteredManhwaList(filtered);
  };

  return {
    searchManhwa,
    filterManhwa,
    clearFilters,
    applyFilters
  };
};
