
import { Manhwa } from '@/types';

export interface FilterOptions {
  query: string;
  gender: string[];
  categories: string[];
  country: string[];
  releaseDay: string[];
}

export interface ManhwaContextType {
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

export const initialFilters: FilterOptions = {
  query: '',
  gender: [],
  categories: [],
  country: [],
  releaseDay: [],
};
