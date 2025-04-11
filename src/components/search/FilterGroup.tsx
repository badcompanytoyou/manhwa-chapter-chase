
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LucideIcon } from 'lucide-react';

interface FilterGroupProps {
  title: string;
  icon: LucideIcon;
  options: string[];
  selectedValues: string[];
  onChange: (value: string, checked: boolean) => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  icon: Icon,
  options,
  selectedValues,
  onChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full flex justify-between">
          <div className="flex items-center gap-2">
            <Icon size={16} />
            <span>{title}</span>
          </div>
          {selectedValues.length > 0 && (
            <Badge variant="secondary">
              {selectedValues.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={options.length > 8 ? "max-h-60 overflow-y-auto" : ""}>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map(option => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={selectedValues.includes(option)}
            onCheckedChange={(checked) => onChange(option, checked)}
          >
            {option}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterGroup;
