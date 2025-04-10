
import React, { useState } from 'react';
import { useManhwa } from '@/context/ManhwaContext';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  format,
  startOfWeek,
  addDays,
  isSameDay,
} from 'date-fns';

// Day of week mapping
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Calendar: React.FC = () => {
  const { manhwaList } = useManhwa();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  // Get current week range
  const startDate = startOfWeek(selectedDate || new Date(), { weekStartsOn: 0 });
  const weekDays = [...Array(7)].map((_, i) => addDays(startDate, i));
  
  // Group manhwas by release day
  const manhwasByDay = weekdays.reduce((acc, day) => {
    acc[day] = manhwaList.filter(manhwa => manhwa.releaseDay === day);
    return acc;
  }, {} as Record<string, typeof manhwaList>);
  
  // Get manhwas releasing on selected date (matching weekday)
  const getSelectedDayManhwas = () => {
    if (!selectedDate) return [];
    
    const dayName = weekdays[selectedDate.getDay()];
    return manhwasByDay[dayName] || [];
  };
  
  const selectedDayManhwas = getSelectedDayManhwas();

  return (
    <div className="container mx-auto max-w-screen-xl py-4 pb-24 sm:pb-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Release Calendar</h1>
        <p className="text-muted-foreground">
          Track your manhwa releases throughout the week
        </p>
      </header>
      
      <div className="mb-6 flex flex-col sm:flex-row items-start gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="pl-3 text-left font-normal flex justify-between items-center"
            >
              {selectedDate ? (
                format(selectedDate, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <p className="text-sm text-muted-foreground pt-2 sm:pt-0">
          Showing releases for {selectedDate ? weekdays[selectedDate.getDay()] : "today"}
        </p>
      </div>
      
      {/* Weekly view */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">This Week</h2>
        
        <div className="grid grid-cols-7 gap-2 border rounded-md overflow-hidden">
          {weekDays.map((date, index) => {
            const dayName = weekdays[date.getDay()];
            const isToday = isSameDay(date, new Date());
            const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
            const dayManhwas = manhwasByDay[dayName] || [];
            
            return (
              <div 
                key={index}
                className={`min-h-[100px] p-2 flex flex-col border-r last:border-r-0 
                  ${isToday ? 'bg-muted/50' : ''} 
                  ${isSelected ? 'bg-primary/10' : ''}`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-center mb-2">
                  <div className={`text-xs uppercase ${isToday ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                    {format(date, "EEE")}
                  </div>
                  <div className={`text-sm font-medium ${isSelected ? 'text-primary' : ''}`}>
                    {format(date, "d")}
                  </div>
                </div>
                
                <div className="flex-grow">
                  {dayManhwas.length > 0 ? (
                    <div className="text-xs text-center">
                      {dayManhwas.length} series
                    </div>
                  ) : (
                    <div className="text-xs text-center text-muted-foreground">
                      No releases
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Selected day's releases */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          {selectedDate ? (
            `${weekdays[selectedDate.getDay()]} Releases (${selectedDayManhwas.length})`
          ) : (
            "Today's Releases"
          )}
        </h2>
        
        {selectedDayManhwas.length > 0 ? (
          <div className="space-y-4">
            {selectedDayManhwas.map(manhwa => (
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
                          
                          <div className="text-sm text-muted-foreground">
                            <span>
                              {manhwa.country} • {manhwa.gender}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-1">
                            {manhwa.categories.slice(0, 3).map(category => (
                              <span 
                                key={category}
                                className="text-xs px-2 py-0.5 bg-muted rounded-full"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          asChild
                        >
                          <a 
                            href={manhwa.officialUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            Official Site
                          </a>
                        </Button>
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
              No manhwas release on this day
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Calendar;
