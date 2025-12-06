# Architecture Document

## Backend Architecture

This implementation uses a client-side data processing approach suitable for demonstration purposes. The data layer (`src/data/salesData.ts`) generates realistic sales data and provides utility functions for data access.

### Data Layer
- **Data Generation**: Synthetic data generator creating 500+ realistic sales transactions
- **Data Structure**: TypeScript interfaces define strict types for all entities
- **Export Functions**: Utility exports for filter options (regions, genders, categories, etc.)

### Processing Layer
- **Search**: Case-insensitive full-text search on Customer Name and Phone Number
- **Filtering**: Multi-dimensional filtering supporting AND logic across all filter types
- **Sorting**: Multi-field sorting with toggle between ascending/descending
- **Pagination**: Client-side pagination with configurable page size (default: 10)

## Frontend Architecture

### Component Hierarchy
```
App
└── Index (Page)
    ├── Sidebar (Navigation)
    ├── Header (Search Bar)
    ├── StatsBar (Summary Metrics)
    ├── FilterPanel (Multi-select Filters)
    ├── SortDropdown (Sorting Controls)
    ├── SalesTable (Data Display)
    └── Pagination (Navigation Controls)
```

### State Management
- **useSalesData Hook**: Central custom hook managing all application state
  - Search state
  - Filter state
  - Sort state
  - Pagination state
- **Memoization**: useMemo for expensive computations (filtering, sorting)
- **Callbacks**: useCallback for stable function references

### UI Framework
- **React**: Core UI library
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Pre-built accessible components
- **Lucide Icons**: Consistent iconography

## Data Flow

1. **User Input** → Search/Filter/Sort/Pagination controls
2. **State Update** → useSalesData hook updates relevant state
3. **Data Processing** → useMemo recalculates filtered/sorted data
4. **UI Render** → Components receive processed data as props

```
User Action
    ↓
State Update (useState)
    ↓
Memoized Computation (useMemo)
    ↓
Component Re-render
    ↓
Updated UI
```

## Folder Structure

```
src/
├── components/
│   ├── filters/
│   │   └── FilterPanel.tsx      # Multi-select filter UI
│   ├── layout/
│   │   ├── Header.tsx           # Top navigation with search
│   │   └── Sidebar.tsx          # Left navigation menu
│   ├── sorting/
│   │   └── SortDropdown.tsx     # Sort field selector
│   ├── stats/
│   │   └── StatsBar.tsx         # Summary statistics
│   ├── table/
│   │   ├── Pagination.tsx       # Page navigation
│   │   └── SalesTable.tsx       # Data table display
│   └── ui/                      # shadcn/ui components
├── data/
│   └── salesData.ts             # Data generation & access
├── hooks/
│   └── useSalesData.ts          # Central state management
├── pages/
│   ├── Index.tsx                # Main application page
│   └── NotFound.tsx             # 404 page
├── types/
│   └── sales.ts                 # TypeScript interfaces
└── lib/
    └── utils.ts                 # Utility functions
```

## Module Responsibilities

### Data Module (`src/data/`)
- Generate realistic sales data
- Provide filter option constants
- Export typed data arrays

### Hooks Module (`src/hooks/`)
- Centralize state management
- Provide data processing logic
- Export stable callbacks for UI

### Components Module (`src/components/`)
- Render UI elements
- Handle user interactions
- Delegate state changes to hooks

### Types Module (`src/types/`)
- Define TypeScript interfaces
- Ensure type safety across modules
- Document data structures

## Edge Case Handling

1. **No Search Results**: Empty state with helpful message
2. **Conflicting Filters**: Intersection logic returns subset or empty set
3. **Invalid Age Ranges**: Slider bounds prevent invalid ranges
4. **Large Filter Combinations**: Efficient memoization prevents lag
5. **Missing Optional Fields**: Graceful fallback to default values
