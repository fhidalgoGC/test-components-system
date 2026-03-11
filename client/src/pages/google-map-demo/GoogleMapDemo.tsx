import { useState } from 'react';
import { GoogleMap } from '@/lib/ui-library/components/GoogleMap';
import type { MapMarker, MapCenter } from '@/lib/ui-library/components/GoogleMap/web/types';
import { GOOGLE_MAP_CONFIG } from '@/lib/ui-library/components/GoogleMap/web/environment';
import { Trash2, MapPin, Plus } from 'lucide-react';

const DEFAULT_CENTER: MapCenter = { lat: 19.4326, lng: -99.1332 };

export function GoogleMapDemo() {
  const [apiKey, setApiKey] = useState(GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY);
  const [markers, setMarkers] = useState<MapMarker[]>([
    { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'Ciudad de México' },
    { id: '2', position: { lat: 19.4284, lng: -99.1276 }, title: 'Zócalo' },
  ]);
  const [center, setCenter] = useState<MapCenter>(DEFAULT_CENTER);
  const [zoom, setZoom] = useState(13);
  const [showZoomControl, setShowZoomControl] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const handleMapClick = (position: MapCenter) => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      position,
      title: `Marcador ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  const handleMarkerClick = (marker: MapMarker) => {
    setSelectedMarker(marker);
  };

  const handleMarkerDragEnd = (marker: MapMarker, newPosition: MapCenter) => {
    setMarkers(markers.map(m => 
      m.id === marker.id ? { ...m, position: newPosition } : m
    ));
  };

  const removeMarker = (markerId: string) => {
    setMarkers(markers.filter(m => m.id !== markerId));
    if (selectedMarker?.id === markerId) {
      setSelectedMarker(null);
    }
  };

  const clearAllMarkers = () => {
    setMarkers([]);
    setSelectedMarker(null);
  };

  const addRandomMarker = () => {
    const newMarker: MapMarker = {
      id: `marker-${Date.now()}`,
      position: {
        lat: center.lat + (Math.random() - 0.5) * 0.05,
        lng: center.lng + (Math.random() - 0.5) * 0.05,
      },
      title: `Marcador aleatorio ${markers.length + 1}`,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">GoogleMap Component Demo</h1>
        <p className="text-gray-600 mb-6">
          Componente de mapa con marcadores controlados externamente. Haz clic en el mapa para agregar marcadores.
        </p>

        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Google Maps API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Ingresa tu API Key de Google Maps"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Necesitas una API Key de Google Cloud Platform con Maps JavaScript API habilitada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-4">Mapa</h2>
              
              {apiKey ? (
                <GoogleMap
                  apiKey={apiKey}
                  center={center}
                  zoom={zoom}
                  markers={markers}
                  width="100%"
                  height={400}
                  showZoomControl={showZoomControl}
                  showStreetViewControl={false}
                  showMapTypeControl={true}
                  onMapClick={handleMapClick}
                  onMarkerClick={handleMarkerClick}
                  onMarkerDragEnd={handleMarkerDragEnd}
                />
              ) : (
                <div className="flex items-center justify-center h-[400px] bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Ingresa una API Key para ver el mapa</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4 mt-4">
              <h2 className="font-semibold text-gray-800 mb-4">Controles del Mapa</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Zoom</label>
                  <input
                    type="number"
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    min={1}
                    max={20}
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lat</label>
                  <input
                    type="number"
                    value={center.lat}
                    onChange={(e) => setCenter({ ...center, lat: Number(e.target.value) })}
                    step={0.001}
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Lng</label>
                  <input
                    type="number"
                    value={center.lng}
                    onChange={(e) => setCenter({ ...center, lng: Number(e.target.value) })}
                    step={0.001}
                    className="w-full px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showZoomControl}
                      onChange={(e) => setShowZoomControl(e.target.checked)}
                      className="rounded"
                    />
                    Zoom Control
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-800">Marcadores ({markers.length})</h2>
                <div className="flex gap-2">
                  <button
                    onClick={addRandomMarker}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    title="Agregar marcador aleatorio"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={clearAllMarkers}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                    title="Eliminar todos"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {markers.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No hay marcadores. Haz clic en el mapa para agregar uno.
                  </p>
                ) : (
                  markers.map((marker) => (
                    <div
                      key={marker.id}
                      className={`flex items-center justify-between p-2 rounded border ${
                        selectedMarker?.id === marker.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{marker.title}</p>
                          <p className="text-xs text-gray-500">
                            {marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeMarker(marker.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="font-semibold text-gray-800 mb-2">Código de Uso</h2>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`<GoogleMap
  apiKey="TU_API_KEY"
  center={{ lat: 19.43, lng: -99.13 }}
  zoom={13}
  markers={markers}
  width="100%"
  height={400}
  showZoomControl={true}
  onMapClick={(pos) => addMarker(pos)}
  onMarkerClick={(m) => select(m)}
  onMarkerDragEnd={(m, pos) => 
    updateMarker(m.id, pos)
  }
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleMapDemo;
