import type { ReactNode, ReactElement, ComponentType } from 'react';

// Mode types
export type ListMode = 'registry' | 'elements';

// Divider types
export type DividerVariant = 'none' | 'line' | 'component';

// Loader params
export interface LoaderParams {
  page: number;
  limit: number;
}

// Loader responses
export interface DataLoaderResponse<T = any> {
  items: T[];
  hasMore: boolean;
}

export interface ElementsLoaderResponse {
  elements: ReactElement[];
  hasMore: boolean;
}

// Registry item interface
export interface RegistryItem {
  id: string | number;
  kindComponent: string;
  [key: string]: any;
}

// Base props shared by all modes
export interface BaseListProps {
  mode: ListMode;
  
  // Pagination / Scroll
  infiniteScroll?: boolean;
  pageSize?: number;
  preserveScrollPosition?: boolean;
  
  // Style / Layout
  className?: string;
  listClassName?: string;
  itemClassName?: string;
  itemWrapperProps?: Record<string, any>;
  
  // Spacing
  gap?: number | string;
  paddingStart?: number | string;
  paddingEnd?: number | string;
  
  // Dividers
  dividerVariant?: DividerVariant;
  dividerEvery?: number;
  dividerInset?: number | string;
  renderDivider?: (index: number) => ReactNode;
  
  // States/UX
  empty?: ReactNode;
  emptySpacing?: number | string;
  endRender?: ReactNode;
  endSpacing?: number | string;
  loading?: ReactNode;
  errorRender?: (error: unknown, retry: () => void) => ReactNode;
  
  // Callbacks
  onLoad?: (page: number, received: number) => void;
  onLoadingStart?: (page: number) => void;
  onEnd?: () => void;
  
  // Virtualization (future)
  virtualize?: boolean;
  estimatedItemSize?: number;
}

// Registry mode props
export interface RegistryModeProps<T extends RegistryItem = RegistryItem> extends BaseListProps {
  mode: 'registry';
  items?: T[];
  registry: Record<string, ComponentType<{ item: T; index: number }>>;
  itemKey?: (item: T, index: number) => string | number;
  dataLoader?: (params: LoaderParams) => Promise<DataLoaderResponse<T>>;
  initialItems?: T[];
  
  // Prohibited
  elementsLoader?: never;
  elements?: never;
  initialElements?: never;
}

// Elements mode props
export interface ElementsModeProps extends BaseListProps {
  mode: 'elements';
  elements?: ReactElement[];
  elementsLoader?: (params: LoaderParams) => Promise<ElementsLoaderResponse>;
  initialElements?: ReactElement[];
  
  // Prohibited
  dataLoader?: never;
  items?: never;
  registry?: never;
  itemKey?: never;
  initialItems?: never;
}

// Union type for all modes (without generic to avoid constraint issues)
export type HeterogeneousListProps = 
  | RegistryModeProps<any>
  | ElementsModeProps;

// Internal state
export interface ListState<T = any> {
  items: T[];
  elements: ReactElement[];
  page: number;
  isLoading: boolean;
  hasMore: boolean;
  error: unknown | null;
}

// Hook return type
export interface UseHeterogeneousListReturn {
  state: ListState;
  sentinelRef: (node: HTMLDivElement | null) => void;
  retry: () => void;
  loadMore: () => void;
}
