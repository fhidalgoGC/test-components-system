# States Components — Patrón estándar para componentes con datos asíncronos

## Resumen

Todo componente de la biblioteca que carga información externa de forma asíncrona **debe** ofrecer la prop `statesComponents` para permitir al consumidor personalizar la visualización de cada estado.

---

## Interfaz estándar: `StatesComponents`

```ts
interface StateConfigAlign {
  vertical?: 'top' | 'middle' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}

interface StateConfig {
  renderType: 'component' | 'self';
  render?: ReactNode;
  heightMode?: 'full' | 'auto' | 'fixed';
  height?: number | 'auto';
  minHeight?: number;
  widthMode?: 'full' | 'auto' | 'fixed';
  width?: number;
  minWidth?: number;
  align?: StateConfigAlign;
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

Todo componente **siempre inicia en estado `idle`**. Este es el estado por defecto que el componente asigna internamente al montarse. Representa que el componente se montó pero **aún no tiene datos** — está a la espera de recibir datos o que el consumidor cambie a otro estado.

### Transiciones automáticas (basadas en datos)

El componente detecta automáticamente los cambios en la prop `data` y transiciona el estado:

- Cuando `data` cambia y tiene elementos (`data.length > 0`): el componente transiciona automáticamente a **`success`**
- Cuando `data` cambia y está vacío (`data.length === 0`) estando en `loading`: el componente transiciona automáticamente a **`empty`**

Esto significa que el consumidor **no necesita** llamar `controller.setState('success')` manualmente — basta con inyectar los datos y el componente lo detecta.

### Transiciones manuales (controladas por el consumidor)

El consumidor puede establecer manualmente:

- **`loading`**: indica que se está cargando (antes de inyectar datos)
- **`error`**: indica que la carga falló (solo el consumidor sabe si hubo error)

### Estados con visualización especial

Los estados `loading`, `empty` y `error` tienen visualización propia configurable via `StateConfig`. Son los únicos que pueden personalizar su apariencia visual.

### Flujo típico

1. Componente se monta → estado `idle` (automático)
2. Consumidor establece `loading` → muestra spinner/indicador
3. Consumidor inyecta datos via prop `data`
4. Componente detecta datos → estado `success` (automático, muestra contenido)
5. Si `data` llega vacío desde `loading` → estado `empty` (automático)
6. Si hubo error → consumidor establece `error` manualmente

### Diagrama de transiciones

```
                         ┌──────────┐
          montaje ──────►│   idle   │ (interno, sin datos aún)
                         └────┬─────┘
                              │
               ┌──────────────┼──────────────────┐
               │              │                  │
               │ (manual)     │ (auto: data>0)   │
               ▼              ▼                  │
         ┌──────────┐   ┌─────────┐              │
  ┌─────►│ loading  │   │ success │◄─────┐       │
  │      └────┬─────┘   └─────────┘      │       │
  │           │          (datos visibles) │       │
  │  ┌────────┼────────┐                 │       │
  │  │ auto   │ auto   │ manual          │       │
  │  ▼        ▼        ▼                 │       │
  │ ┌─────────┐ ┌──────────┐            │       │
  │ │  empty  │ │  error   │            │       │
  │ └─────────┘ └──────────┘            │       │
  │ (data==0)    (falló)                │       │
  │                                     │       │
  └──── (recarga manual) ──────────────┘       │
                                                │
         auto: data cambia con items ───────────┘
```

> **Regla:** `idle` y `success` muestran el contenido normal del componente (no tienen `StateConfig`). `loading`, `empty` y `error` tienen visualización especial configurable. Las transiciones a `success` y `empty` son **automáticas** basadas en los datos. Solo `loading` y `error` requieren control manual del consumidor.

---

## Estados disponibles

| Estado | Descripción | Tipo de transición | Tiene `StateConfig` | Cuándo se activa |
|--------|-------------|-------------------|:-------------------:|------------------|
| `idle` | Estado inicial, sin datos aún | **Automático** (al montar) | NO | Al montar, antes de cualquier carga |
| `loading` | Cargando datos | **Manual** (consumidor) | SI | El consumidor indica que se está cargando |
| `success` | Datos cargados, contenido visible | **Automático** (al detectar datos) | NO | `data.length > 0` — el componente transiciona solo |
| `empty` | Sin resultados | **Automático** (desde loading) | SI | `data.length === 0` estando en `loading` |
| `error` | Error en la carga | **Manual** (consumidor) | SI | El consumidor indica que hubo un error |

> **Nota:** `idle` y `success` muestran el contenido normal del componente (no tienen `StateConfig`). Las transiciones a `success` y `empty` son automáticas basadas en la prop `data`. Solo `loading` y `error` requieren control manual del consumidor.

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

La alineación se define dentro del objeto `align`, siguiendo el mismo estándar que el prop `layout` (ver `client/src/docs/props/layout.md`).

| Propiedad | Valores | Default |
|-----------|---------|---------|
| `align.vertical` | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| `align.horizontal` | `'left' \| 'center' \| 'right'` | `'center'` |

---

## Ejemplo de uso

```tsx
const controller = useGridController();
const [products, setProducts] = useState([]);

// El componente arranca en 'idle' automáticamente (sin datos aún).
// El consumidor solo controla 'loading' y 'error' manualmente.
// 'success' y 'empty' se resuelven automáticamente al cambiar 'data'.
const fetchData = async () => {
  controller.setState('loading'); // manual: muestra spinner
  try {
    const result = await api.getProducts();
    setProducts(result);
    // NO hace falta llamar controller.setState('success') ni 'empty'.
    // El componente detecta:
    //   - result.length > 0  →  auto 'success' (muestra datos)
    //   - result.length === 0 →  auto 'empty' (muestra estado vacío)
  } catch (err) {
    controller.setState('error'); // manual: solo el consumidor sabe si hubo error
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
      align: { vertical: 'middle', horizontal: 'center' }
    },
    empty: {
      renderType: 'component',
      render: <EmptyState message="No hay productos" />,
      heightMode: 'auto',
      minHeight: 200,
      align: { vertical: 'middle', horizontal: 'center' }
    },
    error: {
      renderType: 'component',
      render: <ErrorBanner />,
      heightMode: 'fixed',
      height: 250,
      widthMode: 'full',
      align: { vertical: 'top', horizontal: 'left' }
    }
  }}
/>
```

> **Nota:** El consumidor solo necesita controlar `loading` y `error` manualmente. Las transiciones a `success` y `empty` son automáticas cuando la prop `data` cambia.

---

## Componentes que implementan states

### Modal

- **States:** `idle`, `loading`, `success`, `empty`, `error`
- **Interfaz:** `StatesComponents` con `StateConfig` completa (incluye `widthMode`, `heightMode`, `align: { vertical, horizontal }`)
- **Prop:** `statesComponents`
- **Cumple estándar:** SI

### Grid

- **States:** `idle`, `loading`, `empty`, `error`
- **Interfaz:** `GridStatesComponents` con `GridStateComponent`
- **Prop:** `statesComponents`
- **Props actuales de `GridStateComponent`:** `renderType`, `render`, `verticalAlign`, `horizontalAlign`, `position` (usa props planas en vez de `align: {}`, pendiente de migrar)
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
4. Implementar los 5 estados base: `idle`, `loading`, `success`, `empty`, `error`
5. Implementar **transiciones automáticas** basadas en la prop `data`:
   - `data.length > 0` → auto transición a `success` (desde cualquier estado excepto `error`)
   - `data.length === 0` desde `loading` → auto transición a `empty`
6. Solo `loading` y `error` son controlados manualmente por el consumidor
7. `idle` y `success` muestran el contenido normal del componente (no tienen `StateConfig`)
8. Solo `loading`, `empty` y `error` tienen `StateConfig` configurable (visualización especial)
9. Si el componente requiere estados adicionales específicos, extender la interfaz

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
