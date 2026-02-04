import { usePlatform } from './usePlatform';
import { UniversalCardDemoWebView } from './web/view/UniversalCardDemo.view';
import { UniversalCardDemoMobileView } from './mobile/view/UniversalCardDemo.view';

const UniversalCardDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <UniversalCardDemoMobileView />;
  }

  return <UniversalCardDemoWebView />;
};

export default UniversalCardDemo;
