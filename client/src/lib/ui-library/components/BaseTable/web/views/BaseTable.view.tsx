import { useMemo, useRef, useCallback } from 'react';
import type { BaseTableProps, TableState } from '../types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableStates } from './TableStates';
import { TableColgroup } from './TableColgroup';
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

  const headerScrollRef = useRef<HTMLDivElement>(null);
  const bodyScrollRef = useRef<HTMLDivElement>(null);

  // Sincronizar scroll horizontal entre header y body
  const handleBodyScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
  }, []);

  const useSeparatedLayout = layout?.stickyHeader && layout?.heightMode === 'fixed' && layout?.height;

  const wrapperClasses = useMemo(() => {
    const classes = [styles.tableWrapper];
    
    if (layout?.widthMode === 'full') classes.push(styles.fullWidth);
    if (layout?.widthMode === 'auto') classes.push(styles.autoWidth);
    if (layout?.heightMode === 'full') classes.push(styles.fullHeight);
    if (layout?.heightMode === 'auto') classes.push(styles.autoHeight);
    
    // Scroll horizontal (solo si no usamos layout separado)
    if (!useSeparatedLayout) {
      // Priorizar layout.horizontalScroll, fallback a columnsDefault.scroll
      const horizontalScroll = layout?.horizontalScroll ?? columnsDefault?.scroll;
      if (horizontalScroll === false) {
        classes.push(styles.noScroll);
      } else {
        classes.push(styles.withScroll);
      }
      
      // Scroll vertical
      if (layout?.heightMode === 'fixed' && layout?.height) {
        // Si hay altura fija, controlar si hay scroll o se corta
        if (layout?.stickyHeader) {
          // Con sticky header, el scroll lo maneja el layout separado
          classes.push(styles.noVerticalScroll);
        } else if (layout?.verticalScroll) {
          // Sin sticky header pero con scroll habilitado
          classes.push(styles.withVerticalScroll);
        } else {
          // Sin sticky header y sin scroll: cortar contenido
          classes.push(styles.noVerticalScroll);
        }
      } else {
        classes.push(styles.noVerticalScroll);
      }
    }
    
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [layout, columnsDefault?.scroll, className, useSeparatedLayout]);

  const wrapperStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    if (layout?.widthMode === 'fixed' && layout?.width) {
      style.width = typeof layout.width === 'number' ? `${layout.width}px` : layout.width;
    }
    // Solo aplicar altura al wrapper si no usamos layout separado
    if (!useSeparatedLayout && layout?.heightMode === 'fixed' && layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    if (layout?.minWidth) style.minWidth = layout.minWidth;
    if (layout?.minHeight) style.minHeight = layout.minHeight;
    
    return style;
  }, [layout, useSeparatedLayout]);

  const separatedContainerStyle = useMemo(() => {
    if (!useSeparatedLayout) return {};
    const style: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
    };
    if (layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    return style;
  }, [layout, useSeparatedLayout]);

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

  const hasExplicitStretchColumns = columnWidthInfo.stretchCount > 0 && !columnWidthInfo.autoStretchLastColumn;

  const tableClasses = useMemo(() => {
    const classes = [styles.table];
    if (layout?.widthMode === 'fixed') classes.push(styles.tableFixed);
    // Solo usar table-layout: fixed cuando hay stretch explícito (no auto)
    if (hasExplicitStretchColumns) classes.push(styles.tableFixed);
    return classes.join(' ');
  }, [layout, hasExplicitStretchColumns]);

  const visibleColumnsCount = visibleColumns.length;

  const hasData = data.length > 0;
  const isLoadingWithData = state === 'loading' && hasData;
  const shouldShowData = state === 'idle' || state === 'success' || isLoadingWithData;
  const shouldShowStateMessage = !shouldShowData && (state === 'loading' || state === 'error' || state === 'empty');

  const loadingMessage = behaviors?.states?.loading?.message || 
                         behaviors?.states?.loading?.defaultText || 
                         'Loading...';

  // Layout separado: header fijo arriba, body con scroll abajo
  if (useSeparatedLayout) {
    return (
      <div className={`${wrapperClasses} ${styles.tableContainer} ${styles.separatedLayout}`} style={separatedContainerStyle} data-testid={dataTestId}>
        {isLoadingWithData && (
          <div className={styles.loadingOverlay} data-testid="table-loading-overlay">
            <div className={styles.loadingOverlayContent}>
              <div className={styles.loadingOverlaySpinner} />
              <span className={styles.loadingOverlayText}>{loadingMessage}</span>
            </div>
          </div>
        )}
        
        {/* Header container - fijo arriba */}
        <div className={styles.headerContainer} ref={headerScrollRef}>
          <table className={tableClasses}>
            <TableColgroup
              columns={columns}
              columnsDefault={columnsDefault}
              stretchCount={columnWidthInfo.stretchCount}
              fixedWidthTotal={columnWidthInfo.fixedWidthTotal}
              autoStretchLastColumnId={columnWidthInfo.lastColumnId}
            />
            <TableHeader
              columns={columns}
              headersDefault={headersDefault}
              columnsDefault={columnsDefault}
              callbacks={callbacks}
              stretchCount={columnWidthInfo.stretchCount}
              fixedWidthTotal={columnWidthInfo.fixedWidthTotal}
              autoStretchLastColumnId={columnWidthInfo.lastColumnId}
              stickyHeader={false}
            />
          </table>
        </div>

        {/* Body container - con scroll vertical o corte */}
        <div 
          className={`${styles.bodyContainer} ${layout?.verticalScroll ? styles.bodyWithScroll : styles.bodyNoScroll}`} 
          ref={bodyScrollRef}
          onScroll={handleBodyScroll}
        >
          <table className={tableClasses}>
            <TableColgroup
              columns={columns}
              columnsDefault={columnsDefault}
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
      </div>
    );
  }

  // Layout normal: una sola tabla
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
          stickyHeader={layout?.stickyHeader}
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
