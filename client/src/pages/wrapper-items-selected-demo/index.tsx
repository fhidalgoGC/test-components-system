import { usePlatform } from './usePlatform';
import { WrapperItemsSelectedDemoWebView } from './web/view/WrapperItemsSelectedDemo.view';
import { WrapperItemsSelectedDemoMobileView } from './mobile/view/WrapperItemsSelectedDemo.view';

const WrapperItemsSelectedDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <WrapperItemsSelectedDemoMobileView />;
  }

  return <WrapperItemsSelectedDemoWebView />;
};

export default WrapperItemsSelectedDemo;
