import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, MaxSize } from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import styles from "../css/BaseTableDemo.module.scss";

const shortTextData = [
  { id: 1, title: "React", description: "UI Library", category: "Frontend" },
  { id: 2, title: "Node", description: "Runtime", category: "Backend" },
  { id: 3, title: "CSS", description: "Styles", category: "Design" },
];

const minWidthOptions: { value: number | undefined; label: string }[] = [
  { value: undefined, label: "Sin minimo" },
  { value: 50, label: "50px" },
  { value: 100, label: "100px" },
  { value: 150, label: "150px" },
  { value: 200, label: "200px" },
];

const maxWidthOptions: { value: MaxSize | undefined; label: string }[] = [
  { value: undefined, label: "Sin maximo" },
  { value: 100, label: "100px" },
  { value: 150, label: "150px" },
  { value: 200, label: "200px" },
  { value: 300, label: "300px" },
  { value: "stretch", label: "stretch" },
  { value: "container", label: "container" },
];

export function TextWrapDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentMinWidth, setCurrentMinWidth] = useState<number | undefined>(100);
  const [currentMaxWidth, setCurrentMaxWidth] = useState<MaxSize | undefined>(undefined);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const columns: ColumnConfig[] = [
    { metadata: { columnId: "id", order: 0 } },
    { metadata: { columnId: "title", order: 1 } },
    { metadata: { columnId: "description", order: 2 } },
    { metadata: { columnId: "category", order: 3 } },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>TextWrapDemo.tsx</div>
      <h2 className={styles.section__title}>7. MinWidth y MaxWidth con Componentes</h2>
      <p className={styles.section__description}>
        Prueba las diferentes combinaciones de minWidth y maxWidth. 
        Las celdas ahora renderizan componentes que controlan su propio estilo de texto.
      </p>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MinWidth:</div>
        <div className={styles.controls}>
          {minWidthOptions.map((option) => (
            <Button
              key={String(option.value)}
              variant={currentMinWidth === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentMinWidth(option.value)}
              data-testid={`btn-minwidth-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MaxWidth:</div>
        <div className={styles.controls}>
          {maxWidthOptions.map((option) => (
            <Button
              key={String(option.value)}
              variant={currentMaxWidth === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentMaxWidth(option.value)}
              data-testid={`btn-maxwidth-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Scroll Horizontal:</div>
        <div className={styles.controls}>
          <Button
            variant={scrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setScrollEnabled(true)}
            data-testid="btn-scroll-true"
          >
            true
          </Button>
          <Button
            variant={!scrollEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setScrollEnabled(false)}
            data-testid="btn-scroll-false"
          >
            false
          </Button>
        </div>
      </div>
      
      <div className={styles.infoBox}>
        <div><strong>MinWidth:</strong> {currentMinWidth ?? "sin limite"}</div>
        <div><strong>MaxWidth:</strong> {String(currentMaxWidth) ?? "sin limite"}</div>
        <div><strong>Scroll:</strong> {scrollEnabled ? "true (scroll si no cabe)" : "false (corta si no cabe)"}</div>
      </div>

      <div className={styles.demoBox} data-testid="demo-textwrap">
        <BaseTable
          key={`${currentMinWidth}-${currentMaxWidth}-${scrollEnabled}`}
          data={shortTextData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "auto",
            },
            columnsDefault: {
              minWidth: currentMinWidth,
              maxWidth: currentMaxWidth,
              scroll: scrollEnabled,
            },
            headersDefault: {
              cell: {
                horizontalAlign: "center",
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
