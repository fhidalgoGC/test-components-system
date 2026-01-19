import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

const initialComponents = [
  { id: 'header', component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>Header (Slot 0)</div>, align: 'top' as const, slot: 0 },
  { id: 'nav', component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Navigation (Slot 1)</div>, align: 'top' as const, slot: 1 },
  { id: 'content', component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Content (Slot 2)</div>, align: 'top' as const, slot: 2 },
  { id: 'sidebar', component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Sidebar (Slot 2)</div>, align: 'top' as const, slot: 2 },
  { id: 'footer', component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Footer (Slot 3)</div>, align: 'bottom' as const, slot: 3 },
];

export function HookDemo() {
  const {
    visibleComponents,
    visibleSlots,
    toggleSlot,
    toggleComponent,
    isSlotVisible,
    isComponentVisible,
    resetVisibility,
  } = useLayoutColumn({ components: initialComponents, slots: 4 });

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>8-HookDemo.tsx</div>
      <h2 className={styles.section__title}>Hook useLayoutColumn</h2>
      <p className={styles.section__description}>
        Gestión programática de visibilidad de componentes y slots.
      </p>
      <div className={styles.controlsRow}>
        <span className={styles.controlLabel}>Slots:</span>
        {[0, 1, 2, 3].map((slot) => (
          <Button
            key={slot}
            size="sm"
            variant={isSlotVisible(slot) ? "default" : "outline"}
            onClick={() => toggleSlot(slot)}
            data-testid={`button-slot-${slot}`}
          >
            Slot {slot}
          </Button>
        ))}
        <Button size="sm" variant="secondary" onClick={resetVisibility} data-testid="button-reset">
          Reset
        </Button>
      </div>
      <div className={styles.controlsRow}>
        <span className={styles.controlLabel}>Components:</span>
        {initialComponents.map((comp) => (
          <Button
            key={comp.id}
            size="sm"
            variant={isComponentVisible(comp.id) ? "default" : "outline"}
            onClick={() => toggleComponent(comp.id)}
            data-testid={`button-${comp.id}`}
          >
            {comp.id}
          </Button>
        ))}
      </div>
      <p className={styles.statusText}>Slots visibles: {visibleSlots}</p>
      <div className={styles.demoBox} style={{ height: 350 }} data-testid="demo-hook">
        <LayoutColumn
          slots={4}
          widthMode="full"
          heightMode="full"
          slotGap="md"
          paddingX="md"
          paddingY="md"
          componentGap="sm"
          components={visibleComponents}
        />
      </div>
    </section>
  );
}
