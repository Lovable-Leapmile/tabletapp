import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import bin1 from "@/assets/bin1.png";
import bin2 from "@/assets/bin2.png";
import styles from "./BinCard.module.css";

interface BinCardProps {
  binId: string;
  itemCount: number;
  trayWeight?: number;
  onClick?: () => void;
}

export const BinCard = ({ binId, itemCount, trayWeight, onClick }: BinCardProps) => {
  const isOverWeight = trayWeight && trayWeight > 18000;

  return (
    <Card
      onClick={onClick}
      className="flex items-center gap-3 sm:gap-3 p-3 sm:p-4 cursor-pointer transition-smooth active:scale-[0.98] bg-card border-border relative w-full sm:w-[210px] md:w-[230px] lg:w-[250px] xl:w-[270px] h-[70px] sm:h-[80px]"
    >
      {itemCount === 0 && (
        <span className="absolute top-0 left-0 text-xs sm:text-[10px] px-3 sm:px-2.5 py-0.5 rounded-tl-lg rounded-br-lg bg-green-500 text-white border border-green-600">
          Empty
        </span>
      )}
      {isOverWeight && (
        <div className={styles.overWeightGauge}>
          {/* Warning Triangle Icon */}
          <div className={styles.warningIcon}>
            <div className={styles.triangleIcon} />
          </div>
          
          {/* Two-line text */}
          <div className={styles.gaugeText}>
            <span className={styles.gaugeTextLine}>Over</span>
            <span className={styles.gaugeTextLine}>Weight</span>
          </div>
        </div>
      )}
      <div className="flex-shrink-0 w-12 h-12 sm:w-12 sm:h-12 bg-accent/20 rounded-lg flex items-center justify-center p-1.5 sm:p-1.5">
        <img 
          src={itemCount > 0 ? bin1 : bin2} 
          alt={itemCount > 0 ? "Bin with items" : "Empty bin"}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 text-left min-w-0">
        <div className="flex items-center gap-0.5 sm:gap-1.5">
          <p className="text-sm sm:text-base font-medium text-foreground truncate">{binId}</p>
        </div>
        <p className="text-xs sm:text-xs text-muted-foreground">({itemCount} items)</p>
      </div>
    </Card>
  );
};
