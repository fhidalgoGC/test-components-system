# BottomSheetWrapper

Wrapper mobile para mostrar contenido en un bottom sheet deslizante. Acepta cualquier componente como children.

## Plataformas

| Plataforma | Estado |
|------------|--------|
| Mobile (< 768px) | Implementado |
| Web (≥ 768px) | NotImplemented |

## Estructura

```
BottomSheetWrapper/
├── mobile/
│   ├── css/
│   │   └── BottomSheetWrapper.mobile.module.css
│   ├── types/
│   │   ├── BottomSheetWrapper.types.ts
│   │   └── index.ts
│   ├── views/
│   │   ├── BottomSheetWrapper.mobile.view.tsx
│   │   └── index.ts
│   └── index.ts
├── index.tsx
└── README.md
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controla visibilidad del bottom sheet |
| `onClose` | `() => void` | — | Callback al cerrar |
| `title` | `string` | — | Título en el header |
| `subtitle` | `string` | — | Subtítulo debajo del título |
| `header` | `ReactNode` | — | Header personalizado (reemplaza title/subtitle) |
| `children` | `ReactNode` | — | Contenido del body (scrollable) |
| `footer` | `ReactNode` | — | Contenido fijo en el footer |
| `showCloseButton` | `boolean` | `true` | Mostrar botón de cerrar |
| `showDragHandle` | `boolean` | `true` | Mostrar barra de drag en la parte superior |
| `heightMode` | `'auto' \| 'full' \| 'half' \| 'custom'` | `'auto'` | Modo de altura |
| `customHeight` | `string` | — | Altura personalizada (solo con `heightMode: 'custom'`) |
| `closeOnOverlayClick` | `boolean` | `true` | Cerrar al hacer click en el overlay |
| `overlayOpacity` | `number` | `0.4` | Opacidad del overlay (0 a 1) |
| `className` | `string` | `''` | Clases adicionales para el sheet |
| `contentClassName` | `string` | `''` | Clases adicionales para el body |
| `dataTestId` | `string` | `'bottom-sheet'` | Prefijo para data-testid |

## Uso

```tsx
import { BottomSheetWrapper } from '@/lib/ui-library/components/wrappers/BottomSheetWrapper';

function MyComponent() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Abrir</button>

      <BottomSheetWrapper
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Seleccionar opción"
        subtitle="Elige una de las siguientes"
      >
        <div style={{ padding: 16 }}>
          <p>Cualquier contenido aquí</p>
        </div>
      </BottomSheetWrapper>
    </>
  );
}
```

### Con footer

```tsx
<BottomSheetWrapper
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Filtros"
  footer={
    <button onClick={handleApply}>Aplicar filtros</button>
  }
>
  <FilterList />
</BottomSheetWrapper>
```

### Con header personalizado

```tsx
<BottomSheetWrapper
  isOpen={open}
  onClose={() => setOpen(false)}
  header={<MyCustomHeader />}
>
  <Content />
</BottomSheetWrapper>
```

### Altura personalizada

```tsx
<BottomSheetWrapper
  isOpen={open}
  onClose={() => setOpen(false)}
  heightMode="custom"
  customHeight="70vh"
>
  <TallContent />
</BottomSheetWrapper>
```

## Mejoras sobre el ejemplo original

- `showDragHandle`: barra visual de drag estilo nativo iOS/Android
- `heightMode: 'custom'` con `customHeight`: altura totalmente configurable
- `closeOnOverlayClick`: control de si el overlay cierra o no
- `overlayOpacity`: opacidad configurable del overlay
- `contentClassName`: clases separadas para el body vs el sheet
- CSS Modules en vez de Tailwind inline (encapsulación)
- `overscroll-behavior: contain` para evitar scroll del body
- `-webkit-overflow-scrolling: touch` para scroll suave en iOS
- `safe-area-inset-bottom` en el footer para dispositivos con notch
- Animación `slideUp` con keyframes CSS
