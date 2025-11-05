# GC-UI-COMPONENTS - Guía de Instalación y Uso

**Version: 1.0.6**

## 📥 Acceso Directo a Esta Guía

**Ver/Descargar desde GitHub:**  
[📄 README-INSTALL-IA.md](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/README-INSTALL-IA.md)

---

## 📚 Documentación Completa

**Después de instalar, accede al índice completo de la librería:**  
[📖 README-INDEX.md](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/README-INDEX.md) - Índice principal con toda la documentación, componentes disponibles, guías y ejemplos.

---

## 📖 Descripción

GC-UI-COMPONENTS es una librería de componentes React frontend-only construida con React 18, TypeScript y Vite. Incluye un sistema completo de componentes UI, sistema de temas, internacionalización y diseño responsivo.

## 📦 Repositorio

**GitHub Repository:** `https://github.com/fhidalgoGC/test-components-system/`  
**Rama Principal:** `version.1.0.2-mobile`

## 🚀 Instalación como Dependencia

Instala la librería directamente desde GitHub en tu proyecto:

```bash
# Instalar desde la rama version.1.0.2-mobile
npm install git+https://github.com/fhidalgoGC/test-components-system.git#version.1.0.2-mobile
```


## 🏗️ Configuración del Proyecto

### **Paso 1: Instalar Dependencias Peer**

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns embla-carousel-react
npm install wouter react-hook-form zod
```

### **Paso 2: Configurar Vite (⚠️ OBLIGATORIO)**

Para que los estilos de la librería funcionen correctamente, **debes agregar un alias en tu `vite.config.ts`:**

```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      // ⚠️ IMPORTANTE: Alias para los estilos de la librería
      "GC-UI-COMPONENTS/styles": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/dist/style.css",
      ),
    },
  },
  // ... resto de tu configuración
});
```

### **Paso 3: Importar Estilos**

Importa los estilos en tu archivo principal (`main.tsx` o `App.tsx`):

```typescript
// main.tsx o App.tsx
import "GC-UI-COMPONENTS/styles";
```

> **📖 Configuración Detallada:**  
> Para ver la configuración completa de Vite con todos los plugins, consulta: [README-IA-IMPORTS.md - Configuración de Vite](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/README-IA-IMPORTS.md#%EF%B8%8F-configuraci%C3%B3n-de-vite-para-aplicaciones-externas)

## 📋 Opciones de Importación

### **Opción 1: Importación Principal (Recomendada)**

```jsx
// Componentes principales
import { 
  TagSelector,
  LoginCard,
  Carousel,
  WrapperItemsSelected,
  AppLanguageProvider,
  LibI18nProvider,
  ThemeProvider 
} from 'test-components-system';

// Hooks
import { 
  useAppLanguage,
  useLibI18n,
  useSelection 
} from 'test-components-system';

// Tipos
import type { 
  TagItem,
  TagSelectorProps,
  MultiLanguageLabel,
  CarouselProps,
  LoginCardProps
} from 'test-components-system';
```

### **Opción 2: Importaciones Específicas**

```jsx
// Si prefieres importaciones más específicas
import { TagSelector, LoginCard, Carousel } from 'test-components-system';
import { AppLanguageProvider, LibI18nProvider } from 'test-components-system';
import type { TagItem, TagSelectorProps, LoginCardProps } from 'test-components-system';
```


## 🐛 Solución de Problemas Comunes


### **Error: "Module not found"**

```bash
# Verificar alias en vite.config.ts o tsconfig.json
# Asegurar que la ruta a ui-library es correcta
# Reinstalar dependencias
npm install
```

## 📚 Documentación Adicional

Para acceder a la documentación después de la instalación:

```bash
# La documentación está disponible en:
node_modules/test-components-system/client/src/lib/ui-library/
```

### **Índice General de Documentación:**

- **`README-INDEX.md`**: Índice maestro con toda la documentación organizada por temas
  - Contiene referencias a todos los componentes, providers, utilidades y guías
  - Incluye tablas de navegación rápida para encontrar lo que necesitas
  - Documenta la arquitectura completa del sistema
  - Proporciona enlaces directos a documentación específica de cada módulo

## 📄 Licencia

MIT License - Ver LICENSE file para más detalles.

---

**Version: 1.0.6** | **Última actualización: Noviembre 2025**