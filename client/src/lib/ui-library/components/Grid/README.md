# Grid Component

Grid Engine declarativo y agnóstico a la data con soporte dual web/mobile. Organiza layout en cuadrícula, calcula capacidad, detecta final de scroll y maneja estado interno. La resolución de variante es automática via `useIsMobile()` (< 768px).

## Documentación por plataforma

- **[Web](./README-WEB-IA.md)** — Grid con layout engine completo, selección via click + keyboard, estilos configurables
- **[Mobile](./README-MOBILE-IA.md)** — Grid optimizado para touch, scroll con `-webkit-overflow-scrolling`, selección via tap

## Importación

```tsx
import { Grid, useGridController } from '@/lib/ui-library/components/Grid';
```

No se importa la variante directamente. El dispatch web/mobile es automático.

## Plataforma

| Plataforma | Estado |
|------------|--------|
| Web | Disponible |
| Mobile | Disponible |
