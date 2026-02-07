import {
  BasicLayoutDemo,
  MultipleSlotsDemo,
  FixedDimensionsDemo,
  HidePropertyDemo,
  MarginsDemo,
  SidebarDemo,
  HookDemo,
  ControllerDemo,
  PercentageDemo,
  NestedAutoDemo,
} from "./components";
import styles from "./css/LayoutColumnDemo.module.scss";

export function LayoutColumnDemo() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header__title} data-testid="text-title">
          LayoutColumn Component
        </h1>
        <p
          className={styles.header__description}
          data-testid="text-description"
        >
          Componente de layout vertical altamente configurable para organizar
          múltiples componentes en slots.
        </p>
      </header>

      <div className={styles.sections}>
        <BasicLayoutDemo />
        <MultipleSlotsDemo />
        <FixedDimensionsDemo />
        <HidePropertyDemo />
        <MarginsDemo />
        <SidebarDemo />
        <HookDemo />
        <ControllerDemo />
        <PercentageDemo />
        <NestedAutoDemo />
      </div>
    </div>
  );
}

export default LayoutColumnDemo;
