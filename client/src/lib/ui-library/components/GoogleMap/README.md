# GoogleMap Component

Componente de Google Maps con marcadores controlados externamente. Soporta controles de mapa configurables, callbacks de interacción y marcadores arrastrables. Solo disponible en versión web.

## Dependencia

Requiere la librería `@react-google-maps/api` y una API Key de Google Cloud Platform con **Maps JavaScript API** habilitada.

## Importación

```tsx
import { GoogleMap } from "@/lib/ui-library/components/GoogleMap";
import type { GoogleMapProps, MapMarker, MapCenter, MapSizeValue } from "@/lib/ui-library/components/GoogleMap";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `apiKey` | `string` | `VITE_GOOGLE_MAPS_API_KEY` | API Key de Google Maps. Si no se pasa, toma del environment |
| `center` | `MapCenter` | requerido | Centro del mapa `{ lat, lng }` |
| `zoom` | `number` | `12` | Nivel de zoom (1-20) |
| `markers` | `MapMarker[]` | `[]` | Array de marcadores a mostrar |
| `width` | `number \| string` | `'100%'` | Ancho del mapa (px o string CSS) |
| `height` | `number \| string` | `'400px'` | Altura del mapa (px o string CSS) |
| `showZoomControl` | `boolean` | `true` | Mostrar control de zoom (+/-) |
| `showStreetViewControl` | `boolean` | `false` | Mostrar control de Street View |
| `showMapTypeControl` | `boolean` | `false` | Mostrar selector de tipo de mapa |
| `showFullscreenControl` | `boolean` | `false` | Mostrar botón de pantalla completa |
| `onMapClick` | `(position: MapCenter) => void` | - | Callback al hacer clic en el mapa |
| `onMarkerClick` | `(marker: MapMarker) => void` | - | Callback al hacer clic en un marcador |
| `onMarkerDragEnd` | `(marker: MapMarker, newPosition: MapCenter) => void` | - | Callback al soltar un marcador arrastrado |
| `onMapLoad` | `(map: google.maps.Map) => void` | - | Callback cuando el mapa termina de cargar |
| `className` | `string` | - | Clase CSS adicional |
| `langOverride` | `string` | - | Idioma forzado (`'en'`, `'es'`) |
| `i18nOrder` | `'global-first' \| 'local-first'` | - | Prioridad de traducciones |

## Interfaces

### MapCenter

```tsx
interface MapCenter {
  lat: number;
  lng: number;
}
```

### MapMarker

```tsx
interface MapMarker {
  id: string;
  position: {
    lat: number;
    lng: number;
  };
  title?: string;      // Tooltip del marcador
  icon?: string;       // URL de icono personalizado
  draggable?: boolean; // Permite arrastrar el marcador
}
```

### MapSizeValue

```tsx
type MapSizeValue = number | string;
// number → se convierte a "Npx" (ej: 400 → "400px")
// string → se usa tal cual (ej: "100%", "50vh")
```

## Ejemplo Básico

```tsx
const [markers, setMarkers] = useState<MapMarker[]>([
  { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'CDMX' },
]);

<GoogleMap
  apiKey="TU_API_KEY"
  center={{ lat: 19.4326, lng: -99.1332 }}
  zoom={13}
  markers={markers}
  width="100%"
  height={400}
  showZoomControl={true}
  onMapClick={(pos) => console.log('Click:', pos)}
  onMarkerClick={(m) => console.log('Marker:', m)}
/>
```

## Marcadores Interactivos

```tsx
const [markers, setMarkers] = useState<MapMarker[]>([]);

const handleMapClick = (position: MapCenter) => {
  const newMarker: MapMarker = {
    id: `marker-${Date.now()}`,
    position,
    title: `Marcador ${markers.length + 1}`,
    draggable: true,
  };
  setMarkers([...markers, newMarker]);
};

const handleMarkerDragEnd = (marker: MapMarker, newPosition: MapCenter) => {
  setMarkers(markers.map(m =>
    m.id === marker.id ? { ...m, position: newPosition } : m
  ));
};

<GoogleMap
  apiKey="TU_API_KEY"
  center={{ lat: 19.4326, lng: -99.1332 }}
  zoom={13}
  markers={markers}
  onMapClick={handleMapClick}
  onMarkerDragEnd={handleMarkerDragEnd}
/>
```

## Acceso a la Instancia del Mapa

El callback `onMapLoad` expone la instancia nativa de `google.maps.Map`, permitiendo operaciones avanzadas:

```tsx
const handleMapLoad = (map: google.maps.Map) => {
  // Acceso completo a la API de Google Maps
  map.panTo({ lat: 40.7128, lng: -74.0060 });
  map.setZoom(15);
};

<GoogleMap
  apiKey="TU_API_KEY"
  center={{ lat: 19.4326, lng: -99.1332 }}
  onMapLoad={handleMapLoad}
/>
```

## Controles del Mapa

Todos los controles nativos de Google Maps son configurables individualmente:

```tsx
<GoogleMap
  apiKey="TU_API_KEY"
  center={{ lat: 19.4326, lng: -99.1332 }}
  showZoomControl={true}          // Botones +/-
  showStreetViewControl={true}    // Pegman (Street View)
  showMapTypeControl={true}       // Selector mapa/satélite
  showFullscreenControl={true}    // Botón pantalla completa
/>
```

El mapa usa `gestureHandling: 'cooperative'` por defecto, lo que requiere Ctrl+Scroll para hacer zoom (evita scroll accidental).

## Tamaño del Mapa

El tamaño acepta valores numéricos (píxeles) o strings CSS:

```tsx
// Píxeles fijos
<GoogleMap width={600} height={400} ... />

// Strings CSS
<GoogleMap width="100%" height="50vh" ... />

// Mixto
<GoogleMap width="100%" height={300} ... />
```

## Internacionalización (i18n)

El componente incluye traducciones para estados de carga y error:

| Clave | EN | ES |
|-------|----|----|
| `loading` | Loading map... | Cargando mapa... |
| `error` | Error loading map | Error al cargar el mapa |
| `errorApiKey` | Invalid API key | API key inválida |
| `clickToAddMarker` | Click on the map to add a marker | Haz clic en el mapa para agregar un marcador |

```tsx
// Forzar idioma
<GoogleMap langOverride="es" ... />

// Prioridad de traducciones
<GoogleMap i18nOrder="local-first" ... />
```

## Environment

La API key se resuelve con la siguiente cadena de prioridad:

1. **Prop directa**: `<GoogleMap apiKey="TU_KEY" />`
2. **ConfigProvider** (AppEnvironmentProvider): via `parentConfig.GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY`
3. **Variable de entorno**: `VITE_GOOGLE_MAPS_API_KEY` en `.env`

```
environment/
├── enviroment.ts    // Lee VITE_GOOGLE_MAPS_API_KEY
└── index.ts         // Exporta como GOOGLE_MAP_CONFIG
```

En la app padre, se configura via `AppEnvironmentProvider`:

```tsx
<AppEnvironmentProvider
  parentConfig={{
    GOOGLE_MAP_CONFIG: {
      GOOGLE_MAPS_API_KEY: 'TU_API_KEY_DESDE_PARENT',
    },
  }}
>
  <GoogleMap center={{ lat: 19.43, lng: -99.13 }} />
</AppEnvironmentProvider>
```

Si no se pasa `apiKey` como prop ni se configura el provider, toma automáticamente de `VITE_GOOGLE_MAPS_API_KEY`.

## Arquitectura Interna

```
GoogleMap/
├── index.tsx                    // Selector web/mobile (breakpoint 768px)
└── web/
    ├── views/GoogleMap.view.tsx // Vista con LoadScript + GoogleMap + Markers
    ├── hooks/useGoogleMap.hook.ts // Lógica: opciones, callbacks, refs
    ├── hooks/useI18nMerge.hook.ts // Hook de internacionalización
    ├── types/GoogleMap.type.ts  // Tipos e interfaces
    ├── css/GoogleMap.module.css // Estilos del contenedor y estados
    ├── environment/             // Configuración (API key)
    └── i18n/                   // Traducciones (en.ts, es.ts)
```

## Plataforma

| Plataforma | Estado |
|------------|--------|
| Web | Disponible |
| Mobile | No implementado (muestra `NotImplemented`) |
