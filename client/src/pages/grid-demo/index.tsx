import { useResponsive } from '@/lib/ui-library/hooks/useResponsive';
import { GridDemoWebView } from './web/view/GridDemo.view';
import { GridDemoMobileView } from './mobile/view/GridDemo.view';

const GridDemo = () => {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return <GridDemoMobileView />;
  }

  return <GridDemoWebView />;
};

export default GridDemo;
