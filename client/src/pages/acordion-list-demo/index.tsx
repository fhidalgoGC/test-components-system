import { usePlatform } from './usePlatform';
import { AcordionListDemoWebView } from './web/view/AcordionListDemo.view';
import { AcordionListDemoMobileView } from './mobile/view/AcordionListDemo.view';

const AcordionListDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <AcordionListDemoMobileView />;
  }

  return <AcordionListDemoWebView />;
};

export default AcordionListDemo;
