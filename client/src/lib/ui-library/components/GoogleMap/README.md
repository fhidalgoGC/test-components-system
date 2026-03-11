# GoogleMap Component

Componente de Google Maps con marcadores modernos (`AdvancedMarkerElement`). Soporta la prop `data` para marcadores declarativos con `labelI18n` y `metadata`, controles de mapa configurables, callbacks de interacción y marcadores arrastrables.

## Dependencia

Requiere la librería `@vis.gl/react-google-maps` (librería oficial de Google) y una API Key de Google Cloud Platform con **Maps JavaScript API** habilitada.

## Importación

```tsx
import { GoogleMap } from "@/lib/ui-library/components/GoogleMap";
import type {
  GoogleMapProps, MapDataItem, MapMarkerMetadata,
  MapMarker, MapCenter, MapSizeValue
} from "@/lib/ui-library/components/GoogleMap";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `apiKey` | `string` | Desde environment | API Key de Google Maps (opcional, se resuelve automáticamente) |
| `center` | `MapCenter` | requerido | Centro del mapa `{ lat, lng }` |
| `zoom` | `number` | `12` | Nivel de zoom (1-20) |
| `data` | `MapDataItem[]` | - | Array declarativo con coordenadas, `labelI18n` y `metadata` |
| `markers` | `MapMarker[]` | `[]` | Array de marcadores manuales (ignorado si `data` está definido) |
| `width` | `number \| string` | `'100%'` | Ancho del mapa (px o string CSS) |
| `height` | `number \| string` | `'400px'` | Altura del mapa (px o string CSS) |
| `mapId` | `string` | `'DEFAULT_MAP_ID'` | ID del mapa de Google Cloud (requerido para AdvancedMarker) |
| `showZoomControl` | `boolean` | `true` | Mostrar control de zoom (+/-) |
| `showStreetViewControl` | `boolean` | `false` | Mostrar control de Street View |
| `showMapTypeControl` | `boolean` | `false` | Mostrar selector de tipo de mapa |
| `showFullscreenControl` | `boolean` | `false` | Mostrar botón de pantalla completa |
| `onMapClick` | `(position: MapCenter) => void` | - | Callback al hacer clic en el mapa |
| `onMarkerClick` | `(marker: MapMarker) => void` | - | Callback al hacer clic en un marcador |
| `onDataItemClick` | `(item: MapDataItem) => void` | - | Callback al hacer clic en un item de `data` |
| `onMarkerDragEnd` | `(marker: MapMarker, newPosition: MapCenter) => void` | - | Callback al soltar un marcador arrastrado |
| `className` | `string` | - | Clase CSS adicional |
| `langOverride` | `string` | - | Idioma forzado (`'en'`, `'es'`) |
| `i18nOrder` | `'global-first' \| 'local-first'` | - | Prioridad de traducciones |

## Interfaces

### MapDataItem

```tsx
interface MapDataItem<T extends MapMarkerMetadata = MapMarkerMetadata> {
  id: string;
  position: { lat: number; lng: number };
  labelI18n?: MultiLanguageLabel;  // Etiqueta multiidioma
  metadata?: T;                     // Color, icono, draggable, etc.
}
```

### MapMarkerMetadata

```tsx
interface MapMarkerMetadata {
  color?: string;
  icon?: string;
  draggable?: boolean;
  [key: string]: unknown;
}
```

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
  position: { lat: number; lng: number };
  title?: string;
  icon?: string;
  draggable?: boolean;
}
```

## Prioridad data vs markers

- Si `data` está definido (incluso como `[]`), se usa `data` y se ignora `markers`.
- Si `data` no está definido (`undefined`), se usa `markers`.

## Ejemplo con data (recomendado)

```tsx
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
    {
      id: '2',
      position: { lat: 19.42, lng: -99.12 },
      labelI18n: { en: 'Zócalo Square', es: 'Plaza del Zócalo', default: 'Zócalo' },
      metadata: { color: '#0066FF', draggable: true },
    },
  ]}
  onDataItemClick={(item) => console.log('Clicked:', item)}
/>
```

## Ejemplo con markers (legacy)

```tsx
<GoogleMap
  center={{ lat: 19.4326, lng: -99.1332 }}
  zoom={13}
  markers={[
    { id: '1', position: { lat: 19.4326, lng: -99.1332 }, title: 'CDMX' },
  ]}
  onMarkerClick={(m) => console.log('Marker:', m)}
/>
```

## Environment (cadena de resolución apiKey)

1. **Prop directa**: `<GoogleMap apiKey="TU_KEY" />`
2. **ConfigProvider**: via `parentConfig.GOOGLE_MAP_CONFIG.GOOGLE_MAPS_API_KEY`
3. **Variable de entorno**: `VITE_GOOGLE_MAPS_API_KEY` en `.env`

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

## Internacionalización (i18n)

El componente incluye traducciones para estados de carga y error. La prop `data` resuelve `labelI18n` automáticamente según el idioma activo.

| Clave | EN | ES |
|-------|----|----|
| `loading` | Loading map... | Cargando mapa... |
| `error` | Error loading map | Error al cargar el mapa |
| `errorApiKey` | Invalid API key | API key inválida |
| `clickToAddMarker` | Click on the map to add a marker | Haz clic en el mapa para agregar un marcador |

## Arquitectura Interna

```
GoogleMap/
├── index.tsx                    // Selector web/mobile (breakpoint 768px)
├── README.md
└── web/
    ├── views/GoogleMap.view.tsx // Vista con APIProvider + Map + AdvancedMarker
    ├── hooks/useGoogleMap.hook.ts // Lógica: data→markers, callbacks
    ├── hooks/useI18nMerge.hook.ts // Hook de internacionalización
    ├── types/GoogleMap.type.ts  // MapDataItem, MapMarkerMetadata, etc.
    ├── css/GoogleMap.module.css // Estilos del contenedor y estados
    ├── environment/             // Configuración (API key)
    └── i18n/                   // Traducciones (en.ts, es.ts)
```

## Plataforma

| Plataforma | Estado |
|------------|--------|
| Web | Disponible |
| Mobile | No implementado (muestra `NotImplemented`) |
