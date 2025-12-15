# Create Structure CLI

Generador de estructuras de carpetas para proyectos que implementan la librería **GC-UI-COMPONENTS**.

## Instalación

Este CLI viene incluido con la librería. Una vez instalada la librería en tu proyecto:

```bash
npm install github:fhidalgoGC/test-components-system#version.1.0.2-mobile
```

## Uso

### Desde tu proyecto

```bash
# Ver comandos disponibles
node node_modules/gc-ui-components/client/src/commands/create-structure/index.js --help

# Ejecutar comando
node node_modules/gc-ui-components/client/src/commands/create-structure/index.js <comando> [opciones]
```

### Configurar script en package.json (Recomendado)

Agrega este script en el `package.json` de tu proyecto:

```json
{
  "scripts": {
    "gc-setup": "node node_modules/gc-ui-components/client/src/commands/create-structure/index.js"
  }
}
```

Luego puedes ejecutar:

```bash
npm run gc-setup new-app
npm run gc-setup new-app --path=src
npm run gc-setup new-app --force
```

## Comandos Disponibles

### `new-app`

Crea la estructura base de carpetas para una nueva aplicación.

```bash
npm run gc-setup new-app
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
npm run gc-setup new-app
# Crea carpetas en: client/src/assets, client/src/components, ...
```

### Crear estructura en ruta personalizada

```bash
npm run gc-setup new-app --path=src
# Crea carpetas en: src/assets, src/components, ...

npm run gc-setup new-app --path=frontend/app
# Crea carpetas en: frontend/app/assets, frontend/app/components, ...
```

### Sobrescribir carpetas existentes

```bash
npm run gc-setup new-app --force
# Si las carpetas existen, las elimina y crea de nuevo
```

### Combinar opciones

```bash
npm run gc-setup new-app --force --path=src/app
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
   npm run gc-setup features
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
