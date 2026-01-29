import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, SortDirection, IconPosition } from "@/lib/ui-library/components/BaseTable";
import styles from "../css/BaseTableDemo.module.scss";

const initialData = [
  { id: 1, product: "Laptop Pro", category: "Electronics", price: 1299, sales: 245 },
  { id: 2, product: "Wireless Mouse", category: "Accessories", price: 49, sales: 890 },
  { id: 3, product: "USB-C Hub", category: "Accessories", price: 79, sales: 456 },
  { id: 4, product: "Monitor 27\"", category: "Electronics", price: 399, sales: 178 },
  { id: 5, product: "Keyboard", category: "Accessories", price: 129, sales: 567 },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "product", order: 0 }, minWidth: 150, sortable: true },
  { metadata: { columnId: "category", order: 1 }, minWidth: 120, sortable: true },
  { metadata: { columnId: "price", order: 2 }, minWidth: 100, sortable: true },
  { metadata: { columnId: "sales", order: 3 }, minWidth: 100, sortable: true },
];

export function SortableDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [data, setData] = useState(initialData);
  const [sortInfo, setSortInfo] = useState<{ column: string; direction: SortDirection } | null>(null);
  const [iconPosition, setIconPosition] = useState<IconPosition>("right");

  const handleSort = (columnId: string, direction: SortDirection) => {
    setSortInfo({ column: columnId, direction });
    
    const sorted = [...initialData].sort((a, b) => {
      const aVal = a[columnId as keyof typeof a];
      const bVal = b[columnId as keyof typeof b];
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return direction === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      const aStr = String(aVal);
      const bStr = String(bVal);
      return direction === "asc" 
        ? aStr.localeCompare(bStr) 
        : bStr.localeCompare(aStr);
    });
    
    setData(sorted);
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>SortableDemo.tsx</div>
      <h2 className={styles.section__title}>5. Columnas Ordenables</h2>
      <p className={styles.section__description}>
        La tabla notifica eventos de sort via onSort callback.
        El padre es responsable de ordenar los datos y pasarlos de nuevo.
      </p>

      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <label className={styles.controlLabel}>Icon Position:</label>
          <select
            value={iconPosition}
            onChange={(e) => setIconPosition(e.target.value as IconPosition)}
            className={styles.select}
            data-testid="select-icon-position"
          >
            <option value="left">Left</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      <div className={styles.demoBox} data-testid="demo-sortable-table">
        <BaseTable
          data={data}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "auto",
            },
            headersDefault: {
              cell: {
                sortable: true,
                iconPosition,
              },
            },
            cellsDefault: {
              horizontalAlign: "left",
            },
            rowsDefault: {
              hoverable: true,
            },
          }}
          callbacks={{
            onSort: handleSort,
          }}
        />
      </div>

      {sortInfo && (
        <div className={styles.eventLog} data-testid="sort-info">
          <div className={styles.eventLog__title}>Sort Info:</div>
          <div className={styles.eventLog__item}>
            Column: {sortInfo.column}, Direction: {sortInfo.direction}
          </div>
        </div>
      )}
    </section>
  );
}
