import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MarginsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>6-MarginsDemo.tsx</div>
      <h2 className={styles.section__title}>Full Mode con Márgenes</h2>
      <p className={styles.section__description}>
        marginX/marginY con widthMode/heightMode="full" usa calc(100% - margin*2).
      </p>
      <div className={styles.demoBox} style={{ height: 300, backgroundColor: '#e5e7eb' }} data-testid="demo-margins">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="full"
          marginX="lg"
          marginY="md"
          paddingX="md"
          paddingY="sm"
          slotDivider="sm-dark"
          componentGap="sm"
          className={styles.whiteBg}
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Slot 0 - Top</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Slot 1 - Top</div>, align: "top", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Slot 2 - Bottom</div>, align: "bottom", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
