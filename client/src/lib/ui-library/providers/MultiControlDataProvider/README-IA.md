# MultiControlDataProvider

Wrapper que orquesta multiples instancias de `ControlDataProvider`, cada una con su propio `fetchFn`, `mapParams`, `state`, `data`, `loading` y `error` completamente aislados. Permite conectar varios componentes a fuentes de datos diferentes usando un solo provider, donde cada source opera de forma independiente sin afectar a los demas.

## Concepto

El `ControlDataProvider` original maneja **1 funcion de fetch → 1 respuesta → N componentes** que consumen los mismos datos. Si necesitas datos de fuentes diferentes (distintas APIs, distintos tipos de respuesta), el `MultiControlDataProvider` crea internamente una instancia aislada por cada source. Cada source tiene:

- Su propia funcion de fetch (`fetchFn`)
- Su propio adaptador de parametros (`mapParams`)
- Su propio estado interno (`state`)
- Su propio `data`, `loading`, `error`
- Su propio `applyToState`, `resetState`, `clearState`, `reload`

Cuando un componente modifica el state de un source, **solo ese source se recarga**. Los demas no se enteran.

## Tipos Principales

```typescript
type SourceConfig<TParams = unknown, TResponse = unknown> = {
  fetchFn: FetchFunction<TParams, TResponse>;
  mapParams: MapParamsAdapter<TParams>;
  defaultState?: Partial<ControlDataState>;
  debounceMs?: number;
};

type SourcesMap = {
  [sourceKey: string]: SourceConfig<any, any>;
};

type MultiControlDataProviderProps = {
  children: React.ReactNode;
  sources: SourcesMap;
};

type MultiControlDataContextValue = {
  getSource: <TData = unknown>(sourceKey: string) => ControlDataContextValue<TData>;
  getSources: () => string[];
};
```

## Instalacion y Setup

### 1. Definir tipos para cada source

```typescript
type ProductParams = { search: string; page: number; category?: string };
type ProductResponse = { items: Product[]; total: number };

type OrderParams = { search: string; page: number; status?: string };
type OrderResponse = { orders: Order[]; total: number };
```

### 2. Crear funciones de fetch para cada source

```typescript
const fetchProducts = async (params: ProductParams): Promise<ProductResponse> => {
  const response = await fetch('/api/products?' + new URLSearchParams(params as any));
  return response.json();
};

const fetchOrders = async (params: OrderParams): Promise<OrderResponse> => {
  const response = await fetch('/api/orders?' + new URLSearchParams(params as any));
  return response.json();
};
```

### 3. Envolver tu aplicacion

```tsx
import { MultiControlDataProvider } from '@/lib/ui-library/providers';

function App() {
  return (
    <MultiControlDataProvider
      sources={{
        products: {
          fetchFn: fetchProducts,
          mapParams: (state) => ({
            search: (state.search as string) || '',
            page: (state.page as number) || 1,
            category: state.category as string | undefined,
          }),
          defaultState: { page: 1, search: '' },
          debounceMs: 400,
        },
        orders: {
          fetchFn: fetchOrders,
          mapParams: (state) => ({
            search: (state.search as string) || '',
            page: (state.page as number) || 1,
            status: state.status as string | undefined,
          }),
          defaultState: { page: 1, search: '' },
          debounceMs: 300,
        },
      }}
    >
      <ProductsSection />
      <OrdersSection />
    </MultiControlDataProvider>
  );
}
```

## Uso en Componentes

### Hook principal: `useMultiControlData<TData>(sourceKey)`

Cada componente accede a su source especifico. El hook retorna exactamente la misma interfaz que `useControlDataContext` del `ControlDataProvider` original:

```typescript
import { useMultiControlData } from '@/lib/ui-library/providers';

function ProductsSection() {
  const {
    data,         // ProductResponse | null
    loading,      // boolean
    error,        // Error | null
    state,        // ControlDataState (solo de este source)
    applyToState, // modifica solo el state de 'products'
    resetState,   // resetea solo el state de 'products'
    clearState,   // limpia solo el state de 'products'
    reload,       // recarga solo 'products'
  } = useMultiControlData<ProductResponse>('products');

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Productos ({data?.total})</h2>
      {data?.items.map((p) => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}
```

```typescript
function OrdersSection() {
  const {
    data,
    loading,
    applyToState,
  } = useMultiControlData<OrderResponse>('orders');

  // Esto SOLO afecta al source 'orders', no toca 'products'
  const handleStatusChange = (status: string) => {
    applyToState('status', (value: string) => value, status);
  };

  return (
    <div>
      <h2>Ordenes ({data?.total})</h2>
      <select onChange={(e) => handleStatusChange(e.target.value)}>
        <option value="">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
      </select>
    </div>
  );
}
```

### Hook auxiliar: `useMultiControlDataSources()`

Retorna un array con los nombres de todos los sources registrados. Util para componentes que necesitan conocer los sources disponibles:

```typescript
import { useMultiControlDataSources } from '@/lib/ui-library/providers';

function SourceSelector() {
  const sources = useMultiControlDataSources();
  // ['orders', 'products'] (ordenados alfabeticamente)

  return (
    <div>
      {sources.map((key) => (
        <button key={key}>{key}</button>
      ))}
    </div>
  );
}
```

## Aislamiento de Estado

Cada source opera de forma completamente independiente. Esto significa:

| Accion | Efecto |
|--------|--------|
| `applyToState` en source A | Solo modifica el state de A. Solo A se recarga. B no se entera. |
| `resetState` en source A | Solo resetea el state de A a su `defaultState`. B mantiene su estado. |
| `clearState` en source A | Solo limpia el state de A a `{}`. B mantiene su estado. |
| `reload` en source A | Solo recarga A con su estado actual. B no se recarga. |

### Ejemplo de aislamiento

```tsx
function ProductFilter() {
  const { applyToState } = useMultiControlData<ProductResponse>('products');

  return (
    <input
      onChange={(e) => {
        // Solo modifica state.search de 'products'
        // Solo dispara fetch de 'products'
        // 'orders' no se entera
        applyToState('search', (v: string) => v.trim(), e.target.value);
      }}
    />
  );
}

function OrderFilter() {
  const { applyToState } = useMultiControlData<OrderResponse>('orders');

  return (
    <input
      onChange={(e) => {
        // Solo modifica state.search de 'orders'
        // Solo dispara fetch de 'orders'
        // 'products' no se entera
        applyToState('search', (v: string) => v.trim(), e.target.value);
      }}
    />
  );
}
```

## Uso con Transformers

Los transformers funcionan exactamente igual que en el `ControlDataProvider` original. Cada source tiene su propio state independiente, asi que los transformers operan sobre el state de ese source:

```typescript
import type { StateTransformer } from '@/lib/ui-library/providers';

const searchTransformer: StateTransformer<string, string> = (value, _prev) => {
  return value.trim().toLowerCase();
};

const pageTransformer: StateTransformer<number, number> = (value, _prev) => value;

type FilterState = { dateFrom?: string; dateTo?: string };
const mergeFilterTransformer: StateTransformer<Partial<FilterState>, FilterState> = (newData, prev) => ({
  ...prev,
  ...newData,
});

function ProductControls() {
  const { applyToState, state } = useMultiControlData<ProductResponse>('products');
  const currentPage = (state.page as number) || 1;

  return (
    <>
      <input
        placeholder="Buscar productos..."
        onChange={(e) => applyToState('search', searchTransformer, e.target.value)}
      />
      <button onClick={() => applyToState('page', pageTransformer, currentPage + 1)}>
        Siguiente pagina
      </button>
    </>
  );
}
```

## Props del Provider

### `MultiControlDataProviderProps`

| Prop | Tipo | Requerida | Descripcion |
|------|------|-----------|-------------|
| `sources` | `SourcesMap` | Si | Mapa de configuracion de cada source. Cada key es el nombre del source, cada valor su configuracion. |
| `children` | `ReactNode` | Si | Componentes hijos que consumiran los sources. |

### `SourceConfig<TParams, TResponse>`

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `fetchFn` | `FetchFunction<TParams, TResponse>` | - | Funcion async que llama a la API de este source. |
| `mapParams` | `MapParamsAdapter<TParams>` | - | Transforma el state interno de este source a los parametros de su API. |
| `defaultState` | `Partial<ControlDataState>` | `{}` | Estado inicial de este source. Se usa como valor de retorno de `resetState()`. |
| `debounceMs` | `number` | `400` | Milisegundos de espera antes de llamar a la API despues de un cambio de state. |

## Hooks Disponibles

| Hook | Retorno | Descripcion |
|------|---------|-------------|
| `useMultiControlData<TData>(sourceKey)` | `ControlDataContextValue<TData>` | Accede a un source especifico. Retorna la misma interfaz que `useControlDataContext`. |
| `useMultiControlDataSources()` | `string[]` | Lista los nombres de todos los sources registrados. |

## Metodos del Contexto por Source

Cada source expone exactamente los mismos metodos que el `ControlDataProvider` original:

| Metodo | Descripcion |
|--------|-------------|
| `applyToState(key, transformer, rawData)` | Modifica una key del state de este source usando un transformer. Dispara recarga solo de este source. |
| `resetState()` | Regresa el state de este source a su `defaultState`. |
| `clearState()` | Limpia el state de este source a `{}`. |
| `reload()` | Fuerza una recarga de datos de este source con su estado actual. |

## Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────┐
│                     MultiControlDataProvider                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────┐                               │
│  │ Source: 'products'               │  ← instancia aislada         │
│  │  state: { search, page }        │                               │
│  │  fetchFn: fetchProducts          │                               │
│  │  data: ProductResponse           │                               │
│  │  loading / error                 │                               │
│  └──────────────────────────────────┘                               │
│                                                                     │
│  ┌──────────────────────────────────┐                               │
│  │ Source: 'orders'                 │  ← instancia aislada         │
│  │  state: { search, page, status } │                               │
│  │  fetchFn: fetchOrders            │                               │
│  │  data: OrderResponse             │                               │
│  │  loading / error                 │                               │
│  └──────────────────────────────────┘                               │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │ Children                                                     │   │
│  │  ProductFilter → applyToState → solo 'products' se recarga  │   │
│  │  OrderFilter   → applyToState → solo 'orders' se recarga   │   │
│  │  ProductGrid   → useMultiControlData('products')            │   │
│  │  OrderList     → useMultiControlData('orders')              │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Ejemplo Completo

```tsx
import { useState, type ComponentType } from 'react';
import { MultiControlDataProvider, useMultiControlData } from '@/lib/ui-library/providers';
import type { StateTransformer } from '@/lib/ui-library/providers';

type Product = { id: string; name: string; price: number };
type ProductResponse = { items: Product[]; total: number };

type Order = { id: string; customer: string; total: number; status: string };
type OrderResponse = { orders: Order[]; total: number };

const searchTransformer: StateTransformer<string, string> = (v) => v.trim();
const pageTransformer: StateTransformer<number, number> = (v) => v;

const fetchProducts = async (params: { search: string; page: number }): Promise<ProductResponse> => {
  const res = await fetch(`/api/products?search=${params.search}&page=${params.page}`);
  return res.json();
};

const fetchOrders = async (params: { search: string; page: number }): Promise<OrderResponse> => {
  const res = await fetch(`/api/orders?search=${params.search}&page=${params.page}`);
  return res.json();
};

function ProductPanel() {
  const { data, loading, state, applyToState } = useMultiControlData<ProductResponse>('products');
  const page = (state.page as number) || 1;

  return (
    <div>
      <h2>Productos ({data?.total ?? 0})</h2>
      <input
        placeholder="Buscar productos..."
        onChange={(e) => applyToState('search', searchTransformer, e.target.value)}
      />
      {loading && <p>Cargando...</p>}
      {data?.items.map((p) => (
        <div key={p.id}>{p.name} - ${p.price}</div>
      ))}
      <button onClick={() => applyToState('page', pageTransformer, page + 1)}>
        Siguiente
      </button>
    </div>
  );
}

function OrderPanel() {
  const { data, loading, state, applyToState } = useMultiControlData<OrderResponse>('orders');
  const page = (state.page as number) || 1;

  return (
    <div>
      <h2>Ordenes ({data?.total ?? 0})</h2>
      <input
        placeholder="Buscar ordenes..."
        onChange={(e) => applyToState('search', searchTransformer, e.target.value)}
      />
      {loading && <p>Cargando...</p>}
      {data?.orders.map((o) => (
        <div key={o.id}>{o.customer} - ${o.total} ({o.status})</div>
      ))}
      <button onClick={() => applyToState('page', pageTransformer, page + 1)}>
        Siguiente
      </button>
    </div>
  );
}

function Dashboard() {
  return (
    <MultiControlDataProvider
      sources={{
        products: {
          fetchFn: fetchProducts,
          mapParams: (state) => ({
            search: (state.search as string) || '',
            page: (state.page as number) || 1,
          }),
          defaultState: { page: 1, search: '' },
        },
        orders: {
          fetchFn: fetchOrders,
          mapParams: (state) => ({
            search: (state.search as string) || '',
            page: (state.page as number) || 1,
          }),
          defaultState: { page: 1, search: '' },
          debounceMs: 300,
        },
      }}
    >
      <div style={{ display: 'flex', gap: '24px' }}>
        <ProductPanel />
        <OrderPanel />
      </div>
    </MultiControlDataProvider>
  );
}
```

## Relacion con ControlDataProvider

| Aspecto | ControlDataProvider | MultiControlDataProvider |
|---------|---------------------|--------------------------|
| Sources | 1 sola funcion fetch | N funciones fetch independientes |
| Estado | 1 state compartido | N states aislados (uno por source) |
| Data | 1 respuesta compartida | N respuestas independientes (cada una con su tipo) |
| Hook | `useControlDataContext<T>()` | `useMultiControlData<T>(sourceKey)` |
| Aislamiento | Todos los componentes comparten todo | Cada source es completamente independiente |
| Uso recomendado | Cuando todos los componentes consumen la misma API | Cuando necesitas conectar componentes a APIs diferentes |

## Restricciones Importantes

### Las keys de sources no pueden cambiar en runtime

Las keys del objeto `sources` (los nombres de los sources) deben permanecer constantes despues del montaje. Si se detecta un cambio de keys, el provider lanza un error:

```
MultiControlDataProvider: source keys must not change after mount.
Initial: [orders, products], Current: [orders, products, users].
If you need different sources, unmount and remount the provider with a new key.
```

Si necesitas cambiar los sources dinamicamente, desmonta y remonta el provider con un `key` diferente en React:

```tsx
<MultiControlDataProvider key={activeSourceSet} sources={currentSources}>
  {children}
</MultiControlDataProvider>
```

Esto es por diseno: como cada source crea un hook interno, cambiar las keys romperia las reglas de hooks de React.

## Arquitectura Interna

El `MultiControlDataProvider` usa un patron de **anidamiento recursivo** con `SourceLayer`. Por cada source configurado, crea un componente `SourceLayer` que:

1. Llama a `useControlData()` (el hook interno del `ControlDataProvider` original)
2. Registra el resultado en un `Map<string, ControlDataContextValue>` compartido
3. Renderiza el siguiente `SourceLayer` o los `children` si es el ultimo

Esto garantiza que cada hook se llama en su propio componente React, respetando las reglas de hooks. Los sources se ordenan alfabeticamente para mantener un orden estable de hooks.

`getSources()` retorna las keys derivadas del prop `sources` (no del Map interno), lo que garantiza que siempre refleja los sources configurados.

## Estructura de Archivos

```
MultiControlDataProvider/
├── index.types.ts     # Tipos: SourceConfig, SourcesMap, props
├── index.hook.ts      # Hooks: useMultiControlData, useMultiControlDataSources
├── index.provider.tsx # Componente: MultiControlDataProvider, SourceLayer
├── index.ts           # Barrel exports
└── README-IA.md       # Este archivo
```
