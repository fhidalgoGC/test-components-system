import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

export function SidebarDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>7. Ejemplo Sidebar Vertical</h2>
      <p className={styles.section__description}>
        Sidebar con ancho fijo. Cada item es una fila.
      </p>
      <div className={styles.sidebarDemo} data-testid="demo-sidebar">
        <LayoutColumn
          slots={5}
          widthMode="fixed"
          width={180}
          heightMode="auto"
          paddingY="md"
          paddingX="sm"
          slotGap="xs"
          componentGap="xs"
          className={styles.darkBg}
          components={[
            { component: <div style={{ color: 'white', fontWeight: 700, fontSize: '1.125rem', padding: '0.5rem' }}>Logo</div>, align: "left", slot: 0 },
            { component: <Button variant="ghost" className="justify-start text-white w-full">Home</Button>, align: "left", slot: 1 },
            { component: <Button variant="ghost" className="justify-start text-white w-full">Settings</Button>, align: "left", slot: 2 },
            { component: <Button variant="ghost" className="justify-start text-white w-full">Profile</Button>, align: "left", slot: 3 },
            { component: <Button variant="outline" className="text-white border-white w-full">Logout</Button>, align: "left", slot: 4 },
          ]}
        />
        <div className={styles.sidebarContent}>
          <p className={styles.statusText}>Main Content Area</p>
        </div>
      </div>
    </section>
  );
}
