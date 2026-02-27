# renderType y render — Estandar de renderizado interno vs custom

Los props `renderType` y `render` son el estandar que usamos en los componentes de la libreria para controlar que se renderiza en una zona visual del componente. El componente decide si muestra su visual interno por defecto o un componente custom que le pasa la aplicacion padre.

## Interfaz base

```ts
interface RenderConfig {
  renderType: 'self' | 'component';
  render?: ReactNode | ((item: any, index: number) => ReactNode);
}
```

Esta es la interfaz conceptual. Cada componente define su propia variante con tipos mas especificos para `render`.

## Propiedades

### renderType

Define el modo de renderizado.

| Valor         | Descripcion                                                                                      |
|---------------|--------------------------------------------------------------------------------------------------|
| `'self'`      | Usa el componente visual interno que viene por defecto con la libreria. **(default en la mayoria de componentes)** |
| `'component'` | Renderiza el componente custom que se pasa en el prop `render`.                                   |

Algunos componentes usan variantes:
- Grid `item` solo acepta `renderType: 'component'` (no tiene variante `self` para items).
- FloatingMenu `header`/`footer` usan `'component' | 'none'` en lugar de `'self' | 'component'`.

### render

El componente custom a renderizar cuando `renderType: 'component'`. Su tipo depende del contexto:

| Contexto                      | Tipo de render                           |
|-------------------------------|------------------------------------------|
| Props directas (Loading)      | `ReactNode`                              |
| Items de datos (Grid, List)   | `(item: T, index: number) => ReactNode`  |
| Items de AcordionList         | `ComponentType<{ itemData: R }>`         |
| Secciones (FloatingMenu)      | `() => ReactNode`                        |
| Estados (Modal, Grid, List)   | `ReactNode \| ComponentType`             |

## Como funciona

### renderType: 'self'

Cuando `renderType` es `'self'`, el componente usa su visual interno. Este visual esta ubicado en la carpeta `components/self/` dentro de la estructura del componente. La convencion de nombre es `Self` + el nombre descriptivo del visual.

```
MiComponente/
├── components/
│   └── self/
│       ├── SelfSpinner.tsx        # Visual interno del Loading
│       ├── SelfSpinner.module.css
│       └── index.ts
├── web/
│   └── views/MiComponente.view.tsx
└── index.tsx
```

El componente `Self*` es un componente React normal que recibe props del componente padre y renderiza la UI por defecto. El componente padre le pasa las props relevantes (tamano, label, estado, etc.).

```tsx
// components/self/SelfSpinner.tsx
export function SelfSpinner({ size, label, overlay }: SelfSpinnerProps) {
  return (
    <>
      <div className={spinnerClasses} />
      {label && <span className={labelClasses}>{label}</span>}
    </>
  );
}
```

### renderType: 'component'

Cuando `renderType` es `'component'`, el componente ignora su visual interno y renderiza lo que se pasa en `render`. El componente padre se encarga del posicionamiento y centrado; el `render` solo aporta el contenido visual.

```tsx
const renderContent = () => {
  if (renderType === 'component' && render) {
    return render;
  }
  return <SelfSpinner size={size} label={label} />;
};
```

## Ejemplos de uso por componente

### Loading — renderType en props directas

```tsx
// renderType: 'self' (default) — usa SelfSpinner interno
<Loading
  state="loading"
  overlay="transparent"
  coverage="component"
  size="md"
/>

// renderType: 'component' — usa componente custom
<Loading
  state="loading"
  overlay="light"
  coverage="component"
  renderType="component"
  render={<MiSkeletonLoader />}
/>
```

Props: `renderType?: 'self' | 'component'`, `render?: ReactNode`.

### Grid — item siempre es component

El `item` de Grid solo acepta `renderType: 'component'`. No tiene variante `self` para items porque cada grilla necesita su propio visual.

```tsx
<Grid
  data={products}
  item={{
    renderType: 'component',
    render: (item, index) => <ProductCard product={item} />,
  }}
/>
```

Los `statesComponents` de Grid si aceptan `'self' | 'component'`:

```tsx
<Grid
  data={products}
  item={{ renderType: 'component', render: (item) => <Card {...item} /> }}
  statesComponents={{
    loading: { renderType: 'self' },
    empty: { renderType: 'component', render: <EmptyState /> },
  }}
/>
```

Props: `item.renderType: 'component'` (solo), `statesComponents.*.renderType: 'self' | 'component'`.

### List — loading y empty con renderType

List tiene `item` (solo `'component'`) y configs separadas para `loading` y `empty`:

```tsx
<List
  id="mi-lista"
  data={items}
  item={{
    renderType: 'component',
    render: (item, index) => <ListItem data={item} />,
  }}
  loading={{
    renderType: 'self',
    position: 'bottom',
  }}
  empty={{
    renderType: 'component',
    render: <NoDataMessage />,
  }}
/>
```

Props: `item.renderType: 'component'` (solo), `loading.renderType?: 'self' | 'component'`, `empty.renderType?: 'self' | 'component'`.

### AcordionList — header self con getHeaderLabel

El header del AcordionList acepta `'self' | 'component'`. Cuando es `'self'`, usa `getHeaderLabel` para generar el texto del header:

```tsx
<AcordionList
  id="mi-acordion"
  data={sections}
  getItemId={(item, i) => item.id}
  getItemData={(item) => item}
  itemHeader={{
    renderType: 'self',
    getHeaderLabel: (item) => item.name,
    arrowPosition: 'right',
  }}
  itemBody={{
    renderType: 'component',
    render: SectionContent,
  }}
/>
```

El `itemBody` solo acepta `renderType: 'component'`. El `render` del body es un `ComponentType<{ itemData: R }>`.

Los `statesComponents` tambien aceptan `'self' | 'component'`:

```tsx
statesComponents={{
  loading: { renderType: 'self' },
  empty: { renderType: 'component', render: <SinSecciones /> },
}}
```

Props: `itemHeader.renderType: 'self' | 'component'`, `itemBody.renderType: 'component'` (solo).

### Modal — statesComponents

El Modal usa `statesComponents` para definir el visual de cada estado:

```tsx
<Modal
  isOpen={true}
  state="idle"
  statesComponents={{
    loading: { renderType: 'self' },
    empty: { renderType: 'self' },
    idle: {
      renderType: 'component',
      render: <FormularioCompleto />,
    },
  }}
/>
```

Props: `statesComponents.*.renderType: 'self' | 'component'`, `statesComponents.*.render?: ReactNode`.

### FloatingMenu — header/footer con component/none

FloatingMenu usa `'component' | 'none'` (no `'self'`) para sus secciones header/footer. Los items usan `render` directamente sin `renderType`:

```tsx
<FloatingMenu
  items={[
    { id: '1', render: (item) => <MenuItem label="Opcion 1" /> },
    { id: '2', render: (item) => <MenuItem label="Opcion 2" /> },
  ]}
  header={{
    renderType: 'component',
    render: () => <MenuHeader />,
  }}
  footer={{
    renderType: 'none',
  }}
/>
```

Props: `header.renderType?: 'component' | 'none'`, `items[].render: (item) => ReactNode`.

### LoadingProvider — renderType en show()

El provider acepta `renderType` y `render` en la config de `show()`:

```tsx
const { show, hide } = useLoading();

show({
  renderType: 'component',
  render: <MiAnimacionDeCarga />,
  parentRef: miCardRef,
});
```

Se propaga al `<Loading>` interno.

## Convencion de la carpeta self

Cuando un componente implementa `renderType: 'self'`, su visual interno debe estar en:

```
components/self/
├── Self{Nombre}.tsx           # Componente visual
├── Self{Nombre}.module.css    # Estilos del visual (si los necesita)
└── index.ts                   # Barrel export
```

El nombre del componente sigue la convencion `Self` + nombre descriptivo de lo que renderiza:

| Componente padre | Componente self     | Que renderiza                    |
|------------------|---------------------|----------------------------------|
| Loading          | `SelfSpinner`       | Spinner circular animado         |

A medida que mas componentes implementen visuales `self`, esta tabla se expande.

## Reglas del render

### El render como ReactNode

Cuando `render` es un `ReactNode`, se pasa el JSX directamente:

```tsx
{
  renderType: 'component',
  render: <MiComponente prop1="valor" />
}
```

### El render como funcion

Cuando el componente maneja datos (Grid, List), `render` es una funcion que recibe el item actual y su indice:

```tsx
{
  renderType: 'component',
  render: (item, index) => <Card title={item.name} />
}
```

### El render como ComponentType

En AcordionList, `render` es un componente que recibe `{ itemData }` como prop:

```tsx
{
  renderType: 'component',
  render: MiComponente  // recibe { itemData: R }
}
```

El tipo exacto de `render` depende del componente. Consultar los tipos del componente especifico para ver la firma.

## Componentes que lo implementan

| Componente       | Donde se usa            | Valores de renderType        | Tipo de render                    | Notas                                   |
|------------------|-------------------------|------------------------------|-----------------------------------|-----------------------------------------|
| `Loading`        | Props directas          | `'self' \| 'component'`     | `ReactNode`                       | Tiene `SelfSpinner` en `components/self/` |
| `Grid`           | `item`                  | Solo `'component'`           | `(item, index) => ReactNode`      | Items siempre son custom                 |
| `Grid`           | `statesComponents.*`    | `'self' \| 'component'`     | `ReactNode \| ComponentType`      | Estados de loading, empty, error         |
| `List`           | `item`                  | Solo `'component'`           | `(item, index) => ReactNode`      | Items siempre son custom                 |
| `List`           | `loading`, `empty`      | `'self' \| 'component'`     | `ReactNode \| ComponentType`      | Configs separadas por estado             |
| `AcordionList`   | `itemHeader`            | `'self' \| 'component'`     | `ComponentType<{itemData: R}>`    | Self usa `getHeaderLabel`                |
| `AcordionList`   | `itemBody`              | Solo `'component'`           | `ComponentType<{itemData: R}>`    | Body siempre es custom                   |
| `AcordionList`   | `statesComponents.*`    | `'self' \| 'component'`     | `ReactNode`                       | Estados de loading, empty, error         |
| `Modal`          | `statesComponents.*`    | `'self' \| 'component'`     | `ReactNode`                       | Cada estado tiene su config              |
| `FloatingMenu`   | `header`, `footer`      | `'component' \| 'none'`     | `() => ReactNode`                 | No usa `'self'`, usa `'none'`            |
| `FloatingMenu`   | `items[].render`        | N/A (siempre render)         | `(item) => ReactNode`             | No usa renderType, render directo        |
| `LoadingProvider` | `show(config)`         | `'self' \| 'component'`     | `ReactNode`                       | Se propaga al Loading interno            |

## Cuando usar self vs component

| Situacion                                                   | Usar                  |
|-------------------------------------------------------------|-----------------------|
| El visual por defecto de la libreria es suficiente           | `renderType: 'self'`  |
| Necesitas un diseno completamente diferente al por defecto   | `renderType: 'component'` |
| El componente necesita props declarativas (getHeaderLabel)   | `renderType: 'self'`  |
| Cada item de datos tiene su propio layout                    | `renderType: 'component'` |
| Quieres un skeleton/animacion custom en vez del spinner      | `renderType: 'component'` |

## Como implementarlo en un componente nuevo

1. Definir el tipo con `renderType` y `render` en los tipos del componente:

```ts
interface MiComponenteConfig {
  renderType: 'self' | 'component';
  render?: ReactNode;
}
```

2. Crear la carpeta `components/self/` con el visual interno:

```
MiComponente/
└── components/
    └── self/
        ├── SelfMiVisual.tsx
        ├── SelfMiVisual.module.css
        └── index.ts
```

3. En la vista del componente, alternar entre self y component:

```tsx
import { SelfMiVisual } from '../../components/self';

const renderContent = () => {
  if (config.renderType === 'component' && config.render) {
    return config.render;
  }
  return <SelfMiVisual size={size} label={label} />;
};
```

4. Exportar el componente self desde el barrel del componente (opcional, para uso independiente):

```tsx
// index.tsx
export { MiComponente } from './web/views/MiComponente.view';
export { SelfMiVisual } from './components/self';
```

## Regla importante

Todos los componentes de la libreria que renderizan un area visual reemplazable deben usar el patron `renderType` + `render`. Esto garantiza que la aplicacion padre pueda personalizar cualquier zona visual del componente sin modificar la libreria, mientras mantiene un visual por defecto funcional con `renderType: 'self'`. Cuando `renderType` es `'self'`, el componente visual interno siempre debe estar en `components/self/` con la convencion de nombre `Self{Nombre}`.
