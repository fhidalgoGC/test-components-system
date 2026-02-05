# GC-UI-COMPONENTS - Guía de Configuración para IA

**Version: 1.0.0**

## 📋 Propósito

Este README contiene instrucciones para que una IA configure correctamente un nuevo proyecto que utilizará GC-UI-COMPONENTS. Sigue estos pasos en orden.

---

## 🚀 Paso 1: Instalar la Librería

Instala GC-UI-COMPONENTS desde GitHub:

```bash
npm install git+https://github.com/fhidalgoGC/test-components-system.git#version.1.0.2-mobile
```

---

## 📦 Paso 2: Instalar Dependencias Peer

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns embla-carousel-react
npm install wouter react-hook-form zod
```

---

## ⚙️ Paso 3: Configurar Vite Alias (OBLIGATORIO)

Agregar en `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // Alias para funcionamiento interno de la librería
      "@/lib/ui-library": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library",
      ),
    },
  },
});
```

---

## 🛠️ Paso 4: Configurar el CLI gc-ui-setup

Para poder ejecutar los comandos de estructura (`new-app`, `features`) directamente desde el nuevo proyecto, agregar en `package.json`:

```json
{
  "scripts": {
    "setup": "gc-ui-setup",
    "setup:new-app": "gc-ui-setup new-app",
    "setup:new-app:force": "gc-ui-setup new-app --force",
    "setup:features": "gc-ui-setup features"
  }
}
```

### Comandos disponibles:

| Comando | Descripción |
|---------|-------------|
| `npm run setup -- --help` | Ver ayuda y comandos disponibles |
| `npm run setup:new-app` | Crear estructura base de aplicación |
| `npm run setup:new-app:force` | Crear estructura sobrescribiendo existentes |
| `npm run setup:features -- --name=login` | Crear estructura para un feature |

### Flags disponibles:

| Flag | Descripción |
|------|-------------|
| `--path=<ruta>` | Ruta personalizada donde crear la estructura |
| `--force` o `-f` | Sobrescribe carpetas existentes |
| `--name=<nombre>` | Nombre del feature (solo para `features`) |
| `--help` o `-h` | Muestra ayuda |

### Ejemplos de uso:

```bash
# Crear estructura de aplicación en src/
npm run setup:new-app

# Crear estructura en ruta personalizada
npm run setup:new-app -- --path=app/src

# Crear feature de login
npm run setup:features -- --name=login

# Crear feature con ruta personalizada
npm run setup:features -- --name=auth --path=src/features
```

---

## 📁 Paso 5: Configurar TypeScript Paths

Agregar en `tsconfig.json`:

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

---

## ✅ Paso 6: Verificar Instalación

Ejecutar para verificar que todo está configurado:

```bash
# Verificar que la librería está instalada
npm list GC-UI-COMPONENTS

# Verificar que el CLI funciona
npm run setup -- --help
```

---

## 📚 Documentación Adicional

Después de la instalación, consultar:

- **README-INDEX.md**: Índice maestro de toda la documentación
- **README-INSTALL-IA.md**: Guía de instalación detallada

**Enlaces GitHub:**
- [📄 README-INSTALL-IA.md](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/README-INSTALL-IA.md)
- [📄 README-INDEX.md](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/README-INDEX.md)
- [📄 CLI gc-ui-setup](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/commands/create-structure/README.md)

---

## 🔄 Resumen de Pasos

1. ✅ `npm install git+https://github.com/fhidalgoGC/test-components-system.git#version.1.0.2-mobile`
2. ✅ Instalar dependencias peer
3. ✅ Configurar alias `@/lib/ui-library` en `vite.config.ts`
4. ✅ Agregar scripts de `gc-ui-setup` en `package.json`
5. ✅ Configurar paths en `tsconfig.json`
6. ✅ Verificar instalación

---

**Última actualización: Febrero 2026**
