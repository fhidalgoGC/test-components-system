# Modal - Mobile Responsive Version

## Overview
Implementación mobile responsive del Modal. Se renderiza como bottom sheet, deslizándose desde la parte inferior de la pantalla. Comparte la misma lógica que la versión web pero con estilos optimizados para móvil.

## Status

**Implementado** — Bottom sheet con estilos mobile-optimized.

## Folder Structure

```
mobile/
├── css/
│   └── Modal.module.css       # Estilos mobile (bottom sheet)
├── views/
│   ├── index.ts
│   └── Modal.view.tsx         # Componente React principal
├── types/
│   ├── index.ts
│   └── Modal.type.ts          # Re-exporta tipos compartidos
├── i18n/
│   ├── en.json
│   └── es.json
├── providers/
│   └── Modal.provider.tsx     # Provider (no usado, control externo)
└── index.tsx                  # Export principal
```

## Comportamiento Mobile

- Modal anclado a la parte inferior de la pantalla (bottom sheet)
- `width: 100%`, `max-height: 85vh`
- Border radius superior: `16px 16px 0 0`
- Sombra hacia arriba: `0 -10px 40px rgba(0,0,0,0.2)`
- Alineación: `align-items: flex-end` en el contenedor overlay
- Padding reducido respecto a web (16px horizontal, 12px vertical en body/footer)

## Diferencias con Web

| Aspecto | Web | Mobile |
|---------|-----|--------|
| Posición | Centrado en pantalla | Anclado abajo (bottom sheet) |
| Ancho | Configurable (auto/fixed/full) | 100% siempre |
| Border radius | 8px (todos los lados) | 16px solo arriba |
| Max height | 90vh | 85vh |
| Padding body | 16px 20px | 12px 16px |
| Sombra | Hacia abajo | Hacia arriba |

## Platform Resolution

```typescript
if (isMobile) {
  return <ModalMobile {...props} />;  // < 768px → bottom sheet
}
return <ModalWeb {...props} />;        // >= 768px → centrado
```

## Usage

El componente se usa igual que la versión web. El dispatch automático selecciona la versión correcta:

```tsx
import { Modal, useModalController } from 'GC-UI-COMPONENTS';

const modal = useModalController();

<Modal
  isOpen={modal.isOpen}
  state={modal.state}
  header={{ render: <h3>Título</h3> }}
  body={{ render: <p>Contenido</p> }}
  callbacks={{ onClose: modal.close }}
/>
```
