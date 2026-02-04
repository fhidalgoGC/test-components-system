import { usePlatform } from './usePlatform';
import { NavSidebarBasicWebView } from './web/view/NavSidebarBasic.view';
import { NavSidebarBasicMobileView } from './mobile/view/NavSidebarBasic.view';

const NavSidebarBasicPage = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarBasicMobileView />;
  }

  return <NavSidebarBasicWebView />;
};

export default NavSidebarBasicPage;
