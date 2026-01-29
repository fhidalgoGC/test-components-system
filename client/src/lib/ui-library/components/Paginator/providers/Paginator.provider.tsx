import { createContext, useContext, useMemo, useCallback } from 'react';
import type { PaginatorContext, PaginatorProps } from '../types';
import { useI18nMerge, useVisibility } from '../hooks';

const PaginatorCtx = createContext<PaginatorContext | undefined>(undefined);

export const usePaginatorContext = () => {
  const context = useContext(PaginatorCtx);
  if (!context) {
    throw new Error('usePaginatorContext must be used within PaginatorProvider');
  }
  return context;
};

interface PaginatorProviderProps extends PaginatorProps {
  children: React.ReactNode;
}

export const PaginatorProvider = ({ 
  children,
  langOverride,
  i18nOrder = 'local-first',
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  config,
}: PaginatorProviderProps) => {
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  const { cfg: visibilityConfig, width, device, orientation, isVisible } = useVisibility(config);
  
  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== currentPage) {
      onPageChange?.(validPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      goToPage(currentPage - 1);
    }
  }, [canGoPrevious, currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      goToPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, goToPage]);

  const setItemsPerPage = useCallback((items: number) => {
    if (items !== itemsPerPage) {
      onItemsPerPageChange?.(items);
    }
  }, [itemsPerPage, onItemsPerPageChange]);

  const value: PaginatorContext = useMemo(() => ({
    t,
    lang,
    totalItems,
    currentPage,
    itemsPerPage,
    totalPages,
    goToPage,
    goToFirstPage,
    goToLastPage,
    goToPreviousPage,
    goToNextPage,
    setItemsPerPage,
    canGoPrevious,
    canGoNext,
    visibilityConfig,
    isVisible,
    device,
    orientation,
    width,
  }), [
    t, lang, totalItems, currentPage, itemsPerPage, totalPages,
    goToPage, goToFirstPage, goToLastPage, goToPreviousPage, goToNextPage,
    setItemsPerPage, canGoPrevious, canGoNext, visibilityConfig, isVisible, device, orientation, width
  ]);

  return (
    <PaginatorCtx.Provider value={value}>
      {children}
    </PaginatorCtx.Provider>
  );
};
