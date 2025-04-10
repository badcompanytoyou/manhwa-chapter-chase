
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Bell, 
  Calendar,
  BookMarked 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { 
    path: '/', 
    name: 'Home', 
    icon: Home 
  },
  { 
    path: '/search', 
    name: 'Search', 
    icon: Search 
  },
  { 
    path: '/reading-list', 
    name: 'Reading', 
    icon: BookMarked 
  },
  { 
    path: '/calendar', 
    name: 'Calendar', 
    icon: Calendar 
  },
  { 
    path: '/notifications', 
    name: 'Updates', 
    icon: Bell 
  }
];

const Navbar: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-10 pb-safe sm:static sm:border-b sm:border-t-0">
      <div className="container mx-auto max-w-screen-xl">
        <nav className="flex justify-between items-center sm:justify-start sm:gap-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center py-2 px-4 sm:py-4 relative",
                  "transition-colors duration-200",
                  isActive 
                    ? "text-manhwa-primary" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.name}</span>
                
                {isActive && (
                  <span className="hidden sm:block absolute bottom-0 left-0 right-0 h-0.5 bg-manhwa-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
