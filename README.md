# Retail Sales Management System

## Overview

A comprehensive Retail Sales Management System built with React, TypeScript, and Tailwind CSS. Features advanced search capabilities, multi-select filtering, flexible sorting, and pagination for efficient sales data management. Designed with a clean, dark-themed interface following modern UI/UX principles.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: React Hooks (useState, useMemo, useCallback)
- **Icons**: Lucide React
- **Build Tool**: Vite

## Search Implementation Summary

Full-text search implemented on Customer Name and Phone Number fields. Search is case-insensitive, supports partial matching, and integrates seamlessly with active filters and sorting. Uses `String.includes()` for pattern matching with lowercase normalization.

## Filter Implementation Summary

Multi-select filtering available for: Customer Region, Gender, Age Range, Product Category, Tags, Payment Method, and Date Range. Filters work independently and in combination using AND logic. Each filter maintains state alongside search and sorting. Implemented using Popover-based multi-select components with checkboxes.

## Sorting Implementation Summary

Sorting supported for Date (Newest First by default), Quantity, and Customer Name (A-Z). Toggle between ascending/descending order by clicking column headers or using the dropdown. Sorting preserves active search queries and filter states. Uses `Array.sort()` with custom comparators for each field type.

## Pagination Implementation Summary

Page size fixed at 10 items per page. Supports Next/Previous navigation with first/last page shortcuts. Shows current range (e.g., "1-10 of 500"). Maintains active search, filter, and sort states across page changes. Implements smart page number display with ellipsis for large datasets.

## Setup Instructions

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd retail-sales-management

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The application will be available at `http://localhost:8080`
