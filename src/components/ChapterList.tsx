
import React from 'react';
import { ManhwaChapter } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ExternalLink } from 'lucide-react';

interface ChapterListProps {
  chapters: ManhwaChapter[];
  onMarkAsRead: (chapterId: string, isRead: boolean) => void;
}

const ChapterList: React.FC<ChapterListProps> = ({ chapters, onMarkAsRead }) => {
  // Sort chapters by number in descending order (newest first)
  const sortedChapters = [...chapters].sort((a, b) => b.number - a.number);

  return (
    <div className="space-y-2">
      {sortedChapters.map((chapter) => (
        <div 
          key={chapter.id}
          className={`flex items-center justify-between p-3 rounded-md border ${
            chapter.isRead ? 'bg-muted' : 'bg-card'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={chapter.isRead}
              onCheckedChange={(checked) => onMarkAsRead(chapter.id, checked as boolean)}
              className="chapter-checkbox"
            />
            <div>
              <p className="font-medium">
                {chapter.title}
              </p>
              <p className="text-xs text-muted-foreground">
                Released: {format(new Date(chapter.releaseDate), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            asChild
          >
            <a 
              href={chapter.readUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1"
            >
              <span>Read</span>
              <ExternalLink size={14} />
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ChapterList;
