import { createContext, useContext, useMemo, useCallback, useState, useEffect } from 'react';
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
  initialCurrentPage = 1,
  initialItemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  config,
}: PaginatorProviderProps) => {
  const { lang, t } = useI18nMerge(langOverride, { order: i18nOrder });
  const { cfg: visibilityConfig, width, device, orientation, isVisible } = useVisibility(config);
  
  const [itemsPerPage, setItemsPerPageInternal] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPageInternal] = useState(initialCurrentPage);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(totalItems / itemsPerPage));
  }, [totalItems, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      const newPage = totalPages;
      setCurrentPageInternal(newPage);
      onPageChange?.(newPage);
    }
  }, [totalPages, currentPage, onPageChange]);

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const setCurrentPage = useCallback((page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    if (validPage !== currentPage) {
      setCurrentPageInternal(validPage);
      onPageChange?.(validPage);
    }
  }, [currentPage, totalPages, onPageChange]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const goToFirstPage = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  const goToLastPage = useCallback(() => {
    setCurrentPage(totalPages);
  }, [setCurrentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      setCurrentPage(currentPage - 1);
    }
  }, [canGoPrevious, currentPage, setCurrentPage]);

  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      setCurrentPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, setCurrentPage]);

  const setItemsPerPage = useCallback((items: number) => {
    if (items !== itemsPerPage && items > 0) {
      setItemsPerPageInternal(items);
      setCurrentPageInternal(1);
      onItemsPerPageChange?.(items);
      onPageChange?.(1);
    }
  }, [itemsPerPage, onItemsPerPageChange, onPageChange]);

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
    setCurrentPage,
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
    setItemsPerPage, setCurrentPage, canGoPrevious, canGoNext, 
    visibilityConfig, isVisible, device, orientation, width
  ]);

  return (
    <PaginatorCtx.Provider value={value}>
      {children}
    </PaginatorCtx.Provider>
  );
};
