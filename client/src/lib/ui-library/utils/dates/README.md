# Date Utilities - Flexible Provider Support

**Version: 3.0.0**

## 📖 Descripción

Utilidades de formateo de fechas que funcionan con múltiples providers o standalone. Sistema inteligente de fallback que detecta automáticamente qué provider está disponible y usa `AppProviderLanguageResolver` para obtener la configuración correcta según la jerarquía de providers.

## 🏗️ Arquitectura de Providers

```
Flujo de Configuración:
ConfigProvider (merge interno + externo)
    ↓
AppLanguageProvider (lee configuración merged)
    ↓
LibI18nProvider (provider de la librería)
    ↓
Componentes

Prioridad de Detección:
1. LibI18nProvider         → Provider de la librería (usa parentLanguageProvider)
2. AppLanguageProvider     → Provider de la aplicación padre (usa dateFormat y twoDigits)
3. ConfigProvider merged   → Configuración merged como fallback
```

## 🔧 AppProviderLanguageResolver

Esta utilidad detecta automáticamente qué provider usar según disponibilidad:

```typescript
import { useAppProviderLanguageResolver } from 'GC-UI-COMPONENTS';

function Component() {
  const { config, source } = useAppProviderLanguageResolver();
  
  // config = { lang, dateFormat, twoDigits, locale }
  // source = 'lib' | 'app' | 'config' | 'fallback'
}
```

### **Lógica de Prioridad:**

1. **LibI18nProvider**: Si está disponible, usa su `lang` + su `parentLanguageProvider` si existe
2. **AppLanguageProvider**: Si no hay LibI18n, usa directamente AppLanguageProvider
3. **ConfigProvider**: Si no hay ninguno, usa la configuración merged del ConfigProvider
4. **Fallback**: Si ninguno está disponible, usa defaults (`en`, `MM/dd/yyyy`, `true`)

## 🔄 Sistema de Configuración Externa

### **Sobrescribir Configuración Interna**

La aplicación externa puede sobrescribir la configuración de la librería exportando `LANGUAGE_CONFIG` en su environment:

```typescript
// client/src/enviorments/enviroment.ts (Aplicación Externa)

export const LANGUAGE_CONFIG: Record<string, LanguageConfig> = {
  es: {
    locale: 'es-ES',
    dateFormat: 'dd/MM/yyyy',  // ✅ Sobrescribe el interno
    twoDigits: true,
  },
  en: {
    locale: 'en-US',
    dateFormat: 'MM',          // ✅ Sobrescribe el interno
    twoDigits: false,
  }
};

export const environment = {
  AVAILABLE_LANGUAGES: ['es', 'en'],
  DEFAULT_LANGUAGE: 'en',
  LANGUAGE_CONFIG,  // ✅ IMPORTANTE: Debe exportarse para que funcione el merge
};
```

### **Merge Inteligente**

El `ConfigProvider` hace un merge entre la configuración interna de la librería y la externa:

```typescript
// Configuración Interna (librería)
const internalConfig = { LANGUAGE_CONFIG: { en: { dateFormat: 'MM/dd/yyyy' } } };

// Configuración Externa (aplicación)
const externalConfig = { LANGUAGE_CONFIG: { en: { dateFormat: 'MM' } } };

// Resultado Merged (priority: 'auto')
const merged = { LANGUAGE_CONFIG: { en: { dateFormat: 'MM' } } }; // ✅ Externa gana
```

**Nota**: El environment externo puede tener MÁS keys que el interno. Solo las keys que coinciden se sobrescriben, las adicionales se ignoran.

## 🚀 Uso

### **1. Arquitectura Completa (Recomendado)**

```tsx
import { 
  AppLanguageProvider, 
  ConfigProvider, 
  LibI18nProvider, 
  useAppLanguage,
  useDateFormatter 
} from 'GC-UI-COMPONENTS';
import { environment } from './enviroments/enviroment';

function AppContent() {
  const app = useAppLanguage();
  
  return (
    <LibI18nProvider
      parentLanguageProvider={app}
      globalTranslationPaths={[]}
      translationPriority="component-first"
    >
      <DateComponent />
    </LibI18nProvider>
  );
}

function App() {
  return (
    <ConfigProvider parentConfig={environment} priority="auto">
      <AppLanguageProvider initial="en">
        <AppContent />
      </AppLanguageProvider>
    </ConfigProvider>
  );
}

function DateComponent() {
  const formatter = useDateFormatter();
  // Usa: LibI18nProvider → AppLanguageProvider → ConfigProvider merged
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **2. Con AppLanguageProvider (Sin LibI18n)**

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
  // Usa: AppLanguageProvider → ConfigProvider merged
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **3. Con LibI18nProvider (Librería Standalone)**

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
  // Usa: LibI18nProvider → ConfigProvider merged
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **4. Standalone (Sin Provider)**

```tsx
import { useDateFormatter } from 'GC-UI-COMPONENTS';

function StandaloneComponent() {
  const formatter = useDateFormatter();
  // Usa: ConfigProvider merged → Fallback defaults
  const formatted = formatter(new Date());
  return <p>{formatted}</p>;
}
```

### **5. Formateo Manual (Sin Hooks)**

```tsx
import { formatDate, getDateConfigForLanguage } from 'GC-UI-COMPONENTS';

// Opción 1: Pasar configuración manual
const formatted = formatDate(new Date(), 'dd/MM/yyyy', true);

// Opción 2: Obtener config para idioma específico
const esConfig = getDateConfigForLanguage('es');
const formatted = formatDate(new Date(), esConfig.dateFormat, esConfig.twoDigits);
```

## 📋 API Reference

### **useAppProviderLanguageResolver()**
```typescript
function useAppProviderLanguageResolver(): {
  config: {
    lang: string;
    dateFormat: string;
    twoDigits: boolean;
    locale: string;
  };
  source: 'lib' | 'app' | 'config' | 'fallback';
}
```
Hook que detecta qué provider usar y retorna la configuración correspondiente. Usado internamente por `useDateFormatter`.

### **useDateFormatter()**
```typescript
function useDateFormatter(): (date: Date | string | number | null | undefined) => string
```
Hook que retorna función formateadora. Detecta provider automáticamente usando `useAppProviderLanguageResolver`.

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
Obtiene configuración de fecha para idioma específico desde `LANGUAGE_CONFIG`.

## 🔧 Configuración de Idiomas

### **Configuración Interna (Librería)**

La librería tiene una configuración por defecto en `lib/ui-library/enviorments/enviroment.ts`:

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

### **Configuración Externa (Aplicación)**

La aplicación puede sobrescribir en `enviorments/enviroment.ts`:

```typescript
export const LANGUAGE_CONFIG = {
  es: {
    locale: 'es-ES',
    dateFormat: 'dd/MM/yyyy',
    twoDigits: true,
  },
  en: {
    locale: 'en-US',
    dateFormat: 'MM',  // ✅ Sobrescribe: ahora solo muestra mes
    twoDigits: true,
  }
};

export const environment = {
  AVAILABLE_LANGUAGES: ['es', 'en'],
  DEFAULT_LANGUAGE: 'en',
  LANGUAGE_CONFIG,  // ✅ Debe exportarse
};
```

## ⚠️ Consideraciones

1. **Jerarquía de Prioridad**: LibI18nProvider > AppLanguageProvider > ConfigProvider merged > Fallback
2. **Export LANGUAGE_CONFIG**: Para que funcione el override, debe exportarse en el environment externo
3. **Merge Inteligente**: ConfigProvider hace merge profundo entre configs interna y externa
4. **LibI18nProvider con parentLanguageProvider**: Conecta con AppLanguageProvider para sincronización bidireccional
5. **Fallback Seguro**: Siempre retorna formato válido, incluso sin providers
6. **No Breaking Changes**: Código existente sigue funcionando

## 🎯 Casos de Uso

### **Librería Independiente**
```tsx
// Solo LibI18nProvider - config obtenida del ConfigProvider merged
<LibI18nProvider language="es">
  <Component /> {/* useDateFormatter funciona */}
</LibI18nProvider>
```

### **Aplicación Completa con Override**
```tsx
// ConfigProvider + AppLanguageProvider + LibI18nProvider
<ConfigProvider parentConfig={environment}>
  <AppLanguageProvider initial="es">
    <LibI18nProvider parentLanguageProvider={app}>
      <Component /> {/* usa configuración externa sobrescrita */}
    </LibI18nProvider>
  </AppLanguageProvider>
</ConfigProvider>
```

### **Componente sin Provider**
```tsx
// Usa DEFAULT_LANGUAGE del ConfigProvider merged
function Component() {
  const formatter = useDateFormatter(); // Funciona con defaults
  return <div>{formatter(new Date())}</div>;
}
```

### **Debug de Configuración**
```tsx
function DebugComponent() {
  const { config, source } = useAppProviderLanguageResolver();
  
  console.log('Source:', source);
  // 'lib' | 'app' | 'config' | 'fallback'
  
  console.log('Config:', config);
  // { lang, dateFormat, twoDigits, locale }
  
  return <div>Check console</div>;
}
```

## 📝 Changelog

### **v3.0.0** - Octubre 2025
- ✅ Agregado `AppProviderLanguageResolver` para detección automática de providers
- ✅ Integración con `ConfigProvider` para merge de configuración externa
- ✅ Soporte para override de `LANGUAGE_CONFIG` desde aplicación externa
- ✅ Nueva prioridad: LibI18n > App > Config > Fallback
- ✅ Mejora en dates.util.ts usando `useAppProviderLanguageResolver`

### **v2.0.0**
- ✅ Soporte para múltiples providers con sistema de fallback automático

### **v1.0.0**
- ✅ Versión inicial con soporte básico de formateo

---

**Version: 3.0.0** | **Última actualización: Octubre 2025**
