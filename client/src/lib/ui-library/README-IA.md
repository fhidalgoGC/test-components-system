# GC-UI-COMPONENTS - Guía de Instalación y Uso

**Version: 1.0.5**

## 📖 Descripción

GC-UI-COMPONENTS es una librería de componentes React frontend-only construida con React 18, TypeScript y Vite. Incluye un sistema completo de componentes UI, sistema de temas, internacionalización y diseño responsivo.

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


## 🏗️ Configuración del Proyecto

### **Instalar Dependencias Peer**

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns
```

## 📋 Opciones de Importación

### **Opción 1: Importación Principal (Recomendada)**

```jsx
import { LibI18nProvider, useLibI18n } from 'GC-UI-COMPONENTS';
```

### **Opción 2: Importaciones Específicas**

```jsx
// Componentes
import { /* Componentes disponibles */ } from 'GC-UI-COMPONENTS/components';

// Providers
import { LibI18nProvider, useLibI18n } from 'GC-UI-COMPONENTS/providers';

// Tipos
import type { /* Tipos disponibles */ } from 'GC-UI-COMPONENTS';

// Utilidades
import { cn, makeTranslator } from 'GC-UI-COMPONENTS/utils';

// Tema
import { lightTheme, darkTheme } from 'GC-UI-COMPONENTS/theme';
```

## 🎯 Configuración de Providers

### **1. LibI18nProvider - Configuración Mínima**

```jsx
import React from 'react';
import { LibI18nProvider } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <LibI18nProvider language="en">
      {/* Tus componentes de la librería aquí */}
    </LibI18nProvider>
  );
}
```

### **2. LibI18nProvider - Configuración con Provider Padre**

```jsx
import React, { createContext, useContext, useState } from 'react';
import { LibI18nProvider } from 'GC-UI-COMPONENTS';

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
      {/* Tus componentes de la librería aquí */}
    </LibI18nProvider>
  );
}
```

### **3. LibI18nProvider - Configuración Avanzada con Traducciones Globales**

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
      {/* Tus componentes de la librería aquí */}
    </LibI18nProvider>
  );
}
```

## 🎨 CSS y Estilos

### **1. Importar Estilos Base de Tailwind**

```css
/* src/index.css (en tu aplicación) */
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
// tailwind.config.js (en tu aplicación)
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/GC-UI-COMPONENTS/**/*.{js,ts,jsx,tsx}"
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

## 🔧 API de Providers

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
  return <ComponenteDeLaLibreria />;
}

// ✅ BIEN - Con provider
function App() {
  return (
    <LibI18nProvider language="en">
      <ComponenteDeLaLibreria />
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

- **Sistema de Idiomas**: `./README-IA--LANGUAJE.md`
- **LibI18nProvider**: `./providers/README-LibI18n.provider.md`
- **Guía de Desarrollo**: `../README-BUILD-NEW-COMPONENTS.md`
- **Componentes Específicos**: Ver documentación individual en cada carpeta de componente

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