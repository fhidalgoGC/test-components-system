# Comando: features

Crea la estructura de carpetas para un feature específico dentro de `features/`.

## Uso

```bash
npx gc-ui-setup features --name=login
npx gc-ui-setup features --name=auth --path=src/features
npx gc-ui-setup features --name=login --force
```

## Flags

| Flag | Descripción |
|------|-------------|
| `--name=<nombre>` | **Requerido**. Nombre del feature a crear |
| `--path=<ruta>` | Ruta base (default: `src/features`) |
| `--force`, `-f` | Borra y recrea el feature completo si existe |
| `--help`, `-h` | Muestra ayuda |

## Subcarpetas Creadas

- assets
- components
- contexts
- hooks
- interceptors
- layouts
- lib
- pages
- routes
- services
- types
- utils

## Alias

Solo se crea un alias para la carpeta padre del feature:

```
@/features/login → src/features/login
```

Las subcarpetas no tienen alias individual.

## Estructura de Salida

```
src/features/login/        → @/features/login
├── assets/
├── components/
├── contexts/
├── hooks/
├── interceptors/
├── layouts/
├── lib/
├── pages/
├── routes/
├── services/
├── types/
└── utils/
```

## Comportamiento de --force

Cuando se usa `--force` y el feature ya existe:
1. Se borra **toda** la carpeta del feature
2. Se recrea completamente con la estructura limpia

Esto es útil cuando quieres reiniciar un feature desde cero.
