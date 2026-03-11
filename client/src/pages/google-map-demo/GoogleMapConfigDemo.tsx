import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import { ConfigProvider, useConfig } from '@/lib/ui-library/providers';
import type { MapMarker, MapCenter } from '@/lib/ui-library/components/GoogleMap/web/types';
import { MapPin } from 'lucide-react';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

const parentEnvironment = {
  GOOGLE_MAP_CONFIG: {
    GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  },
};

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
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'Ciudad de México' },
    { id: '2', position: { lat: 19.4284, lng: -99.1276 }, title: 'Zócalo', draggable: true },
  ]);
  const [center] = useState<MapCenter>(DEFAULT_CENTER);

  const handleMapClick = (position: MapCenter) => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      position,
      title: `Marcador ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div>
      <ConfigInfo />

      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-red-500" />
          Mapa (sin prop apiKey)
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Este GoogleMap NO recibe <code className="bg-gray-100 px-1 rounded">apiKey</code> como prop.
          La toma automáticamente del <code className="bg-gray-100 px-1 rounded">ConfigProvider</code>.
        </p>
        <GoogleMap
          center={center}
          zoom={13}
          markers={markers}
          width="100%"
          height={400}
          showZoomControl={true}
          showMapTypeControl={true}
          onMapClick={handleMapClick}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <h2 className="font-semibold text-gray-800 mb-2">Código</h2>
        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// La app padre envuelve con ConfigProvider
<ConfigProvider
  parentConfig={{
    GOOGLE_MAP_CONFIG: {
      GOOGLE_MAPS_API_KEY: 'TU_API_KEY',
    },
  }}
  priority="auto"
>
  {/* El GoogleMap toma la key del provider */}
  <GoogleMap
    center={{ lat: 19.43, lng: -99.13 }}
    zoom={13}
    markers={markers}
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
