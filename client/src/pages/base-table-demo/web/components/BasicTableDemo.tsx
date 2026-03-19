import {
  BaseTable,
  useTableState,
} from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import styles from '../css/BaseTableDemo.module.scss';

const sampleData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "Editor",
    status: "Pending",
  },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 60, maxWidth: 80 },
  { metadata: { columnId: "name", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "email", order: 2 }, minWidth: 200 },
  { metadata: { columnId: "role", order: 3 }, minWidth: 100 },
  { metadata: { columnId: "status", order: 4 }, minWidth: 100 },
];

export function BasicTableDemo() {
  const tableState = useTableState({ initialState: "success" });

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>BasicTableDemo.tsx</div>
      <h2 className={styles.section__title}>1. Tabla Basica</h2>
      <p className={styles.section__description}>
        Tabla simple con datos estaticos y configuracion minima. Solo interpreta
        la configuracion, no transforma datos.
      </p>
      <div className={styles.demoBox} data-testid="demo-basic-table">
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
                horizontalAlign: "center",
                verticalAlign: "middle",
              },
            },
            cellsDefault: {
              horizontalAlign: "center",
              verticalAlign: "middle",
            },
            rowsDefault: {
              hoverable: true,
            },
          }}
        />
      </div>
    </section>
  );
}
