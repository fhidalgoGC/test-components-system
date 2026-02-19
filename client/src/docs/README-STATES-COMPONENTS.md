# States Components — Patrón estándar para componentes con datos asíncronos

## Resumen

Todo componente de la biblioteca que carga información externa de forma asíncrona **debe** ofrecer la prop `statesComponents` para permitir al consumidor personalizar la visualización de cada estado.

---

## Interfaz estándar: `StatesComponents`

```ts
interface StateConfig {
  renderType: 'component' | 'self';
  render?: ReactNode;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number;
  minWidth?: number;
  verticalAlign?: 'top' | 'middle' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
}

interface StatesComponents {
  idle?: StateConfig;
  loading?: StateConfig;
  empty?: StateConfig;
  error?: StateConfig;
}
```

---

## Estados disponibles

| Estado | Descripción | Cuándo se activa |
|--------|-------------|------------------|
| `idle` | Estado inicial antes de cualquier carga | El componente se montó pero aún no ha recibido datos ni ha iniciado fetch |
| `loading` | Cargando datos | Se está realizando la petición asíncrona |
| `empty` | Sin resultados | La petición terminó exitosamente pero no retornó datos |
| `error` | Error en la carga | La petición falló o se recibió un error |

> **Nota:** Algunos componentes incluyen estados adicionales como `success` (Modal, BaseTable). El estado `success` indica que la petición terminó correctamente y hay datos disponibles para renderizar. Cuando el componente tiene datos, típicamente los renderiza directamente sin necesitar configuración visual del state.

---

## Propiedades de cada `StateConfig`

### `renderType`

| Valor | Comportamiento |
|-------|----------------|
| `'self'` | El componente renderiza su visual por defecto interno (spinner, texto, icono, etc.) |
| `'component'` | El componente renderiza el `ReactNode` proporcionado en la propiedad `render` |

### `render`

- Tipo: `ReactNode`
- Solo se usa cuando `renderType` es `'component'`
- Permite inyectar cualquier componente React personalizado

### Dimensiones

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | Modo de ancho del contenedor del estado |
| `width` | `number` | Ancho en pixeles (solo aplica cuando `widthMode` es `'fixed'`) |
| `minWidth` | `number` | Ancho mínimo en pixeles |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | Modo de alto del contenedor del estado |
| `height` | `number \| 'auto'` | Alto en pixeles o auto |
| `minHeight` | `number` | Alto mínimo en pixeles |

### Alineación

| Propiedad | Valores | Default |
|-----------|---------|---------|
| `verticalAlign` | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| `horizontalAlign` | `'left' \| 'center' \| 'right'` | `'center'` |

---

## Ejemplo de uso

```tsx
const controller = useGridController();

// El state se controla externamente via controller
controller.setState('loading');

<Grid
  data={products}
  controller={controller}
  item={{ renderType: 'component', render: (item) => <ProductCard product={item} /> }}
  statesComponents={{
    idle: {
      renderType: 'self'
    },
    loading: {
      renderType: 'component',
      render: <CustomSpinner />,
      heightMode: 'fixed',
      height: 300,
      verticalAlign: 'middle',
      horizontalAlign: 'center'
    },
    empty: {
      renderType: 'component',
      render: <EmptyState message="No hay productos" />,
      heightMode: 'auto',
      minHeight: 200,
      verticalAlign: 'middle',
      horizontalAlign: 'center'
    },
    error: {
      renderType: 'component',
      render: <ErrorBanner />,
      heightMode: 'fixed',
      height: 250,
      widthMode: 'full',
      verticalAlign: 'top',
      horizontalAlign: 'left'
    }
  }}
/>
```

> **Nota:** El state del componente se gestiona externamente a través de su controller (ej: `controller.setState('loading')`), no mediante una prop `state` directa.

---

## Componentes que implementan states

### Modal

- **States:** `idle`, `loading`, `success`, `empty`, `error`
- **Interfaz:** `StatesComponents` con `StateConfig` completa (incluye `widthMode`, `heightMode`, `verticalAlign`, `horizontalAlign`)
- **Prop:** `statesComponents`
- **Estado extra:** `success` — indica que la operación fue exitosa
- **Cumple estándar:** SI

### Grid

- **States:** `idle`, `loading`, `empty`, `error`
- **Interfaz:** `GridStatesComponents` con `GridStateComponent`
- **Prop:** `statesComponents`
- **Props actuales de `GridStateComponent`:** `renderType`, `render`, `verticalAlign`, `horizontalAlign`, `position`
- **Props adicionales:** `position` (`'bottom'` | `'over'`) en loading para controlar dónde se renderiza el indicador
- **Diferencias con estándar:** No tiene `widthMode`, `width`, `minWidth`, `heightMode`, `height`, `minHeight`. Solo tiene alineación y `position`
- **Cumple estándar:** NO — faltan todas las propiedades de dimensiones

### List

- **States:** `renderIdle`, `renderLoading`, `renderComplete`, `renderEmpty`, `renderError`
- **Interfaz:** No usa `statesComponents`. Usa props individuales (`renderIdle`, `renderLoading`, etc.) directamente en `ListProps` y configuraciones separadas `ListLoading` y `ListEmpty`
- **Props de loading:** `renderType`, `render`, `position` (`'top'` | `'bottom'` | `'over'`)
- **Props de empty:** `renderType`, `render`, `position` (`'center'` | `'over'`)
- **Diferencias con estándar:** No agrupa en `statesComponents`, no tiene dimensiones ni alineación por estado
- **Cumple estándar:** NO — estructura fragmentada

### BaseTable

- **States:** `idle`, `loading`, `success`, `error`, `empty`
- **Interfaz:** `StatesConfig` dentro de `behaviors.states`
- **StateConfig actual:**
  ```ts
  interface StateConfig {
    defaultText?: string;
    message?: string;
    component?: ReactNode;
  }
  ```
- **Prop:** `config.behaviors.states`
- **Diferencias con estándar:** Usa `defaultText`/`message`/`component` en lugar de `renderType`/`render`. No tiene dimensiones ni alineación. Está anidada dentro de `behaviors` en vez de ser prop directa `statesComponents`
- **Cumple estándar:** NO — interfaz completamente diferente

---

## Resumen de cumplimiento

| Componente | Prop `statesComponents` | Interfaz `StateConfig` estándar | Dimensiones | Alineación |
|------------|:-----------------------:|:-------------------------------:|:-----------:|:----------:|
| **Modal** | SI | SI | SI | SI |
| **Grid** | SI | NO | NO | SI |
| **List** | NO | NO | NO | NO |
| **BaseTable** | NO | NO | NO | NO |

---

## Regla para nuevos componentes

Todo componente nuevo que cargue datos de forma asíncrona **debe**:

1. Aceptar la prop `statesComponents?: StatesComponents`
2. Usar la interfaz `StateConfig` estándar con todas las propiedades (renderType, render, dimensiones, alineación)
3. Implementar al mínimo los 4 estados base: `idle`, `loading`, `empty`, `error`
4. Si el componente requiere estados adicionales (como `success`), extender la interfaz

```ts
interface MyComponentStatesComponents extends StatesComponents {
  success?: StateConfig;
}
```

---

## Flujo de decisión para renderizado de un state

```
state recibido
  │
  ├─ statesComponents[state] existe?
  │   │
  │   ├─ SI → renderType === 'component'?
  │   │       │
  │   │       ├─ SI → renderizar statesComponents[state].render
  │   │       │       con dimensiones y alineación configuradas
  │   │       │
  │   │       └─ NO ('self') → renderizar visual interno por defecto
  │   │               con dimensiones y alineación configuradas
  │   │
  │   └─ NO → renderizar visual interno por defecto
  │           con dimensiones y alineación por defecto
  │
  └─ state === 'idle' o datos disponibles → renderizar contenido normal
```
