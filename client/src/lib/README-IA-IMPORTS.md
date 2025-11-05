# 📦 Guía de Imports para IA - GC-UI-COMPONENTS

> **IMPORTANTE:** Este documento es para que IAs implementen correctamente los imports dentro de la librería.

---

## 🚫 Regla Principal: NO Usar Alias Dentro de la Librería

**NUNCA uses alias como `@/` dentro de archivos de `client/src/lib/ui-library/`**

### ❌ INCORRECTO (NO HACER):
```typescript
// ❌ NO usar alias @ dentro de la librería
import SessionValidator from "@/lib/ui-library/components/SessionValidator";
import { environment } from "@/lib/ui-library/enviorments/enviroment";
import { useConfig } from "@/lib/ui-library/providers";
```

### ✅ CORRECTO (SIEMPRE HACER):
```typescript
// ✅ Usar rutas relativas dentro de la librería
import SessionValidator from "../../../components/SessionValidator";
import { environment } from "../../../enviorments/enviroment";
import { useConfig } from "../../providers";
```

---

## 📁 Estructura de la Librería

```
client/src/lib/ui-library/
├── components/
│   ├── SessionValidator/
│   └── TagSelector/
├── enviorments/
│   └── enviroment.ts
├── providers/
│   ├── AppAuthProvider/
│   ├── AppLanguageProvider/
│   ├── AppEnviromentProvider/
│   └── index.ts
├── hooks/
├── utils/
└── theme/
```

---

## 🎯 Cómo Calcular Rutas Relativas

### Fórmula: `../` por cada nivel que subes

**Ejemplo 1:** Desde `providers/AppAuthProvider/views/` a `components/SessionValidator/`
```
providers/AppAuthProvider/views/AppAuthProvider.view.tsx
↓ ../ (sube a AppAuthProvider/)
↓ ../ (sube a providers/)
↓ ../ (sube a lib/ui-library/)
→ components/SessionValidator/

Resultado: ../../../components/SessionValidator
```

**Ejemplo 2:** Desde `providers/AppAuthProvider/hooks/` a `enviorments/`
```
providers/AppAuthProvider/hooks/useAppAuth.hook.ts
↓ ../ (sube a AppAuthProvider/)
↓ ../ (sube a providers/)
↓ ../ (sube a lib/ui-library/)
→ enviorments/

Resultado: ../../../enviorments/enviroment
```

**Ejemplo 3:** Desde `providers/AppAuthProvider/views/` a `providers/AppEnviromentProvider/`
```
providers/AppAuthProvider/views/AppAuthProvider.view.tsx
↓ ../ (sube a AppAuthProvider/)
↓ ../ (sube a providers/)
→ AppEnviromentProvider/

Resultado: ../../AppEnviromentProvider/index.hook
```

---

## 📚 Patrones Comunes de Import

### 1. Provider Importando Otro Provider

```typescript
// Archivo: providers/AppAuthProvider/views/AppAuthProvider.view.tsx
import { ConfigContext } from "../../AppEnviromentProvider/index.hook";
```

### 2. Provider Importando Componente

```typescript
// Archivo: providers/AppAuthProvider/views/AppAuthProvider.view.tsx
import SessionValidator from "../../../components/SessionValidator";
import { 
  saveSessionToStorage,
  clearSessionFromStorage 
} from "../../../components/SessionValidator/utils";
```

### 3. Provider Importando Environment

```typescript
// Archivo: providers/AppAuthProvider/views/AppAuthProvider.view.tsx
import { environment } from "../../../enviorments/enviroment";
```

### 4. Provider Importando sus Propios Tipos

```typescript
// Archivo: providers/AppAuthProvider/views/AppAuthProvider.view.tsx
import type { AppAuthContextValue, AppAuthProviderProps } from "../types";
```

### 5. Componente Importando Hook de Provider

```typescript
// Archivo: components/SessionValidator/hooks/useSessionValidator.hook.ts
import { useAppAuth } from "../../../providers/AppAuthProvider/hooks";
```

### 6. Componente Importando Utils del Mismo Componente

```typescript
// Archivo: components/TagSelector/views/TagSelector.view.tsx
import { validateTag } from "../utils/tagValidation";
```

---

## 🔄 Imports entre Archivos del Mismo Provider

Dentro de la misma carpeta de provider, usa rutas relativas cortas:

```typescript
// Archivo: providers/AppAuthProvider/views/AppAuthProvider.view.tsx
import type { AppAuthProviderProps } from "../types";
import { useAppAuth } from "../hooks";
```

---

## 📦 Exports Centralizados

### El archivo `providers/index.ts` centraliza todas las exportaciones:

```typescript
// Archivo: providers/index.ts
export { AppAuthProvider, useAppAuth } from './AppAuthProvider';
export { AppLanguageProvider, useAppLanguage } from './AppLanguageProvider';
export { ConfigProvider, useConfig } from './AppEnviromentProvider';
```

**Los consumidores externos importan desde el índice principal:**

```typescript
// ✅ Aplicaciones externas usan el alias @
import { 
  AppAuthProvider, 
  useAppAuth,
  ConfigProvider 
} from '@/lib/ui-library/providers';
// o desde el paquete instalado:
import { 
  AppAuthProvider, 
  useAppAuth,
  ConfigProvider 
} from 'GC-UI-COMPONENTS';
```

---

## 🎨 Casos de Uso Reales

### Caso 1: Nuevo Provider que Usa ConfigContext

```typescript
// Archivo: providers/MiNuevoProvider/views/MiNuevoProvider.view.tsx

import { createContext, useContext } from "react";
// ✅ Import de otro provider (subir 2 niveles)
import { ConfigContext } from "../../AppEnviromentProvider/index.hook";
// ✅ Import de environment (subir 3 niveles)
import { environment } from "../../../enviorments/enviroment";
// ✅ Import de tipos propios (subir 1 nivel)
import type { MiNuevoProviderProps } from "../types";

export function MiNuevoProvider({ children }: MiNuevoProviderProps) {
  const optionalConfig = useContext(ConfigContext);
  // ... resto del código
}
```

### Caso 2: Componente que Usa Provider Hook

```typescript
// Archivo: components/MiComponente/views/MiComponente.view.tsx

// ✅ Import de provider hook (subir 3 niveles)
import { useAppAuth } from "../../../providers/AppAuthProvider/hooks";
// ✅ Import de utils propios (subir 1 nivel)
import { formatearTexto } from "../utils/formato";
// ✅ Import de tipos propios
import type { MiComponenteProps } from "../types";

export function MiComponente({ titulo }: MiComponenteProps) {
  const { isAuthenticated } = useAppAuth();
  // ... resto del código
}
```

### Caso 3: Hook que Usa Otro Hook

```typescript
// Archivo: providers/AppAuthProvider/hooks/useAppAuth.hook.ts

// ✅ Import del contexto (subir 1 nivel, bajar a views)
import { AppAuthContext } from "../views/AppAuthProvider.view";
// ✅ Import de tipos (subir 1 nivel, bajar a types)
import type { AppAuthContextValue } from "../types";

export function useAppAuth(): AppAuthContextValue {
  const context = useContext(AppAuthContext);
  // ... resto del código
}
```

---

## ⚠️ Errores Comunes a Evitar

### ❌ Error 1: Usar Alias Dentro de la Librería
```typescript
// ❌ NO HACER
import { useAppAuth } from "@/lib/ui-library/providers/AppAuthProvider";
```

### ❌ Error 2: Rutas Relativas Incorrectas
```typescript
// ❌ NO HACER - Demasiados ../
import { environment } from "../../../../enviorments/enviroment";
```

### ❌ Error 3: Importar desde index.ts Interno
```typescript
// ❌ NO HACER - No importar desde el index.ts de providers dentro de la librería
import { AppAuthProvider } from "../../providers/index";

// ✅ HACER - Importar directamente del provider
import { AppAuthProvider } from "../../providers/AppAuthProvider";
```

---

## 🧪 Verificación Rápida

Para verificar que los imports están correctos:

```bash
# Buscar imports con alias @ dentro de la librería (debe devolver 0)
grep -r "from \"@/" client/src/lib/ui-library --include="*.ts" --include="*.tsx" | wc -l
```

**Resultado esperado:** `0` (cero archivos)

---

## 📝 Checklist para IA

Cuando trabajas dentro de `client/src/lib/ui-library/`:

- [ ] ✅ Usar **rutas relativas** (`../`, `../../`, etc.)
- [ ] ❌ NO usar alias `@/`
- [ ] ✅ Contar niveles correctamente
- [ ] ✅ Verificar que el archivo importado existe
- [ ] ✅ Usar `import type` para tipos TypeScript cuando sea posible
- [ ] ✅ Centralizar exports en `index.ts` de cada módulo

---

## 🎯 Resumen para IA

**DENTRO de `client/src/lib/ui-library/`:**
- Usa rutas relativas: `../../../components/SessionValidator`

**FUERA de la librería (aplicaciones que la consumen):**
- Usa alias o nombre del paquete: `@/lib/ui-library/providers` o `GC-UI-COMPONENTS`

**Razón:** Los alias como `@/` no se resuelven correctamente cuando la librería se importa como paquete externo en otras aplicaciones.

---

## ⚙️ Configuración de Vite para Aplicaciones Externas

Para usar los componentes de la librería en una aplicación externa, **debes configurar el alias de estilos en tu `vite.config.ts`:**

### 📝 Configuración Requerida

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      // ⚠️ IMPORTANTE: Alias para los estilos de la librería
      "GC-UI-COMPONENTS/styles": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/dist/style.css",
      ),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
```

### 🎨 Importar Estilos en tu Aplicación

Una vez configurado el alias, importa los estilos en tu archivo principal (por ejemplo, `main.tsx` o `App.tsx`):

```typescript
// Archivo: client/src/main.tsx o client/src/App.tsx
import "GC-UI-COMPONENTS/styles";
```

### ⚠️ Nota Importante

Sin esta configuración de alias en Vite, **los estilos de la librería no se cargarán correctamente** y los componentes no se verán como esperado.

---

## 📦 Configuración Completa de Ejemplo

Aquí hay un ejemplo completo de `vite.config.ts` para una aplicación que usa GC-UI-COMPONENTS:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      // Alias para los estilos de GC-UI-COMPONENTS
      "GC-UI-COMPONENTS/styles": path.resolve(
        import.meta.dirname,
        "node_modules/GC-UI-COMPONENTS/dist/style.css",
      ),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
```

### ✅ Checklist de Configuración

Cuando instales GC-UI-COMPONENTS en una aplicación externa:

- [ ] ✅ Instalar la librería desde GitHub: `npm install git+https://github.com/fhidalgoGC/test-components-system.git#version.1.0.2-mobile`
- [ ] ✅ Agregar alias `"GC-UI-COMPONENTS/styles"` en `vite.config.ts`
- [ ] ✅ Importar `"GC-UI-COMPONENTS/styles"` en tu archivo principal
- [ ] ✅ Configurar Tailwind CSS (ver `README-INSTALL-IA.md`)
- [ ] ✅ Verificar que los componentes se renderizan con estilos correctos
