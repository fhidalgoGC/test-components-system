import { useRef, useEffect, useCallback } from 'react';
import { GCButton } from '@/components/general/GCButton';
import './GCInfiniteScrollWrapper.scss';
import { 
  GCInfiniteScrollWrapperProps, 
  GC_DEFAULT_THRESHOLD, 
  GC_DEFAULT_IS_SHOW_MORE_VISIBLE, 
  GC_DEFAULT_IS_LOADING, 
  GC_DEFAULT_HAS_MORE_ITEMS 
} from './GCInfiniteScrollWrapperProps';

const GCInfiniteScrollWrapper = ({
  children,
  onIntersect,
  onShowMore,
  isShowMoreOptionVisible = GC_DEFAULT_IS_SHOW_MORE_VISIBLE,
  isLoading = GC_DEFAULT_IS_LOADING,
  hasMoreItems = GC_DEFAULT_HAS_MORE_ITEMS,
  threshold = GC_DEFAULT_THRESHOLD,
  className = '',
  id,
  'data-testid': dataTestId = 'gc-infinite-scroll-wrapper'
}: GCInfiniteScrollWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Handle intersection when user scrolls to bottom
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMoreItems && !isLoading && onIntersect) {
      onIntersect();
    }
  }, [hasMoreItems, isLoading, onIntersect]);

  // Set up intersection observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: wrapperRef.current,
      rootMargin: `0px 0px ${threshold}px 0px`,
      threshold: 0.1
    });

    observerRef.current.observe(sentinel);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleIntersection, threshold]);

  // Handle show more button click
  const handleShowMore = useCallback(() => {
    if (onShowMore && hasMoreItems && !isLoading) {
      onShowMore();
    }
  }, [onShowMore, hasMoreItems, isLoading]);

  const wrapperClasses = [
    'gc-infinite-scroll-wrapper',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="gc-infinite-scroll-container">
      <div
        ref={wrapperRef}
        className={wrapperClasses}
        id={id}
        data-testid={dataTestId}
      >
        {children}
        
        {/* Invisible sentinel element for intersection detection */}
        <div
          ref={sentinelRef}
          className="gc-infinite-scroll-sentinel"
          style={{ height: '1px', width: '100%' }}
          data-testid={`${dataTestId}-sentinel`}
        />
      </div>

      {/* Show More button */}
      {isShowMoreOptionVisible && hasMoreItems && (
        <div className="gc-infinite-scroll-show-more" data-testid={`${dataTestId}-show-more-container`}>
          {isLoading ? (
            <div className="gc-loading-text" data-testid={`${dataTestId}-loading-text`}>
              Cargando...
            </div>
          ) : (
            <GCButton
              variant="link"
              label="common.showMore"
              size="medium"
              onClick={handleShowMore}
              data-testid={`${dataTestId}-show-more-button`}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GCInfiniteScrollWrapper;