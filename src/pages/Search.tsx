
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import SearchFilters from '@/components/SearchFilters';
import ManhwaGrid from '@/components/ManhwaGrid';

const Search: React.FC = () => {
  const { 
    filteredManhwaList, 
    searchManhwa, 
    filterManhwa, 
    currentFilters,
    clearFilters 
  } = useManhwa();

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Search Manhwas</h1>
        <p className="text-muted-foreground">
          Find your favorite manhwas by title, author, genre, and more
        </p>
      </header>
      
      <div className="mb-6">
        <SearchFilters 
          onSearch={searchManhwa}
          onFilter={filterManhwa}
          currentFilters={currentFilters}
          onClearFilters={clearFilters}
        />
      </div>
      
      <div>
        <ManhwaGrid 
          manhwas={filteredManhwaList} 
          emptyMessage="No manhwas found matching your search criteria."
        />
      </div>
    </div>
  );
};

export default Search;
