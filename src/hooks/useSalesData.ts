import { useState, useMemo, useCallback } from 'react';
import { SalesTransaction, FilterState, SortState, PaginationState } from '@/types/sales';
import { salesData } from '@/data/salesData';

const initialFilters: FilterState = {
  customerRegion: [],
  gender: [],
  ageRange: null,
  productCategory: [],
  tags: [],
  paymentMethod: [],
  dateRange: null,
};

const initialSort: SortState = {
  field: 'date',
  order: 'desc',
};

const PAGE_SIZE = 10;

export function useSalesData() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<SortState>(initialSort);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: PAGE_SIZE,
    totalItems: 0,
  });

  // Search function - case-insensitive search on Customer Name and Phone Number
  const searchData = useCallback((data: SalesTransaction[], query: string): SalesTransaction[] => {
    if (!query.trim()) return data;
    
    const lowerQuery = query.toLowerCase().trim();
    return data.filter(item => 
      item.customerName.toLowerCase().includes(lowerQuery) ||
      item.phoneNumber.toLowerCase().includes(lowerQuery)
    );
  }, []);

  // Filter function
  const filterData = useCallback((data: SalesTransaction[], filterState: FilterState): SalesTransaction[] => {
    return data.filter(item => {
      // Customer Region filter
      if (filterState.customerRegion.length > 0 && 
          !filterState.customerRegion.includes(item.customerRegion)) {
        return false;
      }

      // Gender filter
      if (filterState.gender.length > 0 && 
          !filterState.gender.includes(item.gender)) {
        return false;
      }

      // Age Range filter
      if (filterState.ageRange) {
        const [minAge, maxAge] = filterState.ageRange;
        if (item.age < minAge || item.age > maxAge) {
          return false;
        }
      }

      // Product Category filter
      if (filterState.productCategory.length > 0 && 
          !filterState.productCategory.includes(item.productCategory)) {
        return false;
      }

      // Tags filter
      if (filterState.tags.length > 0) {
        const itemTags = item.tags.split(',').map(t => t.trim());
        const hasMatchingTag = filterState.tags.some(tag => itemTags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Payment Method filter
      if (filterState.paymentMethod.length > 0 && 
          !filterState.paymentMethod.includes(item.paymentMethod)) {
        return false;
      }

      // Date Range filter
      if (filterState.dateRange) {
        const [startDate, endDate] = filterState.dateRange;
        const itemDate = new Date(item.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (itemDate < start || itemDate > end) {
          return false;
        }
      }

      return true;
    });
  }, []);

  // Sort function
  const sortData = useCallback((data: SalesTransaction[], sortState: SortState): SalesTransaction[] => {
    const sortedData = [...data];
    
    sortedData.sort((a, b) => {
      let comparison = 0;
      
      switch (sortState.field) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'quantity':
          comparison = a.quantity - b.quantity;
          break;
        case 'customerName':
          comparison = a.customerName.localeCompare(b.customerName);
          break;
        default:
          comparison = 0;
      }
      
      return sortState.order === 'asc' ? comparison : -comparison;
    });
    
    return sortedData;
  }, []);

  // Process data with search, filter, and sort
  const processedData = useMemo(() => {
    let result = [...salesData];
    
    // Apply search
    result = searchData(result, searchQuery);
    
    // Apply filters
    result = filterData(result, filters);
    
    // Apply sort
    result = sortData(result, sort);
    
    return result;
  }, [searchQuery, filters, sort, searchData, filterData, sortData]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    return processedData.slice(startIndex, endIndex);
  }, [processedData, pagination.currentPage, pagination.pageSize]);

  // Total pages
  const totalPages = useMemo(() => {
    return Math.ceil(processedData.length / pagination.pageSize);
  }, [processedData.length, pagination.pageSize]);

  // Update filters
  const updateFilter = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Update sort
  const updateSort = useCallback((field: SortState['field']) => {
    setSort(prev => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Update search
  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // Pagination controls
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPagination(prev => ({ ...prev, currentPage: page }));
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(pagination.currentPage + 1);
  }, [pagination.currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(pagination.currentPage - 1);
  }, [pagination.currentPage, goToPage]);

  // Statistics
  const stats = useMemo(() => {
    const totalSales = processedData.reduce((sum, item) => sum + item.finalAmount, 0);
    const totalQuantity = processedData.reduce((sum, item) => sum + item.quantity, 0);
    
    return {
      totalTransactions: processedData.length,
      totalSales: Math.round(totalSales * 100) / 100,
      totalQuantity,
    };
  }, [processedData]);

  return {
    // Data
    data: paginatedData,
    totalData: processedData.length,
    stats,
    
    // Search
    searchQuery,
    updateSearch,
    
    // Filters
    filters,
    updateFilter,
    clearFilters,
    
    // Sort
    sort,
    updateSort,
    
    // Pagination
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  };
}
