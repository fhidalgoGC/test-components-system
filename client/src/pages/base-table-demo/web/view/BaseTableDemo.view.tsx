import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { BaseTableExamplesTab } from '../components/BaseTableExamplesTab';
import { BaseTablePropsTab } from '../props/BaseTableProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <BaseTableExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <BaseTablePropsTab />,
  },
];

export function BaseTableDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="BaseTable"
      componentDescription="Tabla declarativa y configurable. Soporta layout flexible, ordenamiento, estados, infinite scroll, sticky headers y celdas personalizadas."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
