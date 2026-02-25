import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { FloatingMenuExamplesTab } from '../components/FloatingMenuExamplesTab';
import { FloatingMenuPropsTab } from '../props/FloatingMenuProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <FloatingMenuExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <FloatingMenuPropsTab />,
  },
];

export function FloatingMenuDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="FloatingMenu"
      componentDescription="Menú flotante agnóstico con posicionamiento configurable, secciones y selección interna."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
