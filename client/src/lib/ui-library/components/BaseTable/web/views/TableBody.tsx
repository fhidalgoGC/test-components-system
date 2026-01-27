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

  const minHeight = rowsDefault?.minHeight;
  const maxHeight = rowsDefault?.maxHeight;

  return (
    <tbody className={styles.tbody}>
      {data.map((row, rowIndex) => {
        const trClasses = [
          styles.tr,
          isRowHoverable && styles.hoverable,
          isRowClickable && styles.clickable,
        ].filter(Boolean).join(' ');

        const rowStyle: React.CSSProperties = {};
        if (minHeight) rowStyle.minHeight = minHeight;
        if (typeof maxHeight === 'number') rowStyle.maxHeight = maxHeight;

        return (
          <tr
            key={rowIndex}
            className={trClasses}
            style={rowStyle}
            onClick={() => handleRowClick(rowIndex, row)}
            data-testid={`tr-${rowIndex}`}
          >
            {visibleColumns.map((column) => {
              const columnId = column.metadata.columnId;
              const value = row[columnId];
              
              const mergedCellConfig = mergeCellConfig(cellsDefault, column.cell);

              const tdClasses = [
                styles.td,
                isCellClickable && styles.clickable,
                getAlignClass(mergedCellConfig.horizontalAlign),
                getValignClass(mergedCellConfig.verticalAlign),
              ].filter(Boolean).join(' ');

              const minWidth = column.minWidth ?? columnsDefault?.minWidth;
              const maxWidth = column.maxWidth ?? columnsDefault?.maxWidth;

              const cellStyle: React.CSSProperties = {};
              if (minWidth) cellStyle.minWidth = minWidth;
              if (typeof maxWidth === 'number') {
                cellStyle.maxWidth = maxWidth;
              } else if (maxWidth === 'stretch' && stretchCount > 0) {
                if (fixedWidthTotal > 0) {
                  cellStyle.width = `calc((100% - ${fixedWidthTotal}px) / ${stretchCount})`;
                } else {
                  cellStyle.width = `${100 / stretchCount}%`;
                }
              } else if (maxWidth === 'container') {
                cellStyle.width = 'auto';
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

              return (
                <td
                  key={columnId}
                  className={tdClasses}
                  style={cellStyle}
                  onClick={(e) => handleCellClick(columnId, rowIndex, value, row, e)}
                  data-testid={`td-${columnId}-${rowIndex}`}
                >
                  {renderContent()}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
