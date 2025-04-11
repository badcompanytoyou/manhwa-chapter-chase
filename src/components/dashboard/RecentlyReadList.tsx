
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Manhwa } from '@/types';

interface RecentlyReadListProps {
  manhwaList: Manhwa[];
}

const RecentlyReadList: React.FC<RecentlyReadListProps> = ({ manhwaList }) => {
  // Recently read manhwas
  const recentlyRead = [...manhwaList]
    .filter(m => m.chapters.some(c => c.isRead))
    .sort((a, b) => {
      const aLatestRead = Math.max(...a.chapters
        .filter(c => c.isRead)
        .map(c => c.lastReadAt?.getTime() || 0));
      const bLatestRead = Math.max(...b.chapters
        .filter(c => c.isRead)
        .map(c => c.lastReadAt?.getTime() || 0));
      return bLatestRead - aLatestRead;
    })
    .slice(0, 5);

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recently Read</CardTitle>
        <CardDescription>Your latest reading activity</CardDescription>
      </CardHeader>
      <CardContent>
        {recentlyRead.length > 0 ? (
          <ul className="space-y-2">
            {recentlyRead.map(manhwa => (
              <li key={manhwa.id}>
                <Link 
                  to={`/manhwa/${manhwa.id}`}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <img 
                      src={manhwa.coverImage} 
                      alt={manhwa.title}
                      className="w-10 h-10 object-cover rounded-md" 
                    />
                    <div>
                      <p className="font-medium line-clamp-1">{manhwa.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {manhwa.chapters.filter(c => c.isRead).length}/{manhwa.chapters.length} chapters
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            You haven't read any manhwas yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentlyReadList;
