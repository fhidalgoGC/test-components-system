import { usePlatform } from './usePlatform';
import { NavSidebarScrollWebView } from './web/view/NavSidebarScroll.view';
import { NavSidebarScrollMobileView } from './mobile/view/NavSidebarScroll.view';

const NavSidebarScrollDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarScrollMobileView />;
  }

  return <NavSidebarScrollWebView />;
};

export default NavSidebarScrollDemo;
