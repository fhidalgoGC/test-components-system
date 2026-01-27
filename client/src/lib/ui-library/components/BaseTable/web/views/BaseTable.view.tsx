import { useMemo } from 'react';
import type { BaseTableProps, TableState } from '../types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableStates } from './TableStates';
import styles from '../css/BaseTable.module.css';

export const BaseTableView = (props: BaseTableProps) => {
  const {
    config,
    data = [],
    state = 'idle',
    error,
    callbacks,
    className,
    dataTestId = 'base-table',
  } = props;

  const {
    layout,
    headersDefault,
    rowsDefault,
    columnsDefault,
    cellsDefault,
    behaviors,
    columns,
  } = config;

  const wrapperClasses = useMemo(() => {
    const classes = [styles.tableWrapper];
    
    if (layout?.widthMode === 'full') classes.push(styles.fullWidth);
    if (layout?.widthMode === 'auto') classes.push(styles.autoWidth);
    if (layout?.heightMode === 'full') classes.push(styles.fullHeight);
    if (layout?.heightMode === 'auto') classes.push(styles.autoHeight);
    
    if (columnsDefault?.scroll === false) {
      classes.push(styles.noScroll);
    } else {
      classes.push(styles.withScroll);
    }
    
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [layout, columnsDefault?.scroll, className]);

  const wrapperStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    if (layout?.widthMode === 'fixed' && layout?.width) {
      style.width = typeof layout.width === 'number' ? `${layout.width}px` : layout.width;
    }
    if (layout?.heightMode === 'fixed' && layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    if (layout?.minWidth) style.minWidth = layout.minWidth;
    if (layout?.minHeight) style.minHeight = layout.minHeight;
    
    return style;
  }, [layout]);

  const visibleColumns = useMemo(() => {
    return columns.filter(
      col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true)
    );
  }, [columns, columnsDefault?.visible]);

  const columnWidthInfo = useMemo(() => {
    let stretchCount = 0;
    let fixedWidthTotal = 0;
    
    visibleColumns.forEach(col => {
      const maxWidth = col.maxWidth ?? columnsDefault?.maxWidth;
      if (maxWidth === 'stretch') {
        stretchCount++;
      } else if (typeof maxWidth === 'number') {
        fixedWidthTotal += maxWidth;
      }
    });
    
    // Si no hay columnas stretch, la última columna absorberá el espacio restante
    const autoStretchLastColumn = stretchCount === 0 && visibleColumns.length > 0;
    const lastColumnId = autoStretchLastColumn ? visibleColumns[visibleColumns.length - 1]?.metadata.columnId : null;
    
    return { 
      stretchCount: autoStretchLastColumn ? 1 : stretchCount, 
      fixedWidthTotal,
      autoStretchLastColumn,
      lastColumnId
    };
  }, [visibleColumns, columnsDefault?.maxWidth]);

  const hasStretchColumns = columnWidthInfo.stretchCount > 0 || columnWidthInfo.autoStretchLastColumn;

  const tableClasses = useMemo(() => {
    const classes = [styles.table];
    if (layout?.widthMode === 'fixed') classes.push(styles.tableFixed);
    if (hasStretchColumns) classes.push(styles.tableFixed);
    return classes.join(' ');
  }, [layout, hasStretchColumns]);

  const visibleColumnsCount = visibleColumns.length;

  const hasData = data.length > 0;
  const isLoadingWithData = state === 'loading' && hasData;
  const shouldShowData = state === 'idle' || state === 'success' || isLoadingWithData;
  const shouldShowStateMessage = !shouldShowData && (state === 'loading' || state === 'error' || state === 'empty');

  const loadingMessage = behaviors?.states?.loading?.message || 
                         behaviors?.states?.loading?.defaultText || 
                         'Loading...';

  return (
    <div className={`${wrapperClasses} ${styles.tableContainer}`} style={wrapperStyle} data-testid={dataTestId}>
      {isLoadingWithData && (
        <div className={styles.loadingOverlay} data-testid="table-loading-overlay">
          <div className={styles.loadingOverlayContent}>
            <div className={styles.loadingOverlaySpinner} />
            <span className={styles.loadingOverlayText}>{loadingMessage}</span>
          </div>
        </div>
      )}
      
      <table className={tableClasses}>
        <TableHeader
          columns={columns}
          headersDefault={headersDefault}
          columnsDefault={columnsDefault}
          callbacks={callbacks}
          stretchCount={columnWidthInfo.stretchCount}
          fixedWidthTotal={columnWidthInfo.fixedWidthTotal}
          autoStretchLastColumnId={columnWidthInfo.lastColumnId}
        />

        {shouldShowData ? (
          <TableBody
            data={data}
            columns={columns}
            rowsDefault={rowsDefault}
            columnsDefault={columnsDefault}
            cellsDefault={cellsDefault}
            behaviors={behaviors}
            callbacks={callbacks}
            stretchCount={columnWidthInfo.stretchCount}
            fixedWidthTotal={columnWidthInfo.fixedWidthTotal}
            autoStretchLastColumnId={columnWidthInfo.lastColumnId}
          />
        ) : shouldShowStateMessage ? (
          <TableStates
            state={state}
            statesConfig={behaviors?.states}
            error={error}
            columnsCount={visibleColumnsCount}
          />
        ) : null}
      </table>
    </div>
  );
};
