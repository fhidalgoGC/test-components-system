# Loading

Componente de carga configurable. Puede cubrir un componente individual o la pantalla completa. Se controla por props directas o con el `LoadingProvider`. Soporta spinner por defecto o componente custom. Los textos visibles usan el estandar `labelI18n` para soporte multilenguaje automatico.

## Estructura interna

```
Loading/
├── components/
│   └── self/                        # Spinner por defecto (renderType: 'self')
│       ├── css/
│       │   └── SelfSpinner.module.css
│       ├── hooks/
│       │   ├── useI18nMerge.hook.ts # Hook i18n local + global
│       │   └── index.ts
│       ├── i18n/
│       │   ├── en.json              # Traducciones ingles
│       │   ├── es.json              # Traducciones espanol
│       │   └── index.ts             # localDictionaries + getLocalDict
│       ├── providers/
│       │   ├── SelfSpinner.provider.tsx  # Context con t() y lang
│       │   └── index.ts
│       ├── types/
│       │   ├── SelfSpinner.type.ts  # Props + Context interfaces
│       │   └── index.ts
│       ├── views/
│       │   ├── SelfSpinner.view.tsx  # Vista del spinner
│       │   └── index.ts
│       ├── SelfSpinner.tsx          # Wrapper: Provider + View
│       └── index.ts                 # Barrel exports
├── web/
│   ├── css/Loading.module.css       # Estilos del wrapper/overlay/coverage
│   ├── types/Loading.type.ts        # Tipos del componente
│   └── views/Loading.view.tsx       # Vista principal
├── index.tsx                        # Barrel exports
└── README.md
```

### Patron i18n del SelfSpinner

El `SelfSpinner` sigue el patron estandar de componentes con i18n:

1. **i18n/**: Archivos JSON con traducciones locales (`en.json`, `es.json`) y `getLocalDict(lang)` para seleccionar el diccionario correcto.
2. **hooks/useI18nMerge**: Combina traducciones locales del componente con traducciones globales del `LibI18nProvider`. Soporta prioridad configurable (`local-first` o `global-first`).
3. **providers/SelfSpinner.provider**: Crea el contexto con `t()` (funcion traductora) y `lang` (idioma activo). Usa `useI18nMerge` internamente.
4. **views/SelfSpinner.view**: Consume el contexto via `useSelfSpinnerContext()` para obtener `lang` y resolver `labelI18n`.
5. **SelfSpinner.tsx**: Wrapper que envuelve la vista dentro del provider.

```tsx
// El wrapper conecta provider + view
<SelfSpinnerProvider langOverride={langOverride} i18nOrder={i18nOrder}>
  <SelfSpinnerView size={size} labelI18n={labelI18n} overlay={overlay} />
</SelfSpinnerProvider>
```

Las traducciones locales (`i18n/en.json`, `i18n/es.json`) incluyen textos internos del spinner. El `labelI18n` externo (pasado como prop) se resuelve con `resolveMultiLanguageLabel` usando el `lang` del contexto.

## renderType: self vs component

El Loading tiene dos modos de renderizado controlados por `renderType`:

### renderType: 'self' (default)

Usa el componente `SelfSpinner` ubicado en `components/self/`. Es el spinner circular animado que viene por defecto con la libreria.

```tsx
<Loading
  state="loading"
  overlay="transparent"
  coverage="component"
  size="md"
  labelI18n={{ en: 'Loading...', es: 'Cargando...', default: 'Loading...' }}
/>
```

### renderType: 'component'

Renderiza cualquier componente custom que le pases en el prop `render`. El componente se muestra centrado dentro del overlay.

```tsx
<Loading
  state="loading"
  overlay="light"
  coverage="component"
  renderType="component"
  render={<MiSkeletonCustom />}
/>
```

```tsx
<Loading
  state="loading"
  overlay="transparent"
  coverage="component"
  renderType="component"
  render={
    <div style={{ display: 'flex', gap: 8 }}>
      <div className="pulse-dot" />
      <div className="pulse-dot" />
      <div className="pulse-dot" />
    </div>
  }
/>
```

En ambos casos el overlay, coverage y centrado funcionan igual. Solo cambia que se muestra en el centro.

## labelI18n

El prop `labelI18n` acepta un `string` simple o un `MultiLanguageLabel` para traduccion automatica segun el idioma activo:

```tsx
// String simple (no traducible)
<Loading labelI18n="Cargando..." />

// MultiLanguageLabel (traducible)
<Loading
  labelI18n={{
    en: 'Loading data...',
    es: 'Cargando datos...',
    default: 'Loading data...',
  }}
/>
```

El `SelfSpinner` usa `LibI18nContext` para obtener el idioma activo y `resolveMultiLanguageLabel` para resolver el texto. El label se actualiza automaticamente cuando el usuario cambia de idioma.

Ver documentacion completa del estandar en `client/src/docs/props/labelI18n.md`.

## Como funciona sobre un componente

El Loading se coloca **dentro** del contenedor que se quiere cubrir:

1. El contenedor padre **debe tener** `position: relative`
2. El `<Loading>` se renderiza como hijo de ese contenedor
3. El Loading usa `position: absolute` con `inset: 0` para cubrir todo el espacio del padre

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

### Ejemplo con una Card

```tsx
function ProductCard({ product, isLoading }) {
  return (
    <div style={{ position: 'relative', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24 }}>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      {isLoading && (
        <Loading state="loading" overlay="light" coverage="component" size="sm" />
      )}
    </div>
  );
}
```

## coverage: component vs fullscreen

| Valor | CSS generado | Comportamiento |
|-------|-------------|----------------|
| `'component'` | `position: absolute; inset: 0` | Cubre solo el contenedor padre con `position: relative`. |
| `'fullscreen'` | `position: fixed; inset: 0` | Cubre toda la pantalla. No necesita `position: relative` en el padre. |

## overlay: none (spinner inline)

Cuando `overlay` es `'none'`, el Loading no aplica positioning. Se renderiza como un elemento inline:

```tsx
<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
  <Loading state="loading" overlay="none" size="xs" />
  <Loading state="loading" overlay="none" size="md" />
</div>
```

## Uso con Provider

El `LoadingProvider` centraliza el control del loading. Desde cualquier componente hijo, llamas `show()` y `hide()` sin poner `<Loading>` manualmente.

### Fullscreen (sin parentRef)

```tsx
const { show, hide } = useLoading();

show({
  overlay: 'light',
  labelI18n: { en: 'Saving...', es: 'Guardando...', default: 'Saving...' },
});
await saveData();
hide();
```

### Sobre un componente especifico (con parentRef)

Pasas una referencia al elemento padre y el provider inyecta el loading dentro via `createPortal`:

```tsx
const cardRef = useRef<HTMLDivElement>(null);
const { show, hide } = useLoading();

show({
  parentRef: cardRef,
  overlay: 'transparent',
  labelI18n: { en: 'Loading data...', es: 'Cargando datos...', default: 'Loading data...' },
});

// En el JSX
<div ref={cardRef}>
  <h2>Mi Card</h2>
  <p>Contenido...</p>
</div>
```

El provider automaticamente:
- Asigna `position: relative` al padre si no lo tiene
- Renderiza el loading dentro del padre via `createPortal`
- Restaura el `position` original del padre cuando llamas `hide()`

### Cambiar la referencia dinamicamente

Puedes cambiar el `parentRef` en cada llamada a `show()`:

```tsx
const card1Ref = useRef<HTMLDivElement>(null);
const card2Ref = useRef<HTMLDivElement>(null);
const { show, hide } = useLoading();

// Loading sobre card 1
show({ parentRef: card1Ref });

// Despues, loading sobre card 2
show({ parentRef: card2Ref });

// O fullscreen (sin parentRef)
show({
  overlay: 'dark',
  labelI18n: { en: 'Signing out...', es: 'Cerrando sesion...', default: 'Signing out...' },
});
```

### Provider con componente custom

Puedes combinar `parentRef` con `renderType: 'component'`:

```tsx
show({
  parentRef: miCardRef,
  renderType: 'component',
  render: <MiSkeletonCustom />,
});
```

### Setup del Provider

```tsx
import { LoadingProvider, useLoading } from '@/lib/ui-library/providers';

function App() {
  return (
    <LoadingProvider
      defaultOverlay="light"
      defaultSize="lg"
      defaultLabelI18n={{ en: 'Loading...', es: 'Cargando...', default: 'Loading...' }}
    >
      <MyComponent />
    </LoadingProvider>
  );
}
```

## Props del componente

| Prop         | Tipo                                           | Default         | Descripcion                              |
|--------------|-------------------------------------------------|-----------------|------------------------------------------|
| `state`      | `'loading' \| 'completed'`                     | `'loading'`     | Estado actual del loading                |
| `overlay`    | `'transparent' \| 'light' \| 'dark' \| 'none'` | `'transparent'` | Tipo de fondo del overlay                |
| `coverage`   | `'component' \| 'fullscreen'`                  | `'component'`   | Si cubre un componente o toda la pantalla |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`        | `'md'`          | Tamano del spinner (solo renderType self) |
| `renderType` | `'self' \| 'component'`                        | `'self'`        | Modo de renderizado del contenido         |
| `render`     | `ReactNode`                                    | `undefined`     | Componente custom (renderType component)  |
| `labelI18n`  | `LabelOrMultiLanguage`                         | `undefined`     | Texto debajo del spinner (solo renderType self). Acepta string o MultiLanguageLabel. |
| `className`  | `string`                                       | `undefined`     | Clase CSS adicional                      |

## Props del LoadingProvider

| Prop              | Tipo                   | Default         | Descripcion                     |
|-------------------|------------------------|-----------------|---------------------------------|
| `defaultOverlay`  | `LoadingOverlay`       | `'transparent'` | Overlay por defecto del provider |
| `defaultSize`     | `LoadingSize`          | `'lg'`          | Tamano por defecto del provider  |
| `defaultLabelI18n`| `LabelOrMultiLanguage` | `undefined`     | Label por defecto del provider. Acepta string o MultiLanguageLabel. |

## API del hook useLoading()

| Propiedad   | Tipo                                | Descripcion                              |
|-------------|-------------------------------------|------------------------------------------|
| `isLoading` | `boolean`                           | Si el loading esta activo                |
| `show`      | `(config?: LoadingConfig) => void`  | Muestra el loading con config opcional   |
| `hide`      | `() => void`                        | Oculta el loading y restaura el padre    |
| `config`    | `LoadingConfig`                     | Configuracion actual                     |

## LoadingConfig (para show())

| Prop         | Tipo                         | Descripcion                              |
|--------------|------------------------------|------------------------------------------|
| `overlay`    | `LoadingOverlay`             | Overlay del loading                      |
| `size`       | `LoadingSize`                | Tamano del spinner                       |
| `labelI18n`  | `LabelOrMultiLanguage`       | Texto debajo del spinner. Acepta string o MultiLanguageLabel. |
| `renderType` | `'self' \| 'component'`      | Modo de renderizado                      |
| `render`     | `ReactNode`                  | Componente custom                        |
| `parentRef`  | `RefObject<HTMLElement>`     | Referencia al padre (component) o nada (fullscreen) |

## Overlays

- **`transparent`**: Fondo blanco semitransparente (50% opacidad)
- **`light`**: Fondo blanco casi opaco (85% opacidad)
- **`dark`**: Fondo oscuro semitransparente (60% opacidad)
- **`none`**: Sin fondo, solo el contenido inline (no aplica positioning)

## Tamanos (solo renderType: self)

| Size | Dimensiones | Border |
|------|-------------|--------|
| `xs` | 16x16       | 2px    |
| `sm` | 24x24       | 2.5px  |
| `md` | 36x36       | 3px    |
| `lg` | 48x48       | 3.5px  |
| `xl` | 64x64       | 4px    |

## Reglas importantes

1. Para `coverage="component"`: el padre necesita `position: relative`. Con el provider y `parentRef`, esto se asigna automaticamente.
2. Para `coverage="fullscreen"`: no necesita `position: relative`.
3. Con `overlay="none"`: no se aplica positioning, el contenido se renderiza inline.
4. Cuando `state="completed"`: el componente retorna `null`.
5. Con `renderType: 'component'`: el contenido custom siempre se renderiza centrado dentro del overlay.
6. La referencia `parentRef` se puede cambiar en cada `show()`. El provider limpia la referencia anterior automaticamente.
7. El elemento referenciado por `parentRef` debe estar montado en el DOM antes de llamar `show()`. Si `parentRef.current` es `null` al momento de la llamada, el loading se comporta como fullscreen.
8. `labelI18n` solo se muestra con `renderType: 'self'`. Se resuelve automaticamente segun el idioma activo via `LibI18nContext`.

## Demo

Disponible en `/components/loading`
