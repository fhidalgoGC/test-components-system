import {
  BaseTable,
  useTableState,
} from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import styles from '../css/BaseTableDemo.module.scss';

const sampleData = [
  {
    id: 1,
    name: "Carlos García",
    email: "carlos@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "María López",
    email: "maria@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Pedro Martínez",
    email: "pedro@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Ana Rodríguez",
    email: "ana@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 5,
    name: "Luis Hernández",
    email: "luis@example.com",
    role: "Admin",
    status: "Pending",
  },
  {
    id: 6,
    name: "Sofía Torres",
    email: "sofia@example.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 7,
    name: "Diego Ramírez",
    email: "diego@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Valentina Flores",
    email: "valentina@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 9,
    name: "Andrés Morales",
    email: "andres@example.com",
    role: "Viewer",
    status: "Pending",
  },
  {
    id: 10,
    name: "Camila Vargas",
    email: "camila@example.com",
    role: "Editor",
    status: "Active",
  },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 60, maxWidth: 80 },
  { metadata: { columnId: "name", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "email", order: 2 }, minWidth: 200 },
  { metadata: { columnId: "role", order: 3 }, minWidth: 100 },
  { metadata: { columnId: "status", order: 4 }, minWidth: 100 },
];

export function MaxVisibleRowsDemo() {
  const tableState = useTableState({ initialState: "success" });

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>MaxVisibleRowsDemo.tsx</div>
      <h2 className={styles.section__title}>9. MaxVisibleRows</h2>
      <p className={styles.section__description}>
        Tabla con 10 registros en el arreglo pero solo muestra 5
        (maxVisibleRows: 5). Los datos extra se cortan, no hay scroll. Es un
        limite visual del arreglo.
      </p>
      <div className={styles.demoBox} data-testid="demo-max-visible-rows">
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
              heightMode: "fixed",
              height: 40,
              hoverable: true,
              dividers: true,
              maxVisibleRows: 20,
            },
          }}
        />
      </div>
    </section>
  );
}
