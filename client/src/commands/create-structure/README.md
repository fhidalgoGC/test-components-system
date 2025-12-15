# gc-ui-setup CLI

Herramienta de línea de comandos para crear estructuras de carpetas en proyectos que usan GC-UI-COMPONENTS.

## Instalación

El CLI viene incluido con la librería:

```bash
npm install github:fhidalgoGC/test-components-system#version.1.0.2-mobile
```

La configuración en `package.json` de la librería:

```json
{
  "bin": {
    "gc-ui-setup": "./client/src/commands/create-structure/index.js"
  }
}
```

## Uso

```bash
npx gc-ui-setup <comando> [flags]
```

### Alternativa: Script en package.json

```json
{
  "scripts": {
    "setup": "gc-ui-setup"
  }
}
```

```bash
npm run setup new-app
npm run setup features --name=login
```

## Comandos Disponibles

| Comando | Descripción | Documentación |
|---------|-------------|---------------|
| `new-app` | Crea estructura base para nueva aplicación | [Ver README](./new-app/README.md) |
| `features` | Crea estructura para un feature específico | [Ver README](./features/README.md) |

## Flags Comunes

Estos flags están disponibles en **todos** los comandos:

| Flag | Alias | Descripción |
|------|-------|-------------|
| `--path=<ruta>` | `-path=<ruta>` | Ruta personalizada donde crear la estructura |
| `--force` | `-f` | Sobrescribe carpetas existentes |
| `--help` | `-h` | Muestra ayuda y lista de comandos |

## Ejemplos Rápidos

```bash
# Ver ayuda
npx gc-ui-setup --help

# Crear estructura de aplicación
npx gc-ui-setup new-app
npx gc-ui-setup new-app --path=src
npx gc-ui-setup new-app --force

# Crear feature
npx gc-ui-setup features --name=login
npx gc-ui-setup features --name=auth --path=src/features
npx gc-ui-setup features --name=login --force
```

## Output

El CLI muestra el progreso con indicadores visuales:

```
📁 Ejecutando: new-app
📝 Crea estructura base para nueva aplicación
📍 Ruta base: src

  ✔ assets → @/assets (creada)
  ✔ components → @/components (creada)
  ⚠ hooks → @/hooks (ya existe, saltando)
  ↻ utils → @/utils (sobrescrita)
    📄 home.tsx (archivo creado)

──────────────────────────────────────────────────
✅ Estructura creada exitosamente

📊 Resumen:
   Creadas:      10
   Saltadas:     2
   Sobrescritas: 1
   Archivos:     1
   Total:        13
```

**Indicadores:**
- ✔ (verde) - Carpeta creada exitosamente
- ⚠ (amarillo) - Carpeta ya existe, se saltó
- ↻ (cyan) - Carpeta sobrescrita (con --force)
- 📄 - Archivo de plantilla creado
- ✖ (rojo) - Error al crear

## Configuración de Aliases

Después de crear la estructura, configura los aliases en tu proyecto:

### Vite (vite.config.ts)

```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Estructura del CLI

```
create-structure/
├── index.js                # Entry point principal
├── README.md               # Esta documentación
├── utils/                  # Utilidades compartidas
│   ├── copy-templates.js   # Copiar archivos de plantilla
│   ├── create-folders.js   # Crear carpetas con aliases
│   ├── logger.js           # Logs con colores
│   └── index.js            # Exports
├── new-app/                # Comando new-app
│   ├── config.json         # Configuración de carpetas
│   ├── index.js            # Lógica del comando
│   ├── README.md           # Documentación del comando
│   └── templates/          # Archivos plantilla
└── features/               # Comando features
    ├── config.json
    ├── index.js
    ├── README.md
    └── templates/
```

## Crear Nuevo Comando

1. Crear carpeta en `create-structure/<nombre-comando>/`
2. Agregar `config.json` con definición de carpetas
3. Agregar `index.js` con función `execute(options)`
4. Agregar `templates/` si el comando necesita copiar archivos
5. Agregar `README.md` documentando el comando

El CLI detecta automáticamente nuevos comandos.

### Ejemplo config.json

```json
{
  "name": "mi-comando",
  "description": "Descripción del comando",
  "defaultPath": "src",
  "folders": [
    { "path": "carpeta1", "alias": "@/carpeta1" },
    { "path": "carpeta2", "alias": "@/carpeta2" }
  ]
}
```

### Ejemplo index.js

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createFolders, copyTemplateFiles, logger } from '../utils/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'config.json'), 'utf-8')
);

export async function execute(options = {}) {
  const { force = false, targetPath = null } = options;
  const basePath = targetPath || config.defaultPath;
  
  // Tu lógica aquí...
}

export { config };
```
