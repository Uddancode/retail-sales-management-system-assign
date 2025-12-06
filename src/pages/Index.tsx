import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { FilterPanel } from '@/components/filters/FilterPanel';
import { SalesTable } from '@/components/table/SalesTable';
import { Pagination } from '@/components/table/Pagination';
import { StatsBar } from '@/components/stats/StatsBar';
import { SortDropdown } from '@/components/sorting/SortDropdown';
import { useSalesData } from '@/hooks/useSalesData';

const Index = () => {
  const {
    data,
    totalData,
    stats,
    searchQuery,
    updateSearch,
    filters,
    updateFilter,
    clearFilters,
    sort,
    updateSort,
    currentPage,
    pageSize,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = useSalesData();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-56">
        {/* Header */}
        <Header searchQuery={searchQuery} onSearchChange={updateSearch} />

        {/* Stats Bar */}
        <StatsBar 
          totalTransactions={stats.totalTransactions}
          totalSales={stats.totalSales}
          totalQuantity={stats.totalQuantity}
        />

        {/* Filters */}
        <FilterPanel 
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {/* Sort and Table Controls */}
        <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
          <SortDropdown sort={sort} onSort={updateSort} />
          <div className="text-sm text-muted-foreground">
            {totalData} transactions found
          </div>
        </div>

        {/* Table */}
        <div className="bg-card">
          <SalesTable 
            data={data} 
            sort={sort} 
            onSort={updateSort} 
          />
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalData}
          pageSize={pageSize}
          onPageChange={goToPage}
          onNextPage={nextPage}
          onPrevPage={prevPage}
        />
      </div>
    </div>
  );
};

export default Index;
