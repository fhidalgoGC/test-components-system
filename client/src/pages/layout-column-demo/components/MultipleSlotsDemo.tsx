import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MultipleSlotsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>2. Múltiples Componentes por Fila</h2>
      <p className={styles.section__description}>
        Cada fila (slot) puede tener múltiples componentes alineados left/center/right.
      </p>
      <div className={styles.demoBox} style={{ minHeight: 200 }} data-testid="demo-multiple-slots">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="auto"
          slotGap="md"
          paddingX="md"
          paddingY="md"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Left</div>, align: "left", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Center</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Right</div>, align: "right", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 1 - Left</div>, align: "left", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 1 - Right</div>, align: "right", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Slot 2 - Centered</div>, align: "center", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
