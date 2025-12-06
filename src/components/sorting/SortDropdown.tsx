import { SortState } from '@/types/sales';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowDownAZ, Calendar, Package } from 'lucide-react';

interface SortDropdownProps {
  sort: SortState;
  onSort: (field: SortState['field']) => void;
}

const sortOptions = [
  { value: 'date', label: 'Date (Newest First)', icon: Calendar },
  { value: 'quantity', label: 'Quantity', icon: Package },
  { value: 'customerName', label: 'Customer Name (A-Z)', icon: ArrowDownAZ },
] as const;

export function SortDropdown({ sort, onSort }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Sort By:</span>
      <Select
        value={sort.field}
        onValueChange={(value) => onSort(value as SortState['field'])}
      >
        <SelectTrigger className="w-[200px] h-9 bg-input border-border">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
