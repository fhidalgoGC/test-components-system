import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MarginsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>6. Full Mode con Márgenes</h2>
      <p className={styles.section__description}>
        marginX/marginY con widthMode="full" usa calc(100% - margin*2).
      </p>
      <div className={styles.demoBox} style={{ height: 250, backgroundColor: '#e5e7eb' }} data-testid="demo-margins">
        <LayoutColumn
          slots={1}
          widthMode="full"
          heightMode="full"
          marginX="lg"
          marginY="md"
          paddingX="md"
          paddingY="sm"
          componentGap="sm"
          componentHorizontalAlign="stretch"
          className={styles.whiteBg}
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>With Margins</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>calc(100% - margin*2)</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Stretched</div>, align: "bottom", slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
