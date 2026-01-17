import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function BasicLayoutDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>1. Layout Básico (Single Slot)</h2>
      <p className={styles.section__description}>
        Componentes en un solo slot con alineación top/bottom y gap configurable.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-basic">
        <LayoutColumn
          slots={1}
          widthMode="full"
          heightMode="full"
          paddingY="md"
          componentGap="sm"
          componentHorizontalAlign="center"
          components={[
            { component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Header</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Content 1</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Content 2</div>, align: "top", slot: 0 },
            { component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Footer</div>, align: "bottom", slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
