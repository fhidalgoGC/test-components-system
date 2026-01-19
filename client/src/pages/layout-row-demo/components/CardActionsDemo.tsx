import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutRowDemo.module.scss";

export function CardActionsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>CardActionsDemo.tsx</div>
      <h2 className={styles.section__title}>4. Card Actions (ancho fijo)</h2>
      <p className={styles.section__description}>
        Layout con ancho fijo para acciones de tarjeta.
      </p>
      <div className={styles.demoBoxCentered} data-testid="demo-card-actions">
        <LayoutRow
          slots={1}
          widthMode="fixed"
          width={400}
          paddingX="md"
          paddingY="sm"
          componentGap="sm"
          className={styles.cardBg}
          components={[
            { component: <Button variant="outline" className="flex-1">Cancel</Button>, align: 'left', slot: 0 },
            { component: <Button className="flex-1">Confirm</Button>, align: 'right', slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
