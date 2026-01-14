export interface GCLabel {
  es?: string;
  en?: string;
  default: string;
}

export interface GCOption {
  id: string | number;
  label: GCLabel;
}

export interface GCPaginatedResponse<T> {
  data: T[];
  hasMore: boolean;
  total?: number;
  page?: number;
}

export interface GCPaginatedSelectProps {
  /** Required field validation */
  required?: boolean;
  
  /** Async function to load options with pagination */
  loadOptions: (page: number, search?: string) => Promise<GCPaginatedResponse<GCOption>>;
  
  /** Callback when option is selected */
  onSelect?: (id: GCOption['id']) => void;
  
  /** Validation label for error messages */
  validationLabel?: GCLabel;
  
  /** Placeholder text */
  placeholder?: GCLabel;
  
  /** Additional CSS classes */
  className?: string;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Current selected value */
  value?: string | number;
  
  /** External error message (from form validation) */
  error?: string;
  
  /** Force show error state */
  showError?: boolean;
  
  /** Test ID prefix for testing */
  testIdPrefix?: string;
  
  /** Enable search functionality */
  searchable?: boolean;
  
  /** Search placeholder */
  searchPlaceholder?: GCLabel;
  
  /** Debounce delay for search in ms */
  searchDebounce?: number;
}

// Default values
export const GC_DEFAULT_SEARCH_DEBOUNCE = 300;
export const GC_DEFAULT_SEARCHABLE = false;
