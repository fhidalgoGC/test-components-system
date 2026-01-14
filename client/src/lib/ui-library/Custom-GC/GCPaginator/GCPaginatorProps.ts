// Types and interfaces for GCPaginator component

export interface GCPageEvent {
  /** The current page index (zero-based) */
  pageIndex: number;
  /** The current page size */
  pageSize: number;
  /** The current total number of items being paged */
  length: number;
  /** The previous page index */
  previousPageIndex?: number;
}

export interface GCPaginatorProps {
  /** The zero-based page index of the displayed list of items. Defaulted to 0. */
  pageIndex?: number;
  
  /** Number of items to display on a page. By default set to 50. */
  pageSize?: number;
  
  /** The length of the total number of items that are being paginated. Defaulted to 0. */
  length?: number;
  
  /** The set of provided page size options to display to the user. */
  pageSizeOptions?: number[];
  
  /** Whether to show the first/last buttons in the paginator. */
  showFirstLastButtons?: boolean;
  
  /** Whether to hide the page size selection UI from the user. */
  hidePageSize?: boolean;
  
  /** Whether the paginator is disabled. */
  disabled?: boolean;
  
  /** Text label for the page size selector. If not provided, will use i18n translation. */
  pageSizeLabel?: string;
  
  /** Text for the range label. If not provided, will use i18n translation. */
  rangeLabel?: string;
  
  /** Function called when the paginator changes the page size or page index. */
  onPageChange?: (event: GCPageEvent) => void;
  
  /** Additional CSS classes to apply to the component */
  className?: string;
  
  /** Custom ID for the component */
  id?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

export interface GCPaginatorState {
  /** Current page index (zero-based) */
  currentPageIndex: number;
  
  /** Current page size */
  currentPageSize: number;
  
  /** Current total length */
  currentLength: number;
  
  /** Whether the component is initialized */
  initialized: boolean;
}

export interface GCPaginatorDisplayData {
  /** Start item number (one-based) */
  startItem: number;
  
  /** End item number (one-based) */
  endItem: number;
  
  /** Total number of items */
  totalItems: number;
  
  /** Current page number (one-based) */
  currentPage: number;
  
  /** Total number of pages */
  totalPages: number;
  
  /** Whether there is a next page */
  hasNext: boolean;
  
  /** Whether there is a previous page */
  hasPrevious: boolean;
  
  /** Whether this is the first page */
  isFirstPage: boolean;
  
  /** Whether this is the last page */
  isLastPage: boolean;
}

// Default values
export const GC_DEFAULT_PAGE_SIZE = 10;
export const GC_DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 25, 100];
export const GC_DEFAULT_PAGE_INDEX = 0;
export const GC_DEFAULT_LENGTH = 0;