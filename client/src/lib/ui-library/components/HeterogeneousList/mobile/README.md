# HeterogeneousList - Mobile

Componente de lista heterogénea para React Native / Expo que soporta infinite scroll, múltiples tipos de items, divisores configurables y estados de carga/error/vacío.

## Características

- **Dos modos de operación**: `registry` (items con componentes registrados) y `elements` (elementos React directos)
- **Infinite Scroll**: Carga automática mediante IntersectionObserver
- **Divisores configurables**: Líneas o componentes personalizados
- **Estados integrados**: Loading, empty, error y end-of-list
- **Preservación de scroll**: Mantiene posición al cargar más items
- **Validadores**: Utilidades para validar estructura de datos
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

## Hooks Disponibles

### useHeterogeneousList

Hook principal que maneja el estado y la lógica de la lista.

```tsx
import { useHeterogeneousList } from '@/lib/ui-library/components/HeterogeneousList/mobile/hooks';

const { state, sentinelRef, retry, loadMore } = useHeterogeneousList(props);
```

**Retorna:**
- `state`: Estado actual de la lista (`ListState`)
- `sentinelRef`: Ref para el elemento sentinel (infinite scroll)
- `retry`: Función para reintentar después de un error
- `loadMore`: Función para cargar más items manualmente

### useIntersectionObserver

Hook para detectar cuando un elemento entra en el viewport.

```tsx
import { useIntersectionObserver } from '@/lib/ui-library/components/HeterogeneousList/mobile/hooks';
```

### useScrollPreservation

Hook para preservar la posición del scroll al actualizar la lista.

```tsx
import { useScrollPreservation } from '@/lib/ui-library/components/HeterogeneousList/mobile/hooks';
```

### useI18nMerge

Hook para combinar traducciones locales con globales.

```tsx
import { useI18nMerge } from '@/lib/ui-library/components/HeterogeneousList/mobile/hooks';
```

## Tipos

### ListState

```tsx
interface ListState<T = any> {
  items: T[];              // Items en modo registry
  elements: ReactElement[]; // Elementos en modo elements
  page: number;            // Página actual
  isLoading: boolean;      // Estado de carga
  hasMore: boolean;        // Si hay más items
  error: unknown | null;   // Error si existe
}
```

### RegistryItem

```tsx
interface RegistryItem {
  id: string | number;     // ID único
  kindComponent: string;   // Tipo de componente del registry
  [key: string]: any;      // Datos adicionales
}
```

### LoaderParams

```tsx
interface LoaderParams {
  page: number;  // Página a cargar
  limit: number; // Items por página
}
```

### DataLoaderResponse

```tsx
interface DataLoaderResponse<T = any> {
  items: T[];      // Items cargados
  hasMore: boolean; // Si hay más páginas
}
```

## Uso

### Modo Registry

```tsx
// Definir item types
interface CardItem {
  id: string;
  kindComponent: 'card';
  title: string;
}

interface HeaderItem {
  id: string;
  kindComponent: 'header';
  text: string;
}

// Componentes del registry
const CardComponent = ({ item }: { item: CardItem }) => (
  <View style={styles.card}>
    <Text>{item.title}</Text>
  </View>
);

const HeaderComponent = ({ item }: { item: HeaderItem }) => (
  <View style={styles.header}>
    <Text style={styles.headerText}>{item.text}</Text>
  </View>
);

// Registry
const registry = {
  card: CardComponent,
  header: HeaderComponent,
};

// Data loader
const fetchItems = async ({ page, limit }: LoaderParams) => {
  const response = await api.getItems(page, limit);
  return {
    items: response.data,
    hasMore: response.hasNextPage,
  };
};

// Uso
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={fetchItems}
  pageSize={15}
  gap={12}
  loading={<ActivityIndicator />}
  empty={<Text>No hay contenido</Text>}
  errorRender={(error, retry) => (
    <View>
      <Text>Error al cargar</Text>
      <Button onPress={retry} title="Reintentar" />
    </View>
  )}
/>
```

### Modo Elements

```tsx
const loadElements = async ({ page, limit }) => {
  const items = await fetchItems(page, limit);
  return {
    elements: items.map((item) => (
      <CustomCard key={item.id} data={item} />
    )),
    hasMore: items.length === limit,
  };
};

<HeterogeneousList
  mode="elements"
  elementsLoader={loadElements}
  gap={8}
/>
```

### Con Divisores

```tsx
// Divisor tipo línea
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={fetchItems}
  dividerVariant="line"
  dividerInset={16}
/>

// Divisor personalizado
<HeterogeneousList
  mode="registry"
  registry={registry}
  dataLoader={fetchItems}
  dividerVariant="component"
  dividerEvery={5}
  renderDivider={(index) => (
    <AdBanner position={index} />
  )}
/>
```

## Validadores

El módulo incluye utilidades para validar datos:

```tsx
import { validators } from '@/lib/ui-library/components/HeterogeneousList/mobile/utils';

// Validar que un item tenga la estructura correcta
const isValid = validators.isValidRegistryItem(item);
```

## Estructura de Archivos

```
mobile/
├── index.tsx                    # Export principal
├── views/
│   ├── index.ts
│   └── HeterogeneousList.view.tsx
├── hooks/
│   ├── index.ts
│   ├── useHeterogeneousList.hook.ts
│   ├── useIntersectionObserver.hook.ts
│   ├── useScrollPreservation.hook.ts
│   └── useI18nMerge.hook.ts
├── types/
│   ├── index.ts
│   └── HeterogeneousList.type.ts
├── utils/
│   ├── index.ts
│   └── validators.util.ts
├── css/
│   └── HeterogeneousList.module.ts
└── README.md
```

## Arquitectura

El componente sigue el patrón Provider + Context + Hook:

1. **View**: Renderiza la UI basándose en el estado
2. **Hook (useHeterogeneousList)**: Maneja estado, paginación y efectos
3. **Types**: Define interfaces para props, estado y respuestas
4. **Utils**: Validadores y utilidades auxiliares
5. **CSS**: Clases modulares para estilos

## Notas de Implementación

- Usa `IntersectionObserver` para detectar el scroll (web polyfill compatible)
- El state se maneja internamente, no requiere estado externo
- Los callbacks son opcionales y permiten tracking/analytics
- Compatible con Server-Side Rendering mediante `initialItems`/`initialElements`
