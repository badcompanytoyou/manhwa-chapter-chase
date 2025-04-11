
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Bookmark, Check } from 'lucide-react';
import { Manhwa } from '@/types';

interface DashboardSummaryCardsProps {
  manhwaList: Manhwa[];
}

const DashboardSummaryCards: React.FC<DashboardSummaryCardsProps> = ({ manhwaList }) => {
  // Calculate statistics
  const totalManhwa = manhwaList.length;
  const totalChapters = manhwaList.reduce((acc, m) => acc + m.chapters.length, 0);
  const readChapters = manhwaList.reduce(
    (acc, m) => acc + m.chapters.filter(c => c.isRead).length, 0
  );
  const completionPercentage = totalChapters > 0 
    ? Math.round((readChapters / totalChapters) * 100) 
    : 0;
  
  // Reading status counts
  const reading = manhwaList.filter(m => m.reading).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Total Manhwa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">{totalManhwa}</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Chapters Read</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Check className="h-8 w-8 text-primary" />
              <span className="text-3xl font-bold">{readChapters}/{totalChapters}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
            <p className="text-sm text-right text-muted-foreground">
              {completionPercentage}% Complete
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Currently Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <Bookmark className="h-8 w-8 text-primary" />
            <span className="text-3xl font-bold">{reading}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummaryCards;
