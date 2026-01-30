# ControlDataProvider

Sistema universal de control de datos que implementa un patrón de gestión de estado completamente dinámico. Los componentes UI inyectan sus propios transformers y claves de estado sin que el provider conozca su estructura de antemano.

## Concepto

El provider es **agnóstico** a la estructura de datos. Cada componente define:
- Su propia **key** en el estado
- Su propio **transformer** para procesar datos
- El **tipo de entrada y salida** de su transformer

## Tipos Principales

```typescript
// Estado completamente libre
type ControlDataState = {
  [key: string]: unknown;
};

// Transformer con acceso al valor previo
type StateTransformer<T, R> = (rawData: T, previousValue: R | undefined) => R;
//                             ↑           ↑
//                          Entrada      Valor previo de la key (para merge)

// Adaptador para mapear estado interno a parámetros de API
type MapParamsAdapter<TOutput> = (state: ControlDataState) => TOutput;

// Función de fetch genérica
type FetchFunction<TParams, TResponse> = (params: TParams) => Promise<TResponse>;
```

## Instalación y Setup

### 1. Definir tipos para tu API

```typescript
// Tipos de parámetros que tu API espera
type ApiParams = {
  page_num: number;
  search?: string;
  status?: string;
};

// Tipo de respuesta de tu API
type ApiResponse = {
  items: Item[];
  total: number;
  page: number;
};
```

### 2. Crear función de fetch

```typescript
const fetchData = async (params: ApiParams): Promise<ApiResponse> => {
  const response = await fetch('/api/items?' + new URLSearchParams(params));
  return response.json();
};
```

### 3. Crear adaptador de parámetros

El adaptador transforma el estado interno a los parámetros específicos de tu API:

```typescript
const mapParams: MapParamsAdapter<ApiParams> = (state) => ({
  page_num: (state.page as number) || 1,
  search: state.textSearch as string | undefined,
  status: state.status as string | undefined,
});
```

### 4. Envolver tu aplicación

```tsx
import { ControlDataProvider } from '@/lib/ui-library/providers';

function App() {
  return (
    <ControlDataProvider<ApiParams, ApiResponse>
      fetchFn={fetchData}
      mapParams={mapParams}
      debounceMs={400}
    >
      <SearchFilter />
      <StatusFilter />
      <DataTable />
      <PaginationControls />
    </ControlDataProvider>
  );
}
```

## Uso en Componentes

### Hook de contexto

```typescript
import { useControlDataContext } from '@/lib/ui-library/providers';

function MyComponent() {
  const { 
    data,         // TResponse | null - datos de la API
    loading,      // boolean - estado de carga
    error,        // Error | null - error si ocurrió
    state,        // ControlDataState - estado interno actual
    applyToState, // función para modificar estado
    resetState,   // limpia todo el estado
    reload,       // fuerza recarga de datos
  } = useControlDataContext<ApiResponse>();
}
```

### Crear un Transformer

El transformer recibe dos argumentos:
1. **rawData**: El dato nuevo que quieres procesar
2. **previousValue**: El valor actual de esa key (undefined si no existe)

```typescript
import type { StateTransformer } from '@/lib/ui-library/providers';

// Transformer simple: reemplaza el valor
const searchTransformer: StateTransformer<string, string> = (value, _previous) => {
  return value.toUpperCase();
};

// Transformer con merge: combina con valor previo
type Filters = { search?: string; status?: string };
const filtersTransformer: StateTransformer<Partial<Filters>, Filters> = (newData, previous) => {
  return {
    ...previous,  // mantiene valores existentes
    ...newData    // sobrescribe/agrega nuevos
  };
};

// Transformer con toggle: invierte valor booleano previo
const toggleTransformer: StateTransformer<void, boolean> = (_, previous) => {
  return !previous;
};

// Transformer con append: agrega a array existente
const appendTransformer: StateTransformer<string, string[]> = (newItem, previous) => {
  return [...(previous || []), newItem];
};
```

### Aplicar cambios al estado

```typescript
function SearchFilter() {
  const { applyToState } = useControlDataContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    applyToState('textSearch', searchTransformer, e.target.value);
    //           ↑             ↑                  ↑
    //        Key del        Transformer        Dato de entrada
    //        estado
  };

  return <input onChange={handleChange} />;
}
```

## Ejemplos Completos

### Filtro de búsqueda

```typescript
const searchTransformer: StateTransformer<string, string> = (value, _prev) => {
  return value.trim().toLowerCase();
};

function SearchFilter() {
  const { applyToState } = useControlDataContext();

  return (
    <input
      type="text"
      onChange={(e) => applyToState('search', searchTransformer, e.target.value)}
      placeholder="Buscar..."
    />
  );
}
```

### Filtro de estado con select

```typescript
const statusTransformer: StateTransformer<string, string | undefined> = (value, _prev) => {
  return value || undefined; // undefined si está vacío (no enviar al API)
};

function StatusFilter() {
  const { applyToState } = useControlDataContext();

  return (
    <select onChange={(e) => applyToState('status', statusTransformer, e.target.value)}>
      <option value="">Todos</option>
      <option value="active">Activo</option>
      <option value="archived">Archivado</option>
    </select>
  );
}
```

### Paginación

```typescript
const pageTransformer: StateTransformer<number, number> = (value, _prev) => value;

function Pagination() {
  const { data, state, applyToState } = useControlDataContext<ApiResponse>();
  const currentPage = (state.page as number) || 1;

  return (
    <div>
      <button onClick={() => applyToState('page', pageTransformer, currentPage - 1)}>
        Anterior
      </button>
      <span>Página {currentPage}</span>
      <button onClick={() => applyToState('page', pageTransformer, currentPage + 1)}>
        Siguiente
      </button>
    </div>
  );
}
```

### Filtros con merge (valor previo)

```typescript
type FilterState = {
  dateFrom?: string;
  dateTo?: string;
  category?: string;
};

const mergeFilterTransformer: StateTransformer<Partial<FilterState>, FilterState> = 
  (newData, previous) => ({
    ...previous,
    ...newData,
  });

function DateFilter() {
  const { applyToState } = useControlDataContext();

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo actualiza dateFrom, mantiene dateTo y category
    applyToState('filters', mergeFilterTransformer, { dateFrom: e.target.value });
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo actualiza dateTo, mantiene dateFrom y category
    applyToState('filters', mergeFilterTransformer, { dateTo: e.target.value });
  };

  return (
    <>
      <input type="date" onChange={handleFromChange} />
      <input type="date" onChange={handleToChange} />
    </>
  );
}
```

## Props del Provider

| Prop | Tipo | Descripción |
|------|------|-------------|
| `fetchFn` | `FetchFunction<TParams, TResponse>` | Función async que llama a tu API |
| `mapParams` | `MapParamsAdapter<TParams>` | Transforma estado interno a parámetros de API |
| `debounceMs` | `number` (default: 400) | Milisegundos de espera antes de llamar API |
| `initialState` | `Partial<ControlDataState>` | Estado inicial opcional |

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                         ControlDataProvider                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐    ┌─────────────┐    ┌──────────┐    ┌────────┐  │
│  │ Component│───▶│ applyToState│───▶│  state   │───▶│debounce│  │
│  │   UI     │    │ (key,       │    │ {[key]:  │    │ 400ms  │  │
│  │          │    │  transformer│    │  value}  │    │        │  │
│  └──────────┘    │  rawData)   │    └──────────┘    └────┬───┘  │
│                  └─────────────┘                         │      │
│                         ▲                                ▼      │
│                         │                         ┌──────────┐  │
│                  previousValue                    │ mapParams│  │
│                                                   └────┬─────┘  │
│                                                        │        │
│                                                        ▼        │
│  ┌──────────┐                                   ┌──────────┐   │
│  │   data   │◀──────────────────────────────────│  fetchFn │   │
│  │ loading  │                                   │   API    │   │
│  │  error   │                                   └──────────┘   │
│  └──────────┘                                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Ventajas

1. **Agnóstico**: No conoce la estructura de datos de antemano
2. **Flexible**: Cada componente define sus propias keys y transformers
3. **Tipado**: TypeScript valida entrada y salida de transformers
4. **Merge**: Acceso al valor previo permite combinar datos
5. **Debounce**: Evita llamadas excesivas a la API
6. **Desacoplado**: Los componentes no dependen unos de otros
