import { LayoutRow } from "@/lib/ui-library/components/LayoutRow";
import styles from "../css/LayoutRowDemo.module.scss";

const heightOptions = ["xs", "sm", "md", "lg", "xl", 200] as const;

export function HeightDemo() {
  return (
    <section className={styles.section}>
      <h2 className={styles.section__title}>
        8. Diferentes tamaños de altura (HeightToken)
      </h2>
      <p className={styles.section__description}>
        Comparación de tokens de altura: xs=40px, sm=56px, md=72px, lg=96px,
        xl=120px.
      </p>
      <div className={styles.verticalStack} data-testid="demo-height">
        {heightOptions.map((h) => (
          <div key={h} className={styles.demoBox}>
            <div className={styles.alignLabel}>height: "{h}"</div>
            <LayoutRow
              slots={3}
              widthMode="full"
              heightMode="fixed"
              height={h}
              paddingX="xs"
              marginY="none"
              paddingY={10}
              componentVerticalAlign="top"
              componentGap='xs'
              className={styles.whiteCardBg}
              components={[
                {
                  component: <span className="text-sm font-medium">Left</span>,
                  align: "left",
                  slot: 0,
                },
                {
                  component: (
                    <span className="text-sm font-medium">
                      Center - Height: {h}
                    </span>
                  ),
                  align: "center",
                  slot: 1,
                },
                {
                  component: <span className="text-sm font-medium">Right</span>,
                  align: "right",
                  slot: 2,
                },
                {
                  component: <span className="text-sm font-medium">Right</span>,
                  align: "right",
                  slot: 2,
                },
              ]}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
