import { usePlatform } from './usePlatform';
import { BottomNavDemoWebView } from './web/view/BottomNavDemo.view';
import { BottomNavDemoMobileView } from './mobile/view/BottomNavDemo.view';

const BottomNavDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <BottomNavDemoMobileView />;
  }

  return <BottomNavDemoWebView />;
};

export default BottomNavDemo;
