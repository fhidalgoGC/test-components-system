import { useState, useCallback, useMemo } from 'react';
import type { ColumnConfig } from '../types';

export interface ColumnOrderItem {
  columnId: string;
  label: string;
}

export interface UseTableColumnsOptions {
  columns: ColumnConfig[];
}

export interface UseTableColumnsResult {
  columns: ColumnConfig[];
  columnOrder: ColumnOrderItem[];
  reorderColumns: (newOrder: ColumnOrderItem[]) => void;
  reorderByIds: (columnIds: string[]) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  resetOrder: () => void;
  getColumnConfig: () => ColumnConfig[];
}

export function useTableColumns(options: UseTableColumnsOptions): UseTableColumnsResult {
  const { columns: initialColumns } = options;

  const initialOrder: ColumnOrderItem[] = useMemo(() => {
    return [...initialColumns]
      .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0))
      .map(col => ({
        columnId: col.metadata.columnId,
        label: typeof col.header?.cell?.render === 'string'
          ? col.header.cell.render
          : col.metadata.columnId,
      }));
  }, []);

  const [columnOrder, setColumnOrder] = useState<ColumnOrderItem[]>(initialOrder);

  const buildColumns = useCallback((order: ColumnOrderItem[]): ColumnConfig[] => {
    return order.map((item, index) => {
      const original = initialColumns.find(c => c.metadata.columnId === item.columnId);
      if (!original) return null;
      return {
        ...original,
        metadata: {
          ...original.metadata,
          order: index,
        },
      };
    }).filter(Boolean) as ColumnConfig[];
  }, [initialColumns]);

  const [columns, setColumns] = useState<ColumnConfig[]>(() => buildColumns(initialOrder));

  const applyOrder = useCallback((newOrder: ColumnOrderItem[]) => {
    setColumnOrder(newOrder);
    setColumns(buildColumns(newOrder));
  }, [buildColumns]);

  const reorderColumns = useCallback((newOrder: ColumnOrderItem[]) => {
    applyOrder(newOrder);
  }, [applyOrder]);

  const reorderByIds = useCallback((columnIds: string[]) => {
    const newOrder = columnIds.map(id => {
      const existing = columnOrder.find(c => c.columnId === id);
      return existing ?? { columnId: id, label: id };
    });
    applyOrder(newOrder);
  }, [columnOrder, applyOrder]);

  const moveColumn = useCallback((fromIndex: number, toIndex: number) => {
    const newOrder = [...columnOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    applyOrder(newOrder);
  }, [columnOrder, applyOrder]);

  const resetOrder = useCallback(() => {
    applyOrder(initialOrder);
  }, [initialOrder, applyOrder]);

  const getColumnConfig = useCallback(() => {
    return columns;
  }, [columns]);

  return useMemo(() => ({
    columns,
    columnOrder,
    reorderColumns,
    reorderByIds,
    moveColumn,
    resetOrder,
    getColumnConfig,
  }), [columns, columnOrder, reorderColumns, reorderByIds, moveColumn, resetOrder, getColumnConfig]);
}
