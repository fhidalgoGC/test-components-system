import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function BasicLayoutDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>1. Layout Básico (Filas Apiladas)</h2>
      <p className={styles.section__description}>
        Cada slot es una fila horizontal. 4 slots = 4 filas apiladas verticalmente.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-basic">
        <LayoutColumn
          slots={4}
          widthMode="full"
          heightMode="auto"
          paddingY="md"
          paddingX="md"
          slotGap="sm"
          componentGap="sm"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Header</div>, align: "center", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Content 1</div>, align: "center", slot: 1 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Content 2</div>, align: "center", slot: 2 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Footer</div>, align: "center", slot: 3 },
          ]}
        />
      </div>
    </section>
  );
}
