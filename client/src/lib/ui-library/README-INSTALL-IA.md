# GC-UI-COMPONENTS - Guía de Instalación y Uso

**Version: 1.0.7**

## 📥 Acceso Directo a Esta Guía

**Ver/Descargar desde GitHub:**  
[📄 README-INSTALL-IA.md](https://github.com/fhidalgoGC/test-components-system/blob/version1.1.0_NativeWinds/client/src/lib/ui-library/README-INSTALL-IA.md)

---

## 📚 Documentación Completa

**Después de instalar, accede al índice completo de la librería:**  
[📖 README-INDEX.md](https://github.com/fhidalgoGC/test-components-system/blob/version1.1.0_NativeWinds/client/src/lib/ui-library/README-INDEX.md) - Índice principal con toda la documentación, componentes disponibles, guías y ejemplos.

---

## 📖 Descripción

GC-UI-COMPONENTS es una librería de componentes React frontend-only construida con React 18, TypeScript y Vite. Incluye un sistema completo de componentes UI, sistema de temas, internacionalización y diseño responsivo.

## 📦 Repositorio

**GitHub Repository:** `https://github.com/fhidalgoGC/test-components-system/`  
**Rama Principal:** `version1.1.0_NativeWinds`

---

## 🚀 Instalación Rápida

### **Paso 1: Instalar la Librería**

Instala la librería directamente desde GitHub en tu proyecto:

```bash
npm install git+https://github.com/fhidalgoGC/test-components-system.git#version1.1.0_NativeWinds
```

### **Paso 2: Instalar Dependencias Peer**

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns embla-carousel-react
npm install wouter react-hook-form zod
```

### **Paso 3: Configurar Alias de Vite (⚠️ OBLIGATORIO)**

Este alias es necesario para el **funcionamiento interno de la librería**. Los componentes lo utilizan para importarse entre sí correctamente.

Agrega este alias en tu `vite.config.ts`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      // ... tus otros alias
      "@/lib/ui-library": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library",
      ),
    },
  },
});
```

> **⚠️ Importante:** Este alias es para el funcionamiento interno de la librería, **NO** para que lo uses en tus imports. Tú siempre importarás directamente desde `"GC-UI-COMPONENTS"` (ver ejemplos abajo).

---

## 📋 Cómo Usar la Librería

Una vez instalada y configurada, importa los componentes directamente desde `"GC-UI-COMPONENTS"`:

### **Importar Componentes**

```typescript
// Componentes principales
import { 
  TagSelector,
  LoginCard,
  Carousel,
  UniversalCard,
  WrapperItemsSelected,
  BottomNavigationBar,
  HeterogeneousList
} from 'GC-UI-COMPONENTS';
```

### **Importar Providers**

```typescript
// Providers para i18n, tema y configuración
import { 
  AppLanguageProvider,
  LibI18nProvider,
  ThemeProvider,
  AppEnviromentProvider
} from 'GC-UI-COMPONENTS';
```

### **Importar Hooks**

```typescript
// Hooks disponibles
import { 
  useAppLanguage,
  useLibI18n,
  useSelection,
  useResponsive
} from 'GC-UI-COMPONENTS';
```

### **Importar Tipos**

```typescript
// Tipos TypeScript
import type { 
  TagItem,
  TagSelectorProps,
  MultiLanguageLabel,
  CarouselProps,
  LoginCardProps,
  UniversalCardProps,
  WrapperItemsSelectedProps
} from 'GC-UI-COMPONENTS';
```

### **Ejemplo Completo de Uso**

```typescript
import { 
  LoginCard, 
  LibI18nProvider, 
  AppLanguageProvider 
} from 'GC-UI-COMPONENTS';
import type { LoginCardProps, MultiLanguageLabel } from 'GC-UI-COMPONENTS';

function App() {
  const handleProviderSelect = (provider: string) => {
    console.log('Provider seleccionado:', provider);
  };

  return (
    <AppLanguageProvider>
      <LibI18nProvider>
        <LoginCard
          config="with-credentials"
          title={{ en: "Welcome Back", es: "Bienvenido" }}
          subtitle={{ en: "Sign in to continue", es: "Inicia sesión para continuar" }}
          onProviderSelect={handleProviderSelect}
        />
      </LibI18nProvider>
    </AppLanguageProvider>
  );
}
```

---

## 🔧 Configuración Técnica

### **¿Por qué necesito el alias `@/lib/ui-library`?**

Los componentes de la librería utilizan **rutas relativas internas** para importarse entre sí. El alias `@/lib/ui-library` permite que estas rutas internas se resuelvan correctamente cuando la librería está instalada en `node_modules`.

**Tú NO usas este alias** - es solo para el funcionamiento interno. Siempre importa desde `"GC-UI-COMPONENTS"`.

### **Estructura de Importación**

```
Tu aplicación
    ↓
import { LoginCard } from "GC-UI-COMPONENTS"
    ↓
LoginCard (usa internamente @/lib/ui-library para sus dependencias)
    ↓ 
Otros componentes internos de la librería
```

---

## 🐛 Solución de Problemas Comunes

### **Error: "Could not read from file: @/lib/ui-library/components/..."**

**Causa:** El alias `@/lib/ui-library` no está configurado en tu `vite.config.ts`.

**Solución:**
1. Verifica que el alias esté agregado en `vite.config.ts`
2. Asegúrate de que la ruta apunte a `node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library`
3. Reinicia tu servidor de desarrollo

```bash
# Detén el servidor y reinícialo
npm run dev
```

### **Error: "Module not found: GC-UI-COMPONENTS"**

**Causa:** La librería no está instalada correctamente.

**Solución:**
```bash
# Reinstalar la librería
npm install git+https://github.com/fhidalgoGC/test-components-system.git#version1.1.0_NativeWinds

# Verificar que se instaló
npm list GC-UI-COMPONENTS
```

### **Error: "Cannot find module '@radix-ui/...' or similar"**

**Causa:** Faltan dependencias peer.

**Solución:**
```bash
# Instalar todas las dependencias peer (Paso 2 de instalación)
npm install react react-dom typescript @radix-ui/react-slot class-variance-authority clsx tailwindcss tailwind-merge lucide-react framer-motion date-fns embla-carousel-react wouter react-hook-form zod
```

---

## 📚 Documentación Adicional

### **Acceso a la Documentación Completa**

Después de la instalación, toda la documentación está disponible en:

```bash
node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library/
```

### **Índice General de Documentación**

- **`README-INDEX.md`**: Índice maestro con toda la documentación organizada por temas
  - Referencias a todos los componentes, providers, utilidades y guías
  - Tablas de navegación rápida
  - Arquitectura completa del sistema
  - Enlaces directos a documentación específica de cada módulo

### **Documentación por Componente**

Cada componente incluye su propio `README-IA.md` con:
- Descripción y características
- Props y tipos TypeScript
- Ejemplos de uso
- Configuración de i18n
- Casos de uso comunes

**Acceso directo desde GitHub:**  
[📖 Ver README-INDEX.md](https://github.com/fhidalgoGC/test-components-system/blob/version1.1.0_NativeWinds/client/src/lib/ui-library/README-INDEX.md)

---

## 📄 Licencia

MIT License - Ver LICENSE file para más detalles.

---

**Version: 1.0.7** | **Última actualización: Noviembre 2025**
