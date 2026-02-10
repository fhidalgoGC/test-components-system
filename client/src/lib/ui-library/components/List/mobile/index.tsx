import type { ListProps } from '../shared/List.types';
import { ListView } from './views';
import { ListSelectableView } from './views';

export const List = <T,>(props: ListProps<T>) => {
  if (props.selectionConfig) {
    return <ListSelectableView {...props} />;
  }
  return <ListView {...props} />;
};

export type { ListProps, ListController, RenderState } from './types';
export { useListController } from '../shared';
