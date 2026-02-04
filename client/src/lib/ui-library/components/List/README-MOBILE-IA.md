# List - Mobile Responsive Version

## Overview

Implementación mobile responsive del componente List. Usa el mismo runtime de React DOM que la versión web pero con optimizaciones para pantallas pequeñas y touch.

## Folder Structure

```
mobile/
├── css/
│   ├── index.ts
│   └── List.module.css      # Estilos mobile-optimized
├── hooks/
│   ├── index.ts
│   └── useList.hook.ts      # Lógica del componente
├── types/
│   ├── index.ts
│   └── List.type.ts         # Re-export de tipos compartidos
├── views/
│   ├── index.ts
│   └── List.view.tsx        # Componente React
└── index.tsx                # Export principal
```

## Diferencias con Web

### CSS

- `-webkit-overflow-scrolling: touch` para scroll nativo en iOS
- Touch targets más grandes
- Layouts optimizados para ancho completo

### Uso

```tsx
import { List, useListController } from '@/lib/ui-library/components/List';

const MobileProductList = () => {
  const controller = useListController<Product>();

  return (
    <List
      id="mobile-products"
      controller={controller}
      layout={{
        widthMode: 'full',
        heightMode: 'auto'  // Se adapta al contenido en mobile
      }}
      behaviors={{
        scroll: 'infinityScroll',
        paginator: { maxItem: 10 }  // Menos items en mobile
      }}
      callbacks={{
        onScrollInfinity: async (page) => {
          controller.setRenderState('renderLoading');
          const data = await loadMore(page);
          controller.appendData(data);
          controller.setRenderState('renderComplete');
        }
      }}
      data={[]}
      item={{
        renderType: 'component',
        render: (product) => (
          <MobileProductCard product={product} />
        )
      }}
    />
  );
};
```

## Optimizaciones Mobile

1. **Touch-first** - Scroll nativo con momentum
2. **Full-width** - Items ocupan todo el ancho disponible
3. **Performance** - Carga menos items por página
4. **Lazy loading** - IntersectionObserver para infinite scroll

## Controller API

Misma API que la versión web:

```tsx
const controller = useListController<T>();

controller.setData(items);        // Reemplaza data
controller.appendData(items);     // Agrega items (infinite scroll)
controller.setRenderState(state); // Cambia estado visual
controller.reload();              // Reset completo
controller.getPage();             // Página actual
controller.getTotalItems();       // Total de items
```

## Estados de Render

| Estado | Visual |
|--------|--------|
| `renderIdle` | "Waiting for data..." |
| `renderLoading` | Spinner animado |
| `renderComplete` | Lista de items |
| `renderError` | "Error loading data" |

## Platform Resolution

El componente mobile se activa automáticamente cuando el viewport es menor a 768px:

```typescript
const isMobile = useIsMobile(); // true si < 768px

if (isMobile) {
  return <ListMobile {...props} />;
}
return <ListWeb {...props} />;
```
