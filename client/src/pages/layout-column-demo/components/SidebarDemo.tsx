import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

export function SidebarDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>7-SidebarDemo.tsx</div>
      <h2 className={styles.section__title}>Ejemplo Sidebar</h2>
      <p className={styles.section__description}>
        Sidebar con 2 slots: navegación arriba, logout abajo.
      </p>
      <div className={styles.sidebarDemo} data-testid="demo-sidebar">
        <LayoutColumn
          slots={2}
          widthMode="fixed"
          width={180}
          heightMode="full"
          paddingY="md"
          paddingX="sm"
          slotDivider="xs-white"
          componentGap="xs"
          className={styles.darkBg}
          components={[
            { component: <div style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', padding: '0.5rem' }}><span className={styles.slotBadge}>0</span> Logo</div>, align: "top", slot: 0 },
            { component: <Button variant="ghost" className="justify-start text-white w-full"><span className={styles.slotBadge}>1</span> Home</Button>, align: "top", slot: 1 },
            { component: <Button variant="ghost" className="justify-start text-white w-full"><span className={styles.slotBadge}>1</span> Settings</Button>, align: "top", slot: 1 },
            { component: <Button variant="ghost" className="justify-start text-white w-full"><span className={styles.slotBadge}>1</span> Profile</Button>, align: "top", slot: 1 },
            { component: <Button variant="outline" className="text-white border-white w-full"><span className={styles.slotBadge}>1</span> Logout</Button>, align: "bottom", slot: 1 },
          ]}
        />
        <div className={styles.sidebarContent}>
          <p className={styles.statusText}>Main Content Area</p>
        </div>
      </div>
    </section>
  );
}
