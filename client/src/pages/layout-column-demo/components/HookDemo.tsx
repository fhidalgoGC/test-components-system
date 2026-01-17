import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import { Button } from "@/components/ui/button";
import styles from "../css/LayoutColumnDemo.module.scss";

const initialComponents = [
  { id: 'header', component: <div className={`${styles.demoItem} ${styles['demoItem--purple']}`}>Header (Fila 0)</div>, align: 'center' as const, slot: 0 },
  { id: 'nav', component: <div className={`${styles.demoItem} ${styles['demoItem--info']}`}>Navigation (Fila 1)</div>, align: 'center' as const, slot: 1 },
  { id: 'main', component: <div className={`${styles.demoItem} ${styles['demoItem--success']}`}>Main (Fila 2)</div>, align: 'left' as const, slot: 2 },
  { id: 'sidebar', component: <div className={`${styles.demoItem} ${styles['demoItem--teal']}`}>Sidebar (Fila 2)</div>, align: 'right' as const, slot: 2 },
  { id: 'footer', component: <div className={`${styles.demoItem} ${styles['demoItem--secondary']}`}>Footer (Fila 3)</div>, align: 'center' as const, slot: 3 },
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
      <h2 className={styles.section__title}>8. Hook useLayoutColumn</h2>
      <p className={styles.section__description}>
        Gestión programática de visibilidad de componentes y filas.
      </p>
      <div className={styles.controlsRow}>
        <span className={styles.controlLabel}>Filas:</span>
        {[0, 1, 2, 3].map((slot) => (
          <Button
            key={slot}
            size="sm"
            variant={isSlotVisible(slot) ? "default" : "outline"}
            onClick={() => toggleSlot(slot)}
            data-testid={`button-slot-${slot}`}
          >
            Fila {slot}
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
      <p className={styles.statusText}>Filas visibles: {visibleSlots}</p>
      <div className={styles.demoBox} style={{ minHeight: 250 }} data-testid="demo-hook">
        <LayoutColumn
          slots={4}
          widthMode="full"
          heightMode="auto"
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
