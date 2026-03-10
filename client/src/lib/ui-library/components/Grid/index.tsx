import { useIsMobile } from '../../hooks';
import { Grid as GridWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { GridProps } from './shared/types';

export const Grid = <T,>(props: GridProps<T>) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NotImplemented platform="Mobile" componentName="Grid" />;
  }

  return <GridWeb {...props} />;
};

export type { GridProps, GridController, GridState, GridSelectionConfig, GridSelectionStyle, GridSelectionItemActionEvent, GridCapacityInfo } from './shared/types';
export { useGridController } from './shared/hooks';
