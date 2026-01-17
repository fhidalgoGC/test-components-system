import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import styles from "../css/LayoutColumnDemo.module.scss";

const alignments = ["left", "center", "right"] as const;
const colors = ["demoItem--primary", "demoItem--info", "demoItem--success"];

export function HorizontalAlignDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>4. Alineación Horizontal dentro de Filas</h2>
      <p className={styles.section__description}>
        Cada componente puede alinearse left, center o right dentro de su fila.
      </p>
      <div className={styles.gridThreeCol} data-testid="demo-horizontal-align">
        {alignments.map((align, idx) => (
          <div key={align} className={styles.demoBox} style={{ minHeight: 150 }}>
            <div className={styles.alignLabel}>align: "{align}"</div>
            <LayoutColumn
              slots={2}
              widthMode="full"
              heightMode="auto"
              paddingX="sm"
              paddingY="sm"
              slotGap="sm"
              componentGap="xs"
              components={[
                { component: <div className={`${styles.demoItem} ${styles[colors[idx]]}`}>{align}</div>, align, slot: 0 },
                { component: <div className={`${styles.demoItem} ${styles[colors[idx]]}`}>Row 2</div>, align, slot: 1 },
              ]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
