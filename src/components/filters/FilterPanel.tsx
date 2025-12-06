import { FilterState } from '@/types/sales';
import { 
  uniqueRegions, 
  uniqueGenders, 
  uniqueCategories, 
  uniqueTags, 
  uniquePaymentMethods 
} from '@/data/salesData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { ChevronDown, X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilters: () => void;
}

interface MultiSelectFilterProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}

function MultiSelectFilter({ label, options, selected, onChange }: MultiSelectFilterProps) {
  const [open, setOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={cn(
            "h-9 px-3 text-sm justify-between gap-2 min-w-[120px]",
            selected.length > 0 && "border-primary text-primary"
          )}
        >
          <span className="truncate">
            {selected.length > 0 ? `${label} (${selected.length})` : label}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3 bg-popover border-border" align="start">
        <div className="space-y-2">
          {options.map(option => (
            <div key={option} className="flex items-center gap-2">
              <Checkbox
                id={`${label}-${option}`}
                checked={selected.includes(option)}
                onCheckedChange={() => toggleOption(option)}
              />
              <Label 
                htmlFor={`${label}-${option}`}
                className="text-sm text-foreground cursor-pointer"
              >
                {option}
              </Label>
            </div>
          ))}
        </div>
        {selected.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-2 text-muted-foreground"
            onClick={() => onChange([])}
          >
            Clear
          </Button>
        )}
      </PopoverContent>
    </Popover>
  );
}

export function FilterPanel({ filters, onFilterChange, onClearFilters }: FilterPanelProps) {
  const [ageRange, setAgeRange] = useState<[number, number]>(filters.ageRange || [18, 65]);
  const [dateOpen, setDateOpen] = useState(false);
  const [startDate, setStartDate] = useState(filters.dateRange?.[0] || '');
  const [endDate, setEndDate] = useState(filters.dateRange?.[1] || '');

  const handleAgeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setAgeRange(range);
  };

  const applyAgeFilter = () => {
    onFilterChange('ageRange', ageRange);
  };

  const applyDateFilter = () => {
    if (startDate && endDate) {
      onFilterChange('dateRange', [startDate, endDate]);
    }
    setDateOpen(false);
  };

  const clearDateFilter = () => {
    setStartDate('');
    setEndDate('');
    onFilterChange('dateRange', null);
    setDateOpen(false);
  };

  const hasActiveFilters = 
    filters.customerRegion.length > 0 ||
    filters.gender.length > 0 ||
    filters.ageRange !== null ||
    filters.productCategory.length > 0 ||
    filters.tags.length > 0 ||
    filters.paymentMethod.length > 0 ||
    filters.dateRange !== null;

  return (
    <div className="flex flex-wrap items-center gap-2 p-4 bg-card border-b border-border">
      {/* Customer Region */}
      <MultiSelectFilter
        label="Customer Region"
        options={uniqueRegions}
        selected={filters.customerRegion}
        onChange={(values) => onFilterChange('customerRegion', values)}
      />

      {/* Gender */}
      <MultiSelectFilter
        label="Gender"
        options={uniqueGenders}
        selected={filters.gender}
        onChange={(values) => onFilterChange('gender', values)}
      />

      {/* Age Range */}
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "h-9 px-3 text-sm justify-between gap-2",
              filters.ageRange && "border-primary text-primary"
            )}
          >
            <span>
              {filters.ageRange 
                ? `Age: ${filters.ageRange[0]}-${filters.ageRange[1]}` 
                : 'Age Range'}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 bg-popover border-border" align="start">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{ageRange[0]} years</span>
              <span>{ageRange[1]} years</span>
            </div>
            <Slider
              value={ageRange}
              onValueChange={handleAgeChange}
              min={18}
              max={65}
              step={1}
              className="w-full"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={applyAgeFilter} className="flex-1">
                Apply
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => {
                  setAgeRange([18, 65]);
                  onFilterChange('ageRange', null);
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Product Category */}
      <MultiSelectFilter
        label="Product Category"
        options={uniqueCategories}
        selected={filters.productCategory}
        onChange={(values) => onFilterChange('productCategory', values)}
      />

      {/* Tags */}
      <MultiSelectFilter
        label="Tags"
        options={uniqueTags}
        selected={filters.tags}
        onChange={(values) => onFilterChange('tags', values)}
      />

      {/* Payment Method */}
      <MultiSelectFilter
        label="Payment Method"
        options={uniquePaymentMethods}
        selected={filters.paymentMethod}
        onChange={(values) => onFilterChange('paymentMethod', values)}
      />

      {/* Date Range */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn(
              "h-9 px-3 text-sm justify-between gap-2",
              filters.dateRange && "border-primary text-primary"
            )}
          >
            <span>
              {filters.dateRange 
                ? `${filters.dateRange[0]} - ${filters.dateRange[1]}` 
                : 'Date'}
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 p-4 bg-popover border-border" align="start">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-input"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-input"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={applyDateFilter} className="flex-1">
                Apply
              </Button>
              <Button size="sm" variant="outline" onClick={clearDateFilter}>
                Clear
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Clear All Filters */}
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-destructive gap-1"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      )}
    </div>
  );
}
