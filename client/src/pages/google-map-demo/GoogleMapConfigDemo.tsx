import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import { ConfigProvider, useConfig } from '@/lib/ui-library/providers';
import type { MapDataItem, MapCenter } from '@/lib/ui-library/components/GoogleMap/web/types';
import { MapPin } from 'lucide-react';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

const parentEnvironment = {
  GOOGLE_MAP_CONFIG: {
    GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  },
};

const DEMO_DATA: MapDataItem[] = [
  {
    id: '1',
    position: { lat: 19.4326, lng: -99.1332 },
    labelI18n: { en: 'Mexico City', es: 'Ciudad de México', default: 'Mexico City' },
    metadata: { color: '#FF0000', draggable: false },
  },
  {
    id: '2',
    position: { lat: 19.4284, lng: -99.1276 },
    labelI18n: { en: 'Zócalo Square', es: 'Plaza del Zócalo', default: 'Zócalo' },
    metadata: { color: '#0066FF', draggable: true },
  },
  {
    id: '3',
    position: { lat: 19.4352, lng: -99.1412 },
    labelI18n: { en: 'Angel of Independence', es: 'Ángel de la Independencia', default: 'Angel' },
    metadata: { color: '#00AA00' },
  },
];

function ConfigInfo() {
  const { config } = useConfig();
  const resolvedKey = (config as any)?.GOOGLE_MAP_CONFIG?.GOOGLE_MAPS_API_KEY || '';
  const masked = resolvedKey ? `${resolvedKey.slice(0, 10)}...${resolvedKey.slice(-4)}` : '(vacía)';

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6" data-testid="config-info">
      <h3 className="font-semibold text-blue-900 mb-2">ConfigProvider - Configuración Merged</h3>
      <ul className="text-sm space-y-1 text-blue-800">
        <li><strong>GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY:</strong> {masked}</li>
        <li className="text-xs text-blue-600 mt-2">
          El GoogleMap toma la API key del ConfigProvider sin necesidad de pasarla como prop
        </li>
      </ul>
    </div>
  );
}

function MapContent() {
  const [data] = useState<MapDataItem[]>(DEMO_DATA);
  const [center] = useState<MapCenter>(DEFAULT_CENTER);
  const [clickedItem, setClickedItem] = useState<MapDataItem | null>(null);

  return (
    <div>
      <ConfigInfo />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500" />
              Mapa con prop data (sin apiKey, sin markers)
            </h2>
            <GoogleMap
              center={center}
              zoom={14}
              data={data}
              width="100%"
              height={400}
              showZoomControl={true}
              showMapTypeControl={true}
              onDataItemClick={(item) => setClickedItem(item)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold text-gray-800 mb-3">Data Items ({data.length})</h2>
            <div className="space-y-2">
              {data.map((item) => (
                <div
                  key={item.id}
                  className={`p-2 rounded border text-sm ${
                    clickedItem?.id === item.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                  data-testid={`data-item-${item.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.metadata?.color || '#999' }}
                    />
                    <span className="font-medium">{item.labelI18n?.es || item.labelI18n?.default}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.position.lat.toFixed(4)}, {item.position.lng.toFixed(4)}
                  </p>
                  {item.metadata && (
                    <p className="text-xs text-gray-400 mt-1">
                      metadata: {JSON.stringify(item.metadata)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {clickedItem && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-1">onDataItemClick</h3>
              <pre className="text-xs text-green-800 overflow-auto">
                {JSON.stringify(clickedItem, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h2 className="font-semibold text-gray-800 mb-2">Código</h2>
        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`<ConfigProvider parentConfig={parentEnv} priority="auto">
  <GoogleMap
    center={{ lat: 19.43, lng: -99.13 }}
    zoom={14}
    data={[
      {
        id: '1',
        position: { lat: 19.43, lng: -99.13 },
        labelI18n: { en: 'Mexico City', es: 'CDMX', default: 'CDMX' },
        metadata: { color: '#FF0000', draggable: false },
      },
    ]}
    onDataItemClick={(item) => console.log(item)}
  />
</ConfigProvider>`}
        </pre>
      </div>
    </div>
  );
}

export function GoogleMapConfigDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-title">
          GoogleMap + ConfigProvider Demo
        </h1>
        <p className="text-gray-600 mb-6">
          Demuestra cómo el componente GoogleMap toma la API key del ConfigProvider (AppEnvironmentProvider)
          sin necesidad de pasarla como prop.
        </p>

        <ConfigProvider parentConfig={parentEnvironment} priority="auto">
          <MapContent />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default GoogleMapConfigDemo;
