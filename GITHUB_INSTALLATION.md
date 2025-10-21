# Instalación desde GitHub

Esta guía explica cómo subir la biblioteca a GitHub y usarla en otros proyectos.

## 📤 Paso 1: Preparar y subir a GitHub

### 1.1 Asegúrate de tener los archivos compilados
```bash
npm run build:lib
```

### 1.2 Hacer commit de los cambios (incluyendo dist/)
```bash
# Agregar todos los archivos (ahora dist/ NO está ignorado)
git add .

# Hacer commit
git commit -m "Build library version 1.0.0"
```

### 1.3 Crear un tag de versión
```bash
# Crear tag
git tag version.1.0.0

# Subir código y tags
git push origin main
git push origin version.1.0.0
```

**Nota**: El tag `version.1.0.0` es el que usarás en el `package.json` de otros proyectos.

## 📥 Paso 2: Instalar en otro proyecto

En el proyecto donde quieres usar la biblioteca:

### 2.1 Agregar al package.json

Opción A - Editar manualmente:
```json
{
  "dependencies": {
    "GC-UI-COMPONENTS": "github:fhidalgoGC/test-components-system#version.1.0.0"
  }
}
```

Opción B - Instalar directamente:
```bash
npm install github:fhidalgoGC/test-components-system#version.1.0.0
```

### 2.2 Instalar dependencias
```bash
npm install
```

## 🚀 Paso 3: Usar en tu proyecto

### 3.1 Importar componentes
```tsx
import { Button, Card, ConfigProvider } from 'GC-UI-COMPONENTS';
import 'GC-UI-COMPONENTS/dist/style.css';

function App() {
  return (
    <div>
      <Button variant="default">Mi botón</Button>
    </div>
  );
}
```

### 3.2 Configurar (opcional)
```tsx
import { ConfigProvider } from 'GC-UI-COMPONENTS';
import 'GC-UI-COMPONENTS/dist/style.css';

function App() {
  return (
    <ConfigProvider 
      config={{
        AVAILABLE_LANGUAGES: ['es', 'en'],
        DEFAULT_LANGUAGE: 'es',
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

## 🔄 Actualizar a una nueva versión

Cuando hagas cambios en la biblioteca:

### 1. Recompilar
```bash
npm run build:lib
```

### 2. Commit y nuevo tag
```bash
git add .
git commit -m "Update to version 1.0.1"
git tag version.1.0.1
git push origin main
git push origin version.1.0.1
```

### 3. Actualizar en el proyecto consumidor
```bash
# Cambiar en package.json:
"GC-UI-COMPONENTS": "github:fhidalgoGC/test-components-system#version.1.0.1"

# Reinstalar
npm install
```

O forzar actualización:
```bash
npm install github:fhidalgoGC/test-components-system#version.1.0.1 --force
```

## 📝 Notas importantes

### ✅ Ventajas de esta configuración
- ✅ Sin variables de entorno problemáticas
- ✅ Compatible con Webpack, Rollup, Vite
- ✅ Funciona en microfrontends
- ✅ Valores por defecto incluidos

### ⚠️ Importante
- La carpeta `dist/` **debe** estar en el repositorio de GitHub
- Cada cambio requiere un nuevo tag de versión
- El nombre del paquete es `GC-UI-COMPONENTS` (con guiones)

### 🔍 Debugging

Si tienes problemas instalando:

```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar
rm -rf node_modules package-lock.json
npm install
```

## 📦 Estructura de archivos que se instalarán

Cuando instalas desde GitHub, npm descarga:
```
node_modules/GC-UI-COMPONENTS/
├── dist/
│   ├── gc-ui-components.es.js      # Módulo ESM
│   ├── gc-ui-components.cjs.js     # CommonJS
│   ├── style.css                   # Estilos
│   └── types/                      # TypeScript declarations
├── package.json
├── README.md
└── LICENSE
```

## 🎯 Ejemplo completo

```tsx
// En tu proyecto React/Next.js/Microfrontend
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  ConfigProvider 
} from 'GC-UI-COMPONENTS';
import 'GC-UI-COMPONENTS/dist/style.css';

export default function MyApp() {
  return (
    <ConfigProvider config={{
      AVAILABLE_LANGUAGES: ['es', 'en'],
      DEFAULT_LANGUAGE: 'es',
    }}>
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>¡Funciona!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>La biblioteca está instalada desde GitHub</p>
            <Button>Click aquí</Button>
          </CardContent>
        </Card>
      </div>
    </ConfigProvider>
  );
}
```
