import { usePaginatorContext } from '../providers';

export const usePaginator = () => {
  const context = usePaginatorContext();
  
  return {
    currentPage: context.currentPage,
    itemsPerPage: context.itemsPerPage,
    totalItems: context.totalItems,
    totalPages: context.totalPages,
    canGoPrevious: context.canGoPrevious,
    canGoNext: context.canGoNext,
    setCurrentPage: context.setCurrentPage,
    setItemsPerPage: context.setItemsPerPage,
    setTotalItems: context.setTotalItems,
    goToPage: context.goToPage,
    goToFirstPage: context.goToFirstPage,
    goToLastPage: context.goToLastPage,
    goToPreviousPage: context.goToPreviousPage,
    goToNextPage: context.goToNextPage,
  };
};
