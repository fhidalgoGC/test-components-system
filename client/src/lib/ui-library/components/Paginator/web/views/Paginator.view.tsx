import type { PaginatorProps } from '../../shared/types';
import { usePaginatorContext } from '../../shared/providers';
import styles from '../styles/Paginator.module.css';

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
    data-testid={`paginator-page-${page}`}
  >
    {page}
  </button>
);

const NavButton = ({ 
  children, 
  onClick, 
  disabled, 
  testId 
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

const ItemsPerPageSelect = ({ 
  value, 
  options, 
  onChange,
  label,
}: { 
  value: number; 
  options: number[]; 
  onChange: (value: number) => void;
  label: string;
}) => (
  <div className={styles.itemsPerPageContainer}>
    <span className={styles.itemsPerPageLabel}>{label}</span>
    <select
      className={styles.itemsPerPageSelect}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      data-testid="paginator-items-per-page"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const generatePageNumbers = (currentPage: number, totalPages: number, maxVisible: number = 4): (number | string)[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const blockSize = maxVisible - 1;

  if (currentPage <= blockSize) {
    const pages: (number | string)[] = [];
    for (let i = 1; i <= blockSize; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  if (currentPage >= totalPages - blockSize + 1) {
    const pages: (number | string)[] = [1, '...'];
    for (let i = totalPages - blockSize + 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  const offset = Math.floor((blockSize - 1) / 2);
  const start = currentPage - offset;
  const end = start + blockSize - 1;

  const pages: (number | string)[] = [1, '...'];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
};

export const PaginatorView = (props: PaginatorProps) => {
  const { 
    className,
    itemsPerPageOptions = [10, 25, 50, 100],
    showItemsPerPage = true,
    showPageNumbers = true,
    maxVisiblePages = 4,
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

  const pageNumbers = generatePageNumbers(currentPage, totalPages, maxVisiblePages);
  const isEmpty = totalItems === 0;

  return (
    <div className={`${styles.paginatorWrapper} ${className || ''}`} data-testid="paginator">
      <div className={styles.paginatorContent}>
        <div className={styles.leftSection}>
          {showItemsPerPage && (
            <>
              <ItemsPerPageSelect
                value={itemsPerPage}
                options={itemsPerPageOptions}
                onChange={setItemsPerPage}
                label={t('showing')}
              />
              <span className={styles.itemsInfo} data-testid="paginator-items-info">
                {t('of')} {totalItems} {t('items')}
              </span>
            </>
          )}
          
          {showPageNumbers && (
            <div className={styles.navigationContainer}>
              <NavButton onClick={goToFirstPage} disabled={!canGoPrevious || isEmpty} testId="paginator-first">
                {'|<'}
              </NavButton>
              <NavButton onClick={goToPreviousPage} disabled={!canGoPrevious || isEmpty} testId="paginator-prev">
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
              
              <NavButton onClick={goToNextPage} disabled={!canGoNext || isEmpty} testId="paginator-next">
                {'>'}
              </NavButton>
              <NavButton onClick={goToLastPage} disabled={!canGoNext || isEmpty} testId="paginator-last">
                {'>|'}
              </NavButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
