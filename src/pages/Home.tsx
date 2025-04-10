
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import ManhwaGrid from '@/components/ManhwaGrid';
import { Bell } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Logo from '@/components/Logo';

const Home: React.FC = () => {
  const { manhwaList } = useManhwa();
  
  // Filter manhwas with new chapters
  const newChapters = manhwaList.filter(manhwa => manhwa.hasNewChapter);
  
  // Sort by next chapter date
  const upcomingChapters = [...manhwaList]
    .filter(manhwa => manhwa.nextChapterDate)
    .sort((a, b) => {
      if (!a.nextChapterDate || !b.nextChapterDate) return 0;
      return a.nextChapterDate.getTime() - b.nextChapterDate.getTime();
    })
    .slice(0, 6); // Limit to 6 upcoming manhwas
  
  // Calculate reading progress
  const readingProgress = manhwaList.map(manhwa => {
    const readChapters = manhwa.chapters.filter(chapter => chapter.isRead).length;
    const totalChapters = manhwa.chapters.length;
    const progress = totalChapters > 0 ? (readChapters / totalChapters) * 100 : 0;
    
    return {
      ...manhwa,
      progress,
      readChapters,
      totalChapters
    };
  });
  
  // In progress manhwas (started but not finished)
  const inProgress = readingProgress
    .filter(m => m.progress > 0 && m.progress < 100)
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 6);
  
  // Recently updated (based on latest chapter release date)
  const recentlyUpdated = [...manhwaList]
    .filter(m => m.chapters.length > 0)
    .sort((a, b) => {
      const aLatest = a.chapters[0]?.releaseDate || new Date(0);
      const bLatest = b.chapters[0]?.releaseDate || new Date(0);
      return bLatest.getTime() - aLatest.getTime();
    })
    .slice(0, 6);

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <header className="mb-6 flex flex-col items-center sm:items-start">
        <div className="mb-4">
          <Logo size="lg" />
        </div>
        <p className="text-muted-foreground">Track your favorite manhwas all in one place</p>
      </header>
      
      {/* New chapters section */}
      {newChapters.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-manhwa-accent" />
            <h2 className="text-xl font-semibold">New Chapters</h2>
          </div>
          <ManhwaGrid manhwas={newChapters} />
        </section>
      )}
      
      {/* Continue reading section */}
      {inProgress.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Continue Reading</h2>
          <ManhwaGrid manhwas={inProgress} />
        </section>
      )}
      
      <Separator className="my-8" />
      
      {/* Upcoming releases section */}
      {upcomingChapters.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Releases</h2>
          <ManhwaGrid manhwas={upcomingChapters} />
        </section>
      )}
      
      {/* Recently updated section */}
      {recentlyUpdated.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recently Updated</h2>
          <ManhwaGrid manhwas={recentlyUpdated} />
        </section>
      )}
      
      {/* All manhwas section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Library</h2>
        <ManhwaGrid manhwas={manhwaList} />
      </section>
    </div>
  );
};

export default Home;
