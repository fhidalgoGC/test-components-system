import { useMemo } from 'react';
import type { ColumnConfig, ColumnsDefaultConfig } from '../../shared/types';

interface TableColgroupProps {
  columns: ColumnConfig[];
  columnsDefault?: ColumnsDefaultConfig;
  stretchCount: number;
  fixedWidthTotal: number;
  autoStretchLastColumnId?: string | null;
}

export const TableColgroup = ({ 
  columns, 
  columnsDefault, 
  stretchCount, 
  fixedWidthTotal,
  autoStretchLastColumnId 
}: TableColgroupProps) => {
  const visibleColumns = useMemo(() => {
    return columns
      .filter(col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true))
      .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0));
  }, [columns, columnsDefault?.visible]);

  const totalColumns = visibleColumns.length;
  const nonStretchColumns = visibleColumns.filter(col => {
    const maxWidth = col.maxWidth ?? columnsDefault?.maxWidth;
    return maxWidth !== 'stretch' && autoStretchLastColumnId !== col.metadata.columnId;
  }).length;

  return (
    <colgroup>
      {visibleColumns.map((column) => {
        const minWidth = column.minWidth ?? columnsDefault?.minWidth;
        const maxWidth = column.maxWidth ?? columnsDefault?.maxWidth;
        const isAutoStretchColumn = autoStretchLastColumnId === column.metadata.columnId;

        const style: React.CSSProperties = {};
        if (minWidth) style.minWidth = minWidth;
        
        if (isAutoStretchColumn) {
          const fixedColumnsWidth = nonStretchColumns * (typeof columnsDefault?.maxWidth === 'number' ? columnsDefault.maxWidth : 80);
          style.width = `calc(100% - ${fixedColumnsWidth}px)`;
          style.minWidth = 100;
        } else if (typeof maxWidth === 'number') {
          style.width = maxWidth;
          style.maxWidth = maxWidth;
        } else if (maxWidth === 'stretch' && stretchCount > 0) {
          if (fixedWidthTotal > 0) {
            style.width = `calc((100% - ${fixedWidthTotal}px) / ${stretchCount})`;
          } else {
            style.width = `${100 / stretchCount}%`;
          }
        } else if (maxWidth === 'container') {
          style.width = 'auto';
        } else {
          style.width = 80;
        }

        return (
          <col 
            key={column.metadata.columnId} 
            style={style}
          />
        );
      })}
    </colgroup>
  );
};
