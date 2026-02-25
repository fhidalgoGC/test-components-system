import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { AppAuthExamplesTab } from '../components/AppAuthExamplesTab';
import { AppAuthPropsTab } from '../props/AppAuthProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <AppAuthExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <AppAuthPropsTab />,
  },
];

export function AppAuthDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="AppAuthProvider"
      componentDescription="Provider de autenticación con datos de sesión genéricos, sincronización multi-tab y wrappers de protección de rutas."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
