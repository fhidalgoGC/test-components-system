# Modal Component

Componente modal agnóstico con control 100% externo vía `useModalController`. No gestiona estado interno; solo interpreta configuración recibida por props.

## Características

- Control externo completo vía `useModalController` hook
- Estados visuales: `idle`, `loading`, `success`, `empty`, `error`
- Overlay configurable (opacidad, color, blur, cierre al click)
- Botón cerrar personalizable (posición, render custom)
- Layout flexible: header / body / footer con alineación
- Modos de tamaño: `full`, `auto`, `fixed`
- Cierre con tecla Escape
- Bloqueo de scroll del body cuando está abierto
- Soporte dual Web (centrado) y Mobile (bottom sheet) via `useResponsive` hook (`client/src/lib/ui-library/hooks/useResponsive.ts`)

## Platform Documentation

| Platform | File | Description |
|----------|------|-------------|
| Web | [README-WEB-IA.md](./README-WEB-IA.md) | Modal centrado en pantalla |
| Mobile Responsive | [README-MOBILE-IA.md](./README-MOBILE-IA.md) | Bottom sheet desde abajo |

## Folder Structure

```
Modal/
├── types.ts                # Tipos compartidos (ModalProps, ModalState, etc.)
├── hooks/
│   ├── index.ts
│   └── useModalController.ts  # Hook de control externo
├── web/
│   ├── css/Modal.module.css
│   ├── views/Modal.view.tsx
│   ├── types/Modal.type.ts    # Re-exporta tipos compartidos
│   ├── i18n/en.json, es.json
│   └── index.tsx
├── mobile/
│   ├── css/Modal.module.css
│   ├── views/Modal.view.tsx
│   ├── types/Modal.type.ts
│   ├── i18n/en.json, es.json
│   └── index.tsx
└── index.tsx               # Dispatch Web/Mobile via useResponsive (useIsMobile)
```

## Usage

```tsx
import { Modal, useModalController } from 'GC-UI-COMPONENTS';

const MyComponent = () => {
  const modal = useModalController();

  return (
    <>
      <button onClick={modal.open}>Abrir Modal</button>

      <Modal
        isOpen={modal.isOpen}
        state={modal.state}
        overlay={{ enabled: true, opacity: 0.5, closeOnClick: true }}
        closeButton={{ visible: true, position: 'top-right' }}
        layout={{ widthMode: 'fixed', width: 480 }}
        header={{
          render: <h3>Título</h3>,
          horizontalAlign: 'left',
        }}
        body={{
          render: <p>Contenido del modal</p>,
        }}
        footer={{
          render: (
            <div className="flex gap-2 justify-end">
              <button onClick={modal.close}>Cancelar</button>
              <button onClick={() => modal.close()}>Confirmar</button>
            </div>
          ),
        }}
        callbacks={{ onClose: modal.close }}
      />
    </>
  );
};
```

## useModalController API

```tsx
const modal = useModalController<T>();

modal.isOpen          // boolean
modal.state           // ModalState
modal.open()          // Abre el modal (state → 'idle')
modal.close()         // Cierra el modal (limpia selectedData)
modal.closeWithData(data)  // Cierra guardando data
modal.setState(state) // Cambia estado visual
modal.setSelectedData(data)
modal.selectedData    // T | undefined
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | required | Controla visibilidad |
| `state` | `ModalState` | `'idle'` | Estado visual actual |
| `overlay` | `OverlayConfig` | `{ enabled: true }` | Configuración del overlay |
| `closeButton` | `CloseButtonConfig` | `{ visible: true }` | Botón de cerrar |
| `layout` | `LayoutConfig` | `{ widthMode: 'auto' }` | Dimensiones del modal |
| `header` | `SectionConfig` | - | Sección header |
| `body` | `SectionConfig` | - | Sección body |
| `footer` | `SectionConfig` | - | Sección footer |
| `statesComponents` | `StatesComponents` | - | Renders por estado |
| `callbacks` | `ModalCallbacks` | - | `onClose`, `onConfirm` |
| `data` | `ModalDataItem[]` | - | Datos opcionales |
| `className` | `string` | - | Clase CSS adicional |

## States Components

```tsx
statesComponents={{
  loading: { renderType: 'self' },           // Spinner por defecto
  empty: { renderType: 'self' },             // Mensaje "No data"
  error: { renderType: 'component', render: <MyError /> },  // Custom
}}
```

- `renderType: 'self'` → Usa render interno por defecto (spinner, mensaje)
- `renderType: 'component'` → Usa el `render` proporcionado

## Platform Detection

El componente usa `useIsMobile()` de `client/src/lib/ui-library/hooks/useResponsive.ts` para detectar la plataforma:

```typescript
import { useIsMobile } from '../../hooks';

const isMobile = useIsMobile(); // < 768px → mobile (bottom sheet)
                                 // >= 768px → web (centrado)
```

`useIsMobile` es un atajo del hook `useResponsive`, que también expone:

```typescript
const { deviceType, orientation, isMobile, isTablet, isDesktop, isPortrait, isLandscape } = useResponsive();
```

- `mobile`: < 768px
- `tablet`: 768px - 1023px
- `desktop`: >= 1024px
