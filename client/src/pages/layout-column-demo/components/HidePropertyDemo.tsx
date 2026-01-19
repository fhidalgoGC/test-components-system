import { useState } from "react";
import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import styles from "../css/LayoutColumnDemo.module.scss";

export function HidePropertyDemo() {
  const [showSlot1, setShowSlot1] = useState(true);
  const [showBottom, setShowBottom] = useState(true);

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>5-HidePropertyDemo.tsx</div>
      <h2 className={styles.section__title}>Propiedad hide</h2>
      <p className={styles.section__description}>
        Ocultar componentes dinámicamente. Slots vacíos no se renderizan.
      </p>
      <div className={styles.controlsRow}>
        <div className={styles.horizontalStack}>
          <Switch id="show-slot-1" checked={showSlot1} onCheckedChange={setShowSlot1} data-testid="switch-slot-1" />
          <Label htmlFor="show-slot-1">Slot 1</Label>
        </div>
        <div className={styles.horizontalStack}>
          <Switch id="show-bottom" checked={showBottom} onCheckedChange={setShowBottom} data-testid="switch-bottom" />
          <Label htmlFor="show-bottom">Bottom Items</Label>
        </div>
      </div>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-hide">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="full"
          paddingX="md"
          paddingY="md"
          slotDivider="xs-gray"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Slot 0 - Always</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--warning']}`}>Slot 1 - Toggle</div>, align: "top", slot: 1, hide: !showSlot1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 2 - Top</div>, align: "top", slot: 2 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--slate']}`}>Slot 2 - Bottom Toggle</div>, align: "bottom", slot: 2, hide: !showBottom },
          ]}
        />
      </div>
    </section>
  );
}
