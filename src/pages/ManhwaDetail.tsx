
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useManhwa } from '@/context/ManhwaContext';
import ChapterList from '@/components/ChapterList';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CalendarDays, 
  Globe, 
  ExternalLink, 
  Users, 
  Clock,
  Pen
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

const ManhwaDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { manhwaList, markChapterAsRead } = useManhwa();
  
  // Find the manhwa by id
  const manhwa = manhwaList.find(m => m.id === id);
  
  // If manhwa not found, show error
  if (!manhwa) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Manhwa Not Found</h1>
        <Button onClick={() => navigate('/')}>
          Go Back Home
        </Button>
      </div>
    );
  }
  
  // Calculate reading progress
  const readChaptersCount = manhwa.chapters.filter(c => c.isRead).length;
  const totalChapters = manhwa.chapters.length;
  const progress = totalChapters > 0 ? (readChaptersCount / totalChapters) * 100 : 0;
  
  // Handle marking chapter as read
  const handleMarkAsRead = (chapterId: string, isRead: boolean) => {
    markChapterAsRead(manhwa.id, chapterId, isRead);
  };

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={16} className="mr-2" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Cover and metadata */}
        <div>
          <div className="manhwa-cover rounded-lg overflow-hidden border mb-4">
            <img 
              src={manhwa.coverImage} 
              alt={manhwa.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-4">
            {/* Basic details */}
            <div>
              <h2 className="font-semibold text-sm">Details</h2>
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Pen size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Author:</span>
                  <span className="text-sm">{manhwa.author}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Pen size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Illustrator:</span>
                  <span className="text-sm">{manhwa.illustrator}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Country:</span>
                  <span className="text-sm">{manhwa.country}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Gender:</span>
                  <span className="text-sm">{manhwa.gender}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <CalendarDays size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Release Day:</span>
                  <span className="text-sm">{manhwa.releaseDay}</span>
                </div>
                
                {manhwa.nextChapterDate && (
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Next Chapter:</span>
                    <span className="text-sm">
                      {format(manhwa.nextChapterDate, 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Categories */}
            <div>
              <h2 className="font-semibold text-sm">Categories</h2>
              <Separator className="my-2" />
              
              <div className="flex flex-wrap gap-2 mt-2">
                {manhwa.categories.map(category => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Official site */}
            <div>
              <h2 className="font-semibold text-sm">Official Site</h2>
              <Separator className="my-2" />
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2"
                asChild
              >
                <a 
                  href={manhwa.officialUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Visit Official Site</span>
                  <ExternalLink size={14} />
                </a>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Right column - Title, description, and chapters */}
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{manhwa.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div>
                {readChaptersCount}/{totalChapters} chapters read
              </div>
              <div className="w-full max-w-xs h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-manhwa-primary" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {manhwa.description}
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Chapters ({totalChapters})</h2>
            <ChapterList 
              chapters={manhwa.chapters} 
              onMarkAsRead={handleMarkAsRead} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManhwaDetail;
