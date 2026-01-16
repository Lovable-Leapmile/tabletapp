import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

interface BinListHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  totalItems: number;
  placeholder?: string;
}

export const BinListHeader = ({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  totalItems,
  placeholder = "Search bins..."
}: BinListHeaderProps) => {
  return (
    <div className="sticky top-0 z-40 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          {/* Search Bar */}
          <div className="w-full sm:w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <Button
              variant={filterType === 'all' ? 'default' : 'outline'}
              onClick={() => onFilterChange('all')}
              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base shadow-sm whitespace-nowrap"
            >
              All Bins
            </Button>
            <Button
              variant={filterType === 'empty' ? 'default' : 'outline'}
              onClick={() => onFilterChange('empty')}
              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base shadow-sm whitespace-nowrap"
            >
              Empty
            </Button>
            <Button
              variant={filterType === 'partial' ? 'default' : 'outline'}
              onClick={() => onFilterChange('partial')}
              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base shadow-sm whitespace-nowrap"
            >
              Partial
            </Button>
            <Button
              variant={filterType === 'full' ? 'default' : 'outline'}
              onClick={() => onFilterChange('full')}
              className="h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base shadow-sm whitespace-nowrap"
            >
              Full
            </Button>
          </div>

          {/* Total Items */}
          <div className="text-sm sm:text-lg font-medium text-foreground whitespace-nowrap flex-shrink-0">
            Total: <span className="text-primary">{totalItems}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinListHeader;
