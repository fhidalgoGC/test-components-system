import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GCInfiniteScrollWrapper } from '@/components/general/GCInfiniteScrollWrapper';
import { GCProgressSpinner } from '@/components/general/GCProgressSpinner';
import { cn } from '@/lib/utils';
import { 
  GCPaginatedSelectProps, 
  GCLabel, 
  GCOption,
  GC_DEFAULT_SEARCH_DEBOUNCE,
  GC_DEFAULT_SEARCHABLE
} from './GCPaginatedSelectProps';
import { useLocalTranslation } from './hooks/useLocalTranslation';
import './GCPaginatedSelect.scss';

const getLocalizedText = (label: GCLabel, language: string): string => {
  if (language === 'es' && label.es) return label.es;
  if (language === 'en' && label.en) return label.en;
  return label.default;
};

export const GCPaginatedSelect = ({
  required = false,
  loadOptions,
  onSelect,
  validationLabel,
  placeholder,
  className,
  disabled = false,
  value,
  error: externalError,
  showError = false,
  testIdPrefix = "gc-paginated-select",
  searchable = GC_DEFAULT_SEARCHABLE,
  searchPlaceholder,
  searchDebounce = GC_DEFAULT_SEARCH_DEBOUNCE,
}: GCPaginatedSelectProps) => {
  const { t, i18n } = useLocalTranslation();
  const [options, setOptions] = useState<GCOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const currentLanguage = i18n.language;

  // Reset pagination when search changes
  const resetAndLoad = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      setPage(1);
      setOptions([]);
      
      const response = await loadOptions(1, searchTerm);
      setOptions(response.data);
      setHasMore(response.hasMore);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error loading options';
      setError(errorMessage);
      setOptions([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loadOptions]);

  // Load more options for pagination
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;
    
    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;
      const response = await loadOptions(nextPage, search);
      
      setOptions(prev => [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error('Error loading more options:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [page, hasMore, isLoadingMore, loadOptions, search]);

  // Handle search with debounce
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    searchTimeoutRef.current = setTimeout(() => {
      resetAndLoad(value);
    }, searchDebounce);
  }, [searchDebounce, resetAndLoad]);

  // Initial load
  useEffect(() => {
    resetAndLoad('');
  }, [resetAndLoad]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Placeholder localizado
  const localizedPlaceholder = useMemo(() => {
    if (loading) return t('loading');
    if (error) return t('errorLoadingOptions');
    if (!placeholder) return t('selectOption');
    return getLocalizedText(placeholder, currentLanguage);
  }, [placeholder, currentLanguage, loading, error, t]);

  // Search placeholder localizado
  const localizedSearchPlaceholder = useMemo(() => {
    if (!searchPlaceholder) return t('search');
    return getLocalizedText(searchPlaceholder, currentLanguage);
  }, [searchPlaceholder, currentLanguage, t]);

  // Validación
  const isValid = !required || (value !== undefined && value !== null && value !== '');
  const shouldShowError = showError || (externalError ? true : (required && submitted && !isValid));

  // Mensaje de error localizado
  const errorMessage = useMemo(() => {
    if (!shouldShowError) return '';
    if (externalError) return externalError;
    if (!validationLabel) {
      return t('requiredField');
    }
    return getLocalizedText(validationLabel, currentLanguage);
  }, [shouldShowError, externalError, validationLabel, currentLanguage, t]);

  const handleValueChange = (selectedValue: string) => {
    setSubmitted(true);
    if (onSelect) {
      onSelect(selectedValue);
    }
  };

  // Get selected option label
  const selectedOption = options.find(opt => String(opt.id) === String(value));
  const selectedLabel = selectedOption ? getLocalizedText(selectedOption.label, currentLanguage) : '';

  return (
    <div className={cn('gc-paginated-select', className)}>
      <SelectPrimitive
        value={value ? String(value) : undefined}
        onValueChange={handleValueChange}
        disabled={disabled || loading}
        data-testid={testIdPrefix}
      >
        <SelectTrigger 
          className={cn(shouldShowError && 'border-red-500')}
          data-testid={`${testIdPrefix}-trigger`}
        >
          <SelectValue placeholder={localizedPlaceholder}>
            {selectedLabel || localizedPlaceholder}
          </SelectValue>
        </SelectTrigger>
        
        <SelectContent data-testid={`${testIdPrefix}-content`}>
          {searchable && (
            <div className="gc-paginated-select__search" data-testid={`${testIdPrefix}-search`}>
              <input
                type="text"
                placeholder={localizedSearchPlaceholder}
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => e.stopPropagation()}
                data-testid={`${testIdPrefix}-search-input`}
              />
            </div>
          )}
          
          <GCInfiniteScrollWrapper
            onIntersect={loadMore}
            hasMoreItems={hasMore}
            isLoading={isLoadingMore}
            isShowMoreOptionVisible={false}
            className="gc-paginated-select__content"
            data-testid={`${testIdPrefix}-scroll-wrapper`}
          >
            {loading && options.length === 0 ? (
              <div className="gc-paginated-select__loading" data-testid={`${testIdPrefix}-loading`}>
                <GCProgressSpinner size="small" />
              </div>
            ) : options.length === 0 ? (
              <div className="gc-paginated-select__no-results" data-testid={`${testIdPrefix}-no-results`}>
                {t('noOptionsAvailable')}
              </div>
            ) : (
              options.map((option) => (
                <SelectItem
                  key={option.id}
                  value={String(option.id)}
                  data-testid={`${testIdPrefix}-option-${option.id}`}
                >
                  {getLocalizedText(option.label, currentLanguage)}
                </SelectItem>
              ))
            )}
            
            {isLoadingMore && (
              <div className="gc-paginated-select__loading" data-testid={`${testIdPrefix}-loading-more`}>
                <GCProgressSpinner size="small" />
              </div>
            )}
          </GCInfiniteScrollWrapper>
        </SelectContent>
      </SelectPrimitive>
      
      {shouldShowError && errorMessage && (
        <div className="gc-paginated-select__error" data-testid={`${testIdPrefix}-error`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
