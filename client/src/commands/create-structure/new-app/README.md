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
| `--path=<ruta>` | Ruta donde crear la estructura (default: `src`) |
| `--force`, `-f` | Sobrescribe carpetas existentes |
| `--help`, `-h` | Muestra ayuda |

## Carpetas Creadas

| Carpeta | Alias |
|---------|-------|
| assets | @/assets |
| components | @/components |
| contexts | @/contexts |
| features | @/features |
| hooks | @/hooks |
| interceptors | @/interceptors |
| layouts | @/layouts |
| lib | @/lib |
| pages | @/pages |
| routes | @/routes |
| services | @/services |
| types | @/types |
| utils | @/utils |

## Archivos Creados

| Archivo | Descripción |
|---------|-------------|
| `pages/home.tsx` | Página principal |
| `pages/not-found.tsx` | Página 404 |
| `lib/utils.ts` | Utilidad `cn()` para clases CSS |
| `lib/queryClient.ts` | Cliente TanStack Query con fetch config |
| `hooks/use-toast.ts` | Hook para notificaciones toast |
| `components/ui/toast.tsx` | Componente Toast |
| `components/ui/toaster.tsx` | Componente Toaster |
| `components/ui/tooltip.tsx` | Componente Tooltip |

## Estructura de Salida

```
src/
├── assets/
├── components/
│   └── ui/
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── tooltip.tsx
├── contexts/
├── features/
├── hooks/
│   └── use-toast.ts
├── interceptors/
├── layouts/
├── lib/
│   ├── queryClient.ts
│   └── utils.ts
├── pages/
│   ├── home.tsx
│   └── not-found.tsx
├── routes/
├── services/
├── types/
└── utils/
```
