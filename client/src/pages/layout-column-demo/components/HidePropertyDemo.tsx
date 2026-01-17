import { useState } from "react";
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import styles from "../css/LayoutColumnDemo.module.scss";

export function HidePropertyDemo() {
  const [showItem2, setShowItem2] = useState(true);
  const [showItem3, setShowItem3] = useState(true);

  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>5. Propiedad hide (Renderizado Condicional)</h2>
      <p className={styles.section__description}>
        Ocultar componentes dinámicamente sin afectar el layout.
      </p>
      <div className={styles.controlsRow}>
        <div className={styles.horizontalStack}>
          <Switch id="show-item-2" checked={showItem2} onCheckedChange={setShowItem2} data-testid="switch-item-2" />
          <Label htmlFor="show-item-2">Item 2</Label>
        </div>
        <div className={styles.horizontalStack}>
          <Switch id="show-item-3" checked={showItem3} onCheckedChange={setShowItem3} data-testid="switch-item-3" />
          <Label htmlFor="show-item-3">Item 3</Label>
        </div>
      </div>
      <div className={styles.demoBox} style={{ height: 250 }} data-testid="demo-hide">
        <LayoutColumn
          slots={1}
          widthMode="full"
          heightMode="full"
          componentGap="sm"
          componentHorizontalAlign="center"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Item 1 (Always)</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--warning']}`}>Item 2 (Toggle)</div>, align: "top", slot: 0, hide: !showItem2 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Item 3 (Toggle)</div>, align: "top", slot: 0, hide: !showItem3 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--slate']}`}>Item 4 (Always)</div>, align: "bottom", slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
