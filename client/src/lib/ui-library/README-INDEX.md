# 📚 Índice de Documentación - GC-UI-COMPONENTS

**Version: 1.0.6**

## 🎯 Guía para IA: Dónde Buscar Información

Este índice te ayuda a encontrar rápidamente la documentación específica que necesitas. Todas las rutas son relativas a `client/src/lib/ui-library/`.

---

## 📦 **Instalación y Configuración General**

### **`./README-INSTALL-IA.md`**
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

### **`./providers/AppEnviromentProvider/README-IA.md`**
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

### **`./providers/AppAuthProvider/README-IA.md`**
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

### **`./providers/AppLanguageProvider/README-IA.md`**
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

### **`./providers/AppLanguageLibUiProvider/README-IA.md`**
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

### **LoginCard**

#### **`./components/LoginCard/README-IA.md`**
**Cuándo usar:** Para implementar tarjetas de autenticación con múltiples configuraciones (email/password + OAuth providers).

**Contiene:**
- 📖 Props completos del LoginCard (config, providers, callbacks)
- 🎯 Ejemplos de uso (with-credentials, providers-only, custom components)
- 🔧 API detallada con tipos TypeScript (LoginProvider, LoginConfig, RedirectConfig)
- 🎨 Layouts adaptativos según cantidad de providers (1-2 vertical, 3-4 grid, 5+ con "more")
- 🔀 Sistema de redirects automáticos (internos y externos, con/sin new tab)
- 🖼️ Custom components rendering vía atributo `component`
- 🌐 Sistema i18n completo con MultiLanguageLabel para todos los textos
- 📊 Dos configuraciones principales (with-credentials, providers-only)
- 🏗️ Arquitectura modular con layouts separados (WithCredentialsLayout, ProvidersOnlyLayout)
- 🎭 Metadata personalizada por provider vía atributo `data`
- ♿ Accesibilidad completa con ARIA attributes
- 🧪 Data test IDs para testing

**Buscar aquí para:**
- Implementar tarjetas de login con email/password
- Agregar providers OAuth/SSO (Google, GitHub, Apple, etc.)
- Configurar layouts adaptativos según número de providers
- Usar custom components en botones de providers
- Implementar redirects automáticos (auth/github, external URLs)
- Personalizar labels con multiidioma (MultiLanguageLabel)
- Manejar callbacks (onEmailLogin, onProviderSelect, onForgotPassword)
- Crear experiencias de login "providers-only" (sin email/password)
- Integrar con sistemas de autenticación OAuth
- Testing de flujos de autenticación

### **Carousel**

#### **`./components/Carousel/README-IA.md`**
**Cuándo usar:** Para implementar carruseles interactivos con autoplay, gestos táctiles, navegación por teclado e indicadores.

**Contiene:**
- 📖 Props completos del Carousel (items, autoPlay, loop, callbacks)
- 🎯 Ejemplos de uso (básico, controlado, sin loop, múltiples slides, async API)
- 🔧 API detallada con tipos TypeScript (CarouselProps, modos controlado/no controlado)
- 🔄 Loop infinito verdadero con técnica de clonación de slides
- 🖱️ Gestos de drag & touch con optimización GPU y protección de scroll vertical
- ⌨️ Navegación por teclado completa (arrow keys)
- 🎨 Indicadores clicables y botones de navegación con ocultamiento inteligente
- ⏯️ Autoplay con pausa en hover
- 📊 Callbacks de ciclo de vida (onChange, onReachStart, onReachEnd)
- 📱 Responsive design con slidesPerView y spaceBetweenPx configurables
- 🌐 Soporte para datos asíncronos desde APIs
- ♿ Accesibilidad completa con ARIA attributes
- 🧪 Data test IDs para testing

**Buscar aquí para:**
- Implementar carruseles de imágenes, productos o contenido destacado
- Usar modo controlado con navegación externa
- Configurar infinite loop verdadero sin saltos visuales
- Implementar drag gestures en desktop y mobile
- Cargar datos desde APIs con estados de loading/error
- Ocultar botones de navegación en límites (sin loop)
- Usar callbacks onChange, onReachStart, onReachEnd
- Mostrar múltiples slides simultáneamente
- Personalizar autoplay y pausar en hover
- Configurar navegación por teclado y accesibilidad
- Testing con data-testid de slides, botones e indicadores

### **LayoutColumn**

#### **`./components/LayoutColumn/README.md`**
**Cuándo usar:** Para implementar layouts verticales con división proporcional del espacio en slots y grupos de alineación.

**Contiene:**
- 🏗️ Arquitectura de 3 niveles (Slots → Grupos de Alineación → Componentes)
- 📖 Props completos del LayoutColumn (slots, widthMode, heightMode, dividers, etc.)
- 🎯 Ejemplos de uso (layouts de página, sidebars, cards con secciones)
- 🔧 API detallada con tipos TypeScript (LayoutColumnComponent, tokens)
- ⚖️ Comportamiento dinámico vs fijo (full/auto/fixed modes)
- 📏 Sistema de divisores (slotDivider entre slots, slotAlignDivider entre grupos)
- 🎨 Tokens de spacing, gaps y dimensiones
- 🔄 Hook useLayoutColumn para visibilidad dinámica
- 🎯 Alineación vertical (top, center, bottom) dentro de cada slot

**Buscar aquí para:**
- Implementar layouts de página con header, content, footer
- Dividir espacio vertical proporcionalmente en slots
- Usar grupos de alineación (top/center/bottom) dentro de slots
- Configurar divisores personalizados entre slots y grupos
- Crear sidebars con navegación arriba y logout abajo
- Implementar cards con secciones fijas y contenido flexible
- Usar modo dinámico (full) vs modo fijo (fixed con tokens)
- Controlar visibilidad de componentes/slots con useLayoutColumn
- Personalizar gaps, paddings, margins con tokens

### **WrapperItemsSelected**

#### **`./components/WrapperItemsSelected/README-IA.md`**
**Cuándo usar:** Para envolver componentes con funcionalidad de selección de items por ID con callbacks y estado de selección.

**Contiene:**
- 🔄 **Flujo de Comunicación** - Explicación visual de cómo cada hijo solo pasa SU ID y el wrapper mantiene el array completo
- 📖 Props completos del WrapperItemsSelected (selectedIds, defaultSelectedIds, onSelectionChange, onItemAction, multiSelect)
- 🎯 Ejemplos de uso (cards seleccionables, listas, modo controlado/no controlado, single/multi-select)
- 🔧 API detallada con tipos TypeScript (WrapperItemsSelectedProps, ItemActionEvent, SelectionContextValue)
- 🎨 Hook useSelection para acceder al contexto de selección desde componentes hijos
- 🔄 Modos controlado y no controlado para gestión de estado flexible
- ⚡ Sistema dual de callbacks (onSelectionChange con array completo, onItemAction con eventos individuales)
- 🎯 Métodos de selección (toggleSelection, selectItem, deselectItem, isSelected, clearSelection, selectAll)
- 📊 Soporte para selección múltiple o simple (multiSelect true/false)
- 🎭 Wrapper universal sin estilos (funciona con cards, listas, grids, componentes custom)
- 💡 Quick Start con ejemplos simples
- 🧪 Data test IDs para testing
- ♿ Accesibilidad delegada a componentes hijos

**Buscar aquí para:**
- **Entender el flujo de comunicación entre hijos y wrapper**
- **Implementar componentes donde cada hijo solo conoce su propio ID**
- Implementar selección de items en listas, grids o galerías
- Crear componentes con selección controlada externamente
- Implementar bulk actions basadas en selección
- Usar callbacks para tracking o analytics de selección
- Implementar patrones de radio buttons o checkboxes personalizados
- Gestionar estado de selección con control externo (keyboard shortcuts, select all, etc.)
- Combinar con HeterogeneousList para listas seleccionables
- Combinar con UniversalCard para grids de cards seleccionables
- Testing de comportamiento de selección

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
./README-INSTALL-IA.md
├── Instalación desde GitHub
├── Dependencias peer
└── Configuración de imports
```

### **🌍 Variables de Entorno**
```
./providers/AppEnviromentProvider/README-IA.md
├── Sistema híbrido de configuración
├── 3 estrategias de precedencia
├── ConfigProvider para aplicaciones padre
├── Variables disponibles (API, Auth0, etc.)
├── Uso en componentes (hooks y funciones)
└── API Reference (props, hooks, utilities)
```

### **🔐 Autenticación y Sesiones**
```
./providers/AppAuthProvider/README-IA.md
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
./providers/AppLanguageProvider/README-IA.md
├── Provider de idioma principal (padre)
├── Configuración de idiomas disponibles
├── useAppLanguage hook
└── Integración con la aplicación

./providers/AppLanguageLibUiProvider/README-IA.md
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
./components/TagSelector/README-IA.md
├── Props y API del TagSelector
├── Ejemplos (básico, async, preselección)
└── Sistema híbrido de estilos (README-IA--STYLES.md)

./components/BottomNavigationBar/README-IA.md
├── Props y API del BottomNavigationBar
├── Ejemplos (controlado, no controlado, dynamic disabling)
└── Integración con ConfigProvider e i18n

./components/HeterogeneousList/README-IA.md
├── Props y API del HeterogeneousList
├── Ejemplos (registry mode, elements mode, infinite scroll)
└── Lazy loading y component registry

./components/Carousel/README-IA.md
├── Props y API del Carousel
├── Ejemplos (básico, controlado, sin loop, async API)
├── Loop infinito y drag gestures
└── Callbacks de ciclo de vida

./components/WrapperItemsSelected/README-IA.md
├── 🔄 Flujo de comunicación (diagrama visual)
├── 💡 Quick Start (ejemplos simples)
├── Props y API del WrapperItemsSelected
├── Ejemplos (cards, listas, controlado/no controlado)
├── Hook useSelection para componentes hijos
├── Sistema dual de callbacks (onSelectionChange, onItemAction)
├── Modos multi-select y single-select
└── Demo interactivo en /components/wrapper-items-selected

./components/LayoutColumn/README.md
├── 🏗️ Arquitectura de 3 niveles (Slots → Alineaciones → Componentes)
├── Props y API del LayoutColumn
├── Ejemplos (layouts de página, sidebars, cards)
├── Comportamiento dinámico vs fijo (full/auto/fixed)
├── Divisores (slotDivider, slotAlignDivider)
├── Hook useLayoutColumn para visibilidad dinámica
└── Tokens de spacing, gaps y dimensiones

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
| Instalar la librería | `README-INSTALL-IA.md` |
| Personalizar estilos globales | `README-IA--STYLES.md` |
| Implementar nuevos providers o componentes | `../README-IA-IMPORTS.md` |
| Resolver errores de imports con alias | `../README-IA-IMPORTS.md` |
| Formatear fechas con providers | `utils/dates/README.md` |
| Ver todos los providers disponibles | Ver tabla **Providers del Sistema** ↓ |
| Ver todos los componentes disponibles | Ver tabla **Componentes Específicos** ↓ |

### **🧩 Componentes Específicos:**
| **Componente** | **Documentación** | **Estilos** | **Link GitHub** |
|----------------|-------------------|-------------|-----------------|
| TagSelector | `components/TagSelector/README-IA.md` | `components/TagSelector/README-IA--STYLES.md` | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/TagSelector/README-IA.md) |
| BottomNavigationBar | `components/BottomNavigationBar/README-IA.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/BottomNavigationBar/README-IA.md) |
| HeterogeneousList | `components/HeterogeneousList/README-IA.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/HeterogeneousList/README-IA.md) |
| LoginCard | `components/LoginCard/README-IA.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/LoginCard/README-IA.md) |
| Carousel | `components/Carousel/README-IA.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/Carousel/README-IA.md) |
| WrapperItemsSelected | `components/WrapperItemsSelected/README-IA.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/WrapperItemsSelected/README-IA.md) |
| LayoutColumn | `components/LayoutColumn/README.md` | - | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/components/LayoutColumn/README.md) |
| [Futuros componentes] | `components/[ComponentName]/README-IA.md` | `components/[ComponentName]/README-IA--STYLES.md` | - |

### **🔌 Providers del Sistema:**
| **Provider** | **Documentación** | **Link GitHub** |
|--------------|-------------------|-----------------|
| AppLanguageProvider | `providers/AppLanguageProvider/README-IA.md` | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/providers/AppLanguageProvider/README-IA.md) |
| AppLanguageLibUiProvider | `providers/AppLanguageLibUiProvider/README-IA.md` | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/providers/AppLanguageLibUiProvider/README-IA.md) |
| AppEnviromentProvider | `providers/AppEnviromentProvider/README-IA.md` | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/providers/AppEnviromentProvider/README-IA.md) |
| AppAuthProvider | `providers/AppAuthProvider/README-IA.md` | [📄 Ver en GitHub](https://github.com/fhidalgoGC/test-components-system/blob/version.1.0.2-mobile/client/src/lib/ui-library/providers/AppAuthProvider/README-IA.md) |
| [Futuros providers] | `providers/[ProviderName]/README-IA.md` | - |

---

**Última actualización: Noviembre 2025** | **Version: 1.0.6**
