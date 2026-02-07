# BaseTable - Web Version

## Overview
Declarative, agnostic table component (web only) designed for configuration interpretation without business logic. The component interprets configuration and notifies events via callbacks, but does NOT transform data or apply internal sorting/filtering logic.

## Folder Structure

```
web/
├── components/
│   ├── index.ts
│   ├── TextCell.tsx           # Default text cell component
│   └── HeaderCell.tsx         # Default header cell component
├── css/
│   ├── index.ts
│   └── BaseTable.module.css   # Component styles
├── hooks/
│   ├── index.ts
│   └── useTableState.hook.ts  # State management hook
├── types/
│   ├── index.ts
│   ├── BaseTable.type.ts      # Main component props
│   ├── layout.type.ts         # Layout configuration
│   ├── cells.type.ts          # Cell configuration
│   ├── headers.type.ts        # Header configuration
│   ├── rows.type.ts           # Row configuration
│   ├── columns.type.ts        # Column configuration
│   ├── behaviors.type.ts      # Behaviors and states
│   ├── callbacks.type.ts      # Callback definitions
│   └── state.type.ts          # Table state types
├── views/
│   ├── index.ts
│   ├── BaseTable.view.tsx     # Main component
│   ├── TableHeader.tsx        # Header rendering
│   └── TableBody.tsx          # Body rendering
└── index.tsx                   # Main export
```

## Basic Usage

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
| `data` | `any[]` | Yes | Array of data objects |
| `state` | `TableState` | Yes | Current table state |
| `config` | `BaseTableConfig` | Yes | Table configuration |
| `callbacks` | `TableCallbacks` | No | Event callbacks |

## Configuration Types

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
    columnId: string;      // Identificador unico (coincide con la key del objeto de datos)
    order?: number;        // Orden de visualizacion
  };
  header?: {
    cell?: ColumnHeaderCellConfig;
  };
  cell?: ColumnCellConfig;
  visible?: boolean;
  minWidth?: number;               // Ancho minimo en pixeles
  maxWidth?: number | 'stretch' | 'container';  // Ancho maximo o modo de distribucion
  sortable?: boolean;
}
```

### ColumnHeaderCellConfig

```typescript
interface ColumnHeaderCellConfig {
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
  sortKey?: string;              // Custom sort key
  sortable?: boolean;            // Enable sorting
  render?: ReactNode;            // Custom render component
  clickable?: boolean;           // Enable click events
  iconPosition?: 'left' | 'right';  // Sort icon position
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
  { metadata: { columnId: 'id' }, maxWidth: 80 },        // Maximo 80px
  { metadata: { columnId: 'name' }, maxWidth: 250 },     // Maximo 250px
  { metadata: { columnId: 'description' }, maxWidth: 400 }, // Maximo 400px
];
```

**Comportamiento CSS**: `width: 1%; white-space: nowrap; max-width: Xpx` — la columna se encoge al contenido pero no supera X pixeles.

#### maxWidth: 'stretch' (distribucion proporcional)

Las columnas con `maxWidth: 'stretch'` se reparten equitativamente el espacio horizontal sobrante (despues de descontar las columnas con ancho fijo).

```tsx
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'id' }, maxWidth: 80 },          // Fija: 80px
  { metadata: { columnId: 'name' }, maxWidth: 'stretch' }, // Stretch: comparte espacio
  { metadata: { columnId: 'email' }, maxWidth: 'stretch' },// Stretch: comparte espacio
];
// 'id' ocupa 80px, 'name' y 'email' se dividen el resto 50/50
```

**Calculo del ancho**:
- Si hay columnas con ancho fijo: `width: calc((100% - fixedWidthTotal) / stretchCount)`
- Si todas son stretch: `width: 100% / stretchCount`

**Ejemplo con mix fijo + stretch**:
```tsx
const columns: ColumnConfig[] = [
  { metadata: { columnId: 'avatar' }, maxWidth: 60 },       // 60px fijo
  { metadata: { columnId: 'name' }, maxWidth: 'stretch' },  // (100% - 160px) / 2
  { metadata: { columnId: 'email' }, maxWidth: 'stretch' }, // (100% - 160px) / 2
  { metadata: { columnId: 'actions' }, maxWidth: 100 },      // 100px fijo
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
    minWidth: 60,          // Nunca menos de 60px
    maxWidth: 80,          // Nunca mas de 80px
  },
  {
    metadata: { columnId: 'name', order: 1 },
    minWidth: 150,         // Nunca menos de 150px
    maxWidth: 'stretch',   // Ocupa su parte del espacio sobrante
  },
  {
    metadata: { columnId: 'email', order: 2 },
    minWidth: 200,         // Nunca menos de 200px
    maxWidth: 'stretch',   // Ocupa su parte del espacio sobrante
  },
  {
    metadata: { columnId: 'actions', order: 3 },
    minWidth: 100,         // Nunca menos de 100px
    maxWidth: 120,         // Nunca mas de 120px
  },
];
```

### ColumnsDefaultConfig

Configuracion por defecto que aplica a todas las columnas. Cada columna individual puede sobreescribir estos valores.

```typescript
interface ColumnsDefaultConfig {
  maxVisibleColumns?: number;
  scroll?: boolean;
  minWidth?: number;                        // minWidth por defecto para todas las columnas
  maxWidth?: number | 'stretch' | 'container'; // maxWidth por defecto para todas las columnas
  sortable?: boolean;
  visible?: boolean;
}
```

```tsx
// Todas las columnas con minWidth 120 y stretch, excepto 'id' que tiene ancho fijo
config={{
  columns: [
    { metadata: { columnId: 'id' }, minWidth: 60, maxWidth: 80 },
    { metadata: { columnId: 'name' } },    // hereda minWidth: 120, maxWidth: 'stretch'
    { metadata: { columnId: 'email' } },   // hereda minWidth: 120, maxWidth: 'stretch'
    { metadata: { columnId: 'role' } },    // hereda minWidth: 120, maxWidth: 'stretch'
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
  enabled?: boolean;             // Mostrar/ocultar headers (default: true)
  dividers?: boolean;            // Mostrar divisores entre columnas (default: true)
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
  height?: number | string;                // Alto de fila (fixed/auto)
  heightMode?: 'fixed' | 'auto' | 'stretch'; // Modo de alto
  minHeight?: number;                      // Alto minimo en pixeles
  maxHeight?: number | 'stretch' | 'container'; // Alto maximo
  maxVisibleRows?: number;
  scroll?: boolean;
  hoverable?: boolean;
  dividers?: boolean;                      // Mostrar divisores entre filas (default: true)
  stretchCount?: number;                   // Filas para dividir espacio (requerido en stretch)
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
}

type SortDirection = 'asc' | 'desc' | 'none';
```

## Table State

### useTableState Hook

```typescript
const tableState = useTableState({ initialState: 'success' });

// Available states: 'idle' | 'loading' | 'success' | 'error' | 'empty'

// Methods
tableState.state          // Current state
tableState.setLoading()   // Set loading state
tableState.setSuccess(data)  // Set success with data
tableState.setErrorState(error)  // Set error state
tableState.setEmpty()     // Set empty state
tableState.reset()        // Reset to initial state
```

## Helper Components

### TextCell

```tsx
import { TextCell } from 'GC-UI-COMPONENTS';

<TextCell
  text="Cell content"
  textWrap="truncate"    // 'break-word' | 'truncate'
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
  textWrap="truncate"    // 'break-word' | 'truncate'
  bold={true}
  padding={8}
/>
```

## Configuration Override Chain

The component follows a configuration override chain:

1. **Column-specific config** (highest priority)
2. **Default config** (cellsDefault, headersDefault, etc.)
3. **Built-in defaults** (lowest priority)

Example:
```typescript
config={{
  columns: [
    {
      metadata: { columnId: 'name' },
      cell: { horizontalAlign: 'center' }  // This column only
    }
  ],
  cellsDefault: {
    horizontalAlign: 'left'  // All columns by default
  }
}}
```

## Complete Example with Sorting

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

## Development

1. Edit styles in `web/css/BaseTable.module.css`
2. Add logic in `web/hooks/useTableState.hook.ts`
3. Update types in `web/types/`
4. Modify views in `web/views/`

## Platform Resolution

- `index.tsx` dispatches to `web/` implementation
- Mobile version shows "Not Implemented" message
- Desktop browsers use full `web/` implementation
