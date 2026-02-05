import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import styles from "../css/LayoutRowDemo.module.scss";

const ColorBlock = ({
  label,
  bg,
  style,
}: {
  label: string;
  bg: string;
  style?: React.CSSProperties;
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
      ...style,
    }}
    data-testid={`sizing-block-${label.toLowerCase().replace(/\s/g, "-")}`}
  >
    {label}
  </div>
);

export function ComponentSizingDemo() {
  return (
    <section className={styles.section}>
      <div className={styles.componentName}>ComponentSizingDemo.tsx</div>
      <h2 className={styles.section__title}>
        9. Component Sizing (widthMode / heightMode)
      </h2>
      <p className={styles.section__description}>
        Control individual del tamaño de cada componente dentro de su slot.
      </p>

      <div className={styles.verticalStack} data-testid="demo-component-sizing">
        <div className={styles.alignLabel}>
          widthMode: "full" — El componente llena todo el ancho del slot
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={3}
            widthMode="full"
            heightMode="fixed"
            height={60}
            slotGap="md"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: <ColorBlock label="widthMode: full" bg="#3b82f6" />,
                align: "left",
                slot: 0,
                widthMode: "full",
              },
              {
                component: <ColorBlock label="widthMode: full" bg="#8b5cf6" />,
                align: "left",
                slot: 1,
                widthMode: "full",
              },
              {
                component: <ColorBlock label="widthMode: full" bg="#06b6d4" />,
                align: "left",
                slot: 2,
                widthMode: "full",
              },
            ]}
          />
        </div>

        <div className={styles.alignLabel}>
          widthMode: "auto" (default) — Tamaño natural del componente
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={3}
            widthMode="full"
            heightMode="fixed"
            height={60}
            slotGap="md"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: <ColorBlock label="auto" bg="#3b82f6" />,
                align: "left",
                slot: 0,
              },
              {
                component: <ColorBlock label="auto" bg="#8b5cf6" />,
                align: "center",
                slot: 1,
              },
              {
                component: <ColorBlock label="auto" bg="#06b6d4" />,
                align: "right",
                slot: 2,
              },
            ]}
          />
        </div>

        <div className={styles.alignLabel}>
          widthMode: "fixed" + width — Ancho fijo en píxeles
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={3}
            widthMode="full"
            heightMode="fixed"
            height={60}
            slotGap="md"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: <ColorBlock label="fixed: 100px" bg="#3b82f6" />,
                align: "left",
                slot: 0,
                widthMode: "fixed",
                width: 100,
              },
              {
                component: <ColorBlock label="fixed: 200px" bg="#8b5cf6" />,
                align: "center",
                slot: 1,
                widthMode: "fixed",
                width: 200,
              },
              {
                component: <ColorBlock label="fixed: 150px" bg="#06b6d4" />,
                align: "right",
                slot: 2,
                widthMode: "fixed",
                width: 150,
              },
            ]}
          />
        </div>

        <div className={styles.alignLabel}>
          heightMode: "full" — El componente llena toda la altura del slot
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={3}
            widthMode="full"
            heightMode="fixed"
            height={100}
            slotGap="md"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: <ColorBlock label="heightMode: full" bg="#22c55e" />,
                align: "left",
                slot: 0,
                widthMode: "full",
                heightMode: "full",
              },
              {
                component: (
                  <ColorBlock
                    label="heightMode: fixed 50px"
                    bg="#f97316"
                  />
                ),
                align: "center",
                slot: 1,
                heightMode: "fixed",
                height: 50,
              },
              {
                component: <ColorBlock label="heightMode: auto" bg="#ef4444" />,
                align: "right",
                slot: 2,
              },
            ]}
          />
        </div>

        <div className={styles.alignLabel}>
          minWidth — Ancho mínimo garantizado
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={2}
            widthMode="full"
            heightMode="fixed"
            height={60}
            slotGap="md"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: (
                  <ColorBlock label="full + minWidth: 300" bg="#ec4899" />
                ),
                align: "left",
                slot: 0,
                widthMode: "full",
                minWidth: 300,
              },
              {
                component: <ColorBlock label="full" bg="#a855f7" />,
                align: "left",
                slot: 1,
                widthMode: "full",
              },
            ]}
          />
        </div>

        <div className={styles.alignLabel}>
          Combinado — widthMode + heightMode en un mismo LayoutRow
        </div>
        <div className={styles.demoBox}>
          <LayoutRow
            slots={4}
            widthMode="full"
            heightMode="fixed"
            height={80}
            slotGap="sm"
            paddingX="md"
            paddingY="sm"
            componentVerticalAlign="stretch"
            className={styles.whiteCardBg}
            components={[
              {
                component: (
                  <ColorBlock label="W:full H:full" bg="#3b82f6" />
                ),
                align: "left",
                slot: 0,
                widthMode: "full",
                heightMode: "full",
              },
              {
                component: (
                  <ColorBlock label="W:fixed(120) H:full" bg="#22c55e" />
                ),
                align: "center",
                slot: 1,
                widthMode: "fixed",
                width: 120,
                heightMode: "full",
              },
              {
                component: (
                  <ColorBlock label="W:full H:fixed(40)" bg="#f97316" />
                ),
                align: "left",
                slot: 2,
                widthMode: "full",
                heightMode: "fixed",
                height: 40,
              },
              {
                component: (
                  <ColorBlock label="W:auto H:auto" bg="#ef4444" />
                ),
                align: "center",
                slot: 3,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
