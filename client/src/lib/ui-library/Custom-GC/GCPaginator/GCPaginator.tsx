import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { 
  GCPaginatorProps, 
  GCPaginatorState, 
  GCPageEvent, 
  GCPaginatorDisplayData,
  GC_DEFAULT_PAGE_SIZE,
  GC_DEFAULT_PAGE_SIZE_OPTIONS,
  GC_DEFAULT_PAGE_INDEX,
  GC_DEFAULT_LENGTH
} from './GCPaginatorProps';
import './GCPaginator.scss';

const GCPaginator = ({
  pageIndex = GC_DEFAULT_PAGE_INDEX,
  pageSize = GC_DEFAULT_PAGE_SIZE,
  length = GC_DEFAULT_LENGTH,
  pageSizeOptions = GC_DEFAULT_PAGE_SIZE_OPTIONS,
  showFirstLastButtons = true,
  hidePageSize = false,
  disabled = false,
  pageSizeLabel,
  rangeLabel,
  onPageChange,
  className = '',
  id,
  'data-testid': dataTestId = 'gc-paginator'
}: GCPaginatorProps) => {
  const { t } = useTranslation();
  
  const [state, setState] = useState<GCPaginatorState>({
    currentPageIndex: pageIndex,
    currentPageSize: pageSize,
    currentLength: length,
    initialized: false
  });

  // Update state when props change
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      currentPageIndex: pageIndex,
      currentPageSize: pageSize,
      currentLength: length,
      initialized: true
    }));
  }, [pageIndex, pageSize, length]);

  // Calculate display data
  const getDisplayData = useCallback((): GCPaginatorDisplayData => {
    const totalPages = Math.ceil(state.currentLength / state.currentPageSize) || 1;
    const currentPage = state.currentPageIndex + 1;
    const startItem = state.currentLength === 0 ? 0 : (state.currentPageIndex * state.currentPageSize) + 1;
    const endItem = Math.min(startItem + state.currentPageSize - 1, state.currentLength);

    return {
      startItem,
      endItem,
      totalItems: state.currentLength,
      currentPage,
      totalPages,
      hasNext: state.currentPageIndex < totalPages - 1,
      hasPrevious: state.currentPageIndex > 0,
      isFirstPage: state.currentPageIndex === 0,
      isLastPage: state.currentPageIndex === totalPages - 1 || totalPages === 1
    };
  }, [state]);

  const displayData = getDisplayData();

  // Emit page change event
  const emitPageEvent = useCallback((newPageIndex: number, newPageSize: number, previousPageIndex?: number) => {
    if (onPageChange) {
      const event: GCPageEvent = {
        pageIndex: newPageIndex,
        pageSize: newPageSize,
        length: state.currentLength,
        previousPageIndex
      };
      onPageChange(event);
    }
  }, [onPageChange, state.currentLength]);

  // Navigate to first page
  const goToFirstPage = () => {
    if (disabled || displayData.isFirstPage) return;
    
    const previousPageIndex = state.currentPageIndex;
    setState(prev => ({ ...prev, currentPageIndex: 0 }));
    emitPageEvent(0, state.currentPageSize, previousPageIndex);
  };

  // Navigate to previous page
  const goToPreviousPage = () => {
    if (disabled || !displayData.hasPrevious) return;
    
    const newPageIndex = state.currentPageIndex - 1;
    const previousPageIndex = state.currentPageIndex;
    setState(prev => ({ ...prev, currentPageIndex: newPageIndex }));
    emitPageEvent(newPageIndex, state.currentPageSize, previousPageIndex);
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (disabled || !displayData.hasNext) return;
    
    const newPageIndex = state.currentPageIndex + 1;
    const previousPageIndex = state.currentPageIndex;
    setState(prev => ({ ...prev, currentPageIndex: newPageIndex }));
    emitPageEvent(newPageIndex, state.currentPageSize, previousPageIndex);
  };

  // Navigate to last page
  const goToLastPage = () => {
    if (disabled || displayData.isLastPage) return;
    
    const newPageIndex = displayData.totalPages - 1;
    const previousPageIndex = state.currentPageIndex;
    setState(prev => ({ ...prev, currentPageIndex: newPageIndex }));
    emitPageEvent(newPageIndex, state.currentPageSize, previousPageIndex);
  };

  // Handle page size change
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (disabled) return;
    
    const newPageSize = parseInt(event.target.value, 10);
    const previousPageIndex = state.currentPageIndex;
    
    // Calculate new page index to maintain the first item position if possible
    const currentFirstItem = state.currentPageIndex * state.currentPageSize;
    const newPageIndex = Math.floor(currentFirstItem / newPageSize);
    
    setState(prev => ({
      ...prev,
      currentPageSize: newPageSize,
      currentPageIndex: newPageIndex
    }));
    
    emitPageEvent(newPageIndex, newPageSize, previousPageIndex);
  };

  if (!state.initialized) {
    return null;
  }

  return (
    <div 
      className={`gc-paginator ${disabled ? 'gc-paginator--disabled' : ''} ${className}`}
      id={id}
      data-testid={dataTestId}
    >
      {/* Page size selector */}
      {!hidePageSize && (
        <div className="gc-paginator__page-size" data-testid={`${dataTestId}-page-size`}>
          <label className="gc-paginator__page-size-label" htmlFor={`${dataTestId}-page-size-select`}>
            {pageSizeLabel || t('rowsPerPage')}
          </label>
          <select
            id={`${dataTestId}-page-size-select`}
            className="gc-paginator__page-size-select"
            value={state.currentPageSize}
            onChange={handlePageSizeChange}
            disabled={disabled}
            data-testid={`${dataTestId}-page-size-select`}
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Range display */}
      <div className="gc-paginator__range" data-testid={`${dataTestId}-range`}>
        {state.currentLength === 0 ? (
          t('paginationRange', { start: 0, end: 0, total: 0 })
        ) : (
          rangeLabel ? 
            `${displayData.startItem} – ${displayData.endItem} ${rangeLabel} ${displayData.totalItems}` :
            t('paginationRange', { start: displayData.startItem, end: displayData.endItem, total: displayData.totalItems })
        )}
      </div>

      {/* Navigation buttons */}
      <div className="gc-paginator__navigation" data-testid={`${dataTestId}-navigation`}>
        {/* First page button */}
        {showFirstLastButtons && (
          <button
            className="gc-paginator__button gc-paginator__button--first"
            onClick={goToFirstPage}
            disabled={disabled || displayData.isFirstPage}
            aria-label={t('firstPage')}
            data-testid={`${dataTestId}-first-page`}
          >
            <ChevronsLeft className="gc-paginator__icon" />
          </button>
        )}

        {/* Previous page button */}
        <button
          className="gc-paginator__button gc-paginator__button--previous"
          onClick={goToPreviousPage}
          disabled={disabled || !displayData.hasPrevious}
          aria-label={t('previousPage')}
          data-testid={`${dataTestId}-previous-page`}
        >
          <ChevronLeft className="gc-paginator__icon" />
        </button>

        {/* Next page button */}
        <button
          className="gc-paginator__button gc-paginator__button--next"
          onClick={goToNextPage}
          disabled={disabled || !displayData.hasNext}
          aria-label={t('nextPage')}
          data-testid={`${dataTestId}-next-page`}
        >
          <ChevronRight className="gc-paginator__icon" />
        </button>

        {/* Last page button */}
        {showFirstLastButtons && (
          <button
            className="gc-paginator__button gc-paginator__button--last"
            onClick={goToLastPage}
            disabled={disabled || displayData.isLastPage}
            aria-label={t('lastPage')}
            data-testid={`${dataTestId}-last-page`}
          >
            <ChevronsRight className="gc-paginator__icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GCPaginator;