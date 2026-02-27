import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { LoadingProvider } from '@/lib/ui-library/providers';
import { LoadingExamplesTab } from '../components/LoadingExamplesTab';
import { LoadingPropsTab } from '../props/LoadingProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: (
      <LoadingProvider>
        <LoadingExamplesTab />
      </LoadingProvider>
    ),
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <LoadingPropsTab />,
  },
];

export function LoadingDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="Loading"
      componentDescription="Componente de carga configurable. Puede cubrir un componente o la pantalla completa. Se controla por props directas o con el LoadingProvider."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
