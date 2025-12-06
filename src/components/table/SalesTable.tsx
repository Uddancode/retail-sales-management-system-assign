import { SalesTransaction, SortState } from '@/types/sales';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface SalesTableProps {
  data: SalesTransaction[];
  sort: SortState;
  onSort: (field: SortState['field']) => void;
}

export function SalesTable({ data, sort, onSort }: SalesTableProps) {
  const getSortIcon = (field: SortState['field']) => {
    if (sort.field !== field) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    return sort.order === 'asc' 
      ? <ArrowUp className="h-4 w-4 text-primary" />
      : <ArrowDown className="h-4 w-4 text-primary" />;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-success/20 text-success border-success/30';
      case 'Pending':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'Cancelled':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'Returned':
        return 'bg-info/20 text-info border-info/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No transactions found</h3>
        <p className="text-sm text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-table-header hover:bg-table-header border-table-border">
            <TableHead className="text-muted-foreground font-medium">Transaction ID</TableHead>
            <TableHead 
              className="text-muted-foreground font-medium cursor-pointer hover:text-foreground"
              onClick={() => onSort('date')}
            >
              <div className="flex items-center gap-1">
                Date
                {getSortIcon('date')}
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Customer ID</TableHead>
            <TableHead 
              className="text-muted-foreground font-medium cursor-pointer hover:text-foreground"
              onClick={() => onSort('customerName')}
            >
              <div className="flex items-center gap-1">
                Customer Name
                {getSortIcon('customerName')}
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Phone Number</TableHead>
            <TableHead className="text-muted-foreground font-medium">Gender</TableHead>
            <TableHead className="text-muted-foreground font-medium">Age</TableHead>
            <TableHead className="text-muted-foreground font-medium">Product Category</TableHead>
            <TableHead 
              className="text-muted-foreground font-medium cursor-pointer hover:text-foreground"
              onClick={() => onSort('quantity')}
            >
              <div className="flex items-center gap-1">
                Quantity
                {getSortIcon('quantity')}
              </div>
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">Total Amount</TableHead>
            <TableHead className="text-muted-foreground font-medium">Customer Region</TableHead>
            <TableHead className="text-muted-foreground font-medium">Product ID</TableHead>
            <TableHead className="text-muted-foreground font-medium">Employee Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction, index) => (
            <TableRow 
              key={transaction.transactionId + index}
              className="border-table-border hover:bg-table-hover transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <TableCell className="font-mono text-sm text-muted-foreground">
                {transaction.transactionId}
              </TableCell>
              <TableCell className="text-foreground">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell className="font-mono text-sm text-primary">
                {transaction.customerId}
              </TableCell>
              <TableCell className="text-foreground font-medium">
                {transaction.customerName}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {transaction.phoneNumber}
              </TableCell>
              <TableCell className="text-foreground">
                {transaction.gender}
              </TableCell>
              <TableCell className="text-foreground">
                {transaction.age}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-secondary/50 border-border text-foreground">
                  {transaction.productCategory}
                </Badge>
              </TableCell>
              <TableCell className="text-foreground font-medium">
                {transaction.quantity}
              </TableCell>
              <TableCell className="text-foreground font-medium">
                {formatCurrency(transaction.finalAmount)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {transaction.customerRegion}
              </TableCell>
              <TableCell className="font-mono text-sm text-muted-foreground">
                {transaction.productId}
              </TableCell>
              <TableCell className="text-foreground">
                {transaction.employeeName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
