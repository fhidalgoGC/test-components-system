import type { GridProps } from '../shared';
import { GridView } from './views';
import { GridSelectableLayout } from './layouts';

export const Grid = <T,>(props: GridProps<T>) => {
  if (props.selectionConfig) {
    return <GridSelectableLayout {...props} />;
  }
  return <GridView {...props} />;
};

export { GridView } from './views';
export type { GridProps, GridController, GridState, GridSelectionConfig, GridSelectionStyle, GridSelectionItemActionEvent } from './types';
