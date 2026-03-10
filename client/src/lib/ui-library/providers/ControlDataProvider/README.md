# ControlDataProvider

Provider que conecta un state controlado con una función de fetch. Cada cambio en el state dispara automáticamente un re-fetch (con debounce configurable).

## Importación

```tsx
import { ControlDataProvider, useControlDataContext } from "@/lib/ui-library/providers/ControlDataProvider";
```

## Props del Provider

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `fetchFn` | `(params: TParams) => Promise<TResponse>` | requerido | Función que obtiene los datos |
| `mapParams` | `(state: ControlDataState) => TParams` | requerido | Transforma el state en los parámetros para `fetchFn` |
| `defaultState` | `Partial<ControlDataState>` | `{}` | Estado inicial del provider |
| `debounceMs` | `number` | `400` | Milisegundos de debounce antes de ejecutar el fetch |
| `mutuallyExclusive` | `StateKey[][]` | `undefined` | Grupos de keys mutuamente excluyentes. Al aplicar un key, los demás del grupo se eliminan del state |

## Contexto (useControlDataContext)

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `data` | `TData \| null` | Datos retornados por `fetchFn` |
| `loading` | `boolean` | Indica si hay un fetch en curso |
| `error` | `Error \| null` | Error del último fetch, o null |
| `state` | `ControlDataState` | Estado actual del provider |

## Acciones

| Función | Firma | Descripción |
|---------|-------|-------------|
| `applyToState` | `(key, transformer, rawData) => void` | Actualiza un key del state usando un transformer |
| `removeFromState` | `(key: string) => void` | Elimina un key individual del state (hace `delete` real, no pone `undefined`) |
| `resetState` | `() => void` | Vuelve al `defaultState` original |
| `clearState` | `() => void` | Limpia todo el state a `{}` |
| `reload` | `() => void` | Re-ejecuta el fetch con el state actual |

## Uso Básico

```tsx
<ControlDataProvider
  fetchFn={fetchTrips}
  mapParams={(state) => ({
    page: state.page ?? 1,
    search: state.search ?? "",
  })}
  defaultState={{ page: 1, search: "" }}
>
  <MyComponent />
</ControlDataProvider>
```

## Consumir el contexto

```tsx
function MyComponent() {
  const { data, loading, error, state, applyToState, removeFromState, resetState } =
    useControlDataContext<Trip[]>();

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error.message}</p>}
      {data?.map((trip) => <p key={trip.id}>{trip.name}</p>)}
    </div>
  );
}
```

## applyToState

Actualiza un key del state. El transformer recibe el dato crudo y el valor previo de ese key.

```tsx
applyToState("search", (rawValue, _prev) => rawValue, "laptop");

applyToState("filters", (newFilter, prevFilters) => ({
  ...prevFilters,
  ...newFilter,
}), { status: "active" });
```

## removeFromState

Elimina un key individual del state. Hace un `delete` real del key (no lo pone en `undefined`). Al modificar el state, se dispara el re-fetch automáticamente.

```tsx
removeFromState("search");

removeFromState("filters");
```

## mutuallyExclusive

Permite definir grupos de keys que son mutuamente excluyentes. Cuando se aplica un key con `applyToState`, todos los demás keys del mismo grupo se eliminan automáticamente del state.

```tsx
<ControlDataProvider
  fetchFn={fetchTrips}
  mapParams={adapter}
  mutuallyExclusive={[['date', 'dateRange']]}
>
  <MyComponent />
</ControlDataProvider>
```

En este ejemplo, si se hace `applyToState('dateRange', ...)`, el key `date` se elimina del state automáticamente, y viceversa. Se pueden definir múltiples grupos:

```tsx
mutuallyExclusive={[
  ['date', 'dateRange'],
  ['listView', 'gridView'],
]}
```

## resetState vs clearState

- **`resetState()`** — vuelve al `defaultState` que se pasó como prop
- **`clearState()`** — limpia todo a `{}`

```tsx
resetState();

clearState();
```

## Estructura de Archivos

```
ControlDataProvider/
├── index.ts                 # Exports públicos
├── index.provider.tsx       # Componente Provider
├── index.hook.ts            # useControlData + useControlDataContext
├── index.types.ts           # Tipos e interfaces
└── README.md
```
