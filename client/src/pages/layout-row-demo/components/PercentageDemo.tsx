import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import styles from "../css/LayoutRowDemo.module.scss";

const ColorBlock = ({
  label,
  bg,
}: {
  label: string;
  bg: string;
}) => (
  <div
    style={{
      background: bg,
      borderRadius: "6px",
      padding: "8px 12px",
      color: "#fff",
      fontSize: "0.75rem",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: "100%",
      boxSizing: "border-box",
    }}
    data-testid={`percentage-block-${label.toLowerCase().replace(/\s/g, "-")}`}
  >
    {label}
  </div>
);

export function PercentageDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>10-PercentageDemo.tsx</div>
      <h2 className={styles.section__title}>SlotConfig con Porcentaje (widthMode: 'percentage')</h2>
      <p className={styles.section__description}>
        Cada slot ocupa un porcentaje del ancho del contenedor. Útil para layouts proporcionales.
      </p>

      <div className={styles.verticalStack}>
        <div>
          <p className={styles.controlLabel}>60% / 40%</p>
          <div className={styles.demoBox} data-testid="demo-row-percentage-60-40">
            <LayoutRow
              slots={2}
              widthMode="full"
              heightMode="fixed"
              height={60}
              slotConfig={[
                { widthMode: 'percentage', width: 60 },
                { widthMode: 'percentage', width: 40 },
              ]}
              components={[
                { component: <ColorBlock label="Slot 0 — 60%" bg="#4353ff" />, align: 'left', slot: 0 },
                { component: <ColorBlock label="Slot 1 — 40%" bg="#22c55e" />, align: 'left', slot: 1 },
              ]}
            />
          </div>
        </div>

        <div>
          <p className={styles.controlLabel}>25% / 50% / 25%</p>
          <div className={styles.demoBox} data-testid="demo-row-percentage-25-50-25">
            <LayoutRow
              slots={3}
              widthMode="full"
              heightMode="fixed"
              height={60}
              slotConfig={[
                { widthMode: 'percentage', width: 25 },
                { widthMode: 'percentage', width: 50 },
                { widthMode: 'percentage', width: 25 },
              ]}
              components={[
                { component: <ColorBlock label="Left — 25%" bg="#8b5cf6" />, align: 'left', slot: 0 },
                { component: <ColorBlock label="Center — 50%" bg="#3b82f6" />, align: 'left', slot: 1 },
                { component: <ColorBlock label="Right — 25%" bg="#64748b" />, align: 'left', slot: 2 },
              ]}
            />
          </div>
        </div>

        <div>
          <p className={styles.controlLabel}>Mixto: fixed (200px) + percentage (60%) + auto</p>
          <div className={styles.demoBox} data-testid="demo-row-percentage-mixed">
            <LayoutRow
              slots={3}
              widthMode="full"
              heightMode="fixed"
              height={60}
              slotConfig={[
                { widthMode: 'fixed', width: 200 },
                { widthMode: 'percentage', width: 60 },
                { widthMode: 'auto' },
              ]}
              components={[
                { component: <ColorBlock label="Sidebar — fixed 200px" bg="#14b8a6" />, align: 'left', slot: 0 },
                { component: <ColorBlock label="Content — 60%" bg="#4353ff" />, align: 'left', slot: 1 },
                { component: <ColorBlock label="Info — auto" bg="#64748b" />, align: 'left', slot: 2 },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
