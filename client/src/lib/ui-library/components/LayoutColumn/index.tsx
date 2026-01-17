import { useIsMobile } from '../../hooks';
import { LayoutColumn as LayoutColumnWeb } from './web';
import { NotImplemented } from '../NotImplemented';
import type { LayoutColumnProps, LayoutColumnComponent, UseLayoutColumnOptions, UseLayoutColumnReturn } from './web/types';

// Mobile version placeholder (uncomment when implemented)
// import { LayoutColumn as LayoutColumnMobile } from './mobile';

export const LayoutColumn = (props: LayoutColumnProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Return mobile version when implemented
    // return <LayoutColumnMobile {...props} />;
    
    // Fallback: mobile version not implemented
    return <NotImplemented platform="Mobile" componentName="LayoutColumn" />;
  }

  return <LayoutColumnWeb {...props} />;
};

export type { LayoutColumnProps, LayoutColumnComponent, UseLayoutColumnOptions, UseLayoutColumnReturn };
export { useLayoutColumn } from './web/hooks';
