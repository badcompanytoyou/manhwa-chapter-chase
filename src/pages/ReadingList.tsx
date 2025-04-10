
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import ManhwaGrid from '@/components/ManhwaGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ReadingList: React.FC = () => {
  const { manhwaList } = useManhwa();
  
  // Calculate reading progress for each manhwa
  const manhwasWithProgress = manhwaList.map(manhwa => {
    const readChapters = manhwa.chapters.filter(chapter => chapter.isRead).length;
    const totalChapters = manhwa.chapters.length;
    const progress = totalChapters > 0 ? (readChapters / totalChapters) * 100 : 0;
    
    return {
      ...manhwa,
      readChapters,
      totalChapters,
      progress
    };
  });
  
  // Filter manhwas by reading status
  const ongoing = manhwasWithProgress.filter(m => m.progress > 0 && m.progress < 100);
  const notStarted = manhwasWithProgress.filter(m => m.progress === 0);
  const completed = manhwasWithProgress.filter(m => m.progress === 100 && m.totalChapters > 0);

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">My Reading List</h1>
        <p className="text-muted-foreground">Track your reading progress</p>
      </header>
      
      <Tabs defaultValue="ongoing" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="ongoing">
            Ongoing ({ongoing.length})
          </TabsTrigger>
          <TabsTrigger value="not-started">
            Not Started ({notStarted.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completed.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing">
          <ManhwaGrid 
            manhwas={ongoing}
            emptyMessage="You don't have any ongoing manhwas."
          />
        </TabsContent>
        
        <TabsContent value="not-started">
          <ManhwaGrid 
            manhwas={notStarted}
            emptyMessage="You don't have any manhwas in your to-read list."
          />
        </TabsContent>
        
        <TabsContent value="completed">
          <ManhwaGrid 
            manhwas={completed}
            emptyMessage="You haven't completed any manhwas yet."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReadingList;
