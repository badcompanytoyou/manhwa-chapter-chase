
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
  markManhwaAsReading: (manhwaId: string, isReading: boolean) => void;
  markManhwaAsRereading: (manhwaId: string, isRereading: boolean) => void;
  markManhwaAsDropped: (manhwaId: string, isDropped: boolean, note?: string) => void;
  markManhwaAsPlanToRead: (manhwaId: string, isPlanToRead: boolean) => void;
  toggleFavorite: (manhwaId: string) => void;
  markManhwaAsOnHold: (manhwaId: string, isOnHold: boolean) => void;
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
            chapter.id === chapterId ? { 
              ...chapter, 
              isRead,
              lastReadAt: isRead ? new Date() : chapter.lastReadAt 
            } : chapter
          );
          return { ...manhwa, chapters: updatedChapters };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    const chapter = manhwa?.chapters.find(c => c.id === chapterId);
    
    if (manhwa && chapter) {
      if (isRead) {
        toast.success(`Marked Chapter ${chapter.number} of ${manhwa.title} as read`);
      } else {
        toast.success(`Marked Chapter ${chapter.number} of ${manhwa.title} as unread`);
      }
    }
  };

  // Mark manhwa as reading
  const markManhwaAsReading = (manhwaId: string, isReading: boolean) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          return { 
            ...manhwa, 
            reading: isReading,
            // Reset other statuses if setting to reading
            planToRead: isReading ? false : manhwa.planToRead,
            onHold: isReading ? false : manhwa.onHold,
            dropped: isReading ? false : manhwa.dropped,
            rereading: false
          };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa && isReading) {
      toast.success(`Added ${manhwa.title} to your reading list`);
    }
  };

  // Mark manhwa as re-reading
  const markManhwaAsRereading = (manhwaId: string, isRereading: boolean) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          return { 
            ...manhwa, 
            rereading: isRereading,
            reading: isRereading || manhwa.reading,
            // Reset other statuses if setting to rereading
            planToRead: isRereading ? false : manhwa.planToRead,
            onHold: isRereading ? false : manhwa.onHold,
            dropped: isRereading ? false : manhwa.dropped
          };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa && isRereading) {
      toast.success(`Added ${manhwa.title} to your re-reading list`);
    }
  };

  // Mark manhwa as dropped
  const markManhwaAsDropped = (manhwaId: string, isDropped: boolean, note?: string) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          return { 
            ...manhwa, 
            dropped: isDropped,
            dropNote: isDropped ? note || manhwa.dropNote : undefined,
            // Reset other statuses if setting to dropped
            reading: isDropped ? false : manhwa.reading,
            planToRead: isDropped ? false : manhwa.planToRead,
            onHold: isDropped ? false : manhwa.onHold,
            rereading: isDropped ? false : manhwa.rereading
          };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa && isDropped) {
      toast.success(`Marked ${manhwa.title} as dropped`);
    }
  };

  // Mark manhwa as plan to read
  const markManhwaAsPlanToRead = (manhwaId: string, isPlanToRead: boolean) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          return { 
            ...manhwa, 
            planToRead: isPlanToRead,
            // Reset other statuses if setting to plan to read
            reading: isPlanToRead ? false : manhwa.reading,
            onHold: isPlanToRead ? false : manhwa.onHold,
            dropped: isPlanToRead ? false : manhwa.dropped,
            rereading: isPlanToRead ? false : manhwa.rereading
          };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa && isPlanToRead) {
      toast.success(`Added ${manhwa.title} to your plan to read list`);
    }
  };

  // Toggle favorite status
  const toggleFavorite = (manhwaId: string) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          const newValue = !manhwa.favorite;
          return { ...manhwa, favorite: newValue };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa) {
      const newValue = !manhwa.favorite;
      if (newValue) {
        toast.success(`Added ${manhwa.title} to your favorites`);
      } else {
        toast.success(`Removed ${manhwa.title} from your favorites`);
      }
    }
  };

  // Mark manhwa as on hold
  const markManhwaAsOnHold = (manhwaId: string, isOnHold: boolean) => {
    setManhwaList((prev) =>
      prev.map((manhwa) => {
        if (manhwa.id === manhwaId) {
          return { 
            ...manhwa, 
            onHold: isOnHold,
            // Reset other statuses if setting to on hold
            reading: isOnHold ? false : manhwa.reading,
            planToRead: isOnHold ? false : manhwa.planToRead,
            dropped: isOnHold ? false : manhwa.dropped,
            rereading: isOnHold ? false : manhwa.rereading
          };
        }
        return manhwa;
      })
    );
    
    const manhwa = manhwaList.find(m => m.id === manhwaId);
    if (manhwa && isOnHold) {
      toast.success(`Marked ${manhwa.title} as on hold`);
    }
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
