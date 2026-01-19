import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function BasicLayoutDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>1. Slots Dividen Espacio Vertical</h2>
      <p className={styles.section__description}>
        3 slots = espacio dividido en 3 partes iguales. Cada componente se alinea top o bottom.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-basic">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="full"
          paddingY="sm"
          paddingX="md"
          slotGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Slot 0 - Top</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 1 - Top</div>, align: "top", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Slot 2 - Bottom</div>, align: "bottom", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
