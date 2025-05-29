# Product Requirements Document (PRD)
## CopyVersa v2 - Chrome Extension

### Información del Proyecto
- **Producto**: CopyVersa v2
- **Tipo**: Extensión de Chrome
- **Versión**: 2.0.0
- **Fecha**: Mayo 2025
- **PM/Director**: GitHub Copilot
- **Desarrollador**: Daniel Gómez

---

## 1. Resumen Ejecutivo

### 1.1 Visión del Producto
CopyVersa v2 es una extensión de Chrome que revoluciona la forma de copiar contenido web, permitiendo a usuarios extraer texto, imágenes, código y elementos HTML preservando su estructura semántica, formato y estilo. La versión 2 migra de userscript a extensión nativa de Chrome con una interfaz mejorada y funcionalidades avanzadas.

### 1.2 Objetivos Principales
- **Migración completa** de userscript a extensión de Chrome
- **Mejora en UX/UI** con sistema de diseño consistente
- **Funcionalidad sin interferencia** con el contenido de la página
- **Persistencia de configuración** del usuario
- **Soporte multiplataforma** (Windows, Mac, Linux)

---

## 2. Análisis del Estado Actual

### 2.1 CopyVersa v1.5 (UserScript)
**Fortalezas identificadas:**
- Selección de elementos en modo único y múltiple
- Copia en formato Markdown (GFM) y HTML
- Panel de configuración rápida
- Animaciones visuales de feedback
- Shadow DOM para encapsulamiento
- Sistema de diseño coherente

**Limitaciones detectadas:**
- Dependencia de Tampermonkey/Greasemonkey
- Carga de estilos externos (latencia)
- Interferencia potencial con páginas web
- Instalación compleja para usuarios finales
- Limitaciones de permisos del navegador

### 2.2 Oportunidades de Mejora
- Distribución nativa a través de Chrome Web Store
- Mejor integración con APIs del navegador
- Configuración persistente más robusta
- Interfaz más accesible y profesional
- Mejor gestión de recursos y rendimiento

---

## 3. Especificaciones Técnicas

### 3.1 Arquitectura de la Extensión

**Estructura de Archivos:**
```
copyversa-v2/
├── manifest.json           # Manifiesto v3
├── background/
│   └── service-worker.js   # Service Worker principal
├── content/
│   ├── content-script.js   # Script de contenido
│   └── content-styles.css  # Estilos inyectados
├── popup/
│   ├── popup.html         # UI del popup
│   ├── popup.js           # Lógica del popup
│   └── popup.css          # Estilos del popup
├── options/
│   ├── options.html       # Página de opciones
│   ├── options.js         # Configuración avanzada
│   └── options.css        # Estilos de opciones
├── assets/
│   ├── icons/            # Iconos de la extensión
│   └── fonts/            # Fuentes (si es necesario)
└── lib/
    ├── turndown.min.js   # Convertidor HTML a Markdown
    └── utils.js          # Utilidades compartidas
```

### 3.2 Tecnologías Base
- **Manifest Version**: 3
- **Framework UI**: Vanilla JavaScript + CSS3
- **Librerías**:
  - Turndown.js (HTML a Markdown)
  - Turndown Plugin GFM
- **Build Tool**: Vite (del template base)
- **Lenguaje**: TypeScript

### 3.3 Permisos Requeridos
```json
{
  "permissions": [
    "activeTab",
    "storage",
    "clipboardWrite"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

---

## 4. Especificaciones Funcionales

### 4.1 Funcionalidades Core

#### 4.1.1 Sistema de Selección
**Modo Único:**
- Click en elemento → Copia inmediata
- Feedback visual con animación fade-out
- Opción de salir automáticamente después de copiar

**Modo Múltiple:**
- Selección de múltiples elementos
- Botón "Finalizar y copiar" cuando hay selecciones
- Resaltado acumulativo de elementos
- Cursor personalizado (copy cursor)

#### 4.1.2 Formatos de Salida
**Markdown (GFM):**
- Soporte completo para GitHub Flavored Markdown
- Preservación de tablas, listas, código
- Opción para remover enlaces
- Limpieza automática de formato

**HTML:**
- Preservación de estructura semántica
- Mantenimiento de clases CSS importantes
- Opción de preservar o limpiar estilos inline

#### 4.1.3 Configuraciones Avanzadas
- **Preservar semántica HTML**: On/Off
- **Eliminar enlaces en Markdown**: On/Off
- **Salir después de copiar**: On/Off
- **Duración de animación**: 1-30 segundos
- **Tema**: Auto/Light/Dark

### 4.2 Interfaz de Usuario

#### 4.2.1 Panel Principal (Content Script)
**Posición y Comportamiento:**
- Floating panel, posición fija top-right
- Draggable para reposicionamiento
- Colapsible/expandible
- Z-index alto para visibilidad

**Elementos de UI:**
- Header con título y botón cerrar
- Sección modo de copia (Único/Múltiple)
- Sección formato (Markdown/HTML)
- Panel de ajustes rápidos (colapsible)
- Botón "Finalizar selección" (modo múltiple)

#### 4.2.2 Popup de Extensión
**Contenido:**
- Estado actual de la extensión
- Acceso rápido a configuraciones
- Estadísticas de uso
- Enlaces a documentación

#### 4.2.3 Página de Opciones
**Configuraciones Avanzadas:**
- Tema y apariencia
- Atajos de teclado personalizables
- Configuraciones de exportación
- Gestión de datos del usuario

### 4.3 Sistema de Diseño

#### 4.3.1 Design Tokens
```css
/* Colores principales */
--coral: #f97e4d;           /* Color primario/accent */
--eerie-black: #181818;     /* Texto principal */
--white: #ffffff;           /* Fondo claro */
--baby-powder: #f8f7f2;     /* Fondo suave */
--linen: #ede4dc;           /* Bordes suaves */

/* Modo oscuro */
--dark-background: #2c2c2c;
--dark-surface: #3c3c3c;
--dark-text: #e0e0e0;
--dark-border: #555555;

/* Tipografía */
--font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: 'Monaco', 'Consolas', monospace;

/* Espaciado */
--spacing-base: 6px;

/* Sombras */
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
```

#### 4.3.2 Componentes UI
- **Botones**: Primarios, secundarios, iconos
- **Checkboxes**: Estilo personalizado
- **Panels**: Contenedores con sombras y bordes redondeados
- **Animations**: Fade-out, hover effects, transitions

---

## 5. Experiencia del Usuario

### 5.1 Flujo Principal de Uso

**Instalación:**
1. Usuario instala desde Chrome Web Store
2. Icono aparece en toolbar del navegador
3. Primer uso muestra onboarding opcional

**Uso Básico:**
1. Usuario navega a página web
2. Presiona Ctrl+Shift+X (o click en icono)
3. Panel CopyVersa aparece
4. Usuario selecciona modo y formato
5. Click en elementos para copiar
6. Contenido se copia al portapapeles
7. Feedback visual confirma acción

**Configuración:**
1. Click derecho en icono → Opciones
2. O acceso desde panel de ajustes rápidos
3. Personalización de preferencias
4. Guardado automático de configuración

### 5.2 Casos de Uso Principales

**Desarrolladores:**
- Copiar código de documentación con formato
- Extraer elementos HTML para reutilizar
- Documentación de APIs en Markdown

**Escritores/Bloggers:**
- Copiar contenido entre plataformas
- Mantener formato en migraciones
- Extracción de citas y referencias

**Estudiantes/Investigadores:**
- Tomar notas estructuradas de webs
- Copiar tablas de datos
- Documentar fuentes con formato

**Profesionales de Marketing:**
- Copiar contenido de competencia
- Extraer elementos para análisis
- Preparar reportes con formato

---

## 6. Requisitos No Funcionales

### 6.1 Rendimiento
- **Tiempo de carga**: < 100ms para mostrar panel
- **Memoria**: < 50MB de uso RAM
- **CPU**: Impacto mínimo en navegación
- **Tamaño de extensión**: < 2MB total

### 6.2 Compatibilidad
- **Chrome**: v90+ (Manifest v3)
- **Edge**: Chromium-based
- **Brave**: Soporte completo
- **OS**: Windows, macOS, Linux

### 6.3 Seguridad
- Manifest v3 compliance
- No ejecución de código remoto
- Mínimos permisos necesarios
- Sanitización de contenido copiado

### 6.4 Accesibilidad
- Soporte para lectores de pantalla
- Navegación por teclado completa
- Contraste WCAG AA compliance
- Textos alternativos para iconos

---

## 7. Plan de Desarrollo

### 7.1 Fases del Proyecto

**Fase 1: Arquitectura y Base (Semana 1)**
- Setup del proyecto con template React-TS
- Configuración de manifest.json
- Estructura básica de archivos
- Service worker inicial

**Fase 2: Core Functionality (Semana 2)**
- Content script básico
- Sistema de selección de elementos
- Integración con Turndown.js
- Copia al portapapeles

**Fase 3: UI/UX (Semana 3)**
- Panel principal con design system
- Implementación de componentes
- Animaciones y feedback visual
- Responsive design

**Fase 4: Configuración y Persistencia (Semana 4)**
- Storage API integration
- Página de opciones
- Popup de extensión
- Configuraciones avanzadas

**Fase 5: Testing y Optimización (Semana 5)**
- Testing en múltiples sitios
- Optimización de rendimiento
- Bug fixes y refinamiento
- Documentación

### 7.2 Entregables

**Documentación:**
- [ ] Documentación técnica completa
- [ ] Guía de usuario
- [ ] Manual de desarrollo

**Código:**
- [ ] Extensión funcional completa
- [ ] Tests unitarios
- [ ] Build optimizado para producción

**Distribución:**
- [ ] Package para Chrome Web Store
- [ ] Assets para marketing
- [ ] Screenshots y videos demo

---

## 8. Métricas de Éxito

### 8.1 KPIs Técnicos
- **Tiempo de carga** < 100ms
- **Crash rate** < 0.1%
- **Memory usage** < 50MB
- **User rating** > 4.5/5

### 8.2 KPIs de Adopción
- **Instalaciones** primera semana > 100
- **Retención** 7 días > 70%
- **Uso activo** semanal > 60%
- **Reviews positivos** > 90%

### 8.3 KPIs de Funcionalidad
- **Copias exitosas** > 95%
- **Tiempo promedio de uso** > 2 min
- **Elementos copiados por sesión** > 3
- **Configuraciones personalizadas** > 40%

---

## 9. Riesgos y Mitigaciones

### 9.1 Riesgos Técnicos
**Compatibilidad con sitios web:**
- Riesgo: Interferencia con JavaScript de páginas
- Mitigación: Shadow DOM y namespace aislado

**Rendimiento:**
- Riesgo: Impacto en navegación
- Mitigación: Lazy loading y optimización

### 9.2 Riesgos de Producto
**Adopción del usuario:**
- Riesgo: Usuarios no migran desde userscript
- Mitigación: Comunicación clara de beneficios

**Competencia:**
- Riesgo: Extensiones similares
- Mitigación: Diferenciación en UX y funcionalidad

---

## 10. Próximos Pasos

### 10.1 Acciones Inmediatas
1. **Configurar proyecto base** con template React-TS de create-chrome-ext
2. **Crear repositorio** y estructura de desarrollo
3. **Definir sprint 1** con tareas específicas
4. **Preparar entorno** de desarrollo y testing

### 10.2 Decisiones Pendientes
- [ ] Template específico a usar (React-TS vs Vanilla-TS)
- [ ] Estrategia de testing automatizado
- [ ] Herramientas de CI/CD
- [ ] Política de versionado

---

**Documento preparado por:** GitHub Copilot (Director de Proyecto)  
**Revisión técnica pendiente:** Daniel Gómez (Desarrollador)  
**Fecha de última actualización:** Mayo 29, 2025
