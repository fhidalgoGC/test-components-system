# Comando: new-app

Crea la estructura base de carpetas para una nueva aplicación.

## 📥 Acceso Directo

**Ver desde GitHub:**  
[📄 new-app/README.md](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/commands/create-structure/new-app/README.md)

**Documentación principal del CLI:**  
[📄 README.md (CLI)](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/commands/create-structure/README.md)

---

## Uso

```bash
npx gc-ui-setup new-app
npx gc-ui-setup new-app --path=src
npx gc-ui-setup new-app --force
```

## Flags

| Flag | Descripción |
|------|-------------|
| `--path=<ruta>` | Ruta donde crear la estructura (default: `client/src`) |
| `--force`, `-f` | Sobrescribe carpetas existentes |
| `--help`, `-h` | Muestra ayuda |

## Carpetas Creadas

| Carpeta | Alias |
|---------|-------|
| assets | @/assets |
| components | @/components |
| constants | @/constants |
| contexts | @/contexts |
| features | @/features |
| hooks | @/hooks |
| i18n | @/I18n |
| interceptors | @/interceptors |
| layouts | @/layouts |
| libs | @/libs |
| pages | @/pages |
| routes | @/routes |
| services | @/services |
| types | @/types |
| utils | @/utils |

## Archivos Creados

| Archivo | Descripción |
|---------|-------------|
| `App.tsx` | Componente principal de la aplicación |
| `pages/home.tsx` | Página principal |
| `pages/not-found.tsx` | Página 404 |
| `libs/utils.ts` | Utilidad `cn()` para clases CSS |
| `libs/queryClient.ts` | Cliente TanStack Query con fetch config |
| `hooks/use-toast.ts` | Hook para notificaciones toast |
| `components/ui/toast.tsx` | Componente Toast |
| `components/ui/toaster.tsx` | Componente Toaster |
| `components/ui/tooltip.tsx` | Componente Tooltip |
| `routes/index.tsx` | Router principal con rutas base |
| `routes/feature-routes.ts` | Configuración de rutas por feature |
| `i18n/en.json` | Traducciones en inglés |
| `i18n/es.json` | Traducciones en español |

## Estructura de Salida

```
src/
├── App.tsx
├── assets/
├── components/
│   ├── shared/
│   └── ui/
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── constants/
├── contexts/
├── features/
├── hooks/
│   └── use-toast.ts
├── i18n/
│   ├── en.json
│   └── es.json
├── interceptors/
├── layouts/
├── libs/
│   ├── queryClient.ts
│   └── utils.ts
├── pages/
│   ├── home.tsx
│   └── not-found.tsx
├── routes/
│   ├── feature-routes.ts
│   └── index.tsx
├── services/
├── types/
└── utils/
```
