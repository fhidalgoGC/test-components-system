# AcordionList - Web Version

## Descripcion General

`AcordionList` es un componente generico `<T, R>` que renderiza una lista de Accordions controlados. Es completamente **declarativo y agnostico**: interpreta configuracion sin aplicar logica de negocio. El componente recibe un array de datos de tipo `T`, los transforma a tipo `R` mediante `getItemData`, y renderiza cada item como un Accordion independiente con header y body configurables.

El componente soporta dos modos de operacion (`single` y `multiple`), control externo mediante un controller, y tres modos de estado: **no controlado** (estado interno), **controlado** (via `openIds`), y **controller** (via `useAcordionListController`).

---

## Importacion

```tsx
import { AcordionList } from 'GC-UI-COMPONENTS';
import { useAcordionListController } from 'GC-UI-COMPONENTS';
```

---

## Generics

El componente usa dos parametros de tipo:

| Generic | Descripcion |
|---------|-------------|
| `T` | Tipo original del dato en el array `data`. Es el tipo crudo que el consumidor proporciona. |
| `R` | Tipo transformado. Es lo que reciben los componentes de header y body via `itemData`. Se genera mediante `getItemData(item: T) => R`. |

Esto permite que el componente sea completamente agnostico: no conoce la estructura interna de los datos, solo sabe que `T` entra y `R` sale.

---

## Props Principales

### `AcordionListProps<T, R>`

| Prop | Tipo | Requerida | Descripcion |
|------|------|-----------|-------------|
| `id` | `string` | Si | Identificador unico del AcordionList. Se usa para `data-testid`. |
| `data` | `T[]` | Si | Array de datos origen. Cada elemento se transforma con `getItemData`. |
| `getItemId` | `(item: T, index: number) => string` | Si | Funcion que extrae un ID unico de cada item. Debe retornar un string estable y unico. |
| `getItemData` | `(item: T, index: number) => R` | Si | Funcion que transforma `T` en `R`. El resultado se pasa como `itemData` a header y body. |
| `itemHeader` | `AcordionListItemHeader<R>` | Si | Configuracion del header de cada accordion. Ver seccion Header. |
| `itemBody` | `AcordionListItemBody<R>` | Si | Configuracion del body de cada accordion. Ver seccion Body. |
| `layout` | `AcordionListLayout` | No | Configuracion de dimensiones del contenedor. |
| `behaviors` | `AcordionListBehaviors` | No | Comportamiento de apertura/cierre (modo single/multiple, IDs abiertos). |
| `callbacks` | `AcordionListCallbacks` | No | Funciones callback para eventos de toggle y cambio de estado. |
| `controller` | `AcordionListController` | No | Controller externo obtenido de `useAcordionListController()`. |
| `state` | `AcordionListState` | No | Estado visual del componente: `'idle'` \| `'loading'` \| `'empty'` \| `'error'`. Default: `'idle'`. |
| `statesComponents` | `AcordionListStatesComponents` | No | Configuracion visual personalizada por estado. Sigue el patron estandar documentado en `client/src/docs/README-STATES-COMPONENTS.md`. |
| `error` | `string` | No | Mensaje de error a mostrar cuando `state` es `'error'`. |
| `className` | `string` | No | Clase CSS adicional para el contenedor. |

---

## Configuracion del Header (`itemHeader`)

El header tiene dos variantes definidas por `renderType`:

### Variante `self`

El componente genera el header automaticamente usando una funcion que retorna un string.

```tsx
itemHeader={{
  renderType: 'self',
  getHeaderLabel: (itemData: DriverView) => `${itemData.name} — ${itemData.vehicle}`,
  arrowPosition: 'right',
}}
```

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `renderType` | `'self'` | - | Indica que el header se genera internamente. |
| `getHeaderLabel` | `(item: R) => string` | - | Funcion que recibe `itemData` (tipo `R`) y retorna el texto del header. |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura del header. |
| `height` | `number \| 'auto'` | - | Altura fija en pixels (solo si `heightMode: 'fixed'`). |
| `minHeight` | `number` | - | Altura minima en pixels. |
| `arrowPosition` | `'left' \| 'right' \| 'none'` | `'right'` | Posicion del indicador de flecha. `'none'` lo oculta. |

### Variante `component`

El consumidor proporciona un componente React personalizado que recibe `{ itemData: R }`.

```tsx
const CustomHeader: ComponentType<{ itemData: ProductView }> = ({ itemData }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <span>{itemData.name}</span>
    <span style={{ color: '#6b7280' }}>${itemData.price}</span>
  </div>
);

itemHeader={{
  renderType: 'component',
  render: CustomHeader,
  arrowPosition: 'left',
}}
```

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `renderType` | `'component'` | - | Indica que se usa un componente custom. |
| `render` | `ComponentType<{ itemData: R }>` | - | Componente React que recibe `{ itemData: R }` como props. |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura del header. |
| `height` | `number \| 'auto'` | - | Altura fija en pixels. |
| `minHeight` | `number` | - | Altura minima en pixels. |
| `arrowPosition` | `'left' \| 'right' \| 'none'` | `'right'` | Posicion del indicador de flecha. |

---

## Configuracion del Body (`itemBody`)

El body siempre usa `renderType: 'component'`. Recibe un componente React con `{ itemData: R }`.

```tsx
const DriverDetails: ComponentType<{ itemData: DriverView }> = ({ itemData }) => (
  <div style={{ padding: '12px' }}>
    <p>Vehiculo: {itemData.vehicle}</p>
    <p>Placa: {itemData.plate}</p>
    <p>Licencia: {itemData.license}</p>
  </div>
);

itemBody={{
  renderType: 'component',
  render: DriverDetails,
  heightMode: 'auto',
  behaviors: {
    scroll: false,
    renderComponentStrategy: 'always',
  },
}}
```

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `renderType` | `'component'` | - | Siempre `'component'`. El body no tiene variante `self`. |
| `render` | `ComponentType<{ itemData: R }>` | - | Componente React que renderiza el contenido del body. |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | Modo de altura del body. |
| `height` | `number \| 'auto'` | - | Altura fija en pixels. |
| `minHeight` | `number` | - | Altura minima. |
| `behaviors.scroll` | `boolean` | - | Habilita scroll interno dentro del body. |
| `behaviors.renderComponentStrategy` | `'once' \| 'always'` | - | `'once'`: monta el componente una vez y lo mantiene. `'always'`: remonta cada vez que se abre. |

---

## Layout (`layout`)

Controla las dimensiones del contenedor que envuelve todos los accordions.

```tsx
layout={{
  widthMode: 'full',
  heightMode: 'fixed',
  height: 450,
  gap: 8,
}}
```

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | `full`: 100% del ancho disponible. `auto`: ajusta al contenido. `fixed`: usa el valor de `width`. |
| `width` | `number` | - | Ancho fijo en pixels (solo con `widthMode: 'fixed'`). |
| `minWidth` | `number` | - | Ancho minimo en pixels. |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | `'auto'` | `full`: 100% de la altura disponible. `auto`: ajusta al contenido. `fixed`: usa el valor de `height`. |
| `height` | `number \| 'auto'` | - | Altura fija en pixels (solo con `heightMode: 'fixed'`). |
| `minHeight` | `number` | - | Altura minima en pixels. |
| `gap` | `number` | - | Espacio en pixels entre cada accordion de la lista. |

**Comportamiento importante**: Cuando `heightMode` es `'fixed'` o `'full'`, el contenedor agrega `overflow-y: auto` automaticamente, habilitando scroll vertical si el contenido excede la altura.

---

## Behaviors (`behaviors`)

Controla el comportamiento de apertura y cierre de los accordions.

```tsx
behaviors={{
  mode: 'single',
  defaultOpenIds: ['item-1'],
}}
```

| Prop | Tipo | Default | Descripcion |
|------|------|---------|-------------|
| `mode` | `'single' \| 'multiple'` | `'single'` | `single`: solo un accordion abierto a la vez (al abrir uno, cierra los demas). `multiple`: permite varios abiertos simultaneamente. |
| `defaultOpenIds` | `string[]` | `[]` | IDs de los accordions que inician abiertos. Solo se aplica en el montaje inicial. Funciona tanto sin controller como con controller. |
| `openIds` | `string[]` | - | **Modo controlado**: array de IDs abiertos manejados externamente. Cuando se proporciona, el componente no gestiona estado interno. |

### Modos de estado

El componente tiene tres modos de operacion segun la combinacion de props:

| Modo | Condicion | Descripcion |
|------|-----------|-------------|
| **No controlado** | Sin `openIds` ni `controller` | El componente maneja su propio estado interno con `useState`. |
| **Controlado** | Con `openIds` | El padre controla completamente que accordions estan abiertos. El componente no modifica estado. |
| **Controller** | Con `controller` | El estado se delega al controller externo (`useAcordionListController`). Permite control imperativo. |

---

## Callbacks (`callbacks`)

Funciones que se ejecutan cuando cambia el estado de los accordions.

```tsx
callbacks={{
  onToggle: (id, isOpen) => {
    console.log(`Accordion ${id} ${isOpen ? 'abierto' : 'cerrado'}`);
  },
  onOpenChange: (openIds) => {
    console.log('IDs abiertos:', openIds);
  },
}}
```

| Callback | Tipo | Descripcion |
|----------|------|-------------|
| `onToggle` | `(id: string, isOpen: boolean) => void` | Se ejecuta cuando un accordion individual cambia de estado. `id` es el ID del accordion, `isOpen` indica si se abrio (`true`) o cerro (`false`). |
| `onOpenChange` | `(openIds: string[]) => void` | Se ejecuta despues de cualquier cambio de estado. Recibe el array completo de todos los IDs actualmente abiertos. Util para sincronizar estado externo. |

---

## Controller (`useAcordionListController`)

Hook que crea un controller imperativo para manejar el estado de la lista desde fuera del componente.

### Uso basico

```tsx
import { useAcordionListController } from 'GC-UI-COMPONENTS';

const MyComponent = () => {
  const controller = useAcordionListController();

  return (
    <>
      <button onClick={() => controller.closeAll()}>Cerrar todos</button>
      <button onClick={() => controller.openAll()}>Abrir todos</button>
      <button onClick={() => controller.refreshAll()}>Refrescar</button>

      <AcordionList
        controller={controller}
        // ... demas props
      />
    </>
  );
};
```

### Metodos del controller

| Metodo | Tipo | Descripcion |
|--------|------|-------------|
| `open(id)` | `(id: string) => void` | Abre un accordion especifico por su ID. |
| `close(id)` | `(id: string) => void` | Cierra un accordion especifico por su ID. |
| `toggle(id)` | `(id: string) => void` | Alterna el estado de un accordion (abierto ↔ cerrado). |
| `closeAll()` | `() => void` | Cierra todos los accordions de la lista. |
| `openAll()` | `() => void` | Abre todos los accordions de la lista. Internamente obtiene todos los IDs del data actual. |
| `getOpenIds()` | `() => string[]` | Retorna un array con los IDs de todos los accordions actualmente abiertos. |
| `isOpen(id)` | `(id: string) => boolean` | Consulta si un accordion especifico esta abierto. |
| `refreshAll()` | `() => void` | Fuerza el re-renderizado de todos los accordions. Util cuando los datos internos cambian sin cambiar la referencia del array. |
| `refreshItem(id)` | `(id: string) => void` | Fuerza el re-renderizado de un accordion especifico. |
| `setState(state)` | `(state: AcordionListState) => void` | Cambia el estado visual del componente. Notifica a los suscriptores para re-render. |
| `getState()` | `() => AcordionListState` | Retorna el estado visual actual del componente. |

### Comportamiento del controller con mode `single`

Cuando se usa `controller` con `mode: 'single'`, el componente respeta la restriccion: al abrir un accordion via click, cierra automaticamente los demas. Sin embargo, los metodos `open()` y `openAll()` del controller operan directamente sobre el store sin aplicar la restriccion de modo. Esto es por diseno: el controller da control total al consumidor.

### Patron comun: controller + closeAll al cambiar datos

Cuando los datos externos cambian (paginacion, filtros, etc.), se recomienda llamar `controller.closeAll()` para evitar que queden abiertos accordions que ya no existen en la vista:

```tsx
const handlePageChange = (page: number) => {
  setCurrentPage(page);
  controller.closeAll();
};
```

---

## Estructura de Carpetas

```
AcordionList/
├── shared/                           # Codigo compartido web/mobile
│   ├── AcordionList.types.ts         # Interfaces y tipos TypeScript
│   ├── useAcordionListController.ts  # Hook del controller imperativo
│   └── index.ts                      # Re-exports
├── web/                              # Implementacion web
│   ├── css/
│   │   ├── AcordionList.module.css   # Estilos CSS del contenedor
│   │   ├── AcordionList.module.ts    # Helpers de estilos
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAcordionList.hook.ts   # Logica de estado y toggle
│   │   └── index.ts
│   ├── types/
│   │   ├── AcordionList.type.ts      # Tipos web-especificos
│   │   └── index.ts
│   ├── views/
│   │   ├── AcordionList.view.tsx     # Componente React principal
│   │   └── index.ts
│   └── index.tsx                     # Export web
├── mobile/                           # Implementacion mobile responsive
├── index.tsx                         # Dispatch web/mobile segun useIsMobile()
├── README.md                         # Documentacion general
└── README-WEB-IA.md                  # Este archivo
```

---

## Resolucion de Plataforma

- `index.tsx` raiz usa el hook `useIsMobile()` para decidir si renderizar la version `web/` o `mobile/`.
- En navegadores desktop se usa la implementacion `web/`.
- En navegadores moviles (ancho < 768px) se usa la implementacion `mobile/` (responsive).

---

## Tokens de Estilo (Shared)

Importa tokens desde `token.shared/` para estilos consistentes:

```typescript
import { colors, spacing, borderRadius } from '../../token.shared';

const style = {
  padding: spacing['4'],           // 16px
  backgroundColor: colors['gray-100'],
  borderRadius: borderRadius['lg'],
};
```

### Referencia rapida de tokens

| Token | Ejemplo | Valor |
|-------|---------|-------|
| `colors['gray-50']` | Fondo claro | `#f9fafb` |
| `colors['gray-100']` | Fondo gris | `#f3f4f6` |
| `colors['primary-500']` | Azul primario | `#3b82f6` |
| `spacing['2']` | Padding sm | `8px` |
| `spacing['4']` | Padding md | `16px` |
| `borderRadius['lg']` | Borde redondeado | `8px` |

---

## Ejemplos Completos

### Ejemplo 1: Header self + modo single

Caso basico. El header se genera con un string, solo un accordion abierto a la vez.

```tsx
import { AcordionList } from 'GC-UI-COMPONENTS';
import type { ComponentType } from 'react';

type Driver = { id: string; name: string; car: string; plate: string };
type DriverView = { name: string; vehicle: string; plate: string };

const DriverDetails: ComponentType<{ itemData: DriverView }> = ({ itemData }) => (
  <div style={{ padding: '12px 16px' }}>
    <p><strong>Vehiculo:</strong> {itemData.vehicle}</p>
    <p><strong>Placa:</strong> {itemData.plate}</p>
  </div>
);

const drivers: Driver[] = [
  { id: 'd1', name: 'Carlos', car: 'Toyota Corolla', plate: 'ABC-123' },
  { id: 'd2', name: 'Ana', car: 'Honda Civic', plate: 'XYZ-789' },
];

const Example1 = () => (
  <AcordionList<Driver, DriverView>
    id="drivers"
    data={drivers}
    getItemId={(item) => item.id}
    getItemData={(item) => ({
      name: item.name,
      vehicle: item.car,
      plate: item.plate,
    })}
    itemHeader={{
      renderType: 'self',
      getHeaderLabel: (d) => `${d.name} — ${d.vehicle} - ${d.plate}`,
      arrowPosition: 'right',
    }}
    itemBody={{
      renderType: 'component',
      render: DriverDetails,
    }}
    layout={{ widthMode: 'full', gap: 8 }}
    behaviors={{ mode: 'single' }}
  />
);
```

### Ejemplo 2: Header component + modo multiple + controller

Header personalizado con componente custom. Permite multiples abiertos. Controller para acciones externas.

```tsx
import { AcordionList, useAcordionListController } from 'GC-UI-COMPONENTS';
import type { ComponentType } from 'react';

type Product = { id: string; title: string; price: number; category: string };
type ProductView = { name: string; price: number; category: string };

const ProductHeader: ComponentType<{ itemData: ProductView }> = ({ itemData }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <span style={{ fontWeight: 600 }}>{itemData.name}</span>
    <span style={{ color: '#6b7280' }}>${itemData.price}</span>
  </div>
);

const ProductBody: ComponentType<{ itemData: ProductView }> = ({ itemData }) => (
  <div style={{ padding: '12px' }}>
    <p>Categoria: {itemData.category}</p>
    <p>Precio: ${itemData.price}</p>
  </div>
);

const products: Product[] = [
  { id: 'prod-1', title: 'Laptop', price: 999, category: 'Tech' },
  { id: 'prod-2', title: 'Silla', price: 250, category: 'Oficina' },
  { id: 'prod-3', title: 'Monitor', price: 450, category: 'Tech' },
];

const Example2 = () => {
  const controller = useAcordionListController();

  return (
    <>
      <button onClick={() => controller.closeAll()}>Cerrar todos</button>
      <button onClick={() => controller.openAll()}>Abrir todos</button>

      <AcordionList<Product, ProductView>
        id="products"
        data={products}
        controller={controller}
        getItemId={(item) => item.id}
        getItemData={(item) => ({
          name: item.title,
          price: item.price,
          category: item.category,
        })}
        itemHeader={{
          renderType: 'component',
          render: ProductHeader,
          arrowPosition: 'left',
        }}
        itemBody={{
          renderType: 'component',
          render: ProductBody,
        }}
        layout={{ widthMode: 'full', gap: 4 }}
        behaviors={{
          mode: 'multiple',
          defaultOpenIds: ['prod-1', 'prod-3'],
        }}
        callbacks={{
          onToggle: (id, isOpen) => console.log(id, isOpen),
          onOpenChange: (ids) => console.log('Abiertos:', ids),
        }}
      />
    </>
  );
};
```

### Ejemplo 3: Altura fija con scroll

Contenedor de 450px con scroll para listas largas.

```tsx
import { AcordionList } from 'GC-UI-COMPONENTS';
import type { ComponentType } from 'react';

type Order = { orderId: string; total: number; status: string };
type OrderView = { title: string; total: number; status: string };

const OrderDetails: ComponentType<{ itemData: OrderView }> = ({ itemData }) => (
  <div style={{ padding: '12px' }}>
    <p>Estado: {itemData.status}</p>
    <p>Total: ${itemData.total}</p>
  </div>
);

const orders: Order[] = Array.from({ length: 15 }, (_, i) => ({
  orderId: `ord-${i + 1}`,
  total: Math.round(Math.random() * 500 + 50),
  status: i % 3 === 0 ? 'Completado' : i % 3 === 1 ? 'Pendiente' : 'Enviado',
}));

const Example3 = () => (
  <AcordionList<Order, OrderView>
    id="orders"
    data={orders}
    getItemId={(item) => item.orderId}
    getItemData={(item) => ({
      title: `Orden #${item.orderId}`,
      total: item.total,
      status: item.status,
    })}
    itemHeader={{
      renderType: 'self',
      getHeaderLabel: (d) => `${d.title} - $${d.total}`,
    }}
    itemBody={{
      renderType: 'component',
      render: OrderDetails,
    }}
    layout={{
      widthMode: 'full',
      heightMode: 'fixed',
      height: 450,
      gap: 6,
    }}
    behaviors={{ mode: 'multiple' }}
  />
);
```

### Ejemplo 4: Integracion con Paginator

Paginacion externa: el AcordionList solo recibe el slice de datos de la pagina actual.

```tsx
import { useState, useMemo } from 'react';
import { AcordionList, useAcordionListController } from 'GC-UI-COMPONENTS';
import { Paginator } from 'GC-UI-COMPONENTS';
import type { ComponentType } from 'react';

type Employee = { id: string; name: string; role: string };

const EmployeeBody: ComponentType<{ itemData: Employee }> = ({ itemData }) => (
  <div style={{ padding: '12px' }}>
    <p>Rol: {itemData.role}</p>
  </div>
);

const allData: Employee[] = Array.from({ length: 40 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: `Empleado ${i + 1}`,
  role: i % 2 === 0 ? 'Desarrollador' : 'Disenador',
}));

const Example4 = () => {
  const controller = useAcordionListController();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = ({ page }: { page: number }) => {
    setCurrentPage(page);
    controller.closeAll();
  };

  const handleItemsPerPageChange = ({ itemsPerPage: newSize }: { itemsPerPage: number }) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
    controller.closeAll();
  };

  return (
    <>
      <AcordionList<Employee, Employee>
        id="paginated-list"
        data={paginatedData}
        controller={controller}
        getItemId={(item) => item.id}
        getItemData={(item) => item}
        itemHeader={{
          renderType: 'self',
          getHeaderLabel: (d) => `${d.name} - ${d.role}`,
        }}
        itemBody={{
          renderType: 'component',
          render: EmployeeBody,
        }}
        layout={{ widthMode: 'full', gap: 8 }}
        behaviors={{ mode: 'multiple' }}
      />
      <Paginator
        totalItems={allData.length}
        initialCurrentPage={1}
        initialItemsPerPage={5}
        itemsPerPageOptions={[5, 10, 15, 20]}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </>
  );
};
```

---

## States (`state` + `statesComponents`)

El componente soporta estados visuales para representar diferentes fases de carga de datos asincronos. Sigue el patron estandar documentado en `client/src/docs/README-STATES-COMPONENTS.md`.

### Estados disponibles (`AcordionListState`)

| Estado | Comportamiento | Tiene `StateConfig` |
|--------|---------------|:-------------------:|
| `idle` | Estado inicial. El componente se monto pero aun no tiene datos. Muestra el contenido normal (vacio). | NO |
| `loading` | Muestra un spinner animado y texto "Loading..." por defecto, o el componente custom configurado. | SI |
| `success` | Datos cargados exitosamente. Muestra el contenido normal del componente (accordions con datos). | NO |
| `empty` | Muestra texto "No data available" por defecto, o el componente custom configurado. | SI |
| `error` | Muestra el mensaje de error (prop `error`) o texto por defecto. | SI |

> `idle` y `success` muestran el contenido normal del componente. Solo `loading`, `empty` y `error` tienen visualizacion especial configurable.

### Ciclo de vida

```
idle (montaje) → loading → success (datos visibles) / empty / error
                  ↑                     │
                  └─────────────────────┘ (recarga)
```

### Configuracion por estado (`AcordionListStateConfig`)

Solo `loading`, `empty` y `error` aceptan la configuracion del patron estandar:

| Prop | Tipo | Descripcion |
|------|------|-------------|
| `renderType` | `'component' \| 'self'` | `'self'`: visual interno por defecto. `'component'`: renderiza el `render` proporcionado. |
| `render` | `ReactNode` | Componente custom a renderizar (solo cuando `renderType: 'component'`). |
| `widthMode` | `'full' \| 'auto' \| 'fixed'` | Modo de ancho del contenedor del estado. |
| `width` | `number` | Ancho fijo en pixels. |
| `minWidth` | `number` | Ancho minimo en pixels. |
| `heightMode` | `'full' \| 'auto' \| 'fixed'` | Modo de alto del contenedor del estado. |
| `height` | `number \| 'auto'` | Alto fijo o auto. |
| `minHeight` | `number` | Alto minimo en pixels. |
| `verticalAlign` | `'top' \| 'middle' \| 'bottom'` | Alineacion vertical del contenido. Default: `'middle'`. |
| `horizontalAlign` | `'left' \| 'center' \| 'right'` | Alineacion horizontal del contenido. Default: `'center'`. |

### Ejemplo: control via prop `state`

```tsx
<AcordionList
  id="my-list"
  data={data}
  state="loading"
  statesComponents={{
    loading: { renderType: 'self' },
    empty: {
      renderType: 'component',
      render: <div>No se encontraron resultados</div>,
      heightMode: 'fixed',
      height: 200,
      verticalAlign: 'middle',
      horizontalAlign: 'center',
    },
    error: {
      renderType: 'component',
      render: <div style={{ color: 'red' }}>Error al cargar datos</div>,
    },
  }}
  error="Timeout de conexion"
  // ... demas props
/>
```

### Ejemplo: control via controller

```tsx
const controller = useAcordionListController();

// Simular carga asincrona
const fetchData = async () => {
  controller.setState('loading');
  try {
    const result = await api.getData();
    if (result.length === 0) {
      controller.setState('empty');
    } else {
      setData(result);
      controller.setState('success'); // datos cargados, muestra contenido normal
    }
  } catch (err) {
    controller.setState('error');
  }
};

<AcordionList controller={controller} data={data} ... />
```

### Prioridad de estado

El estado se resuelve en este orden:
1. Estado del controller (`controller.getState()`) — tiene prioridad
2. Prop `state` — se usa si no hay controller
3. Default: `'idle'`

### CSS Variables

| Variable | Default | Descripcion |
|----------|---------|-------------|
| `--acordion-list-state-text` | `#6b7280` | Color del texto de estados |
| `--acordion-list-border` | `#e5e7eb` | Color del borde del spinner |
| `--acordion-list-primary` | `#3b82f6` | Color primario del spinner |
| `--acordion-list-error` | `#dc2626` | Color del texto de error |
| `--acordion-list-muted` | `#9ca3af` | Color del texto de empty |

---

## Notas Tecnicas

- El componente usa `key={itemId}-${refreshKey}-${itemRefresh}` en cada accordion para forzar re-montaje cuando se llama `refreshAll()` o `refreshItem()`.
- El controller usa un patron pub/sub interno: almacena estado en un `useRef` y notifica cambios via suscriptores sin causar re-renders innecesarios del componente padre.
- `openAll()` obtiene los IDs de todos los items del data actual mediante una funcion interna `_setAllItemIds` que se inyecta desde el hook.
- En modo `single` con controller, el `handleToggle` cierra explicitamente los otros accordions abiertos antes de abrir el nuevo.
- El componente es completamente agnostico: no conoce `T` ni `R`, solo sabe que `getItemId` retorna un string y `getItemData` retorna algo que se pasa a los componentes de header/body.
