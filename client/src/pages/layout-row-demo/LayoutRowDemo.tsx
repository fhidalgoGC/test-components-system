import {
  ToolbarBasicDemo,
  HeaderActionsDemo,
  FilterBarDemo,
  CardActionsDemo,
  BreadcrumbsDemo,
  VerticalAlignDemo,
  SpacingDemo,
} from "./components";
import styles from "./css/LayoutRowDemo.module.scss";

export function LayoutRowDemo() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header__title} data-testid="text-title">
          LayoutRow Component
        </h1>
        <p className={styles.header__description} data-testid="text-description">
          Componente de layout horizontal altamente configurable para organizar
          múltiples componentes en slots.
        </p>
      </header>

      <div className={styles.sections}>
        <ToolbarBasicDemo />
        <HeaderActionsDemo />
        <FilterBarDemo />
        <CardActionsDemo />
        <BreadcrumbsDemo />
        <VerticalAlignDemo />
        <SpacingDemo />
      </div>
    </div>
  );
}

export default LayoutRowDemo;
