
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const Notifications: React.FC = () => {
  const { manhwaList } = useManhwa();
  
  // Filter manhwas with new chapters
  const newChapters = manhwaList.filter(manhwa => manhwa.hasNewChapter);
  
  // Upcoming releases in the next 7 days
  const upcomingReleases = manhwaList
    .filter(manhwa => {
      if (!manhwa.nextChapterDate) return false;
      const now = new Date();
      const diffTime = manhwa.nextChapterDate.getTime() - now.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      return diffDays <= 7 && diffDays > 0;
    })
    .sort((a, b) => {
      if (!a.nextChapterDate || !b.nextChapterDate) return 0;
      return a.nextChapterDate.getTime() - b.nextChapterDate.getTime();
    });

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Updates & Notifications</h1>
        <p className="text-muted-foreground">
          Stay updated on your manhwa releases
        </p>
      </header>
      
      {/* New Chapters Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Chapters</h2>
          <Button variant="outline" size="sm">
            <Bell size={16} className="mr-2" />
            Manage Notifications
          </Button>
        </div>
        
        {newChapters.length > 0 ? (
          <div className="space-y-4">
            {newChapters.map(manhwa => {
              const latestChapter = manhwa.chapters[0];
              
              return (
                <Card key={manhwa.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="h-16 w-12 relative overflow-hidden rounded">
                        <img 
                          src={manhwa.coverImage}
                          alt={manhwa.title}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link 
                              to={`/manhwa/${manhwa.id}`}
                              className="font-medium hover:text-manhwa-primary transition-colors"
                            >
                              {manhwa.title}
                            </Link>
                            
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>
                                {latestChapter.title} available now
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            asChild
                          >
                            <a 
                              href={latestChapter.readUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <span>Read</span>
                              <ExternalLink size={14} />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/40 rounded-lg">
            <BellOff size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">
              No new chapters available right now
            </p>
          </div>
        )}
      </section>
      
      {/* Upcoming Releases Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Upcoming Releases</h2>
        
        {upcomingReleases.length > 0 ? (
          <div className="space-y-4">
            {upcomingReleases.map(manhwa => (
              <Card key={manhwa.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="h-16 w-12 relative overflow-hidden rounded">
                      <img 
                        src={manhwa.coverImage}
                        alt={manhwa.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link 
                            to={`/manhwa/${manhwa.id}`}
                            className="font-medium hover:text-manhwa-primary transition-colors"
                          >
                            {manhwa.title}
                          </Link>
                          
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                              New chapter {manhwa.nextChapterDate ? 
                                `${formatDistanceToNow(manhwa.nextChapterDate, { addSuffix: true })}` :
                                'upcoming'}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {manhwa.releaseDay}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/40 rounded-lg">
            <p className="text-muted-foreground">
              No upcoming releases in the next 7 days
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Notifications;
