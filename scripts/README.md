# Component Generator Script

Script automatizado para generar componentes de UI con estructura completa y consistente.

## 📋 Descripción

`generate-component.mjs` es una herramienta de línea de comandos que automatiza la creación de componentes React con TypeScript, generando toda la estructura de carpetas y archivos necesarios siguiendo los patrones establecidos en el proyecto.

## 🚀 Uso

```bash
npm run new-component -- <ComponentName> [opciones]
```

**⚠️ Importante:** El `--` es necesario para pasar las opciones correctamente al script.

## 🎯 Opciones Disponibles

| Opción | Descripción |
|--------|-------------|
| `-all-folders` | Crea carpetas adicionales: `i18n/`, `utils/`, `providers/` |
| `-readme` | Genera archivo `README-IA.md` con documentación base |
| `-mobile` | Crea versión mobile (activado por defecto) |
| `-web` | Crea versión web |

### Opción de Idiomas (requiere `-all-folders`)

| Opción | Descripción |
|--------|-------------|
| `--languages <langs>` | Lista de idiomas separados por comas (por defecto: `en,es`) |

## 📚 Ejemplos

### Componente básico (estructura mínima)
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

### Componente con idiomas personalizados
```bash
npm run new-component -- Modal -all-folders --languages en,es,fr,de
```

Genera además:
```
Modal/
├── mobile/
│   ├── css/
│   ├── hooks/
│   ├── types/
│   ├── views/
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.ts
│   ├── utils/
│   ├── providers/
│   └── index.tsx
├── README-IA.md
└── index.tsx
```

### Ambas versiones (mobile y web)
```bash
npm run new-component -- Dialog -mobile -web -all-folders
```

## 📦 Estructura Generada

### Carpetas Base (siempre se crean)

#### `css/`
- `ComponentName.module.css` - Estilos CSS Module
- `ComponentName.module.ts` - Helper para clases CSS
- `index.ts` - Barrel export

#### `types/`
- `ComponentName.type.ts` - Interfaces y tipos TypeScript
- `index.ts` - Barrel export

#### `hooks/`
- `useComponentName.hook.ts` - Hook personalizado del componente
- `index.ts` - Barrel export

#### `views/`
- `ComponentName.view.tsx` - Componente visual
- `index.ts` - Barrel export

### Carpetas Opcionales (con `-all-folders`)

#### `environment/`
- `enviroment.ts` - Configuración específica del componente
- `index.ts` - Re-exporta con alias COMPONENT_NAME_CONFIG

#### `i18n/`
- `en.json` - Traducciones en inglés
- `es.json` - Traducciones en español
- `index.ts` - Exporta objeto i18n

#### `utils/`
- `componentname.util.ts` - Funciones de utilidad
- `index.ts` - Barrel export

#### `providers/`
- `ComponentName.provider.tsx` - Context Provider
- `index.ts` - Barrel export

## 🎨 Templates Incluidos

### Component View (Default)
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

### Props Interface
```typescript
export interface ComponentNameProps {
  children?: React.ReactNode;
  className?: string;
}
```

### Custom Hook
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

### i18n Files
Los archivos JSON se generan con traducciones de ejemplo para probar la reactividad:

**Inglés (en.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Modal component description"
  }
}
```

**Español (es.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Descripción del componente Modal"
  }
}
```

**Francés (fr.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Description du composant Modal"
  }
}
```

**Alemán (de.json):**
```json
{
  "modal": {
    "label": "Modal",
    "description": "Modal Komponentenbeschreibung"
  }
}
```

**Otros idiomas:** Usan plantilla genérica en inglés.

El archivo `index.ts` importa todos los idiomas especificados:

```typescript
// Ejemplo con --languages en,es,fr
import en from './en.json';
import es from './es.json';
import fr from './fr.json';

export const i18n = {
  en,
  es,
  fr,
};

export default i18n;
```

## 🔧 Funcionalidades Técnicas

### Validaciones
- ✅ Verifica que el nombre del componente esté presente
- ✅ Comprueba si el componente ya existe antes de crear
- ✅ Crea directorios recursivamente si no existen

### Auto-exportación
El script automáticamente agrega la exportación al archivo `client/src/lib/ui-library/components/index.ts`:
```typescript
export * from './ComponentName';
```

### Convenciones
- **PascalCase** para nombres de componentes
- **camelCase** para utilidades y hooks
- **lowercase** para i18n keys y CSS classes
- **data-testid** automático en lowercase

## 📝 Notas de Desarrollo

### Modificar Templates
Los templates están definidos en el objeto `templates` dentro del script:
```javascript
const templates = {
  types: (name) => `...`,
  hook: (name) => `...`,
  view: (name) => `...`,
  // ...
};
```

### Agregar Nuevas Opciones
1. Agregar flag al objeto `flags`
2. Implementar lógica en la función `createComponent()`
3. Actualizar mensajes de ayuda

### Estructura de Archivos
Todos los componentes se generan en:
```
client/src/lib/ui-library/components/<ComponentName>/
```

## 🐛 Solución de Problemas

### Error: "Component already exists"
- El componente ya existe en la carpeta de componentes
- Elimina el componente existente o usa otro nombre

### Las opciones no funcionan
- Asegúrate de usar `--` antes de las opciones
- Ejemplo correcto: `npm run new-component -- Modal -all-folders`

### No se crean las carpetas opcionales
- Verifica que estés usando el flag `-all-folders`
- El flag debe escribirse exactamente así (con guión)

### Los archivos i18n no se crean
- Los archivos i18n solo se crean con el flag `-all-folders`
- Usa `--languages` para especificar los idiomas: `--languages en,es,fr`
- Por defecto se crean `en.json` y `es.json` si no especificas idiomas

## 🔗 Referencias

- **Documentación completa**: `client/src/lib/README.md`
- **Comando npm**: Definido en `package.json` como `"new-component": "node scripts/generate-component.mjs"`
- **Componentes generados**: `client/src/lib/ui-library/components/`

## 🎨 Sistema de Plantillas

Las plantillas están en `client/src/lib/ui-library/command-templates/`:

```
command-templates/
├── hooks/           # useComponentName.hook.ts + useI18nMerge.hook.ts
├── providers/       # Provider con Context e i18n
├── types/          # Interfaces (Props + Context con 't')
├── views/          # Vista del componente
├── css/            # CSS Modules
├── i18n/           # Traducciones dinámicas
├── environment/     # Configuración local del componente
└── utils/          # Utilidades
```

### Variables de reemplazo:
- `{{ComponentName}}` → Nombre en PascalCase
- `{{componentname}}` → Nombre en lowercase
- `{{LANGUAGES_IMPORTS}}` → Imports dinámicos de idiomas
- `{{LANGUAGES_KEYS}}` → Keys del objeto localDictionaries

## 🌐 i18n Reactivo

Todos los componentes generados con `-all-folders` incluyen:

✅ **Hook useI18nMerge** - Combina traducciones locales + globales (copiado de TagSelector)  
✅ **Provider con traductor** - Context incluye `t()` para traducir  
✅ **Reactivo al idioma** - Cambia automáticamente cuando cambia el idioma global  
✅ **Prioridad configurable** - `local-first` o `global-first`  

### Ejemplo de componente generado:

```tsx
// Uso del componente
<Alert langOverride="es" i18nOrder="local-first">
  Contenido
</Alert>

// Dentro del componente (generado automáticamente)
const { t } = useAlertContext();
return <div>{t('title')}</div>; // Reactivo!
```

## ⚙️ Environment Config (Configuración Local)

Cada componente generado con `-all-folders` incluye su propia carpeta `environment/` con configuración específica:

### Estructura generada:

```typescript
// environment/enviroment.ts
interface ComponentNameConfig {
  // Add your component-specific configuration here
  // Example: TRIGGER_ON_MOUNT: boolean;
}

const ComponentName: ComponentNameConfig = {
  // Add default values here
  // Example: TRIGGER_ON_MOUNT: false,
};

export const environment = {
  ComponentName,
};

// environment/index.ts
export { environment as COMPONENT_NAME_CONFIG } from './enviroment';
```

### ¿Por qué usar environment local?

✅ **Evita crecimiento del archivo global** - `environments/environment.ts` no crece infinitamente  
✅ **Modularidad** - Cada componente tiene su configuración aislada  
✅ **Fácil mantenimiento** - Configuración junto al componente  
✅ **Cascada de prioridades** - Props → ConfigProvider → Environment local  

### Integración con AppEnvironmentProvider:

El archivo global solo **importa y agrupa** las configuraciones locales:

```typescript
// environments/environment.ts
import { BOTTOM_NAV_CONFIG } from '../components/BottomNavigationBar/mobile/environment';
import { ALERT_CONFIG } from '../components/Alert/mobile/environment';

export const environment: LibraryConfig = {
  BOTTOM_NAV_CONFIG,  // = { BottomNavigationBar: { TRIGGER_ON_MOUNT: false } }
  ALERT_CONFIG,       // = { Alert: { SHOW_ICON: true } }
  // Solo agrupa, no define
};
```

### Uso en el Provider:

```typescript
import { BOTTOM_NAV_CONFIG as environment } from './../environment';

// Acceso local (sin ConfigProvider):
environment.BottomNavigationBar.TRIGGER_ON_MOUNT

// Acceso con ConfigProvider (cascada):
const finalValue = 
  props.triggerOnMount ??                                                     // Props
  optionalConfig?.environment.BOTTOM_NAV_CONFIG?.BottomNavigationBar.TRIGGER_ON_MOUNT ?? // ConfigProvider
  environment.BottomNavigationBar.TRIGGER_ON_MOUNT;                          // Local default
```

El `AppEnvironmentProvider` sigue funcionando igual, pero ahora las configuraciones están descentralizadas.

## 📄 Licencia

Este script es parte del proyecto UI Component Library.
