import type { ReactNode } from 'react';
import type { VisibilityConfig, Device, Orientation } from '../../../types/shared.types';

export interface PaginatorProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  rightComponents?: ReactNode[];
  className?: string;
  langOverride?: string;
  i18nOrder?: 'global-first' | 'local-first';
  showItemsPerPage?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  config?: VisibilityConfig;
}

export interface PaginatorContext {
  t: (key: string, params?: Record<string, string | number>) => string;
  lang: string;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  setItemsPerPage: (items: number) => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
  visibilityConfig?: VisibilityConfig;
  isVisible: boolean;
  device: Device;
  orientation: Orientation;
  width: number;
}

export interface PaginatorMetadata {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startItem: number;
  endItem: number;
}
