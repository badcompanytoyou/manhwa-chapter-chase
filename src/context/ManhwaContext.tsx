
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Manhwa, ManhwaChapter } from '@/types';
import { mockManhwaData } from '@/data/mockData';
import { toast } from 'sonner';

interface ManhwaContextType {
  manhwaList: Manhwa[];
  filteredManhwaList: Manhwa[];
  setManhwaList: React.Dispatch<React.SetStateAction<Manhwa[]>>;
  addManhwa: (manhwa: Manhwa) => void;
  removeManhwa: (id: string) => void;
  updateManhwa: (manhwa: Manhwa) => void;
  markChapterAsRead: (manhwaId: string, chapterId: string, isRead: boolean) => void;
  searchManhwa: (query: string) => void;
  filterManhwa: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  clearFilters: () => void;
}

export interface FilterOptions {
  query: string;
  gender: string[];
  categories: string[];
  country: string[];
  releaseDay: string[];
}

const initialFilters: FilterOptions = {
  query: '',
  gender: [],
  categories: [],
  country: [],
  releaseDay: [],
};

const ManhwaContext = createContext<ManhwaContextType | undefined>(undefined);

export const ManhwaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [manhwaList, setManhwaList] = useState<Manhwa[]>([]);
  const [filteredManhwaList, setFilteredManhwaList] = useState<Manhwa[]>([]);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>(initialFilters);

  useEffect(() => {
    // Load mock data on first render
    setManhwaList(mockManhwaData);
    setFilteredManhwaList(mockManhwaData);
  }, []);

  // Add a new manhwa to the list
  const addManhwa = (manhwa: Manhwa) => {
    setManhwaList((prev) => [...prev, manhwa]);
    toast.success(`Added ${manhwa.title} to your library`);
  };

  // Remove a manhwa from the list
  const removeManhwa = (id: string) => {
    const manhwaToRemove = manhwaList.find(m => m.id === id);
    setManhwaList((prev) => prev.filter((manhwa) => manhwa.id !== id));
    if (manhwaToRemove) {
      toast.success(`Removed ${manhwaToRemove.title} from your library`);
    }
  };

  // Update a manhwa's details
  const updateManhwa = (updatedManhwa: Manhwa) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => (manhwa.id === updatedManhwa.id ? updatedManhwa : manhwa))
    );
  };

  // Mark a chapter as read/unread
  const markChapterAsRead = (manhwaId: string, chapterId: string, isRead: boolean) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          const updatedChapters = manhwa.chapters.map((chapter) =>
            chapter.id === chapterId ? { ...chapter, isRead } : chapter
          );
          return { ...manhwa, chapters: updatedChapters };
        }
        return manhwa;
      })
    );
  };

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
  const clearFilters = () => {
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

  const value = {
    manhwaList,
    filteredManhwaList,
    setManhwaList,
    addManhwa,
    removeManhwa,
    updateManhwa,
    markChapterAsRead,
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
