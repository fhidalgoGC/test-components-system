# 📚 Índice de Documentación - GC-UI-COMPONENTS

**Version: 1.0.5**

## 🎯 Guía para IA: Dónde Buscar Información

Este índice te ayuda a encontrar rápidamente la documentación específica que necesitas. Todas las rutas son relativas a `client/src/lib/ui-library/`.

---

## 📦 **Instalación y Configuración General**

### **`./README-IA.md`**
**Cuándo usar:** Para instalar la librería y configurar rutas de importación.

**Contiene:**
- 🚀 Instalación desde GitHub (2 métodos)
- 📋 Opciones de importación (principal, específicas)
- 🏗️ Configuración de dependencias peer
- 🐛 Problemas comunes (módulos no encontrados)
- 📚 Enlaces a documentación específica

**Buscar aquí para:**
- Instalar la librería en un proyecto
- Configurar imports de `GC-UI-COMPONENTS`
- Instalar dependencias requeridas
- Resolver errores de módulos no encontrados

---

## 🌐 **Sistema de Idiomas y Providers**

### **`./README-IA--LANGUAJE.md`**
**Cuándo usar:** Para implementar internacionalización y configurar providers de lenguaje.

**Contiene:**
- 🏗️ Arquitectura padre-hijo de providers
- 🎯 Configuración de LibI18nProvider (3 niveles)
- 🔄 Flujo de comunicación entre providers
- 🌐 Estructura de archivos de traducción
- 🔧 API completa de providers y hooks
- 📝 Ejemplos de implementación

**Buscar aquí para:**
- Configurar el sistema de idiomas
- Implementar AppLanguageProvider padre
- Conectar LibI18nProvider con la app
- Resolver problemas de providers
- Crear traducciones globales y locales

### **`./providers/README-LibI18n.provider.md`**
**Cuándo usar:** Para documentación técnica detallada del LibI18nProvider.

**Contiene:**
- 📖 Props interface completa del LibI18nProvider
- 🎯 Hook useLibI18n con todos sus métodos
- 🚀 Ejemplos de uso (básico, con padre, avanzado)
- 🔧 API detallada de funciones
- 🎨 Sistema de prioridades de traducción
- ⚠️ Mejores prácticas y casos de uso

**Buscar aquí para:**
- Entender props específicos del LibI18nProvider
- Usar hooks de traducción (t, resolveLabel, etc.)
- Configurar prioridades de traducción
- Implementar casos de uso avanzados

---

## 🎨 **Sistema Global de Estilos**

### **`./README-IA--STYLES.md`**
**Cuándo usar:** Para entender las estrategias globales de personalización de estilos que se aplican a todos los componentes.

**Contiene:**
- 🎯 4 estrategias principales de personalización (CSS Variables, CSS Modules, Tailwind, Props)
- ⚖️ Orden de precedencia CSS (crítico para personalización exitosa)
- 🛠️ Configuración obligatoria de Tailwind en aplicaciones padre
- 🔀 Estrategias híbridas (combinar múltiples enfoques)
- 🎯 Mejores prácticas por tipo de estilo
- 📋 Casos de uso comunes con ejemplos
- 🔧 Troubleshooting de problemas frecuentes

**Buscar aquí para:**
- Entender cómo funcionan los estilos en toda la librería
- Configurar Tailwind correctamente en tu aplicación
- Decidir qué estrategia de personalización usar
- Resolver conflictos de especificidad CSS
- Combinar CSS modules, Tailwind y props efectivamente
- Solucionar problemas de estilos que no se aplican

---

## 🧩 **Componentes Específicos**

### **TagSelector (Disponible Actualmente)**

#### **`./components/TagSelector/README-IA.md`**
**Cuándo usar:** Para implementar y configurar el componente TagSelector.

**Contiene:**
- 📖 Props completos del TagSelector
- 🎯 Ejemplos de uso (básico, avanzado, async)
- 🔧 API detallada del componente
- 🌐 Integración con sistema i18n
- ⚡ Funcionalidades (preselección, async loading, etc.)
- 🎨 Variantes y temas disponibles

**Buscar aquí para:**
- Implementar TagSelector en un proyecto
- Configurar props específicos (defaultSelectedTags, etc.)
- Entender funcionalidades async
- Integrar con sistema de idiomas
- Personalizar comportamiento del componente

#### **`./components/TagSelector/README-IA--STYLES.md`**
**Cuándo usar:** Para personalizar estilos y temas del TagSelector.

**Contiene:**
- 🆕 **Sistema Híbrido de Estilos (NUEVO)** - chipClassName prop y estrategias combinadas
- 🎨 Sistema de temas (light, dark, auto) 
- 📏 Variantes de tamaño (sm, md, lg, tam-1 a tam-12)
- 🎭 Colores individuales por tag vía metadata
- 🔧 CSS modules y customización avanzada
- 🌈 Tokens de diseño y variables CSS
- 📱 Diseño responsivo y mobile-first
- ⚖️ Orden de precedencia CSS específico del TagSelector

**Buscar aquí para:**
- 🆕 Usar el nuevo sistema híbrido (CSS modules + Tailwind + props)
- 🆕 Aplicar chipClassName para personalización individual de tags
- Personalizar estilos con metadata individual por tag
- Configurar temas light/dark y colores customizados
- Ajustar tamaños granulares con tam-1 a tam-12
- Entender precedencia CSS en TagSelector
- Implementar diseño responsivo y casos de uso específicos

### **Futuros Componentes (Estructura General)**

#### **`./components/[ComponentName]/README-IA.md`**
**Cuándo usar:** Para implementar y configurar componentes específicos de la librería.

**Estructura general de documentación de componentes:**
- 📖 Props completos del componente
- 🎯 Ejemplos de uso (básico, avanzado, casos específicos)
- 🔧 API detallada del componente
- 🌐 Integración con sistema i18n
- ⚡ Funcionalidades específicas del componente
- 🎨 Variantes y configuraciones disponibles

**Buscar aquí para:**
- Implementar cualquier componente en un proyecto
- Configurar props específicos de componentes
- Entender funcionalidades particulares
- Integrar componentes con sistema de idiomas
- Personalizar comportamiento de componentes

#### **`./components/[ComponentName]/README-IA--STYLES.md`**
**Cuándo usar:** Para personalizar estilos y temas de componentes específicos.

**Estructura general de documentación de estilos:**
- 🎨 Sistema de temas (light, dark, auto)
- 📏 Variantes de tamaño disponibles
- 🎭 Variantes visuales y estados
- 🔧 CSS modules y customización
- 🌈 Tokens de diseño y variables CSS
- 📱 Diseño responsivo y breakpoints

**Buscar aquí para:**
- Personalizar estilos de componentes
- Configurar temas light/dark
- Ajustar tamaños y variantes
- Modificar CSS modules
- Implementar diseño responsivo


---

## 🗂️ **Estructura Rápida por Tema**

### **🚀 Instalación**
```
./README-IA.md
├── Instalación desde GitHub
├── Dependencias peer
└── Configuración de imports
```

### **🌐 Idiomas**
```
./README-IA--LANGUAJE.md
├── Arquitectura de providers
├── Configuración AppLanguageProvider
└── LibI18nProvider setup

./providers/README-LibI18n.provider.md
├── API detallada de LibI18nProvider
├── useLibI18n hook
└── Casos de uso avanzados
```

### **🧩 Componentes**
```
./components/[ComponentName]/README-IA.md
├── Props y API del componente
├── Ejemplos de implementación
└── Funcionalidades específicas

./components/[ComponentName]/README-IA--STYLES.md
├── Personalización de estilos
├── Temas y variantes
└── CSS modules
```


---

## 🎯 **Guía Rápida: ¿Dónde Buscar?**

| **Necesito...** | **Ir a...** |
|-----------------|-------------|
| Instalar la librería | `README-IA.md` |
| Configurar idiomas | `README-IA--LANGUAJE.md` |
| API de LibI18nProvider | `providers/README-LibI18n.provider.md` |
| Resolver errores de imports | `README-IA.md` |
| Implementar provider padre | `README-IA--LANGUAJE.md` |

### **🧩 Componentes Específicos:**
| **Componente** | **Documentación** | **Estilos** |
|----------------|-------------------|-------------|
| TagSelector | `components/TagSelector/README-IA.md` | `components/TagSelector/README-IA--STYLES.md` |
| [Futuros componentes] | `components/[ComponentName]/README-IA.md` | `components/[ComponentName]/README-IA--STYLES.md` |

---

**Última actualización: Septiembre 2025** | **Version: 1.0.5**