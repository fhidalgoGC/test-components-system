import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MultipleSlotsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>2. Top, Center y Bottom en Mismo Slot</h2>
      <p className={styles.section__description}>
        Dentro de cada slot: componentes arriba (top), centro (center) y abajo (bottom).
      </p>
      <div className={styles.demoBox} style={{ height: 350 }} data-testid="demo-multiple-slots">
        <LayoutColumn
          slots={2}
          widthMode="full"
          heightMode="full"
          slotGap="md"
          paddingX="md"
          paddingY="md"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Slot 0 - Top</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 0 - Center</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Slot 0 - Bottom</div>, align: "bottom", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Slot 1 - Top</div>, align: "top", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Slot 1 - Bottom</div>, align: "bottom", slot: 1 },
          ]}
        />
      </div>
    </section>
  );
}
