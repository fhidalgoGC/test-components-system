import { useIsMobile } from '../../hooks';
import { List as ListMobile } from './mobile';
import { List as ListWeb } from './web';
import type { ListProps, ListController, RenderState } from './shared/List.types';

export const List = <T,>(props: ListProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ListMobile {...props} />;
  }

  return <ListWeb {...props} />;
};

export { useListController } from './shared';
export type { ListProps, ListController, RenderState };
