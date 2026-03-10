import { useState, useCallback, useMemo } from 'react';
import type { ColumnConfig } from '../types';

export interface UseTableSearchOptions {
  data: any[];
  columns: ColumnConfig[];
  columnIds?: string[];
  debounceMs?: number;
}

export interface UseTableSearchResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredData: any[];
  isSearching: boolean;
  clearSearch: () => void;
}

export function useTableSearch(options: UseTableSearchOptions): UseTableSearchResult {
  const { data, columns, columnIds } = options;
  const [searchTerm, setSearchTermInternal] = useState('');

  const searchableColumnIds = useMemo(() => {
    if (columnIds && columnIds.length > 0) {
      return columnIds;
    }
    return columns
      .filter(col => col.visible !== false)
      .map(col => col.metadata.columnId);
  }, [columns, columnIds]);

  const filteredData = useMemo(() => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return data;

    const lowerTerm = trimmed.toLowerCase();

    return data.filter(row => {
      return searchableColumnIds.some(colId => {
        const value = row[colId];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(lowerTerm);
      });
    });
  }, [data, searchTerm, searchableColumnIds]);

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermInternal(term);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTermInternal('');
  }, []);

  const isSearching = searchTerm.trim().length > 0;

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    isSearching,
    clearSearch,
  };
}
