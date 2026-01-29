import type { ColumnConfig } from './columns.type';

export type SortDirection = 'asc' | 'desc' | 'none';

export interface TableCallbacks {
  onHeaderClick?: (columnId: string, sortDirection: SortDirection) => void;
  onCellClick?: (columnId: string, rowIndex: number, value: any, rowData: any) => void;
  onRowClick?: (rowIndex: number, rowData: any) => void;
  onSort?: (column: ColumnConfig, direction: SortDirection) => void;
}
