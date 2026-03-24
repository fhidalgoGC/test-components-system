import { SelectableListDemo } from './SelectableListDemo';
import { BasicListDemo } from './BasicListDemo';
import { InfiniteScrollDemo } from './InfiniteScrollDemo';
import { RenderStatesDemo } from './RenderStatesDemo';
import { CustomLoadingDemo } from './CustomLoadingDemo';
import { DraggableListDemo } from './DraggableListDemo';

export function ListExamplesTab() {
  return (
    <>
      <SelectableListDemo />
      <BasicListDemo />
      <InfiniteScrollDemo />
      <RenderStatesDemo />
      <CustomLoadingDemo />
      <DraggableListDemo />
    </>
  );
}
