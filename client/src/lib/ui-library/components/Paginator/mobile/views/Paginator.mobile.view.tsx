import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { PaginatorProps } from '../../shared/types';
import { usePaginatorContext } from '../../shared/providers';
import { BottomSheetWrapperMobileView } from '../../../wrappers/BottomSheetWrapper/mobile/views';
import styles from '../styles/Paginator.mobile.module.css';

interface PageButtonProps {
  page: number | string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const PageButton = ({ page, isActive, disabled, onClick }: PageButtonProps) => (
  <button
    className={`${styles.pageButton} ${isActive ? styles.pageButtonActive : ''} ${disabled ? styles.pageButtonDisabled : ''}`}
    onClick={onClick}
    disabled={disabled}
    data-testid={`paginator-mobile-page-${page}`}
  >
    {page}
  </button>
);

const NavButton = ({
  children,
  onClick,
  disabled,
  testId,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  testId: string;
}) => (
  <button
    className={`${styles.navButton} ${disabled ? styles.navButtonDisabled : ''}`}
    onClick={onClick}
    disabled={disabled}
    data-testid={testId}
  >
    {children}
  </button>
);

const generatePageNumbers = (currentPage: number, totalPages: number, maxVisible: number = 3): (number | string)[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const blockSize = maxVisible - 1;
  const offset = Math.floor((blockSize - 1) / 2);
  let start = currentPage - offset;
  let end = start + blockSize - 1;

  if (start < 1) {
    start = 1;
    end = blockSize;
  }
  if (end > totalPages) {
    end = totalPages;
    start = totalPages - blockSize + 1;
  }

  const pages: (number | string)[] = [];

  if (start > 2) {
    pages.push(1, '...');
  } else if (start === 2) {
    pages.push(1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) {
    pages.push('...', totalPages);
  } else if (end === totalPages - 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const PaginatorMobileView = (props: PaginatorProps) => {
  const {
    className,
    itemsPerPageOptions = [10, 25, 50, 100],
    showItemsPerPage = true,
    showPageNumbers = true,
    maxVisiblePages = 3,
  } = props;

  const {
    t,
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
  } = usePaginatorContext();

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSelectOption = (value: number) => {
    setItemsPerPage(value);
    setIsSheetOpen(false);
  };

  const pageNumbers = generatePageNumbers(currentPage, totalPages, maxVisiblePages);
  const isEmpty = totalItems === 0;

  return (
    <div className={`${styles.paginatorWrapper} ${className || ''}`} data-testid="paginator-mobile">
      {showPageNumbers && (
        <div className={styles.topRow}>
          <NavButton onClick={goToFirstPage} disabled={!canGoPrevious || isEmpty} testId="paginator-mobile-first">
            {'|<'}
          </NavButton>
          <NavButton onClick={goToPreviousPage} disabled={!canGoPrevious || isEmpty} testId="paginator-mobile-prev">
            {'<'}
          </NavButton>

          <div className={styles.pageNumbers}>
            {pageNumbers.map((page, index) => (
              typeof page === 'number' ? (
                <PageButton
                  key={index}
                  page={page}
                  isActive={page === currentPage}
                  disabled={isEmpty}
                  onClick={() => goToPage(page)}
                />
              ) : (
                <span key={index} className={styles.ellipsis}>{page}</span>
              )
            ))}
          </div>

          <NavButton onClick={goToNextPage} disabled={!canGoNext || isEmpty} testId="paginator-mobile-next">
            {'>'}
          </NavButton>
          <NavButton onClick={goToLastPage} disabled={!canGoNext || isEmpty} testId="paginator-mobile-last">
            {'>|'}
          </NavButton>
        </div>
      )}

      {showItemsPerPage && (
        <>
          <div className={styles.bottomRow}>
            <div className={styles.itemsPerPageContainer}>
              <span className={styles.itemsPerPageLabel}>{t('showing')}</span>
              <button
                className={styles.itemsPerPageButton}
                onClick={() => setIsSheetOpen(true)}
                data-testid="paginator-mobile-items-per-page"
              >
                {itemsPerPage}
                <ChevronDown className={styles.chevronIcon} />
              </button>
            </div>

            <span className={styles.itemsInfo} data-testid="paginator-mobile-items-info">
              {t('of')} {totalItems} {t('items')}
            </span>
          </div>

          <BottomSheetWrapperMobileView
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            title={t('itemsPerPage')}
            heightMode="auto"
            dataTestId="paginator-mobile-sheet"
          >
            <div>
              {itemsPerPageOptions.map((option) => (
                <button
                  key={option}
                  className={`${styles.sheetOption} ${option === itemsPerPage ? styles.sheetOptionActive : ''}`}
                  onClick={() => handleSelectOption(option)}
                  data-testid={`paginator-mobile-option-${option}`}
                >
                  <span>{option} {t('items')}</span>
                  {option === itemsPerPage && <Check className={styles.checkIcon} />}
                </button>
              ))}
            </div>
          </BottomSheetWrapperMobileView>
        </>
      )}
    </div>
  );
};
