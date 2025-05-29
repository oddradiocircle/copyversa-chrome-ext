# CopyVersa - Documentación del User Script (Versión 1.5)

## Descripción General

CopyVersa es un UserScript diseñado para facilitar la copia de contenido web preservando su estructura semántica, estilo y formato. Permite a los usuarios seleccionar elementos de una página web y copiarlos al portapapeles en formato Markdown o HTML, manteniendo la integridad del contenido original.

## Características Principales

-   Selección de contenido en modo único o múltiple
-   Copia en formato Markdown (GFM) o HTML
-   Preservación de semántica HTML (configurable)
-   Panel de ajustes rápidos configurable
-   Feedback visual durante la interacción
-   Persistencia de configuración del usuario
-   Encapsulamiento mediante Shadow DOM
-   **Animación de fade-out en elementos copiados**
-   **Configuración de la duración de la animación**

## Cambios en la versión 3.1

-   **Animación mejorada:** Se ha implementado una animación de fade-out más suave y configurable para los elementos seleccionados. La duración de la animación ahora se puede configurar a través de la variable `COPYVERSA_CONFIG.animationDuration` y se refleja en la variable CSS `--animation-duration`.
-   **Cursores personalizados:** Se ha añadido un cursor de "copia" en el modo de selección múltiple para una mejor indicación visual.
-   **Estilos actualizados:** Se han actualizado los estilos para mejorar la consistencia y la experiencia del usuario.
-   **Código refactorizado:** Se ha mejorado la estructura del código para una mayor legibilidad y mantenibilidad.
-   **Corrección de errores:** Se han solucionado varios errores menores de la versión anterior.

## Comportamiento y Valores por Defecto

### Inicialización

1. **Estado Inicial**:
    -   Panel oculto (`display: none`)
    -   Modo de selección desactivado (`isSelecting: false`)
    -   Sin elementos seleccionados (`selectedElements: []`)
    -   Sin elemento resaltado (`lastHoveredElement: null`)

2. **Configuración por Defecto**:
    -   Modo: Único
    -   Formato: Markdown
    -   Panel de ajustes: Oculto
    -   Eliminar enlaces de Markdown: Desactivado
    -   Preservar semántica HTML: Activado
    -   Salir después de copiar: Activado
    -   **Duración de la animación: 12 segundos**

### Panel Principal

#### Estructura Visual

-   **Encabezado**:
    -   Título "CopyVersa"
    -   Botón de cierre (X) alineado a la derecha
    -   Fondo: `var(--white)` (modo claro) o `var(--dark-surface)` (modo oscuro)
    -   Borde: `1px solid var(--eerie-black)` (modo claro) o `var(--dark-text)` (modo oscuro)

#### Secciones y Controles

1. **Modo de Copia**:
    -   Etiqueta: "Modo de copia"
    -   Botones:
        -   "Único": Selección predeterminada, clase `button-selected`
        -   "Múltiple": Inicialmente inactivo, clase `button-icon-primary`
    -   Botón "Finalizar selección y copiar":
        -   Visible solo en modo múltiple
        -   Deshabilitado por defecto
        -   Se habilita cuando hay al menos un elemento seleccionado

2. **Formato de Copia**:
    -   Etiqueta: "Formato de copia"
    -   Botones:
        -   "Markdown": Selección predeterminada, clase `button-selected`
        -   "HTML": Inicialmente inactivo, clase `button-icon-primary`

3. **Ajustes Rápidos**:
    -   Botón principal: "Ajustes rápidos"
    -   Estado inicial: Contraído
    -   Opciones:
        -   "Eliminar enlaces del Markdown": Checkbox, desactivado por defecto
        -   "Preservar semántica HTML": Checkbox, activado por defecto
        -   "Salir después de copiar": Checkbox, activado por defecto
        -   Atajo de teclado: Muestra "Ctrl+Shift+X"

### Interacción y Estilos

#### Cursores

-   **Panel y Elementos UI**:
    -   Panel principal: `cursor: default !important`
    -   Botones y checkboxes: `cursor: pointer !important`
    -   Labels tipo checkbox: `cursor: pointer !important`
    -   Labels estándar: `cursor: default !important`

-   **Área de Selección**:
    -   Modo selección activo: `cursor: crosshair !important`
    -   Elemento con hover: `cursor: crosshair`
    -   **Modo selección activo (Modo múltiple): `cursor: copy !important`**

#### Resaltado de Elementos

1. **Hover**:
    -   Borde: `outline: 2px solid [[f97e4d]] !important`
    -   Clase: `cpvrsa-hover-highlight`
    -   *Nota: Desaparece cuando el usuario hace clic*

2. **Selección**:
    -   Fondo: `background: rgba(249, 126, 77, 0.2) !important`
    -   Clase: `cpvrsa-selected-highlight`
    -   **Animación de fade-out:**
        -   Clase: `fade-out`
        -   Animación: `fadeHighlight`
        -   Duración: `var(--animation-duration, 12s)` (configurable)
        -   Función de tiempo: `cubic-bezier(0.4, 0, 0.2, 1)`
        -   *Nota: La animación se aplica después de copiar. El resaltado desaparece gradualmente después de la duración especificada.*

#### Estados de Botones

1. **Botones de Modo**:
    -   Activo:
        -   Clase: `button-selected`
        -   Color: `var(--eerie-black)` (modo claro) o `var(--baby-powder)` (modo oscuro)
    -   Inactivo:
        -   Clase: `button-icon-primary`
        -   Color: Variable según tema

2. **Botón "Finalizar selección y copiar"**:
    -   Deshabilitado:
        -   Color fondo: `var(--antiflash-white)` (modo claro) o `var(--dark-border)` (modo oscuro)
        -   Color texto: `rgba(24, 24, 24, 0.5)` (modo claro) o `rgba(224, 224, 224, 0.5)` (modo oscuro)
    -   Habilitado:
        -   Estilo: `button-secondary`

### Comportamiento de Selección

#### Modo Único

1. **Activación**:
    -   Botón "Único" seleccionado
    -   Botón "Finalizar" oculto

2. **Funcionamiento**:
    -   Click selecciona el elemento.
    -   **Se aplica la animación de fade-out al elemento seleccionado.**
    -   Si "Salir después de copiar" está activo, el panel se cierra después de un retraso (`COPYVERSA_CONFIG.panelHideDelay`, actualmente 1 segundo).
    -   Muestra mensaje de feedback.

#### Modo Múltiple

1. **Activación**:
    -   Botón "Múltiple" seleccionado
    -   Botón "Finalizar" visible

2. **Funcionamiento**:
    -   Click alterna selección del elemento
    -   Botón "Finalizar" se habilita con ≥1 elemento seleccionado
    -   Al finalizar:
        -   **Se aplica la animación de fade-out a los elementos seleccionados.**
        -   Muestra mensaje de feedback
        -   Si "Salir después de copiar" está activo, cierra el panel

### Sistema de Feedback

#### Mensaje de Retroalimentación

-   Posición: Esquina inferior derecha
-   Fondo: `var(--coral)`
-   Color texto: `var(--white)`
-   Duración: `COPYVERSA_CONFIG.feedbackDuration` (actualmente 3 segundos)
-   Transición: Fade in/out suave

### Persistencia de Datos

-   Almacenamiento: `localStorage`
-   Clave: `copyversaState`
-   Datos guardados:
    -   Modo de copia (único/múltiple)
    -   Formato (Markdown/HTML)
    -   Visibilidad panel ajustes
    -   Estado checkboxes de configuración

### Modo Oscuro (Dark Mode)

El sistema responde automáticamente a `prefers-color-scheme: dark` con:

-   Colores de fondo adaptados
-   Colores de texto ajustados
-   Contraste mantenido para accesibilidad

### Accesos Rápidos

-   **Activar/Desactivar**: `Ctrl+Shift+X`
-   **Salir**: Tecla `Escape`

---

##  CopyVersa - Documentación de Estilos (Versión 3.1)

### Archivo: cpvrsa-panel.css

#### Variables y Tokens del Sistema

El archivo define las siguientes variables fundamentales dentro del selector `:host`:

```css
/* Design Tokens y Variables Fundamentales */
:host {
    /* Colores del sistema */
    --coral: [[f97e4d]];           /* Color principal de acento */
    --eerie-black: #181818;     /* Color principal de texto oscuro */
    --white: [[ffffff]];           /* Color de fondo claro */
    --baby-powder: [[f8f7f2]];     /* Color de fondo secundario claro */
    --linen: [[ede4dc]];          /* Color de borde y elementos secundarios */
    --antiflash-white: [[ededed]]; /* Color para elementos deshabilitados */
    --dark-background: [[2c2c2c]]; /* Fondo en modo oscuro */
    --dark-surface: [[3c3c3c]];    /* Superficie en modo oscuro */
    --dark-text: [[e0e0e0]];       /* Texto en modo oscuro */
    --dark-border: #555555;     /* Bordes en modo oscuro */

    /* Tipografía */
    --font-mono: 'Monaco', 'Consolas', monospace;
    --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

    /* Espaciado base */
    --spacing-base: 6px;

    /* Sistema de sombras */
    --shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.1);
    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);

    /* Transiciones */
    --transition-hover: background-color 0.2s ease-in-out;
}
```

#### Estilos del Panel Principal

El panel principal usa las siguientes clases definidas en el archivo:

```css
/* Panel principal */
.copyversa-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    background: var(--white);
    box-shadow: var(--shadow-md);
    padding: 1.5rem;
    width: 280px;
    display: none;
}

.copyversa-panel.is-active {
    display: block;
    border: 1px solid var(--eerie-black);
}
```

#### Sistema de Botones

Los botones utilizan una jerarquía de clases definida en el archivo:

```css
/* Base de botones */
.button,
.button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    padding: 0 1rem;
    border-radius: 100px;
    font-size: 14px;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: var(--transition-hover);
    text-decoration: none;
    line-height: 1;
    margin: 0;
}

/* Variantes de botones */
.button-primary { ... }
.button-secondary { ... }
.button-tertiary { ... }
.button-selected { ... }
```

#### Sistema de Inputs

El archivo define estilos específicos para checkboxes y radio buttons:

```css
/* Radio Buttons */
.radio-input {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--eerie-black);
    border-radius: 50%;
    /* ... resto de propiedades ... */
}

/* Checkboxes */
.checkbox-input {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid var(--eerie-black);
    border-radius: 4px;
    /* ... resto de propiedades ... */
}
```

#### Sistema de Mensajes

Los mensajes de feedback están definidos como:

```css
/* Mensaje de retroalimentación */
.feedback-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    background: var(--coral);
    color: var(--white);
    font-size: 0.875rem;
    display: none;
    z-index: 10000;
    box-shadow: var(--shadow-sm);
}

.feedback-message.is-active {
    display: block;
}
```

#### Iconos de Botones

El archivo define varios iconos SVG para los botones mediante clases específicas:

```css
/* Estilos específicos para cada tipo de botón con icono */
.button-icon-close::before { ... }
.button-icon-copy-single::before { ... }
.button-icon-copy-multi::before { ... }
.button-icon-markdown::before { ... }
.button-icon-html::before { ... }
.button-icon-settings::before { ... }
.button-icon-keyboard::before { ... }
.button-icon-warning::before { ... }
.button-icon-check::before { ... }
```

#### Sistema de Grid y Layout

El archivo incluye un sistema de grid y utilidades de espaciado:

```css
/* Sistema de Grid */
.grid {
    display: grid;
    gap: 1.125rem;
}

.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Utilidades de Espaciado */
.mt-4 { margin-top: 0.75rem; }
.mb-4 { margin-bottom: 0.75rem; }
.gap-4 { gap: 0.75rem; }
```

#### Sistema de Tipografía

El archivo define una jerarquía tipográfica completa:

```css
/* Tamaños de texto */
.text-xs { font-size: 0.625rem; }
.text-sm { font-size: 0.75rem; }
.text-base { font-size: 0.875rem; }
.text-lg { font-size: 1rem; }
/* ... más tamaños ... */

/* Pesos de fuente */
.font-light { font-weight: 300; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
```

#### Soporte para Modo Oscuro

El archivo incluye media queries para modo oscuro en cada componente relevante:

```css
@media (prefers-color-scheme: dark) {
    .copyversa-panel {
        background: var(--dark-surface);
        color: var(--dark-text);
    }

    .button-primary { ... }
    .button-secondary { ... }
    .checkbox-input { ... }
    /* ... otros componentes ... */
}
```

#### Notas de Implementación

1. **Estructura de Archivo**
    -   El archivo está organizado por componentes
    -   Las variables están definidas al inicio
    -   Los media queries están al final de cada sección relevante

2. **Clases Utilitarias**
    -   El archivo provee clases de utilidad para espaciado, tipografía y layout
    -   Las clases siguen una convención de nomenclatura consistente

3. **Integración con JavaScript**
    -   Las clases `.is-active` se usan para estados controlados por JS
    -   Los selectores coinciden con los IDs y clases usados en el código JS

4. **Especificidad**
    -   El archivo mantiene una especificidad controlada
    -   Usa `!important` solo cuando es necesario para sobreescribir estilos de la página host

5. **Responsividad**
    -   Los componentes usan unidades relativas cuando es apropiado
    -   El layout se ajusta a diferentes tamaños de pantalla
    -   El modo oscuro se adapta a las preferencias del sistema

---

### Archivo: cpvrsa-document.css

Este archivo contiene los estilos específicos para la animación de los elementos seleccionados y copiados.

#### Animación `fadeHighlight`

```css
@keyframes fadeHighlight {
    0%, 25% {
        background: rgba(249, 126, 77, 0.2) !important;
    }
    100% {
        background: transparent !important;
    }
}

/* Clase combinada para elementos seleccionados con fade out */
.cpvrsa-selected-highlight.fade-out {
    animation: fadeHighlight var(--animation-duration, 12s) cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
}
```

-   **`@keyframes fadeHighlight`**: Define la animación. El fondo del elemento seleccionado cambia de `rgba(249, 126, 77, 0.2)` a `transparent` en la duración especificada.
-   **`.cpvrsa-selected-highlight.fade-out`**: Aplica la animación `fadeHighlight` al elemento.
    -   `var(--animation-duration, 12s)`: Permite configurar la duración de la animación a través de la variable CSS `--animation-duration`. Si no está definida, usa 12 segundos por defecto.
    -   `cubic-bezier(0.4, 0, 0.2, 1)`: Define una curva de Bézier para una transición suave.
    -   `forwards`: Mantiene el estado final de la animación (fondo transparente).

#### Clases para la interacción

```css
/* Estilos para elementos del documento */
.cpvrsa-hover-highlight {
    outline: 2px solid [[f97e4d]] !important;
}

.cpvrsa-selected-highlight {
    background: rgba(249, 126, 77, 0.2) !important;
}

.cpvrsa-selecting * {
    cursor: default !important;
}

.cpvrsa-selecting.multi-select * {
    cursor: copy !important;
}
```

-   **`.cpvrsa-hover-highlight`**: Aplica un contorno naranja al elemento al hacer hover.
-   **`.cpvrsa-selected-highlight`**: Aplica un fondo semi-transparente naranja al elemento seleccionado.
-   **`.cpvrsa-selecting *`**:  Cursor por defecto en modo de selección.
-   **`.cpvrsa-selecting.multi-select *`**: **Cursor de "copia" en modo de selección múltiple.**