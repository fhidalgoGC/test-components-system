import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Download, Share } from "lucide-react";
import styles from "../css/LayoutRowDemo.module.scss";

export function FilterBarDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>FilterBarDemo.tsx</div>
      <h2 className={styles.section__title}>3. Barra de filtros</h2>
      <p className={styles.section__description}>
        Layout con filtros a la izquierda y acciones a la derecha.
      </p>
      <div className={styles.demoBox} data-testid="demo-filter-bar">
        <LayoutRow
          slots={1}
          widthMode="full"
          paddingX="md"
          paddingY="sm"
          componentVerticalAlign="center"
          componentGap="sm"
          className={styles.filterBg}
          components={[
            { component: <Badge variant="secondary"><Filter className="h-3 w-3 mr-1" /> All</Badge>, align: 'left', slot: 0 },
            { component: <Badge variant="outline">Active</Badge>, align: 'left', slot: 0 },
            { component: <Badge variant="outline">Pending</Badge>, align: 'left', slot: 0 },
            { component: <Badge variant="outline">Completed</Badge>, align: 'left', slot: 0 },
            { component: <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>, align: 'right', slot: 0 },
            { component: <Button variant="outline" size="sm"><Share className="h-4 w-4 mr-1" /> Share</Button>, align: 'right', slot: 0 },
          ]}
        />
      </div>
    </section>
  );
}
