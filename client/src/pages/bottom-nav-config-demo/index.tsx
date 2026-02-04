import { usePlatform } from './usePlatform';
import { BottomNavConfigDemoWebView } from './web/view/BottomNavConfigDemo.view';
import { BottomNavConfigDemoMobileView } from './mobile/view/BottomNavConfigDemo.view';

const BottomNavConfigDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <BottomNavConfigDemoMobileView />;
  }

  return <BottomNavConfigDemoWebView />;
};

export default BottomNavConfigDemo;
