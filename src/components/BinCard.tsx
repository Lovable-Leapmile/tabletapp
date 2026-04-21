import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import bin1Image from "@/assets/bin1.png";
import bin2Image from "@/assets/bin2.png";

interface BinCardProps {
  binId: string;
  itemCount: number;
  onClick?: () => void;
  className?: string;
  showStatusBadge?: boolean;
}

export const BinCard = ({
  binId,
  itemCount,
  onClick,
  className = "",
  showStatusBadge = true
}: BinCardProps) => {
  const isEmpty = itemCount === 0;

  return (
    <div className="relative">
      <Card
        onClick={onClick}
        className={cn(
          "group relative flex items-center gap-3 p-3 sm:p-4 cursor-pointer",
          "transition-all duration-200 hover:shadow-md active:scale-[0.98]",
          "bg-card border-border w-full h-[80px] sm:h-[90px]",
          "sm:max-w-[240px] lg:max-w-[260px] xl:max-w-[280px]",
          className
        )}
      >

        <div className={cn(
          "flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-lg",
          "flex items-center justify-center p-2 overflow-hidden",
          isEmpty ? "bg-muted/30" : "bg-primary/10"
        )}>
          <img
            src={isEmpty ? bin2Image : bin1Image}
            alt={isEmpty ? "Empty bin" : "Bin with items"}
            className="w-full h-full object-contain transition-transform group-hover:scale-110"
          />
        </div>

        {showStatusBadge && isEmpty && (
          <div className="absolute top-0 left-0 pl-5 z-10">
            <span className="inline-flex items-center pl-1.5 pr-1.5 pb-0.5 pt-0 rounded-b text-xs font-medium bg-success/20 text-success border border-success/30 border-t-0">
              Empty
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium text-foreground truncate">
            {binId}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {isEmpty ? 'No items' : `${itemCount} item${itemCount !== 1 ? 's' : ''}`}
          </p>
        </div>
      </Card>
    </div>
  );
};
