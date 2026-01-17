import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function FixedDimensionsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>3. Dimensiones Fijas (Numérico)</h2>
      <p className={styles.section__description}>
        Width y height con valores numéricos (px). Padding y gap también numéricos.
      </p>
      <div className={`${styles.demoBox} ${styles.fixedContainer}`} data-testid="demo-fixed">
        <LayoutColumn
          slots={3}
          widthMode="fixed"
          width={250}
          heightMode="auto"
          paddingX={16}
          paddingY={12}
          slotGap="sm"
          componentGap={8}
          className={styles.whiteBg}
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>250px width</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Fixed Layout</div>, align: "center", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Auto Height</div>, align: "center", slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
