# Grid Component - Web

Grid Engine declarativo y agnóstico a la data. Organiza layout en cuadrícula, calcula capacidad, detecta final de scroll y maneja su propio estado interno. Expone un hook (`useGridController`) para control externo.

## Características

- Layout Engine: calcula columnas automáticamente según el ancho disponible y `minCardWidth`
- State Machine visual: `idle`, `loading`, `empty`, `error`
- Scroll End Detector: dispara `onReachEnd` cuando el usuario llega al final
- Capacity Calculator: emite `onCapacityChange` con columnas, filas y items visibles
- Control externo vía `useGridController` hook
- Solo organiza layout — no obtiene datos, no pagina, no conoce cantidades totales

## Instalación

```tsx
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
```

## API del Componente

```tsx
type GridProps<T> = {
  id?: string;
  data?: T[];

  layout?: {
    widthMode?: 'full' | 'auto' | 'fixed';
    width?: number;
    minWidth?: number;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number;
    minHeight?: number;
  };

  grid?: {
    minColumns?: number;     // default: 1
    maxColumns?: number;     // default: 4
    minRows?: number;        // default: 1
    maxRows?: number;        // default: sin límite
    minCardWidth?: number;   // default: 280
    minCardHeight?: number;  // default: 220
    rowGap?: number;         // default: 16
    columnGap?: number;      // default: 16
  };

  item: {
    renderType: 'component';
    render: (item: T, index: number) => ReactNode;
  };

  scroll?: {
    enabled?: boolean;       // default: true
    threshold?: number;      // default: 50 (px de margen para detectar final)
  };

  statesComponents?: {
    idle?: StateComponent;
    loading?: StateComponent;
    empty?: StateComponent;
    error?: StateComponent;
  };

  callbacks?: {
    onCapacityChange?: (info: { columns: number; rows: number; visibleItems: number }) => void;
    onReachEnd?: () => void;
    onLayoutChange?: (info: { width: number; height: number }) => void;
    onStateChange?: (newState: GridState) => void;
  };

  controller?: GridController;
  className?: string;
};
```

## useGridController API

```tsx
const controller = useGridController();

controller.setState(newState)   // Cambia el estado interno del Grid
controller.getState()           // Devuelve el estado actual
controller.refreshLayout()      // Fuerza recalcular columnas y reemitir onCapacityChange
```

### GridState

El Grid detecta automáticamente el estado `empty`: si el estado del controller es `idle` y `data` está vacío (`[]`), el Grid renderiza el estado `empty` sin necesidad de que el padre lo establezca manualmente.

```tsx
type GridState = 'idle' | 'loading' | 'empty' | 'error';
```

## Uso Básico

### Grid Estático

```tsx
const products = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Mouse', price: 29 },
];

<Grid
  id="products-grid"
  data={products}
  grid={{ minColumns: 2, maxColumns: 4, minCardWidth: 250 }}
  item={{
    renderType: 'component',
    render: (product) => (
      <div className="p-4 border rounded">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    ),
  }}
/>
```

### Con Control Externo

```tsx
const controller = useGridController();

useEffect(() => {
  controller.setState('loading');
  
  fetchProducts()
    .then(data => {
      setProducts(data);
      controller.setState('idle');
    })
    .catch(() => {
      controller.setState('error');
    });
}, []);

<Grid
  id="controlled-grid"
  data={products}
  controller={controller}
  grid={{ minColumns: 1, maxColumns: 3, minCardWidth: 300 }}
  item={{
    renderType: 'component',
    render: (product) => <ProductCard product={product} />,
  }}
/>
```

### Infinite Scroll

```tsx
const controller = useGridController();

<Grid
  id="infinite-grid"
  data={products}
  controller={controller}
  layout={{ heightMode: 'fixed', height: 600 }}
  grid={{ minColumns: 2, maxColumns: 4, minCardWidth: 250 }}
  scroll={{ enabled: true, threshold: 50 }}
  callbacks={{
    onReachEnd: () => {
      controller.setState('loading');
      
      loadMoreProducts()
        .then(newProducts => {
          setProducts(prev => [...prev, ...newProducts]);
          controller.setState('idle');
        })
        .catch(() => controller.setState('error'));
    },
    onCapacityChange: (info) => {
      console.log(`Grid: ${info.columns} cols, ${info.rows} rows, ${info.visibleItems} visible`);
    },
  }}
  item={{
    renderType: 'component',
    render: (product) => <ProductCard product={product} />,
  }}
/>
```

## Flujo de Infinite Scroll

1. Usuario llega al final del scroll
2. Grid detecta scroll final (IntersectionObserver)
3. Grid dispara `onReachEnd()`
4. Padre llama `controller.setState('loading')`
5. Padre agrega más data
6. Padre llama `controller.setState('idle')`

**Regla Crítica**: `onReachEnd` solo se dispara si `state === 'idle'`. Si está en `'loading'`, no se dispara el evento.

## States Components

```tsx
statesComponents={{
  idle: { renderType: 'self' },
  loading: { renderType: 'self' },
  empty: {
    renderType: 'component',
    render: <MyEmptyState />,
    verticalAlign: 'middle',
    horizontalAlign: 'center',
  },
  error: {
    renderType: 'component',
    render: <MyErrorState />,
  },
}}
```

- `renderType: 'self'` → Usa render interno por defecto
- `renderType: 'component'` → Usa el `render` proporcionado
- `verticalAlign`: `'top'` | `'middle'` | `'bottom'` (default: `'middle'`)
- `horizontalAlign`: `'left'` | `'center'` | `'right'` (default: `'center'`)

## Callbacks

| Callback | Parámetros | Descripción |
|----------|------------|-------------|
| `onCapacityChange` | `{ columns, rows, visibleItems }` | Se emite al cambiar el layout (resize, data change) |
| `onReachEnd` | - | Se emite al llegar al final del scroll (solo si `state === 'idle'`) |
| `onLayoutChange` | `{ width, height }` | Se emite al cambiar las dimensiones del contenedor |
| `onStateChange` | `newState` | Se emite al cambiar el estado del grid |

## Cálculo de Columnas

El Grid calcula automáticamente el número de columnas basándose en:

```
columns = floor((containerWidth + columnGap) / (minCardWidth + columnGap))
columns = clamp(minColumns, columns, maxColumns)
```

Usa `ResizeObserver` para recalcular en cada cambio de tamaño del contenedor.

## Platform Detection

Solo disponible para Web. En mobile muestra componente `NotImplemented`:

```typescript
const isMobile = useIsMobile();
if (isMobile) {
  return <NotImplemented platform="Mobile" componentName="Grid" />;
}
```

## Folder Structure

```
Grid/
├── shared/
│   ├── Grid.types.ts          # Tipos compartidos (GridProps, GridState, etc.)
│   ├── useGridController.ts   # Hook de control externo
│   └── index.ts
├── web/
│   ├── css/
│   │   └── Grid.module.css    # Estilos del Grid
│   ├── hooks/
│   │   └── useGrid.hook.ts    # Lógica (layout calc, scroll detection, state)
│   ├── views/
│   │   └── Grid.view.tsx      # Componente React
│   ├── types/
│   │   └── Grid.type.ts       # Re-export de tipos compartidos
│   └── index.tsx
├── index.tsx                  # Dispatch Web/Mobile
└── README-WEB-IA.md
```
