# Layout Prop — Estandar de dimensionamiento y alineacion

El prop `layout` es el estandar que usamos en los componentes de la libreria para controlar el tamano final y la alineacion del contenido del componente. Cualquier componente que necesite adaptarse al espacio disponible o tener un tamano fijo debe implementar este prop.

## Interfaz

```ts
interface LayoutAlign {
  vertical?: 'top' | 'middle' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

interface Layout extends HeightWidthSize {
  align?: LayoutAlign;
}
```

`Layout` extiende de `HeightWidthSize` (`widthMode`, `width`, `minWidth`, `heightMode`, `height`, `minHeight`) y agrega `align` para la alineacion del contenido.

> Ver documentacion completa de las propiedades de dimensionamiento en [`HeightWidthSize.md`](./HeightWidthSize.md).

## Propiedades de dimensionamiento (de HeightWidthSize)

Las siguientes propiedades vienen de `HeightWidthSize` y estan documentadas en detalle en [`HeightWidthSize.md`](./HeightWidthSize.md):

| Propiedad | Tipo | Default | Descripcion |
|-----------|------|---------|-------------|
| `widthMode` | `'full' \| 'auto' \| 'fixed' \| 'percentage'` | `'auto'` | Como se calcula el ancho |
| `width` | `number` | — | Valor numerico (px o %) segun widthMode |
| `minWidth` | `number` | — | Ancho minimo en pixeles |
| `heightMode` | `'full' \| 'auto' \| 'fixed' \| 'percentage'` | `'auto'` | Como se calcula la altura |
| `height` | `number \| 'auto'` | — | Valor numerico (px o %) segun heightMode |
| `minHeight` | `number` | — | Altura minima en pixeles |

## align

Controla la alineacion del contenido interno del componente. Usa flexbox internamente.

**Valor por defecto:** Si no se pasa `align`, el componente siempre se alinea centrado en ambos ejes (`vertical: 'middle'`, `horizontal: 'center'`).

### align.vertical

Define la alineacion vertical del contenido dentro del componente. Por defecto `'middle'`.

| Valor    | Descripcion                                          | CSS generado                  |
|----------|------------------------------------------------------|-------------------------------|
| `top`    | Contenido alineado en la parte superior.             | `justifyContent: flex-start`  |
| `middle` | Contenido centrado verticalmente. **(default)**      | `justifyContent: center`      |
| `bottom` | Contenido alineado en la parte inferior.             | `justifyContent: flex-end`    |

### align.horizontal

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

## Combinaciones comunes con align

### Centrado con tamano fijo

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

### Contenido arriba a la izquierda

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

### Contenido abajo a la derecha

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

> Para combinaciones de dimensionamiento sin `align` (llenar espacio, ancho fijo, responsivo con minimos, porcentajes, etc.), ver los ejemplos en [`HeightWidthSize.md`](./HeightWidthSize.md).

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

1. Importar o definir los tipos `HeightWidthSize` y `LayoutAlign` en el archivo de tipos del componente.
2. Agregar la interfaz `Layout` como prop del componente (preferiblemente como objeto `layout`).
3. En el componente, convertir los valores del layout a estilos CSS inline o clases.

Ejemplo de conversion a estilos:

```ts
function getLayoutStyles(layout?: Layout): React.CSSProperties {
  const styles: React.CSSProperties = {};

  const wMode = layout?.widthMode || 'auto';
  const hMode = layout?.heightMode || 'auto';

  if (wMode === 'full') styles.width = '100%';
  else if (wMode === 'auto') styles.width = 'auto';
  else if (wMode === 'fixed' && layout?.width) styles.width = layout.width;
  else if (wMode === 'percentage' && layout?.width) styles.width = `${layout.width}%`;

  if (layout?.minWidth) styles.minWidth = layout.minWidth;

  if (hMode === 'full') styles.height = '100%';
  else if (hMode === 'auto') styles.height = 'auto';
  else if (hMode === 'fixed' && layout?.height) styles.height = layout.height;
  else if (hMode === 'percentage' && layout?.height) styles.height = `${layout.height}%`;

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
