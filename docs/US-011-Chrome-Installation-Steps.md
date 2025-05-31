# US-011: Integration Testing - Chrome Installation Guide

## ✅ Estado Actual
- **Build Status**: ✅ Completado exitosamente
- **Tests Status**: ✅ 59/59 tests pasando
- **Extension Package**: ✅ Lista en `dist/` folder

## 📋 Pasos para Instalar en Chrome

### 1. Abrir Chrome Developer Mode
1. Abre **Google Chrome**
2. Ve a `chrome://extensions/`
3. Activa el **"Developer mode"** (esquina superior derecha)

### 2. Cargar la Extensión
1. Haz clic en **"Load unpacked"**
2. Navega hasta: `c:\Users\danie\OneDrive\Documents\Code\copyversa-chrome-ext\dist`
3. Selecciona la carpeta `dist` y haz clic en **"Select Folder"**

### 3. Verificar Instalación
- ✅ La extensión debe aparecer en la lista con el nombre **"CopyVersa v2"**
- ✅ El icono de CopyVersa debe aparecer en la barra de herramientas
- ✅ Version: **2.0.0**

## 🧪 Tests de Integración a Realizar

### Test 1: Activación por Icono
1. Haz clic en el icono de CopyVersa en la barra de herramientas
2. **Esperado**: 
   - Panel flotante debe aparecer
   - Icono debe cambiar de color/estado
   - Badge debe mostrar "ON"

### Test 2: Activación por Teclado
1. Presiona `Ctrl+Shift+C`
2. **Esperado**: 
   - Panel flotante debe aparecer/desaparecer
   - Feedback visual debe activarse

### Test 3: Selección de Contenido
1. Activa CopyVersa
2. Selecciona texto en cualquier página web
3. **Esperado**:
   - Cambio de cursor visual
   - Panel muestra opciones de formato
   - Botones de copia disponibles

### Test 4: Funcionalidad de Copia
1. Con texto seleccionado, haz clic en formato deseado:
   - **Markdown**
   - **HTML** 
   - **Plain Text**
2. **Esperado**:
   - Contenido copiado al clipboard
   - Notificación de éxito
   - Panel se actualiza

## 🚨 Posibles Problemas y Soluciones

### Error: "Failed to load extension"
- **Causa**: Archivos corruptos o manifest inválido
- **Solución**: Regenerar build con `npm run build`

### Error: "Service worker registration failed"
- **Causa**: Problemas con background script
- **Solución**: Verificar en DevTools > Extensions > Service Worker

### Error: Content script no se inyecta
- **Causa**: Permisos insuficientes
- **Solución**: Verificar `<all_urls>` en manifest

## 📊 Checklist de Validación

- [ ] Extensión se carga sin errores
- [ ] Icono aparece en toolbar
- [ ] Activación por clic funciona
- [ ] Activación por teclado funciona
- [ ] Panel flotante es draggable
- [ ] Selección de texto funciona
- [ ] Copia en todos los formatos funciona
- [ ] Feedback visual es claro
- [ ] No hay errores en console

## 📝 Documentar Resultados

Después de cada test, documentar:
- ✅ **Passed** / ❌ **Failed**
- **Observaciones**
- **Screenshots** (si es necesario)
- **Problemas encontrados**

---

**Próximo Paso**: Una vez completados estos tests, proceder con cross-browser validation (Edge, Brave)
