# Component Generator

Generador automático de componentes para la biblioteca de UI.

## Uso básico

```bash
npm run new-component -- <ComponentName> [opciones]
```

⚠️ **Importante**: El `--` es necesario para pasar las opciones al script.

## Ejemplos

### Componente básico (solo estructura mínima)
```bash
npm run new-component -- Modal
```

Genera:
```
Modal/
├── mobile/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   └── index.tsx
└── index.tsx
```

### Componente completo con todas las carpetas
```bash
npm run new-component -- Modal -all-folders
```

Genera además:
- `i18n/` - Archivos de internacionalización (en.json, es.json)
- `utils/` - Utilidades y funciones auxiliares
- `providers/` - Context provider del componente

### Con traducciones personalizadas
```bash
npm run new-component -- Modal -all-folders --en-title "Modal Dialog" --en-desc "A modal dialog component" --es-title "Diálogo Modal" --es-desc "Un componente de diálogo modal"
```

Genera archivos i18n con las traducciones especificadas:

**en.json:**
```json
{
  "modal": {
    "title": "Modal Dialog",
    "description": "A modal dialog component"
  }
}
```

**es.json:**
```json
{
  "modal": {
    "title": "Diálogo Modal",
    "description": "Un componente de diálogo modal"
  }
}
```

### Con README de IA
```bash
npm run new-component -- Modal -readme
```

Genera un archivo `README-IA.md` dentro del componente con documentación inicial.

### Versión web
```bash
npm run new-component -- Modal -web
```

Por defecto crea versión mobile. Usa `-web` para web, o ambos flags para crear ambas versiones.

### Comando completo
```bash
npm run new-component -- Modal -all-folders -readme -mobile -web --en-title "Modal" --en-desc "Modal component" --es-title "Modal" --es-desc "Componente modal"
```

## Opciones disponibles

| Opción | Descripción |
|--------|-------------|
| `-all-folders` | Crea carpetas adicionales: `i18n/`, `utils/`, `providers/` |
| `-readme` | Genera archivo `README-IA.md` con documentación base |
| `-mobile` | Crea versión mobile (activado por defecto) |
| `-web` | Crea versión web |

### Opciones de traducción (requiere `-all-folders`)

| Opción | Descripción |
|--------|-------------|
| `--en-title <text>` | Título en inglés |
| `--en-desc <text>` | Descripción en inglés |
| `--es-title <text>` | Título en español |
| `--es-desc <text>` | Descripción en español |

**Nota:** Si no se proporcionan traducciones personalizadas, se usan valores por defecto basados en el nombre del componente.

## Plantillas generadas

### Componente base
```tsx
export const ComponentNameView = (props: ComponentNameProps) => {
  const { children, className } = props;

  return (
    <div className={className} data-testid="componentname">
      {children || 'ComponentName'}
    </div>
  );
};
```

### Props
```typescript
export interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
}
```

### Hook personalizado
```typescript
export const useComponentName = (props: ComponentNameProps) => {
  const [state, setState] = useState({});

  return {
    state,
  };
};
```

### Context Provider
```typescript
export const ComponentNameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState({});

  return (
    <ComponentNameContext.Provider value={{ }}>
      {children}
    </ComponentNameContext.Provider>
  );
};
```

## Importación

El componente generado se exporta automáticamente y puede importarse así:

```typescript
import { ComponentName } from '@/lib/ui-library/components/ComponentName';
```

## Notas

- Los nombres de componentes deben estar en **PascalCase**
- Las traducciones se generan con la key en **lowercase** (ej: `"modal"`)
- El `data-testid` se genera en **lowercase** automáticamente
- Si `-all-folders` no está presente, no se crean i18n, utils ni providers
- Las traducciones personalizadas solo funcionan cuando se usa `-all-folders`
