# TagSelector - Reglas de Comportamiento

## 📋 Comportamiento según configuración

### **1. Con botón "All" (selección libre)**
**Configuración:** `allowAll={true}` + `requireSelection={false}`

#### Pulsar botón "All":
- **Cuando no están todos seleccionados** → selecciona todos
- **Cuando ya están todos seleccionados** → deselecciona todos

#### Pulsar tag individual:
- **Si no estaba seleccionado** → se selecciona
- **Si estaba seleccionado** → se deselecciona (sin restricciones)

---

### **2. Sin "All" y con "al menos 1"**
**Configuración:** `allowAll={false}` + `requireSelection={true}`

#### Botón "All":
- **No se muestra** (eliminado automáticamente)

#### Pulsar tag individual:
- **Si no estaba seleccionado** → se selecciona
- **Si estaba seleccionado:**
  - Si es la **única seleccionada** → **NO se deselecciona** (mantiene mínimo 1)
  - Si hay **más de 1 seleccionada** → se deselecciona normalmente

---

## 🎯 Tabla de Comportamientos

| allowAll | requireSelection | Botón "All" | Comportamiento de tags individuales |
|----------|------------------|-------------|-------------------------------------|
| `true` | `false` | ✅ **SÍ aparece** | Deselección libre |
| `true` | `true` | ❌ **NO aparece** | Deselección con restricción mínima 1 |
| `false` | `true` | ❌ **NO aparece** | Deselección con restricción mínima 1 |
| `false` | `false` | ❌ **NO aparece** | Deselección libre |

---

## 🔧 Lógica de Prioridades

### **requireSelection tiene prioridad sobre allowAll**

Cuando `requireSelection={true}`:
- Se **elimina automáticamente** el botón "All" aunque `allowAll={true}`
- **Razón:** Es contradictorio requerir "al menos 1 seleccionado" y permitir "deseleccionar todo"

### **Implementación técnica:**

```jsx
// Condición para mostrar botón "All"
{allowAll && !requireSelection && tags.length > 0 && (
  <button>All</button>
)}

// Lógica de deselección individual
if (allowAll) {
  // Con "All": deselección libre
} else if (requireSelection) {
  // Sin "All" + requireSelection: solo deselecciona si hay más de 1
  if (selectedTags.length > 1) {
    // Permitir deselección
  }
  // Si es la única, mantenerla seleccionada
} else {
  // Sin restricciones: deselección libre
}
```

---

## ✅ Estado de verificación

- **✅ Implementado** - Todas las reglas funcionan correctamente
- **✅ Verificado** - Comportamiento probado en la aplicación
- **✅ Prioridades** - requireSelection tiene precedencia sobre allowAll