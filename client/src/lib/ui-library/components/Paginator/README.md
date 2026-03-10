# Paginator Component

Componente de paginación externamente controlado con soporte i18n, layout flexible, generación de números de página con ellipsis y soporte dual web/mobile.

## Importación

```tsx
import { Paginator } from "@/lib/ui-library/components/Paginator";
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `totalItems` | `number` | requerido | Número total de elementos a paginar |
| `initialCurrentPage` | `number` | `1` | Página inicial |
| `initialItemsPerPage` | `number` | `10` | Elementos por página inicial |
| `itemsPerPageOptions` | `number[]` | `[10, 25, 50, 100]` | Opciones del selector de elementos por página |
| `onPageChange` | `(page: number) => void` | - | Callback al cambiar de página |
| `onItemsPerPageChange` | `(itemsPerPage: number) => void` | - | Callback al cambiar elementos por página |
| `showItemsPerPage` | `boolean` | `true` | Mostrar/ocultar la sección completa de selector de elementos por página (dropdown/botón + texto "de X elementos") |
| `showPageNumbers` | `boolean` | `true` | Mostrar/ocultar números de página y navegación |
| `maxVisiblePages` | `number` | `4` (web) / `3` (mobile) | Cantidad máxima de números de página visibles |
| `className` | `string` | - | Clase CSS adicional |
| `langOverride` | `string` | - | Override del idioma (`'en'`, `'es'`) |
| `i18nOrder` | `'global-first' \| 'local-first'` | `'local-first'` | Prioridad de traducciones |
| `config` | `VisibilityConfig` | - | Configuración de visibilidad responsive |

## Platform Support

| Platform | Status | Descripción |
|----------|--------|-------------|
| Web | Implementado | Select nativo para items por página |
| Mobile | Implementado | BottomSheet para selección de items por página |

### Diferencias Web vs Mobile

| Feature | Web | Mobile |
|---------|-----|--------|
| Items per page selector | `<select>` nativo | Botón que abre BottomSheet |
| maxVisiblePages default | 4 | 3 |
| Page buttons | hover states | tap states (touch optimized) |
| Resolución | Automática via `useIsMobile()` (< 768px) | |

## maxVisiblePages - Limite de numeros visibles

Controla cuantos numeros de pagina se muestran. Por defecto muestra maximo **4** numeros en web y **3** en mobile. La ventana de paginas se centra alrededor de la pagina actual, asegurando que siempre se vea al menos una pagina anterior y una siguiente (cuando existen).

### Reglas

1. La pagina actual siempre muestra la pagina siguiente y anterior (si existen)
2. `...` aparece cuando hay paginas ocultas entre los numeros visibles
3. Se muestra la primera y/o ultima pagina como referencia cuando no estan en la ventana visible

### Ejemplos (maxVisiblePages=4, 10 paginas)

```
Pagina 1:    [1]  2   3  ...  10    (inicio, muestra siguiente)
Pagina 2:   1   [2]  3  ...  10    (inicio, muestra siguiente)
Pagina 3:   1   2   [3]  4  ...  10 (transicion, muestra siguiente)
Pagina 4:   1  ...  3  [4]  5  ...  10  (zona media)
Pagina 5:   1  ...  4  [5]  6  ...  10  (zona media)
Pagina 8:   1  ...  7  [8]  9   10  (transicion al final)
Pagina 9:   1  ...  8  [9]  10      (cerca del final)
Pagina 10:  1  ...  8   9  [10]     (final)
4 paginas:  1   2   3   4           (sin ellipsis, caben todas)
```

### Ejemplos (maxVisiblePages=6, 44 paginas)

```
Pagina 1:   [1]  2   3   4   5  ...  44
Pagina 4:    1   2   3  [4]  5   6  ...  44
Pagina 22:   1  ...  20  21  [22]  23  24  ...  44
Pagina 44:   1  ...  40  41  42  43  [44]
```

```tsx
<Paginator totalItems={100} maxVisiblePages={4} />

<Paginator totalItems={435} maxVisiblePages={6} />
```

## Estilos - Sin padding ni margin

El componente **no** incluye padding, margin, borde ni background por defecto. Esto permite que el componente padre controle completamente el espaciado y la apariencia visual.

```tsx
// El padre controla el espaciado:
<div style={{ padding: '8px 16px', borderTop: '1px solid #e5e7eb', backgroundColor: '#fff' }}>
  <Paginator totalItems={100} />
</div>
```

## Uso Básico

```tsx
<Paginator
  totalItems={100}
  onPageChange={(page) => console.log('Página:', page)}
  onItemsPerPageChange={(items) => console.log('Items por página:', items)}
/>
```

## Sin selector de items por página

Cuando `showItemsPerPage={false}`, se oculta toda la sección de selección: el dropdown (web) o botón (mobile), el texto "mostrando", y el texto "de X elementos". Solo quedan visibles los controles de paginación (números de página y botones de navegación).

```tsx
<Paginator
  totalItems={100}
  showItemsPerPage={false}
/>
```

## Personalización de opciones

```tsx
<Paginator
  totalItems={500}
  initialItemsPerPage={25}
  itemsPerPageOptions={[25, 50, 100]}
  maxVisiblePages={6}
/>
```

## Internacionalización

```tsx
<Paginator
  totalItems={200}
  langOverride="es"
  i18nOrder="local-first"
/>
```

## Context y Hook

El componente expone un contexto para acceso programático:

```tsx
import { usePaginatorContext } from "@/lib/ui-library/components/Paginator";

const {
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  goToPage,
  goToFirstPage,
  goToLastPage,
  goToPreviousPage,
  goToNextPage,
  setItemsPerPage,
  canGoPrevious,
  canGoNext,
} = usePaginatorContext();
```

## Hook externo usePaginator

Para controlar la paginación desde fuera del componente:

```tsx
import { usePaginator } from "@/lib/ui-library/components/Paginator";

const { metadata } = usePaginator({
  totalItems: 435,
  currentPage: 1,
  itemsPerPage: 10,
});

// metadata: { totalItems, currentPage, itemsPerPage, totalPages, startItem, endItem }
```

## Mobile - BottomSheet para Items Per Page

En mobile (< 768px), el selector de items por página se reemplaza por un botón que abre un BottomSheet con las opciones disponibles. Cada opción muestra el número de items y un check si es la opción activa.

## Estructura de Archivos

```
Paginator/
├── shared/                              # Compartido entre web y mobile
│   ├── types/
│   │   ├── Paginator.type.ts           # Props, interfaces, tipos
│   │   └── index.ts
│   ├── hooks/
│   │   ├── usePaginator.hook.ts        # Hook de control externo
│   │   ├── useI18nMerge.hook.ts        # Fusión de traducciones
│   │   ├── useVisibility.hook.ts       # Visibilidad responsive
│   │   └── index.ts
│   ├── providers/
│   │   ├── Paginator.provider.tsx      # Context provider
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.json                     # Traducciones inglés
│   │   ├── es.json                     # Traducciones español
│   │   └── index.ts
│   ├── environment/
│   │   ├── enviroment.ts              # Config del componente
│   │   └── index.ts
│   ├── utils/
│   │   ├── paginator.util.ts          # Utilidades
│   │   └── index.ts
│   └── index.ts
├── web/
│   ├── styles/
│   │   └── Paginator.module.css        # Estilos web
│   ├── views/
│   │   ├── Paginator.view.tsx          # Vista web (select nativo)
│   │   └── index.ts
│   └── index.tsx
├── mobile/
│   ├── styles/
│   │   └── Paginator.mobile.module.css # Estilos mobile (touch optimized)
│   ├── views/
│   │   ├── Paginator.mobile.view.tsx   # Vista mobile (BottomSheet)
│   │   └── index.ts
│   └── index.tsx
├── index.tsx                            # Dispatch Web/Mobile + exports
└── README.md
```
