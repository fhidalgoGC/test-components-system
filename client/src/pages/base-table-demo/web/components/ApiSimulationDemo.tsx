import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig } from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import styles from '../css/BaseTableDemo.module.scss';

const dataSet1 = [
  { id: 1, product: "Laptop Pro", category: "Electronics", price: 1299, stock: 45 },
  { id: 2, product: "Wireless Mouse", category: "Accessories", price: 49, stock: 120 },
  { id: 3, product: "USB-C Hub", category: "Accessories", price: 79, stock: 80 },
];

const dataSet2 = [
  { id: 4, product: "Monitor 27\"", category: "Electronics", price: 399, stock: 32 },
  { id: 5, product: "Keyboard RGB", category: "Accessories", price: 129, stock: 65 },
  { id: 6, product: "Webcam HD", category: "Electronics", price: 89, stock: 200 },
  { id: 7, product: "Headphones Pro", category: "Audio", price: 249, stock: 55 },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 60 },
  { metadata: { columnId: "product", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "category", order: 2 }, minWidth: 120 },
  { metadata: { columnId: "price", order: 3 }, minWidth: 100 },
  { metadata: { columnId: "stock", order: 4 }, minWidth: 100 },
];

export function ApiSimulationDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentData, setCurrentData] = useState(dataSet1);
  const [dataVersion, setDataVersion] = useState(1);

  const simulateApiCall = () => {
    tableState.setState("loading");
    
    setTimeout(() => {
      const newData = dataVersion === 1 ? dataSet2 : dataSet1;
      setCurrentData(newData);
      setDataVersion(dataVersion === 1 ? 2 : 1);
      tableState.setState("success");
    }, 2000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>ApiSimulationDemo.tsx</div>
      <h2 className={styles.section__title}>6. Simulacion de API (Loading → Success)</h2>
      <p className={styles.section__description}>
        Al presionar el boton, el estado cambia a "loading" por 2 segundos, 
        luego carga nuevos datos y cambia a "success". Simula una llamada API real.
      </p>
      
      <div className={styles.controls}>
        <Button 
          onClick={simulateApiCall}
          disabled={tableState.state === "loading"}
          data-testid="btn-fetch-data"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${tableState.state === "loading" ? "animate-spin" : ""}`} />
          {tableState.state === "loading" ? "Cargando..." : "Cargar Datos"}
        </Button>
        <span className="text-sm text-gray-500">
          Dataset actual: {dataVersion}
        </span>
      </div>

      <div className={styles.demoBox} data-testid="demo-api-simulation">
        <BaseTable
          data={currentData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "fixed",
              height: 250,
            },
            behaviors: {
              states: {
                loading: { message: "Obteniendo datos del servidor..." },
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
        />
      </div>
    </section>
  );
}
