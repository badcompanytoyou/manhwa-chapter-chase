
import React from 'react';
import ManhwaCard from './ManhwaCard';
import { Manhwa } from '@/types';

interface ManhwaGridProps {
  manhwas: Manhwa[];
  emptyMessage?: string;
}

const ManhwaGrid: React.FC<ManhwaGridProps> = ({ 
  manhwas, 
  emptyMessage = "No manhwas found" 
}) => {
  if (manhwas.length === 0) {
    return (
      <div className="py-12 flex justify-center">
        <p className="text-lg text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {manhwas.map((manhwa) => (
        <ManhwaCard key={manhwa.id} manhwa={manhwa} />
      ))}
    </div>
  );
};

export default ManhwaGrid;
