import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MultipleSlotsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>2. Múltiples Slots</h2>
      <p className={styles.section__description}>
        Slots verticales con slotGap para espaciado entre secciones.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-multiple-slots">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="full"
          slotGap="md"
          componentHorizontalAlign="stretch"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Slot 0 - Header</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Slot 1 - Main Content</div>, align: "top", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Slot 2 - Footer</div>, align: "bottom", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
