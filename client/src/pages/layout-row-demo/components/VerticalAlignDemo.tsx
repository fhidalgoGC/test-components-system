import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import styles from "../css/LayoutRowDemo.module.scss";

const alignOptions = ['top', 'center', 'bottom', 'stretch'] as const;

export function VerticalAlignDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>6. Diferentes alineaciones verticales</h2>
      <p className={styles.section__description}>
        Comparación de alineaciones: top, center, bottom, stretch.
      </p>
      <div className={styles.gridTwoCol} data-testid="demo-vertical-align">
        {alignOptions.map((align) => (
          <div key={align} className={styles.demoBox}>
            <div className={styles.alignLabel}>
              verticalAlign: {align}
            </div>
            <LayoutRow
              slots={3}
              widthMode="full"
              heightMode="fixed"
              height="xs"
              paddingX="sm"
              componentVerticalAlign={align}
              componentGap="sm"
              className={styles.whiteCardBg}
              components={[
                { component: <div className={`w-8 h-8 ${styles.colorBox} ${styles['colorBox--blue']}`} />, align: 'left', slot: 0 },
                { component: <div className={`w-12 h-4 ${styles.colorBox} ${styles['colorBox--green']}`} />, align: 'center', slot: 1 },
                { component: <div className={`w-6 h-10 ${styles.colorBox} ${styles['colorBox--purple']}`} />, align: 'right', slot: 2 },
              ]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
