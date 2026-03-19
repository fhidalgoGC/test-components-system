import { BasicTableDemo } from './BasicTableDemo';
import { StatesDemo } from './StatesDemo';
import { ClickableRowsDemo } from './ClickableRowsDemo';
import { CustomCellsDemo } from './CustomCellsDemo';
import { SortableDemo } from './SortableDemo';
import { ApiSimulationDemo } from './ApiSimulationDemo';
import { TextWrapDemo } from './TextWrapDemo';
import { StretchDemo } from './StretchDemo';
import { MaxVisibleRowsDemo } from './MaxVisibleRowsDemo';
import { InfiniteScrollDemo } from './InfiniteScrollDemo';

export function BaseTableExamplesTab() {
  return (
    <>
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
    </>
  );
}
