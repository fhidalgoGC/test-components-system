import {
  BaseTable,
  useTableState,
  useTableColumns,
} from '@/lib/ui-library/components/BaseTable';
import type { ColumnConfig, ColumnOrderItem } from '@/lib/ui-library/components/BaseTable';
import { List } from '@/lib/ui-library/components/List';
import type { DraggableReorderEvent } from '@/lib/ui-library/components/List';
import { GripVertical, RotateCcw, Eye, EyeOff } from 'lucide-react';
import styles from '../css/BaseTableDemo.module.scss';

interface Person {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  ciudad: string;
  profesion: string;
}

const sampleData: Person[] = [
  { id: 1, nombre: 'Carlos', apellido: 'Garcia', edad: 32, ciudad: 'Madrid', profesion: 'Ingeniero' },
  { id: 2, nombre: 'Maria', apellido: 'Lopez', edad: 28, ciudad: 'Barcelona', profesion: 'Disenadora' },
  { id: 3, nombre: 'Juan', apellido: 'Martinez', edad: 45, ciudad: 'Valencia', profesion: 'Medico' },
  { id: 4, nombre: 'Ana', apellido: 'Rodriguez', edad: 36, ciudad: 'Sevilla', profesion: 'Abogada' },
  { id: 5, nombre: 'Pedro', apellido: 'Fernandez', edad: 29, ciudad: 'Bilbao', profesion: 'Profesor' },
];

const baseColumns: ColumnConfig[] = [
  {
    metadata: { columnId: 'nombre', order: 0 },
    header: { cell: { render: 'Nombre', horizontalAlign: 'left', sortable: true } },
    cell: { horizontalAlign: 'left' },
    sortable: true,
    minWidth: 120,
    maxWidth: 'stretch',
  },
  {
    metadata: { columnId: 'apellido', order: 1 },
    header: { cell: { render: 'Apellido', horizontalAlign: 'left' } },
    cell: { horizontalAlign: 'left' },
    minWidth: 120,
    maxWidth: 'stretch',
  },
  {
    metadata: { columnId: 'edad', order: 2 },
    header: { cell: { render: 'Edad', horizontalAlign: 'center', sortable: true } },
    cell: { horizontalAlign: 'center' },
    sortable: true,
    minWidth: 80,
    maxWidth: 100,
  },
  {
    metadata: { columnId: 'ciudad', order: 3 },
    header: { cell: { render: 'Ciudad', horizontalAlign: 'left' } },
    cell: { horizontalAlign: 'left' },
    minWidth: 120,
    maxWidth: 'stretch',
  },
  {
    metadata: { columnId: 'profesion', order: 4 },
    header: { cell: { render: 'Profesion', horizontalAlign: 'left', sortable: true } },
    cell: { horizontalAlign: 'left' },
    sortable: true,
    minWidth: 120,
    maxWidth: 'stretch',
  },
];

const DragHandle = ({ isDragging }: { isDragging: boolean }) => (
  <GripVertical
    className={`w-4 h-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
  />
);

export function ColumnReorderDemo() {
  const tableState = useTableState({ initialState: 'success' });
  const tableColumns = useTableColumns({ columns: baseColumns });

  const handleReorder = (newData: ColumnOrderItem[], _event: DraggableReorderEvent<ColumnOrderItem>) => {
    tableColumns.reorderColumns(newData);
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>ColumnReorderDemo.tsx</div>
      <h2 className={styles.section__title}>11. Reordenar Columnas con D&D + State</h2>
      <p className={styles.section__description}>
        Arrastra las columnas en la lista para cambiar su orden. Usa los iconos de ojo para
        ocultar/mostrar columnas. El panel inferior muestra el <code>columnsState</code> completo
        del hook <code>useTableColumns</code> en tiempo real.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ width: '240px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Orden de columnas
            </span>
            <button
              onClick={tableColumns.resetOrder}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontSize: '0.75rem',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
              }}
              data-testid="button-reset-column-order"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', overflow: 'hidden' }}>
            <List<ColumnOrderItem>
              id="column-order-list"
              data={tableColumns.columnOrder}
              layout={{
                widthMode: 'full',
                heightMode: 'auto',
                gap: 0,
              }}
              item={{
                renderType: 'component',
                render: (col) => {
                  const colState = tableColumns.columnsState.find(c => c.columnId === col.columnId);
                  const isVisible = colState?.visible ?? true;
                  return (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 0.75rem',
                        backgroundColor: isVisible ? '#ffffff' : '#f9fafb',
                        borderBottom: '1px solid #f3f4f6',
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        color: isVisible ? '#1f2937' : '#9ca3af',
                        userSelect: 'none',
                      }}
                      data-testid={`column-item-${col.columnId}`}
                    >
                      <span
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          borderRadius: '50%',
                          backgroundColor: isVisible ? '#eff6ff' : '#f3f4f6',
                          color: isVisible ? '#3b82f6' : '#9ca3af',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.625rem',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {(colState?.order ?? 0) + 1}
                      </span>
                      <span style={{ flex: 1 }}>{col.label}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          tableColumns.toggleVisibility(col.columnId);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          color: isVisible ? '#6b7280' : '#d1d5db',
                        }}
                        data-testid={`button-toggle-visibility-${col.columnId}`}
                      >
                        {isVisible
                          ? <Eye style={{ width: '0.875rem', height: '0.875rem' }} />
                          : <EyeOff style={{ width: '0.875rem', height: '0.875rem' }} />
                        }
                      </button>
                    </div>
                  );
                },
              }}
              draggableConfig={{
                getItemId: (col) => col.columnId,
                onReorder: handleReorder,
                handle: {
                  render: DragHandle,
                  position: 'left',
                },
              }}
            />
          </div>

          <div
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.375rem',
              fontSize: '0.75rem',
              color: '#6b7280',
            }}
            data-testid="text-column-order"
          >
            {tableColumns.columnOrder.map(c => {
              const s = tableColumns.columnsState.find(cs => cs.columnId === c.columnId);
              return s?.visible ? c.label : `(${c.label})`;
            }).join(' → ')}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className={styles.demoBox} data-testid="demo-column-reorder-table">
            <BaseTable
              data={sampleData}
              state={tableState.state}
              config={{
                columns: tableColumns.columns,
                layout: {
                  widthMode: 'full',
                  heightMode: 'auto',
                },
                headersDefault: {
                  cell: {
                    verticalAlign: 'middle',
                  },
                },
                cellsDefault: {
                  verticalAlign: 'middle',
                },
                rowsDefault: {
                  hoverable: true,
                },
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              maxHeight: '320px',
            }}
            data-testid="panel-columns-state"
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                useTableColumns → columnsState
              </span>
              {tableColumns.sortState && (
                <span style={{ fontSize: '0.6875rem', color: '#60a5fa', fontFamily: 'monospace' }}>
                  sort: {tableColumns.sortState.columnId} ({tableColumns.sortState.direction})
                </span>
              )}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'monospace' }}>
              <thead>
                <tr>
                  {['columnId', 'label', 'order', 'visible', 'sortable', 'sortDir', 'minW', 'maxW', 'align'].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: 'left',
                        padding: '0.375rem 0.5rem',
                        color: '#64748b',
                        borderBottom: '1px solid #334155',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableColumns.columnsState.map((cs) => (
                  <tr key={cs.columnId}>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#e2e8f0', borderBottom: '1px solid #1e293b' }}>
                      {cs.columnId}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#cbd5e1', borderBottom: '1px solid #1e293b' }}>
                      {cs.label}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#60a5fa', borderBottom: '1px solid #1e293b' }}>
                      {cs.order}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', borderBottom: '1px solid #1e293b' }}>
                      <span style={{
                        color: cs.visible ? '#4ade80' : '#f87171',
                        fontWeight: 600,
                      }}>
                        {String(cs.visible)}
                      </span>
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', borderBottom: '1px solid #1e293b' }}>
                      <span style={{ color: cs.sortable ? '#a78bfa' : '#475569' }}>
                        {String(cs.sortable)}
                      </span>
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: cs.sortDirection ? '#fbbf24' : '#475569', borderBottom: '1px solid #1e293b' }}>
                      {cs.sortDirection ?? '—'}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>
                      {cs.minWidth ?? '—'}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>
                      {String(cs.maxWidth ?? '—')}
                    </td>
                    <td style={{ padding: '0.375rem 0.5rem', color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>
                      {cs.horizontalAlign ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
