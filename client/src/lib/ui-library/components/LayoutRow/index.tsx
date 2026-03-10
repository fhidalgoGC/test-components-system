import { useIsMobile } from '../../hooks';
import { LayoutRow as LayoutRowWeb } from './web';
import { LayoutRow as LayoutRowMobile } from './mobile';
import type { LayoutRowProps, SlotConfig } from './shared/types';

export const LayoutRow = (props: LayoutRowProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <LayoutRowMobile {...props} />;
  }

  return <LayoutRowWeb {...props} />;
};

export type { LayoutRowProps, SlotConfig };
