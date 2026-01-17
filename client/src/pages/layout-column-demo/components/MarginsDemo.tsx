import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MarginsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>6. Full Mode con Márgenes</h2>
      <p className={styles.section__description}>
        marginX/marginY con widthMode="full" usa calc(100% - margin*2).
      </p>
      <div className={styles.demoBox} style={{ minHeight: 200, backgroundColor: '#e5e7eb' }} data-testid="demo-margins">
        <LayoutColumn
          slots={3}
          widthMode="full"
          heightMode="auto"
          marginX="lg"
          marginY="md"
          paddingX="md"
          paddingY="sm"
          slotGap="sm"
          componentGap="sm"
          className={styles.whiteBg}
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>With Margins</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>calc(100% - margin*2)</div>, align: "center", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Full Width Row</div>, align: "center", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
