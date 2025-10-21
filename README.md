# GC-UI-Components

Biblioteca de componentes UI para React con TypeScript, Tailwind CSS y shadcn/ui.

## Características

- 🎨 Componentes UI modernos basados en shadcn/ui y Radix UI
- 🌍 Soporte de internacionalización (i18n) con inglés y español
- 🎭 Sistema de temas con modo claro/oscuro
- 📱 Diseño responsive
- 🔧 TypeScript para seguridad de tipos
- 🎯 Tree-shakeable para optimización de bundle

## Instalación

### Desde NPM (cuando se publique)

```bash
npm install gc-ui-components
```

### Instalación local para desarrollo

```bash
# En el directorio de esta biblioteca
npm run build:lib

# En tu proyecto
npm install /ruta/a/gc-ui-components
```

### Usando npm link

```bash
# En el directorio de esta biblioteca
npm link

# En tu proyecto
npm link gc-ui-components
```

## Uso

### Importar componentes

```tsx
import { Button, Card, TagSelector } from 'gc-ui-components';
import 'gc-ui-components/styles'; // Importar estilos

function App() {
  return (
    <div>
      <Button variant="default">Click me</Button>
      <Card>
        <CardHeader>
          <CardTitle>Mi Card</CardTitle>
        </CardHeader>
        <CardContent>
          Contenido de la tarjeta
        </CardContent>
      </Card>
    </div>
  );
}
```

### Usar providers y configuración

```tsx
import { 
  ConfigProvider, 
  AppLanguageLibUiProvider, 
  AppThemeProvider 
} from 'gc-ui-components';
import 'gc-ui-components/styles';

function App() {
  return (
    <ConfigProvider config={{ 
      // Opcional: sobreescribir idiomas disponibles
      AVAILABLE_LANGUAGES: ['es', 'en', 'fr'],
      DEFAULT_LANGUAGE: 'es',
      
      // Opcional: configurar formatos por idioma
      LANGUAGE_CONFIG: {
        fr: {
          locale: 'fr',
          dateFormat: 'dd/MM/yyyy',
          twoDigits: true
        }
      },
      
      // Opcional: configurar formato de números
      NUMBER_FORMAT_CONFIG: {
        NUMBER_FORMAT_PATTERN: '0.000,00',
        NUMBER_LOCATE: 'es-ES',
      }
    }}>
      <AppLanguageLibUiProvider initialLanguage="es">
        <AppThemeProvider>
          <YourApp />
        </AppThemeProvider>
      </AppLanguageLibUiProvider>
    </ConfigProvider>
  );
}
```

**Nota importante**: La biblioteca NO usa variables de entorno (como `import.meta.env.*`) para ser compatible con microfrontends y diferentes bundlers (Webpack, Rollup, etc.). Toda la configuración se hace mediante el `ConfigProvider` en tiempo de ejecución.

## Configuraciones por defecto

La biblioteca viene con estos valores hardcodeados que funcionan sin ninguna configuración:

```typescript
{
  AVAILABLE_LANGUAGES: ["es", "en"],
  DEFAULT_LANGUAGE: "en",
  LANGUAGE_CONFIG: {
    es: {
      locale: "es",
      dateFormat: "dd/MM/yyyy",
      twoDigits: true
    },
    en: {
      locale: "en",
      dateFormat: "MM/dd/yyyy",
      twoDigits: true
    }
  },
  NUMBER_FORMAT_CONFIG: {
    NUMBER_FORMAT_PATTERN: "0,000.00",
    NUMBER_ROUND_MODE: "truncate",
    NUMBER_LOCATE: "en-US",
    NUMBER_MIN_DECIMALS: 2,
    NUMBER_MAX_DECIMALS: 4
  },
  SESSION_CONFIG: {
    SESSION_DURATION: 28800000, // 8 horas
    VALIDATION_INTERVAL: 60000   // 1 minuto
  }
}
```

Puedes sobreescribir cualquiera de estos valores usando el `ConfigProvider`.

## Configuración de Tailwind CSS

Esta biblioteca utiliza Tailwind CSS. Necesitarás configurar Tailwind en tu proyecto:

1. Instala Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configura `tailwind.config.js` para incluir los componentes de la biblioteca:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/gc-ui-components/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Importa los estilos de Tailwind en tu CSS principal:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Desarrollo

### Compilar la biblioteca

```bash
npm run build:lib
```

Esto generará:
- `dist/gc-ui-components.es.js` - Módulo ESM
- `dist/gc-ui-components.cjs.js` - CommonJS
- `dist/types/` - Declaraciones de TypeScript
- `dist/style.css` - Estilos compilados

### Ejecutar el servidor de desarrollo (demo)

```bash
npm run dev
```

## Estructura del proyecto

```
client/src/lib/ui-library/
├── components/        # Componentes UI
├── providers/         # Providers (ConfigProvider, ThemeProvider, etc.)
├── types/            # Definiciones de tipos TypeScript
├── utils/            # Utilidades
├── theme/            # Sistema de temas
├── i18n/             # Sistema de internacionalización
└── index.ts          # Punto de entrada principal
```

## Dependencias Peer

Esta biblioteca requiere las siguientes dependencias peer:
- `react >= 18.0.0`
- `react-dom >= 18.0.0`

Asegúrate de tenerlas instaladas en tu proyecto.

## TypeScript

La biblioteca incluye declaraciones de tipos TypeScript completas. No necesitas instalar `@types/gc-ui-components` - todos los tipos están incluidos automáticamente.

```tsx
import type { ButtonProps, CardProps } from 'gc-ui-components';
```

## Publicación en NPM

Para publicar la biblioteca en NPM:

1. Asegúrate de estar autenticado en NPM:
```bash
npm login
```

2. Actualiza la versión en `package.json` según sea necesario

3. Publica la biblioteca:
```bash
npm publish
```

El script `prepublishOnly` se ejecutará automáticamente y compilará la biblioteca antes de publicar.

## Archivos distribuidos

Cuando se publica, el paquete incluye solo:
- `dist/` - Archivos compilados (JavaScript, CSS, tipos TypeScript)
- `README.md` - Documentación
- `LICENSE` - Licencia del proyecto
- `package.json` - Metadatos del paquete

## Licencia

MIT
