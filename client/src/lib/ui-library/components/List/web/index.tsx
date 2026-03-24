import type { ListProps } from '../shared/List.types';
import { ListNormalLayout } from './layouts';
import { ListSelectableLayout } from './layouts';
import { ListDraggableLayout } from './layouts';

export const List = <T,>(props: ListProps<T>) => {
  if (props.draggableConfig && props.draggableConfig.enabled !== false) {
    return <ListDraggableLayout {...props} />;
  }
  if (props.selectionConfig) {
    return <ListSelectableLayout {...props} />;
  }
  return <ListNormalLayout {...props} />;
};

export type { ListProps, ListController, RenderState } from './types';
export { useListController } from '../shared';
