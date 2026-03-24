import { SelectableListDemo } from './SelectableListDemo';
import { BasicListDemo } from './BasicListDemo';
import { InfiniteScrollDemo } from './InfiniteScrollDemo';
import { RenderStatesDemo } from './RenderStatesDemo';
import { CustomLoadingDemo } from './CustomLoadingDemo';

export function ListExamplesTab() {
  return (
    <>
      <SelectableListDemo />
      <BasicListDemo />
      <InfiniteScrollDemo />
      <RenderStatesDemo />
      <CustomLoadingDemo />
    </>
  );
}
