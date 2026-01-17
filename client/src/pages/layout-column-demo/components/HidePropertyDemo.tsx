import { useState } from "react";
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import styles from "../css/LayoutColumnDemo.module.scss";

export function HidePropertyDemo() {
  const [showRow2, setShowRow2] = useState(true);
  const [showRow3, setShowRow3] = useState(true);

  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>5. Propiedad hide (Ocultar Filas)</h2>
      <p className={styles.section__description}>
        Ocultar filas dinámicamente. Filas vacías no se renderizan.
      </p>
      <div className={styles.controlsRow}>
        <div className={styles.horizontalStack}>
          <Switch id="show-row-2" checked={showRow2} onCheckedChange={setShowRow2} data-testid="switch-row-2" />
          <Label htmlFor="show-row-2">Fila 2</Label>
        </div>
        <div className={styles.horizontalStack}>
          <Switch id="show-row-3" checked={showRow3} onCheckedChange={setShowRow3} data-testid="switch-row-3" />
          <Label htmlFor="show-row-3">Fila 3</Label>
        </div>
      </div>
      <div className={styles.demoBox} style={{ minHeight: 200 }} data-testid="demo-hide">
        <LayoutColumn
          slots={4}
          widthMode="full"
          heightMode="auto"
          paddingX="md"
          paddingY="md"
          slotGap="sm"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Fila 1 (Siempre)</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--warning']}`}>Fila 2 (Toggle)</div>, align: "center", slot: 1, hide: !showRow2 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Fila 3 (Toggle)</div>, align: "center", slot: 2, hide: !showRow3 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--slate']}`}>Fila 4 (Siempre)</div>, align: "center", slot: 3 },
          ]}
        />
      </div>
    </section>
  );
}
