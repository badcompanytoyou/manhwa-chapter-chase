
import React from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Bookmark, 
  Check, 
  ChevronRight, 
  Clock, 
  History, 
  Star 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { manhwaList } = useManhwa();

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
  const completed = manhwaList.filter(m => 
    m.chapters.length > 0 && 
    m.chapters.every(c => c.isRead)
  ).length;
  const onHold = manhwaList.filter(m => m.onHold).length;
  const dropped = manhwaList.filter(m => m.dropped).length;
  const planToRead = manhwaList.filter(m => m.planToRead).length;
  const rereading = manhwaList.filter(m => m.rereading).length;

  // Data for pie chart
  const statusData = [
    { name: 'Reading', value: reading, color: '#3b82f6' },
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'On Hold', value: onHold, color: '#f59e0b' },
    { name: 'Dropped', value: dropped, color: '#ef4444' },
    { name: 'Plan to Read', value: planToRead, color: '#8b5cf6' },
    { name: 'Re-reading', value: rereading, color: '#ec4899' },
  ].filter(item => item.value > 0);

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
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">Reading Dashboard</h1>
      
      {/* Summary cards */}
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
      
      {/* Reading status chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Reading Status</CardTitle>
            <CardDescription>Distribution of your manhwa collection</CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            {statusData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
        
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
      </div>
      
      {/* Reading history and genres */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

export default Dashboard;
