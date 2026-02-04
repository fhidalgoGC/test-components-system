import { usePlatform } from './usePlatform';
import { NavSidebarCustomHeaderWebView } from './web/view/NavSidebarCustomHeader.view';
import { NavSidebarCustomHeaderMobileView } from './mobile/view/NavSidebarCustomHeader.view';

const NavSidebarCustomHeaderDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarCustomHeaderMobileView />;
  }

  return <NavSidebarCustomHeaderWebView />;
};

export default NavSidebarCustomHeaderDemo;
