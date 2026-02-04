import { usePlatform } from './usePlatform';
import { NavSidebarCustomFooterWebView } from './web/view/NavSidebarCustomFooter.view';
import { NavSidebarCustomFooterMobileView } from './mobile/view/NavSidebarCustomFooter.view';

const NavSidebarCustomFooterDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarCustomFooterMobileView />;
  }

  return <NavSidebarCustomFooterWebView />;
};

export default NavSidebarCustomFooterDemo;
