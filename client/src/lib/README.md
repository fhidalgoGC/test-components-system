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
- `i18n/` - Archivos de internacionalización (en.json, es.json por defecto)
- `utils/` - Utilidades y funciones auxiliares
- `providers/` - Context provider del componente

### Con idiomas personalizados
```bash
npm run new-component -- Modal -all-folders --languages en,es,fr,de
```

Genera archivos i18n para los idiomas especificados:
```
Modal/
├── mobile/
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── fr.json
│   │   ├── de.json
│   │   └── index.ts
```

Cada archivo JSON tiene la estructura:
```json
{
  "modal": {
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
npm run new-component -- Modal -all-folders -readme -mobile -web --languages en,es,fr
```

## Opciones disponibles

| Opción | Descripción |
|--------|-------------|
| `-all-folders` | Crea carpetas adicionales: `i18n/`, `utils/`, `providers/` |
| `-readme` | Genera archivo `README-IA.md` con documentación base |
| `-mobile` | Crea versión mobile (activado por defecto) |
| `-web` | Crea versión web |
| `--languages <langs>` | Idiomas i18n separados por comas (por defecto: `en,es`) |

## Archivos i18n

### Por defecto (sin --languages)
Genera `en.json` y `es.json`:

```json
{
  "componentname": {
  }
}
```

### Con --languages personalizados
```bash
npm run new-component -- Button -all-folders --languages en,es,fr,pt
```

Genera `en.json`, `es.json`, `fr.json`, `pt.json` con la misma estructura.

El archivo `index.ts` se genera automáticamente importando todos los idiomas:

```typescript
import en from './en.json';
import es from './es.json';
import fr from './fr.json';
import pt from './pt.json';

export const i18n = {
  en,
  es,
  fr,
  pt,
};

export default i18n;
```

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
- Las keys i18n se generan en **lowercase** (ej: `"modal"`)
- El `data-testid` se genera en **lowercase** automáticamente
- Si `-all-folders` no está presente, no se crean i18n, utils ni providers
- Los archivos JSON se generan vacíos, listos para que agregues tus traducciones
