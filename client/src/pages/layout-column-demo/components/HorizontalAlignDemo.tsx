import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function HorizontalAlignDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>4-HorizontalAlignDemo.tsx</div>
      <h2 className={styles.section__title}>sizeMode: full (Componente Ocupa Todo)</h2>
      <p className={styles.section__description}>
        Con sizeMode="full", el componente se expande para llenar el espacio disponible del slot.
      </p>
      <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-size-mode">
        <LayoutColumn
          slots={2}
          widthMode="full"
          heightMode="full"
          slotDivider="sm-dark"
          paddingX="md"
          paddingY="md"
          components={[
            { 
              component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`} style={{ height: '100%' }}><span className={styles.slotBadge}>0</span> sizeMode: full</div>, 
              align: "top", 
              slot: 0,
              sizeMode: "full"
            },
            { 
              component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}><span className={styles.slotBadge}>1</span> sizeMode: auto (default)</div>, 
              align: "top", 
              slot: 1 
            },
            { 
              component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}><span className={styles.slotBadge}>1</span> Bottom</div>, 
              align: "bottom", 
              slot: 1 
            },
          ]}
        />
      </div>
    </section>
  );
}
