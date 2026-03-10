import type { GridProps } from '../shared/types';
import { GridMobileView } from './views';
import { GridMobileSelectableLayout } from './layouts';

export const Grid = <T,>(props: GridProps<T>) => {
  if (props.selectionConfig) {
    return <GridMobileSelectableLayout {...props} />;
  }
  return <GridMobileView {...props} />;
};
