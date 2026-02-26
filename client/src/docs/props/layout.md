# Layout Prop — Estandar de dimensionamiento

El prop `layout` es el estandar que usamos en los componentes de la libreria para controlar el tamano final del componente. Cualquier componente que necesite adaptarse al espacio disponible o tener un tamano fijo debe implementar este prop.

## Interfaz

```ts
interface Layout {
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number;
  minWidth?: number;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
}
```

## Propiedades

### widthMode

Define como se calcula el ancho del componente.

| Valor   | Descripcion                                                        | CSS generado     |
|---------|--------------------------------------------------------------------|------------------|
| `full`  | Ocupa todo el ancho disponible del contenedor padre.               | `width: 100%`    |
| `auto`  | Se adapta al contenido interno del componente.                     | `width: auto`    |
| `fixed` | Usa el valor exacto definido en `width` (en pixeles).              | `width: {n}px`   |

### width

Valor numerico en pixeles. Solo se aplica cuando `widthMode` es `'fixed'`.

```json
{ "widthMode": "fixed", "width": 400 }
```

### minWidth

Ancho minimo en pixeles. Se aplica independientemente del `widthMode`. Util para evitar que el componente se comprima demasiado en pantallas pequenas.

```json
{ "widthMode": "full", "minWidth": 300 }
```

### heightMode

Define como se calcula la altura del componente.

| Valor   | Descripcion                                                        | CSS generado      |
|---------|--------------------------------------------------------------------|-------------------|
| `full`  | Ocupa toda la altura disponible del contenedor padre.              | `height: 100%`    |
| `auto`  | Se adapta al contenido interno del componente.                     | `height: auto`    |
| `fixed` | Usa el valor exacto definido en `height` (en pixeles).             | `height: {n}px`   |

### height

Valor numerico en pixeles o `'auto'`. Solo se aplica cuando `heightMode` es `'fixed'` (numerico) o se pasa `'auto'` directamente.

```json
{ "heightMode": "fixed", "height": 500 }
```

### minHeight

Altura minima en pixeles. Se aplica independientemente del `heightMode`. Util para garantizar que el componente tenga una altura minima visible.

```json
{ "heightMode": "auto", "minHeight": 200 }
```

## Ejemplo de uso completo

```tsx
<Grid
  layout={{
    widthMode: 'full',
    minWidth: 600,
    heightMode: 'fixed',
    height: 400,
    minHeight: 200,
  }}
  data={items}
  itemConfig={{ renderType: 'component', render: (item) => <Card {...item} /> }}
/>
```

## Combinaciones comunes

### Componente que llena todo el espacio

```json
{
  "widthMode": "full",
  "heightMode": "full"
}
```

### Componente con ancho fijo y altura automatica

```json
{
  "widthMode": "fixed",
  "width": 400,
  "heightMode": "auto"
}
```

### Componente responsivo con minimos

```json
{
  "widthMode": "full",
  "minWidth": 300,
  "heightMode": "auto",
  "minHeight": 150
}
```

### Componente con dimensiones exactas

```json
{
  "widthMode": "fixed",
  "width": 800,
  "heightMode": "fixed",
  "height": 600
}
```

## Componentes que ya lo implementan

Los siguientes componentes ya usan el prop `layout` con este estandar:

- `Grid` — via `GridLayout`
- `List` — via `ListLayout`
- `LayoutColumn` — via props individuales (`widthMode`, `width`, `heightMode`, `height`)
- `LayoutRow` — via props individuales
- `BaseTable` — via `layout` en tipos de columna
- `Modal` — via propiedades de tamano
- `FloatingMenu` — via propiedades de tamano
- `SidebarLayout` — via `WidthMode` / `HeightMode`

## Como implementarlo en un componente nuevo

1. Importar o definir los tipos `WidthMode` y `HeightMode` en el archivo de tipos del componente.
2. Agregar la interfaz `Layout` como prop del componente (preferiblemente como objeto `layout`).
3. En el componente, convertir los valores del layout a estilos CSS inline o clases.

Ejemplo de conversion a estilos:

```ts
function getLayoutStyles(layout?: Layout): React.CSSProperties {
  const styles: React.CSSProperties = {};

  if (layout?.widthMode === 'full') styles.width = '100%';
  else if (layout?.widthMode === 'fixed' && layout.width) styles.width = layout.width;

  if (layout?.minWidth) styles.minWidth = layout.minWidth;

  if (layout?.heightMode === 'full') styles.height = '100%';
  else if (layout?.heightMode === 'auto') styles.height = 'auto';
  else if (layout?.heightMode === 'fixed' && layout.height) styles.height = layout.height;

  if (layout?.minHeight) styles.minHeight = layout.minHeight;

  return styles;
}
```

4. Aplicar los estilos al contenedor raiz del componente:

```tsx
<div style={getLayoutStyles(layout)}>
  {children}
</div>
```

## Regla importante

Todos los componentes de la libreria que renderizan un contenedor visual deben aceptar el prop `layout`. Esto garantiza que la aplicacion padre pueda controlar las dimensiones de cualquier componente de forma consistente, sin necesidad de wrappers o estilos externos.
