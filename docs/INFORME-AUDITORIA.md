# Informe de auditoría y entrega — versión ampliada

## 1. Base recibida y alcance de esta entrega

El ZIP de origen contenía cinco propuestas: Performance, Elite, Energy, Essential y Local Performance. No contenía las propuestas 06–10 ni fotografías reales de entrenadores.

Para entregar un showroom de diez opciones sin duplicar las cinco existentes, se conservaron las cinco originales y se crearon cinco direcciones visuales nuevas en componentes separados:

- **06 Studio:** boutique/editorial, formas orgánicas y composición serena.
- **07 Motion:** digital, alto contraste y acentos de neón.
- **08 Forge:** industrial, tipografía condensada y acento óxido.
- **09 Zenith:** natural, equilibrio visual y tono de bienestar.
- **10 Pulse:** comunitaria, cálida y social.

Estas cinco propuestas nuevas son diseños originales creados para completar el catálogo; no son recuperación de archivos fuente que no venían en el ZIP. La nueva versión ya no las implementa como variantes de un mismo componente: cada una tiene su propia estructura de página, composición de secciones, jerarquía de contenido y tratamiento de membresías.

## 2. Ajustes aplicados

- Se amplió el tipo `ConceptId`, el catálogo, el registro de carga diferida y las rutas para las diez propuestas.
- Se sustituyeron los wrappers de Studio, Motion, Forge, Zenith y Pulse por cinco componentes autónomos con estructuras de página diferentes: Studio usa composición editorial boutique y filas minimalistas; Motion usa una portada deportiva de alto impacto, ticker y tarjetas de membresía; Forge usa un manifiesto industrial y listado técnico; Zenith usa narrativa de bienestar con recorrido vertical de planes; Pulse usa collage cálido, tarjetas comunitarias y sección de renovación.
- Se añadió una llamada visible “Paga tu mensualidad” en la navegación de las diez propuestas y una sección de renovación/pago destacada en los cinco nuevos conceptos. Todos los botones abren el checkout demostrativo y no procesan pagos reales.
- Se retiró del catálogo la tarjeta de “propuestas pendientes” y el contador se alimenta del catálogo real.
- Se rediseñó el visor de galería como lightbox de pantalla completa: imagen con `object-fit: contain`, overlay oscuro, título, texto alternativo, contador, navegación anterior/siguiente, miniaturas, cierre, teclas de flecha y Escape, estados de carga/error y foco de retorno.
- Se añadieron tres retratos de stock de internet a las tarjetas de entrenadores de las diez propuestas. Se rotulan como imágenes ilustrativas y no como miembros reales del equipo.
- Se mantuvo el checkout demostrativo: no se conecta una pasarela, no cobra y no solicita datos bancarios.
- Se documentaron instalación, verificación, publicación en GitHub Pages y tareas pendientes.

## 3. Rutas

`#/` y `#/propuesta/{performance,elite,energy,essential,local,studio,motion,forge,zenith,pulse}`.

El router continúa en modo hash para admitir rutas directas y recargas en GitHub Pages.

## 4. Planes e imágenes

Se extrajeron cuatro tarifas de la tabla `servicio` de `ATPGYM_Oct_26_2026.SQL`: `MENSUALIDAD PESAS` ($75.000, 30 días), `PLAN TRIMESTRAL` ($210.000, 90 días), `PLAN 6 MESES` ($360.000, 180 días) y `PLAN ANUAL` ($600.000, 365 días). La interfaz las marca como referencias de la copia de base de datos; no deben tratarse como tarifas vigentes hasta que el propietario las valide.

Se añadieron retratos de stock de Unsplash para que las tarjetas de entrenadores sí muestren imágenes. Son referencias visuales genéricas y no deben confundirse con personas reales que trabajen en Evolution Perfect Gym. Las imágenes de instalaciones también son remotas y de referencia. Si una URL externa falla, sustituirla por una imagen local autorizada.

## 5. Verificaciones

- `node scripts/check-assets.mjs`: ejecutado correctamente en esta revisión; no detectó referencias locales rotas y reportó cinco URLs remotas únicas de Unsplash.
- `npm ci --ignore-scripts --no-audit --no-fund --fetch-retries=0`: no pudo completar en este entorno; npm terminó con el error “Exit handler never called”.
- `npm run typecheck`, `npm run lint` y `npm run build`: no se pudieron ejecutar porque no se completó la instalación. Deben ejecutarse en un entorno local con Node.js y npm funcionales antes de publicar.
- No se ejecutaron pruebas de navegador ni validaciones visuales reales a 320, 360, 390, 430, 768, 1024, 1280 y 1440 px. Deben realizarse localmente antes de publicar.

No se declara como probado nada que no se haya podido ejecutar en este entorno.
