import { usePlatform } from './usePlatform';
import { NavSidebarFullCustomWebView } from './web/view/NavSidebarFullCustom.view';
import { NavSidebarFullCustomMobileView } from './mobile/view/NavSidebarFullCustom.view';

const NavSidebarFullCustomDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarFullCustomMobileView />;
  }

  return <NavSidebarFullCustomWebView />;
};

export default NavSidebarFullCustomDemo;
