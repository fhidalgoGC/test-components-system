import { ComponentLayoutView } from '@/layouts/component-layout';
import type { TabConfig } from '@/layouts/component-layout/types/ComponentLayout.types';
import { GoogleMapExamplesTab } from '../components/GoogleMapExamplesTab';
import { GoogleMapPropsTab } from '../props/GoogleMapProps';

const tabs: TabConfig[] = [
  {
    id: 'examples',
    label: 'Examples',
    icon: 'fa-eye',
    content: <GoogleMapExamplesTab />,
  },
  {
    id: 'props',
    label: 'Props',
    icon: 'fa-list',
    content: <GoogleMapPropsTab />,
  },
];

export function GoogleMapDemoWebView() {
  return (
    <ComponentLayoutView
      componentName="GoogleMap"
      componentDescription="Componente de Google Maps con marcadores declarativos, labelI18n y metadata por coordenada."
      tabs={tabs}
      defaultTab="examples"
    />
  );
}
