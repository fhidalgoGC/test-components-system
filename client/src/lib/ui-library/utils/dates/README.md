# Date Utilities - Flexible Provider Support

**Version: 2.0.0**

## 📖 Descripción

Utilidades de formateo de fechas que funcionan con múltiples providers o standalone. Sistema inteligente de fallback que detecta automáticamente qué provider está disponible.

## 🏗️ Sistema de Fallback

```
Prioridad de Detección:
1. AppLanguageProvider     → Usa dateFormat y twoDigits directamente
2. LibI18nProvider         → Obtiene lang y busca config en LANGUAGE_CONFIG
3. Standalone              → Usa DEFAULT_LANGUAGE del environment
```

## 🚀 Uso

### **1. Con AppLanguageProvider (Recomendado)**

```tsx
import { AppLanguageProvider, useDateFormatter } from 'GC-UI-COMPONENTS';

function App() {
  return (
    <AppLanguageProvider initial="es">
      <DateComponent />
    </AppLanguageProvider>
  );
}

function DateComponent() {
  const formatter = useDateFormatter();
  const formatted = formatter(new Date());
  // Español: "02/10/2025"
  return <p>{formatted}</p>;
}
```

### **2. Con LibI18nProvider (Librería sin App Provider)**

```tsx
import { LibI18nProvider, useDateFormatter } from 'GC-UI-COMPONENTS';

function LibraryComponent() {
  return (
    <LibI18nProvider language="es">
      <DateDisplay />
    </LibI18nProvider>
  );
}

function DateDisplay() {
  const formatter = useDateFormatter();
  // Obtiene config de LANGUAGE_CONFIG['es'] automáticamente
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **3. Standalone (Sin Provider)**

```tsx
import { useDateFormatter } from 'GC-UI-COMPONENTS';

function StandaloneComponent() {
  const formatter = useDateFormatter();
  // Usa DEFAULT_LANGUAGE del environment
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **4. Formateo Manual (Sin Hooks)**

```tsx
import { formatDate, getDateConfigForLanguage } from 'GC-UI-COMPONENTS';

// Opción 1: Pasar configuración manual
const formatted = formatDate(new Date(), 'dd/MM/yyyy', true);

// Opción 2: Obtener config para idioma específico
const esConfig = getDateConfigForLanguage('es');
const formatted = formatDate(new Date(), esConfig.dateFormat, esConfig.twoDigits);
```

## 📋 API Reference

### **useDateFormatter()**
```typescript
function useDateFormatter(): (date: Date | string | number | null | undefined) => string
```
Hook que retorna función formateadora. Detecta provider automáticamente.

### **useFormattedDate()**
```typescript
function useFormattedDate(date: Date | string | number | null | undefined): string
```
Hook que retorna fecha formateada directamente. Reactivo a cambios de idioma.

### **formatDate()**
```typescript
function formatDate(
  date: Date | string | number | null | undefined,
  dateFormat: string,
  twoDigits?: boolean
): string
```
Función sin hooks para uso fuera de componentes React.

### **getDateConfigForLanguage()**
```typescript
function getDateConfigForLanguage(lang: string): {
  locale: string;
  dateFormat: string;
  twoDigits: boolean;
}
```
Obtiene configuración de fecha para idioma específico.

## 🔧 Configuración de Idiomas

La configuración se define en `enviorments/enviroment.ts`:

```typescript
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

## ⚠️ Consideraciones

1. **AppLanguageProvider tiene prioridad**: Si ambos providers están disponibles, se usa AppLanguageProvider
2. **LibI18nProvider requiere config en environment**: Debe existir en LANGUAGE_CONFIG
3. **Fallback seguro**: Siempre retorna formato válido, incluso sin providers
4. **No breaking changes**: Código existente sigue funcionando

## 🎯 Casos de Uso

### **Librería Independiente**
```tsx
// Solo LibI18nProvider - config obtenida del environment
<LibI18nProvider language="es">
  <Component /> {/* useDateFormatter funciona */}
</LibI18nProvider>
```

### **Aplicación Completa**
```tsx
// AppLanguageProvider + LibI18nProvider
<AppLanguageProvider initial="es">
  <LibI18nProvider parentLanguageProvider={app}>
    <Component /> {/* usa AppLanguageProvider */}
  </LibI18nProvider>
</AppLanguageProvider>
```

### **Componente sin Provider**
```tsx
// Usa DEFAULT_LANGUAGE
function Component() {
  const formatter = useDateFormatter(); // Funciona con defaults
  return <div>{formatter(new Date())}</div>;
}
```

---

**Version: 2.0.0** | **Última actualización: Octubre 2025**
