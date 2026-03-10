import { useIsMobile } from '../../hooks';
import { LayoutColumn as LayoutColumnWeb } from './web';
import { LayoutColumn as LayoutColumnMobile } from './mobile';
import type { LayoutColumnProps, LayoutColumnComponent, UseLayoutColumnOptions, UseLayoutColumnReturn, SlotConfig } from './shared/types';

export const LayoutColumn = (props: LayoutColumnProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <LayoutColumnMobile {...props} />;
  }

  return <LayoutColumnWeb {...props} />;
};

export type { LayoutColumnProps, LayoutColumnComponent, UseLayoutColumnOptions, UseLayoutColumnReturn, SlotConfig };
export { useLayoutColumn } from './shared/hooks';
