# Historias de Usuario - CopyVersa v2
## Chrome Extension User Stories

### Información del Documento
- **Producto**: CopyVersa v2 - Chrome Extension
- **Versión**: 2.0.0
- **Metodología**: Agile/Scrum
- **Director de Proyecto**: GitHub Copilot
- **Desarrollador**: Daniel Gómez
- **Fecha**: Mayo 29, 2025

---

## 📋 Épicas del Producto

### Epic 1: Sistema de Instalación y Configuración Inicial
### Epic 2: Sistema de Selección de Contenido
### Epic 3: Sistema de Conversión y Copia
### Epic 4: Interfaz de Usuario y Experiencia
### Epic 5: Configuración y Personalización

---

## 🎯 Historias de Usuario por Epic

### EPIC 1: Sistema de Instalación y Configuración Inicial

#### US-001: Instalación desde Chrome Web Store
**Como** usuario de Chrome  
**Quiero** instalar CopyVersa v2 desde la Chrome Web Store  
**Para** tener acceso fácil y seguro a la extensión  

**Criterios de Aceptación:**
- [ ] La extensión aparece en Chrome Web Store con descripción clara
- [ ] La instalación se completa en menos de 30 segundos
- [ ] El icono de CopyVersa aparece en la barra de herramientas después de la instalación
- [ ] No se requieren reinicios del navegador
- [ ] Los permisos solicitados son claros y justificados

**Definición de Terminado:**
- [ ] Extensión publicada en Chrome Web Store
- [ ] Metadata completa (descripción, capturas, íconos)
- [ ] Permisos mínimos necesarios configurados
- [ ] Testing de instalación en Chrome, Edge y Brave

---

#### US-002: Primera Experiencia del Usuario (Onboarding)
**Como** nuevo usuario de CopyVersa  
**Quiero** entender rápidamente cómo usar la extensión  
**Para** empezar a copiar contenido web inmediatamente  

**Criterios de Aceptación:**
- [ ] Tooltip o modal explicativo aparece al primer uso
- [ ] Muestra el atajo de teclado principal (Ctrl+Shift+X)
- [ ] Explica los dos modos de selección básicos
- [ ] Se puede omitir o cerrar fácilmente
- [ ] No vuelve a aparecer después de ser completado

**Definición de Terminado:**
- [ ] Modal de onboarding implementado
- [ ] Animaciones suaves y no intrusivas
- [ ] Guarda estado de "onboarding completado"
- [ ] Testing de UX con usuarios nuevos

---

### EPIC 2: Sistema de Selección de Contenido

#### US-003: Activación del Modo de Selección
**Como** usuario en cualquier página web  
**Quiero** activar rápidamente el modo de selección de CopyVersa  
**Para** empezar a seleccionar contenido para copiar  

**Criterios de Aceptación:**
- [ ] Atajo Ctrl+Shift+X activa el panel en cualquier página
- [ ] Click en el icono de la extensión también activa el panel
- [ ] El panel aparece sin interferir con el contenido de la página
- [ ] El cursor cambia a modo selección (crosshair)
- [ ] Feedback visual claro indica que el modo está activo

**Definición de Terminado:**
- [ ] Content script inyectado correctamente
- [ ] Panel floating posicionado en top-right
- [ ] Z-index alto para evitar oclusión
- [ ] Manejo de eventos de teclado global
- [ ] Testing en sitios web populares

---

#### US-004: Selección de Elemento Único
**Como** usuario en modo de selección único  
**Quiero** hacer click en un elemento para copiarlo inmediatamente  
**Para** obtener rápidamente el contenido que necesito  

**Criterios de Aceptación:**
- [ ] Hover sobre elementos muestra outline coral (#f97e4d)
- [ ] Click selecciona y copia el elemento inmediatamente
- [ ] Animación fade-out indica que se copió exitosamente
- [ ] Mensaje de confirmación aparece brevemente
- [ ] El modo se desactiva automáticamente después de copiar (si está configurado)

**Definición de Terminado:**
- [ ] Event listeners para hover y click
- [ ] CSS para resaltado de hover
- [ ] Animación fade-out implementada
- [ ] Integración con sistema de copia
- [ ] Testing de precisión de selección

---

#### US-005: Selección de Múltiples Elementos
**Como** usuario que necesita copiar varios elementos  
**Quiero** seleccionar múltiples elementos antes de copiar  
**Para** crear un documento con contenido de diferentes partes de la página  

**Criterios de Aceptación:**
- [ ] Cambio a modo múltiple desde el panel
- [ ] Click en elementos los agrega a la selección (no copia inmediatamente)
- [ ] Elementos seleccionados mantienen resaltado persistente
- [ ] Contador de elementos seleccionados visible
- [ ] Botón "Finalizar y copiar" se habilita cuando hay selecciones
- [ ] Cursor cambia a "copy" en modo múltiple

**Definición de Terminado:**
- [ ] Array de elementos seleccionados funcional
- [ ] UI para mostrar conteo de selecciones
- [ ] CSS para resaltado persistente
- [ ] Lógica de habilitación/deshabilitación de botones
- [ ] Testing de selección múltiple compleja

---

#### US-006: Gestión de Selecciones Múltiples
**Como** usuario en modo de selección múltiple  
**Quiero** poder deshacer selecciones individuales  
**Para** refinar mi selección antes de copiar  

**Criterios de Aceptación:**
- [ ] Click en elemento ya seleccionado lo deselecciona
- [ ] Feedback visual claro al deseleccionar
- [ ] Lista de elementos seleccionados actualizada en tiempo real
- [ ] Botón para limpiar todas las selecciones
- [ ] Preserva orden de selección para copia

**Definición de Terminado:**
- [ ] Toggle de selección implementado
- [ ] UI para gestión de lista de selecciones
- [ ] Botón "Limpiar todo" funcional
- [ ] Orden de elementos preservado
- [ ] Testing de flujos complejos de selección

---

### EPIC 3: Sistema de Conversión y Copia

#### US-007: Copia en Formato Markdown
**Como** usuario que trabaja con documentación  
**Quiero** copiar contenido web en formato Markdown  
**Para** mantener la estructura y formato en mis documentos  

**Criterios de Aceptación:**
- [ ] Conversión HTML a Markdown usando Turndown.js
- [ ] Soporte para GitHub Flavored Markdown (GFM)
- [ ] Preservación de tablas, listas, código, enlaces
- [ ] Limpieza de elementos HTML no relevantes
- [ ] Contenido copiado al portapapeles del sistema

**Definición de Terminado:**
- [ ] Integración de Turndown.js y plugin GFM
- [ ] Configuración personalizada de conversión
- [ ] Testing con elementos complejos (tablas, código)
- [ ] API de portapapeles funcional
- [ ] Manejo de errores de conversión

---

#### US-008: Copia en Formato HTML
**Como** desarrollador web  
**Quiero** copiar elementos HTML con su estructura semántica  
**Para** reutilizar código y estilos en mis proyectos  

**Criterios de Aceptación:**
- [ ] Extracción de HTML limpio y válido
- [ ] Opción de preservar o remover clases CSS
- [ ] Opción de preservar o remover estilos inline
- [ ] Estructura semántica mantenida
- [ ] HTML válido y bien formateado

**Definición de Terminado:**
- [ ] Parser HTML para limpieza
- [ ] Configuraciones de preservación de estilos
- [ ] Validación de HTML de salida
- [ ] Formateo consistente del código
- [ ] Testing con elementos complejos

---

#### US-009: Configuración de Formato de Salida
**Como** usuario con necesidades específicas  
**Quiero** personalizar cómo se procesa el contenido copiado  
**Para** obtener exactamente el formato que necesito  

**Criterios de Aceptación:**
- [ ] Toggle para eliminar enlaces en Markdown
- [ ] Toggle para preservar semántica HTML
- [ ] Configuración de limpieza de espacios en blanco
- [ ] Opciones de formateo de código
- [ ] Configuración persistente entre sesiones

**Definición de Terminado:**
- [ ] Panel de ajustes rápidos funcional
- [ ] Storage API para persistencia
- [ ] Aplicación correcta de configuraciones
- [ ] UI clara para cada opción
- [ ] Testing de todas las combinaciones

---

### EPIC 4: Interfaz de Usuario y Experiencia

#### US-010: Panel Principal Flotante
**Como** usuario activo en una página web  
**Quiero** un panel de control que no interfiera con mi navegación  
**Para** mantener mi flujo de trabajo sin interrupciones  

**Criterios de Aceptación:**
- [ ] Panel flotante posicionado en esquina superior derecha
- [ ] Draggable para reposicionamiento
- [ ] Tamaño compacto pero legible
- [ ] No bloquea contenido importante de la página
- [ ] Colapsa automáticamente cuando no está en uso

**Definición de Terminado:**
- [ ] CSS positioning absoluto/fijo
- [ ] Funcionalidad drag and drop
- [ ] Auto-hide inteligente
- [ ] Z-index apropiado
- [ ] Testing en diferentes resoluciones

---

#### US-011: Feedback Visual Durante Selección
**Como** usuario seleccionando elementos  
**Quiero** feedback visual claro de mis acciones  
**Para** entender qué elementos estoy seleccionando  

**Criterios de Aceptación:**
- [ ] Outline coral en hover sobre elementos
- [ ] Resaltado coral semitransparente en elementos seleccionados
- [ ] Animación fade-out después de copiar
- [ ] Cursor personalizado según el modo
- [ ] Transiciones suaves entre estados

**Definición de Terminado:**
- [ ] CSS animations implementadas
- [ ] Estados visuales consistentes
- [ ] Performance optimizada
- [ ] Cursors personalizados
- [ ] Testing de accesibilidad visual

---

#### US-012: Mensajes de Confirmación
**Como** usuario que copia contenido  
**Quiero** confirmación clara de que mi acción fue exitosa  
**Para** tener confianza en que el contenido está en mi portapapeles  

**Criterios de Aceptación:**
- [ ] Toast message al copiar exitosamente
- [ ] Indica el formato usado (Markdown/HTML)
- [ ] Desaparece automáticamente después de 3 segundos
- [ ] Posicionado para no obstruir contenido
- [ ] Estilo consistente con design system

**Definición de Terminado:**
- [ ] Sistema de notificaciones toast
- [ ] Auto-dismiss configurado
- [ ] Estilos del design system aplicados
- [ ] Testing de timing
- [ ] Accesibilidad para lectores de pantalla

---

#### US-013: Modo Oscuro/Claro
**Como** usuario que trabaja en diferentes ambientes  
**Quiero** que la interfaz se adapte a mi preferencia de tema  
**Para** mantener consistencia con mi entorno de trabajo  

**Criterios de Aceptación:**
- [ ] Detección automática de preferencia del sistema
- [ ] Toggle manual en configuraciones
- [ ] Todos los componentes respetan el tema
- [ ] Transición suave entre temas
- [ ] Persistencia de preferencia manual

**Definición de Terminado:**
- [ ] CSS custom properties para theming
- [ ] Media query prefers-color-scheme
- [ ] Toggle funcional en UI
- [ ] Storage de preferencia
- [ ] Testing en ambos modos

---

### EPIC 5: Configuración y Personalización

#### US-014: Página de Opciones Avanzadas
**Como** usuario power que usa frecuentemente CopyVersa  
**Quiero** acceso a configuraciones avanzadas  
**Para** personalizar completamente mi experiencia  

**Criterios de Aceptación:**
- [ ] Acceso desde right-click en icono → Opciones
- [ ] Configuración de atajos de teclado
- [ ] Ajustes de apariencia y comportamiento
- [ ] Importar/exportar configuraciones
- [ ] Reset a valores por defecto

**Definición de Terminado:**
- [ ] Página de opciones HTML funcional
- [ ] Todos los settings configurables
- [ ] Import/export de configuración JSON
- [ ] Context menu entry
- [ ] Testing de persistencia

---

#### US-015: Popup de Estado de la Extensión
**Como** usuario que quiere información rápida  
**Quiero** ver el estado actual de CopyVersa desde el popup  
**Para** entender rápidamente si está activa y configurada  

**Criterios de Aceptación:**
- [ ] Click en icono muestra popup informativo
- [ ] Estado actual de la extensión (activa/inactiva)
- [ ] Configuraciones actuales (modo, formato)
- [ ] Enlaces rápidos a opciones
- [ ] Estadísticas básicas de uso

**Definición de Terminado:**
- [ ] Popup HTML implementado
- [ ] Comunicación con content script
- [ ] UI informativa clara
- [ ] Links funcionales
- [ ] Testing de estados

---

#### US-016: Gestión de Datos y Privacidad
**Como** usuario consciente de la privacidad  
**Quiero** control sobre qué datos almacena la extensión  
**Para** mantener mi privacidad y gestionar el almacenamiento  

**Criterios de Aceptación:**
- [ ] Visualización de datos almacenados
- [ ] Opción de limpiar todos los datos
- [ ] Configuración de qué datos persistir
- [ ] Información de privacidad clara
- [ ] No almacenamiento de contenido sensible

**Definición de Terminado:**
- [ ] UI para gestión de datos
- [ ] Clear data functionality
- [ ] Privacy policy integrada
- [ ] Configuraciones de privacidad
- [ ] Audit de datos almacenados

---

## 🎯 Historias Técnicas (Technical Stories)

### TS-001: Configuración de Arquitectura Base
**Como** desarrollador  
**Quiero** una arquitectura sólida de extensión de Chrome  
**Para** garantizar mantenibilidad y escalabilidad  

**Criterios de Aceptación:**
- [ ] Manifest v3 configurado correctamente
- [ ] Service worker implementado
- [ ] Content script architecture
- [ ] Build system con Vite configurado
- [ ] TypeScript setup completo

---

### TS-002: Sistema de Testing
**Como** desarrollador  
**Quiero** un framework de testing robusto  
**Para** garantizar calidad y prevenir regresiones  

**Criterios de Aceptación:**
- [ ] Unit tests para funciones core
- [ ] Integration tests para content script
- [ ] E2E tests para flujos principales
- [ ] Coverage mínimo del 80%
- [ ] CI/CD pipeline configurado

---

### TS-003: Performance y Optimización
**Como** desarrollador  
**Quiero** que la extensión sea performante  
**Para** no impactar la experiencia de navegación del usuario  

**Criterios de Aceptación:**
- [ ] Bundle size < 2MB
- [ ] Tiempo de inyección < 100ms
- [ ] Memory usage < 50MB
- [ ] Lazy loading de componentes
- [ ] Performance monitoring

---

## 📊 Métricas por Historia

### Priorización (Escala 1-5):
- **US-003**: Prioridad 5 (Crítica)
- **US-004**: Prioridad 5 (Crítica)  
- **US-007**: Prioridad 5 (Crítica)
- **US-001**: Prioridad 4 (Alta)
- **US-010**: Prioridad 4 (Alta)
- **US-005**: Prioridad 4 (Alta)
- **US-011**: Prioridad 3 (Media)
- **US-012**: Prioridad 3 (Media)
- **US-008**: Prioridad 3 (Media)
- **US-013**: Prioridad 2 (Baja)
- **US-014**: Prioridad 2 (Baja)

### Estimación de Esfuerzo (Story Points):
- **TS-001**: 13 SP (Arquitectura base)
- **US-003**: 8 SP (Activación compleja)
- **US-004**: 5 SP (Selección básica)
- **US-007**: 8 SP (Conversión Markdown)
- **US-005**: 8 SP (Selección múltiple)
- **US-010**: 5 SP (Panel UI)
- **US-011**: 3 SP (Feedback visual)
- **US-001**: 5 SP (Publicación)

### Dependencias:
- TS-001 → Todas las historias de usuario
- US-003 → US-004, US-005
- US-004 → US-007, US-008
- US-010 → US-011, US-012

---

## 📅 Sprint Planning Sugerido

### Sprint 1 (Semana 1): Fundación
- TS-001: Configuración de Arquitectura Base
- US-003: Activación del Modo de Selección
- US-010: Panel Principal Flotante

### Sprint 2 (Semana 2): Core Functionality
- US-004: Selección de Elemento Único
- US-007: Copia en Formato Markdown
- US-011: Feedback Visual Durante Selección

### Sprint 3 (Semana 3): Funcionalidad Avanzada
- US-005: Selección de Múltiples Elementos
- US-006: Gestión de Selecciones Múltiples
- US-008: Copia en Formato HTML

### Sprint 4 (Semana 4): Polish y Configuración
- US-012: Mensajes de Confirmación
- US-009: Configuración de Formato de Salida
- US-013: Modo Oscuro/Claro

### Sprint 5 (Semana 5): Distribución y Finalización
- US-001: Instalación desde Chrome Web Store
- US-002: Primera Experiencia del Usuario
- US-015: Popup de Estado de la Extensión
- TS-002: Sistema de Testing

---

**Documento creado por:** GitHub Copilot (Director de Proyecto)  
**Para revisión de:** Daniel Gómez (Product Owner/Developer)  
**Metodología:** Agile/Scrum  
**Fecha:** Mayo 29, 2025

---

## 📝 Notas para el Equipo

### Definición of Ready (DoR):
- [ ] Historia tiene criterios de aceptación claros
- [ ] Dependencias identificadas y resueltas
- [ ] Estimación de esfuerzo completada
- [ ] Mockups/wireframes disponibles (si aplica)
- [ ] Testing approach definido

### Definition of Done (DoD):
- [ ] Código implementado y funcional
- [ ] Tests unitarios pasando
- [ ] Code review completado
- [ ] Testing manual realizado
- [ ] Documentación actualizada
- [ ] Criterios de aceptación verificados
