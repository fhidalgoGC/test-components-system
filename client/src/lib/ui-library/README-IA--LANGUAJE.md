# Sistema de Idiomas - UI Library

## 📋 Sistema de traducciones para todos los componentes

Este sistema de idiomas se aplica de manera **uniforme** a todos los componentes de la librería UI.

---

## 🏗️ Flujo de Providers Jerárquico

### **Arquitectura Padre-Hijo:**
```
App Level (PADRE)
├── AppLanguageProvider        # 🎯 Provider principal de la aplicación
│   ├── Control de idioma global
│   ├── Estado del idioma actual  
│   └── Función setLanguage()
│
└── Library Level (HIJO)
    └── LibI18nProvider         # 📚 Provider específico de la librería
        ├── Recibe parentLanguageProvider
        ├── Maneja traducciones locales
        └── Combina con traducciones globales
```

### **⚠️ IMPORTANTE: La aplicación DEBE crear su AppLanguageProvider**

---

## 🎯 1. Crear AppLanguageProvider (OBLIGATORIO)

**La aplicación debe implementar su propio provider padre:**

```jsx
// En la aplicación principal
import { createContext, useContext, useState } from 'react';

// Context para el idioma de la aplicación
const AppLanguageContext = createContext();

// Provider padre que controla el idioma global
export function AppLanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Idioma por defecto
  
  const value = {
    language,
    setLanguage
  };
  
  return (
    <AppLanguageContext.Provider value={value}>
      {children}
    </AppLanguageContext.Provider>
  );
}

// Hook para usar el idioma en la app
export function useAppLanguage() {
  const context = useContext(AppLanguageContext);
  if (!context) {
    throw new Error('useAppLanguage must be used within AppLanguageProvider');
  }
  return context;
}
```

---

## 🌐 Arquitectura de Idiomas

### **LibI18nProvider (Proveedor hijo de la librería)**
**Ubicación:** `client/src/lib/ui-library/providers/LibI18n.provider.tsx`

```jsx
// Integración completa en la aplicación
function App() {
  return (
    <AppLanguageProvider>           {/* 🎯 PROVIDER PADRE */}
      <Router>
        <MyAppContent />
      </Router>
    </AppLanguageProvider>
  );
}

function MyComponentWithLibrary() {
  const app = useAppLanguage(); // 🔗 Obtener provider padre
  
  return (
    <LibI18nProvider                {/* 📚 PROVIDER HIJO */}
      parentLanguageProvider={app}  // ⚠️ OBLIGATORIO: Pasar provider padre
      globalTranslationPaths={globalTranslationPaths}
      translationPriority="component-first"
    >
      {/* Cualquier componente de la librería */}
      <TagSelector {...props} />
      <Button {...props} />
      <Modal {...props} />
      {/* etc... */}
    </LibI18nProvider>
  );
}
```

---

## 🔄 Flujo de Comunicación entre Providers

### **Paso a paso:**

1. **AppLanguageProvider** (padre) controla el idioma global de la aplicación
2. **useAppLanguage()** obtiene el provider padre
3. **LibI18nProvider** recibe el provider padre como prop
4. **LibI18nProvider** sincroniza automáticamente con el idioma del padre
5. **Componentes** usan `useLibI18n()` para traducciones

### **Ejemplo de flujo completo:**

```jsx
// 1. App principal con provider padre
function App() {
  return (
    <AppLanguageProvider>         // 🎯 Controla idioma global
      <MainContent />
    </AppLanguageProvider>
  );
}

// 2. Obtener provider padre y pasarlo a la librería
function MainContent() {
  const app = useAppLanguage();   // 🔗 Obtener provider padre
  
  return (
    <div>
      {/* Controles de idioma de la app */}
      <button onClick={() => app.setLanguage('es')}>Español</button>
      <button onClick={() => app.setLanguage('en')}>English</button>
      
      {/* Usar librería con provider hijo */}
      <LibI18nProvider
        parentLanguageProvider={app} // ⚠️ Pasar provider padre
        globalTranslationPaths={paths}
      >
        <TagSelector {...props} />   // 📚 Componentes de la librería
      </LibI18nProvider>
    </div>
  );
}
```

---

## 🎯 Configuración por Componente

### **Ejemplo con cualquier componente:**

```jsx
// ⚠️ IMPORTANTE: Siempre obtener provider padre primero
function ComponentePage() {
  const app = useAppLanguage(); // 🔗 OBLIGATORIO: Obtener provider padre
  
  return (
    <LibI18nProvider
      parentLanguageProvider={app}    // ⚠️ OBLIGATORIO: Pasar provider padre
      globalTranslationPaths={[
        { lang: 'es', path: '/translations/es.json' },
        { lang: 'en', path: '/translations/en.json' },
        { lang: 'fr', path: '/translations/fr.json' }
      ]}
      translationPriority="component-first"
    >
      <AnyComponent
        label={{
          en: "English Label",
          es: "Etiqueta en Español", 
          fr: "Étiquette Française",
          default: "Default Label"
        }}
        // ... otras props
      />
    </LibI18nProvider>
  );
}
```

---

## 🔧 Tipos de Etiquetas Multiidioma

### **MultiLanguageLabel Interface:**
```typescript
interface MultiLanguageLabel {
  en?: string;           // Inglés
  es?: string;           // Español  
  fr?: string;           // Francés
  [key: string]: string; // Cualquier idioma adicional
  default: string;       // ⚠️ OBLIGATORIO - Fallback
}
```

### **Uso en cualquier componente:**
```jsx
// ✅ CORRECTO - Con fallback obligatorio
label={{
  en: "Submit",
  es: "Enviar", 
  fr: "Soumettre",
  default: "Submit" // ⚠️ Siempre obligatorio
}}

// ❌ INCORRECTO - Sin fallback
label={{
  en: "Submit",
  es: "Enviar"
  // Falta 'default' - causará error
}}
```

---

## 🏗️ Prioridades de Traducción

### **1. component-first (Recomendado)**
```
Prioridad: Props del componente > Archivos JSON externos > default
```

### **2. external-first**
```  
Prioridad: Archivos JSON externos > Props del componente > default
```

### **Configuración:**
```jsx
<LibI18nProvider
  translationPriority="component-first" // o "external-first"
  // ...
>
  <AnyComponent />
</LibI18nProvider>
```

---

## 📁 Estructura de Archivos JSON

### **Archivos externos de traducciones:**
```json
// /translations/es.json
{
  "submit": "Enviar",
  "cancel": "Cancelar", 
  "loading": "Cargando...",
  "error": "Error",
  "success": "Éxito"
}

// /translations/en.json  
{
  "submit": "Submit",
  "cancel": "Cancel",
  "loading": "Loading...", 
  "error": "Error",
  "success": "Success"
}
```

---

## 🔄 Hook de Uso en Componentes

### **useLibI18n() - Para cualquier componente:**
```jsx
import { useLibI18n } from '../providers/LibI18n.provider';

function AnyComponent({ label, title, description }) {
  const { resolveLabel, t } = useLibI18n();
  
  return (
    <div>
      {/* Resuelve etiquetas multiidioma */}
      <h1>{resolveLabel(title)}</h1>
      <p>{resolveLabel(description)}</p>
      
      {/* Traduce claves de archivos JSON */}
      <button>{t('submit')}</button>
      <span>{t('loading')}</span>
    </div>
  );
}
```

---

## 📋 Reglas Universales

### **Para TODOS los componentes de la librería:**

1. **🎯 CREAR AppLanguageProvider** en la aplicación principal
2. **🔗 PASAR parentLanguageProvider** siempre a LibI18nProvider
3. **📚 USAR useAppLanguage()** para obtener el provider padre
4. **🏷️ INCLUIR `default`** obligatorio en MultiLanguageLabel
5. **🔄 USAR `resolveLabel()`** para etiquetas multiidioma
6. **📄 USAR `t()`** para traducciones de archivos JSON
7. **🌐 MANTENER consistencia** en nombres de idiomas (`en`, `es`, `fr`)
8. **⚠️ NUNCA usar LibI18nProvider** sin provider padre

---

## ⚠️ Errores Comunes

### **❌ NO hacer esto:**

```jsx
// ERROR: LibI18nProvider sin provider padre
<LibI18nProvider>  // ❌ Falta parentLanguageProvider
  <TagSelector />
</LibI18nProvider>

// ERROR: No crear AppLanguageProvider en la app
function App() {
  return <MyComponents />; // ❌ Falta AppLanguageProvider
}
```

### **✅ SÍ hacer esto:**

```jsx
// CORRECTO: Jerarquía completa
function App() {
  return (
    <AppLanguageProvider>          // ✅ Provider padre
      <MyComponents />
    </AppLanguageProvider>
  );
}

function MyComponents() {
  const app = useAppLanguage();   // ✅ Obtener provider padre
  
  return (
    <LibI18nProvider
      parentLanguageProvider={app} // ✅ Pasar provider padre
    >
      <TagSelector />
    </LibI18nProvider>
  );
}
```

---

## ✅ Beneficios del Sistema

- **🏗️ Jerárquico** - Separación clara entre app y librería
- **🔄 Reutilizable** - Mismo sistema para todos los componentes
- **🌐 Escalable** - Fácil agregar nuevos idiomas
- **⚡ Flexible** - Prioridades configurables
- **🎯 Consistente** - API uniforme en toda la librería
- **📦 Portable** - Funciona con cualquier provider padre
- **🔗 Sincronizado** - Cambios automáticos entre padre e hijo

---

## 🎯 Estado del Sistema

- **✅ Implementado** - Sistema jerárquico funcional
- **✅ Verificado** - Funciona con prioridades configurables  
- **✅ Documentado** - Guía completa con flujo padre-hijo
- **⚠️ Requerido** - AppLanguageProvider obligatorio en la aplicación
- **🔧 Extensible** - Preparado para nuevos componentes e idiomas