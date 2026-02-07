import { LayoutColumn, useLayoutColumn } from "@/lib/ui-library/components/LayoutColumn";
import type { SlotConfig } from "@/lib/ui-library/components/LayoutColumn/web/types";
import type { LayoutColumnComponent } from "@/lib/ui-library/components/LayoutColumn/web/types";
import styles from "../css/LayoutColumnDemo.module.scss";

function FilterSection({ label, height }: { label: string; height?: number }) {
  return (
    <div
      style={{
        background: "#f8fafc",
        height: height || "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #e2e8f0",
        padding: "8px 16px",
      }}
    >
      {label}
    </div>
  );
}

function DataListFilters() {
  const slotConfig: SlotConfig[] = [
    { heightMode: "fixed", height: 75 },
    { heightMode: "fixed", height: 75 },
    { heightMode: "fixed", height: 100 },
    { heightMode: "fixed", height: 400 },
    { heightMode: "fixed", height: 50 },
  ];

  const components: LayoutColumnComponent[] = [
    {
      id: "filter-section-1",
      component: (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <FilterSection label="FilterSection 1 (75px)" />
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      ),
      align: "top",
      slot: 0,
      sizeMode: "full",
    },
    {
      id: "filter-section-2",
      component: (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <FilterSection label="FilterSection 2 (75px)" />
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      ),
      align: "top",
      slot: 1,
      sizeMode: "full",
    },
    {
      id: "filter-section-3",
      component: <FilterSection label="FilterSection 3 (100px)" />,
      align: "top",
      slot: 2,
      sizeMode: "full",
    },
    {
      id: "filter-section-4",
      component: (
        <div className="w-full h-full flex flex-col">
          <div className="flex-1 min-h-0">
            <FilterSection label="FilterSection 4 (400px)" />
          </div>
          <div className="w-full h-px bg-gray-200" />
        </div>
      ),
      align: "top",
      slot: 3,
      sizeMode: "full",
    },
    {
      id: "filter-section-5",
      component: <FilterSection label="FilterSection 5 (50px)" />,
      align: "top",
      slot: 4,
      sizeMode: "full",
    },
  ];

  const controller = useLayoutColumn({ components, slots: 5 });

  return (
    <div
      className="h-full w-full overflow-hidden rounded-lg border bg-white shadow-sm"
      data-testid="card-data-list-filters"
    >
      <LayoutColumn
        slots={5}
        slotConfig={slotConfig}
        controller={controller}
        widthMode="full"
        heightMode="auto"
        slotGap="none"
        components={components}
      />
    </div>
  );
}

function ListMetricsCards() {
  return (
    <div
      style={{
        background: "#fef3c7",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #f59e0b",
        borderRadius: 8,
      }}
    >
      ListMetricsCards (Slot 0 - fixed 100px)
    </div>
  );
}

function ListTripsLocations() {
  return (
    <div
      style={{
        background: "#dcfce7",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #22c55e",
        borderRadius: 8,
      }}
    >
      ListTripsLocations (Slot 2 - fixed 500px)
    </div>
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
      id: "section-1",
      component: <ListMetricsCards />,
      align: "center",
      slot: 0,
      sizeMode: "full",
    },
    {
      id: "section-2",
      component: <DataListFilters />,
      align: "center",
      slot: 1,
      sizeMode: "full",
    },
    {
      id: "section-3",
      component: <ListTripsLocations />,
      align: "center",
      slot: 2,
      sizeMode: "full",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.componentName}>10-NestedAutoDemo.tsx</div>
      <h2 className={styles.section__title}>LayoutColumn Anidado con Auto</h2>
      <p className={styles.section__description}>
        Replica el caso real: DashboardPage con 3 slots (100px fixed, auto, 500px fixed).
        El slot auto contiene DataListFilters que es otro LayoutColumn con 5 slots fijos (75+75+100+400+50 = 700px).
        Total esperado: 100 + 700 + 500 + gaps = ~1324px.
      </p>
      <div
        className="w-full"
        style={{ border: "3px solid red", background: "#f9fafb" }}
        data-testid="demo-nested-auto"
      >
        <LayoutColumn
          slots={3}
          slotConfig={outerSlotConfig}
          widthMode="full"
          heightMode="auto"
          slotGap="lg"
          components={outerComponents}
        />
      </div>
    </section>
  );
}
