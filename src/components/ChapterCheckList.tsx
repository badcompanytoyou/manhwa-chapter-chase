
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import { ManhwaChapter } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDistanceToNow, format } from 'date-fns';
import { ExternalLink, Link, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface ChapterCheckListProps {
  manhwaId: string;
  chapters: ManhwaChapter[];
}

const ChapterCheckList: React.FC<ChapterCheckListProps> = ({ manhwaId, chapters }) => {
  const { markChapterAsRead } = useManhwa();
  
  // Sort chapters by number (most recent first)
  const sortedChapters = [...chapters].sort((a, b) => b.number - a.number);
  
  const handleCheckChange = (chapterId: string, checked: boolean) => {
    markChapterAsRead(manhwaId, chapterId, checked);
  };
  
  const readCount = chapters.filter(chapter => chapter.isRead).length;
  const totalCount = chapters.length;
  const completionPercentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold">Chapters ({totalCount})</h3>
          <p className="text-sm text-muted-foreground">
            {readCount} read ({completionPercentage}% complete)
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Mark all as read
              chapters.forEach(chapter => {
                if (!chapter.isRead) {
                  markChapterAsRead(manhwaId, chapter.id, true);
                }
              });
            }}
          >
            Mark all as read
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              // Mark all as unread
              chapters.forEach(chapter => {
                if (chapter.isRead) {
                  markChapterAsRead(manhwaId, chapter.id, false);
                }
              });
            }}
          >
            Mark all as unread
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-1">
        {sortedChapters.map((chapter) => (
          <div 
            key={chapter.id}
            className={`p-3 rounded-lg flex items-center gap-3 transition-colors ${
              chapter.isRead ? 'bg-muted/50' : 'hover:bg-muted/30'
            }`}
          >
            <Checkbox
              id={`chapter-${chapter.id}`}
              checked={chapter.isRead}
              onCheckedChange={(checked) => handleCheckChange(chapter.id, checked === true)}
            />
            
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <label 
                  htmlFor={`chapter-${chapter.id}`}
                  className={`text-sm font-medium cursor-pointer ${
                    chapter.isRead ? 'text-muted-foreground line-through' : ''
                  }`}
                >
                  Chapter {chapter.number}: {chapter.title}
                </label>
                
                {chapter.isNew && (
                  <Badge variant="outline" className="text-xs bg-manhwa-accent text-white">
                    NEW
                  </Badge>
                )}
              </div>
              
              <div className="text-xs text-muted-foreground flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(chapter.releaseDate, 'MMM d, yyyy')}</span>
                </div>
                
                {chapter.lastReadAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Read {formatDistanceToNow(chapter.lastReadAt, { addSuffix: true })}</span>
                  </div>
                )}
              </div>
            </div>
            
            {chapter.readUrl && (
              <Button 
                size="sm" 
                variant="ghost" 
                className="ml-auto"
                onClick={() => window.open(chapter.readUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Read
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterCheckList;
