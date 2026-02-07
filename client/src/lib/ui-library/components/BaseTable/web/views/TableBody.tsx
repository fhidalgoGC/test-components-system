import { useMemo } from 'react';
import type { ColumnConfig, RowsDefaultConfig, ColumnsDefaultConfig, CellsDefaultConfig, BehaviorsConfig, TableCallbacks, ColumnCellConfig } from '../types';
import styles from '../css/BaseTable.module.css';

interface TableBodyProps {
  data: any[];
  columns: ColumnConfig[];
  rowsDefault?: RowsDefaultConfig;
  columnsDefault?: ColumnsDefaultConfig;
  cellsDefault?: CellsDefaultConfig;
  behaviors?: BehaviorsConfig;
  callbacks?: TableCallbacks;
  stretchCount?: number;
  fixedWidthTotal?: number;
  autoStretchLastColumnId?: string | null;
  bodyContainerHeight?: number;
}

const mergeCellConfig = (
  cellsDefault?: CellsDefaultConfig,
  columnCell?: ColumnCellConfig
): ColumnCellConfig => {
  return {
    verticalAlign: columnCell?.verticalAlign ?? cellsDefault?.verticalAlign,
    horizontalAlign: columnCell?.horizontalAlign ?? cellsDefault?.horizontalAlign,
    render: columnCell?.render ?? cellsDefault?.render,
  };
};

export const TableBody = ({
  data,
  columns,
  rowsDefault,
  columnsDefault,
  cellsDefault,
  behaviors,
  callbacks,
  stretchCount = 0,
  fixedWidthTotal = 0,
  autoStretchLastColumnId,
  bodyContainerHeight = 0,
}: TableBodyProps) => {
  const visibleColumns = useMemo(() => {
    return columns
      .filter(col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true))
      .sort((a, b) => (a.metadata.order ?? 0) - (b.metadata.order ?? 0));
  }, [columns, columnsDefault?.visible]);

  const isRowHoverable = rowsDefault?.hoverable ?? behaviors?.hoverable === 'row';
  const isRowClickable = behaviors?.clickable === 'row';
  const isCellClickable = behaviors?.clickable === 'cell';

  const getAlignClass = (align?: string) => {
    switch (align) {
      case 'center': return styles.alignCenter;
      case 'right': return styles.alignRight;
      default: return styles.alignLeft;
    }
  };

  const getValignClass = (align?: string) => {
    switch (align) {
      case 'top': return styles.valignTop;
      case 'bottom': return styles.valignBottom;
      default: return styles.valignMiddle;
    }
  };


  const handleRowClick = (rowIndex: number, rowData: any) => {
    if (isRowClickable) {
      callbacks?.onRowClick?.(rowIndex, rowData);
    }
  };

  const handleCellClick = (columnId: string, rowIndex: number, value: any, rowData: any, e: React.MouseEvent) => {
    if (isCellClickable) {
      e.stopPropagation();
      callbacks?.onCellClick?.(columnId, rowIndex, value, rowData);
    }
  };

  const rowHeight = rowsDefault?.height;
  const rowHeightMode = rowsDefault?.heightMode ?? 'auto';
  const minHeight = rowsDefault?.minHeight;
  const maxHeight = rowsDefault?.maxHeight;
  const showDividers = rowsDefault?.dividers !== false;
  const rowStretchCount = rowsDefault?.stretchCount;

  const isStretch = rowHeightMode === 'stretch' && rowStretchCount && rowStretchCount > 0;
  const stretchRowHeightPx = isStretch && bodyContainerHeight > 0 
    ? Math.floor(bodyContainerHeight / rowStretchCount) 
    : 0;

  const tbodyClasses = [
    styles.tbody,
    isStretch && styles.tbodyStretch,
  ].filter(Boolean).join(' ');

  return (
    <tbody className={tbodyClasses}>
      {data.map((row, rowIndex) => {
        const trClasses = [
          styles.tr,
          isRowHoverable && styles.hoverable,
          isRowClickable && styles.clickable,
        ].filter(Boolean).join(' ');

        const rowStyle: React.CSSProperties = {};
        if (isStretch && stretchRowHeightPx > 0) {
          rowStyle.height = stretchRowHeightPx;
          rowStyle.maxHeight = stretchRowHeightPx;
          rowStyle.overflow = 'hidden';
        } else if (rowHeight !== undefined) {
          if (rowHeightMode === 'fixed') {
            rowStyle.height = rowHeight;
            rowStyle.overflow = 'hidden';
          } else {
            rowStyle.minHeight = rowHeight;
          }
        }
        if (minHeight && !rowHeight && !isStretch) rowStyle.minHeight = minHeight;
        if (typeof maxHeight === 'number') rowStyle.maxHeight = maxHeight;

        return (
          <tr
            key={rowIndex}
            className={trClasses}
            style={rowStyle}
            onClick={() => handleRowClick(rowIndex, row)}
            data-testid={`tr-${rowIndex}`}
          >
            {visibleColumns.map((column, colIndex) => {
              const columnId = column.metadata.columnId;
              const value = row[columnId];
              
              const mergedCellConfig = mergeCellConfig(cellsDefault, column.cell);

              const tdClasses = [
                styles.td,
                isCellClickable && styles.clickable,
                getAlignClass(mergedCellConfig.horizontalAlign),
                getValignClass(mergedCellConfig.verticalAlign),
                showDividers && colIndex < visibleColumns.length - 1 && styles.tdDivider,
              ].filter(Boolean).join(' ');

              const minWidth = column.minWidth ?? columnsDefault?.minWidth;
              const maxWidth = column.maxWidth ?? columnsDefault?.maxWidth;
              const isAutoStretchColumn = autoStretchLastColumnId === column.metadata.columnId;

              const cellStyle: React.CSSProperties = {};
              if (minWidth) cellStyle.minWidth = minWidth;
              if (isStretch) {
                cellStyle.height = '100%';
                cellStyle.overflow = 'hidden';
              } else if (rowHeightMode === 'fixed' && rowHeight !== undefined) {
                cellStyle.height = rowHeight;
                cellStyle.maxHeight = rowHeight;
                cellStyle.overflow = 'hidden';
              }
              
              if (isAutoStretchColumn) {
                cellStyle.width = '100%';
              } else if (typeof maxWidth === 'number') {
                cellStyle.width = '1%';
                cellStyle.whiteSpace = 'nowrap';
                cellStyle.maxWidth = maxWidth;
              } else if (maxWidth === 'stretch' && stretchCount > 0) {
                if (fixedWidthTotal > 0) {
                  cellStyle.width = `calc((100% - ${fixedWidthTotal}px) / ${stretchCount})`;
                } else {
                  cellStyle.width = `${100 / stretchCount}%`;
                }
              } else {
                cellStyle.width = '1%';
                cellStyle.whiteSpace = 'nowrap';
              }

              const renderContent = () => {
                if (mergedCellConfig.render) {
                  if (typeof mergedCellConfig.render === 'function') {
                    return mergedCellConfig.render(value, row, columnId);
                  }
                  return mergedCellConfig.render;
                }
                return value ?? '';
              };

              const content = renderContent();
              const getFlexAlignVertical = (align?: string) => {
                switch (align) {
                  case 'top': return 'flex-start';
                  case 'bottom': return 'flex-end';
                  default: return 'center';
                }
              };
              const getFlexAlignHorizontal = (align?: string) => {
                switch (align) {
                  case 'center': return 'center';
                  case 'right': return 'flex-end';
                  default: return 'flex-start';
                }
              };
              const useWrappedContent = isStretch || (rowHeightMode === 'fixed' && rowHeight !== undefined);
              const wrappedContent = useWrappedContent ? (
                <div style={{ 
                  height: '100%', 
                  maxHeight: isStretch ? undefined : rowHeight, 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: getFlexAlignVertical(mergedCellConfig.verticalAlign),
                  justifyContent: getFlexAlignHorizontal(mergedCellConfig.horizontalAlign),
                }}>
                  {content}
                </div>
              ) : content;

              return (
                <td
                  key={columnId}
                  className={tdClasses}
                  style={cellStyle}
                  onClick={(e) => handleCellClick(columnId, rowIndex, value, row, e)}
                  data-testid={`td-${columnId}-${rowIndex}`}
                >
                  {wrappedContent}
                </td>
              );
            })}
          </tr>
        );
      })}
      {isStretch && rowStretchCount && stretchRowHeightPx > 0 && data.length < rowStretchCount && (
        (() => {
          const emptyCount = rowStretchCount - data.length;
          const spacerStyle: React.CSSProperties = {
            height: stretchRowHeightPx,
            maxHeight: stretchRowHeightPx,
            overflow: 'hidden',
          };
          return Array.from({ length: emptyCount }, (_, i) => (
            <tr
              key={`stretch-spacer-${i}`}
              style={spacerStyle}
              className={styles.tr}
              data-testid={`tr-spacer-${i}`}
            >
              <td colSpan={visibleColumns.length} style={{ padding: 0 }} />
            </tr>
          ));
        })()
      )}
    </tbody>
  );
};
