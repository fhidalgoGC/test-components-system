# 🎨 TagSelector - Sistema de Estilos y Theming

Este documento cubre completamente el sistema de estilos, theming y personalización visual del TagSelector.

## 📋 Tabla de Contenidos

1. [Interfaces de Estilos](#interfaces-de-estilos)
2. [Sistema de Colores](#sistema-de-colores)
3. [Sistema de Tamaños](#sistema-de-tamaños)
4. [Theming Avanzado](#theming-avanzado)
5. [Colores Individuales por Tag](#colores-individuales-por-tag)
6. [CSS Custom Properties](#css-custom-properties)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Integración Reactiva](#integración-reactiva)

## 🔗 Interfaces de Estilos

### **TagCustomColors (Sistema Global)**

```typescript
interface TagCustomColors {
  light?: TagThemeColors;
  dark?: TagThemeColors;
}

interface TagThemeColors {
  selected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  all?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
}
```

### **TagMetadata (Personalización Individual)**

```typescript
interface TagMetadata {
  colors?: {
    light?: TagStateColors;
    dark?: TagStateColors;
  };
  sizing?: TagSizing; // Custom pixel-based sizing
}

interface TagStateColors {
  selected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
  unselected?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverBorder?: string;
  };
}

interface TagSizing {
  paddingX?: string;    // e.g., '12px', '1rem'
  paddingY?: string;    // e.g., '8px', '0.5rem'
  fontSize?: string;    // e.g., '14px', '0.875rem'
  minWidth?: string;    // e.g., '80px', '5rem'
  height?: string;      // e.g., '32px', '2rem'
}
```

### **TagSelectorSize (Sistema Granular)**

```typescript
type TagSelectorSize = 'sm' | 'md' | 'lg' | 'tam-1' | 'tam-2' | 'tam-3' | 'tam-4' | 'tam-5' | 'tam-6' | 'tam-7' | 'tam-8' | 'tam-9' | 'tam-10' | 'tam-11' | 'tam-12';
```

## 🎨 Sistema de Colores

### **1. Usando Temas CSS Predefinidos**

```css
/* En tu CSS global */
.theme-corporate {
  --tag-light-selected-bg: #2563eb;
  --tag-light-selected-hover-bg: #1d4ed8;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #f1f5f9;
  --tag-light-unselected-text: #475569;
}

.theme-nature {
  --tag-light-selected-bg: #16a34a;
  --tag-light-selected-hover-bg: #15803d;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #f0fdf4;
}

.theme-sunset {
  --tag-light-selected-bg: #ea580c;
  --tag-light-selected-hover-bg: #dc2626;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #fff7ed;
}
```

```typescript
// Aplicando temas predefinidos
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-corporate" // Aplica tema corporativo
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-nature" // Aplica tema naturaleza
/>
```

### **2. Control Granular de Colores**

**IMPORTANTE**: Control completo sobre colores para cada estado de tag con colores de relleno y borde.

```typescript
const granularBrandColors = {
  light: {
    selected: {
      background: '#6366f1',        // Color de relleno cuando seleccionada
      text: '#ffffff',              // Color de texto cuando seleccionada  
      border: '#4338ca',            // Color de borde cuando seleccionada
      hoverBackground: '#4f46e5',   // Color de relleno cuando seleccionada + hover
      hoverBorder: '#3730a3'        // Color de borde cuando seleccionada + hover
    },
    unselected: {
      background: '#f8fafc',        // Color de relleno cuando no seleccionada
      text: '#334155',              // Color de texto cuando no seleccionada
      border: '#e2e8f0',            // Color de borde cuando no seleccionada  
      hoverBackground: '#e2e8f0',   // Color de relleno cuando no seleccionada + hover
      hoverBorder: '#cbd5e1'        // Color de borde cuando no seleccionada + hover
    },
    all: {
      background: '#ef4444',        // Color de relleno para botón "All"
      text: '#ffffff',              // Color de texto para botón "All"
      border: '#dc2626',            // Color de borde para botón "All"
      hoverBackground: '#dc2626',   // Color de relleno para botón "All" + hover
      hoverBorder: '#b91c1c'        // Color de borde para botón "All" + hover
    }
  },
  dark: {
    selected: {
      background: '#8b5cf6',        // Color de relleno cuando seleccionada (tema oscuro)
      text: '#ffffff',              // Color de texto cuando seleccionada (tema oscuro)
      border: '#7c3aed',            // Color de borde cuando seleccionada (tema oscuro)
      hoverBackground: '#7c3aed',   // Color de relleno cuando seleccionada + hover (tema oscuro)
      hoverBorder: '#6d28d9'        // Color de borde cuando seleccionada + hover (tema oscuro)
    },
    unselected: {
      background: '#374151',        // Color de relleno cuando no seleccionada (tema oscuro)
      text: '#d1d5db',              // Color de texto cuando no seleccionada (tema oscuro)
      border: '#4b5563',            // Color de borde cuando no seleccionada (tema oscuro)
      hoverBackground: '#4b5563',   // Color de relleno cuando no seleccionada + hover (tema oscuro)
      hoverBorder: '#6b7280'        // Color de borde cuando no seleccionada + hover (tema oscuro)
    },
    all: {
      background: '#f59e0b',        // Color de relleno para botón "All" (tema oscuro)
      text: '#000000',              // Color de texto para botón "All" (tema oscuro)
      border: '#d97706',            // Color de borde para botón "All" (tema oscuro)
      hoverBackground: '#d97706',   // Color de relleno para botón "All" + hover (tema oscuro)
      hoverBorder: '#b45309'        // Color de borde para botón "All" + hover (tema oscuro)
    }
  }
};

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  customColors={granularBrandColors}
/>
```

## 📏 Sistema de Tamaños

### **1. Control Granular con tam-1 a tam-12**

**NUEVA CARACTERÍSTICA**: Además de los tamaños básicos `sm`, `md`, `lg`, TagSelector ahora soporta 12 tamaños granulares adicionales (`tam-1` a `tam-12`) para control preciso.

```typescript
// Tamaños disponibles con sus dimensiones aproximadas
type TagSelectorSize = 
  | 'sm'     // Pequeño (legacy)
  | 'md'     // Mediano (legacy) 
  | 'lg'     // Grande (legacy)
  | 'tam-1'  // Extra tiny: 18px altura, 0.625rem fuente
  | 'tam-2'  // Tiny: 20px altura, 0.6875rem fuente
  | 'tam-3'  // Very small: 22px altura, 0.75rem fuente
  | 'tam-4'  // Small+: 24px altura, 0.8125rem fuente
  | 'tam-5'  // Small-medium: 26px altura, 0.875rem fuente
  | 'tam-6'  // Medium-: 28px altura, 0.9375rem fuente
  | 'tam-7'  // Medium: 32px altura, 1rem fuente
  | 'tam-8'  // Medium+: 36px altura, 1.0625rem fuente
  | 'tam-9'  // Large-: 40px altura, 1.125rem fuente
  | 'tam-10' // Large: 44px altura, 1.1875rem fuente
  | 'tam-11' // Large+: 48px altura, 1.25rem fuente
  | 'tam-12' // Extra large: 52px altura, 1.3125rem fuente

// Ejemplos de diferentes tamaños
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-1" // Tags muy compactas
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-12" // Tags muy grandes
/>

<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  size="tam-7" // Equivalente a medium
/>
```

### **2. Tamaños Personalizados por Píxeles via Metadata**

**NUEVA CARACTERÍSTICA**: Tags individuales pueden anular el tamaño con valores personalizados en píxeles a través de la propiedad `metadata.sizing`.

```typescript
// Tags con tamaños personalizados por píxeles
const getCustomSizedTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'compact',
      label: {
        en: 'Compact Tag',
        es: 'Etiqueta Compacta',
        default: 'Compact Tag'
      },
      metadata: {
        sizing: {
          paddingX: '8px',      // Padding horizontal personalizado
          paddingY: '4px',      // Padding vertical personalizado
          fontSize: '11px',     // Tamaño de fuente personalizado
          minWidth: '60px',     // Ancho mínimo
          height: '24px'        // Altura fija
        }
      }
    },
    {
      id: 'large-emphasis',
      label: {
        en: 'Important',
        es: 'Importante', 
        default: 'Important'
      },
      metadata: {
        sizing: {
          paddingX: '20px',     // Más padding para énfasis
          paddingY: '12px',
          fontSize: '16px',     // Fuente más grande
          minWidth: '120px',
          height: '48px'        // Mucho más alto
        }
      }
    },
    {
      id: 'minimal',
      label: {
        en: 'Min',
        es: 'Mín',
        default: 'Min'
      },
      metadata: {
        sizing: {
          paddingX: '6px',      // Mínimo padding
          paddingY: '2px',
          fontSize: '10px',     // Fuente muy pequeña
          minWidth: '30px',     // Ancho mínimo
          height: '20px'        // Altura mínima
        }
      }
    }
  ];
};

// Uso con tamaños personalizados por tag
<TagSelector
  getTagsFunction={getCustomSizedTags}
  selectedTags={selected}
  onSelectionChange={setSelection}
  size="md" // Tamaño base para tags sin metadata.sizing
/>
```

## 🎯 Colores Individuales por Tag

### **NUEVA CARACTERÍSTICA**: Cada tag puede tener sus propios colores únicos usando la propiedad `metadata`.

#### **Ejemplo: Tags de Tipos de Contrato con Colores Individuales**

```typescript
// Ejemplo: Tags de tipos de contrato con colores individuales
const getContractTypeTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'todos',
      label: {
        en: 'All',
        es: 'Todos',
        default: 'All'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#8b5cf6',      // Relleno púrpura
              text: '#ffffff',            // Texto blanco
              border: '#7c3aed',          // Borde púrpura
              hoverBackground: '#7c3aed', // Púrpura más oscuro en hover
              hoverBorder: '#6d28d9'      // Borde púrpura aún más oscuro
            },
            unselected: {
              background: '#f3f4f6',      // Gris claro
              text: '#374151',            // Texto oscuro
              border: '#e5e7eb',          // Borde gris
              hoverBackground: '#e5e7eb', // Gris más oscuro en hover
              hoverBorder: '#d1d5db'      // Borde gris más oscuro
            }
          }
        }
      }
    },
    {
      id: 'fijo',
      label: {
        en: 'Fixed',
        es: 'Fijo',
        default: 'Fixed'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#3b82f6',      // Relleno azul
              text: '#ffffff',            // Texto blanco
              border: '#2563eb',          // Borde azul
              hoverBackground: '#2563eb', // Azul más oscuro en hover
              hoverBorder: '#1d4ed8'      // Borde azul aún más oscuro
            },
            unselected: {
              background: '#eff6ff',      // Azul claro
              text: '#1e40af',            // Texto azul oscuro
              border: '#dbeafe',          // Borde azul claro
              hoverBackground: '#dbeafe', // Azul claro más oscuro en hover
              hoverBorder: '#bfdbfe'      // Borde azul más oscuro
            }
          }
        }
      }
    },
    {
      id: 'basis',
      label: {
        en: 'Basis',
        es: 'Basis',
        default: 'Basis'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#ec4899',      // Relleno rosa
              text: '#ffffff',            // Texto blanco
              border: '#db2777',          // Borde rosa
              hoverBackground: '#db2777', // Rosa más oscuro en hover
              hoverBorder: '#be185d'      // Borde rosa aún más oscuro
            },
            unselected: {
              background: '#fdf2f8',      // Rosa claro
              text: '#831843',            // Texto rosa oscuro
              border: '#f9a8d4',          // Borde rosa
              hoverBackground: '#fce7f3', // Rosa claro más oscuro en hover
              hoverBorder: '#f472b6'      // Borde rosa más oscuro
            }
          }
        }
      }
    }
  ];
};

// Uso con colores individuales por tag
<TagSelector
  getTagsFunction={getContractTypeTags}
  selectedTags={selectedTypes}
  onSelectionChange={(tags) => setSelectedTypes(tags.map(t => t.id))}
  allowMultiple={true}
  allowAll={false}
/>
```

#### **Ejemplo del Mundo Real: Materias Primas con Colores Individuales**

Perfecto para interfaces de trading de materias primas donde cada commodity tiene su propio color de marca:

```typescript
const getCommodityTagsWithColors = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'wheat-hrw',
      label: {
        en: 'HRW - Wheat Hard Red Winter',
        es: 'Trigo Rojo Duro de Invierno',
        default: 'HRW - Wheat Hard Red Winter'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#d97706',      // Color dorado del trigo
              text: '#ffffff',
              border: '#b45309',
              hoverBackground: '#b45309',
              hoverBorder: '#92400e'
            },
            unselected: {
              background: '#fef3c7',      // Color trigo claro
              text: '#92400e',
              border: '#f9a8d4',
              hoverBackground: '#fde68a',
              hoverBorder: '#f59e0b'
            }
          }
        }
      }
    },
    {
      id: 'corn-yellow',
      label: {
        en: 'YC - Yellow Corn',
        es: 'Maíz Amarillo',
        default: 'YC - Yellow Corn'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#eab308',      // Amarillo maíz
              text: '#000000',
              border: '#ca8a04',
              hoverBackground: '#ca8a04',
              hoverBorder: '#a16207'
            },
            unselected: {
              background: '#fef9c3',      // Amarillo maíz claro
              text: '#713f12',
              border: '#fde047',
              hoverBackground: '#fef08a',
              hoverBorder: '#eab308'
            }
          }
        }
      }
    },
    {
      id: 'soy-2025',
      label: {
        en: 'Soy 2025',
        es: 'Soja 2025',
        default: 'Soy 2025'
      },
      metadata: {
        colors: {
          light: {
            selected: {
              background: '#16a34a',      // Verde soja
              text: '#ffffff',
              border: '#15803d',
              hoverBackground: '#15803d',
              hoverBorder: '#166534'
            },
            unselected: {
              background: '#f0fdf4',      // Verde soja claro
              text: '#166534',
              border: '#bbf7d0',
              hoverBackground: '#dcfce7',
              hoverBorder: '#86efac'
            }
          }
        }
      }
    }
  ];
};

// Uso
<TagSelector
  getTagsFunction={getCommodityTagsWithColors}
  selectedTags={selectedCommodities}
  onSelectionChange={(tags) => setSelectedCommodities(tags.map(t => t.id))}
  allowMultiple={true}
  allowAll={true}
/>
```

#### **Sistema de Fallback de Colores (Orden de Prioridad)**

**CRÍTICO**: Cuando una tag no tiene colores metadata, el sistema usa esta prioridad:

1. **Colores metadata de tag** (prioridad más alta) - `tag.metadata.colors`
2. **customColors globales** - prop `customColors`
3. **Clases de tema CSS** - clases del prop `theme`
4. **Variables CSS por defecto** (prioridad más baja) - Fallbacks integrados

Ejemplo mezclando tags con y sin metadata:

```typescript
const getMixedTags = async (): Promise<TagItem[]> => {
  return [
    {
      id: 'special',
      label: { en: 'Special', default: 'Special' },
      metadata: {
        colors: {
          light: {
            selected: { background: '#ff6b6b', border: '#ee5a5a' }
          }
        }
      }
    },
    {
      id: 'normal',
      label: { en: 'Normal', default: 'Normal' }
      // Sin metadata - usará customColors globales o temas por defecto
    }
  ];
};

// Colores globales para tags sin metadata
const globalColors = {
  light: {
    selected: { background: '#3b82f6', border: '#2563eb' },
    unselected: { background: '#f8fafc', border: '#e2e8f0' }
  }
};

<TagSelector
  getTagsFunction={getMixedTags}
  selectedTags={selected}
  onSelectionChange={setSelection}
  customColors={globalColors} // Usado para tags sin metadata
/>
```

### **Combinando Clase de Tema + Colores Personalizados**

```typescript
<TagSelector
  getTagsFunction={getTags}
  selectedTags={selectedTags}
  onSelectionChange={handleChange}
  theme="theme-corporate" // Tema base
  customColors={{
    light: {
      selected: {
        background: '#custom-brand-color' // Anular colores específicos
      }
    }
  }}
/>
```

## 🔧 CSS Custom Properties

### **Para Usuarios Avanzados**: Control directo de variables CSS para máxima flexibilidad de personalización.

#### **Variables CSS Disponibles**

Todas las variables CSS siguen el patrón: `--tag-{theme}-{state}-{property}`

#### **Variables de Tema Claro**

```css
/* Estado seleccionado */
--tag-light-selected-bg: #16a34a;           /* Color de relleno cuando seleccionada */
--tag-light-selected-text: #ffffff;         /* Color de texto cuando seleccionada */
--tag-light-selected-border: #16a34a;       /* Color de borde cuando seleccionada */
--tag-light-selected-hover-bg: #15803d;     /* Color de relleno cuando seleccionada + hover */
--tag-light-selected-hover-border: #15803d; /* Color de borde cuando seleccionada + hover */

/* Estado no seleccionado */
--tag-light-unselected-bg: #f1f5f9;         /* Color de relleno cuando no seleccionada */
--tag-light-unselected-text: #475569;       /* Color de texto cuando no seleccionada */
--tag-light-unselected-border: #e2e8f0;     /* Color de borde cuando no seleccionada */
--tag-light-unselected-hover-bg: #e2e8f0;   /* Color de relleno cuando no seleccionada + hover */
--tag-light-unselected-hover-border: #cbd5e1; /* Color de borde cuando no seleccionada + hover */

/* Estado botón "All" */
--tag-light-all-bg: #3b82f6;                /* Color de relleno para botón "All" */
--tag-light-all-text: #ffffff;              /* Color de texto para botón "All" */
--tag-light-all-border: #3b82f6;            /* Color de borde para botón "All" */
--tag-light-all-hover-bg: #2563eb;          /* Color de relleno para botón "All" + hover */
--tag-light-all-hover-border: #2563eb;      /* Color de borde para botón "All" + hover */
```

#### **Variables de Tema Oscuro**

```css
/* Estado seleccionado */
--tag-dark-selected-bg: #22c55e;            /* Color de relleno cuando seleccionada (oscuro) */
--tag-dark-selected-text: #000000;          /* Color de texto cuando seleccionada (oscuro) */
--tag-dark-selected-border: #22c55e;        /* Color de borde cuando seleccionada (oscuro) */
--tag-dark-selected-hover-bg: #16a34a;      /* Color de relleno cuando seleccionada + hover (oscuro) */
--tag-dark-selected-hover-border: #16a34a;  /* Color de borde cuando seleccionada + hover (oscuro) */

/* Estado no seleccionado */
--tag-dark-unselected-bg: #374151;          /* Color de relleno cuando no seleccionada (oscuro) */
--tag-dark-unselected-text: #d1d5db;        /* Color de texto cuando no seleccionada (oscuro) */
--tag-dark-unselected-border: #4b5563;      /* Color de borde cuando no seleccionada (oscuro) */
--tag-dark-unselected-hover-bg: #4b5563;    /* Color de relleno cuando no seleccionada + hover (oscuro) */
--tag-dark-unselected-hover-border: #6b7280; /* Color de borde cuando no seleccionada + hover (oscuro) */

/* Estado botón "All" */
--tag-dark-all-bg: #60a5fa;                 /* Color de relleno para botón "All" (oscuro) */
--tag-dark-all-text: #000000;               /* Color de texto para botón "All" (oscuro) */
--tag-dark-all-border: #60a5fa;             /* Color de borde para botón "All" (oscuro) */
--tag-dark-all-hover-bg: #3b82f6;           /* Color de relleno para botón "All" + hover (oscuro) */
--tag-dark-all-hover-border: #3b82f6;       /* Color de borde para botón "All" + hover (oscuro) */
```

### **Uso Directo de CSS**

Puedes anular estas variables directamente en tu CSS:

```css
.commodity-selector {
  /* Tema personalizado para commodities */
  --tag-light-selected-bg: #10b981;
  --tag-light-selected-border: #059669;
  --tag-light-selected-hover-bg: #059669;
  --tag-light-selected-hover-border: #047857;
  
  --tag-light-unselected-bg: #f9fafb;
  --tag-light-unselected-border: #e5e7eb;
  --tag-light-unselected-hover-bg: #f3f4f6;
  --tag-light-unselected-hover-border: #d1d5db;
}

.financial-selector {
  /* Tema personalizado financiero */
  --tag-light-selected-bg: #1d4ed8;
  --tag-light-selected-border: #1e40af;
  --tag-light-unselected-bg: #eff6ff;
  --tag-light-unselected-border: #dbeafe;
}
```

### **Actualizaciones de Variables CSS en Runtime**

Para cambios dinámicos de color (ej., preferencias de usuario):

```typescript
function updateTagColors(element: HTMLElement, colors: any) {
  // Actualizar variables CSS en runtime
  if (colors.selected?.background) {
    element.style.setProperty('--tag-light-selected-bg', colors.selected.background);
  }
  if (colors.selected?.border) {
    element.style.setProperty('--tag-light-selected-border', colors.selected.border);
  }
  if (colors.unselected?.background) {
    element.style.setProperty('--tag-light-unselected-bg', colors.unselected.background);
  }
  // ... continuar para todas las variables necesarias
}

// Uso
const tagSelectorElement = document.querySelector('.tag-selector-container');
updateTagColors(tagSelectorElement, {
  selected: { background: '#custom-color', border: '#custom-border' },
  unselected: { background: '#another-color', border: '#another-border' }
});
```

## 🔄 Integración Reactiva de Temas

**IMPORTANTE**: El componente TagSelector está diseñado para funcionar reactivamente con sistemas globales de gestión de estado. Esto significa que se actualiza automáticamente cuando el tema de tu app cambia globalmente.

### **1. Integración con next-themes (Más Común)**

```typescript
import { useTheme } from 'next-themes';

function ResponsiveTagSelector() {
  const { theme, resolvedTheme } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // El componente reacciona automáticamente a cambios de tema global
  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  
  return (
    <TagSelector
      getTagsFunction={getTags}
      selectedTags={selectedTags}
      onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
      // El tema cambia automáticamente cuando el usuario alterna el tema de la app
      theme={currentTheme === 'dark' ? 'theme-dark-corporate' : 'theme-corporate'}
    />
  );
}
```

### **2. Con Contexto de Tema Personalizado**

```typescript
import { useThemeContext } from '@/contexts/ThemeContext';

function ThemedTagSelector() {
  const { currentTheme, isDark } = useThemeContext();
  
  return (
    <TagSelector
      getTagsFunction={getTags}
      selectedTags={selectedTags}
      onSelectionChange={handleChange}
      // Se actualiza automáticamente cuando el tema global cambia
      theme={isDark ? 'theme-dark-nature' : 'theme-nature'}
      customColors={isDark ? darkBrandColors : lightBrandColors}
    />
  );
}
```

### **3. Ejemplo de Cambio de Tema Dinámico**

```typescript
function DynamicThemeTagSelector() {
  const { theme, setTheme } = useTheme();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Definir mapeos de temas diferentes
  const themeMapping = {
    light: 'theme-corporate',
    dark: 'theme-dark-corporate',
    auto: theme === 'dark' ? 'theme-dark-nature' : 'theme-nature'
  };
  
  return (
    <div>
      {/* Selector de tema que afecta TagSelector inmediatamente */}
      <div className="theme-controls">
        <button onClick={() => setTheme('light')}>Claro</button>
        <button onClick={() => setTheme('dark')}>Oscuro</button>
        <button onClick={() => setTheme('system')}>Auto</button>
      </div>
      
      <TagSelector
        getTagsFunction={getTags}
        selectedTags={selectedTags}
        onSelectionChange={(tags) => setSelectedTags(tags.map(t => t.id))}
        // El tema se actualiza instantáneamente cuando se hace clic en los botones arriba
        theme={themeMapping[theme as keyof typeof themeMapping]}
      />
    </div>
  );
}
```

### **4. Setup de Providers para Actualizaciones Reactivas**

Para asegurar que tu TagSelector funcione reactivamente, envuelve tu app con los providers necesarios:

```typescript
// App.tsx o _app.tsx
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
```

### **5. Demo Reactivo en Tiempo Real**

Este ejemplo demuestra actualizaciones instantáneas a través de múltiples instancias de TagSelector:

```typescript
function ReactiveDemo() {
  const { theme, setTheme } = useTheme();
  const [selectedTags1, setSelectedTags1] = useState<string[]>([]);
  const [selectedTags2, setSelectedTags2] = useState<string[]>([]);
  
  return (
    <div>
      {/* Controles globales */}
      <div className="global-controls">
        <h3>Controles Globales (afectan todos los TagSelectors)</h3>
        
        <div className="theme-controls">
          <label>Tema:</label>
          <button onClick={() => setTheme('light')}>☀️ Claro</button>
          <button onClick={() => setTheme('dark')}>🌙 Oscuro</button>
        </div>
      </div>
      
      {/* Ambos TagSelectors se actualizan automáticamente */}
      <div className="selectors">
        <h4>Selector de Categorías</h4>
        <TagSelector
          getTagsFunction={getCategoryTags}
          selectedTags={selectedTags1}
          onSelectionChange={(tags) => setSelectedTags1(tags.map(t => t.id))}
          theme={theme === 'dark' ? 'theme-dark-corporate' : 'theme-corporate'}
        />
        
        <h4>Selector de Habilidades</h4>
        <TagSelector
          getTagsFunction={getSkillTags}
          selectedTags={selectedTags2}
          onSelectionChange={(tags) => setSelectedTags2(tags.map(t => t.id))}
          theme={theme === 'dark' ? 'theme-dark-nature' : 'theme-nature'}
        />
      </div>
    </div>
  );
}
```

## 🏆 Mejores Prácticas de Estilos

### **1. Organización de Temas**

```css
/* Organiza temas por contexto de aplicación */
.theme-admin-light { /* Colores para panel de administración */ }
.theme-admin-dark { /* Versión oscura del admin */ }
.theme-client-light { /* Colores para área de cliente */ }
.theme-client-dark { /* Versión oscura del cliente */ }
.theme-public-light { /* Colores para sitio público */ }
.theme-public-dark { /* Versión oscura pública */ }
```

### **2. Consistencia de Colores**

```typescript
// Define paletas de colores consistentes
const brandColors = {
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  secondary: '#e2e8f0',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444'
};

// Usa la paleta consistentemente
const corporateTheme = {
  light: {
    selected: {
      background: brandColors.primary,
      hoverBackground: brandColors.primaryHover
    }
  }
};
```

### **3. Accesibilidad en Colores**

```typescript
// Asegúrate de que los contrastes cumplan con WCAG
const accessibleColors = {
  light: {
    selected: {
      background: '#1d4ed8', // Contraste suficiente con texto blanco
      text: '#ffffff'        // WCAG AA compliant
    },
    unselected: {
      background: '#f8fafc', // Contraste suficiente con texto oscuro
      text: '#1e293b'        // WCAG AA compliant
    }
  }
};
```

### **4. Rendimiento de Estilos**

```typescript
// Memoiza objetos de colores para evitar re-renders innecesarios
const memoizedColors = useMemo(() => ({
  light: {
    selected: { background: computedPrimaryColor }
  }
}), [computedPrimaryColor]);

<TagSelector
  customColors={memoizedColors}
  // ... otras props
/>
```

---

## 📞 Soporte

Para más información sobre estilos y theming, consulta:

1. **Archivos CSS**: `client/src/lib/ui-library/TagSelector/css/`
2. **Tipos de estilos**: `client/src/lib/ui-library/types/`
3. **Ejemplos**: `client/src/pages/tag-selector-demo/`

---

**Fecha de actualización**: Septiembre 2025  
**Versión del TagSelector**: v1.2.0