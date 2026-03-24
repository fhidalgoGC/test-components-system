# List Component - Web

Componente List agnóstico y reutilizable con control externo del ciclo de render. El componente no interpreta, transforma ni obtiene data - su única responsabilidad es renderizar una colección de ítems.

## Características

- Control externo mediante `useListController` hook
- Estados de render explícitos: `renderIdle`, `renderLoading`, `renderComplete`, `renderError`
- Soporte para scroll normal, infinite scroll y sin scroll
- Paginación configurable
- Loading indicator customizable (top, bottom, over)
- Selección de items integrada vía `WrapperItemsSelected` (single/multi-select)
- Transformación de callbacks con `getItem` (T → R)
- Estilos de selección configurables (borde, fondo, sombra, etc.)
- Drag and drop reordering via `@dnd-kit` (item completo o handle custom, posición left/right)
- Tres layouts internos: normal, selectable y draggable (solo se carga en memoria si se necesita)
- `layout.gap` controla el spacing entre items (responsabilidad del List, no del item)

## Comportamiento Web

- Usa React DOM con CSS Modules
- `IntersectionObserver` para infinite scroll
- Scroll nativo del navegador
- CSS classes: `.container`, `.list`, `.item`, `.loadingContainer`, `.spinner`, `.errorState`, `.emptyState`, `.sentinel`

## Instalación

```tsx
import { List, useListController } from '@/lib/ui-library/components/List';
```

## API del Componente

```tsx
type ListProps<T> = {
  id: string;

  layout?: {
    widthMode?: 'full' | 'auto' | 'fixed';
    width?: number;
    minWidth?: number;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
    gap?: number | string;
  };

  callbacks?: {
    onScroll?: (id: string) => void;
    onScrollInfinity?: (page: number) => void;
  };

  behaviors?: {
    scroll?: 'normal' | 'infinityScroll' | 'none';
    paginator?: {
      maxItem: number;
    };
  };

  loading?: {
    renderType?: 'component' | 'self';
    render?: ReactNode | Component;
    position?: 'top' | 'bottom' | 'over';
  };

  item: {
    renderType: 'component';
    render: (item: T, index: number) => ReactNode;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
  };

  data: T[];
  controller?: ListController<T>;

  draggableConfig?: {
    enabled?: boolean;
    getItemId: (item: T, index: number) => string;
    isItemDraggable?: (item: T, index: number) => boolean;
    onReorder?: (newData: T[], event: DraggableReorderEvent<T>) => void;
    handle?: {
      render: ComponentType<{ isDragging: boolean }>;
      position?: 'left' | 'right';
    };
  };

  selectionConfig?: {
    getItemId: (item: T, index: number) => string;
    getItem?: (item: T, index: number) => R;
    multiSelect?: boolean;
    selectedIds?: string[];
    defaultSelectedIds?: string[];
    onSelectionChange?: (selectedItems: R[]) => void;
    onItemAction?: (event: { item: R; action: 'selected' | 'deselected' }) => void;
    selectionStyle?: {
      border?: string;
      borderRadius?: string | number;
      backgroundColor?: string;
      boxShadow?: string;
      outline?: string;
      custom?: CSSProperties;
    };
  };
};
```

## useListController API

```tsx
type ListController<T> = {
  setData: (data: T[]) => void;
  appendData: (data: T[]) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setRenderState: (state: RenderState) => void;
  getRenderState: () => RenderState;
  reload: () => void;
  getPage: () => number;
  getPageSize: () => number;
  getTotalItems: () => number;
};

type RenderState = 'renderIdle' | 'renderLoading' | 'renderComplete' | 'renderError';
```

## Layout

```tsx
layout={{
  widthMode: 'full' | 'auto' | 'fixed',
  width: number,          // Solo si widthMode='fixed'
  minWidth: number,
  heightMode: 'full' | 'auto' | 'fixed',
  height: number | 'auto', // Solo si heightMode='fixed'
  minHeight: number,
  gap: number | string,   // Spacing entre items (CSS gap)
}}
```

## Behaviors

```tsx
behaviors={{
  scroll: 'normal' | 'infinityScroll' | 'none',
  paginator: {
    maxItem: number  // Items por página
  }
}}
```

## Loading

```tsx
loading={{
  renderType: 'component' | 'self',
  render: ReactNode | Component,  // Custom loading component
  position: 'top' | 'bottom' | 'over'
}}
```

## Uso Básico

### Lista Estática

```tsx
const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

<List
  id="simple-list"
  data={items}
  item={{
    renderType: 'component',
    render: (item) => <div>{item.name}</div>
  }}
/>
```

### Con Control Externo

```tsx
const controller = useListController<Item>();

useEffect(() => {
  controller.setRenderState('renderLoading');
  
  fetchData()
    .then(data => {
      controller.setData(data);
      controller.setRenderState('renderComplete');
    })
    .catch(() => {
      controller.setRenderState('renderError');
    });
}, []);

<List
  id="controlled-list"
  controller={controller}
  data={[]}
  item={{
    renderType: 'component',
    render: (item) => <ItemCard {...item} />
  }}
/>
```

### Infinite Scroll

```tsx
const controller = useListController<Item>();

<List
  id="infinite-list"
  controller={controller}
  behaviors={{
    scroll: 'infinityScroll',
    paginator: { maxItem: 10 }
  }}
  loading={{
    renderType: 'self',
    position: 'bottom'
  }}
  callbacks={{
    onScrollInfinity: (page) => {
      controller.setRenderState('renderLoading');
      
      fetchMore(page)
        .then(data => {
          controller.appendData(data);
          controller.setRenderState('renderComplete');
        })
        .catch(() => {
          controller.setRenderState('renderError');
        });
    }
  }}
  data={[]}
  item={{
    renderType: 'component',
    render: (item) => <ItemCard {...item} />
  }}
/>
```

## Selección de Items

### Lista con Selección Básica (sin getItem, recibe IDs)

```tsx
interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: '1', name: 'Laptop', price: 999 },
  { id: '2', name: 'Mouse', price: 29 },
  { id: '3', name: 'Keyboard', price: 79 },
];

<List<Product>
  id="selectable-list"
  data={products}
  layout={{ gap: 8 }}
  item={{
    renderType: 'component',
    render: (item) => (
      <div className="p-3">
        <span>{item.name}</span> - ${item.price}
      </div>
    ),
  }}
  selectionConfig={{
    getItemId: (item) => item.id,
    multiSelect: true,
    onSelectionChange: (ids) => console.log('Selected IDs:', ids),
    onItemAction: (event) => console.log(event.item, event.action),
    selectionStyle: {
      border: '2px solid #3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.05)',
      borderRadius: 8,
    },
  }}
/>
```

### Selección con getItem (Transformar T → R)

Cuando necesitas que los callbacks devuelvan objetos transformados en vez de solo IDs:

```tsx
interface ProductSummary {
  id: string;
  name: string;
}

const [selected, setSelected] = useState<ProductSummary[]>([]);

<List<Product>
  id="selectable-with-getItem"
  data={products}
  layout={{ gap: 8 }}
  item={{
    renderType: 'component',
    render: (item) => <ProductCard {...item} />,
  }}
  selectionConfig={{
    getItemId: (item) => item.id,
    getItem: (item): ProductSummary => ({ id: item.id, name: item.name }),
    multiSelect: true,
    onSelectionChange: setSelected, // recibe ProductSummary[]
    onItemAction: (event) => console.log(event.item.name, event.action),
    selectionStyle: {
      border: '2px solid #3b82f6',
    },
  }}
/>
```

### Selección Controlada sin getItem (solo IDs)

```tsx
const [selectedIds, setSelectedIds] = useState<string[]>(['1']);

<List<Product>
  id="controlled-selectable"
  data={products}
  layout={{ gap: 8 }}
  item={{
    renderType: 'component',
    render: (item) => <ProductCard {...item} />,
  }}
  selectionConfig={{
    getItemId: (item) => item.id,
    multiSelect: false,
    selectedIds: selectedIds,
    onSelectionChange: setSelectedIds, // recibe string[]
    selectionStyle: {
      border: '2px solid #10b981',
    },
  }}
/>
```

## Drag & Drop

### Lista básica (item completo es arrastrável)

Por defecto, sin `handle`, todo el item es el área de arrastre:

```tsx
const [items, setItems] = useState<Product[]>(products);

<List<Product>
  id="draggable-list"
  data={items}
  layout={{ gap: 8 }}
  item={{
    renderType: 'component',
    render: (item) => <ProductCard {...item} />,
  }}
  draggableConfig={{
    getItemId: (item) => String(item.id),
    onReorder: (newData, event) => {
      setItems(newData);
      console.log(`Moved "${event.item.name}" from ${event.fromIndex} to ${event.toIndex}`);
    },
  }}
/>
```

### Lista con handle personalizado

Si se pasa `handle`, solo el handle inicia el drag (el item no se arrastra al tocarlo directamente):

```tsx
const CustomHandle = ({ isDragging }: { isDragging: boolean }) => (
  <GripVertical className={isDragging ? 'text-blue-500' : 'text-gray-400'} />
);

<List<Product>
  id="custom-drag-list"
  data={items}
  item={{
    renderType: 'component',
    render: (item) => <ProductCard {...item} />,
  }}
  draggableConfig={{
    getItemId: (item) => String(item.id),
    onReorder: setItems,
    handle: {
      render: CustomHandle,
      position: 'left',
    },
  }}
/>
```

### Items no arrastrables (isItemDraggable)

```tsx
<List<Product>
  id="partial-drag-list"
  data={items}
  item={{
    renderType: 'component',
    render: (item) => <ProductCard {...item} />,
  }}
  draggableConfig={{
    getItemId: (item) => String(item.id),
    isItemDraggable: (item) => !item.locked,  // items con locked=true no se mueven
    onReorder: setItems,
  }}
/>
```

Cuando `isItemDraggable` retorna `false` para un item:
- No se muestra el drag handle
- El item no se puede iniciar como drag (no es arrastrable)
- El item SÍ se desplaza cuando otros items se mueven a su alrededor (actúa como drop target)
- Se aplica la clase `.sortableItemDisabled`

### DraggableReorderEvent<T>

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `item` | `T` | El item que fue movido |
| `fromIndex` | `number` | Índice original |
| `toIndex` | `number` | Nuevo índice |

## Arquitectura de Selección

Cuando `selectionConfig` está presente, el List usa un layout interno diferente (`List.selectable.layout.tsx`) que:

1. Envuelve la lista con `WrapperItemsSelected` (Provider + Context)
2. Envuelve cada item con un `SelectableItem` que aplica estilos según el estado de selección
3. Los estilos se aplican sobre el contenedor del item, sin modificar el componente interno (agnóstico)
4. Mantiene un mapa interno `itemId → T` para transformar callbacks cuando `getItem` está presente

Cuando `selectionConfig` NO está presente, se usa el layout normal sin cargar ningún código de selección en memoria.

## Arquitectura de Drag & Drop

Cuando `draggableConfig` está presente (y tiene prioridad sobre `selectionConfig`), el List usa `List.draggable.layout.tsx` que:

1. Usa `@dnd-kit/core` (DndContext, PointerSensor) y `@dnd-kit/sortable` (SortableContext, useSortable)
2. Mantiene `internalData` state (starts null, uses propData); después de reorder setea `internalData` para que el UI quede ordenado
3. PointerSensor tiene 5px activation distance para permitir clicks normales en los items
4. Por defecto todo el item es el área de arrastre (cursor: grab). No se muestra ningún handle
5. Si se pasa `handle` con un `render` component, solo el handle inicia el drag (el item no se arrastra directamente)
6. `onReorder` callback dispara con el array completo reordenado + metadata del evento (item, fromIndex, toIndex)
7. `isItemDraggable` permite bloquear items individuales: no se pueden arrastrar pero SÍ se desplazan cuando otros se mueven (`disabled: { draggable: true, droppable: false }`)

### getItem vs getItemId

- `getItemId(item, index) → string`: Obligatorio. Extrae un identificador único del item para el sistema de selección interno.
- `getItem(item, index) → R`: Opcional. Transforma T en la interfaz que el consumidor quiera recibir en los callbacks.
  - Si se provee: `onSelectionChange` recibe `R[]` y `onItemAction.item` es de tipo `R`
  - Si NO se provee: `onSelectionChange` recibe `string[]` (los IDs) y `onItemAction.item` es `string`

### SelectionStyle

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `border` | `string` | Borde del item seleccionado (ej: `'2px solid #3b82f6'`) |
| `borderRadius` | `string \| number` | Radio del borde |
| `backgroundColor` | `string` | Color de fondo del item seleccionado |
| `boxShadow` | `string` | Sombra del item seleccionado |
| `outline` | `string` | Outline del item seleccionado |
| `custom` | `CSSProperties` | Estilos CSS adicionales |

## Estados de Render

| Estado | Descripción |
|--------|-------------|
| `renderIdle` | Estado inicial, sin data ni loading |
| `renderLoading` | Estado visual de carga |
| `renderComplete` | Data cargada y renderizada |
| `renderError` | Error durante la carga |

## Platform Detection

El `index.tsx` principal usa `useIsMobile()` para dispatch:

```typescript
if (isMobile) {
  return <ListMobile {...props} />;  // < 768px
}
return <ListWeb {...props} />;        // >= 768px
```

## Folder Structure

```
List/
├── shared/                              # Tipos y hooks compartidos
│   ├── List.types.ts                    # Incluye SelectionConfig, SelectionStyle, SelectionItemActionEvent
│   ├── useListController.ts
│   └── index.ts
├── web/
│   ├── layouts/
│   │   ├── List.normal.layout.tsx       # Layout normal (sin selección)
│   │   ├── List.selectable.layout.tsx   # Layout con selección (WrapperItemsSelected + getItem)
│   │   └── List.draggable.layout.tsx    # Layout con drag & drop (@dnd-kit)
│   ├── css/
│   │   ├── List.module.css
│   │   └── List.draggable.module.css    # Estilos D&D (handle, sorting states)
│   ├── hooks/
│   │   └── useList.hook.ts
│   └── index.tsx                        # Despacho según draggableConfig/selectionConfig
├── mobile/
│   ├── layouts/
│   │   ├── List.normal.layout.tsx       # Layout normal (sin selección)
│   │   └── List.selectable.layout.tsx   # Layout con selección (WrapperItemsSelected + getItem)
│   ├── css/
│   │   └── List.module.css
│   ├── hooks/
│   │   └── useList.hook.ts
│   └── index.tsx                        # Despacho según selectionConfig
├── index.tsx                            # Web/Mobile dispatch
├── README-WEB-IA.md
└── README-MOBILE-IA.md
```
