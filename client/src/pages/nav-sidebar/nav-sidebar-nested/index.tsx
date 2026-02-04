import { usePlatform } from './usePlatform';
import { NavSidebarNestedWebView } from './web/view/NavSidebarNested.view';
import { NavSidebarNestedMobileView } from './mobile/view/NavSidebarNested.view';

const NavSidebarNestedDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <NavSidebarNestedMobileView />;
  }

  return <NavSidebarNestedWebView />;
};

export default NavSidebarNestedDemo;
