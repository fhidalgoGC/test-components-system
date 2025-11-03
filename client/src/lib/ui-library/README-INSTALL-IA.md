# GC-UI-COMPONENTS - Guía de Instalación y Uso

**Version: 1.0.6**

## 📖 Descripción

GC-UI-COMPONENTS es una librería de componentes React frontend-only construida con React 18, TypeScript y Vite. Incluye un sistema completo de componentes UI, sistema de temas, internacionalización y diseño responsivo.

## 📦 Repositorio

**GitHub Repository:** `https://github.com/fhidalgoGC/test-components-system/`  
**Rama Principal:** `version.1.0.2-mobile`

## 🚀 Instalación desde GitHub

### **Método 1: Clonar Repositorio (Recomendado para Desarrollo)**

```bash
# Clonar el repositorio
git clone https://github.com/fhidalgoGC/test-components-system.git
cd test-components-system

# Cambiar a la rama principal
git checkout version.1.0.2-mobile

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### **Método 2: Instalar como Dependencia**

```bash
# Instalar directamente desde GitHub (rama version.1.0.2-mobile)
npm install git+https://github.com/fhidalgoGC/test-components-system.git#version.1.0.2-mobile
```


## 🏗️ Configuración del Proyecto

### **Instalar Dependencias Peer**

```bash
npm install react react-dom typescript
npm install @radix-ui/react-slot class-variance-authority clsx
npm install tailwindcss tailwind-merge lucide-react
npm install framer-motion date-fns embla-carousel-react
npm install wouter react-hook-form zod
```

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