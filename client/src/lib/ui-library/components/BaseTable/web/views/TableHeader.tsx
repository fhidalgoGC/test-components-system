import { useMemo, useState } from 'react';
import type { ColumnConfig, HeadersDefaultConfig, ColumnsDefaultConfig, SortDirection, TableCallbacks } from '../types';
import styles from '../css/BaseTable.module.css';

interface TableHeaderProps {
  columns: ColumnConfig[];
  headersDefault?: HeadersDefaultConfig;
  columnsDefault?: ColumnsDefaultConfig;
  callbacks?: TableCallbacks;
  stretchCount?: number;
  fixedWidthTotal?: number;
  autoStretchLastColumnId?: string | null;
  stickyHeader?: boolean;
}

export const TableHeader = ({ columns, headersDefault, columnsDefault, callbacks, stretchCount = 0, fixedWidthTotal = 0, autoStretchLastColumnId, stickyHeader }: TableHeaderProps) => {
  const [sortState, setSortState] = useState<{ columnId: string; direction: SortDirection } | null>(null);

  const isEnabled = headersDefault?.enabled !== false;
  const showDividers = headersDefault?.dividers !== false;

  const visibleColumns = useMemo(() => {
    return columns
      .filter(col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true))
      .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0));
  }, [columns, columnsDefault?.visible]);

  if (!isEnabled) return null;

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
  };

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return styles.thAlignCenter;
      case 'right': return styles.thAlignRight;
      default: return styles.thAlignLeft;
    }
  };

  const getValignClass = (align?: string) => {
    switch (align) {
      case 'top': return styles.valignTop;
      case 'bottom': return styles.valignBottom;
      default: return styles.valignMiddle;
    }
  };


  return (
    <thead className={`${styles.thead} ${stickyHeader ? styles.theadSticky : ''}`}>
      <tr className={styles.theadRow}>
        {visibleColumns.map((column, index) => {
          const cellConfig = column.header?.cell ?? headersDefault?.cell;
          const isSortable = column.sortable ?? cellConfig?.sortable ?? columnsDefault?.sortable ?? false;
          const isClickable = cellConfig?.clickable ?? false;
          const isActive = sortState?.columnId === column.metadata.columnId;

          const thClasses = [
            styles.th,
            isSortable && styles.sortable,
            isClickable && styles.clickable,
            showDividers && index < visibleColumns.length - 1 && styles.thDivider,
            getAlignClass(cellConfig?.horizontalAlign),
            getValignClass(cellConfig?.verticalAlign),
          ].filter(Boolean).join(' ');

          const minWidth = column.minWidth ?? columnsDefault?.minWidth;
          const maxWidth = column.maxWidth ?? columnsDefault?.maxWidth;
          const isAutoStretchColumn = autoStretchLastColumnId === column.metadata.columnId;

          const style: React.CSSProperties = {};
          if (minWidth) style.minWidth = minWidth;
          
          if (isAutoStretchColumn) {
            // Última columna absorbe espacio restante automáticamente
            style.width = '100%';
          } else if (typeof maxWidth === 'number') {
            // Columna se ajusta al contenido hasta el máximo
            style.width = '1%';
            style.whiteSpace = 'nowrap';
            style.maxWidth = maxWidth;
          } else if (maxWidth === 'stretch' && stretchCount > 0) {
            if (fixedWidthTotal > 0) {
              style.width = `calc((100% - ${fixedWidthTotal}px) / ${stretchCount})`;
            } else {
              style.width = `${100 / stretchCount}%`;
            }
          } else {
            // container o undefined: ajustar al contenido
            style.width = '1%';
            style.whiteSpace = 'nowrap';
          }

          const renderContent = () => {
            if (cellConfig?.render) {
              return cellConfig.render;
            }
            return column.metadata.columnId;
          };

          return (
            <th
              key={column.metadata.columnId}
              className={thClasses}
              style={style}
              onClick={() => handleHeaderClick(column)}
              data-testid={`th-${column.metadata.columnId}`}
            >
              <div className={styles.thContent}>
                {renderContent()}
                {isSortable && (
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
  );
};
