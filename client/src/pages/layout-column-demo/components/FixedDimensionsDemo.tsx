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
          slots={1}
          widthMode="fixed"
          width={200}
          heightMode="fixed"
          height={250}
          paddingX={16}
          paddingY={12}
          componentGap={8}
          componentHorizontalAlign="center"
          className={styles.whiteBg}
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>200px x 250px</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Centered</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Bottom</div>, align: "bottom", slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
