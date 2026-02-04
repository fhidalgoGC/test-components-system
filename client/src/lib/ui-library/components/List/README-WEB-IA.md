# List - Web Version

## Overview

Implementación web del componente List usando React DOM. Renderiza listas con control externo del ciclo de vida, soporte para scroll infinito y estados de render declarativos.

## Folder Structure

```
web/
├── css/
│   ├── index.ts
│   └── List.module.css      # Estilos CSS
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

## Uso

```tsx
import { List, useListController } from '@/lib/ui-library/components/List';

interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductList = () => {
  const controller = useListController<Product>();

  useEffect(() => {
    controller.setRenderState('renderLoading');
    
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        controller.setData(data);
        controller.setRenderState('renderComplete');
      });
  }, []);

  return (
    <List
      id="products"
      controller={controller}
      layout={{
        widthMode: 'full',
        heightMode: 'fixed',
        height: 400
      }}
      behaviors={{
        scroll: 'normal'
      }}
      data={[]}
      item={{
        renderType: 'component',
        render: (product) => (
          <div className="product-card">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </div>
        )
      }}
    />
  );
};
```

## Props Específicas Web

### Layout

```tsx
layout={{
  widthMode: 'full' | 'auto' | 'fixed',
  width: number,          // Solo si widthMode='fixed'
  minWidth: number,
  heightMode: 'full' | 'auto' | 'fixed',
  height: number | 'auto', // Solo si heightMode='fixed'
  minHeight: number,
}}
```

### Behaviors

```tsx
behaviors={{
  scroll: 'normal' | 'infinityScroll' | 'none',
  paginator: {
    maxItem: number  // Items por página
  }
}}
```

### Loading

```tsx
loading={{
  renderType: 'component' | 'self',
  render: ReactNode | Component,  // Custom loading component
  position: 'top' | 'bottom' | 'over'
}}
```

## Infinite Scroll

El componente usa `IntersectionObserver` para detectar cuando el usuario se acerca al final de la lista:

```tsx
<List
  id="infinite"
  behaviors={{
    scroll: 'infinityScroll',
    paginator: { maxItem: 20 }
  }}
  callbacks={{
    onScrollInfinity: (page) => {
      // Se dispara cuando el sentinel entra en el viewport
      controller.setRenderState('renderLoading');
      loadMore(page).then(data => {
        controller.appendData(data);
        controller.setRenderState('renderComplete');
      });
    }
  }}
  // ...
/>
```

## CSS Classes

El componente usa CSS modules con las siguientes clases:

- `.container` - Contenedor principal
- `.list` - Lista de items
- `.item` - Wrapper de cada item
- `.loadingContainer` - Contenedor del loading
- `.spinner` - Spinner de carga por defecto
- `.errorState` - Estado de error
- `.emptyState` - Estado vacío
- `.sentinel` - Elemento invisible para infinite scroll

## Platform Resolution

El `index.tsx` principal usa `useIsMobile()` para dispatch:

```typescript
if (isMobile) {
  return <ListMobile {...props} />;  // < 768px
}
return <ListWeb {...props} />;        // >= 768px
```
