import type { LayoutConfig } from './layout.type';
import type { HeadersDefaultConfig } from './headers.type';
import type { RowsDefaultConfig } from './rows.type';
import type { ColumnsDefaultConfig, ColumnConfig } from './columns.type';
import type { CellsDefaultConfig } from './cells.type';
import type { BehaviorsConfig } from './behaviors.type';
import type { TableCallbacks } from './callbacks.type';
import type { TableState } from './state.type';

export interface FooterDefaultConfig {
  enabled?: boolean;
}

export interface BaseTableConfig {
  layout?: LayoutConfig;
  headersDefault?: HeadersDefaultConfig;
  footerDefault?: FooterDefaultConfig;
  rowsDefault?: RowsDefaultConfig;
  columnsDefault?: ColumnsDefaultConfig;
  cellsDefault?: CellsDefaultConfig;
  behaviors?: BehaviorsConfig;
  columns: ColumnConfig[];
}

export interface BaseTableProps {
  config: BaseTableConfig;
  data?: any[];
  state?: TableState;
  error?: string;
  callbacks?: TableCallbacks;
  className?: string;
  dataTestId?: string;
}

export interface BaseTableContext {
  config: BaseTableConfig;
  data: any[];
  state: TableState;
  error?: string;
  callbacks?: TableCallbacks;
}
