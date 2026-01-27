import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, MaxSize } from "@/lib/ui-library/components/BaseTable";
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

const TextCell = ({ value, style }: { value: string; style?: React.CSSProperties }) => (
  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', ...style }}>
    {value}
  </div>
);

export function TextWrapDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentMinWidth, setCurrentMinWidth] = useState<number | undefined>(100);
  const [currentMaxWidth, setCurrentMaxWidth] = useState<MaxSize | undefined>(undefined);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const columns: ColumnConfig[] = [
    { 
      metadata: { columnId: "id", order: 0 },
      cell: {
        render: (value) => <TextCell value={String(value)} />
      }
    },
    { 
      metadata: { columnId: "title", order: 1 },
      cell: {
        render: (value) => <TextCell value={value} style={{ whiteSpace: 'nowrap' }} />
      }
    },
    { 
      metadata: { columnId: "description", order: 2 },
      cell: {
        render: (value) => <TextCell value={value} style={{ whiteSpace: 'nowrap' }} />
      }
    },
    { 
      metadata: { columnId: "category", order: 3 },
      cell: {
        render: (value) => <TextCell value={value} style={{ whiteSpace: 'nowrap' }} />
      }
    },
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
