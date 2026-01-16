import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import styles from "../css/LayoutRowDemo.module.scss";

export function ToolbarBasicDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>1. Toolbar Básico (3 slots)</h2>
      <p className={styles.section__description}>
        Layout con 3 slots: navegación izquierda, título central, acciones derecha.
      </p>
      <div className={styles.demoBox} data-testid="demo-toolbar-basic">
        <LayoutRow
          slots={3}
          widthMode="full"
          heightMode="fixed"
          height="sm"
          paddingX="md"
          paddingY="sm"
          componentVerticalAlign="center"
          componentGap="sm"
          slotGap="md"
          className={styles.toolbarBg}
          components={[
            { component: <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>, align: 'left', slot: 0 },
            { component: <span className="font-semibold">Page Title</span>, align: 'center', slot: 1 },
            { component: <Button size="sm"><Save className="h-4 w-4 mr-2" /> Save</Button>, align: 'right', slot: 2 },
          ]}
        />
      </div>
    </section>
  );
}
