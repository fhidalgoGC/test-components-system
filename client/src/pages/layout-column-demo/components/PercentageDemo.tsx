import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function PercentageDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>10-PercentageDemo.tsx</div>
      <h2 className={styles.section__title}>SlotConfig con Porcentaje (heightMode: 'percentage')</h2>
      <p className={styles.section__description}>
        Cada slot ocupa un porcentaje del contenedor padre. Útil para layouts proporcionales.
      </p>

      <div className={styles.gridTwoCol}>
        <div>
          <p className={styles.controlLabel}>60% / 40%</p>
          <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-percentage-60-40">
            <LayoutColumn
              slots={2}
              widthMode="full"
              heightMode="full"
              slotDivider="sm-dark"
              slotConfig={[
                { heightMode: 'percentage', height: 60 },
                { heightMode: 'percentage', height: 40 },
              ]}
              components={[
                { id: 'top', component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Slot 0 — 60%</div>, align: 'top', slot: 0, sizeMode: 'full' },
                { id: 'bottom', component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Slot 1 — 40%</div>, align: 'top', slot: 1, sizeMode: 'full' },
              ]}
            />
          </div>
        </div>

        <div>
          <p className={styles.controlLabel}>30% / 50% / 20%</p>
          <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-percentage-30-50-20">
            <LayoutColumn
              slots={3}
              widthMode="full"
              heightMode="full"
              slotDivider="sm-light"
              slotConfig={[
                { heightMode: 'percentage', height: 30 },
                { heightMode: 'percentage', height: 50 },
                { heightMode: 'percentage', height: 20 },
              ]}
              components={[
                { id: 'header', component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>Header — 30%</div>, align: 'top', slot: 0, sizeMode: 'full' },
                { id: 'content', component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Content — 50%</div>, align: 'top', slot: 1, sizeMode: 'full' },
                { id: 'footer', component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Footer — 20%</div>, align: 'top', slot: 2, sizeMode: 'full' },
              ]}
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <p className={styles.controlLabel}>Mixto: fixed (60px) + percentage (70%) + auto</p>
        <div className={styles.demoBox} style={{ height: 300 }} data-testid="demo-percentage-mixed">
          <LayoutColumn
            slots={3}
            widthMode="full"
            heightMode="full"
            slotDivider="sm-dark"
            slotConfig={[
              { heightMode: 'fixed', height: 60 },
              { heightMode: 'percentage', height: 70 },
              { heightMode: 'auto' },
            ]}
            components={[
              { id: 'nav', component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Nav — fixed 60px</div>, align: 'top', slot: 0, sizeMode: 'full' },
              { id: 'main', component: <div className={`${styles.demoItem} ${styles['demoItem--primary']}`}>Main — 70%</div>, align: 'top', slot: 1, sizeMode: 'full' },
              { id: 'status', component: <div className={`${styles.demoItem} ${styles['demoItem--slate']}`}>Status — auto</div>, align: 'top', slot: 2 },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
