# useAppendableState

**Archivo:** `useAppendableState.ts`

Hook para manejar arrays de estado con operaciones de agregado sin necesidad de conocer la data anterior. En lugar de usar `setData(prev => [...prev, ...newItems])`, simplemente se llama `append(newItems)`.

---

## Parametros

| Parametro | Tipo | Descripcion |
|-----------|------|-------------|
| `initialData` | `T[]` o `() => T[]` | Datos iniciales del array. Acepta valor directo o funcion lazy. |

## Retorno

```ts
const {
  data,     // T[] — el array actual
  setData,  // React.Dispatch<SetStateAction<T[]>> — control directo (uso excepcional)
  append,   // (newItems: T[]) => void — agrega items al final
  prepend,  // (newItems: T[]) => void — agrega items al inicio
  clear,    // () => void — vacia el array
  reset,    // (initialData: T[]) => void — reemplaza todo el array
} = useAppendableState<T>(initialData);
```

## Metodos

| Metodo | Descripcion |
|--------|-------------|
| `append(items)` | Agrega items al final del array |
| `prepend(items)` | Agrega items al inicio del array |
| `clear()` | Vacia el array completamente |
| `reset(data)` | Reemplaza todo el array con nueva data |
| `setData(...)` | Control directo del estado (para casos especiales como filtrar o transformar) |

## Ejemplo: Infinite Scroll

```tsx
import { useAppendableState } from '../hooks';

function InfiniteList() {
  const { data, append, reset } = useAppendableState(() => generateItems(1, 15));
  const [hasMore, setHasMore] = useState(true);

  const handleReachEnd = () => {
    const newItems = generateItems(data.length + 1, 15);
    append(newItems);

    if (data.length + 15 >= 100) {
      setHasMore(false);
    }
  };

  const handleReset = () => {
    reset(generateItems(1, 15));
    setHasMore(true);
  };

  return <Table data={data} onReachEnd={handleReachEnd} />;
}
```

## Ejemplo: Lista con prepend

```tsx
import { useAppendableState } from '../hooks';

function ChatMessages() {
  const { data, prepend, append } = useAppendableState<Message>([]);

  const loadOlderMessages = (older: Message[]) => {
    prepend(older);
  };

  const addNewMessage = (msg: Message) => {
    append([msg]);
  };

  return <MessageList messages={data} />;
}
```

## Importacion

Desde dentro de la biblioteca:
```ts
import { useAppendableState } from '../../hooks';
```

Desde el proyecto padre:
```ts
import { useAppendableState } from 'GC-UI-COMPONENTS/hooks';
```
