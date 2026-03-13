# Grid Component - Mobile

Grid Engine declarativo adaptado a mobile. Misma lógica compartida que la versión web (state machine, scroll detector, capacity calculator, controller), pero optimizado para pantallas táctiles y viewports reducidos.

## Características

- Layout Engine compartido: calcula columnas según ancho disponible y `minCardWidth`
- State Machine visual: `idle`, `loading`, `empty`, `error`
- Scroll End Detector: dispara `onReachEnd` con `-webkit-overflow-scrolling: touch`
- Capacity Calculator: emite `onCapacityChange` con columnas, filas y items visibles
- Control externo vía `useGridController` hook (compartido con web)
- Selection vía tap (sin keyboard shortcuts)
- Ancho siempre 100% del contenedor

## Importación

```tsx
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
```

La resolución web/mobile es automática via `useIsMobile()` (< 768px). No se importa la variante mobile directamente.

## API del Componente

Misma API que la versión web. Ver [README-WEB-IA.md](./README-WEB-IA.md) para la referencia completa de props.

```tsx
type GridProps<T> = {
  id?: string;
  data?: T[];
  layout?: GridLayout;
  grid?: GridConfig;
  item: { renderType: 'component'; render: (item: T, index: number) => ReactNode };
  scroll?: { enabled?: boolean; threshold?: number };
  statesComponents?: GridStatesComponents;
  callbacks?: GridCallbacks;
  selectionConfig?: GridSelectionConfig<T>;
  showBorder?: boolean;
  controller?: GridController;
  className?: string;
};
```

## Uso Básico

```tsx
const products = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Mouse', price: 29 },
];

<Grid
  id="products-grid"
  data={products}
  grid={{ minColumns: 1, maxColumns: 2, minCardWidth: 160 }}
  item={{
    renderType: 'component',
    render: (product) => (
      <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8 }}>
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </div>
    ),
  }}
/>
```

## Infinite Scroll

```tsx
const controller = useGridController();

<Grid
  id="infinite-grid"
  data={products}
  controller={controller}
  layout={{ heightMode: 'full' }}
  grid={{ minColumns: 1, maxColumns: 2, minCardWidth: 160 }}
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
  }}
  statesComponents={{
    loading: { renderType: 'self', position: 'bottom' },
  }}
  item={{
    renderType: 'component',
    render: (product) => <ProductCard product={product} />,
  }}
/>
```

### Flujo de Infinite Scroll

1. Usuario hace scroll y llega al final (touch scrolling)
2. Grid detecta scroll final (IntersectionObserver + sentinel)
3. Grid dispara `onReachEnd()`
4. Padre llama `controller.setState('loading')`
5. Grid muestra spinner abajo de los items existentes (`position: 'bottom'`)
6. Padre agrega más data y llama `controller.setState('idle')`

**Regla Crítica**: `onReachEnd` solo se dispara si `state === 'idle'`. Si está en `'loading'`, no se vuelve a disparar.

## States Components

```tsx
statesComponents={{
  loading: {
    renderType: 'self',
    position: 'bottom',    // spinner abajo (scroll infinito)
  },
  empty: {
    renderType: 'component',
    render: <EmptyState />,
    verticalAlign: 'middle',
    horizontalAlign: 'center',
  },
  error: {
    renderType: 'component',
    render: <ErrorState />,
  },
}}
```

### Loading Position

| Valor | Comportamiento | Caso de uso |
|-------|---------------|-------------|
| `'bottom'` (default) | Spinner al final de los datos existentes | Scroll infinito (append) |
| `'over'` | Overlay semi-transparente sobre los datos | Paginador (reemplazo) |

Cuando `state === 'loading'` y ya hay datos:
- **`position: 'bottom'`**: los items existentes se mantienen visibles, el spinner aparece debajo
- **`position: 'over'`**: los items se ven con un overlay encima y el spinner centrado

Cuando `state === 'loading'` y no hay datos: se muestra el loading en pantalla completa (sin importar `position`).

## Selection (via tap)

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
    },
  }}
  item={{
    renderType: 'component',
    render: (product) => <ProductCard product={product} />,
  }}
/>
```

La selección en mobile funciona por tap. No hay keyboard shortcuts.

## Diferencias con Web

| Aspecto | Web | Mobile |
|---------|-----|--------|
| Ancho | Configurable via `layout.widthMode` | Siempre 100% |
| Scroll | `overflow-y: auto` | `-webkit-overflow-scrolling: touch` + `overscroll-behavior: contain` |
| Selección | Click + keyboard | Tap |
| Columnas típicas | 2-4 | 1-2 |
| Spinner size | 32px | 28px |
| `minCardWidth` recomendado | 250-300 | 140-180 |

## Callbacks

| Callback | Parámetros | Descripción |
|----------|------------|-------------|
| `onCapacityChange` | `{ columns, rows, visibleItems }` | Se emite al cambiar el layout |
| `onReachEnd` | - | Se emite al llegar al final del scroll (solo si `state === 'idle'`) |
| `onLayoutChange` | `{ width, height }` | Se emite al cambiar dimensiones |
| `onStateChange` | `newState` | Se emite al cambiar estado |

## Folder Structure

```
Grid/
├── mobile/
│   ├── views/
│   │   ├── Grid.mobile.view.tsx          # Vista mobile
│   │   └── index.ts
│   ├── layouts/
│   │   ├── Grid.mobile.selectable.layout.tsx  # Layout con selección (tap)
│   │   └── index.ts
│   ├── styles/
│   │   └── Grid.mobile.module.css        # Estilos mobile (touch optimized)
│   └── index.tsx
```

La lógica compartida (types, hooks, utils, controller) vive en `shared/`. Ver [README-WEB-IA.md](./README-WEB-IA.md) para la estructura completa.
