import { useState, useEffect, useCallback, useMemo } from 'react';
import type {
  HeterogeneousListProps,
  ListState,
  UseHeterogeneousListReturn,
  RegistryModeProps,
  ElementsModeProps,
} from '../types';
import { validateProps } from '../utils';
import { useIntersectionObserver } from './useIntersectionObserver.hook';
import { useScrollPreservation } from './useScrollPreservation.hook';

export function useHeterogeneousList(
  props: HeterogeneousListProps
): UseHeterogeneousListReturn {
  const {
    mode,
    infiniteScroll = true,
    pageSize = 10,
    preserveScrollPosition = true,
    onLoad,
    onLoadingStart,
    onEnd,
  } = props;

  // Validate props
  useEffect(() => {
    validateProps(props);
  }, [props]);

  // Initialize state based on mode
  const [state, setState] = useState<ListState>(() => {
    if (mode === 'elements') {
      const elementsProps = props as ElementsModeProps;
      return {
        items: [],
        elements: elementsProps.initialElements || elementsProps.elements || [],
        page: 1,
        isLoading: false,
        hasMore: !!elementsProps.elementsLoader,
        error: null,
      };
    } else {
      const dataProps = props as RegistryModeProps;
      return {
        items: (dataProps.initialItems || dataProps.items || []) as any[],
        elements: [],
        page: 1,
        isLoading: false,
        hasMore: !!dataProps.dataLoader,
        error: null,
      };
    }
  });

  // Get the appropriate loader
  const loader = useMemo(() => {
    if (mode === 'elements') {
      return (props as ElementsModeProps).elementsLoader;
    } else {
      return (props as RegistryModeProps).dataLoader;
    }
  }, [mode, (props as any).dataLoader, (props as any).elementsLoader]);

  // Load data function
  const loadMore = useCallback(async () => {
    if (state.isLoading || !state.hasMore || !loader) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    // Call onLoadingStart callback
    onLoadingStart?.(state.page);

    try {
      const result = await loader({ page: state.page, limit: pageSize });

      if (mode === 'elements') {
        const elementsResult = result as { elements: React.ReactElement[]; hasMore: boolean };
        setState(prev => ({
          ...prev,
          elements: [...prev.elements, ...elementsResult.elements],
          hasMore: elementsResult.hasMore,
          isLoading: false,
          page: prev.page + 1,
        }));
        
        onLoad?.(state.page, elementsResult.elements.length);
        
        if (!elementsResult.hasMore) {
          onEnd?.();
        }
      } else {
        const dataResult = result as { items: any[]; hasMore: boolean };
        setState(prev => ({
          ...prev,
          items: [...prev.items, ...dataResult.items],
          hasMore: dataResult.hasMore,
          isLoading: false,
          page: prev.page + 1,
        }));
        
        onLoad?.(state.page, dataResult.items.length);
        
        if (!dataResult.hasMore) {
          onEnd?.();
        }
      }
    } catch (error) {
      setState(prev => ({ ...prev, error, isLoading: false }));
    }
  }, [state.isLoading, state.hasMore, state.page, loader, mode, pageSize, onLoad, onEnd]);

  // Retry function
  const retry = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
    loadMore();
  }, [loadMore]);

  // Load all at once if infinite scroll is disabled, or initial load with loader
  useEffect(() => {
    if (!infiniteScroll && loader && state.hasMore && !state.isLoading && state.page === 1) {
      loadMore();
    }
    // Initial load when loader becomes available
    if (infiniteScroll && loader && state.hasMore && !state.isLoading && state.page === 1 && state.items.length === 0 && state.elements.length === 0) {
      loadMore();
    }
  }, [infiniteScroll, loader, state.hasMore, state.isLoading, state.page, state.items.length, state.elements.length, loadMore]);

  // Update items/elements when props change (reactivity)
  // Only update if there's no active loader or if we're resetting
  useEffect(() => {
    if (mode === 'elements') {
      const elementsProps = props as ElementsModeProps;
      // Solo actualizar si no hay loader activo o si los elementos del prop tienen contenido
      if (elementsProps.elements !== undefined && (!elementsProps.elementsLoader || elementsProps.elements.length > 0)) {
        setState(prev => ({
          ...prev,
          elements: elementsProps.elements || [],
          hasMore: !!elementsProps.elementsLoader,
          page: 1,
        }));
      }
    } else {
      const dataProps = props as RegistryModeProps;
      // Solo actualizar si no hay loader activo o si los items del prop tienen contenido
      if (dataProps.items !== undefined && (!dataProps.dataLoader || dataProps.items.length > 0)) {
        setState(prev => ({
          ...prev,
          items: dataProps.items || [],
          hasMore: !!dataProps.dataLoader,
          page: 1,
        }));
      }
    }
  }, [mode, (props as any).items, (props as any).elements]);

  // Intersection observer for infinite scroll
  const sentinelRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: infiniteScroll && state.hasMore && !state.isLoading,
  });

  // Scroll preservation
  const itemCount = mode === 'elements' ? state.elements.length : state.items.length;
  useScrollPreservation({
    enabled: preserveScrollPosition,
    itemCount,
  });

  return {
    state,
    sentinelRef,
    retry,
    loadMore,
  };
}
