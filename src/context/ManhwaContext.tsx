
import React, { createContext, useContext, useEffect } from 'react';
import { Manhwa } from '@/types';
import { mockManhwaData } from '@/data/mockData';
import { ManhwaContextType, initialFilters } from './types';
import { useManhwaActions } from '@/hooks/useManhwaActions';
import { useReadingStatusActions } from '@/hooks/useReadingStatusActions';
import { useSearchAndFilter } from '@/hooks/useSearchAndFilter';

const ManhwaContext = createContext<ManhwaContextType | undefined>(undefined);

export const ManhwaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    manhwaList,
    setManhwaList,
    filteredManhwaList,
    setFilteredManhwaList,
    currentFilters,
    setCurrentFilters,
    addManhwa,
    removeManhwa,
    updateManhwa,
    markChapterAsRead
  } = useManhwaActions();

  const {
    markManhwaAsReading,
    markManhwaAsRereading,
    markManhwaAsDropped,
    markManhwaAsPlanToRead,
    toggleFavorite,
    markManhwaAsOnHold
  } = useReadingStatusActions(manhwaList, setManhwaList);

  const {
    searchManhwa,
    filterManhwa,
    clearFilters: clearFiltersBase
  } = useSearchAndFilter(manhwaList, setFilteredManhwaList, currentFilters, setCurrentFilters);

  // Clear filters wrapper
  const clearFilters = () => clearFiltersBase(initialFilters);

  useEffect(() => {
    // Load mock data on first render
    setManhwaList(mockManhwaData);
    setFilteredManhwaList(mockManhwaData);
  }, []);

  const value = {
    manhwaList,
    filteredManhwaList,
    setManhwaList,
    addManhwa,
    removeManhwa,
    updateManhwa,
    markChapterAsRead,
    markManhwaAsReading,
    markManhwaAsRereading,
    markManhwaAsDropped,
    markManhwaAsPlanToRead,
    toggleFavorite,
    markManhwaAsOnHold,
    searchManhwa,
    filterManhwa,
    currentFilters,
    clearFilters,
  };

  return <ManhwaContext.Provider value={value}>{children}</ManhwaContext.Provider>;
};

export const useManhwa = () => {
  const context = useContext(ManhwaContext);
  if (context === undefined) {
    throw new Error('useManhwa must be used within a ManhwaProvider');
  }
  return context;
};
