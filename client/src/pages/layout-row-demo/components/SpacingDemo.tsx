import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import styles from "../css/LayoutRowDemo.module.scss";

const gapOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export function SpacingDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>7. Diferentes tamaños de spacing</h2>
      <p className={styles.section__description}>
        Comparación de componentGap y slotGap.
      </p>
      <div className={styles.verticalStack} data-testid="demo-spacing">
        {gapOptions.map((gap) => (
          <div key={gap} className={styles.demoBox}>
            <div className={styles.alignLabel}>
              componentGap: {gap}
            </div>
            <LayoutRow
              slots={1}
              widthMode="full"
              paddingX="md"
              paddingY="sm"
              componentVerticalAlign="center"
              componentGap={gap}
              className={styles.whiteCardBg}
              components={[
                { component: <div className={styles.spacingItem}>Item 1</div>, align: 'left', slot: 0 },
                { component: <div className={styles.spacingItem}>Item 2</div>, align: 'left', slot: 0 },
                { component: <div className={styles.spacingItem}>Item 3</div>, align: 'left', slot: 0 },
                { component: <div className={styles.spacingItem}>Item 4</div>, align: 'left', slot: 0 },
              ]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
