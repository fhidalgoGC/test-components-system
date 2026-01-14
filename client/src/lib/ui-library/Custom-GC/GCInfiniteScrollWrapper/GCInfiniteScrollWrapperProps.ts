// Types and interfaces for GCInfiniteScrollWrapper component
import type React from 'react';

export interface GCInfiniteScrollWrapperProps {
  /** Children elements to be rendered inside the scroll wrapper */
  children: React.ReactNode;
  
  /** Callback function called when the scroll reaches the end (intersection occurs) */
  onIntersect?: () => void;
  
  /** Callback function called when the "Show More" button is clicked */
  onShowMore?: () => void;
  
  /** Whether to show the "Show More" button. Defaults to true */
  isShowMoreOptionVisible?: boolean;
  
  /** Whether the component is currently loading more content. Defaults to false */
  isLoading?: boolean;
  
  /** Whether there are more items to load. Defaults to true */
  hasMoreItems?: boolean;
  
  /** Distance in pixels from the bottom to trigger onIntersect. Defaults to 100 */
  threshold?: number;
  
  /** Additional CSS classes to apply to the wrapper */
  className?: string;
  
  /** Custom ID for the component */
  id?: string;
  
  /** Data testid for testing purposes */
  'data-testid'?: string;
}

// Default values
export const GC_DEFAULT_THRESHOLD = 100;
export const GC_DEFAULT_IS_SHOW_MORE_VISIBLE = true;
export const GC_DEFAULT_IS_LOADING = false;
export const GC_DEFAULT_HAS_MORE_ITEMS = true;