# Component & Wrapper Templates

Esta carpeta contiene las plantillas para generar automáticamente componentes y wrappers en la biblioteca de UI.

## 📁 Estructura

```
command-templates/
├── components/          # Plantillas para componentes visuales completos
│   ├── css/            # Estilos CSS module
│   ├── hooks/          # Hooks personalizados
│   ├── i18n/           # Traducciones
│   ├── types/          # Tipos TypeScript
│   ├── views/          # Componentes visuales
│   ├── utils/          # Utilidades
│   ├── providers/      # Context providers
│   └── environment/    # Configuración de entorno
│
└── wrappers/           # Plantillas para wrappers lógicos (sin estilos)
    ├── hooks/          # Hooks personalizados
    ├── types/          # Tipos TypeScript
    └── views/          # Componentes (sin CSS)
```

## 🚀 Generadores Disponibles

### 1. Generador de Componentes (`new-component`)

Crea componentes visuales completos con estructura modular, soporte i18n, responsive, y estilos CSS.

#### Uso Básico

```bash
# Componente en estructura root (sin responsive)
npm run new-component -- ComponentName

# Componente con versión mobile
npm run new-component -- ComponentName --mobile

# Componente con versión web
npm run new-component -- ComponentName --web

# Componente responsive (mobile + web)
npm run new-component -- ComponentName --mobile --web
```

#### Opciones Avanzadas

```bash
# Con todas las carpetas opcionales (i18n, utils, providers, environment)
npm run new-component -- ComponentName -all-folders

# Con idiomas personalizados para i18n
npm run new-component -- ComponentName -all-folders --languages en,es,fr,de

# Con README generado
npm run new-component -- ComponentName -readme
```

#### Estructura Generada (Root)

```
ComponentName/
├── css/
│   ├── ComponentName.module.css
│   ├── ComponentName.module.ts
│   └── index.ts
├── hooks/
│   ├── useComponentName.hook.ts
│   ├── useI18nMerge.hook.ts
│   └── index.ts
├── types/
│   ├── ComponentName.type.ts
│   └── index.ts
├── views/
│   ├── ComponentName.view.tsx
│   └── index.ts
├── i18n/              # (con -all-folders)
├── utils/             # (con -all-folders)
├── providers/         # (con -all-folders)
├── environment/       # (con -all-folders)
├── index.tsx
└── README-IA.md       # (con -readme)
```

### 2. Generador de Wrappers (`create-wrapper`)

Crea wrappers lógicos sin estilos CSS. Ideal para componentes que solo gestionan estado o contexto.

#### Uso Básico

```bash
npm run create-wrapper -- WrapperName
```

#### Estructura Generada

```
WrapperName/
├── hooks/
│   ├── useWrapperName.hook.ts
│   └── index.ts
├── types/
│   ├── WrapperName.type.ts
│   └── index.ts
├── views/
│   ├── WrapperName.view.tsx
│   └── index.ts
├── index.tsx
└── README-IA.md
```

**Nota:** Los wrappers NO incluyen:
- ❌ Carpeta `css/` (sin estilos)
- ❌ `i18n/` (sin traducciones)
- ❌ Versiones responsive (mobile/web)
- ❌ Providers o environment

## 🎯 Cuándo Usar Cada Generador

### Usa `new-component` cuando:

- ✅ Necesitas un componente visual con estilos
- ✅ Requieres soporte i18n
- ✅ Necesitas versiones responsive (mobile/web)
- ✅ El componente muestra contenido visual propio

**Ejemplos:** `Button`, `Card`, `Modal`, `Carousel`, `NavigationBar`

### Usa `create-wrapper` cuando:

- ✅ Solo necesitas gestionar lógica/estado
- ✅ El componente no aplica estilos propios
- ✅ Provees contexto a componentes hijos
- ✅ Envuelves contenido sin modificar su apariencia

**Ejemplos:** `WrapperItemsSelected`, `WrapperAuth`, `WrapperTheme`, `WrapperPermissions`

## 📝 Ejemplos de Uso

### Ejemplo 1: Componente Visual Simple

```bash
npm run new-component -- AlertDialog
```

Genera un componente root con CSS, hooks, types, y views.

### Ejemplo 2: Componente Responsive Completo

```bash
npm run new-component -- DataTable --mobile --web -all-folders --languages en,es
```

Genera componente con:
- Versiones mobile y web
- Wrapper responsive automático
- i18n en inglés y español
- Todas las carpetas opcionales (utils, providers, etc.)

### Ejemplo 3: Wrapper Lógico

```bash
npm run create-wrapper -- WrapperDragDrop
```

Genera un wrapper simple sin estilos para gestionar drag & drop.

### Ejemplo 4: Agregar Versión Web a Componente Existente

```bash
# Primero creas la versión mobile
npm run new-component -- Sidebar --mobile

# Luego agregas la versión web
npm run new-component -- Sidebar --web
```

El generador actualiza automáticamente el wrapper para incluir ambas versiones.

## 🔧 Modificar Plantillas

### Para Componentes

Edita los archivos en `command-templates/components/`:

- `views/ComponentName.view.tsx.template` - Template del componente visual
- `hooks/useComponentName.hook.ts.template` - Template del hook
- `css/ComponentName.module.css.template` - Template de estilos
- etc.

### Para Wrappers

Edita los archivos en `command-templates/wrappers/`:

- `views/WrapperName.view.tsx.template` - Template del wrapper
- `hooks/useWrapperName.hook.ts.template` - Template del hook
- etc.

### Variables Disponibles en Templates

Los templates usan la sintaxis `{{variable}}`:

**Componentes:**
- `{{ComponentName}}` - Nombre del componente (PascalCase)
- `{{componentname}}` - Nombre en minúsculas
- `{{COMPONENT_NAME_UPPER}}` - Nombre en mayúsculas

**Wrappers:**
- `{{WrapperName}}` - Nombre del wrapper (PascalCase)
- `{{wrappername}}` - Nombre en minúsculas

## 📚 Referencias

- Script de componentes: `scripts/generate-component.mjs`
- Script de wrappers: `scripts/create-wrapper.mjs`
- Componentes generados: `client/src/lib/ui-library/components/`

## 🎨 Convenciones

1. **Nombres en PascalCase**: `ComponentName`, `WrapperSelection`
2. **Componentes** deben tener estilos y ser visuales
3. **Wrappers** NO tienen estilos, solo lógica
4. **Hooks** siempre empiezan con `use`: `useComponentName`
5. **Data-testids** en minúsculas: `data-testid="componentname"`

---

**Última actualización:** Octubre 2025
