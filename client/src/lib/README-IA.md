# GC-UI-COMPONENTS - Guía de Instalación y Uso

**Version: 1.0.5**

## 📖 Descripción

GC-UI-COMPONENTS es una librería de componentes React frontend-only construida con React 18, TypeScript y Vite. Incluye un sistema completo de componentes UI con TagSelector avanzado, sistema de temas, internacionalización y diseño responsivo.

## 📦 Repositorio

**GitHub Repository:** `https://github.com/tu-usuario/GC-UI-COMPONENTS`

## 🚀 Instalación desde GitHub

### **Método 1: Clonar Repositorio (Recomendado para Desarrollo)**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/GC-UI-COMPONENTS.git
cd GC-UI-COMPONENTS

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### **Método 2: Instalar como Dependencia**

```bash
# Instalar directamente desde GitHub
npm install git+https://github.com/tu-usuario/GC-UI-COMPONENTS.git

# O especificar una rama específica
npm install git+https://github.com/tu-usuario/GC-UI-COMPONENTS.git#main
```

### **Método 3: Descargar Carpeta ui-library**

```bash
# Descargar solo la librería UI
wget https://github.com/tu-usuario/GC-UI-COMPONENTS/archive/main.zip
unzip main.zip
cp -r GC-UI-COMPONENTS-main/client/src/lib/ui-library ./src/lib/
```

## 🏗️ Configuración del Proyecto

### **1. Configurar Vite (Si usas Vite)**

```javascript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "GC-UI-COMPONENTS": path.resolve(__dirname, "src/lib/ui-library"),
    },
  },
});
```

### **2. Configurar TypeScript**

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "GC-UI-COMPONENTS": ["src/lib/ui-library"],
      "GC-UI-COMPONENTS/*": ["src/lib/ui-library/*"]
    }
  }
}
```

### **3. Instalar Dependencias Peer**

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns
```

## 📋 Opciones de Importación

### **Opción 1: Importación Principal (Recomendada)**

```jsx
import { TagSelector, LibI18nProvider, useLibI18n } from 'GC-UI-COMPONENTS';
```

### **Opción 2: Importaciones Específicas**

```jsx
// Componentes
import { TagSelector } from 'GC-UI-COMPONENTS/components';

// Providers
import { LibI18nProvider, useLibI18n } from 'GC-UI-COMPONENTS/providers';

// Tipos
import type { TagSelectorProps, TagSelectorContext } from 'GC-UI-COMPONENTS';

// Utilidades
import { cn, makeTranslator } from 'GC-UI-COMPONENTS/utils';

// Tema
import { lightTheme, darkTheme } from 'GC-UI-COMPONENTS/theme';
```

### **Opción 3: Importaciones Directas (Para Casos Específicos)**

```jsx
import TagSelector from 'GC-UI-COMPONENTS/components/TagSelector/views/TagSelector.view';
import { LibI18nProvider } from 'GC-UI-COMPONENTS/providers/LibI18n.provider';
```

## 🎯 Uso Básico

### **1. Configuración Mínima**

```jsx
import React from 'react';
import { TagSelector, LibI18nProvider } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <LibI18nProvider language="en">
      <TagSelector
        availableTags={[
          { id: '1', name: 'React' },
          { id: '2', name: 'TypeScript' },
          { id: '3', name: 'Vite' }
        ]}
        onTagsChange={(tags) => console.log('Selected:', tags)}
      />
    </LibI18nProvider>
  );
}
```

### **2. Configuración con Provider Padre**

```jsx
import React, { createContext, useContext, useState } from 'react';
import { TagSelector, LibI18nProvider } from 'GC-UI-COMPONENTS';

// Crear provider de aplicación
const AppLanguageContext = createContext();

function AppLanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  return (
    <AppLanguageContext.Provider value={{ lang: language, setLanguage }}>
      {children}
    </AppLanguageContext.Provider>
  );
}

function useAppLanguage() {
  return useContext(AppLanguageContext);
}

// Usar en la aplicación
function App() {
  return (
    <AppLanguageProvider>
      <MyComponent />
    </AppLanguageProvider>
  );
}

function MyComponent() {
  const appLanguage = useAppLanguage();
  
  return (
    <LibI18nProvider parentLanguageProvider={appLanguage}>
      <TagSelector
        availableTags={tags}
        onTagsChange={handleChange}
        defaultSelectedTags={['1', '2']}
      />
    </LibI18nProvider>
  );
}
```

### **3. Configuración Avanzada con Traducciones Globales**

```jsx
function AdvancedApp() {
  const appLanguage = useAppLanguage();
  
  // Rutas a archivos de traducción globales
  const globalTranslationPaths = [
    { lang: "es", path: "./i18n/es.json" },
    { lang: "en", path: "./i18n/en.json" }
  ];
  
  return (
    <LibI18nProvider 
      parentLanguageProvider={appLanguage}
      globalTranslationPaths={globalTranslationPaths}
      translationPriority="component-first"
    >
      <TagSelector
        availableTags={tags}
        onTagsChange={handleChange}
        theme="dark"
        size="lg"
        variant="default"
      />
    </LibI18nProvider>
  );
}
```

## 🎨 CSS y Estilos

### **1. Importar Estilos Base de Tailwind**

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Variables CSS para temas personalizados */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
}
```

### **2. Configurar Tailwind**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/lib/ui-library/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      }
    }
  },
  plugins: []
};
```

## 🌐 Internacionalización

### **1. Estructura de Archivos de Traducción**

```json
// i18n/es.json
{
  "common": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar"
  },
  "tagSelector": {
    "selectAll": "Seleccionar todo",
    "clearAll": "Limpiar todo",
    "loading": "Cargando..."
  }
}
```

```json
// i18n/en.json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel", 
    "delete": "Delete"
  },
  "tagSelector": {
    "selectAll": "Select all",
    "clearAll": "Clear all",
    "loading": "Loading..."
  }
}
```

### **2. Uso del Hook de Traducción**

```jsx
import { useLibI18n } from 'GC-UI-COMPONENTS';

function MyComponent() {
  const { t, lang, setLanguage } = useLibI18n();
  
  return (
    <div>
      <h1>{t('tagSelector.selectAll')}</h1>
      <p>Current language: {lang}</p>
      <button onClick={() => setLanguage('es')}>
        Cambiar a Español
      </button>
    </div>
  );
}
```

## 🔧 API de Componentes

### **TagSelector Props**

```typescript
interface TagSelectorProps {
  availableTags: Array<{ id: string; name: string; [key: string]: any }>;
  onTagsChange: (selectedTags: string[]) => void;
  defaultSelectedTags?: string[];
  theme?: 'light' | 'dark' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  disabled?: boolean;
  placeholder?: string;
  maxSelectedTags?: number;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
}
```

### **LibI18nProvider Props**

```typescript
interface LibI18nProviderProps {
  language?: 'es' | 'en';
  onLanguageChange?: (lang: 'es' | 'en') => void;
  parentLanguageProvider?: GenericLanguageProvider;
  globalTranslationPaths?: Array<{ lang: string; path: string }>;
  translationPriority?: 'component-first' | 'external-first';
  children: React.ReactNode;
}
```

## 🐛 Solución de Problemas Comunes

### **Error: "useLibI18n must be used within LibI18nProvider"**

```jsx
// ❌ MAL - Sin provider
function App() {
  return <TagSelector />;
}

// ✅ BIEN - Con provider
function App() {
  return (
    <LibI18nProvider language="en">
      <TagSelector />
    </LibI18nProvider>
  );
}
```

### **Error: "Module not found"**

```bash
# Verificar alias en vite.config.ts o tsconfig.json
# Asegurar que la ruta a ui-library es correcta
# Reinstalar dependencias
npm install
```

### **Estilos no aplicándose**

```jsx
// Verificar importación de CSS de Tailwind
// Asegurar configuración correcta de tailwind.config.js
// Importar estilos base en index.css
```

## 📚 Documentación Adicional

- **TagSelector README**: `./ui-library/components/TagSelector/README-IA.md`
- **Sistema de Idiomas**: `./ui-library/README-IA--LANGUAJE.md`
- **LibI18nProvider**: `./ui-library/providers/README-LibI18n.provider.md`
- **Guía de Desarrollo**: `./ui-library/README-BUILD-NEW-COMPONENTS.md`

## 🤝 Contribución

```bash
# Fork del repositorio
git clone https://github.com/tu-usuario/GC-UI-COMPONENTS.git
cd GC-UI-COMPONENTS

# Crear rama de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Push y crear Pull Request
git push origin feature/nueva-funcionalidad
```

## 📄 Licencia

MIT License - Ver LICENSE file para más detalles.

---

**Version: 1.0.5** | **Última actualización: Septiembre 2025**