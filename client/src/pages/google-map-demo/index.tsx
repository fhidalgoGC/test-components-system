import { useIsMobile } from '../../lib/ui-library/hooks';
import { GoogleMapDemoWebView } from './web/view/GoogleMapDemo.view';
import { GoogleMapDemoMobileView } from './mobile/view/GoogleMapDemo.mobile.view';

const GoogleMapDemo = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <GoogleMapDemoMobileView />;
  }

  return <GoogleMapDemoWebView />;
};

export default GoogleMapDemo;
