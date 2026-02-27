# HeightWidthSize — Propiedades de dimensionamiento

Estandar de propiedades para controlar el ancho y alto de componentes y sus partes internas. Estas propiedades se repiten en muchos componentes de la libreria (contenedores, secciones, items, columnas, etc.).

## Interfaz base

```ts
interface HeightWidthSize {
  widthMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  width?: number;
  minWidth?: number;
  heightMode?: 'full' | 'auto' | 'fixed' | 'percentage';
  height?: number | 'auto';
  minHeight?: number;
}
```

No todos los componentes implementan todas las propiedades. Algunos solo usan `widthMode` + `width`, otros solo `heightMode` + `height`. La interfaz base muestra el conjunto completo.

---

## widthMode

Define como se calcula el ancho. Por defecto `'auto'`.

| Valor | Descripcion | CSS generado |
|-------|-------------|--------------|
| `full` | Ocupa todo el ancho disponible del contenedor padre | `width: 100%` |
| `auto` | Se adapta al contenido interno **(default)** | `width: auto` |
| `fixed` | Usa el valor exacto definido en `width` (en pixeles) | `width: {n}px` |
| `percentage` | Usa el valor de `width` como porcentaje del contenedor padre | `width: {n}%` |

## width

Valor numerico. Su interpretacion depende del `widthMode`:

| widthMode | width | Resultado |
|-----------|-------|-----------|
| `fixed` | `400` | `400px` |
| `percentage` | `50` | `50%` |
| `full` | ignorado | `100%` |
| `auto` | ignorado | `auto` |

```tsx
{ widthMode: 'fixed', width: 400 }       // 400px exactos
{ widthMode: 'percentage', width: 50 }    // 50% del padre
```

## minWidth

Ancho minimo en pixeles. Se aplica independientemente del `widthMode`. Evita que el componente se comprima demasiado.

```tsx
{ widthMode: 'full', minWidth: 300 }      // 100% pero nunca menos de 300px
{ widthMode: 'percentage', width: 50, minWidth: 200 }  // 50% pero minimo 200px
```

---

## heightMode

Define como se calcula la altura. Por defecto `'auto'`.

| Valor | Descripcion | CSS generado |
|-------|-------------|--------------|
| `full` | Ocupa toda la altura disponible del contenedor padre | `height: 100%` |
| `auto` | Se adapta al contenido interno **(default)** | `height: auto` |
| `fixed` | Usa el valor exacto definido en `height` (en pixeles) | `height: {n}px` |
| `percentage` | Usa el valor de `height` como porcentaje del contenedor padre | `height: {n}%` |

## height

Valor numerico o `'auto'`. Su interpretacion depende del `heightMode`:

| heightMode | height | Resultado |
|------------|--------|-----------|
| `fixed` | `500` | `500px` |
| `percentage` | `75` | `75%` |
| `full` | ignorado | `100%` |
| `auto` | ignorado | `auto` |

```tsx
{ heightMode: 'fixed', height: 500 }       // 500px exactos
{ heightMode: 'percentage', height: 75 }    // 75% del padre
```

## minHeight

Altura minima en pixeles. Se aplica independientemente del `heightMode`. Garantiza una altura minima visible.

```tsx
{ heightMode: 'auto', minHeight: 200 }     // Auto pero nunca menos de 200px
{ heightMode: 'full', minHeight: 150 }      // 100% pero minimo 150px
```

---

## Combinaciones comunes

### Llenar todo el espacio

```tsx
{ widthMode: 'full', heightMode: 'full' }
```

### Ancho fijo, altura automatica

```tsx
{ widthMode: 'fixed', width: 400, heightMode: 'auto' }
```

### Responsivo con minimos

```tsx
{ widthMode: 'full', minWidth: 300, heightMode: 'auto', minHeight: 150 }
```

### Dimensiones exactas

```tsx
{ widthMode: 'fixed', width: 800, heightMode: 'fixed', height: 600 }
```

### Mitad del padre

```tsx
{ widthMode: 'percentage', width: 50, heightMode: 'full' }
```

### Porcentaje con minimos

```tsx
{ widthMode: 'percentage', width: 70, minWidth: 400, heightMode: 'percentage', height: 80, minHeight: 300 }
```

---

## Donde aparecen estas propiedades

Estas propiedades se usan en diferentes contextos dentro de los componentes:

| Contexto | Ejemplo | Descripcion |
|----------|---------|-------------|
| Prop `layout` del componente | `<Grid layout={{ widthMode: 'full', heightMode: 'fixed', height: 400 }} />` | Dimensiones del contenedor principal |
| Secciones internas | `header: { heightMode: 'fixed', height: 60 }` | Dimensiones de header/body/footer |
| Items individuales | `{ widthMode: 'fixed', width: 200, heightMode: 'auto' }` | Dimensiones por item |
| Columnas de tabla | `{ widthMode: 'fixed', width: 150 }` | Ancho de columna |
| Slots de layout | `slotConfig: [{ widthMode: 'percentage', width: 60 }]` | Ancho de cada slot |
| Estados visuales | `statesComponents: { loading: { heightMode: 'fixed', height: 200 } }` | Dimensiones del contenedor de estado |

---

## Conversion a CSS

Funcion estandar para convertir las propiedades a estilos inline:

```ts
function getHeightWidthStyles(config?: HeightWidthSize): React.CSSProperties {
  const styles: React.CSSProperties = {};

  const wMode = config?.widthMode || 'auto';
  const hMode = config?.heightMode || 'auto';

  if (wMode === 'full') styles.width = '100%';
  else if (wMode === 'auto') styles.width = 'auto';
  else if (wMode === 'fixed' && config?.width) styles.width = config.width;
  else if (wMode === 'percentage' && config?.width) styles.width = `${config.width}%`;

  if (config?.minWidth) styles.minWidth = config.minWidth;

  if (hMode === 'full') styles.height = '100%';
  else if (hMode === 'auto') styles.height = 'auto';
  else if (hMode === 'fixed' && config?.height) styles.height = config.height;
  else if (hMode === 'percentage' && config?.height) styles.height = `${config.height}%`;

  if (config?.minHeight) styles.minHeight = config.minHeight;

  return styles;
}
```

---

## Reglas

1. Si no se pasa `widthMode`, el default es `'auto'`.
2. Si no se pasa `heightMode`, el default es `'auto'`.
3. `width` y `height` solo se usan cuando el mode es `'fixed'` o `'percentage'`. En `'full'` y `'auto'` se ignoran.
4. `minWidth` y `minHeight` siempre se aplican, sin importar el mode.
5. Cuando `heightMode` es `'fixed'` o `'full'`, considerar agregar `overflow-y: auto` si el contenido puede exceder la altura.
