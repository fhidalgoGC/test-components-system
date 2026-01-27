import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, TextWrap, MaxSize } from "@/lib/ui-library/components/BaseTable";
import { Button } from "@/components/ui/button";
import styles from "../css/BaseTableDemo.module.scss";

const longTextData = [
  { 
    id: 1, 
    title: "Este es un titulo muy largo que deberia mostrar como se comporta el texto", 
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Categoria con nombre extremadamente largo para probar"
  },
  { 
    id: 2, 
    title: "Otro titulo con bastante texto para ver el comportamiento", 
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    category: "Tecnologia/Desarrollo/Software/Web"
  },
  { 
    id: 3, 
    title: "TituloSinEspaciosParaProbarBreakWord", 
    description: "URLMuyLargaSinEspacios/ejemplo/ruta/archivo/documento/version/final/2024",
    category: "SinEspaciosAquiTampoco"
  },
];

const textWrapOptions: { value: TextWrap; label: string }[] = [
  { value: "nowrap", label: "nowrap" },
  { value: "wrap", label: "wrap" },
  { value: "break-word", label: "break-word" },
  { value: "truncate", label: "truncate" },
  { value: "auto", label: "auto" },
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
  const [currentWrap, setCurrentWrap] = useState<TextWrap>("nowrap");
  const [currentMinWidth, setCurrentMinWidth] = useState<number | undefined>(100);
  const [currentMaxWidth, setCurrentMaxWidth] = useState<MaxSize | undefined>(undefined);

  const columns: ColumnConfig[] = [
    { metadata: { columnId: "id", order: 0 } },
    { metadata: { columnId: "title", order: 1 } },
    { metadata: { columnId: "description", order: 2 } },
    { metadata: { columnId: "category", order: 3 } },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>TextWrapDemo.tsx</div>
      <h2 className={styles.section__title}>7. TextWrap, MinWidth y MaxWidth</h2>
      <p className={styles.section__description}>
        Prueba las diferentes combinaciones de textWrap, minWidth y maxWidth. 
        La columna ID tiene valores fijos (50-80px), las demas columnas usan los valores seleccionados.
      </p>
      
      <div className={styles.controlGroup}>
        <div className={styles.controlLabel}>TextWrap:</div>
        <div className={styles.controls}>
          {textWrapOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentWrap === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentWrap(option.value)}
              data-testid={`btn-textwrap-${option.value}`}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

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
      
      <div className={styles.infoBox}>
        <div><strong>TextWrap:</strong> {currentWrap}</div>
        <div><strong>MinWidth:</strong> {currentMinWidth ?? "sin limite"}</div>
        <div><strong>MaxWidth:</strong> {String(currentMaxWidth) ?? "sin limite"}</div>
      </div>

      <div className={styles.demoBox} data-testid="demo-textwrap">
        <BaseTable
          data={longTextData}
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
            },
            headersDefault: {
              cell: {
                horizontalAlign: "center",
              },
            },
            cellsDefault: {
              horizontalAlign: "left",
              verticalAlign: "middle",
              textWrap: currentWrap,
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
