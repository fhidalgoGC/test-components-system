import { useState } from "react";
import { BaseTable, useTableState } from "@/lib/ui-library/components/BaseTable";
import type { ColumnConfig, TextWrap } from "@/lib/ui-library/components/BaseTable";
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

const columns: ColumnConfig[] = [
  { metadata: { columnId: "id", order: 0 }, minWidth: 50 },
  { metadata: { columnId: "title", order: 1 }, minWidth: 150 },
  { metadata: { columnId: "description", order: 2 }, minWidth: 200 },
  { metadata: { columnId: "category", order: 3 }, minWidth: 120 },
];

const textWrapOptions: { value: TextWrap; label: string; description: string }[] = [
  { value: "nowrap", label: "nowrap", description: "Texto en una linea, sin saltos" },
  { value: "wrap", label: "wrap", description: "Texto con saltos de linea naturales" },
  { value: "break-word", label: "break-word", description: "Rompe palabras largas" },
  { value: "truncate", label: "truncate", description: "Corta con ... al final" },
];

export function TextWrapDemo() {
  const tableState = useTableState({ initialState: "success" });
  const [currentWrap, setCurrentWrap] = useState<TextWrap>("nowrap");

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>TextWrapDemo.tsx</div>
      <h2 className={styles.section__title}>7. TextWrap - Comportamiento del Texto</h2>
      <p className={styles.section__description}>
        Prueba las diferentes opciones de textWrap. Observa como cambia el comportamiento 
        del texto largo en las celdas.
      </p>
      
      <div className={styles.controls}>
        {textWrapOptions.map((option) => (
          <Button
            key={option.value}
            variant={currentWrap === option.value ? "default" : "outline"}
            onClick={() => setCurrentWrap(option.value)}
            data-testid={`btn-textwrap-${option.value}`}
          >
            {option.label}
          </Button>
        ))}
      </div>
      
      <div className={styles.infoBox}>
        <strong>Modo actual: {currentWrap}</strong> - {textWrapOptions.find(o => o.value === currentWrap)?.description}
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
