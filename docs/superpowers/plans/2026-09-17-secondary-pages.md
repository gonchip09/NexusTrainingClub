# NEXUS Secondary Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Completar las páginas Entrenamiento y Planes/Contacto de NEXUS con navegación coherente, formulario validado y experiencia mobile-first.

**Architecture:** Las páginas reutilizan la cabecera, footer, botones, tokens y atributos de animación existentes. `script.js` incorpora funciones puras de validación testeables y activa el formulario solo cuando existe; `estilos.css` suma layouts específicos mediante progresión mobile-first.

**Tech Stack:** HTML5, CSS3, JavaScript ES modules, Node.js test runner.

**Spec:** `docs/superpowers/specs/2026-09-17-nexus-training-club-design.md`

## Global Constraints

- Mantener HTML, CSS y JavaScript en archivos separados, sin estilos ni handlers inline.
- La base responsive cubre 320–767 px; tablet comienza en 768 px y desktop en 1024 px.
- Reutilizar la paleta `#0D0D0D`, `#F2F0EA`, `#C7FF32` y `#727272`.
- Todas las imágenes fuera del hero usan carga diferida y texto alternativo.
- Las animaciones respetan `prefers-reduced-motion`.
- El formulario simula envío local y no transmite datos a terceros.

---

### Task 1: Construir la página Entrenamiento

**Files:**

- Create: `entrenamiento.html`
- Modify: `estilos.css`
- Test: inspección manual y comprobación estática

**Interfaces:**

- Consumes: `.site-header`, `.site-nav`, `.button`, `.site-footer`, `[data-reveal]`.
- Produces: `.page-hero`, `.discipline-list`, `.discipline`, `.coaches-grid`, `.coach-card` y anclas `fuerza`, `hipertrofia`, `funcional`, `personal`.

- [x] **Step 1: Crear HTML semántico completo**

Añadir hero “Entrená con un propósito”, introducción, cuatro modalidades con imagen, descripción, beneficios y nivel, tres entrenadores y CTA a `planes.html#clase-prueba`.

- [x] **Step 2: Incorporar layout mobile-first**

Diseñar modalidades como bloques editoriales verticales en móvil, alternancia de fotografía y contenido desde 768 px, y grilla de entrenadores de tres columnas desde 1024 px.

- [x] **Step 3: Verificar estructura**

Run: `rg -n '<main|<header|<footer|id="(fuerza|hipertrofia|funcional|personal)"|alt=|planes.html#clase-prueba' entrenamiento.html`

Expected: landmarks, cuatro anclas, textos alternativos y CTA final.

### Task 2: Escribir pruebas de validación de formulario

**Files:**

- Modify: `tests/script.test.js`
- Test: `npm test`

**Interfaces:**

- Consumes: export futuro `validateTrialForm(fields)`.
- Produces: contrato de errores `{ fieldName: message }` y resultado vacío cuando los datos son válidos.

- [x] **Step 1: Añadir casos que deben fallar**

Probar campos vacíos, email inválido, teléfono corto, modalidad ausente y aceptación desmarcada; añadir un caso válido sin errores.

- [x] **Step 2: Ejecutar RED**

Run: `npm test`

Expected: FAIL porque `validateTrialForm` todavía no se exporta desde `script.js`.

### Task 3: Construir Planes/Contacto e implementar validación

**Files:**

- Create: `planes.html`
- Modify: `estilos.css`
- Modify: `script.js`
- Test: `tests/script.test.js`

**Interfaces:**

- Consumes: contrato `validateTrialForm(fields)` de Task 2 y componentes visuales compartidos.
- Produces: formulario `#trial-form`, errores `[data-error-for]`, botón `[data-submit]`, confirmación `[data-form-success]` y estados `is-invalid`, `is-loading`, `is-success`.

- [x] **Step 1: Implementar `validateTrialForm(fields)`**

Validar nombre, apellido, email con patrón básico, teléfono con al menos 8 dígitos, modalidad y aceptación. Devolver mensajes breves en español por clave de campo.

- [x] **Step 2: Ejecutar GREEN**

Run: `npm test`

Expected: todos los casos de validación pasan.

- [x] **Step 3: Crear planes y formulario semántico**

Añadir hero, tres planes con NEXUS Plus destacado como “Más elegido”, comparación de beneficios, formulario accesible y bloque de contacto/horarios.

- [x] **Step 4: Añadir estados del formulario**

Al enviar, limpiar errores anteriores, mostrar errores junto a cada campo y enfocar el primero. Si es válido, mostrar loading durante 700 ms, ocultar el formulario y revelar confirmación sin realizar peticiones de red.

- [x] **Step 5: Estilizar Planes/Contacto mobile-first**

Usar tarjetas apiladas en móvil, destacar el plan central sin romper el orden semántico, formulario de una columna y distribución de dos columnas desde tablet.

### Task 4: Verificación integral y commit

**Files:**

- Modify: `entrenamiento.html`, `planes.html`, `estilos.css`, `script.js` solo ante defectos observados.
- Test: suite automatizada y navegador.

**Interfaces:**

- Consumes: sitio completo de tres páginas.
- Produces: navegación cruzada y formulario listos para integrar.

- [x] **Step 1: Ejecutar verificaciones estáticas**

Run: `npm test && rg -n 'style=|onclick=|onload=' *.html estilos.css script.js || true && git diff --check`

Expected: tests en verde, sin estilos/handlers inline ni errores de whitespace.

- [x] **Step 2: Revisar 375, 430, 768, 1024 y 1440 px**

Expected: `scrollWidth === innerWidth`, menú móvil correcto, navegación desktop visible, imágenes sin distorsión y controles con altura mínima de 44 px.

- [x] **Step 3: Probar formulario en navegador**

Enviar vacío para confirmar errores; completar datos válidos para confirmar loading y estado de éxito; verificar que no se realiza ninguna petición de red.

- [x] **Step 4: Commit**

Run: `git add entrenamiento.html planes.html estilos.css script.js tests/script.test.js docs/superpowers/plans/2026-09-17-secondary-pages.md && git commit -m "feat: add Nexus training and plans pages"`

Expected: rama limpia con las dos páginas, validación y plan registrados.
