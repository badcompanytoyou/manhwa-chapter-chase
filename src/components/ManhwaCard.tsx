
import React from 'react';
import { Link } from 'react-router-dom';
import { Manhwa } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ManhwaCardProps {
  manhwa: Manhwa;
}

const ManhwaCard: React.FC<ManhwaCardProps> = ({ manhwa }) => {
  const latestChapter = manhwa.chapters.length > 0 
    ? manhwa.chapters[0] 
    : null;
  
  const readChaptersCount = manhwa.chapters.filter(chapter => chapter.isRead).length;
  const totalChapters = manhwa.chapters.length;
  const progress = totalChapters > 0 ? (readChaptersCount / totalChapters) * 100 : 0;

  return (
    <Link to={`/manhwa/${manhwa.id}`}>
      <div className="manhwa-card group h-full flex flex-col">
        <div className="manhwa-cover">
          <img 
            src={manhwa.coverImage} 
            alt={manhwa.title} 
            className="w-full h-full object-cover"
          />
          
          {/* Progress bar overlay at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div 
              className="h-full bg-manhwa-primary" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* New chapter badge */}
          {manhwa.hasNewChapter && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-manhwa-accent animate-pulse-gentle">
                NEW
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-3 flex flex-col flex-grow">
          <h3 className="font-bold text-sm line-clamp-2 group-hover:text-manhwa-primary transition-colors">
            {manhwa.title}
          </h3>
          
          <div className="mt-1 flex items-center text-xs text-gray-500 space-x-1">
            <BookOpen size={12} />
            <span>{readChaptersCount}/{totalChapters} chapters</span>
          </div>
          
          {manhwa.nextChapterDate && (
            <div className="mt-1 flex items-center text-xs text-gray-500 space-x-1">
              <Clock size={12} />
              <span>
                Next: {formatDistanceToNow(manhwa.nextChapterDate, { addSuffix: true })}
              </span>
            </div>
          )}
          
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs py-0">
              {manhwa.gender}
            </Badge>
            {manhwa.categories.slice(0, 1).map(category => (
              <Badge 
                key={category} 
                variant="secondary" 
                className="text-xs py-0"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ManhwaCard;
