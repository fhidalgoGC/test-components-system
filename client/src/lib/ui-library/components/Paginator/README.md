# Paginator Component

Componente de paginación externamente controlado con soporte i18n, layout flexible y generación de números de página con ellipsis.

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
| `showItemsPerPage` | `boolean` | `true` | Mostrar/ocultar selector de elementos por página |
| `showPageNumbers` | `boolean` | `true` | Mostrar/ocultar números de página y navegación |
| `maxVisiblePages` | `number` | `4` | Cantidad máxima de números de página visibles |
| `className` | `string` | - | Clase CSS adicional |
| `langOverride` | `string` | - | Override del idioma (`'en'`, `'es'`) |
| `i18nOrder` | `'global-first' \| 'local-first'` | `'local-first'` | Prioridad de traducciones |
| `config` | `VisibilityConfig` | - | Configuración de visibilidad responsive |

## maxVisiblePages - Límite de números visibles

Controla cuántos números de página se muestran. Por defecto muestra máximo **4** números con ellipsis para las páginas intermedias.

### Ejemplos

```tsx
// Default (maxVisiblePages=4), 44 páginas, página actual 1:
// [1] 2 3 ... 44

// maxVisiblePages=4, 44 páginas, página actual 22:
// 1 ... 22 ... 44

// maxVisiblePages=4, 4 páginas (muestra todas sin ellipsis):
// 1 2 3 4

// maxVisiblePages=6, 44 páginas, página actual 1:
// [1] 2 3 4 5 ... 44
```

```tsx
<Paginator totalItems={435} maxVisiblePages={4} />

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

## Estructura de Archivos

```
Paginator/
├── css/                # Estilos CSS Modules
├── hooks/              # usePaginator, useVisibility, useI18nMerge
├── i18n/               # Traducciones (en.json, es.json)
├── providers/          # PaginatorProvider (contexto)
├── types/              # PaginatorProps, PaginatorContext, PaginatorMetadata
├── views/              # PaginatorView (renderizado)
├── environment/        # Configuración de entorno
├── utils/              # Utilidades
└── index.tsx           # Exportación principal
```
