import { useState, useMemo } from 'react';
import {
  BaseTable,
  useTableState,
} from '@/lib/ui-library/components/BaseTable';
import type { ColumnConfig } from '@/lib/ui-library/components/BaseTable';
import { List } from '@/lib/ui-library/components/List';
import type { DraggableReorderEvent } from '@/lib/ui-library/components/List';
import { GripVertical, RotateCcw } from 'lucide-react';
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

interface ColumnOrderItem {
  id: string;
  label: string;
  order: number;
}

const initialColumnOrder: ColumnOrderItem[] = [
  { id: 'nombre', label: 'Nombre', order: 0 },
  { id: 'apellido', label: 'Apellido', order: 1 },
  { id: 'edad', label: 'Edad', order: 2 },
  { id: 'ciudad', label: 'Ciudad', order: 3 },
  { id: 'profesion', label: 'Profesion', order: 4 },
];

const DragHandle = ({ isDragging }: { isDragging: boolean }) => (
  <GripVertical
    className={`w-4 h-4 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`}
  />
);

export function ColumnReorderDemo() {
  const tableState = useTableState({ initialState: 'success' });
  const [columnOrder, setColumnOrder] = useState<ColumnOrderItem[]>(initialColumnOrder);

  const columns: ColumnConfig[] = useMemo(() => {
    return columnOrder.map((col, index) => ({
      metadata: { columnId: col.id, order: index },
      header: {
        cell: {
          render: col.label,
          horizontalAlign: col.id === 'edad' ? 'center' as const : 'left' as const,
        },
      },
      cell: {
        horizontalAlign: col.id === 'edad' ? 'center' as const : 'left' as const,
      },
      minWidth: col.id === 'edad' ? 80 : 120,
      maxWidth: col.id === 'edad' ? 100 : ('stretch' as const),
    }));
  }, [columnOrder]);

  const handleReorder = (newData: ColumnOrderItem[], event: DraggableReorderEvent<ColumnOrderItem>) => {
    setColumnOrder(newData.map((item, index) => ({ ...item, order: index })));
  };

  const handleReset = () => {
    setColumnOrder([...initialColumnOrder]);
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>ColumnReorderDemo.tsx</div>
      <h2 className={styles.section__title}>11. Reordenar Columnas con D&D</h2>
      <p className={styles.section__description}>
        Arrastra las columnas en la lista lateral para cambiar su orden en la tabla.
        La tabla se actualiza en tiempo real sin re-renderizar los datos.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>
              Orden de columnas
            </span>
            <button
              onClick={handleReset}
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
              data={columnOrder}
              layout={{
                widthMode: 'full',
                heightMode: 'auto',
                gap: 0,
              }}
              item={{
                renderType: 'component',
                render: (col) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 0.75rem',
                      backgroundColor: '#ffffff',
                      borderBottom: '1px solid #f3f4f6',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#1f2937',
                      userSelect: 'none',
                    }}
                    data-testid={`column-item-${col.id}`}
                  >
                    <span
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        borderRadius: '50%',
                        backgroundColor: '#eff6ff',
                        color: '#3b82f6',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {col.order + 1}
                    </span>
                    {col.label}
                  </div>
                ),
              }}
              draggableConfig={{
                getItemId: (col) => col.id,
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
            {columnOrder.map(c => c.label).join(' → ')}
          </div>
        </div>

        <div className={styles.demoBox} style={{ flex: 1 }} data-testid="demo-column-reorder-table">
          <BaseTable
            data={sampleData}
            state={tableState.state}
            config={{
              columns,
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
      </div>
    </section>
  );
}
