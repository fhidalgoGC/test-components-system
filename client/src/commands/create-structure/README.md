# Create Structure CLI

Generador de estructuras de carpetas para proyectos que implementan la librería **GC-UI-COMPONENTS**.

## Instalación

Este CLI viene incluido con la librería. Una vez instalada la librería en tu proyecto:

```bash
npm install github:fhidalgoGC/test-components-system#version.1.0.2-mobile
```

## Uso

### Con npx (Recomendado)

```bash
# Ver comandos disponibles
npx gc-ui-setup --help

# Crear estructura
npx gc-ui-setup new-app

# Con opciones
npx gc-ui-setup new-app --path=src
npx gc-ui-setup new-app --force
npx gc-ui-setup new-app --path=src --force
```

### Alternativa: Script en package.json

Si prefieres un comando más corto, agrega en tu `package.json`:

```json
{
  "scripts": {
    "setup": "gc-ui-setup"
  }
}
```

Luego ejecuta:

```bash
npm run setup new-app
npm run setup new-app --path=src --force
```

## Comandos Disponibles

### `new-app`

Crea la estructura base de carpetas para una nueva aplicación.

```bash
npx gc-ui-setup new-app
```

**Carpetas que crea:**

| Carpeta | Alias |
|---------|-------|
| assets | @/assets |
| components | @/components |
| contexts | @/contexts |
| features | @/features |
| hooks | @/hooks |
| interceptors | @/interceptors |
| layouts | @/layouts |
| lib | @/lib |
| pages | @/pages |
| routes | @/routes |
| services | @/services |
| types | @/types |
| utils | @/utils |

## Opciones (Flags)

| Flag | Alias | Descripción |
|------|-------|-------------|
| `--path=<ruta>` | `-path=<ruta>` | Define la ruta base donde crear las carpetas. Por defecto: `client/src` |
| `--force` | `-f` | Sobrescribe las carpetas si ya existen. Sin esta flag, las carpetas existentes se saltan |
| `--help` | `-h` | Muestra la ayuda con los comandos disponibles |

## Ejemplos

### Crear estructura en ruta por defecto

```bash
npx gc-ui-setup new-app
# Crea carpetas en: client/src/assets, client/src/components, ...
```

### Crear estructura en ruta personalizada

```bash
npx gc-ui-setup new-app --path=src
# Crea carpetas en: src/assets, src/components, ...

npx gc-ui-setup new-app --path=frontend/app
# Crea carpetas en: frontend/app/assets, frontend/app/components, ...
```

### Sobrescribir carpetas existentes

```bash
npx gc-ui-setup new-app --force
# Si las carpetas existen, las elimina y crea de nuevo
```

### Combinar opciones

```bash
npx gc-ui-setup new-app --force --path=src/app
# Crea/sobrescribe carpetas en: src/app/assets, src/app/components, ...
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

──────────────────────────────────────────────────
✅ Estructura creada exitosamente

📊 Resumen:
   Creadas:      10
   Saltadas:     2
   Sobrescritas: 1
   Total:        13
```

**Indicadores:**
- ✔ (verde) - Carpeta creada exitosamente
- ⚠ (amarillo) - Carpeta ya existe, se saltó
- ↻ (cyan) - Carpeta sobrescrita (con --force)
- ✖ (rojo) - Error al crear la carpeta

## Agregar Nuevos Comandos

Para agregar un nuevo comando (ej: `features`):

1. Crea una carpeta con el nombre del comando:
   ```
   create-structure/
     features/
       config.json
       index.js
   ```

2. Define la configuración en `config.json`:
   ```json
   {
     "name": "features",
     "description": "Crea estructura de features/módulos",
     "defaultPath": "src/features",
     "folders": [
       { "path": "auth/components", "alias": "@/features/auth/components" },
       { "path": "auth/hooks", "alias": "@/features/auth/hooks" }
     ]
   }
   ```

3. Copia el `index.js` de `new-app/` y ajusta si es necesario.

4. El nuevo comando estará disponible automáticamente:
   ```bash
   npx gc-ui-setup features
   ```

## Configuración de Aliases en tu Proyecto

Después de crear la estructura, configura los aliases en tu proyecto:

### Para Vite (vite.config.ts)

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

### Para TypeScript (tsconfig.json)

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

## Estructura de Archivos del CLI

```
create-structure/
├── index.js              # Entry point principal
├── README.md             # Esta documentación
├── new-app/
│   ├── config.json       # Configuración de carpetas
│   └── index.js          # Ejecutor del comando
└── utils/
    ├── create-folders.js # Lógica para crear carpetas
    ├── logger.js         # Logs con colores
    └── index.js          # Exports
```
