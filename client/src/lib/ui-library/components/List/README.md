# List Component

Componente List agnóstico y reutilizable con control externo del ciclo de render. El componente no interpreta, transforma ni obtiene data - su única responsabilidad es renderizar una colección de ítems.

## Características

- Control externo mediante `useListController` hook
- Estados de render explícitos: `renderIdle`, `renderLoading`, `renderComplete`, `renderError`
- Soporte para scroll normal, infinite scroll y sin scroll
- Paginación configurable
- Loading indicator customizable (top, bottom, over)
- Multi-plataforma (Web y Mobile)

## Instalación

```tsx
import { List, useListController } from '@/lib/ui-library/components/List';
```

## API del Componente

```tsx
type ListProps<T> = {
  id: string;

  layout?: {
    widthMode?: 'full' | 'auto' | 'fixed';
    width?: number;
    minWidth?: number;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
  };

  callbacks?: {
    onScroll?: (id: string) => void;
    onScrollInfinity?: (page: number) => void;
  };

  behaviors?: {
    scroll?: 'normal' | 'infinityScroll' | 'none';
    paginator?: {
      maxItem: number;
    };
  };

  loading?: {
    renderType?: 'component' | 'self';
    render?: ReactNode | Component;
    position?: 'top' | 'bottom' | 'over';
  };

  item: {
    renderType: 'component';
    render: (item: T, index: number) => ReactNode;
    heightMode?: 'full' | 'auto' | 'fixed';
    height?: number | 'auto';
    minHeight?: number;
  };

  data: T[];
  controller?: ListController<T>;
};
```

## API del Hook

```tsx
type ListController<T> = {
  setData: (data: T[]) => void;
  appendData: (data: T[]) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setRenderState: (state: RenderState) => void;
  getRenderState: () => RenderState;
  reload: () => void;
  getPage: () => number;
  getPageSize: () => number;
  getTotalItems: () => number;
};

type RenderState = 'renderIdle' | 'renderLoading' | 'renderComplete' | 'renderError';
```

## Uso Básico

### Lista Estática

```tsx
const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

<List
  id="simple-list"
  data={items}
  item={{
    renderType: 'component',
    render: (item) => <div>{item.name}</div>
  }}
/>
```

### Con Control Externo

```tsx
const controller = useListController<Item>();

useEffect(() => {
  controller.setRenderState('renderLoading');
  
  fetchData()
    .then(data => {
      controller.setData(data);
      controller.setRenderState('renderComplete');
    })
    .catch(() => {
      controller.setRenderState('renderError');
    });
}, []);

<List
  id="controlled-list"
  controller={controller}
  data={[]}
  item={{
    renderType: 'component',
    render: (item) => <ItemCard {...item} />
  }}
/>
```

### Infinite Scroll

```tsx
const controller = useListController<Item>();

<List
  id="infinite-list"
  controller={controller}
  behaviors={{
    scroll: 'infinityScroll',
    paginator: { maxItem: 10 }
  }}
  loading={{
    renderType: 'self',
    position: 'bottom'
  }}
  callbacks={{
    onScrollInfinity: (page) => {
      controller.setRenderState('renderLoading');
      
      fetchMore(page)
        .then(data => {
          controller.appendData(data);
          controller.setRenderState('renderComplete');
        })
        .catch(() => {
          controller.setRenderState('renderError');
        });
    }
  }}
  data={[]}
  item={{
    renderType: 'component',
    render: (item) => <ItemCard {...item} />
  }}
/>
```

## Estados de Render

| Estado | Descripción |
|--------|-------------|
| `renderIdle` | Estado inicial, sin data ni loading |
| `renderLoading` | Estado visual de carga |
| `renderComplete` | Data cargada y renderizada |
| `renderError` | Error durante la carga |

## Platform Documentation

| Platform | File |
|----------|------|
| Web | [README-WEB-IA.md](./README-WEB-IA.md) |
| Mobile | [README-MOBILE-IA.md](./README-MOBILE-IA.md) |

## Folder Structure

```
List/
├── shared/             # Tipos y hooks compartidos
│   ├── List.types.ts
│   ├── useListController.ts
│   └── index.ts
├── web/                # Implementación web
├── mobile/             # Implementación mobile
├── index.tsx           # Web/Mobile dispatch
└── README.md
```
