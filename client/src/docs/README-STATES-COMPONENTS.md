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
  loading?: StateConfig;
  empty?: StateConfig;
  error?: StateConfig;
}
```

---

## Ciclo de vida de los estados

### Estado inicial: `idle`

Todo componente **siempre inicia en estado `idle`**. Este es el estado por defecto que el componente asigna internamente al montarse. Representa que el componente se montó pero **aún no tiene datos** — está a la espera de que el consumidor inicie una carga o cambie a otro estado.

### Estado `success`

Cuando la carga de datos termina correctamente, el consumidor cambia el estado a `success`. En este estado el componente **muestra su contenido normal** (datos, accordions, filas, items, etc.). Es el estado que indica "hay datos disponibles y se están mostrando".

### Estados con visualización especial

Los estados `loading`, `empty` y `error` tienen visualización propia configurable via `StateConfig`. Son los únicos que pueden personalizar su apariencia visual.

### Transiciones

El consumidor controla todas las transiciones externas. El único estado que el componente asigna por sí mismo es `idle` al montar.

- `idle` → `loading` (se inicia una carga)
- `loading` → `success` (la carga terminó con datos)
- `loading` → `empty` (la carga terminó sin datos)
- `loading` → `error` (la carga falló)
- `success` → `loading` (se recarga)
- `error` → `loading` (se reintenta)

### Diagrama de transiciones

```
                         ┌──────────┐
          montaje ──────►│   idle   │ (interno, sin datos aún)
                         └────┬─────┘
                              │
                              ▼
                        ┌──────────┐
               ┌───────►│ loading  │◄──────────┐
               │        └────┬─────┘           │
               │             │                 │
               │    ┌────────┼────────┐        │
               │    ▼        ▼        ▼        │
          ┌─────────┐ ┌──────────┐ ┌──────────┐
          │ success │ │  empty   │ │  error   │
          └─────────┘ └──────────┘ └──────────┘
           (datos      (sin datos,   (falló,
           visibles)    visual)       visual)
```

> **Regla:** `idle` y `success` muestran el contenido normal del componente (no tienen `StateConfig`). `loading`, `empty` y `error` tienen visualización especial configurable via `statesComponents`.

---

## Estados disponibles

| Estado | Descripción | Quién lo controla | Tiene `StateConfig` | Cuándo se activa |
|--------|-------------|-------------------|:-------------------:|------------------|
| `idle` | Estado inicial, sin datos aún | **Componente** (interno) | NO | Al montar, antes de cualquier carga |
| `loading` | Cargando datos | **Consumidor** (externo) | SI | El consumidor inicia una petición asíncrona |
| `success` | Datos cargados, contenido visible | **Consumidor** (externo) | NO | La carga terminó exitosamente y hay datos para mostrar |
| `empty` | Sin resultados | **Consumidor** (externo) | SI | La petición terminó pero no retornó datos |
| `error` | Error en la carga | **Consumidor** (externo) | SI | La petición falló |

> **Nota:** `idle` y `success` no tienen `StateConfig` porque ambos muestran el contenido normal del componente. La diferencia es semántica: `idle` indica que aún no se ha cargado nada, `success` indica que la carga fue exitosa y los datos están visibles. Solo `loading`, `empty` y `error` permiten personalizar su visualización via `statesComponents`.

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

// El componente arranca en 'idle' automáticamente (sin datos aún).
// El consumidor controla las transiciones:
const fetchData = async () => {
  controller.setState('loading');
  try {
    const result = await api.getProducts();
    if (result.length === 0) {
      controller.setState('empty');
    } else {
      setProducts(result);
      controller.setState('success'); // datos cargados, muestra contenido normal
    }
  } catch (err) {
    controller.setState('error');
  }
};

<Grid
  data={products}
  controller={controller}
  item={{ renderType: 'component', render: (item) => <ProductCard product={item} /> }}
  statesComponents={{
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

> **Nota:** El componente inicia en `idle`. Solo `loading`, `empty` y `error` se configuran en `statesComponents` porque son los que tienen visualización especial. `success` no necesita configuración — muestra el contenido normal del componente.

---

## Componentes que implementan states

### Modal

- **States:** `idle`, `loading`, `success`, `empty`, `error`
- **Interfaz:** `StatesComponents` con `StateConfig` completa (incluye `widthMode`, `heightMode`, `verticalAlign`, `horizontalAlign`)
- **Prop:** `statesComponents`
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
3. Iniciar siempre en estado `idle` de forma interna — el componente se monta sin datos
4. Implementar los 5 estados base: `idle` (interno), `loading`, `success`, `empty`, `error` (externos)
5. `idle` = sin datos aún (antes de la primera carga). Muestra el contenido normal del componente (vacío o con datos iniciales)
6. `success` = datos cargados exitosamente. Muestra el contenido normal del componente con los datos
7. Solo `loading`, `empty` y `error` tienen `StateConfig` configurable (visualización especial)
8. Si el componente requiere estados adicionales específicos, extender la interfaz

```ts
interface MyComponentStatesComponents extends StatesComponents {
  customState?: StateConfig;
}
```

---

## Flujo de decisión para renderizado de un state

```
state actual del componente
  │
  ├─ state === 'idle' o state === 'success'
  │   └─ renderizar contenido normal del componente
  │       (idle: sin datos aún / success: con datos cargados)
  │
  ├─ state === 'loading' | 'empty' | 'error'
  │   │
  │   ├─ statesComponents[state] existe?
  │   │   │
  │   │   ├─ SI → renderType === 'component'?
  │   │   │       │
  │   │   │       ├─ SI → renderizar statesComponents[state].render
  │   │   │       │       con dimensiones y alineación configuradas
  │   │   │       │
  │   │   │       └─ NO ('self') → renderizar visual interno por defecto
  │   │   │               con dimensiones y alineación configuradas
  │   │   │
  │   │   └─ NO → renderizar visual interno por defecto
  │   │           con dimensiones y alineación por defecto
  │
  └─ Resumen: solo loading/empty/error usan StateConfig
```
