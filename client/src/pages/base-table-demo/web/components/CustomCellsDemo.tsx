import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import styles from '../css/BaseTableDemo.module.scss';

const sampleData = [
  { id: 1, name: "Maria Garcia", email: "maria@company.com", status: "active", role: "Developer" },
  { id: 2, name: "Carlos Lopez", email: "carlos@company.com", status: "inactive", role: "Designer" },
  { id: 3, name: "Ana Martinez", email: "ana@company.com", status: "pending", role: "Manager" },
  { id: 4, name: "Pedro Sanchez", email: "pedro@company.com", status: "active", role: "Developer" },
];

const getInitials = (name: string) => {
  return name.split(" ").map(n => n[0]).join("").toUpperCase();
};

const columns: ColumnConfig[] = [
  { 
    metadata: { columnId: "name", order: 0 }, 
    minWidth: 250,
    cell: {
      render: (value: string, rowData: any) => (
        <div className={styles.userCell}>
          <div className={styles.avatar}>{getInitials(value)}</div>
          <div className={styles.userCell__info}>
            <span className={styles.userCell__name}>{value}</span>
            <span className={styles.userCell__email}>{rowData.email}</span>
          </div>
        </div>
      ),
    },
  },
  { metadata: { columnId: "role", order: 1 }, minWidth: 120 },
  { 
    metadata: { columnId: "status", order: 2 }, 
    minWidth: 100,
    cell: {
      render: (value: string) => {
        const statusClass = value === "active" 
          ? styles["statusBadge--active"]
          : value === "pending" 
            ? styles["statusBadge--pending"]
            : styles["statusBadge--inactive"];
        return (
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        );
      },
    },
  },
];

export function CustomCellsDemo() {
  const tableState = useTableState({ initialState: "success" });

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>CustomCellsDemo.tsx</div>
      <h2 className={styles.section__title}>4. Celdas Personalizadas (column.cell)</h2>
      <p className={styles.section__description}>
        Cada columna puede definir su propio render via column.cell.render.
        La cadena de overrides es: cellsDefault → column.cell
      </p>

      <div className={styles.demoBox} data-testid="demo-custom-cells-table">
        <BaseTable
          data={sampleData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "auto",
            },
            headersDefault: {
              cell: {
                horizontalAlign: "left",
              },
            },
            cellsDefault: {
              verticalAlign: "middle",
            },
            rowsDefault: {
              hoverable: true,
              minHeight: 60,
            },
          }}
        />
      </div>
    </section>
  );
}
