import { useIsMobile } from '../../hooks';
import { BaseTable as BaseTableWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { BaseTableProps } from './web/types';

export const BaseTable = (props: BaseTableProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="BaseTable" />;
  }

  return <BaseTableWeb {...props} />;
};

export { useTableState, TextCell, HeaderCell } from './web';
export type { TextCellProps, HeaderCellProps } from './web';
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
  BehaviorsConfig,
  HoverableTarget,
  ClickableTarget,
  StatesConfig,
  StateConfig,
  TableCallbacks,
  SortDirection,
  TableState,
  TableStateContext,
} from './web';
