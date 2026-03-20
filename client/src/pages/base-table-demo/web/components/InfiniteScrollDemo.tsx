import { useState, useCallback } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import { useAppendableState } from "@/lib/ui-library/hooks";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import styles from '../css/BaseTableDemo.module.scss';

const generateUsers = (startId: number, count: number) => {
  const names = [
    "Carlos Garcia", "Maria Lopez", "Juan Martinez", "Ana Rodriguez",
    "Pedro Sanchez", "Laura Fernandez", "Diego Hernandez", "Sofia Torres",
    "Miguel Ramirez", "Valentina Flores", "Andres Gomez", "Camila Diaz",
    "Ricardo Morales", "Isabella Cruz", "Fernando Reyes", "Daniela Ortiz",
    "Alejandro Vargas", "Lucia Mendoza", "Roberto Silva", "Paula Jimenez",
  ];
  const departments = ["Engineering", "Design", "Marketing", "Sales", "Support", "HR", "Finance"];
  const statuses = ["Active", "On Leave", "Remote"];

  return Array.from({ length: count }, (_, i) => {
    const id = startId + i;
    return {
      id,
      name: names[id % names.length],
      department: departments[id % departments.length],
      status: statuses[id % statuses.length],
      salary: Math.floor(40000 + Math.random() * 80000),
    };
  });
};

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 60 },
  { metadata: { columnId: "name", order: 1 }, minWidth: 160 },
  { metadata: { columnId: "department", order: 2 }, minWidth: 130 },
  { metadata: { columnId: "status", order: 3 }, minWidth: 100 },
  {
    metadata: { columnId: "salary", order: 4 },
    minWidth: 110,
    cell: {
      horizontalAlign: "right",
      render: (value: number) => `$${value.toLocaleString()}`,
    },
  },
];

const INITIAL_SIZE = 5;
const PAGE_SIZE = 5;
const MAX_ITEMS = 50;

export function InfiniteScrollDemo() {
  const tableState = useTableState({ initialState: "success" });
  const { data, append, reset } = useAppendableState(() => generateUsers(1, INITIAL_SIZE));
  const [hasMore, setHasMore] = useState(true);

  const handleReachEnd = useCallback(() => {
    if (!hasMore || tableState.state === "loadingMore") return;

    tableState.setState("loadingMore");

    setTimeout(() => {
      const nextId = data.length + 1;
      const remaining = MAX_ITEMS - data.length;
      if (remaining <= 0) {
        setHasMore(false);
        tableState.setState("success");
        return;
      }
      const count = Math.min(PAGE_SIZE, remaining);
      const newItems = generateUsers(nextId, count);
      append(newItems);
      if (data.length + count >= MAX_ITEMS) {
        setHasMore(false);
      }
      tableState.setState("success");
    }, 1500);
  }, [hasMore, tableState, data.length, append]);

  const handleReset = () => {
    reset(generateUsers(1, INITIAL_SIZE));
    setHasMore(true);
    tableState.setState("success");
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>InfiniteScrollDemo.tsx</div>
      <h2 className={styles.section__title} data-testid="text-infinite-scroll-title">
        10. Infinite Scroll (onReachEnd)
      </h2>
      <p className={styles.section__description}>
        Inicia con {INITIAL_SIZE} registros visibles. Al hacer scroll hasta el final, se dispara <code>onReachEnd</code> que
        carga {PAGE_SIZE} registros mas usando <code>useAppendableState.append()</code>.
        Se detiene al llegar a {MAX_ITEMS} items.
      </p>

      <div className={styles.controls}>
        <Button onClick={handleReset} variant="outline" data-testid="btn-reset-infinite">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reiniciar
        </Button>
        <span className="text-sm text-gray-500" data-testid="text-item-count">
          {data.length} / {MAX_ITEMS} items {!hasMore && "(todos cargados)"}
        </span>
      </div>

      <div className={styles.demoBox} data-testid="demo-infinite-scroll">
        <BaseTable
          data={data}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "fixed",
              height: 200,
              verticalScroll: true,
            },
            behaviors: {
              infiniteScroll: {
                enabled: hasMore,
                threshold: 80,
                loadingMoreMessage: "Cargando mas datos...",
              },
              states: {
                loading: { message: "Cargando datos iniciales..." },
              },
            },
            cellsDefault: {
              horizontalAlign: "left",
              verticalAlign: "middle",
            },
            rowsDefault: {
              hoverable: true,
            },
          }}
          callbacks={{
            onReachEnd: handleReachEnd,
          }}
        />
      </div>

      <div className={styles.infoBox}>
        <strong>Configuracion:</strong>
        <span>
          <code>behaviors.infiniteScroll.enabled</code>: activa la deteccion de scroll.
        </span>
        <span>
          <code>behaviors.infiniteScroll.threshold</code>: pixeles antes del final para disparar (default: 100).
        </span>
        <span>
          <code>callbacks.onReachEnd</code>: se ejecuta cuando el usuario llega al final.
        </span>
        <span>
          <code>state: "loadingMore"</code>: muestra un spinner al final de la tabla.
        </span>
      </div>
    </section>
  );
}
