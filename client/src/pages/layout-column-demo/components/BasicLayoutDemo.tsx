import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function BasicLayoutDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>1-BasicLayoutDemo.tsx</div>
      <h2 className={styles.section__title}>2 Slots con Divider</h2>
      <p className={styles.section__description}>
        Slot 0: Top (2), Center (2), Bottom (1). Slot 1: Top (1), Bottom (1).
        Divider azul entre slots.
      </p>
      <div
        className={styles.demoBox}
        style={{ height: 1000, border: "2px solid red" }}
        data-testid="demo-basic"
      >
        <LayoutColumn
          slots={2}
          widthMode="full"
          heightMode="full"
          paddingY="none"
          paddingX="none"
          slotGap="xs"
          componentGap="lg"
          slotDivider="xl-primary"
          slotAlignDivider="sm-gray-dashed"
          components={[
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--primary"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>T</span> Slot0-Top-1
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
                  <span className={styles.slotBadge}>C</span> Slot0-Center-1
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
                  <span className={styles.slotBadge}>C</span> Slot0-Center-2
                </div>
              ),
              align: "center",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--warning"]}`}
                  style={{ height: 30 }}
                >
                  <span className={styles.slotBadge}>T</span> Slot1-Top
                </div>
              ),
              align: "top",
              slot: 1,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--warning"]}`}
                  style={{ height: 50 }}
                >
                  <span className={styles.slotBadge}>B</span> Slot1-Bottom
                </div>
              ),
              align: "bottom",
              slot: 1,
            },
          ]}
        />
      </div>
    </section>
  );
}
