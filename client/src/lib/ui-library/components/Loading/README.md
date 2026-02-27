# Loading

Componente de carga configurable. Puede cubrir un componente individual o la pantalla completa. Se controla por props directas o con el `LoadingProvider`.

## Como funciona sobre un componente

El Loading **no recibe el componente como prop ni como children**. En su lugar, se coloca **dentro** del contenedor que se quiere cubrir. El mecanismo es:

1. El contenedor padre **debe tener** `position: relative`
2. El `<Loading>` se renderiza como hijo de ese contenedor
3. El Loading usa `position: absolute` con `inset: 0` para expandirse y cubrir todo el espacio del padre
4. El overlay (fondo semitransparente) y el spinner se posicionan centrados sobre el contenido existente

```
+----------------------------------+
|  Contenedor (position: relative) |
|                                  |
|   [Contenido del componente]     |
|                                  |
|   +----------------------------+ |
|   |  <Loading /> (absolute)    | |
|   |  cubre todo el contenedor  | |
|   +----------------------------+ |
+----------------------------------+
```

### Ejemplo basico

```tsx
import { Loading } from '@/lib/ui-library/components/Loading';

function MiComponente() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <h2>Mi contenido</h2>
      <p>Este texto queda debajo del overlay cuando isLoading es true.</p>

      {isLoading && (
        <Loading
          state="loading"
          overlay="transparent"
          coverage="component"
          size="md"
          label="Cargando..."
        />
      )}
    </div>
  );
}
```

### Ejemplo con una Card

```tsx
function ProductCard({ product, isLoading }) {
  return (
    <div style={{
      position: 'relative',
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 24,
    }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <span>${product.price}</span>

      {isLoading && (
        <Loading
          state="loading"
          overlay="light"
          coverage="component"
          size="sm"
        />
      )}
    </div>
  );
}
```

### Ejemplo con una tabla

```tsx
function UsersTable({ users, isLoading }) {
  return (
    <div style={{ position: 'relative', minHeight: 200 }}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && (
        <Loading
          state="loading"
          overlay="transparent"
          coverage="component"
          size="lg"
          label="Cargando usuarios..."
        />
      )}
    </div>
  );
}
```

## coverage: component vs fullscreen

| Valor | CSS generado | Comportamiento |
|-------|-------------|----------------|
| `'component'` | `position: absolute; inset: 0` | Cubre solo el contenedor padre que tenga `position: relative`. El padre debe tener tamanio definido o contenido visible. |
| `'fullscreen'` | `position: fixed; inset: 0` | Cubre toda la pantalla del navegador. No necesita `position: relative` en el padre. Bloquea toda interaccion con la pagina. |

### Cuando usar cada uno

- **`coverage="component"`**: Para cubrir una seccion especifica (una card, una tabla, un formulario, un panel). El usuario puede seguir interactuando con el resto de la pagina.
- **`coverage="fullscreen"`**: Para bloquear toda la pagina mientras se ejecuta una operacion critica (guardar, enviar, login). Normalmente se usa via el `LoadingProvider` con `useLoading()`.

## overlay: none (spinner inline)

Cuando `overlay` es `'none'`, el Loading **no aplica positioning** (`position: absolute/fixed`). Se renderiza como un elemento inline normal, sin fondo ni overlay. Util para mostrar un spinner suelto sin cubrir nada:

```tsx
<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
  <Loading state="loading" overlay="none" size="xs" />
  <Loading state="loading" overlay="none" size="sm" />
  <Loading state="loading" overlay="none" size="md" />
</div>
```

## Uso con Provider (pantalla completa)

El `LoadingProvider` envuelve tu app y expone el hook `useLoading()` para mostrar/ocultar un loading fullscreen desde cualquier componente sin pasar props:

```tsx
import { LoadingProvider, useLoading } from '@/lib/ui-library/providers';

function App() {
  return (
    <LoadingProvider defaultOverlay="light" defaultSize="lg">
      <MyComponent />
    </LoadingProvider>
  );
}

function MyComponent() {
  const { show, hide, isLoading } = useLoading();

  const handleSubmit = async () => {
    show({ label: 'Guardando...' });
    await saveData();
    hide();
  };
}
```

El provider renderiza internamente un `<Loading coverage="fullscreen" />` al final del arbol. No necesitas posicionar nada manualmente.

## Props del componente

| Prop       | Tipo                                           | Default         | Descripcion                              |
|------------|------------------------------------------------|-----------------|------------------------------------------|
| `state`    | `'loading' \| 'completed'`                     | `'loading'`     | Estado actual del loading                |
| `overlay`  | `'transparent' \| 'light' \| 'dark' \| 'none'` | `'transparent'` | Tipo de fondo del overlay                |
| `coverage` | `'component' \| 'fullscreen'`                  | `'component'`   | Si cubre un componente o toda la pantalla |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`        | `'md'`          | Tamano del spinner                       |
| `label`    | `string`                                       | `undefined`     | Texto debajo del spinner                 |
| `className`| `string`                                       | `undefined`     | Clase CSS adicional                      |

## Props del LoadingProvider

| Prop            | Tipo           | Default         | Descripcion                     |
|-----------------|----------------|-----------------|---------------------------------|
| `defaultOverlay`| `LoadingOverlay` | `'transparent'` | Overlay por defecto del provider |
| `defaultSize`   | `LoadingSize`    | `'lg'`          | Tamano por defecto del provider  |
| `defaultLabel`  | `string`         | `undefined`     | Label por defecto del provider   |

## API del hook useLoading()

| Propiedad   | Tipo                                | Descripcion                              |
|-------------|-------------------------------------|------------------------------------------|
| `isLoading` | `boolean`                           | Si el loading esta activo                |
| `show`      | `(config?: LoadingConfig) => void`  | Muestra el loading (puede sobreescribir config) |
| `hide`      | `() => void`                        | Oculta el loading                        |
| `config`    | `LoadingConfig`                     | Configuracion actual                     |

## Overlays

- **`transparent`**: Fondo blanco semitransparente (50% opacidad)
- **`light`**: Fondo blanco casi opaco (85% opacidad)
- **`dark`**: Fondo oscuro semitransparente (60% opacidad)
- **`none`**: Sin fondo, solo el spinner inline (no aplica positioning)

## Tamanos

| Size | Dimensiones | Border |
|------|-------------|--------|
| `xs` | 16x16       | 2px    |
| `sm` | 24x24       | 2.5px  |
| `md` | 36x36       | 3px    |
| `lg` | 48x48       | 3.5px  |
| `xl` | 64x64       | 4px    |

## Reglas importantes

1. Para `coverage="component"`: el padre **siempre** necesita `position: relative`. Sin esto, el Loading se posiciona respecto al ancestro posicionado mas cercano (o el body).
2. Para `coverage="fullscreen"`: no necesita `position: relative` en ningun padre.
3. Con `overlay="none"`: no se aplica positioning, el spinner se renderiza inline como cualquier elemento.
4. Cuando `state="completed"`: el componente retorna `null` (no renderiza nada).

## Demo

Disponible en `/components/loading`
