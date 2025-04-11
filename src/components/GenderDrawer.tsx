
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle,
  DrawerTrigger 
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { getAllGenders } from '@/data/mockData';

const GenderDrawer: React.FC = () => {
  const navigate = useNavigate();
  const genders = getAllGenders();

  const handleGenderClick = (gender: string) => {
    navigate(`/search?gender=${encodeURIComponent(gender)}`);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[85%] rounded-t-xl bg-background dark:bg-[#1a1a1a]">
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl font-bold">Browse by Gender</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2 space-y-4 overflow-y-auto">
          {genders.map((gender) => (
            <Button
              key={gender}
              variant="ghost"
              className="w-full justify-start text-lg py-6 hover:bg-accent"
              onClick={() => handleGenderClick(gender)}
            >
              {gender}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GenderDrawer;
