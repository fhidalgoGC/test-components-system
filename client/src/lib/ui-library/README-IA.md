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
// Componentes principales
import { 
  TagSelector,
  AppLanguageProvider,
  LibI18nProvider,
  ThemeProvider 
} from 'GC-UI-COMPONENTS';

// Hooks
import { 
  useAppLanguage,
  useLibI18n 
} from 'GC-UI-COMPONENTS';

// Tipos
import type { 
  TagItem,
  TagSelectorProps,
  MultiLanguageLabel 
} from 'GC-UI-COMPONENTS';
```

### **Opción 2: Importaciones Específicas**

```jsx
// Si prefieres importaciones más específicas
import { TagSelector } from 'GC-UI-COMPONENTS';
import { AppLanguageProvider, LibI18nProvider } from 'GC-UI-COMPONENTS';
import type { TagItem, TagSelectorProps } from 'GC-UI-COMPONENTS';
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


## 🐛 Solución de Problemas Comunes


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

Para acceder a la documentación después de la instalación:

```bash
# La documentación está disponible en:
node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library/
```

### **Archivos de Documentación:**
- **Sistema de Idiomas**: `README-IA--LANGUAJE.md`
- **TagSelector**: `components/TagSelector/README-IA.md`
- **Estilos TagSelector**: `components/TagSelector/README-IA--STYLES.md`
- **LibI18nProvider**: `providers/README-LibI18n.provider.md`
- **Índice General**: `README-INDEX.md`

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