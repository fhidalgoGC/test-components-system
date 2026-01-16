import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import { Home, MoreHorizontal } from "lucide-react";
import styles from "../css/LayoutRowDemo.module.scss";

export function BreadcrumbsDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>5. Navegación con breadcrumbs</h2>
      <p className={styles.section__description}>
        Breadcrumbs a la izquierda, acciones contextuales a la derecha.
      </p>
      <div className={styles.demoBox} data-testid="demo-breadcrumbs">
        <LayoutRow
          slots={1}
          widthMode="full"
          paddingX="md"
          paddingY="xs"
          componentVerticalAlign="center"
          componentGap="xs"
          className={styles.breadcrumbBg}
          components={[
            { component: <Button variant="link" size="sm" className="p-0 h-auto"><Home className="h-4 w-4" /></Button>, align: 'left', slot: 0 },
            { component: <span className={styles.breadcrumbSeparator}>/</span>, align: 'left', slot: 0 },
            { component: <Button variant="link" size="sm" className="p-0 h-auto">Dashboard</Button>, align: 'left', slot: 0 },
            { component: <span className={styles.breadcrumbSeparator}>/</span>, align: 'left', slot: 0 },
            { component: <span className={styles.breadcrumbCurrent}>Settings</span>, align: 'left', slot: 0 },
            { component: <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>, align: 'right', slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
