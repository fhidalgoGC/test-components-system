import { useMemo } from 'react';
import type { BaseTableProps, TableState } from '../types';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { TableStates } from './TableStates';
import styles from '../css/BaseTable.module.css';

export const BaseTableView = (props: BaseTableProps) => {
  const {
    config,
    data = [],
    state = 'idle',
    error,
    callbacks,
    className,
    dataTestId = 'base-table',
  } = props;

  const {
    layout,
    headersDefault,
    rowsDefault,
    columnsDefault,
    cellsDefault,
    behaviors,
    columns,
  } = config;

  const wrapperClasses = useMemo(() => {
    const classes = [styles.tableWrapper];
    
    if (layout?.widthMode === 'full') classes.push(styles.fullWidth);
    if (layout?.widthMode === 'auto') classes.push(styles.autoWidth);
    if (layout?.heightMode === 'full') classes.push(styles.fullHeight);
    if (layout?.heightMode === 'auto') classes.push(styles.autoHeight);
    
    if (className) classes.push(className);
    
    return classes.join(' ');
  }, [layout, className]);

  const wrapperStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    if (layout?.widthMode === 'fixed' && layout?.width) {
      style.width = typeof layout.width === 'number' ? `${layout.width}px` : layout.width;
    }
    if (layout?.heightMode === 'fixed' && layout?.height) {
      style.height = typeof layout.height === 'number' ? `${layout.height}px` : layout.height;
    }
    if (layout?.minWidth) style.minWidth = layout.minWidth;
    if (layout?.minHeight) style.minHeight = layout.minHeight;
    
    return style;
  }, [layout]);

  const tableClasses = useMemo(() => {
    const classes = [styles.table];
    if (layout?.widthMode === 'fixed') classes.push(styles.tableFixed);
    return classes.join(' ');
  }, [layout]);

  const visibleColumnsCount = columns.filter(
    col => col.visible !== false && (columnsDefault?.visible !== false || col.visible === true)
  ).length;

  const shouldShowContent = state === 'idle' || state === 'success';

  return (
    <div className={wrapperClasses} style={wrapperStyle} data-testid={dataTestId}>
      <table className={tableClasses}>
        <TableHeader
          columns={columns}
          headersDefault={headersDefault}
          columnsDefault={columnsDefault}
          callbacks={callbacks}
        />

        {shouldShowContent ? (
          <TableBody
            data={data}
            columns={columns}
            rowsDefault={rowsDefault}
            columnsDefault={columnsDefault}
            cellsDefault={cellsDefault}
            behaviors={behaviors}
            callbacks={callbacks}
          />
        ) : (
          <TableStates
            state={state}
            statesConfig={behaviors?.states}
            error={error}
            columnsCount={visibleColumnsCount}
          />
        )}
      </table>
    </div>
  );
};
