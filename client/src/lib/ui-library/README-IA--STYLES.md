# 🎨 GC-UI-COMPONENTS - Sistema Global de Estilos

Este documento cubre las estrategias globales de personalización de estilos que se aplican a todos los componentes de la librería GC-UI-COMPONENTS.

## 📋 Tabla de Contenidos

1. [Estrategias de Personalización](#estrategias-de-personalización)
2. [Orden de Precedencia CSS](#orden-de-precedencia-css)
3. [Configuración Tailwind](#configuración-tailwind)
4. [Estrategias Híbridas](#estrategias-híbridas)
5. [Mejores Prácticas](#mejores-prácticas)
6. [Casos de Uso Comunes](#casos-de-uso-comunes)
7. [Troubleshooting](#troubleshooting)

## 🎯 Estrategias de Personalización

La librería GC-UI-COMPONENTS ofrece **4 estrategias principales** para personalizar estilos:

### **1. 🎨 CSS Variables (Temas Globales)**
Para personalización global y temas consistentes:

```css
/* En tu CSS global */
:root {
  /* Variables para temas light */
  --tag-light-selected-bg: #3b82f6;
  --tag-light-selected-text: #ffffff;
  --tag-light-unselected-bg: #f3f4f6;
  --tag-light-unselected-text: #1f2937;
}

.dark {
  /* Variables para temas dark */
  --tag-dark-selected-bg: #1e40af;
  --tag-dark-selected-text: #dbeafe;
}

/* Temas corporativos personalizados */
.theme-corporate {
  --tag-light-selected-bg: #059669;
  --tag-light-selected-hover-bg: #047857;
}
```

### **2. 🏗️ CSS Modules (Estilos Base)**
Los componentes usan CSS modules con especificidad controlada:

```css
/* Los componentes ya incluyen estilos base */
.TagSelector_chip__abc123 {
  padding: 0.375rem 1rem;
  border-radius: 9999px;
  /* Especificidad media - pueden ser sobrescritos */
}
```

### **3. 🌊 Tailwind Integration (Clases del Padre)**
Clases CSS pasadas desde la aplicación padre:

```jsx
// En tu aplicación
<TagSelector 
  className="my-4 flex flex-wrap gap-2"      // Layout del contenedor
  chipClassName="shadow-sm rounded-md mr-1" // Estilos para chips individuales
/>
```

### **4. 📝 Props-based Styling (Máximo Control)**
Personalización directa via props:

```jsx
<TagSelector 
  customColors={{
    light: {
      selected: { 
        background: '#dbeafe',
        text: '#1e3a8a',
        border: '#3b82f6'
      }
    }
  }}
  // O metadata individual por tag
  metadata={{
    colors: { /* colores específicos */ }
  }}
/>
```

## ⚖️ Orden de Precedencia CSS

**Entender la precedencia es clave** para una personalización exitosa:

### **Jerarquía (de mayor a menor prioridad):**

1. **🥇 Inline Styles (Máxima Prioridad)**
   - Props `customColors`
   - Metadata individual por tag
   - `style={{ backgroundColor: '#blue' }}`

2. **🥈 CSS Modules (Alta Especificidad)**
   - `.ComponentName_class__hash123`
   - Estilos base de los componentes

3. **🥉 Tailwind del Padre (Media Especificidad)**
   - `.bg-blue-500`, `.p-4`, etc.
   - Clases pasadas en `className` y `chipClassName`

4. **🏅 CSS Variables (Baja Especificidad)**
   - `--variable-name: value`
   - Temas y personalización global

### **Ejemplo Práctico:**
```jsx
<TagSelector 
  className="bg-gray-100"           // 🏅 Precedencia baja
  chipClassName="!bg-blue-500"     // 🥉 Media (con !important = alta)
  customColors={{                  // 🥇 Máxima precedencia
    light: { selected: { background: '#red' } }
  }}
/>
// Resultado: El chip será rojo (customColors gana)
```

## 🛠️ Configuración Tailwind

### **⚠️ Requisito Obligatorio para la App Padre:**

```javascript
// tailwind.config.js (en tu aplicación)
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    // ✅ CRÍTICO: Incluir la librería para que Tailwind genere las clases
    "./node_modules/GC-UI-COMPONENTS/**/*.{js,ts,jsx,tsx}"
  ],
  // ... resto de configuración
}
```

### **Sin esta configuración:**
- ❌ Las clases de Tailwind no se generarán
- ❌ `className` y `chipClassName` no tendrán efecto
- ❌ Los estilos del padre no funcionarán

### **Con la configuración correcta:**
- ✅ Todas las clases Tailwind funcionan
- ✅ Hot reload automático de estilos
- ✅ Purge automático de clases no utilizadas

## 🔀 Estrategias Híbridas

### **Opción A: Solo CSS Variables (Simplicidad)**
```jsx
// Configurar temas en CSS global
<TagSelector className="theme-corporate" />
```
**✅ Pros:** Simple, consistente, fácil mantenimiento
**❌ Contras:** Menos flexibilidad individual

### **Opción B: Solo Tailwind (Rapidez)**
```jsx
<TagSelector 
  className="space-x-2 p-4"
  chipClassName="bg-blue-500 text-white rounded-lg"
/>
```
**✅ Pros:** Desarrollo rápido, prototipado ágil
**❌ Contras:** Puede requerir `!important` para colores

### **Opción C: Sistema Híbrido (RECOMENDADO)**
```jsx
<TagSelector 
  className="space-x-2 p-4 bg-gray-50"        // Layout del padre
  chipClassName="shadow-sm rounded-md"        // Estilos base
  customColors={{                             // Colores específicos
    light: {
      selected: { background: '#059669', text: 'white' },
      unselected: { background: '#f0fdf4', text: '#166534' }
    }
  }}
/>
```
**✅ Pros:** Máxima flexibilidad y control
**⚠️ Contras:** Más complejo, requiere entendimiento de precedencia

## 🎯 Mejores Prácticas

### **📐 Para Layout y Espaciado:**
```jsx
// ✅ RECOMENDADO: Usar Tailwind del padre
<TagSelector 
  className="flex flex-wrap gap-3 p-4 my-6"
  chipClassName="shadow-md rounded-lg mx-1"
/>
```

### **🎨 Para Colores y Temas:**
```jsx
// ✅ RECOMENDADO: Usar props para máximo control
<TagSelector 
  customColors={{
    light: { selected: { background: '#custom-color' } }
  }}
/>
```

### **🏢 Para Temas Corporativos:**
```css
/* ✅ RECOMENDADO: CSS Variables globales */
.theme-brand {
  --tag-light-selected-bg: var(--brand-primary);
  --tag-light-selected-text: var(--brand-text);
}
```

### **⚡ Para Prototipos Rápidos:**
```jsx
// ✅ RECOMENDADO: Solo Tailwind
<TagSelector chipClassName="!bg-purple-500 !text-white" />
```

## 📋 Casos de Uso Comunes

### **Caso 1: E-commerce (Filtros de Producto)**
```jsx
<TagSelector 
  className="mb-6 p-4 bg-white rounded-lg shadow-sm"
  chipClassName="border-2 hover:shadow-md transition-all"
  customColors={{
    light: {
      selected: { background: '#059669', border: '#047857' },
      unselected: { background: 'white', border: '#d1d5db' }
    }
  }}
/>
```

### **Caso 2: Dashboard Corporativo**
```jsx
<TagSelector 
  className="theme-corporate space-x-2"
  chipClassName="rounded-md font-medium"
  // Los colores se definen en el tema CSS
/>
```

### **Caso 3: App Móvil (Responsive)**
```jsx
<TagSelector 
  className="flex-col sm:flex-row gap-2 sm:gap-3"
  chipClassName="w-full sm:w-auto text-center sm:text-left"
  size="tam-4"  // Tamaño optimizado para móvil
/>
```

### **Caso 4: Tags por Categoría (Colores Individuales)**
```jsx
// Cada tag tiene sus propios colores via metadata
const getTags = async () => [
  {
    id: 'urgent',
    label: { default: 'Urgent' },
    metadata: {
      colors: {
        light: {
          selected: { background: '#dc2626', text: 'white' }
        }
      }
    }
  },
  // ... más tags con colores únicos
];
```

## 🔧 Troubleshooting

### **Problema: Las clases Tailwind no funcionan**
```bash
# ❌ Error común
./node_modules/GC-UI-COMPONENTS/**/* # Ruta incorrecta

# ✅ Solución
./node_modules/GC-UI-COMPONENTS/**/*.{js,ts,jsx,tsx}
```

### **Problema: Los colores no cambian**
```jsx
// ❌ CSS modules ganan por especificidad
<TagSelector chipClassName="bg-blue-500" />

// ✅ Usar !important o props
<TagSelector chipClassName="!bg-blue-500" />
// O mejor aún:
<TagSelector customColors={{ light: { selected: { background: '#3b82f6' } } }} />
```

### **Problema: Estilos inconsistentes**
```jsx
// ❌ Mezclar estrategias sin entender precedencia
<TagSelector 
  className="bg-red-500"        // Puede no funcionar
  customColors={{              // Sobrescribe lo anterior
    light: { selected: { background: 'blue' } }
  }}
/>

// ✅ Usar una estrategia clara por tipo de estilo
<TagSelector 
  className="p-4 gap-2"        // Solo layout
  customColors={{              // Solo colores
    light: { selected: { background: 'blue' } }
  }}
/>
```

## 🔗 Referencias

- **Componentes Específicos:** Cada componente tiene su propio `README-IA--STYLES.md`
- **Documentación Principal:** `README-IA.md` para uso básico
- **Guía de Idiomas:** `README-IA--LANGUAJE.md` para i18n
- **Índice General:** `README-INDEX.md` para navegación completa

---

> **💡 Tip:** Para casos complejos, combina estrategias - usa Tailwind para layout, CSS variables para temas, y props para colores específicos.