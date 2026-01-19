import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function FixedDimensionsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>3-FixedDimensionsDemo.tsx</div>
      <h2 className={styles.section__title}>Componentes con Altura Fija</h2>
      <p className={styles.section__description}>
        Cada componente puede tener altura fija con tokens o números.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-fixed">
        <LayoutColumn
          slots={1}
          widthMode="full"
          heightMode="full"
          paddingX="md"
          paddingY="md"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>height: 50px</div>, align: "top", slot: 0, height: 50 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>height: "sm" (200px)</div>, align: "top", slot: 0, height: "sm" },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>height: auto (default)</div>, align: "bottom", slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
