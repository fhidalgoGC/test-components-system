# Sistema de Idiomas - UI Library

## 📋 Sistema de traducciones para todos los componentes

Este sistema de idiomas se aplica de manera **uniforme** a todos los componentes de la librería UI.

---

## 🌐 Arquitectura de Idiomas

### **LibI18nProvider (Proveedor de la librería)**
**Ubicación:** `client/src/lib/ui-library/providers/LibI18n.provider.tsx`

```jsx
<LibI18nProvider
  parentLanguageProvider={app} // Proveedor padre de la aplicación
  globalTranslationPaths={globalTranslationPaths} // Rutas a archivos JSON
  translationPriority="component-first" // o "external-first"
>
  {/* Cualquier componente de la librería */}
  <TagSelector {...props} />
  <Button {...props} />
  <Modal {...props} />
  {/* etc... */}
</LibI18nProvider>
```

---

## 🎯 Configuración por Componente

### **Ejemplo con cualquier componente:**

```jsx
// Ejemplo: TagSelector (aplica igual para Button, Modal, etc.)
<LibI18nProvider
  parentLanguageProvider={app}
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

1. **Siempre incluir `default`** en `MultiLanguageLabel`
2. **Usar `resolveLabel()`** para etiquetas con múltiples idiomas
3. **Usar `t()`** para traducciones de archivos JSON
4. **Configurar `LibI18nProvider`** como wrapper principal
5. **Mantener consistencia** en nombres de idiomas (`en`, `es`, `fr`)

---

## ✅ Beneficios del Sistema

- **🔄 Reutilizable** - Mismo sistema para todos los componentes
- **🌐 Escalable** - Fácil agregar nuevos idiomas
- **⚡ Flexible** - Prioridades configurables
- **🎯 Consistente** - API uniforme en toda la librería
- **📦 Portable** - Funciona con cualquier proveedor padre

---

## 🎯 Estado del Sistema

- **✅ Implementado** - Sistema funcional para todos los componentes
- **✅ Verificado** - Funciona con prioridades configurables  
- **✅ Documentado** - Guía completa para cualquier componente
- **🔧 Extensible** - Preparado para nuevos componentes e idiomas