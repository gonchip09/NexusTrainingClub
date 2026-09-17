# NEXUS Training Club — Diseño

## Objetivo

Crear un sitio comercial ficticio para convertir visitas en solicitudes de una clase de prueba gratuita, con una estética editorial, deportiva y cercana para NEXUS Training Club.

## Arquitectura de archivos

- `index.html`: Home y ruta principal de conversión.
- `entrenamiento.html`: propuesta de entrenamiento, modalidades y entrenadores.
- `planes.html`: membresías, formulario de clase de prueba y contacto.
- `estilos.css`: sistema de tokens, componentes compartidos, reglas responsive y animaciones.
- `script.js`: navegación móvil, comportamiento de scroll, reveals, contadores y validación de formulario.

El proyecto permanece deliberadamente en HTML, CSS y JavaScript nativos: no incorpora dependencias ni estilos inline. Cada página carga la misma hoja de estilos y el mismo script, que activa únicamente los comportamientos presentes en cada vista.

## Sistema visual

- Fondo: `#0D0D0D`.
- Superficie clara: `#F2F0EA`.
- Acento funcional: `#C7FF32`.
- Texto secundario: `#727272`.
- Tipografía: sans-serif del sistema con titulares en mayúsculas, compactos y de gran escala.
- Composición: fotografía a gran escala, líneas finas, bloques editoriales y jerarquía tipográfica. El verde solo identifica acciones, selección y estados.

## Estructura de experiencia

### Home

Navbar, hero de conversión, beneficios editoriales, instalaciones asimétricas, modalidades, estadísticas, testimonios, CTA final y footer. El CTA principal enlaza a `planes.html#clase-prueba`; el secundario baja a instalaciones.

### Entrenamiento

Hero explicativo, cuatro modalidades con beneficio y nivel recomendado, presentación de tres entrenadores y CTA a la página de planes.

### Planes y contacto

Tres membresías, una destacada como más elegida, formulario de prueba gratuita, datos de contacto y estado de confirmación tras envío simulado. La validación de frontend comprueba obligatoriedad, email, teléfono, modalidad y aceptación; muestra errores junto al campo, estado de envío y confirmación.

## Componentes reutilizables por convención

- Cabecera y menú móvil.
- Botones de acción primario, secundario y textual.
- Etiqueta de sección y encabezado editorial.
- Tarjeta de modalidad, entrenador, testimonio y plan.
- Campo de formulario con mensaje de error.
- Footer.

Al usar HTML estático, estos componentes se expresan como bloques con clases consistentes en cada página, en lugar de un framework de componentes.

## Responsive mobile-first

La base de `estilos.css` se diseña para 320–767 px: navegación colapsada, CTAs de alto cómodo, grillas de una columna y tipografía adaptable con `clamp()`. Los ajustes progresivos serán:

- `min-width: 768px`: dos columnas, ajustes de espaciado y composición tablet.
- `min-width: 1024px`: navegación horizontal, grillas asimétricas, mayores escalas tipográficas y CTAs en línea.

Se comprobarán específicamente 375, 430, 768, 1024 y 1440 px, sin desbordamiento horizontal.

## Estrategia de animación

- Navbar con fondo y sombra sutil al superar el hero.
- Elementos con `data-reveal` activados mediante `IntersectionObserver`.
- Imágenes con escala ligera al entrar y en hover cuando haya puntero fino.
- Contadores de estadísticas activados una única vez al entrar en viewport.
- Menú mobile con apertura, cierre y bloqueo de scroll.
- Botones y tarjetas con transiciones cortas, sin depender de animación para comprender la interfaz.
- Un bloque `prefers-reduced-motion: reduce` desactiva transiciones y animaciones no esenciales.

## Calidad y verificación

- HTML semántico, navegación por teclado y etiquetas de formulario asociadas.
- Imágenes con `alt` descriptivo y carga diferida fuera del hero.
- Prueba manual de navegación, CTA, menú, reveals, contadores y validación del formulario.
- Revisión responsive en los cinco anchos acordados.

## Alcance inicial

La primera entrega implementa la Home completa. Tras verificar su responsive, se aplicará el mismo sistema a Entrenamiento y, después, a Planes/Contacto.
