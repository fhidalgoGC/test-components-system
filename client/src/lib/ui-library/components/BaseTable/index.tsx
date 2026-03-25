import { useIsMobile } from '../../hooks';
import { BaseTable as BaseTableWeb } from './web';
import { BaseTable as BaseTableMobile } from './mobile';
import type { BaseTableProps } from './shared/types';

export const BaseTable = (props: BaseTableProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BaseTableMobile {...props} />;
  }

  return <BaseTableWeb {...props} />;
};

export { useTableState, useTableSearch, useTableColumns } from './shared/hooks';
export type { UseTableSearchOptions, UseTableSearchResult, UseTableColumnsOptions, UseTableColumnsResult, ColumnOrderItem } from './shared/hooks';
export { TextCell, HeaderCell } from './shared/components';
export type { TextCellProps, HeaderCellProps } from './shared/components';
export type {
  BaseTableProps,
  BaseTableConfig,
  BaseTableContext,
  LayoutConfig,
  WidthMode,
  HeightMode,
  CellHeightMode,
  HeadersDefaultConfig,
  HeaderCellConfig,
  FooterDefaultConfig,
  RowsDefaultConfig,
  ColumnsDefaultConfig,
  ColumnConfig,
  ColumnMetadata,
  ColumnHeaderConfig,
  ColumnCellConfig,
  ColumnHeaderCellConfig,
  CellsDefaultConfig,
  CellConfig,
  VerticalAlign,
  HorizontalAlign,
  MaxSize,
  IconPosition,
  BehaviorsConfig,
  HoverableTarget,
  ClickableTarget,
  StatesConfig,
  StateConfig,
  InfiniteScrollConfig,
  TableCallbacks,
  SortDirection,
  TableState,
  TableStateContext,
} from './shared/types';
