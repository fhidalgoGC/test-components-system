import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import styles from '../css/BaseTableDemo.module.scss';

const sampleData = [
  { id: 1, order: "ORD-001", customer: "Tech Corp", total: 2500, date: "2026-01-15" },
  { id: 2, order: "ORD-002", customer: "Design Studio", total: 1800, date: "2026-01-16" },
  { id: 3, order: "ORD-003", customer: "Marketing Inc", total: 3200, date: "2026-01-17" },
  { id: 4, order: "ORD-004", customer: "Sales Team", total: 950, date: "2026-01-18" },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "order", order: 0 }, minWidth: 100 },
  { metadata: { columnId: "customer", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "total", order: 2 }, minWidth: 100 },
  { metadata: { columnId: "date", order: 3 }, minWidth: 120 },
];

export function ClickableRowsDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    setEvents(prev => [event, ...prev].slice(0, 5));
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>ClickableRowsDemo.tsx</div>
      <h2 className={styles.section__title}>3. Filas y Celdas Clickeables</h2>
      <p className={styles.section__description}>
        La tabla notifica eventos via callbacks, sin ejecutar acciones internas.
        El padre decide que hacer con los eventos.
      </p>

      <div className={styles.demoBox} data-testid="demo-clickable-table">
        <BaseTable
          data={sampleData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "auto",
            },
            behaviors: {
              clickable: "row",
              hoverable: "row",
            },
            rowsDefault: {
              hoverable: true,
            },
          }}
          callbacks={{
            onRowClick: (rowIndex, rowData) => {
              addEvent(`Row clicked: index=${rowIndex}, order=${rowData.order}`);
            },
            onCellClick: (columnId, rowIndex, value) => {
              addEvent(`Cell clicked: ${columnId}[${rowIndex}] = ${value}`);
            },
          }}
        />
      </div>

      {events.length > 0 && (
        <div className={styles.eventLog} data-testid="event-log">
          <div className={styles.eventLog__title}>Event Log:</div>
          {events.map((event, i) => (
            <div key={i} className={styles.eventLog__item}>{event}</div>
          ))}
        </div>
      )}
    </section>
  );
}
