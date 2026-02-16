# AcordionList Component

Lista de Accordions controlados, genérica y agnóstica. Renderiza una lista de items como accordions con header y body configurables.

## Características

- **Genérico `<T, R>`**: Tipo `T` para la data original, tipo `R` para los datos transformados via `getItemData`
- **Header self / component**: Header interno con `getHeaderLabel` o componente custom con `itemData`
- **Modos single / multiple**: Solo uno abierto (single) o varios simultáneos (multiple)
- **Controller externo**: `useAcordionListController` para control imperativo (open, close, toggle, closeAll, openAll, refreshAll, refreshItem)
- **Callbacks**: `onToggle` por item y `onOpenChange` con array de ids abiertos
- **getItemData**: Transforma cada item `T` a `R` antes de pasarlo al header y body
- **Web y Mobile**: Implementaciones para ambas plataformas

## Uso Básico

### Header Self (modo simple)
```tsx
<AcordionList
  id="drivers"
  data={drivers}
  getItemId={(item) => item.id}
  getItemData={(item) => item}
  itemHeader={{
    renderType: 'self',
    getHeaderLabel: (item) => item.name,
    arrowPosition: 'right',
  }}
  itemBody={{
    renderType: 'component',
    render: DriverBody,
  }}
  behaviors={{ mode: 'single' }}
/>
```

### Header Component (modo múltiple)
```tsx
<AcordionList
  id="products"
  data={products}
  getItemId={(item) => item.sku}
  getItemData={(item) => item}
  itemHeader={{
    renderType: 'component',
    render: ProductHeader,
    arrowPosition: 'left',
  }}
  itemBody={{
    renderType: 'component',
    render: ProductBody,
  }}
  behaviors={{ mode: 'multiple', defaultOpenIds: ['SKU-001'] }}
/>
```

### Transformación con getItemData
```tsx
<AcordionList<ApiUser, UserSummary>
  id="users"
  data={apiUsers}
  getItemId={(item) => String(item.userId)}
  getItemData={(item) => ({
    displayName: item.fullName,
    email: item.email,
    role: item.role,
  })}
  itemHeader={{ renderType: 'component', render: UserHeader }}
  itemBody={{ renderType: 'component', render: UserBody }}
/>
```

### Controller Externo
```typescript
const controller = useAcordionListController();

<button onClick={() => controller.closeAll()}>Cerrar todos</button>
<button onClick={() => controller.refreshAll()}>Refrescar</button>
<button onClick={() => controller.refreshItem('id-1')}>Refrescar item</button>

<AcordionList controller={controller} ... />
```

## API

### AcordionListProps<T, R>

| Prop | Tipo | Descripción |
|------|------|-------------|
| `id` | `string` | Identificador único (requerido) |
| `data` | `T[]` | Array de datos a renderizar (requerido) |
| `getItemId` | `(item: T, index: number) => string` | Extrae id único por item (requerido) |
| `getItemData` | `(item: T, index: number) => R` | Transforma T a R para header y body (requerido) |
| `itemHeader` | `AcordionListItemHeader<R>` | Configuración del header |
| `itemBody` | `AcordionListItemBody<R>` | Configuración del body |
| `layout` | `AcordionListLayout` | Dimensiones del contenedor |
| `behaviors` | `AcordionListBehaviors` | Modo single/multiple y ids abiertos |
| `callbacks` | `AcordionListCallbacks` | Eventos onToggle y onOpenChange |
| `controller` | `AcordionListController` | Hook de control externo |
| `className` | `string` | Clase CSS adicional |

### AcordionListItemHeader<R>

**Self:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `renderType` | `'self'` | Usa header interno |
| `getHeaderLabel` | `(item: R) => string` | Texto a mostrar |
| `arrowPosition` | `'left' \| 'right' \| 'none'` | Posición de la flecha |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | Modo de altura |

**Component:**
| Prop | Tipo | Descripción |
|------|------|-------------|
| `renderType` | `'component'` | Usa componente custom |
| `render` | `ComponentType<{ itemData: R }>` | Componente que recibe itemData |
| `arrowPosition` | `'left' \| 'right' \| 'none'` | Posición de la flecha |

### AcordionListItemBody<R>

| Prop | Tipo | Descripción |
|------|------|-------------|
| `renderType` | `'component'` | Siempre component |
| `render` | `ComponentType<{ itemData: R }>` | Componente que recibe itemData |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | Modo de altura |
| `behaviors.scroll` | `boolean` | Habilitar scroll en el body |
| `behaviors.renderComponentStrategy` | `'once' \| 'always'` | Estrategia de render |

### useAcordionListController

```typescript
type AcordionListController = {
  open: (id: string) => void;
  close: (id: string) => void;
  toggle: (id: string) => void;
  closeAll: () => void;
  openAll: () => void;
  getOpenIds: () => string[];
  isOpen: (id: string) => boolean;
  refreshAll: () => void;
  refreshItem: (id: string) => void;
};
```

### AcordionListBehaviors

| Prop | Tipo | Descripción |
|------|------|-------------|
| `mode` | `'single' \| 'multiple'` | Single: solo uno abierto. Multiple: varios |
| `defaultOpenIds` | `string[]` | Ids abiertos por defecto |
| `openIds` | `string[]` | Ids abiertos (controlado) |

## Platform Documentation

| Platform | Description |
|----------|-------------|
| Web | Vite + Tailwind CSS |
| Mobile Responsive | Web responsive for small screens |

## Ejemplos de Integración

### Con selector de registros visibles
```tsx
const [visibleCount, setVisibleCount] = useState(5);
const visibleData = useMemo(() => allData.slice(0, visibleCount), [visibleCount]);

<select onChange={(e) => setVisibleCount(Number(e.target.value))}>
  <option value={5}>5 registros</option>
  <option value={10}>10 registros</option>
</select>

<AcordionList data={visibleData} ... />
```

### Con Paginator
```tsx
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(5);
const paginatedData = useMemo(() => {
  const start = (currentPage - 1) * itemsPerPage;
  return allData.slice(start, start + itemsPerPage);
}, [currentPage, itemsPerPage]);

<AcordionList data={paginatedData} ... />
<Paginator
  totalItems={allData.length}
  onPageChange={handlePageChange}
  onItemsPerPageChange={handleItemsPerPageChange}
/>
```

## Demo

Ver la demo en `/components/acordion-list`

## Estructura

```
AcordionList/
├── shared/             # Tipos y controller compartidos
│   ├── AcordionList.types.ts
│   ├── useAcordionListController.ts
│   └── index.ts
├── web/                # Implementación web
├── mobile/             # Implementación mobile responsive
├── index.tsx           # Dispatch web/mobile
└── README.md
```
