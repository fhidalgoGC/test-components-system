import {
  BasicTableDemo,
  StatesDemo,
  ClickableRowsDemo,
  CustomCellsDemo,
  SortableDemo,
  ApiSimulationDemo,
  TextWrapDemo,
  StretchDemo,
  MaxVisibleRowsDemo,
  InfiniteScrollDemo,
} from "../components";
import styles from "../css/BaseTableDemo.module.scss";

export const BaseTableDemoView = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sections}>
        <BasicTableDemo />
        <StatesDemo />
        <ClickableRowsDemo />
        <CustomCellsDemo />
        <SortableDemo />
        <ApiSimulationDemo />
        <TextWrapDemo />
        <StretchDemo />
        <MaxVisibleRowsDemo />
        <InfiniteScrollDemo />
      </div>
    </div>
  );
};
