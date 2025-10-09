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

### **`../README-IA-IMPORTS.md`**
**Cuándo usar:** Para entender cómo hacer imports correctamente DENTRO de la librería (para desarrollo interno).

**Contiene:**
- 🚫 Regla principal: NO usar alias @ dentro de la librería
- 📁 Estructura de carpetas y cómo calcular rutas relativas
- ✅ Ejemplos correctos vs ❌ incorrectos de imports
- 🎯 Patrones comunes (provider a provider, componente a hook, etc.)
- 🧪 Verificación de imports correctos
- ⚠️ Errores comunes a evitar

**Buscar aquí para:**
- Implementar nuevos providers o componentes dentro de la librería
- Resolver errores de imports con alias @
- Calcular rutas relativas correctamente
- Verificar que los imports funcionarán en aplicaciones externas
- Evitar problemas de resolución de módulos

---

## 🌍 **Sistema de Variables de Entorno**

### **`./providers/AppEnviromentProvider/README.md`**
**Cuándo usar:** Para configurar variables de entorno y gestión híbrida de configuración entre aplicaciones padre y librería.

**Contiene:**
- 🏗️ Arquitectura modular del sistema de configuración híbrida
- ⚖️ 3 estrategias de precedencia (auto, parent, library)
- 🚀 Configuración en aplicaciones padre con ConfigProvider
- 🎯 Variables de entorno disponibles (API, Auth0, moneda, formato)
- 🔧 Uso en componentes (hooks useConfig y funciones directas)
- 🚨 Problemas comunes y migración desde configuración antigua
- 🔗 API Reference completa (props, hooks, utilities)

**Buscar aquí para:**
- Configurar variables de entorno con precedencia personalizable
- Implementar ConfigProvider en aplicaciones padre
- Sobrescribir configuración de la librería desde el padre
- Usar hooks useConfig y useConfigValue en componentes
- Utilizar funciones no-React (getConfig, getConfigValue)
- Migrar desde configuración estática a sistema híbrido
- Resolver problemas de configuración y precedencia

---

## 🔐 **Sistema de Autenticación y Sesiones**

### **`./providers/AppAuthProvider/README.md`**
**Cuándo usar:** Para implementar gestión de autenticación y sesiones con expiración automática.

**Contiene:**
- 🏗️ Arquitectura del sistema de autenticación
- 🎯 Props y API del AppAuthProvider
- 🚀 Ejemplos de uso (básico, con callbacks, con API)
- ⏰ Sistema de expiración de sesión basado en tiempo real
- 🔄 Sincronización cross-tab con BroadcastChannel
- ⚙️ Integración con ConfigProvider para configuración jerárquica
- 🗄️ Persistencia automática en sessionStorage
- 📊 Callbacks de ciclo de vida (onLogging, onSessionInvalid)

**Buscar aquí para:**
- Implementar AppAuthProvider en la aplicación
- Configurar duración de sesión personalizada
- Usar callbacks para notificaciones de sesión
- Integrar con sistemas de autenticación externos
- Sincronizar estado de sesión entre pestañas
- Manejar expiración automática de sesiones
- Usar useAppAuth hook

---

## 🌐 **Sistema de Idiomas y Providers**

### **`./providers/AppLanguageProvider/README.md`**
**Cuándo usar:** Para implementar el provider de idioma principal de la aplicación.

**Contiene:**
- 🏗️ Arquitectura del provider padre de idioma
- 🎯 Props y API del AppLanguageProvider
- 🚀 Ejemplos de uso (básico, con localStorage, dinámico)
- 🔧 Configuración de idiomas disponibles
- 🔄 Integración con LibI18nProvider
- 🌐 Configuración regional y formatos de fecha

**Buscar aquí para:**
- Implementar AppLanguageProvider en la aplicación
- Configurar idioma inicial y persistencia
- Agregar nuevos idiomas al sistema
- Usar useAppLanguage hook
- Integrar con componentes de la librería

### **`./providers/AppLanguageLibUiProvider/README.md`**
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

### **TagSelector**

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

### **BottomNavigationBar**

#### **`./components/BottomNavigationBar/README-IA.md`**
**Cuándo usar:** Para implementar navegación inferior móvil con soporte multiidioma y configuración externa.

**Contiene:**
- 📖 Props completos del BottomNavigationBar (items, selectedId, disabledIds, callbacks)
- 🎯 Ejemplos de uso (modo controlado, no controlado, deshabilitación dinámica)
- 🔧 API detallada con tipos TypeScript (NavItem, ItemWithMultiLanguageLabel, ErrorEvent)
- 🌐 Sistema i18n reactivo con resolución automática de labels multiidioma
- ⚡ Funcionalidades (callbacks onSelect/onError, triggerOnMount, protección UX)
- 🎛️ Integración con ConfigProvider y cascada de configuración (Props → ConfigProvider → Environment)
- ♿ Accesibilidad completa con ARIA attributes
- 🧪 Data test IDs para testing

**Buscar aquí para:**
- Implementar barra de navegación inferior móvil
- Usar ItemWithMultiLanguageLabel para labels multiidioma
- Configurar modo controlado vs no controlado
- Deshabilitar items dinámicamente con disabledIds
- Manejar errores con callback onError
- Integrar con ConfigProvider para configuración externa
- Configurar TRIGGER_ON_MOUNT vía environment
- Entender regla de UX: no se puede deshabilitar item seleccionado
- Usar callbacks onSelect para navegación
- Implementar testing con data-testid

### **HeterogeneousList**

#### **`./components/HeterogeneousList/README-IA.md`**
**Cuándo usar:** Para renderizar listas heterogéneas con diferentes tipos de items, infinite scroll y lazy loading.

**Contiene:**
- 📖 Dos modos de renderizado (Registry mode y Elements mode)
- 🎯 Ejemplos completos (chat, social feed, feeds con infinite scroll)
- 🔧 API detallada con tipos TypeScript (RegistryItem, LoaderParams, DataLoaderResponse)
- ⚡ Infinite scroll con intersection observer automático
- 📡 Lazy loading con paginación asíncrona (dataLoader/elementsLoader)
- 🎨 Dividers personalizables (line, component, none)
- 📊 Estados manejados (loading, empty, error) con renderers customizables
- 📜 Preservación de scroll position automática
- 🎭 Component registry para items data-driven
- ♿ Accesibilidad completa con ARIA y semantic HTML
- 🧪 Data test IDs para testing

**Buscar aquí para:**
- Renderizar listas con items de diferentes tipos/componentes
- Implementar feeds con infinite scroll (social, chat, noticias)
- Usar component registry para items data-driven
- Configurar lazy loading con paginación asíncrona
- Personalizar dividers (líneas, componentes custom)
- Manejar estados de carga, vacío y error
- Preservar scroll position en actualizaciones
- Implementar chat applications con mensajes heterogéneos
- Renderizar feeds con ads intercalados
- Testing con data-testid de items, estados y dividers

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

### **🌍 Variables de Entorno**
```
./providers/AppEnviromentProvider/README.md
├── Sistema híbrido de configuración
├── 3 estrategias de precedencia
├── ConfigProvider para aplicaciones padre
├── Variables disponibles (API, Auth0, etc.)
├── Uso en componentes (hooks y funciones)
└── API Reference (props, hooks, utilities)
```

### **🔐 Autenticación y Sesiones**
```
./providers/AppAuthProvider/README.md
├── Sistema de autenticación global
├── Expiración de sesión basada en tiempo real
├── Sincronización cross-tab con BroadcastChannel
├── Callbacks de ciclo de vida (onLogging, onSessionInvalid)
├── Integración con ConfigProvider
├── Persistencia automática en sessionStorage
└── API Reference (props, hooks)
```

### **🎨 Estilos Globales**
```
./README-IA--STYLES.md
├── 4 estrategias de personalización
├── Orden de precedencia CSS
├── Configuración Tailwind obligatoria
└── Estrategias híbridas
```

### **🌐 Idiomas**
```
./providers/AppLanguageProvider/README.md
├── Provider de idioma principal (padre)
├── Configuración de idiomas disponibles
├── useAppLanguage hook
└── Integración con la aplicación

./providers/AppLanguageLibUiProvider/README.md
├── Provider de traducciones de librería (hijo)
├── API detallada de LibI18nProvider
├── useLibI18n hook
└── Sistema de prioridades de traducción
```

### **📅 Utilidades de Fechas**
```
./utils/dates/README.md
├── Sistema flexible de formateo de fechas
├── AppProviderLanguageResolver (detección automática de providers)
├── useDateFormatter hook
├── Integración con AppLanguageProvider/LibI18nProvider
├── Configuración externa desde aplicación padre
└── Ejemplos de uso (con/sin providers, standalone)
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
| Implementar nuevos providers o componentes | `../README-IA-IMPORTS.md` |
| Configurar variables de entorno | `providers/AppEnviromentProvider/README.md` |
| Sobrescribir config desde padre | `providers/AppEnviromentProvider/README.md` |
| Implementar autenticación y sesiones | `providers/AppAuthProvider/README.md` |
| Configurar expiración de sesión | `providers/AppAuthProvider/README.md` |
| Sincronizar sesión entre pestañas | `providers/AppAuthProvider/README.md` |
| Personalizar estilos globales | `README-IA--STYLES.md` |
| Configurar idioma de aplicación | `providers/AppLanguageProvider/README.md` |
| Traducciones de componentes | `providers/AppLanguageLibUiProvider/README.md` |
| Formatear fechas con providers | `utils/dates/README.md` |
| Resolver errores de imports con alias | `../README-IA-IMPORTS.md` |
| Agregar nuevos idiomas | `providers/AppLanguageProvider/README.md` |

### **🧩 Componentes Específicos:**
| **Componente** | **Documentación** | **Estilos** |
|----------------|-------------------|-------------|
| TagSelector | `components/TagSelector/README-IA.md` | `components/TagSelector/README-IA--STYLES.md` |
| BottomNavigationBar | `components/BottomNavigationBar/README-IA.md` | - |
| HeterogeneousList | `components/HeterogeneousList/README-IA.md` | - |
| [Futuros componentes] | `components/[ComponentName]/README-IA.md` | `components/[ComponentName]/README-IA--STYLES.md` |

---

**Última actualización: Septiembre 2025** | **Version: 1.0.5**