# Comando: new-app

Crea la estructura base de carpetas para una nueva aplicación.

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

- `pages/home.tsx` - Página principal
- `pages/not-found.tsx` - Página 404

## Estructura de Salida

```
src/
├── assets/
├── components/
├── contexts/
├── features/
├── hooks/
├── interceptors/
├── layouts/
├── lib/
├── pages/
│   ├── home.tsx
│   └── not-found.tsx
├── routes/
├── services/
├── types/
└── utils/
```
