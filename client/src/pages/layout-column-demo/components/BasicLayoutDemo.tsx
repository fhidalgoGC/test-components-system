import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function BasicLayoutDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>1-BasicLayoutDemo.tsx</div>
      <h2 className={styles.section__title}>Centrado Absoluto - 1 Slot</h2>
      <p className={styles.section__description}>
        Slot de 400px. Top (2), Center (2), Bottom (1). Center siempre en el 50% del slot.
      </p>
      <div
        className={styles.demoBox}
        style={{ height: 600, border: '2px solid red' }}
        data-testid="demo-basic"
      >
        <LayoutColumn
          slots={1}
          widthMode="full"
          heightMode="full"
          paddingY="none"
          paddingX="none"
          componentGap="none"
          components={[
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--primary"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>T</span> Top-1 (0-50px)
                </div>
              ),
              align: "top",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--primary"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>T</span> Top-2 (50-100px)
                </div>
              ),
              align: "top",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--info"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>C</span> Center-1 (175-225px)
                </div>
              ),
              align: "center",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--info"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>C</span> Center-2 (175-225px)
                </div>
              ),
              align: "center",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--secondary"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>B</span> Bottom (350-400px)
                </div>
              ),
              align: "bottom",
              slot: 0,
            },
          ]}
        />
      </div>
    </section>
  );
}
