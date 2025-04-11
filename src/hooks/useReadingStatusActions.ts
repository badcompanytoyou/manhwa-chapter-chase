
import { Manhwa } from '@/types';
import { toast } from 'sonner';

export const useReadingStatusActions = (
  manhwaList: Manhwa[],
  setManhwaList: React.Dispatch<React.SetStateAction<Manhwa[]>>
) => {
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

  return {
    markManhwaAsReading,
    markManhwaAsRereading,
    markManhwaAsDropped,
    markManhwaAsPlanToRead,
    toggleFavorite,
    markManhwaAsOnHold
  };
};
