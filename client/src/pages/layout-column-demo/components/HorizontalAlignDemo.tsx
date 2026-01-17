import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

const alignments = ["left", "center", "right", "stretch"] as const;
const colors = ["demoItem--primary", "demoItem--info", "demoItem--success", "demoItem--purple"];

export function HorizontalAlignDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>4. Alineación Horizontal</h2>
      <p className={styles.section__description}>
        componentHorizontalAlign: left, center, right, stretch.
      </p>
      <div className={styles.gridTwoCol} data-testid="demo-horizontal-align">
        {alignments.map((align, idx) => (
          <div key={align} className={styles.demoBox} style={{ height: 180 }}>
            <div className={styles.alignLabel}>align: "{align}"</div>
            <LayoutColumn
              slots={1}
              widthMode="full"
              heightMode="full"
              componentGap="xs"
              componentHorizontalAlign={align}
              components={[
                { component: <div className={`${styles.demoItem} ${styles[colors[idx]]}`}>{align}</div>, align: "top", slot: 0 },
                { component: <div className={`${styles.demoItem} ${styles[colors[idx]]}`}>Item 2</div>, align: "top", slot: 0 },
              ]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
