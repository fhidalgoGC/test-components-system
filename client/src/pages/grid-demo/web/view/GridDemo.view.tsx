import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { GridExamplesTab } from '../components/GridExamplesTab';
import { GridPropsTab } from '../props/GridProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <GridExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <GridPropsTab />,
  },
];

export function GridDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="Grid"
      componentDescription="Grid Engine declarativo y agnóstico. Solo organiza layout, calcula capacidad y detecta final de scroll."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
