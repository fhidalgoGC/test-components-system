import { usePlatform } from './usePlatform';
import { FloatingMenuDemoWebView } from './web/view/FloatingMenuDemo.view';
import { FloatingMenuDemoMobileView } from './mobile/view/FloatingMenuDemo.view';

const FloatingMenuDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <FloatingMenuDemoMobileView />;
  }

  return <FloatingMenuDemoWebView />;
};

export default FloatingMenuDemo;
