import { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import type { BaseTableProps, TableState } from '../../shared/types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableStates } from './TableStates';
import { TableColgroup } from './TableColgroup';
import styles from '../styles/BaseTable.module.css';

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
  const wrapperScrollRef = useRef<HTMLDivElement>(null);
  const [bodyContainerHeight, setBodyContainerHeight] = useState<number>(0);
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);

  const isRowStretch = rowsDefault?.heightMode === 'stretch' && rowsDefault?.stretchCount && rowsDefault.stretchCount > 0;

  const infiniteScrollConfig = behaviors?.infiniteScroll;
  const isInfiniteScrollEnabled = infiniteScrollConfig?.enabled === true;
  const infiniteScrollThreshold = infiniteScrollConfig?.threshold ?? 100;
  const infiniteScrollLockRef = useRef(false);

  useEffect(() => {
    if (state !== 'loadingMore') {
      infiniteScrollLockRef.current = false;
    }
  }, [state]);

  const handleInfiniteScroll = useCallback((scrollElement: HTMLElement) => {
    if (!isInfiniteScrollEnabled || state === 'loadingMore' || state === 'loading') return;
    if (infiniteScrollLockRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollElement;
    const hasVerticalOverflow = scrollHeight > clientHeight + 1;
    if (!hasVerticalOverflow) return;

    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    if (distanceToBottom <= infiniteScrollThreshold) {
      infiniteScrollLockRef.current = true;
      callbacks?.onReachEnd?.();
    }
  }, [isInfiniteScrollEnabled, state, infiniteScrollThreshold, callbacks]);

  const handleBodyScroll = useCallback(() => {
    if (headerScrollRef.current && bodyScrollRef.current) {
      headerScrollRef.current.scrollLeft = bodyScrollRef.current.scrollLeft;
    }
    if (bodyScrollRef.current && isInfiniteScrollEnabled) {
      handleInfiniteScroll(bodyScrollRef.current);
    }
  }, [isInfiniteScrollEnabled, handleInfiniteScroll]);

  useEffect(() => {
    const el = bodyScrollRef.current;
    if (!el) return;

    const measure = () => {
      if (isRowStretch) {
        setBodyContainerHeight(el.clientHeight);
      }
      const sbWidth = el.offsetWidth - el.clientWidth;
      setScrollbarWidth(sbWidth);
    };

    const observer = new ResizeObserver(() => {
      measure();
    });
    observer.observe(el);
    measure();
    return () => observer.disconnect();
  }, [isRowStretch]);

  const useSeparatedLayout = (layout?.stickyHeader && ((layout?.heightMode === 'fixed' && layout?.height) || layout?.heightMode === 'full')) || isRowStretch;

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
    if (!useSeparatedLayout && layout?.heightMode === 'fixed' && layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    if (layout?.minWidth) style.minWidth = layout.minWidth;
    if (layout?.minHeight) style.minHeight = layout.minHeight;
    
    return style;
  }, [layout, useSeparatedLayout]);

  const scrollContainerStyle = useMemo(() => {
    if (useSeparatedLayout) return {};
    if (layout?.heightMode !== 'fixed' || !layout?.height) return {};
    const h = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    const style: React.CSSProperties = {
      height: h,
      maxHeight: h,
      overflowY: layout?.verticalScroll ? 'auto' : 'hidden',
      overflowX: 'auto',
    };
    return style;
  }, [layout, useSeparatedLayout]);

  const separatedContainerStyle = useMemo(() => {
    if (!useSeparatedLayout) return {};
    const style: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
    };
    if (layout?.heightMode === 'full') {
      style.height = '100%';
    } else if (layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    return style;
  }, [layout, useSeparatedLayout, isRowStretch]);

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
    if (hasExplicitStretchColumns) classes.push(styles.tableFixed);
    if (isRowStretch) classes.push(styles.tableStretch);
    return classes.join(' ');
  }, [layout, hasExplicitStretchColumns, isRowStretch]);

  const visibleColumnsCount = visibleColumns.length;

  const handleWrapperScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (!isInfiniteScrollEnabled) return;
    handleInfiniteScroll(e.currentTarget);
  }, [isInfiniteScrollEnabled, handleInfiniteScroll]);

  const hasData = data.length > 0;
  const isLoadingWithData = state === 'loading' && hasData;
  const isLoadingMore = state === 'loadingMore';
  const shouldShowData = state === 'idle' || state === 'success' || isLoadingWithData || isLoadingMore;
  const shouldShowStateMessage = !shouldShowData && (state === 'loading' || state === 'error' || state === 'empty');

  const loadingMessage = behaviors?.states?.loading?.message || 
                         behaviors?.states?.loading?.defaultText || 
                         'Loading...';

  const loadingMoreMessage = infiniteScrollConfig?.loadingMoreMessage || 'Loading more...';

  const renderLoadingMoreFooter = () => {
    if (!isLoadingMore) return null;

    if (infiniteScrollConfig?.loadingMoreComponent) {
      return (
        <tfoot data-testid="table-loading-more">
          <tr>
            <td colSpan={visibleColumnsCount}>
              {infiniteScrollConfig.loadingMoreComponent}
            </td>
          </tr>
        </tfoot>
      );
    }

    return (
      <tfoot data-testid="table-loading-more">
        <tr>
          <td colSpan={visibleColumnsCount}>
            <div className={styles.loadingMoreContainer}>
              <div className={styles.loadingMoreSpinner} />
              <span className={styles.loadingMoreText}>{loadingMoreMessage}</span>
            </div>
          </td>
        </tr>
      </tfoot>
    );
  };

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
        
        <div className={styles.headerContainer} ref={headerScrollRef} style={scrollbarWidth > 0 ? { paddingRight: scrollbarWidth } : undefined}>
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
              <>
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
                  bodyContainerHeight={bodyContainerHeight}
                />
                {renderLoadingMoreFooter()}
              </>
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

  const needsScrollContainer = !useSeparatedLayout && layout?.heightMode === 'fixed' && layout?.height;

  const tableContent = (
    <>
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
          <>
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
            {renderLoadingMoreFooter()}
          </>
        ) : shouldShowStateMessage ? (
          <TableStates
            state={state}
            statesConfig={behaviors?.states}
            error={error}
            columnsCount={visibleColumnsCount}
          />
        ) : null}
      </table>
    </>
  );

  if (needsScrollContainer) {
    return (
      <div
        className={`${wrapperClasses} ${styles.tableContainer}`}
        style={wrapperStyle}
        data-testid={dataTestId}
      >
        <div
          ref={wrapperScrollRef}
          style={scrollContainerStyle}
          onScroll={handleWrapperScroll}
        >
          {tableContent}
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${wrapperClasses} ${styles.tableContainer}`} 
      style={wrapperStyle} 
      data-testid={dataTestId}
      ref={wrapperScrollRef}
      onScroll={handleWrapperScroll}
    >
      {tableContent}
    </div>
  );
};
