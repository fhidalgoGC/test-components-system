# Layout Prop — Estandar de dimensionamiento y alineacion

El prop `layout` es el estandar que usamos en los componentes de la libreria para controlar el tamano final y la alineacion del contenido del componente. Cualquier componente que necesite adaptarse al espacio disponible o tener un tamano fijo debe implementar este prop.

## Interfaz

```ts
interface LayoutAlign {
  vertical?: 'top' | 'middle' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

interface Layout {
  widthMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  width?: number;
  minWidth?: number;
  heightMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  height?: number | 'auto';
  minHeight?: number;
  align?: LayoutAlign;
}
```

## Propiedades

### widthMode

Define como se calcula el ancho del componente.

| Valor        | Descripcion                                                        | CSS generado     |
|--------------|---------------------------------------------------------------------|------------------|
| `full`       | Ocupa todo el ancho disponible del contenedor padre.                | `width: 100%`    |
| `auto`       | Se adapta al contenido interno del componente.                      | `width: auto`    |
| `fixed`      | Usa el valor exacto definido en `width` (en pixeles).               | `width: {n}px`   |
| `percentage` | Usa el valor de `width` como porcentaje del contenedor padre.       | `width: {n}%`    |

### width

Valor numerico. Su interpretacion depende del `widthMode`:
- Con `widthMode: 'fixed'` → se interpreta como pixeles (`width: 400` = `400px`).
- Con `widthMode: 'percentage'` → se interpreta como porcentaje del padre (`width: 50` = `50%`).

```json
{ "widthMode": "fixed", "width": 400 }
{ "widthMode": "percentage", "width": 50 }
```

### minWidth

Ancho minimo en pixeles. Se aplica independientemente del `widthMode`. Util para evitar que el componente se comprima demasiado en pantallas pequenas.

```json
{ "widthMode": "full", "minWidth": 300 }
```

### heightMode

Define como se calcula la altura del componente.

| Valor        | Descripcion                                                        | CSS generado      |
|--------------|---------------------------------------------------------------------|-------------------|
| `full`       | Ocupa toda la altura disponible del contenedor padre.               | `height: 100%`    |
| `auto`       | Se adapta al contenido interno del componente.                      | `height: auto`    |
| `fixed`      | Usa el valor exacto definido en `height` (en pixeles).              | `height: {n}px`   |
| `percentage` | Usa el valor de `height` como porcentaje del contenedor padre.      | `height: {n}%`    |

### height

Valor numerico o `'auto'`. Su interpretacion depende del `heightMode`:
- Con `heightMode: 'fixed'` → se interpreta como pixeles (`height: 500` = `500px`).
- Con `heightMode: 'percentage'` → se interpreta como porcentaje del padre (`height: 75` = `75%`).

```json
{ "heightMode": "fixed", "height": 500 }
{ "heightMode": "percentage", "height": 75 }
```

### minHeight

Altura minima en pixeles. Se aplica independientemente del `heightMode`. Util para garantizar que el componente tenga una altura minima visible.

```json
{ "heightMode": "auto", "minHeight": 200 }
```

### align

Controla la alineacion del contenido interno del componente. Usa flexbox internamente.

**Valor por defecto:** Si no se pasa `align`, el componente siempre se alinea centrado en ambos ejes (`vertical: 'middle'`, `horizontal: 'center'`).

#### align.vertical

Define la alineacion vertical del contenido dentro del componente. Por defecto `'middle'`.

| Valor    | Descripcion                                          | CSS generado                  |
|----------|------------------------------------------------------|-------------------------------|
| `top`    | Contenido alineado en la parte superior.             | `justifyContent: flex-start`  |
| `middle` | Contenido centrado verticalmente. **(default)**      | `justifyContent: center`      |
| `bottom` | Contenido alineado en la parte inferior.             | `justifyContent: flex-end`    |

#### align.horizontal

Define la alineacion horizontal del contenido dentro del componente. Por defecto `'center'`.

| Valor    | Descripcion                                          | CSS generado               |
|----------|------------------------------------------------------|----------------------------|
| `left`   | Contenido alineado a la izquierda.                   | `alignItems: flex-start`   |
| `center` | Contenido centrado horizontalmente. **(default)**    | `alignItems: center`       |
| `right`  | Contenido alineado a la derecha.                     | `alignItems: flex-end`     |

```json
{
  "align": {
    "vertical": "middle",
    "horizontal": "center"
  }
}
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
    align: {
      vertical: 'top',
      horizontal: 'left',
    },
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

### Componente que ocupa la mitad del padre

```json
{
  "widthMode": "percentage",
  "width": 50,
  "heightMode": "full"
}
```

### Componente con porcentaje y minimos

```json
{
  "widthMode": "percentage",
  "width": 70,
  "minWidth": 400,
  "heightMode": "percentage",
  "height": 80,
  "minHeight": 300
}
```

### Componente centrado con tamano fijo

```json
{
  "widthMode": "fixed",
  "width": 600,
  "heightMode": "fixed",
  "height": 400,
  "align": {
    "vertical": "middle",
    "horizontal": "center"
  }
}
```

### Componente con contenido arriba a la izquierda

```json
{
  "widthMode": "full",
  "heightMode": "full",
  "align": {
    "vertical": "top",
    "horizontal": "left"
  }
}
```

### Componente con contenido abajo a la derecha

```json
{
  "widthMode": "full",
  "heightMode": "full",
  "align": {
    "vertical": "bottom",
    "horizontal": "right"
  }
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

1. Importar o definir los tipos `WidthMode`, `HeightMode` y `LayoutAlign` en el archivo de tipos del componente.
2. Agregar la interfaz `Layout` como prop del componente (preferiblemente como objeto `layout`).
3. En el componente, convertir los valores del layout a estilos CSS inline o clases.

Ejemplo de conversion a estilos:

```ts
function getLayoutStyles(layout?: Layout): React.CSSProperties {
  const styles: React.CSSProperties = {};

  if (layout?.widthMode === 'full') styles.width = '100%';
  else if (layout?.widthMode === 'fixed' && layout.width) styles.width = layout.width;
  else if (layout?.widthMode === 'percentage' && layout.width) styles.width = `${layout.width}%`;

  if (layout?.minWidth) styles.minWidth = layout.minWidth;

  if (layout?.heightMode === 'full') styles.height = '100%';
  else if (layout?.heightMode === 'auto') styles.height = 'auto';
  else if (layout?.heightMode === 'fixed' && layout.height) styles.height = layout.height;
  else if (layout?.heightMode === 'percentage' && layout.height) styles.height = `${layout.height}%`;

  if (layout?.minHeight) styles.minHeight = layout.minHeight;

  const verticalMap = { top: 'flex-start', middle: 'center', bottom: 'flex-end' } as const;
  const horizontalMap = { left: 'flex-start', center: 'center', right: 'flex-end' } as const;

  const vertical = layout?.align?.vertical || 'middle';
  const horizontal = layout?.align?.horizontal || 'center';

  styles.display = 'flex';
  styles.flexDirection = 'column';
  styles.justifyContent = verticalMap[vertical];
  styles.alignItems = horizontalMap[horizontal];

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

Todos los componentes de la libreria que renderizan un contenedor visual deben aceptar el prop `layout`. Esto garantiza que la aplicacion padre pueda controlar las dimensiones y la alineacion del contenido de cualquier componente de forma consistente, sin necesidad de wrappers o estilos externos.
