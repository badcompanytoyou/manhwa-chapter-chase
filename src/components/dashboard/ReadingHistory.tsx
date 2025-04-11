
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Clock, History, Star } from 'lucide-react';
import { Manhwa } from '@/types';

interface ReadingHistoryProps {
  manhwaList: Manhwa[];
}

const ReadingHistory: React.FC<ReadingHistoryProps> = ({ manhwaList }) => {
  // Calculate statistics
  const totalManhwa = manhwaList.length;
  const readChapters = manhwaList.reduce(
    (acc, m) => acc + m.chapters.filter(c => c.isRead).length, 0
  );
  
  // Reading status counts
  const completed = manhwaList.filter(m => 
    m.chapters.length > 0 && 
    m.chapters.every(c => c.isRead)
  ).length;
  const rereading = manhwaList.filter(m => m.rereading).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Reading History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <Clock className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Reading Time</p>
              <p className="text-2xl font-bold">
                {Math.round(readChapters * 5 / 60)} hrs
              </p>
              <p className="text-xs text-muted-foreground">Est. 5 min per chapter</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
              <Star className="h-8 w-8 mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold">
                {completed} / {totalManhwa}
              </p>
              <p className="text-xs text-muted-foreground">
                {totalManhwa > 0 ? Math.round((completed / totalManhwa) * 100) : 0}% 
                complete
              </p>
            </div>
          </div>
          
          {rereading > 0 && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-medium mb-1">Re-reading</h3>
              <p className="text-sm text-muted-foreground">
                You are currently re-reading {rereading} manhwas
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReadingHistory;
