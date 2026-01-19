import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import { Button } from "@/components/ui/button";
import { Search, Bell, Settings, User, Menu } from "lucide-react";
import styles from "../css/LayoutRowDemo.module.scss";

export function HeaderActionsDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>HeaderActionsDemo.tsx</div>
      <h2 className={styles.section__title}>2. Header con múltiples acciones</h2>
      <p className={styles.section__description}>
        2 slots con múltiples componentes por slot, usando diferentes alineaciones.
      </p>
      <div className={styles.demoBox} data-testid="demo-header-actions">
        <LayoutRow
          slots={2}
          widthMode="full"
          paddingX="lg"
          paddingY="md"
          componentVerticalAlign="center"
          componentGap="md"
          slotGap="lg"
          className={styles.headerBg}
          components={[
            { 
              component: (
                <div className={styles.appTitle}>
                  <Menu className="h-5 w-5" />
                  <span className={styles.appTitle__text}>MyApp</span>
                </div>
              ), 
              align: 'left', 
              slot: 0 
            },
            { 
              component: (
                <div className={styles.searchBox}>
                  <Search className={`h-4 w-4 ${styles.searchBox__icon}`} />
                  <span className={styles.searchBox__text}>Search...</span>
                </div>
              ), 
              align: 'center', 
              slot: 0 
            },
            { component: <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
            { component: <Button variant="ghost" size="icon"><Settings className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
            { component: <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>, align: 'right', slot: 1 },
          ]}
        />
      </div>
    </section>
  );
}
