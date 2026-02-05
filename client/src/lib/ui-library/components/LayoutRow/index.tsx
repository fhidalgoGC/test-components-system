import { useIsMobile } from '../../hooks';
import { LayoutRow as LayoutRowWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { LayoutRowProps, SlotConfig } from './web/types';

// Mobile version placeholder (uncomment when implemented)
// import { LayoutRow as LayoutRowMobile } from './mobile';

export const LayoutRow = (props: LayoutRowProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Return mobile version when implemented
    // return <LayoutRowMobile {...props} />;
    
    // Fallback: mobile version not implemented
    return <NotImplemented platform="Mobile" componentName="LayoutRow" />;
  }

  return <LayoutRowWeb {...props} />;
};

export type { LayoutRowProps, SlotConfig };
