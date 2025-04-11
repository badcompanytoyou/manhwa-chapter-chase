
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Manhwa } from '@/types';

interface TopGenresProps {
  manhwaList: Manhwa[];
}

const TopGenres: React.FC<TopGenresProps> = ({ manhwaList }) => {
  const totalManhwa = manhwaList.length;
  
  // Genres distribution
  const genreMap = new Map<string, number>();
  manhwaList.forEach(m => {
    const gender = m.gender;
    genreMap.set(gender, (genreMap.get(gender) || 0) + 1);
  });
  
  const genreData = Array.from(genreMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Genres</CardTitle>
        <CardDescription>Your most read genres</CardDescription>
      </CardHeader>
      <CardContent>
        {genreData.length > 0 ? (
          <div className="space-y-3">
            {genreData.map((genre, index) => (
              <div key={genre.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{genre.name}</span>
                  <span className="text-muted-foreground">
                    {genre.value} manhwas ({Math.round((genre.value / totalManhwa) * 100)}%)
                  </span>
                </div>
                <Progress 
                  value={(genre.value / totalManhwa) * 100} 
                  className="h-2" 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="h-32 flex items-center justify-center text-muted-foreground">
            No genre data available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TopGenres;
