# Modal - Web Version

## Overview
Implementación web del Modal. Se renderiza centrado en pantalla con overlay de fondo. Soporta cierre por Escape, click en overlay, y botón de cerrar.

## Folder Structure

```
web/
├── css/
│   └── Modal.module.css       # Estilos del modal web
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

## Comportamiento Web

- Modal centrado vertical y horizontalmente en pantalla
- `max-height: 90vh`, `max-width: 95vw`
- Body con `overflow-y: auto` para scroll interno
- `document.body.style.overflow = 'hidden'` cuando está abierto
- Cierre con tecla `Escape`
- Sombra: `0 20px 60px rgba(0,0,0,0.3)`
- Border radius: `8px`

## Layout

El modal se compone de tres secciones opcionales:

1. **Header** — `flex-shrink: 0`, borde inferior, padding `16px 20px`
2. **Body** — `flex: 1`, scroll vertical, padding `16px 20px`
3. **Footer** — `flex-shrink: 0`, borde superior, padding `12px 20px`

Cada sección acepta `verticalAlign` y `horizontalAlign` para controlar la alineación interna.

## Overlay Config

```tsx
overlay={{
  enabled: true,          // Muestra overlay
  opacity: 0.5,           // Opacidad (0-1)
  color: 'rgba(0,0,0,0.5)', // Color personalizado
  blur: true,             // Activa backdrop-filter: blur(4px)
  closeOnClick: true,     // Cierra al hacer click en overlay
}}
```

## Close Button

```tsx
closeButton={{
  visible: true,
  position: 'top-right',  // o 'top-left'
  render: <MyCustomIcon />, // Opcional: icono personalizado
}}
```

Por defecto usa el icono `X` de `lucide-react`.

## Usage

```tsx
import { Modal } from './web';

<Modal
  isOpen={true}
  state="idle"
  overlay={{ enabled: true, closeOnClick: true }}
  closeButton={{ visible: true, position: 'top-right' }}
  layout={{ widthMode: 'fixed', width: 500 }}
  header={{ render: <h3>Título</h3> }}
  body={{ render: <p>Contenido</p> }}
  footer={{ render: <button>Aceptar</button> }}
  callbacks={{ onClose: () => {} }}
/>
```

## Platform Resolution

- `index.tsx` despacha a `web/` o `mobile/` basado en `useIsMobile()` de `useResponsive` hook
- Source: `client/src/lib/ui-library/hooks/useResponsive.ts`
- Desktop browsers (>= 768px) usan la implementación `web/`
- `useIsMobile()` es un atajo de `useResponsive()` que retorna `true` cuando `window.innerWidth < 768`
