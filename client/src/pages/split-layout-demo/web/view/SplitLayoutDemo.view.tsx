import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { SplitLayoutExamplesTab } from '../components/SplitLayoutExamplesTab';
import { SplitLayoutPropsTab } from '../props/SplitLayoutProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <SplitLayoutExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <SplitLayoutPropsTab />,
  },
];

export function SplitLayoutDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="SplitLayout"
      componentDescription="Layout de dos paneles responsivo. El panel secundario se oculta en pantallas pequeñas."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
