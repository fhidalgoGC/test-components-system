# BaseTable - Componente de Tabla Declarativo

## Overview
Componente de tabla declarativo y agnóstico con soporte dual web/mobile. Interpreta configuración sin aplicar lógica de negocio. Notifica eventos vía callbacks pero NO transforma datos ni aplica sorting/filtering interno.

## Estructura de Carpetas

```
BaseTable/
├── index.tsx                          # Root: dispatch web/mobile via useIsMobile()
├── README-WEB-IA.md
├── shared/
│   ├── index.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── BaseTable.type.ts          # Props principales del componente
│   │   ├── layout.type.ts             # Configuración de layout
│   │   ├── cells.type.ts              # Configuración de celdas
│   │   ├── headers.type.ts            # Configuración de headers
│   │   ├── rows.type.ts               # Configuración de filas
│   │   ├── columns.type.ts            # Configuración de columnas
│   │   ├── behaviors.type.ts          # Comportamientos y estados
│   │   ├── callbacks.type.ts          # Definiciones de callbacks
│   │   └── state.type.ts              # Tipos de estado de tabla
│   ├── hooks/
│   │   ├── index.ts
│   │   ├── useTableState.hook.ts      # Hook de gestión de estado
│   │   └── useTableSearch.hook.ts     # Hook de búsqueda en datos renderizados
│   └── components/
│       ├── index.ts
│       ├── TextCell.tsx               # Celda de texto por defecto
│       └── HeaderCell.tsx             # Celda de header por defecto
├── web/
│   ├── index.tsx                      # Export de la vista web
│   ├── styles/
│   │   └── BaseTable.module.css       # Estilos web
│   └── views/
│       ├── index.ts
│       ├── BaseTable.view.tsx         # Componente principal web
│       ├── TableHeader.tsx            # Renderizado de headers
│       ├── TableBody.tsx              # Renderizado de body
│       ├── TableColgroup.tsx          # Renderizado de colgroup
│       └── TableStates.tsx            # Renderizado de estados
└── mobile/
    ├── index.tsx                      # Export de la vista mobile
    ├── styles/
    │   └── BaseTableMobile.module.css # Estilos mobile
    └── views/
        ├── index.ts
        └── BaseTableMobile.view.tsx   # Componente principal mobile
```

## Resolución de Plataforma

El root `index.tsx` usa `useIsMobile()` (breakpoint: 768px) para despachar automáticamente:
- **Desktop (≥768px)**: Renderiza `web/views/BaseTable.view.tsx` — tabla completa con layout separado, sticky header, stretch rows, colgroup
- **Mobile (<768px)**: Renderiza `mobile/views/BaseTableMobile.view.tsx` — tabla simplificada con scroll horizontal nativo, padding optimizado para touch

## Uso Básico

```tsx
import { BaseTable, useTableState } from 'GC-UI-COMPONENTS';
import type { ColumnConfig } from 'GC-UI-COMPONENTS';

const data = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: 'name', order: 0 }, minWidth: 150 },
  { metadata: { columnId: 'price', order: 1 }, minWidth: 100 },
];

function MyTable() {
  const tableState = useTableState({ initialState: 'success' });

  return (
    <BaseTable
      data={data}
      state={tableState.state}
      config={{
        columns,
        layout: {
          widthMode: 'full',
          heightMode: 'auto',
        },
      }}
    />
  );
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | `any[]` | Yes | Array de objetos de datos |
| `state` | `TableState` | Yes | Estado actual de la tabla |
| `config` | `BaseTableConfig` | Yes | Configuración de la tabla |
| `callbacks` | `TableCallbacks` | No | Callbacks de eventos |

## Tipos de Configuración

### BaseTableConfig

```typescript
interface BaseTableConfig {
  columns: ColumnConfig[];
  layout?: LayoutConfig;
  headersDefault?: HeadersDefaultConfig;
  cellsDefault?: CellsDefaultConfig;
  rowsDefault?: RowsDefaultConfig;
  columnsDefault?: ColumnsDefaultConfig;
  behaviors?: BehaviorsConfig;
}
```

### LayoutConfig

```typescript
interface LayoutConfig {
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number | string;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  stickyHeader?: boolean;
  horizontalScroll?: boolean;
  verticalScroll?: boolean;
}
```

### ColumnConfig

```typescript
interface ColumnConfig {
  metadata: {
    columnId: string;
    order?: number;
  };
  header?: {
    cell?: ColumnHeaderCellConfig;
  };
  cell?: ColumnCellConfig;
  visible?: boolean;
  minWidth?: number;
  maxWidth?: number | 'stretch' | 'container';
  sortable?: boolean;
}
```

### ColumnHeaderCellConfig

```typescript
interface ColumnHeaderCellConfig {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  sortKey?: string;
  sortable?: boolean;
  render?: ReactNode;
  clickable?: boolean;
  iconPosition?: 'left' | 'right';
}
```

### ColumnCellConfig

```typescript
interface ColumnCellConfig {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}
```

---

## Sistema de Sizing de Columnas

El ancho de cada columna se controla con dos propiedades: `minWidth` y `maxWidth`. Estas se pueden configurar por columna individual (`ColumnConfig`) o como default para todas las columnas (`ColumnsDefaultConfig`). La columna individual siempre tiene prioridad sobre el default.

### minWidth

Establece el ancho minimo en pixeles. La columna nunca sera mas estrecha que este valor, independientemente del contenido o del espacio disponible.

| Nivel | Propiedad | Tipo | Descripcion |
|-------|-----------|------|-------------|
| Columna | `minWidth` | `number` | Ancho minimo para esta columna especifica |
| Default | `columnsDefault.minWidth` | `number` | Ancho minimo para todas las columnas |

```tsx
// minWidth por columna
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'id' }, minWidth: 60 },
  { metadata: { columnId: 'name' }, minWidth: 200 },
  { metadata: { columnId: 'email' }, minWidth: 150 },
];

// minWidth global (aplica a todas las columnas)
config={{
  columns,
  columnsDefault: { minWidth: 120 },
}}
```

**Cadena de prioridad**: `column.minWidth` > `columnsDefault.minWidth` > sin minimo

### maxWidth

Controla como la columna usa el espacio horizontal disponible. Acepta tres tipos de valores:

| Valor | Tipo | Comportamiento |
|-------|------|----------------|
| `number` | `number` | Ancho maximo fijo en pixeles. La columna se ajusta al contenido hasta ese maximo. |
| `'stretch'` | `string` | La columna se estira para ocupar su parte proporcional del espacio sobrante. |
| `'container'` | `string` | La columna se ajusta al contenido (equivalente a no definir maxWidth). |
| `undefined` | - | Comportamiento por defecto: se ajusta al contenido. |

#### maxWidth: number (ancho maximo fijo)

La columna se ajusta al contenido pero no supera el ancho indicado en pixeles. El contenido que exceda se oculta.

```tsx
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'id' }, maxWidth: 80 },
  { metadata: { columnId: 'name' }, maxWidth: 250 },
  { metadata: { columnId: 'description' }, maxWidth: 400 },
];
```

**Comportamiento CSS**: `width: 1%; white-space: nowrap; max-width: Xpx` — la columna se encoge al contenido pero no supera X pixeles.

#### maxWidth: 'stretch' (distribucion proporcional)

Las columnas con `maxWidth: 'stretch'` se reparten equitativamente el espacio horizontal sobrante (despues de descontar las columnas con ancho fijo).

```tsx
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'id' }, maxWidth: 80 },
  { metadata: { columnId: 'name' }, maxWidth: 'stretch' },
  { metadata: { columnId: 'email' }, maxWidth: 'stretch' },
];
// 'id' ocupa 80px, 'name' y 'email' se dividen el resto 50/50
```

**Calculo del ancho**:
- Si hay columnas con ancho fijo: `width: calc((100% - fixedWidthTotal) / stretchCount)`
- Si todas son stretch: `width: 100% / stretchCount`

**Ejemplo con mix fijo + stretch**:
```tsx
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'avatar' }, maxWidth: 60 },
  { metadata: { columnId: 'name' }, maxWidth: 'stretch' },
  { metadata: { columnId: 'email' }, maxWidth: 'stretch' },
  { metadata: { columnId: 'actions' }, maxWidth: 100 },
];
// fixedWidthTotal = 60 + 100 = 160px
// Cada stretch = calc((100% - 160px) / 2)
```

**Nota**: Cuando hay columnas `stretch`, la tabla usa `table-layout: fixed` automaticamente para que la distribucion funcione correctamente.

#### maxWidth: 'container'

Equivalente a no definir `maxWidth`. La columna se ajusta al contenido sin limite de ancho.

#### Comportamiento automatico (sin stretch explicito)

Cuando ninguna columna tiene `maxWidth: 'stretch'`, la **ultima columna visible** absorbe automaticamente el espacio restante (`width: 100%`). Esto evita que quede espacio vacio a la derecha de la tabla.

```tsx
// Sin stretch explicito: la ultima columna ('status') absorbe el espacio sobrante
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'id' }, minWidth: 60 },
  { metadata: { columnId: 'name' }, minWidth: 150 },
  { metadata: { columnId: 'status' } },  // <-- absorbe espacio restante automaticamente
];
```

### Combinando minWidth y maxWidth

```tsx
const columns: ColumnConfig[] = [
  {
    metadata: { columnId: 'id', order: 0 },
    minWidth: 60,
    maxWidth: 80,
  },
  {
    metadata: { columnId: 'name', order: 1 },
    minWidth: 150,
    maxWidth: 'stretch',
  },
  {
    metadata: { columnId: 'email', order: 2 },
    minWidth: 200,
    maxWidth: 'stretch',
  },
  {
    metadata: { columnId: 'actions', order: 3 },
    minWidth: 100,
    maxWidth: 120,
  },
];
```

### ColumnsDefaultConfig

Configuracion por defecto que aplica a todas las columnas. Cada columna individual puede sobreescribir estos valores.

```typescript
interface ColumnsDefaultConfig {
  maxVisibleColumns?: number;
  scroll?: boolean;
  minWidth?: number;
  maxWidth?: number | 'stretch' | 'container';
  sortable?: boolean;
  visible?: boolean;
}
```

```tsx
// Todas las columnas con minWidth 120 y stretch, excepto 'id' que tiene ancho fijo
config={{
  columns: [
    { metadata: { columnId: 'id' }, minWidth: 60, maxWidth: 80 },
    { metadata: { columnId: 'name' } },
    { metadata: { columnId: 'email' } },
    { metadata: { columnId: 'role' } },
  ],
  columnsDefault: {
    minWidth: 120,
    maxWidth: 'stretch',
  },
}}
```

---

## Sistema de Sizing de Filas

### HeadersDefaultConfig

```typescript
interface HeadersDefaultConfig {
  enabled?: boolean;
  dividers?: boolean;
  height?: number | string;
  heightMode?: 'fixed' | 'auto';
  cell?: HeaderCellConfig;
}
```

### HeaderCellConfig

```typescript
interface HeaderCellConfig {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  height?: number | string;
  heightMode?: 'fixed' | 'auto';
  sortKey?: string;
  sortable?: boolean;
  render?: ReactNode;
  clickable?: boolean;
  iconPosition?: 'left' | 'right';
}
```

### CellsDefaultConfig

```typescript
interface CellsDefaultConfig {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  height?: number | string;
  heightMode?: 'fixed' | 'auto';
  render?: ReactNode | ((value: any, rowData: any, columnId: string) => ReactNode);
}
```

### RowsDefaultConfig

```typescript
interface RowsDefaultConfig {
  height?: number | string;
  heightMode?: 'fixed' | 'auto' | 'stretch';
  minHeight?: number;
  maxHeight?: number | 'stretch' | 'container';
  maxVisibleRows?: number;
  scroll?: boolean;
  hoverable?: boolean;
  dividers?: boolean;
  stretchCount?: number;
}
```

### heightMode de filas

| Valor | Comportamiento |
|-------|----------------|
| `'auto'` | La fila se ajusta al contenido (default) |
| `'fixed'` | Alto fijo definido por `height`. Contenido que exceda se oculta. |
| `'stretch'` | Las filas se reparten el espacio vertical disponible segun `stretchCount`. |

#### heightMode: 'stretch'

Cuando `heightMode` es `'stretch'`, las filas se reparten el espacio vertical disponible equitativamente segun `stretchCount`. Se usa junto con `layout.heightMode: 'full'` (o `'fixed'` con `height`) para que la tabla tenga un alto definido.

El espacio se divide para `stretchCount` filas. Si hay menos filas de datos que `stretchCount`, las filas visibles mantienen el tamaño calculado y el espacio restante queda vacio.

```tsx
// Tabla con 10 slots de fila, cada una ocupa 10% del alto disponible
<BaseTable
  data={data}
  state="success"
  config={{
    columns,
    layout: {
      widthMode: 'full',
      heightMode: 'full',
    },
    rowsDefault: {
      heightMode: 'stretch',
      stretchCount: 10,
    },
  }}
/>
```

| Propiedad | Descripcion |
|-----------|-------------|
| `heightMode: 'stretch'` | Activa el modo stretch |
| `stretchCount` | Numero de filas para dividir el espacio (requerido) |

#### maxVisibleRows

Limita la cantidad de filas visibles en la tabla. Corta el arreglo de datos internamente, mostrando solo las primeras N filas. **No genera scroll**, simplemente no renderiza las filas que excedan el limite.

```tsx
// Solo muestra 5 filas, aunque el arreglo tenga 100
<BaseTable
  data={bigDataArray}
  state="success"
  config={{
    columns,
    layout: {
      widthMode: 'full',
      heightMode: 'auto',
    },
    rowsDefault: {
      heightMode: 'fixed',
      height: 40,
      hoverable: true,
      dividers: true,
      maxVisibleRows: 5,
    },
  }}
/>
```

| Propiedad | Descripcion |
|-----------|-------------|
| `maxVisibleRows` | Numero maximo de filas a mostrar. El arreglo se corta en ese indice. |

**Nota**: `stretchCount` normalmente coincide con `itemsPerPage` del paginador.

**Internamente**: Stretch activa automaticamente un layout separado (header fijo arriba, body con `flex: 1` abajo). Un `ResizeObserver` mide la altura real del body en pixeles, y cada fila recibe `height = Math.floor(bodyHeight / stretchCount)` en pixeles absolutos (no porcentajes). Las filas spacer rellenan los slots vacios con la misma altura. La compensacion del scrollbar entre header y body se calcula dinamicamente midiendo `offsetWidth - clientWidth` del body container, aplicando `paddingRight` al header solo cuando existe un scrollbar real.

### BehaviorsConfig

```typescript
interface BehaviorsConfig {
  hoverable?: 'header' | 'column' | 'row' | 'cell' | 'none';
  clickable?: 'header' | 'cell' | 'row' | 'none';
  states?: StatesConfig;
}

interface StatesConfig {
  idle?: StateConfig;
  loading?: StateConfig;
  error?: StateConfig;
  empty?: StateConfig;
}

interface StateConfig {
  defaultText?: string;
  message?: string;
  component?: ReactNode;
}
```

## Callbacks

```typescript
interface TableCallbacks {
  onHeaderClick?: (columnId: string, sortDirection: SortDirection) => void;
  onCellClick?: (columnId: string, rowIndex: number, value: any, rowData: any) => void;
  onRowClick?: (rowIndex: number, rowData: any) => void;
  onSort?: (column: ColumnConfig, direction: SortDirection) => void;
  onReachEnd?: () => void;
}

type SortDirection = 'asc' | 'desc' | 'none';
```

## Infinite Scroll

El componente soporta scroll infinito para cargar datos progresivamente al llegar al final de la tabla.

### Configuración

```typescript
interface InfiniteScrollConfig {
  enabled?: boolean;              // Activa/desactiva la detección de scroll
  threshold?: number;             // Píxeles antes del final para disparar (default: 100)
  loadingMoreMessage?: string;    // Mensaje mostrado mientras carga más datos
  loadingMoreComponent?: ReactNode; // Componente personalizado para el estado de carga
}
```

### Uso

```tsx
<BaseTable
  data={data}
  state={isLoadingMore ? 'loadingMore' : 'success'}
  config={{
    columns,
    layout: {
      widthMode: 'full',
      heightMode: 'fixed',
      height: 400,
      stickyHeader: true,
      verticalScroll: true,
    },
    behaviors: {
      infiniteScroll: {
        enabled: hasMore,
        threshold: 80,
        loadingMoreMessage: 'Cargando más datos...',
      },
    },
  }}
  callbacks={{
    onReachEnd: () => {
      // Cargar más datos aquí
    },
  }}
/>
```

### Comportamiento
- **`onReachEnd`**: Se dispara cuando el usuario hace scroll hasta el umbral definido por `threshold`.
- **`state: 'loadingMore'`**: Muestra un spinner al final de la tabla. Los datos existentes permanecen visibles.
- **Guard de re-entrada**: Internamente se bloquea `onReachEnd` hasta que el estado cambie de `loadingMore`, evitando disparos duplicados.
- **Validación de overflow**: Solo se dispara cuando hay overflow vertical real (el contenido es más alto que el contenedor).
- **Funciona en web y mobile**: Ambas variantes manejan `loadingMore` correctamente.

### Arquitectura del Scroll Container (Web)

Cuando `heightMode: 'fixed'` + `height` + `verticalScroll: true` (y NO es `separatedLayout`), el componente usa un patrón de doble div:

```
outer div (tableContainer, height fijo, overflow: hidden)
  └── inner div (scrollContainerStyle: overflowY: auto, height, maxHeight, flexShrink: 0)
        └── <table> completa (thead + tbody + tfoot)
```

Este patrón evita problemas con `display: flex` de `.tableWrapper` (que causa que elementos hijos se compriman en vez de hacer overflow). El div exterior contiene, el div interior es el que hace scroll. La `<table>` completa (con headers, body y footer) vive dentro del scroll container, manteniendo toda la funcionalidad de tabla HTML nativa.

## Table State

### useTableState Hook

```typescript
const tableState = useTableState({ initialState: 'success' });

// Available states: 'idle' | 'loading' | 'success' | 'error' | 'empty' | 'loadingMore'

// Methods
tableState.state
tableState.setLoading()
tableState.setSuccess(data)
tableState.setErrorState(error)
tableState.setEmpty()
tableState.reset()
```

## Componentes Helper

### TextCell

```tsx
import { TextCell } from 'GC-UI-COMPONENTS';

<TextCell
  text="Cell content"
  textWrap="truncate"
  bold={false}
  padding={8}
  paddingX={12}
  paddingY={4}
/>
```

### HeaderCell

```tsx
import { HeaderCell } from 'GC-UI-COMPONENTS';

<HeaderCell
  text="Column Title"
  textWrap="truncate"
  bold={true}
  padding={8}
/>
```

## Cadena de Prioridad de Configuración

1. **Configuración por columna** (mayor prioridad)
2. **Configuración por defecto** (cellsDefault, headersDefault, etc.)
3. **Defaults internos** (menor prioridad)

```typescript
config={{
  columns: [
    {
      metadata: { columnId: 'name' },
      cell: { horizontalAlign: 'center' }
    }
  ],
  cellsDefault: {
    horizontalAlign: 'left'
  }
}}
```

## Ejemplo Completo con Sorting

```tsx
import { useState } from 'react';
import { BaseTable, useTableState, HeaderCell, TextCell } from 'GC-UI-COMPONENTS';
import type { ColumnConfig, SortDirection } from 'GC-UI-COMPONENTS';

const initialData = [
  { id: 1, product: 'Laptop', price: 1299 },
  { id: 2, product: 'Mouse', price: 49 },
  { id: 3, product: 'Keyboard', price: 129 },
];

const columns: ColumnConfig[] = [
  {
    metadata: { columnId: 'product', order: 0 },
    header: {
      cell: {
        render: <HeaderCell text="Product" />,
        sortable: true,
        iconPosition: 'right',
      }
    },
    cell: {
      render: (value) => <TextCell text={value} />
    },
    minWidth: 150,
  },
  {
    metadata: { columnId: 'price', order: 1 },
    header: {
      cell: {
        render: <HeaderCell text="Price" />,
        sortable: true,
        iconPosition: 'left',
        horizontalAlign: 'right',
      }
    },
    cell: {
      horizontalAlign: 'right',
      render: (value) => <TextCell text={`$${value}`} />
    },
    minWidth: 100,
  },
];

function SortableTable() {
  const tableState = useTableState({ initialState: 'success' });
  const [data, setData] = useState(initialData);

  const handleSort = (column: ColumnConfig, direction: SortDirection) => {
    const columnId = column.metadata.columnId;
    
    if (direction === 'none') {
      setData(initialData);
      return;
    }

    const sorted = [...initialData].sort((a, b) => {
      const aVal = a[columnId as keyof typeof a];
      const bVal = b[columnId as keyof typeof b];
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      
      return direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    
    setData(sorted);
  };

  return (
    <BaseTable
      data={data}
      state={tableState.state}
      config={{
        columns,
        layout: {
          widthMode: 'full',
          heightMode: 'auto',
        },
        headersDefault: {
          dividers: true,
          cell: {
            sortable: true,
          },
        },
        rowsDefault: {
          hoverable: true,
          dividers: true,
        },
        cellsDefault: {
          horizontalAlign: 'left',
          verticalAlign: 'middle',
        },
      }}
      callbacks={{
        onSort: handleSort,
        onRowClick: (rowIndex, rowData) => {
          console.log('Row clicked:', rowIndex, rowData);
        },
      }}
    />
  );
}
```

## Desarrollo

1. Editar estilos web en `web/styles/BaseTable.module.css`
2. Editar estilos mobile en `mobile/styles/BaseTableMobile.module.css`
3. Lógica compartida (hooks, types, components) en `shared/`
4. Vistas web en `web/views/`
5. Vistas mobile en `mobile/views/`

## Diferencias Web vs Mobile

| Característica | Web | Mobile |
|---------------|-----|--------|
| Layout separado (sticky header) | Sí | No |
| Stretch rows | Sí (ResizeObserver) | No |
| Colgroup | Sí | No |
| Hover effects | Sí (:hover) | No (usa :active) |
| Scroll horizontal | Configurable | Siempre activo |
| Padding de celdas | 0 (custom via render) | 8px 12px (por defecto) |
| Font size | Hereda | 13px headers, 14px celdas |

## useTableSearch - Búsqueda en datos renderizados

Hook externo que filtra los datos del BaseTable buscando en todas las columnas visibles. La búsqueda es case-insensitive y por coincidencia parcial.

### Importación

```tsx
import { useTableSearch } from "@/lib/ui-library/components/BaseTable";
```

### Parámetros

| Parámetro | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `data` | `any[]` | requerido | Array de datos a filtrar |
| `columns` | `ColumnConfig[]` | requerido | Configuración de columnas (para determinar qué columnas buscar) |
| `columnIds` | `string[]` | todas las visibles | Limitar la búsqueda a columnas específicas |

### Retorno

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `searchTerm` | `string` | Término de búsqueda actual |
| `setSearchTerm` | `(term: string) => void` | Actualizar el término de búsqueda |
| `filteredData` | `any[]` | Datos filtrados (o todos si no hay búsqueda) |
| `isSearching` | `boolean` | `true` si hay un término activo |
| `clearSearch` | `() => void` | Limpia el término de búsqueda |

### Uso básico

```tsx
const data = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];

const columns: ColumnConfig[] = [
  { metadata: { columnId: "name", order: 0 } },
  { metadata: { columnId: "email", order: 1 } },
];

const { searchTerm, setSearchTerm, filteredData, isSearching, clearSearch } = useTableSearch({
  data,
  columns,
});

return (
  <>
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Buscar..."
    />
    {isSearching && <button onClick={clearSearch}>Limpiar</button>}
    <BaseTable data={filteredData} config={{ columns }} />
  </>
);
```

### Buscar solo en columnas específicas

```tsx
const { filteredData, setSearchTerm } = useTableSearch({
  data,
  columns,
  columnIds: ["name", "email"],
});
```
