import type { PaginatorProps } from '../types';
import { usePaginatorContext } from '../providers';
import styles from '../css/Paginator.module.css';

interface PageButtonProps {
  page: number | string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const PageButton = ({ page, isActive, disabled, onClick }: PageButtonProps) => (
  <button
    className={`${styles.pageButton} ${isActive ? styles.pageButtonActive : ''}`}
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

const generatePageNumbers = (currentPage: number, totalPages: number, maxVisible: number = 5): (number | string)[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const halfVisible = Math.floor((maxVisible - 2) / 2);
  
  pages.push(1);
  
  let start = Math.max(2, currentPage - halfVisible);
  let end = Math.min(totalPages - 1, currentPage + halfVisible);
  
  if (currentPage <= halfVisible + 1) {
    end = maxVisible - 1;
  } else if (currentPage >= totalPages - halfVisible) {
    start = totalPages - maxVisible + 2;
  }
  
  if (start > 2) {
    pages.push('...');
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  
  if (end < totalPages - 1) {
    pages.push('...');
  }
  
  if (totalPages > 1) {
    pages.push(totalPages);
  }
  
  return pages;
};

export const PaginatorView = (props: PaginatorProps) => {
  const { 
    className,
    rightComponents = [],
    itemsPerPageOptions = [10, 25, 50, 100],
    showItemsPerPage = true,
    showPageNumbers = true,
    maxVisiblePages = 5,
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

  return (
    <div className={`${styles.paginatorWrapper} ${className || ''}`} data-testid="paginator">
      <div className={styles.paginatorContent}>
        <div className={styles.leftSection}>
          {showItemsPerPage && (
            <ItemsPerPageSelect
              value={itemsPerPage}
              options={itemsPerPageOptions}
              onChange={setItemsPerPage}
              label={t('showing')}
            />
          )}
          
          <span className={styles.itemsInfo} data-testid="paginator-items-info">
            {t('of')} {totalItems} {t('items')}
          </span>
          
          {showPageNumbers && (
            <div className={styles.navigationContainer}>
              <NavButton onClick={goToFirstPage} disabled={!canGoPrevious} testId="paginator-first">
                {'|<'}
              </NavButton>
              <NavButton onClick={goToPreviousPage} disabled={!canGoPrevious} testId="paginator-prev">
                {'<'}
              </NavButton>
              
              <div className={styles.pageNumbers}>
                {pageNumbers.map((page, index) => (
                  typeof page === 'number' ? (
                    <PageButton
                      key={index}
                      page={page}
                      isActive={page === currentPage}
                      onClick={() => goToPage(page)}
                    />
                  ) : (
                    <span key={index} className={styles.ellipsis}>{page}</span>
                  )
                ))}
              </div>
              
              <NavButton onClick={goToNextPage} disabled={!canGoNext} testId="paginator-next">
                {'>'}
              </NavButton>
              <NavButton onClick={goToLastPage} disabled={!canGoNext} testId="paginator-last">
                {'>|'}
              </NavButton>
            </div>
          )}
        </div>
        
        {rightComponents.length > 0 && (
          <div className={styles.rightSection}>
            {rightComponents.map((component, index) => (
              <div key={index} className={styles.rightComponentItem}>
                {component}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
