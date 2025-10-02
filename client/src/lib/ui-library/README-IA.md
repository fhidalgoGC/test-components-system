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
node_modules/GC-UI-COMPONENTS/client/src/lib/ui-library/
```

### **Archivos de Documentación:**
- **Sistema de Estilos Global**: `README-IA--STYLES.md`
- **Sistema de Idiomas - Provider Padre**: `providers/AppLanguageProvider/README.md`
- **Sistema de Idiomas - Provider Librería**: `providers/AppLanguageLibUiProvider/README.md`
- **Sistema de Configuración**: `providers/AppEnviromentProvider/README.md`
- **TagSelector**: `components/TagSelector/README-IA.md`
- **Estilos TagSelector**: `components/TagSelector/README-IA--STYLES.md`
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