# Uso en Microfrontends

Esta guía explica cómo usar `gc-ui-components` en arquitecturas de microfrontends con diferentes bundlers (Webpack, Rollup, etc.).

## ⚠️ Importante: Sin variables de entorno

Esta biblioteca **NO** utiliza variables de entorno (`import.meta.env.*` o `process.env.*`) en el código compilado. Todas las configuraciones se manejan mediante el `ConfigProvider` en tiempo de ejecución.

## ✅ Por qué es compatible con microfrontends

1. **Sin dependencias de variables de entorno en tiempo de compilación**
2. **Configuración en tiempo de ejecución** mediante React Context
3. **Compilada con valores por defecto** que funcionan sin configuración
4. **Sobreescribible** mediante ConfigProvider en cualquier momento

## Ejemplo: Microfrontend con Webpack

```tsx
// En tu microfrontend (compilado con Webpack)
import { ConfigProvider, Button } from 'gc-ui-components';
import 'gc-ui-components/styles';

function MicroFrontendApp() {
  return (
    <ConfigProvider 
      config={{
        AVAILABLE_LANGUAGES: ['es', 'en', 'pt'],
        DEFAULT_LANGUAGE: 'es',
        LANGUAGE_CONFIG: {
          pt: {
            locale: 'pt-BR',
            dateFormat: 'dd/MM/yyyy',
            twoDigits: true
          }
        }
      }}
    >
      <YourComponents />
    </ConfigProvider>
  );
}
```

## Ejemplo: Module Federation

```tsx
// Host Application
import { ConfigProvider } from 'gc-ui-components';

function HostApp() {
  const sharedConfig = {
    AVAILABLE_LANGUAGES: ['es', 'en'],
    DEFAULT_LANGUAGE: 'es',
  };

  return (
    <ConfigProvider config={sharedConfig}>
      <RemoteMicroFrontend />
    </ConfigProvider>
  );
}

// Remote Microfrontend
// Ya tiene acceso a la configuración del ConfigProvider del host
function RemoteMicroFrontend() {
  return (
    <div>
      <Button>Botón desde microfrontend remoto</Button>
    </div>
  );
}
```

## Ejemplo: Leer configuración del host

Si tu microfrontend necesita leer variables del proyecto host:

```tsx
// En el proyecto HOST
function HostApp() {
  return (
    <ConfigProvider 
      config={{
        // Leer las variables del host y pasarlas a la biblioteca
        AVAILABLE_LANGUAGES: process.env.REACT_APP_LANGUAGES?.split(',') || ['es', 'en'],
        DEFAULT_LANGUAGE: process.env.REACT_APP_DEFAULT_LANG || 'en',
      }}
    >
      <App />
    </ConfigProvider>
  );
}
```

## Valores por defecto (sin configuración)

Si no pasas ninguna configuración, la biblioteca usa estos valores:

```typescript
AVAILABLE_LANGUAGES: ["es", "en"]
DEFAULT_LANGUAGE: "en"
LANGUAGE_CONFIG: {
  es: { locale: "es", dateFormat: "dd/MM/yyyy", twoDigits: true },
  en: { locale: "en", dateFormat: "MM/dd/yyyy", twoDigits: true }
}
```

## Debugging

Si ves errores como:
```
Cannot read properties of undefined (reading 'VITE_AVAILABLE_LANGUAGES')
```

**Solución**: Actualiza a la última versión de `gc-ui-components` que ya tiene todos los valores hardcodeados.

## Compatibilidad

✅ Webpack 5
✅ Rollup
✅ Vite (como consumidor)
✅ Module Federation
✅ Single SPA
✅ Cualquier bundler moderno

## Notas técnicas

- La biblioteca está compilada con Vite pero es agnóstica al bundler del consumidor
- React y React-DOM son peer dependencies (no incluidas en el bundle)
- Todas las demás dependencias (Radix UI, lucide-react, etc.) están incluidas
- El tamaño del bundle ESM es ~87KB (19KB gzip)
