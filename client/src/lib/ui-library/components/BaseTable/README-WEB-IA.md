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
    columnId: string;      // Unique column identifier (matches data key)
    order?: number;        // Display order
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

### HeadersDefaultConfig

```typescript
interface HeadersDefaultConfig {
  enabled?: boolean;             // Show/hide headers (default: true)
  dividers?: boolean;            // Show column dividers (default: true)
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
  dividers?: boolean;            // Show row dividers (default: true)
  stretchCount?: number;         // Number of rows to divide space (required for stretch mode)
}
```

#### heightMode: 'stretch'

Cuando `heightMode` es `'stretch'`, las filas se reparten el espacio vertical disponible equitativamente según `stretchCount`. Se usa junto con `layout.heightMode: 'full'` (o `'fixed'`) para que la tabla tenga un alto definido.

El espacio se divide para `stretchCount` filas. Si hay menos filas de datos que `stretchCount`, las filas visibles mantienen el tamaño calculado y el espacio restante queda vacío.

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

| Propiedad | Descripción |
|-----------|-------------|
| `heightMode: 'stretch'` | Activa el modo stretch |
| `stretchCount` | Número de filas para dividir el espacio (requerido) |

**Nota**: `stretchCount` normalmente coincide con `itemsPerPage` del paginador.

### ColumnsDefaultConfig

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
