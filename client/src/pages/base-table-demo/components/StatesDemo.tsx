import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, TableState } from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import styles from "../css/BaseTableDemo.module.scss";

const sampleData = [
  { id: 1, product: "Laptop Pro", price: 1299, stock: 45 },
  { id: 2, product: "Wireless Mouse", price: 49, stock: 120 },
  { id: 3, product: "USB-C Hub", price: 79, stock: 80 },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 60 },
  { metadata: { columnId: "product", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "price", order: 2 }, minWidth: 100 },
  { metadata: { columnId: "stock", order: 3 }, minWidth: 100 },
];

export function StatesDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentState, setCurrentState] = useState<TableState>("success");

  const handleStateChange = (newState: TableState) => {
    setCurrentState(newState);
    tableState.setState(newState);
    if (newState === "error") {
      tableState.setError("Error de conexion con el servidor");
    }
  };

  const getDataForState = () => {
    if (currentState === "empty") return [];
    if (currentState === "loading" || currentState === "error" || currentState === "idle") return [];
    return sampleData;
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>StatesDemo.tsx</div>
      <h2 className={styles.section__title}>2. Estados Externos (useTableState)</h2>
      <p className={styles.section__description}>
        El estado se controla externamente via useTableState hook. 
        La tabla solo muestra lo que se le indica, sin decisiones internas.
      </p>
      
      <div className={styles.controls}>
        <Button 
          size="sm" 
          variant={currentState === "idle" ? "default" : "outline"}
          onClick={() => handleStateChange("idle")}
          data-testid="btn-state-idle"
        >
          Idle
        </Button>
        <Button 
          size="sm" 
          variant={currentState === "loading" ? "default" : "outline"}
          onClick={() => handleStateChange("loading")}
          data-testid="btn-state-loading"
        >
          Loading
        </Button>
        <Button 
          size="sm" 
          variant={currentState === "success" ? "default" : "outline"}
          onClick={() => handleStateChange("success")}
          data-testid="btn-state-success"
        >
          Success
        </Button>
        <Button 
          size="sm" 
          variant={currentState === "error" ? "default" : "outline"}
          onClick={() => handleStateChange("error")}
          data-testid="btn-state-error"
        >
          Error
        </Button>
        <Button 
          size="sm" 
          variant={currentState === "empty" ? "default" : "outline"}
          onClick={() => handleStateChange("empty")}
          data-testid="btn-state-empty"
        >
          Empty
        </Button>
      </div>

      <div className={styles.demoBox} data-testid="demo-states-table">
        <BaseTable
          data={getDataForState()}
          state={tableState.state}
          error={tableState.error}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "fixed",
              height: 250,
            },
            behaviors: {
              states: {
                loading: { message: "Cargando datos..." },
                error: { message: "Ocurrio un error" },
                empty: { message: "No hay datos disponibles" },
                idle: { message: "Esperando accion..." },
              },
            },
          }}
        />
      </div>
    </section>
  );
}
