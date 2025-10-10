import { useIsMobile } from '../../hooks';
import { BottomNavigationBar as BottomNavigationBarMobile } from './mobile';
import { NotImplemented } from '../NotImplemented';
import type { BottomNavigationBarProps } from './mobile/types';

// Web version placeholder (uncomment when implemented)
// import { BottomNavigationBar as BottomNavigationBarWeb } from './web';

export const BottomNavigationBar = (props: BottomNavigationBarProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <BottomNavigationBarMobile {...props} />;
  }

  // Return web version when implemented
  // return <BottomNavigationBarWeb {...props} />;
  
  // Fallback: web version not implemented
  return <NotImplemented platform="Web" componentName="BottomNavigationBar" />;
};

export type { BottomNavigationBarProps };
