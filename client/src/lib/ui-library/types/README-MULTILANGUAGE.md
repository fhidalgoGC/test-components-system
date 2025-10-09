# MultiLanguageLabel System

Sistema de tipos y utilidades para manejar etiquetas con múltiples idiomas en la biblioteca de UI.

## 📦 Tipos Disponibles

### `MultiLanguageLabel`

Objeto con traducciones para múltiples idiomas. **Requiere** un fallback `default`.

```typescript
interface MultiLanguageLabel {
  [languageCode: string]: string;
  default: string; // Required fallback
}
```

**Ejemplo:**
```typescript
const label: MultiLanguageLabel = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
  de: "Hallo",
  default: "Hello" // ⚠️ Obligatorio
};
```

### `LabelOrMultiLanguage`

Tipo flexible que acepta string simple o MultiLanguageLabel.

```typescript
type LabelOrMultiLanguage = string | MultiLanguageLabel;
```

**Uso:**
```typescript
// Ambos son válidos
const simpleLabel: LabelOrMultiLanguage = "Hello";
const multiLabel: LabelOrMultiLanguage = { en: "Hello", es: "Hola", default: "Hello" };
```

### `ItemWithMultiLanguageLabel<T>`

Item genérico con etiqueta multiidioma, metadata opcional y **propiedades adicionales extensibles**.

```typescript
interface ItemWithMultiLanguageLabel<T = any> {
  id: string;
  label: MultiLanguageLabel;
  metadata?: T;
  [key: string]: any; // ✨ Permite propiedades adicionales
}
```

**Ejemplo básico:**
```typescript
const item: ItemWithMultiLanguageLabel = {
  id: "1",
  label: {
    en: "Important",
    es: "Importante",
    default: "Important"
  },
  metadata: { color: "red" },
  icon: "star",        // ✅ Propiedad adicional permitida
  isActive: true       // ✅ Propiedad adicional permitida
};
```

**Ejemplo con extensión de interfaz:**
```typescript
interface CustomTag extends ItemWithMultiLanguageLabel {
  icon: string;
  isActive: boolean;
  priority: number;
}

const tag: CustomTag = {
  id: "1",
  label: {
    en: "Important",
    es: "Importante",
    default: "Important"
  },
  metadata: { color: "red" },
  icon: "star",
  isActive: true,
  priority: 5
};
```

**Ejemplo con metadata tipada:**
```typescript
interface TagMetadata {
  color: string;
  backgroundColor?: string;
}

const tagWithTypedMetadata: ItemWithMultiLanguageLabel<TagMetadata> = {
  id: "1",
  label: {
    en: "Important",
    es: "Importante",
    default: "Important"
  },
  metadata: {
    color: "red",
    backgroundColor: "white"
  },
  icon: "star"  // ✅ Todavía puedes agregar propiedades adicionales
};
```

### `ResolveLabelFn`

Tipo de función para resolver etiquetas.

```typescript
type ResolveLabelFn = (
  label: LabelOrMultiLanguage,
  lang?: string
) => string;
```

## 🛠️ Funciones de Utilidad

### `resolveMultiLanguageLabel()`

Resuelve una etiqueta multiidioma a un string en el idioma actual.

```typescript
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

const label = {
  en: "Hello",
  es: "Hola",
  fr: "Bonjour",
  default: "Hello"
};

resolveMultiLanguageLabel(label, "es"); // "Hola"
resolveMultiLanguageLabel(label, "fr"); // "Bonjour"
resolveMultiLanguageLabel(label, "de"); // "Hello" (fallback a default)
resolveMultiLanguageLabel("Simple", "es"); // "Simple" (devuelve string tal cual)
```

**Lógica de resolución:**
1. Busca coincidencia exacta (`es`)
2. Busca por prefijo de idioma (`en` para `en-US`)
3. Busca cualquier clave que empiece con el prefijo
4. Fallback a `default`

### `createSimpleLabel()`

Crea un MultiLanguageLabel simple desde un string.

```typescript
import { createSimpleLabel } from '@/lib/ui-library/utils';

const label = createSimpleLabel("Hello");
// Resultado: { default: "Hello" }
```

### `createMultiLanguageLabel()`

Crea un MultiLanguageLabel desde un objeto de traducciones.

```typescript
import { createMultiLanguageLabel } from '@/lib/ui-library/utils';

const label = createMultiLanguageLabel({
  en: "Hello",
  es: "Hola",
  fr: "Bonjour"
});
// Resultado: { en: "Hello", es: "Hola", fr: "Bonjour", default: "Hello" }

// Con idioma default personalizado
const labelEs = createMultiLanguageLabel({
  en: "Hello",
  es: "Hola"
}, "es");
// Resultado: { en: "Hello", es: "Hola", default: "Hola" }
```

### `isMultiLanguageLabel()`

Verifica si un valor es MultiLanguageLabel.

```typescript
import { isMultiLanguageLabel } from '@/lib/ui-library/utils';

isMultiLanguageLabel({ en: "Hello", default: "Hello" }); // true
isMultiLanguageLabel("Hello"); // false
isMultiLanguageLabel(null); // false
```

## 📝 Ejemplos de Uso

### Selector de Etiquetas con i18n

```typescript
import type { ItemWithMultiLanguageLabel } from '@/lib/ui-library/types';
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

interface Tag extends ItemWithMultiLanguageLabel {
  // metadata específico
}

const tags: Tag[] = [
  {
    id: "1",
    label: {
      en: "Important",
      es: "Importante",
      fr: "Important",
      default: "Important"
    }
  },
  {
    id: "2",
    label: {
      en: "Urgent",
      es: "Urgente",
      fr: "Urgent",
      default: "Urgent"
    }
  }
];

// Componente
function TagList({ currentLang }: { currentLang: string }) {
  return (
    <ul>
      {tags.map(tag => (
        <li key={tag.id}>
          {resolveMultiLanguageLabel(tag.label, currentLang)}
        </li>
      ))}
    </ul>
  );
}
```

### Opciones de Select con i18n

```typescript
import type { MultiLanguageLabel } from '@/lib/ui-library/types';
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

interface SelectOption {
  value: string;
  label: MultiLanguageLabel;
}

const options: SelectOption[] = [
  {
    value: "option1",
    label: {
      en: "Option One",
      es: "Opción Uno",
      default: "Option One"
    }
  },
  {
    value: "option2",
    label: {
      en: "Option Two",
      es: "Opción Dos",
      default: "Option Two"
    }
  }
];

function MySelect({ lang }: { lang: string }) {
  return (
    <select>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {resolveMultiLanguageLabel(opt.label, lang)}
        </option>
      ))}
    </select>
  );
}
```

### Menú de Navegación con i18n

```typescript
import type { ItemWithMultiLanguageLabel } from '@/lib/ui-library/types';
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

interface MenuItem extends ItemWithMultiLanguageLabel<{ path: string }> {}

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: {
      en: "Home",
      es: "Inicio",
      fr: "Accueil",
      default: "Home"
    },
    metadata: { path: "/" }
  },
  {
    id: "about",
    label: {
      en: "About",
      es: "Acerca de",
      fr: "À propos",
      default: "About"
    },
    metadata: { path: "/about" }
  }
];

function Navigation({ currentLang }: { currentLang: string }) {
  return (
    <nav>
      {menuItems.map(item => (
        <a key={item.id} href={item.metadata?.path}>
          {resolveMultiLanguageLabel(item.label, currentLang)}
        </a>
      ))}
    </nav>
  );
}
```

### Con Hook Personalizado

```typescript
import { useMemo } from 'react';
import { useLibI18n } from '@/lib/ui-library/providers/AppLanguageLibUiProvider/index.hook';
import type { LabelOrMultiLanguage } from '@/lib/ui-library/types';
import { resolveMultiLanguageLabel } from '@/lib/ui-library/utils';

function useResolveLabel() {
  const { lang } = useLibI18n();
  
  return useMemo(() => {
    return (label: LabelOrMultiLanguage) => 
      resolveMultiLanguageLabel(label, lang);
  }, [lang]);
}

// Uso
function MyComponent() {
  const resolve = useResolveLabel();
  
  const label = {
    en: "Hello",
    es: "Hola",
    default: "Hello"
  };
  
  return <div>{resolve(label)}</div>;
}
```

## 🎯 Casos de Uso Comunes

### 1. **Items con traducciones**
```typescript
const items: ItemWithMultiLanguageLabel[] = [
  { id: "1", label: { en: "Item 1", es: "Elemento 1", default: "Item 1" } },
  { id: "2", label: { en: "Item 2", es: "Elemento 2", default: "Item 2" } }
];
```

### 2. **Botones con texto traducido**
```typescript
const buttonLabel: MultiLanguageLabel = {
  en: "Submit",
  es: "Enviar",
  fr: "Soumettre",
  default: "Submit"
};

<button>{resolveMultiLanguageLabel(buttonLabel, currentLang)}</button>
```

### 3. **Mensajes de error/éxito**
```typescript
const messages = {
  success: {
    en: "Operation successful",
    es: "Operación exitosa",
    default: "Operation successful"
  },
  error: {
    en: "An error occurred",
    es: "Ocurrió un error",
    default: "An error occurred"
  }
};
```

### 4. **Tooltips y ayuda**
```typescript
interface HelpText {
  id: string;
  tooltip: MultiLanguageLabel;
}

const help: HelpText = {
  id: "username-help",
  tooltip: {
    en: "Enter your username",
    es: "Ingrese su nombre de usuario",
    default: "Enter your username"
  }
};
```

## ✅ Mejores Prácticas

1. **Siempre incluir `default`**: Es obligatorio y previene errores
   ```typescript
   // ✅ Correcto
   { en: "Hello", es: "Hola", default: "Hello" }
   
   // ❌ Incorrecto (falta default)
   { en: "Hello", es: "Hola" }
   ```

2. **Usar códigos de idioma ISO 639-1**: `en`, `es`, `fr`, `de`, etc.
   ```typescript
   // ✅ Correcto
   { en: "Hello", es: "Hola", default: "Hello" }
   
   // ❌ Evitar
   { english: "Hello", spanish: "Hola", default: "Hello" }
   ```

3. **Usar `LabelOrMultiLanguage` para flexibilidad**:
   ```typescript
   interface Props {
     label: LabelOrMultiLanguage; // Acepta string o MultiLanguageLabel
   }
   ```

4. **Crear labels con helpers**:
   ```typescript
   // En lugar de
   const label = { default: "Hello" };
   
   // Usar
   const label = createSimpleLabel("Hello");
   ```

5. **Validar con type guard**:
   ```typescript
   if (isMultiLanguageLabel(value)) {
     // Tratar como MultiLanguageLabel
     const text = resolveMultiLanguageLabel(value, lang);
   } else {
     // Tratar como string
     const text = value;
   }
   ```

## 🔗 Importaciones

```typescript
// Tipos
import type {
  MultiLanguageLabel,
  LabelOrMultiLanguage,
  ItemWithMultiLanguageLabel,
  ResolveLabelFn
} from '@/lib/ui-library/types';

// Utilidades
import {
  resolveMultiLanguageLabel,
  createSimpleLabel,
  createMultiLanguageLabel,
  isMultiLanguageLabel
} from '@/lib/ui-library/utils';
```

## 📚 Referencias

- **Tipos**: `client/src/lib/ui-library/types/language.types.ts`
- **Utilidades**: `client/src/lib/ui-library/utils/i18n.util.ts`
- **Componente de ejemplo**: `client/src/lib/ui-library/components/TagSelector`
