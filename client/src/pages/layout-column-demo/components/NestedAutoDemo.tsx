import { LayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import type { SlotConfig } from "@/lib/ui-library/components/LayoutColumn/web/types";
import type { LayoutColumnComponent } from "@/lib/ui-library/components/LayoutColumn/web/types";
import styles from "../css/LayoutColumnDemo.module.scss";

function InnerLayoutColumn() {
  const innerSlotConfig: SlotConfig[] = [
    { heightMode: "fixed", height: 75 },
    { heightMode: "fixed", height: 75 },
    { heightMode: "fixed", height: 100 },
    { heightMode: "fixed", height: 400 },
    { heightMode: "fixed", height: 50 },
  ];

  const innerComponents: LayoutColumnComponent[] = [
    {
      component: (
        <div style={{ background: "#e0f2fe", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #0ea5e9" }}>
          Inner Slot 0 (75px)
        </div>
      ),
      align: "top",
      slot: 0,
      sizeMode: "full",
    },
    {
      component: (
        <div style={{ background: "#dbeafe", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #3b82f6" }}>
          Inner Slot 1 (75px)
        </div>
      ),
      align: "top",
      slot: 1,
      sizeMode: "full",
    },
    {
      component: (
        <div style={{ background: "#e0e7ff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #6366f1" }}>
          Inner Slot 2 (100px)
        </div>
      ),
      align: "top",
      slot: 2,
      sizeMode: "full",
    },
    {
      component: (
        <div style={{ background: "#ede9fe", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #8b5cf6" }}>
          Inner Slot 3 (400px)
        </div>
      ),
      align: "top",
      slot: 3,
      sizeMode: "full",
    },
    {
      component: (
        <div style={{ background: "#fae8ff", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #a855f7" }}>
          Inner Slot 4 (50px)
        </div>
      ),
      align: "top",
      slot: 4,
      sizeMode: "full",
    },
  ];

  return (
    <LayoutColumn
      slots={5}
      slotConfig={innerSlotConfig}
      widthMode="full"
      heightMode="auto"
      slotGap="none"
      components={innerComponents}
    />
  );
}

export function NestedAutoDemo() {
  const outerSlotConfig: SlotConfig[] = [
    { heightMode: "fixed", height: 100 },
    { heightMode: "auto" },
    { heightMode: "fixed", height: 500 },
  ];

  const outerComponents: LayoutColumnComponent[] = [
    {
      component: (
        <div style={{ background: "#fef3c7", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #f59e0b" }}>
          Outer Slot 0 (fixed 100px)
        </div>
      ),
      align: "top",
      slot: 0,
      sizeMode: "full",
    },
    {
      component: <InnerLayoutColumn />,
      align: "top",
      slot: 1,
      sizeMode: "full",
    },
    {
      component: (
        <div style={{ background: "#dcfce7", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #22c55e" }}>
          Outer Slot 2 (fixed 500px)
        </div>
      ),
      align: "top",
      slot: 2,
      sizeMode: "full",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>10-NestedAutoDemo.tsx</div>
      <h2 className={styles.section__title}>LayoutColumn Anidado con Auto</h2>
      <p className={styles.section__description}>
        Slot 0: fixed 100px. Slot 1: auto (contiene otro LayoutColumn con 5 slots fijos = 700px total).
        Slot 2: fixed 500px. Total esperado: 1300px.
      </p>
      <div
        style={{ border: "3px solid red", background: "#fff" }}
        data-testid="demo-nested-auto"
      >
        <LayoutColumn
          slots={3}
          slotConfig={outerSlotConfig}
          widthMode="full"
          heightMode="auto"
          slotGap="none"
          components={outerComponents}
        />
      </div>
    </section>
  );
}
