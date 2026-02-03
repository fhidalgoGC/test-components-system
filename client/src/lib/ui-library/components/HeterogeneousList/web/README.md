# HeterogeneousList - Web

Componente de lista heterogénea para React (Web) que soporta infinite scroll, múltiples tipos de items, divisores configurables y estados de carga/error/vacío.

## Características

- **Dos modos de operación**: `registry` (items con componentes registrados) y `elements` (elementos React directos)
- **Infinite Scroll**: Carga automática al llegar al final de la lista
- **Divisores configurables**: Líneas o componentes personalizados
- **Estados integrados**: Loading, empty, error y end-of-list
- **Preservación de scroll**: Mantiene posición al cargar más items
- **Accesibilidad**: Atributos ARIA para lectores de pantalla

## Instalación

```tsx
import { HeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList';
```

## Props

### Props Base (BaseListProps)

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `mode` | `'registry' \| 'elements'` | - | Modo de operación (requerido) |
| `infiniteScroll` | `boolean` | `true` | Habilita carga infinita |
| `pageSize` | `number` | `10` | Items por página |
| `preserveScrollPosition` | `boolean` | `false` | Preserva posición de scroll |
| `className` | `string` | - | Clase CSS del contenedor |
| `listClassName` | `string` | - | Clase CSS de la lista |
| `itemClassName` | `string` | - | Clase CSS de cada item |
| `itemWrapperProps` | `Record<string, any>` | `{}` | Props adicionales para el wrapper de items |
| `gap` | `number \| string` | - | Espacio entre items |
| `paddingStart` | `number \| string` | - | Padding superior |
| `paddingEnd` | `number \| string` | - | Padding inferior |
| `dividerVariant` | `'none' \| 'line' \| 'component'` | `'none'` | Tipo de divisor |
| `dividerEvery` | `number` | `1` | Mostrar divisor cada N items |
| `dividerInset` | `number \| string` | - | Margen lateral del divisor |
| `renderDivider` | `(index: number) => ReactNode` | - | Render personalizado de divisor |
| `empty` | `ReactNode` | - | Contenido cuando la lista está vacía |
| `emptySpacing` | `number \| string` | - | Padding del estado vacío |
| `endRender` | `ReactNode` | - | Contenido al final de la lista |
| `endSpacing` | `number \| string` | - | Padding del contenido final |
| `loading` | `ReactNode` | - | Indicador de carga personalizado |
| `errorRender` | `(error, retry) => ReactNode` | - | Render de error con retry |
| `onLoad` | `(page, received) => void` | - | Callback al cargar página |
| `onLoadingStart` | `(page) => void` | - | Callback al iniciar carga |
| `onEnd` | `() => void` | - | Callback al llegar al final |

### Props Modo Registry (RegistryModeProps)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `items` | `T[]` | Items iniciales (estáticos) |
| `registry` | `Record<string, ComponentType>` | Mapa de componentes por `kindComponent` |
| `itemKey` | `(item, index) => string \| number` | Función para obtener key única |
| `dataLoader` | `(params) => Promise<DataLoaderResponse>` | Función para cargar datos |
| `initialItems` | `T[]` | Items iniciales para SSR/precarga |

### Props Modo Elements (ElementsModeProps)

| Prop | Tipo | Descripción |
|------|------|-------------|
| `elements` | `ReactElement[]` | Elementos iniciales (estáticos) |
| `elementsLoader` | `(params) => Promise<ElementsLoaderResponse>` | Función para cargar elementos |
| `initialElements` | `ReactElement[]` | Elementos iniciales para SSR/precarga |

## Uso

### Modo Registry (Recomendado para datos dinámicos)

```tsx
// Definir tipos de items
interface ProductItem {
  id: string;
  kindComponent: 'product';
  name: string;
  price: number;
}

interface BannerItem {
  id: string;
  kindComponent: 'banner';
  imageUrl: string;
}

type ListItem = ProductItem | BannerItem;

// Definir componentes
const ProductCard = ({ item }: { item: ProductItem; index: number }) => (
  <div className="product-card">
    <h3>{item.name}</h3>
    <p>${item.price}</p>
  </div>
);

const BannerCard = ({ item }: { item: BannerItem; index: number }) => (
  <img src={item.imageUrl} alt="Banner" />
);

// Crear registry
const registry = {
  product: ProductCard,
  banner: BannerCard,
};

// Función de carga
const loadItems = async ({ page, limit }) => {
  const response = await fetch(`/api/items?page=${page}&limit=${limit}`);
  const data = await response.json();
  return {
    items: data.items,
    hasMore: data.hasMore,
  };
};

// Usar componente
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={loadItems}
  pageSize={20}
  gap={16}
  dividerVariant="line"
  empty={<p>No hay items</p>}
  loading={<Spinner />}
  errorRender={(error, retry) => (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={retry}>Reintentar</button>
    </div>
  )}
  endRender={<p>Has llegado al final</p>}
/>
```

### Modo Elements (Para listas simples)

```tsx
const loadElements = async ({ page, limit }) => {
  const data = await fetchData(page, limit);
  return {
    elements: data.map((item, i) => (
      <div key={item.id}>{item.name}</div>
    )),
    hasMore: data.length === limit,
  };
};

<HeterogeneousList
  mode="elements"
  elementsLoader={loadElements}
  gap={12}
  paddingStart={16}
  paddingEnd={16}
/>
```

### Lista Estática (Sin infinite scroll)

```tsx
<HeterogeneousList
  mode="registry"
  registry={registry}
  items={staticItems}
  infiniteScroll={false}
/>
```

### Con Divisores Personalizados

```tsx
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={loadItems}
  dividerVariant="component"
  dividerEvery={3}
  renderDivider={(index) => (
    <div className="ad-banner">
      <AdComponent position={index} />
    </div>
  )}
/>
```

## Estructura de Archivos

```
web/
├── index.tsx              # Export principal
├── views/
│   └── HeterogeneousList.view.tsx  # Vista del componente
├── hooks/
│   └── useHeterogeneousList.hook.ts  # Hook de estado (usa mobile)
├── types/
│   └── HeterogeneousList.type.ts  # Tipos (hereda de mobile)
└── README.md
```

## Notas

- La versión web comparte la lógica de hooks y tipos con la versión mobile
- Los estilos usan clases CSS modulares definidas en `mobile/css/`
- El componente usa `IntersectionObserver` para detectar el sentinel de scroll
