import { TrendingUp, ShoppingCart, DollarSign } from 'lucide-react';

interface StatsBarProps {
  totalTransactions: number;
  totalSales: number;
  totalQuantity: number;
}

export function StatsBar({ totalTransactions, totalSales, totalQuantity }: StatsBarProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount.toFixed(0)}`;
  };

  return (
    <div className="flex items-center gap-6 px-4 py-3 bg-card border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <ShoppingCart className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total transactions sold</p>
          <p className="text-lg font-semibold text-foreground">{totalTransactions.toLocaleString()}</p>
        </div>
      </div>

      <div className="w-px h-10 bg-border" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
          <DollarSign className="h-5 w-5 text-success" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Amount</p>
          <p className="text-lg font-semibold text-foreground">{formatCurrency(totalSales)}</p>
        </div>
      </div>

      <div className="w-px h-10 bg-border" />

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
          <TrendingUp className="h-5 w-5 text-info" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Units Sold (Qty)</p>
          <p className="text-lg font-semibold text-foreground">{totalQuantity.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
