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

  selectionConfig?: GridSelectionConfig<T>;
  showBorder?: boolean;       // default: false
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
- `position`: `'bottom'` | `'over'` (default: `'bottom'`)

### Loading Position

La propiedad `position` en el estado `loading` controla dónde se muestra el indicador:

- `'bottom'` (default): indicador al final de los datos, ideal para **scroll infinito** (append de datos).
- `'over'`: overlay semi-transparente centrado sobre los datos existentes, ideal para **paginador** (reemplazo de datos).

```tsx
statesComponents={{
  loading: { renderType: 'self', position: 'over' },
}}
```

## showBorder

Prop opcional para mostrar un borde alrededor del contenedor del Grid. Por defecto es `false`.

```tsx
<Grid
  showBorder={true}
  ...
/>
```

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

## Selection Integration

Prop opcional `selectionConfig` que integra `WrapperItemsSelected` para habilitar selección de items. Cuando está presente, el Grid usa un layout interno diferente (`Grid.selectable.layout.tsx`) que solo se carga en memoria si se necesita.

### GridSelectionConfig

```tsx
type GridSelectionConfig<T, R = T> = {
  getItemId: (item: T) => string;
  getItem?: (item: T) => R;
  multiSelect?: boolean;          // default: true
  selectedIds?: string[];         // modo controlado
  defaultSelectedIds?: string[];  // modo no controlado
  onSelectionChange?: (items: R[] | string[]) => void;
  onItemAction?: (event: { item: R; action: 'selected' | 'deselected' }) => void;
  selectionStyle?: GridSelectionStyle;
};

type GridSelectionStyle = {
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  boxShadow?: string;
  outline?: string;
  custom?: CSSProperties;
};
```

### Uso

```tsx
<Grid<Product>
  data={products}
  selectionConfig={{
    getItemId: (p) => String(p.id),
    getItem: (p) => p,
    multiSelect: true,
    onSelectionChange: (items) => console.log('Selected:', items),
    onItemAction: (event) => console.log(event.item, event.action),
    selectionStyle: {
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.2)',
    },
  }}
  item={{
    renderType: 'component',
    render: (product) => <ProductCard product={product} />,
  }}
/>
```

### Patrón agnóstico

- `getItemId`: extrae el ID único de cada item. El Grid no conoce la estructura de los datos.
- `getItem`: transforma `T` → `R` para los callbacks. Si pasás `getItem: (p) => ({ id: p.id, name: p.name })`, los callbacks reciben solo esos campos. Si no se proporciona `getItem`, los callbacks reciben `string[]` (IDs).
- `multiSelect: false`: selección simple (un solo item a la vez). Al seleccionar uno nuevo, el anterior se deselecciona automáticamente.
- `multiSelect: true`: selección múltiple (toggle individual por item).

## Platform Support

| Platform | Status | Description |
|----------|--------|-------------|
| Web | Implementado | Grid con posicionamiento, drag-based layout, selection |
| Mobile | Implementado | Grid adaptado a mobile, touch scrolling, selection via tap |

### Diferencias Web vs Mobile

| Feature | Web | Mobile |
|---------|-----|--------|
| Columns | Auto-calc con minCardWidth | Auto-calc con minCardWidth (menos columnas) |
| Scroll | overflow-y: auto | -webkit-overflow-scrolling: touch |
| Selection | Click + keyboard | Tap |
| States | idle, loading, empty, error | idle, loading, empty, error |
| Controller | useGridController() | useGridController() |
| Resolución | Automática via `useIsMobile()` (< 768px) | |

## Folder Structure

```
Grid/
├── shared/                              # Compartido entre web y mobile
│   ├── types/
│   │   ├── Grid.type.ts                 # Props, interfaces, tipos compartidos
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useGridController.ts         # Hook de control externo
│   │   ├── useGrid.hook.ts             # Lógica compartida (layout calc, scroll, state)
│   │   └── index.ts
│   ├── utils/
│   │   ├── grid.util.tsx               # renderStateContent helper
│   │   └── index.ts
│   └── index.ts
├── web/
│   ├── styles/
│   │   └── Grid.module.css              # Estilos web
│   ├── layouts/
│   │   ├── Grid.selectable.layout.tsx   # Layout con selección web
│   │   └── index.ts
│   ├── views/
│   │   ├── Grid.view.tsx                # Vista web
│   │   └── index.ts
│   └── index.tsx
├── mobile/
│   ├── styles/
│   │   └── Grid.mobile.module.css       # Estilos mobile (touch optimized)
│   ├── layouts/
│   │   ├── Grid.mobile.selectable.layout.tsx  # Layout con selección mobile
│   │   └── index.ts
│   ├── views/
│   │   ├── Grid.mobile.view.tsx         # Vista mobile
│   │   └── index.ts
│   └── index.tsx
├── index.tsx                            # Dispatch Web/Mobile + exports
└── README-WEB-IA.md
```
