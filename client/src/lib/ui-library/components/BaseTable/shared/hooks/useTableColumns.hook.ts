import { useState, useCallback, useMemo } from 'react';
import type { ColumnConfig, SortDirection } from '../types';

export interface ColumnOrderItem {
  columnId: string;
  label: string;
}

export interface ColumnState {
  columnId: string;
  label: string;
  order: number;
  visible: boolean;
  sortable: boolean;
  sortDirection: SortDirection | null;
  minWidth?: number;
  maxWidth?: number | 'stretch' | 'container';
  horizontalAlign?: string;
}

export interface UseTableColumnsOptions {
  columns: ColumnConfig[];
}

export interface UseTableColumnsResult {
  columns: ColumnConfig[];
  columnOrder: ColumnOrderItem[];
  columnsState: ColumnState[];
  sortState: { columnId: string; direction: SortDirection } | null;
  reorderColumns: (newOrder: ColumnOrderItem[]) => void;
  reorderByIds: (columnIds: string[]) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  toggleVisibility: (columnId: string) => void;
  setSort: (columnId: string, direction: SortDirection) => void;
  clearSort: () => void;
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
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [sortState, setSortState] = useState<{ columnId: string; direction: SortDirection } | null>(null);

  const buildColumns = useCallback((order: ColumnOrderItem[], hidden: Set<string>): ColumnConfig[] => {
    return order.map((item, index) => {
      const original = initialColumns.find(c => c.metadata.columnId === item.columnId);
      if (!original) return null;
      return {
        ...original,
        metadata: {
          ...original.metadata,
          order: index,
        },
        visible: hidden.has(item.columnId) ? false : (original.visible ?? true),
      };
    }).filter(Boolean) as ColumnConfig[];
  }, [initialColumns]);

  const [columns, setColumns] = useState<ColumnConfig[]>(() => buildColumns(initialOrder, hiddenColumns));

  const applyOrder = useCallback((newOrder: ColumnOrderItem[], hidden?: Set<string>) => {
    const h = hidden ?? hiddenColumns;
    setColumnOrder(newOrder);
    setColumns(buildColumns(newOrder, h));
  }, [buildColumns, hiddenColumns]);

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

  const toggleVisibility = useCallback((columnId: string) => {
    setHiddenColumns(prev => {
      const next = new Set(prev);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      applyOrder(columnOrder, next);
      return next;
    });
  }, [columnOrder, applyOrder]);

  const setSort = useCallback((columnId: string, direction: SortDirection) => {
    setSortState({ columnId, direction });
  }, []);

  const clearSort = useCallback(() => {
    setSortState(null);
  }, []);

  const resetOrder = useCallback(() => {
    setHiddenColumns(new Set());
    setSortState(null);
    applyOrder(initialOrder, new Set());
  }, [initialOrder, applyOrder]);

  const getColumnConfig = useCallback(() => {
    return columns;
  }, [columns]);

  const columnsState: ColumnState[] = useMemo(() => {
    return columnOrder.map((item, index) => {
      const original = initialColumns.find(c => c.metadata.columnId === item.columnId);
      const isSortable = original?.sortable ?? original?.header?.cell?.sortable ?? false;
      const isVisible = !hiddenColumns.has(item.columnId) && (original?.visible !== false);
      const currentSort = sortState?.columnId === item.columnId ? sortState.direction : null;

      return {
        columnId: item.columnId,
        label: item.label,
        order: index,
        visible: isVisible,
        sortable: isSortable,
        sortDirection: currentSort,
        minWidth: original?.minWidth,
        maxWidth: original?.maxWidth,
        horizontalAlign: original?.cell?.horizontalAlign ?? original?.header?.cell?.horizontalAlign,
      };
    });
  }, [columnOrder, initialColumns, hiddenColumns, sortState]);

  return useMemo(() => ({
    columns,
    columnOrder,
    columnsState,
    sortState,
    reorderColumns,
    reorderByIds,
    moveColumn,
    toggleVisibility,
    setSort,
    clearSort,
    resetOrder,
    getColumnConfig,
  }), [columns, columnOrder, columnsState, sortState, reorderColumns, reorderByIds, moveColumn, toggleVisibility, setSort, clearSort, resetOrder, getColumnConfig]);
}
