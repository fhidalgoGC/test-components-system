import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

export function SidebarDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>7. Ejemplo Sidebar</h2>
      <p className={styles.section__description}>
        Sidebar con ancho fijo y altura completa.
      </p>
      <div className={styles.sidebarDemo} data-testid="demo-sidebar">
        <LayoutColumn
          slots={2}
          widthMode="fixed"
          width={180}
          heightMode="full"
          paddingY="md"
          paddingX="sm"
          slotGap="lg"
          componentGap="xs"
          componentHorizontalAlign="stretch"
          className={styles.darkBg}
          components={[
            { component: <div style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', padding: '0 0.5rem' }}>Logo</div>, align: "top", slot: 0 },
            { component: <Button variant="ghost" className="justify-start text-white">Home</Button>, align: "top", slot: 1 },
            { component: <Button variant="ghost" className="justify-start text-white">Settings</Button>, align: "top", slot: 1 },
            { component: <Button variant="ghost" className="justify-start text-white">Profile</Button>, align: "top", slot: 1 },
            { component: <Button variant="outline" className="text-white border-white">Logout</Button>, align: "bottom", slot: 1 },
          ]}
        />
        <div className={styles.sidebarContent}>
          <p className={styles.statusText}>Main Content Area</p>
        </div>
      </div>
    </section>
  );
}
