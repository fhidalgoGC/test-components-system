# Loading

Componente de carga configurable. Puede cubrir un componente individual o la pantalla completa. Se controla por props directas o con el `LoadingProvider`.

## Uso directo (a nivel de componente)

```tsx
import { Loading } from '@/lib/ui-library/components/Loading';

<div style={{ position: 'relative' }}>
  <p>Contenido del componente</p>
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
```

El contenedor padre debe tener `position: relative` para que el loading se posicione correctamente sobre el.

## Uso con Provider (pantalla completa)

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
- **`none`**: Sin fondo, solo el spinner (no aplica positioning)

## Tamanos

| Size | Dimensiones | Border |
|------|-------------|--------|
| `xs` | 16x16       | 2px    |
| `sm` | 24x24       | 2.5px  |
| `md` | 36x36       | 3px    |
| `lg` | 48x48       | 3.5px  |
| `xl` | 64x64       | 4px    |

## Demo

Disponible en `/components/loading`
