import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { MultiControlDataExamplesTab } from '../components/MultiControlDataExamplesTab';
import { MultiControlDataPropsTab } from '../props/MultiControlDataProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <MultiControlDataExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <MultiControlDataPropsTab />,
  },
];

export function MultiControlDataDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="MultiControlDataProvider"
      componentDescription="Orquesta multiples sources de datos independientes con filtros y paginacion compartida."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
