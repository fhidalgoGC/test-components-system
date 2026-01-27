import { useState } from "react";
import { BaseTable, useTableState, TextCell } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, MaxSize } from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import styles from "../css/BaseTableDemo.module.scss";

interface ColumnSetting {
  id: string;
  label: string;
  maxWidth: MaxSize | undefined;
}

const maxWidthOptions: { value: MaxSize | undefined; label: string }[] = [
  { value: undefined, label: "auto" },
  { value: 80, label: "80px" },
  { value: 120, label: "120px" },
  { value: 200, label: "200px" },
  { value: "stretch", label: "stretch" },
  { value: "container", label: "container" },
];

const initialColumns: ColumnSetting[] = [
  { id: "id", label: "ID", maxWidth: 80 },
  { id: "title", label: "Title", maxWidth: "stretch" },
  { id: "description", label: "Description", maxWidth: "stretch" },
];

const allAvailableColumns: ColumnSetting[] = [
  { id: "id", label: "ID", maxWidth: 80 },
  { id: "title", label: "Title", maxWidth: "stretch" },
  { id: "description", label: "Description", maxWidth: "stretch" },
  { id: "category", label: "Category", maxWidth: "stretch" },
  { id: "status", label: "Status", maxWidth: 100 },
  { id: "priority", label: "Priority", maxWidth: "container" },
];

const tableData = [
  { id: 1, title: "React", description: "UI Library", category: "Frontend", status: "Active", priority: "High" },
  { id: 2, title: "Node", description: "Runtime", category: "Backend", status: "Active", priority: "Medium" },
  { id: 3, title: "CSS", description: "Styles", category: "Design", status: "Deprecated", priority: "Low" },
  { id: 4, title: "TypeScript", description: "Types", category: "Language", status: "Active", priority: "High" },
];

export function TextWrapDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [columnSettings, setColumnSettings] = useState<ColumnSetting[]>(initialColumns);
  const [globalMinWidth, setGlobalMinWidth] = useState<number | undefined>(undefined);
  const [globalMaxWidth, setGlobalMaxWidth] = useState<MaxSize | undefined>(undefined);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const updateColumnMaxWidth = (columnId: string, newMaxWidth: MaxSize | undefined) => {
    setColumnSettings(prev => 
      prev.map(col => col.id === columnId ? { ...col, maxWidth: newMaxWidth } : col)
    );
  };

  const addColumn = () => {
    const existingIds = columnSettings.map(c => c.id);
    const nextColumn = allAvailableColumns.find(c => !existingIds.includes(c.id));
    if (nextColumn) {
      setColumnSettings(prev => [...prev, { ...nextColumn }]);
    }
  };

  const removeColumn = (columnId: string) => {
    if (columnSettings.length > 1) {
      setColumnSettings(prev => prev.filter(c => c.id !== columnId));
    }
  };

  const resetColumns = () => {
    setColumnSettings([...initialColumns]);
  };

  const columns: ColumnConfig[] = columnSettings.map((col, index) => ({
    metadata: { columnId: col.id, order: index },
    header: { cell: { render: <TextCell text={col.label} /> } },
    maxWidth: col.maxWidth,
  }));

  const canAddMore = columnSettings.length < allAvailableColumns.length;

  const getMaxWidthDisplay = (maxWidth: MaxSize | undefined) => {
    if (maxWidth === undefined) return "auto";
    if (typeof maxWidth === "number") return `${maxWidth}px`;
    return maxWidth;
  };

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>TextWrapDemo.tsx</div>
      <h2 className={styles.section__title}>7. Configuracion de Anchos por Columna</h2>
      <p className={styles.section__description}>
        Prueba diferentes configuraciones de ancho por columna. 
        Agrega/quita columnas y cambia el maxWidth de cada una.
      </p>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Columnas:</div>
        <div className={styles.controls}>
          <Button
            variant="default"
            size="sm"
            onClick={addColumn}
            disabled={!canAddMore}
            data-testid="btn-add-column"
          >
            + Agregar Columna
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetColumns}
            data-testid="btn-reset-columns"
          >
            Reset
          </Button>
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MinWidth Default:</div>
        <div className={styles.controls}>
          {[undefined, 50, 80, 100].map((value) => (
            <Button
              key={String(value)}
              variant={globalMinWidth === value ? "default" : "outline"}
              size="sm"
              onClick={() => setGlobalMinWidth(value)}
              data-testid={`btn-minwidth-${value}`}
            >
              {value === undefined ? "ninguno" : `${value}px`}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>MaxWidth Default:</div>
        <div className={styles.controls}>
          {maxWidthOptions.map((option) => (
            <Button
              key={String(option.value)}
              variant={globalMaxWidth === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setGlobalMaxWidth(option.value)}
              data-testid={`btn-maxwidth-default-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>Scroll:</div>
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

      <div className={styles.infoBox} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}><strong>Configuracion por Columna:</strong></div>
        {columnSettings.map((col) => (
          <div key={col.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ minWidth: 100, fontWeight: 500 }}>{col.label}:</span>
            {maxWidthOptions.map((option) => (
              <Button
                key={`${col.id}-${String(option.value)}`}
                variant={col.maxWidth === option.value ? "default" : "outline"}
                size="sm"
                onClick={() => updateColumnMaxWidth(col.id, option.value)}
                data-testid={`btn-${col.id}-${option.value}`}
                style={{ fontSize: 11, padding: "2px 8px", height: 24 }}
              >
                {option.label}
              </Button>
            ))}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeColumn(col.id)}
              disabled={columnSettings.length <= 1}
              data-testid={`btn-remove-${col.id}`}
              style={{ fontSize: 11, padding: "2px 8px", height: 24, marginLeft: 8 }}
            >
              X
            </Button>
          </div>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div><strong>Resumen:</strong></div>
        <div>Columnas: {columnSettings.map(c => `${c.label}(${getMaxWidthDisplay(c.maxWidth)})`).join(" | ")}</div>
        <div>MinWidth Default: {globalMinWidth ?? "ninguno"} | MaxWidth Default: {getMaxWidthDisplay(globalMaxWidth)} | Scroll: {scrollEnabled ? "si" : "no"}</div>
        <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>Nota: Los defaults aplican cuando la columna no tiene valor propio</div>
      </div>

      <div className={styles.demoBox} data-testid="demo-textwrap">
        <BaseTable
          key={JSON.stringify(columnSettings) + globalMinWidth + scrollEnabled}
          data={tableData}
          state={tableState.state}
          config={{
            columns,
            layout: {
              widthMode: "full",
              heightMode: "auto",
            },
            columnsDefault: {
              minWidth: globalMinWidth,
              maxWidth: globalMaxWidth,
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
              render: (value) => <TextCell text={value} />,
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
