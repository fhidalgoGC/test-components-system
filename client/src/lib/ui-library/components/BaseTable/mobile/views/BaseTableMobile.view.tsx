import { useMemo, useState } from 'react';
import type {
  BaseTableProps,
  ColumnConfig,
  ColumnCellConfig,
  CellsDefaultConfig,
  SortDirection,
} from '../../shared/types';
import styles from '../styles/BaseTableMobile.module.css';

export const BaseTableMobileView = (props: BaseTableProps) => {
  const {
    config,
    data = [],
    state = 'idle',
    error,
    callbacks,
    className,
    dataTestId = 'base-table-mobile',
  } = props;

  const {
    headersDefault,
    rowsDefault,
    columnsDefault,
    cellsDefault,
    behaviors,
    columns,
    layout,
  } = config;

  const [sortState, setSortState] = useState<{ columnId: string; direction: SortDirection } | null>(null);

  const visibleColumns = useMemo(() => {
    return columns
      .filter(col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true))
      .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0));
  }, [columns, columnsDefault?.visible]);

  const isRowClickable = behaviors?.clickable === 'row';
  const isCellClickable = behaviors?.clickable === 'cell';
  const showHeaderDividers = headersDefault?.dividers !== false;
  const showRowDividers = rowsDefault?.dividers !== false;
  const isHeaderEnabled = headersDefault?.enabled !== false;

  const hasData = data.length > 0;
  const isLoadingWithData = state === 'loading' && hasData;
  const isLoadingMore = state === 'loadingMore';
  const shouldShowData = state === 'idle' || state === 'success' || isLoadingWithData || isLoadingMore;
  const shouldShowStateMessage = !shouldShowData && (state === 'loading' || state === 'error' || state === 'empty');

  const loadingMessage = behaviors?.states?.loading?.message ||
                         behaviors?.states?.loading?.defaultText ||
                         'Loading...';

  const mergeCellConfig = (
    cellsDefault?: CellsDefaultConfig,
    columnCell?: ColumnCellConfig
  ): ColumnCellConfig => ({
    verticalAlign: columnCell?.verticalAlign ?? cellsDefault?.verticalAlign,
    horizontalAlign: columnCell?.horizontalAlign ?? cellsDefault?.horizontalAlign,
    render: columnCell?.render ?? cellsDefault?.render,
  });

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return styles.alignCenter;
      case 'right': return styles.alignRight;
      default: return styles.alignLeft;
    }
  };

  const getValignClass = (align?: string) => {
    switch (align) {
      case 'top': return styles.valignTop;
      case 'bottom': return styles.valignBottom;
      default: return styles.valignMiddle;
    }
  };

  const getThAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return styles.thAlignCenter;
      case 'right': return styles.thAlignRight;
      default: return styles.thAlignLeft;
    }
  };

  const handleHeaderClick = (column: ColumnConfig) => {
    const cellConfig = column.header?.cell ?? headersDefault?.cell;
    const isSortable = column.sortable ?? cellConfig?.sortable ?? columnsDefault?.sortable ?? false;
    const isClickable = cellConfig?.clickable ?? false;
    if (!isSortable && !isClickable) return;

    const sortKey = cellConfig?.sortKey ?? column.metadata.columnId;
    let newDirection: SortDirection = 'asc';
    if (sortState?.columnId === column.metadata.columnId) {
      if (sortState.direction === 'asc') newDirection = 'desc';
      else if (sortState.direction === 'desc') newDirection = 'none';
      else newDirection = 'asc';
    }
    setSortState({ columnId: column.metadata.columnId, direction: newDirection });
    callbacks?.onHeaderClick?.(sortKey, newDirection);
    if (isSortable) callbacks?.onSort?.(column, newDirection);
  };

  const handleRowClick = (rowIndex: number, rowData: any) => {
    if (isRowClickable) callbacks?.onRowClick?.(rowIndex, rowData);
  };

  const handleCellClick = (columnId: string, rowIndex: number, value: any, rowData: any, e: React.MouseEvent) => {
    if (isCellClickable) {
      e.stopPropagation();
      callbacks?.onCellClick?.(columnId, rowIndex, value, rowData);
    }
  };

  const maxVisibleRows = rowsDefault?.maxVisibleRows;
  const visibleData = maxVisibleRows !== undefined && maxVisibleRows > 0
    ? data.slice(0, maxVisibleRows)
    : data;

  const wrapperClasses = [
    styles.mobileWrapper,
    styles.tableContainer,
    layout?.heightMode === 'full' ? styles.fullHeight : styles.autoHeight,
    className,
  ].filter(Boolean).join(' ');

  const wrapperStyle: React.CSSProperties = {};
  if (layout?.heightMode === 'fixed' && layout?.height) {
    wrapperStyle.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    wrapperStyle.overflowY = layout?.verticalScroll ? 'auto' : 'hidden';
  }

  const renderStateContent = () => {
    switch (state) {
      case 'loading': {
        const loadingConfig = behaviors?.states?.loading;
        if (loadingConfig?.component) return loadingConfig.component;
        return (
          <div className={styles.stateContainer}>
            <div className={styles.loadingSpinner} />
            <span>{loadingConfig?.defaultText || 'Loading...'}</span>
          </div>
        );
      }
      case 'error': {
        const errorConfig = behaviors?.states?.error;
        if (errorConfig?.component) return errorConfig.component;
        return (
          <div className={`${styles.stateContainer} ${styles.errorState}`}>
            <span>{error || errorConfig?.defaultText || 'An error occurred'}</span>
          </div>
        );
      }
      case 'empty': {
        const emptyConfig = behaviors?.states?.empty;
        if (emptyConfig?.component) return emptyConfig.component;
        return (
          <div className={`${styles.stateContainer} ${styles.emptyState}`}>
            <span>{emptyConfig?.defaultText || 'No data available'}</span>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <div className={wrapperClasses} style={wrapperStyle} data-testid={dataTestId}>
      {isLoadingWithData && (
        <div className={styles.loadingOverlay} data-testid="table-loading-overlay-mobile">
          <div className={styles.loadingOverlayContent}>
            <div className={styles.loadingOverlaySpinner} />
            <span className={styles.loadingOverlayText}>{loadingMessage}</span>
          </div>
        </div>
      )}

      <table className={styles.mobileTable}>
        {isHeaderEnabled && (
          <thead className={styles.thead}>
            <tr className={styles.theadRow}>
              {visibleColumns.map((column, index) => {
                const cellConfig = column.header?.cell ?? headersDefault?.cell;
                const horizontalAlign = cellConfig?.horizontalAlign ?? headersDefault?.cell?.horizontalAlign;
                const isSortable = column.sortable ?? cellConfig?.sortable ?? columnsDefault?.sortable ?? false;
                const iconPosition = cellConfig?.iconPosition ?? headersDefault?.cell?.iconPosition ?? 'right';
                const isActive = sortState?.columnId === column.metadata.columnId;

                const thClasses = [
                  styles.th,
                  isSortable && styles.sortable,
                  getThAlignClass(horizontalAlign),
                ].filter(Boolean).join(' ');

                const minWidth = column.minWidth ?? columnsDefault?.minWidth;
                const thStyle: React.CSSProperties = {};
                if (minWidth) thStyle.minWidth = minWidth;

                const renderHeaderContent = () => {
                  if (cellConfig?.render) return cellConfig.render;
                  if (headersDefault?.cell?.render) return headersDefault.cell.render;
                  return column.metadata.columnId;
                };

                return (
                  <th
                    key={column.metadata.columnId}
                    className={thClasses}
                    style={thStyle}
                    onClick={() => handleHeaderClick(column)}
                    data-testid={`th-mobile-${column.metadata.columnId}`}
                  >
                    <div className={styles.thContent}>
                      {isSortable && iconPosition === 'left' && (
                        <span className={`${styles.sortIcon} ${isActive ? styles.active : ''}`}>
                          {isActive && sortState?.direction === 'asc' && '↑'}
                          {isActive && sortState?.direction === 'desc' && '↓'}
                          {(!isActive || sortState?.direction === 'none') && '↕'}
                        </span>
                      )}
                      {renderHeaderContent()}
                      {isSortable && iconPosition === 'right' && (
                        <span className={`${styles.sortIcon} ${isActive ? styles.active : ''}`}>
                          {isActive && sortState?.direction === 'asc' && '↑'}
                          {isActive && sortState?.direction === 'desc' && '↓'}
                          {(!isActive || sortState?.direction === 'none') && '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
        )}

        {shouldShowData ? (
          <>
            <tbody className={styles.tbody}>
              {visibleData.map((row, rowIndex) => {
                const trClasses = [
                  styles.tr,
                  isRowClickable && styles.clickable,
                ].filter(Boolean).join(' ');

                return (
                  <tr
                    key={rowIndex}
                    className={trClasses}
                    onClick={() => handleRowClick(rowIndex, row)}
                    data-testid={`tr-mobile-${rowIndex}`}
                  >
                    {visibleColumns.map((column) => {
                      const columnId = column.metadata.columnId;
                      const value = row[columnId];
                      const mergedCellConfig = mergeCellConfig(cellsDefault, column.cell);

                      const tdClasses = [
                        styles.td,
                        isCellClickable && styles.clickable,
                        getAlignClass(mergedCellConfig.horizontalAlign),
                        getValignClass(mergedCellConfig.verticalAlign),
                      ].filter(Boolean).join(' ');

                      const renderContent = () => {
                        if (mergedCellConfig.render) {
                          if (typeof mergedCellConfig.render === 'function') {
                            return mergedCellConfig.render(value, row, columnId);
                          }
                          return mergedCellConfig.render;
                        }
                        return value ?? '';
                      };

                      return (
                        <td
                          key={columnId}
                          className={tdClasses}
                          onClick={(e) => handleCellClick(columnId, rowIndex, value, row, e)}
                          data-testid={`td-mobile-${columnId}-${rowIndex}`}
                        >
                          {renderContent()}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            {isLoadingMore && (
              <tfoot data-testid="table-loading-more-mobile">
                <tr>
                  <td colSpan={visibleColumns.length}>
                    <div className={styles.loadingMoreContainer}>
                      <div className={styles.loadingSpinner} style={{ width: 20, height: 20, borderWidth: 2 }} />
                      <span className={styles.loadingMoreText}>
                        {behaviors?.infiniteScroll?.loadingMoreMessage || 'Loading more...'}
                      </span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </>
        ) : shouldShowStateMessage ? (
          <tbody>
            <tr>
              <td colSpan={visibleColumns.length} data-testid={`table-state-mobile-${state}`}>
                {renderStateContent()}
              </td>
            </tr>
          </tbody>
        ) : null}
      </table>
    </div>
  );
};
