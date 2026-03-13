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

### Requisitos para que onReachEnd funcione

El `onReachEnd` usa un `IntersectionObserver` con un elemento sentinel invisible al final del contenido. Para que se dispare correctamente, se deben cumplir **todas** estas condiciones:

| Requisito | Por qué | Qué pasa si falta |
|-----------|---------|-------------------|
| `scroll.enabled: true` | Monta el `IntersectionObserver` y el sentinel | No se detecta el final del scroll, `onReachEnd` nunca se dispara |
| `layout.heightMode: 'fixed'` con un `height` definido, o `'full'` con un padre que tenga altura | El contenedor necesita una altura limitada para que el contenido haga scroll. Si la altura crece con el contenido, el sentinel siempre está visible y el observer no lo detecta como "entrando" | `onReachEnd` se dispara inmediatamente al montar o nunca se dispara |
| `controller` pasado al Grid | Sincroniza el estado interno. Sin controller, el estado puede no actualizarse correctamente | El estado puede quedarse en un valor incorrecto y bloquear futuros disparos |
| Estado `idle` activo | `onReachEnd` solo se dispara si `state === 'idle'` | Si el estado queda en `'loading'` o `'error'` después de una carga (por ejemplo, si no se llama `controller.setState('idle')` al terminar), no se vuelve a disparar |
| `data` con al menos un item | No se dispara si `data` está vacío | Evita disparos innecesarios cuando no hay contenido |

### Errores comunes

```tsx
// MAL — sin altura fija, el contenedor crece con el contenido
<Grid
  data={items}
  scroll={{ enabled: true }}
  callbacks={{ onReachEnd: handleLoadMore }}
  ...
/>

// BIEN — altura fija, el contenido hace scroll dentro
<Grid
  data={items}
  controller={controller}
  layout={{ heightMode: 'fixed', height: 400 }}
  scroll={{ enabled: true }}
  callbacks={{ onReachEnd: handleLoadMore }}
  ...
/>

// BIEN — altura 100% con padre que tiene altura definida
<div style={{ height: '100vh' }}>
  <Grid
    data={items}
    controller={controller}
    layout={{ heightMode: 'full' }}
    scroll={{ enabled: true }}
    callbacks={{ onReachEnd: handleLoadMore }}
    ...
  />
</div>
```

### Checklist rápido

Si `onReachEnd` no se dispara, verificar en este orden:

1. ¿`scroll.enabled` es `true`?
2. ¿El contenedor del Grid tiene altura fija (`heightMode: 'fixed'` + `height`) o `'full'` con padre de altura definida?
3. ¿Se pasa un `controller` al Grid?
4. ¿Después de cargar datos se llama `controller.setState('idle')`?
5. ¿`data` tiene al menos un item?

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
