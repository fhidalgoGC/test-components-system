# AppLanguageProvider - Provider de Idioma de Aplicación

**Version: 2.0.0**

## 📖 Descripción

`AppLanguageProvider` es el proveedor de idioma principal para aplicaciones que usan GC-UI-COMPONENTS. Controla el idioma global de la aplicación y proporciona configuración regional, formatos de fecha y configuración de idioma centralizada.

## 🏗️ Estructura Modular

```
AppLanguageProvider/
├── index.provider.tsx   # AppLanguageProvider component
├── index.types.ts       # TypeScript types
├── index.hook.ts        # Custom hooks (useAppLanguage, useValidatedLanguage)
└── README.md           # This documentation
```

## 🏗️ Arquitectura

### **Proveedor Padre de la Aplicación**

```
App Level (PADRE)
├── AppLanguageProvider        # 🎯 Provider principal de la aplicación
│   ├── Control de idioma global
│   ├── Estado del idioma actual (lang)
│   ├── Función setLang()
│   ├── Configuración regional (locale, dateFormat)
│   └── Lista de idiomas disponibles
│
└── Components/Pages
    └── Usan useAppLanguage() para acceder al contexto
```

## 📋 Props Interface

```typescript
interface AppLanguageProviderProps {
  initial?: AppLanguage;        // Idioma inicial (default: del environment)
  children: React.ReactNode;
}

type AppLanguageContextValue = {
  lang: AppLanguage;                    // Idioma actual
  setLang: (next: AppLanguage) => void; // Cambiar idioma
  dateFormat: string;                   // Formato de fecha del idioma actual
  twoDigits: boolean;                   // Usar dos dígitos en fechas
  config: LanguageConfig;               // Configuración completa del idioma
  availableLanguages: string[];         // Idiomas disponibles
};
```

## 🚀 Uso Básico

### **Instalación en la Aplicación**

```jsx
import { AppLanguageProvider } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <AppLanguageProvider initial="en">
      <MyAppContent />
    </AppLanguageProvider>
  );
}
```

### **Uso del Hook useAppLanguage**

```jsx
import { useAppLanguage } from 'GC-UI-COMPONENTS';

function LanguageSelector() {
  const { lang, setLang, availableLanguages } = useAppLanguage();
  
  return (
    <div>
      <p>Idioma actual: {lang}</p>
      {availableLanguages.map(language => (
        <button 
          key={language}
          onClick={() => setLang(language)}
        >
          {language.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
```

### **Acceso a Configuración de Idioma**

```jsx
import { useAppLanguage } from 'GC-UI-COMPONENTS';

function DateDisplay({ date }) {
  const { dateFormat, config, lang } = useAppLanguage();
  
  return (
    <div>
      <p>Formato de fecha: {dateFormat}</p>
      <p>Locale: {config.locale}</p>
      <p>Idioma: {lang}</p>
    </div>
  );
}
```

## 🎯 Casos de Uso

### **Caso 1: Idioma Inicial Dinámico**

```jsx
import { AppLanguageProvider } from 'GC-UI-COMPONENTS';

function App() {
  // Detectar idioma del navegador
  const browserLang = navigator.language.split('-')[0]; // 'es', 'en', etc.
  
  return (
    <AppLanguageProvider initial={browserLang}>
      <MyApp />
    </AppLanguageProvider>
  );
}
```

### **Caso 2: Persistencia en LocalStorage**

```jsx
import { AppLanguageProvider, useAppLanguage } from 'GC-UI-COMPONENTS';
import { useEffect } from 'react';

function AppWrapper() {
  const savedLang = localStorage.getItem('app-language') || 'en';
  
  return (
    <AppLanguageProvider initial={savedLang}>
      <LanguagePersistence />
    </AppLanguageProvider>
  );
}

function LanguagePersistence({ children }) {
  const { lang } = useAppLanguage();
  
  useEffect(() => {
    localStorage.setItem('app-language', lang);
  }, [lang]);
  
  return children;
}
```

### **Caso 3: Integración con LibI18nProvider**

```jsx
import { AppLanguageProvider, useAppLanguage, LibI18nProvider } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <AppLanguageProvider initial="en">
      <MyComponents />
    </AppLanguageProvider>
  );
}

function MyComponents() {
  const appLanguage = useAppLanguage(); // Obtener provider padre
  
  return (
    <LibI18nProvider parentLanguageProvider={appLanguage}>
      {/* Componentes de la librería sincronizados con el idioma de la app */}
      <TagSelector />
    </LibI18nProvider>
  );
}
```

## 🔧 Configuración de Idiomas

### **Variables de Environment**

La configuración de idiomas se define en `client/src/lib/ui-library/enviorments/enviroment.ts`:

```typescript
export const AVAILABLE_LANGUAGES = ['es', 'en'];
export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGE_CONFIG = {
  es: {
    locale: 'es-ES',
    dateFormat: 'dd/MM/yyyy',
    twoDigits: true,
  },
  en: {
    locale: 'en-US',
    dateFormat: 'MM/dd/yyyy',
    twoDigits: false,
  }
};
```

### **Agregar Nuevos Idiomas**

Para agregar un nuevo idioma, actualiza el archivo de environment:

```typescript
export const AVAILABLE_LANGUAGES = ['es', 'en', 'fr'];

export const LANGUAGE_CONFIG = {
  // ... idiomas existentes
  fr: {
    locale: 'fr-FR',
    dateFormat: 'dd/MM/yyyy',
    twoDigits: true,
  }
};
```

## 🔄 Integración con Utilidades

### **Uso con useDateFormatter**

```jsx
import { useAppLanguage, useDateFormatter } from 'GC-UI-COMPONENTS';

function DateComponent() {
  const { lang } = useAppLanguage();
  const formatter = useDateFormatter(); // Usa automáticamente el idioma actual
  
  const formattedDate = formatter(new Date());
  
  return <p>Fecha: {formattedDate}</p>;
}
```

## 🚨 Errores Comunes

### **Error: "useAppLanguage must be used within AppLanguageProvider"**

```jsx
// ❌ Incorrecto - Hook usado fuera del provider
function App() {
  const { lang } = useAppLanguage(); // Error!
  return <div>{lang}</div>;
}

// ✅ Correcto - Hook usado dentro del provider
function App() {
  return (
    <AppLanguageProvider>
      <MyComponent /> {/* Aquí sí puedes usar useAppLanguage */}
    </AppLanguageProvider>
  );
}
```

### **Idioma no disponible**

```jsx
// ❌ Si el idioma no está en AVAILABLE_LANGUAGES
<AppLanguageProvider initial="de"> {/* 'de' no está disponible */}
  <App />
</AppLanguageProvider>

// ✅ El provider automáticamente usa DEFAULT_LANGUAGE como fallback
// Se muestra un warning en consola
```

## 🔗 API Reference

### **AppLanguageProvider Props**

```typescript
interface AppLanguageProviderProps {
  initial?: AppLanguage;        // Idioma inicial (opcional)
  children: React.ReactNode;
}
```

### **useAppLanguage Hook**

```typescript
interface AppLanguageContextValue {
  lang: AppLanguage;                    // Idioma actual
  setLang: (next: AppLanguage) => void; // Cambiar idioma (valida contra AVAILABLE_LANGUAGES)
  dateFormat: string;                   // Formato de fecha
  twoDigits: boolean;                   // Usar dos dígitos
  config: LanguageConfig;               // Configuración completa
  availableLanguages: string[];         // Lista de idiomas disponibles
}
```

## 🎯 Mejores Prácticas

1. **Usar idioma del navegador como inicial**: Proporciona mejor UX
2. **Persistir selección del usuario**: Guardar en localStorage o cookies
3. **Validar idiomas**: El provider valida automáticamente contra AVAILABLE_LANGUAGES
4. **Centralizar en App root**: Colocar AppLanguageProvider en el nivel más alto
5. **Combinar con LibI18nProvider**: Para traducciones de componentes de la librería

## 🔗 Enlaces Relacionados

- **../AppLanguageLibUiProvider/README.md**: Provider de traducciones de la librería (hijo)
- **../AppEnviromentProvider/README.md**: Sistema de configuración de la librería
- **../../utils/dates/**: Utilidades de formateo de fechas que usan AppLanguageProvider
- **../../enviorments/enviroment.ts**: Configuración de idiomas disponibles

---

**Version: 2.0.0** | **Última actualización: Octubre 2025**
