import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { ListExamplesTab } from '../components/ListExamplesTab';
import { ListPropsTab } from '../props/ListProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <ListExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <ListPropsTab />,
  },
];

export function ListDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="List"
      componentDescription="Componente agnóstico con control externo del ciclo de render mediante useListController. El List no interpreta ni obtiene data - solo renderiza lo que recibe."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
