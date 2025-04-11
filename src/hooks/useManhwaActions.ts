
import { useState } from 'react';
import { Manhwa } from '@/types';
import { toast } from 'sonner';
import { FilterOptions, initialFilters } from '@/context/types';

export const useManhwaActions = () => {
  const [manhwaList, setManhwaList] = useState<Manhwa[]>([]);
  const [filteredManhwaList, setFilteredManhwaList] = useState<Manhwa[]>([]);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>(initialFilters);

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

  return {
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
  };
};
