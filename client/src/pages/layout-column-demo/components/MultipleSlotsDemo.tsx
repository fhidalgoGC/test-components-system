import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

export function MultipleSlotsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>2-MultipleSlotsDemo.tsx</div>
      <h2 className={styles.section__title}>
        Top, Center y Bottom en Mismo Slot
      </h2>
      <p className={styles.section__description}>
        Dentro de cada slot: componentes arriba (top), centro (center) y abajo
        (bottom).
      </p>
      <div
        className={styles.demoBox}
        style={{ height: 1000 }}
        data-testid="demo-multiple-slots"
      >
        <LayoutColumn
          slots={2}
          widthMode="full"
          heightMode="full"
          slotDivider="sm-dark"
          paddingX="md"
          paddingY="md"
          componentGap="none"
          components={[
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--primary"]}`}
                >
                  <span className={styles.slotBadge}>0</span> Top
                </div>
              ),
              align: "top",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--info"]}`}
                >
                  <span className={styles.slotBadge}>0</span> Top2
                </div>
              ),
              align: "top",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--secondary"]}`}
                >
                  <span className={styles.slotBadge}>0</span> Bottom
                </div>
              ),
              align: "center",
              slot: 0,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--success"]}`}
                >
                  <span className={styles.slotBadge}>1</span> Top
                </div>
              ),
              align: "top",
              slot: 1,
            },
            {
              component: (
                <div
                  className={`${styles.demoItem} ${styles["demoItem--teal"]}`}
                >
                  <span className={styles.slotBadge}>1</span> Bottom
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
