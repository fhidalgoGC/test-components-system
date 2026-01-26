import {
  BasicTableDemo,
  StatesDemo,
  ClickableRowsDemo,
  CustomCellsDemo,
  SortableDemo,
} from "./components";
import styles from "./css/BaseTableDemo.module.scss";

export function BaseTableDemo() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.header__title} data-testid="text-title">
          BaseTable Component
        </h1>
        <p className={styles.header__description} data-testid="text-description">
          Componente de tabla declarativo y agnostico. Solo interpreta configuracion,
          no toma decisiones de negocio ni transforma datos.
        </p>
      </header>

      <div className={styles.sections}>
        <BasicTableDemo />
        <StatesDemo />
        <ClickableRowsDemo />
        <CustomCellsDemo />
        <SortableDemo />
      </div>
    </div>
  );
}

export default BaseTableDemo;
