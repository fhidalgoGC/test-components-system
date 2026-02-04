import { usePlatform } from './usePlatform';
import { AccordionDemoWebView } from './web/view/AccordionDemo.view';
import { AccordionDemoMobileView } from './mobile/view/AccordionDemo.view';

const AccordionDemo = () => {
  const platform = usePlatform();

  if (platform === 'mobile') {
    return <AccordionDemoMobileView />;
  }

  return <AccordionDemoWebView />;
};

export default AccordionDemo;
