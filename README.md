# Evolution Perfect Gym — Design Showcase

Showroom con **10 propuestas visuales diferenciadas** para que los propietarios de Evolution Perfect Gym (Florencia, Caquetá) revisen cada dirección de diseño en computador, tablet y móvil.

> **Demostración:** los precios, beneficios, perfiles, testimonios, WhatsApp, redes y horarios deben validarse con el propietario. Las fotos de gimnasio actuales son referencias de stock y no se presentan como fotografías oficiales. Los retratos reales de entrenadores siguen pendientes de recibir. El checkout es una simulación: no cobra ni solicita datos bancarios.

## Las 10 propuestas

| # | Ruta | Propuesta | Dirección visual |
|---:|---|---|---|
| 01 | `#/propuesta/performance` | Performance | Alto contraste, deportivo, negro y lima |
| 02 | `#/propuesta/elite` | Elite | Premium, editorial y minimalista |
| 03 | `#/propuesta/energy` | Energy | Dinámico, asimétrico y social |
| 04 | `#/propuesta/essential` | Essential | Claro, funcional y comparativo |
| 05 | `#/propuesta/local` | Local Performance | Identidad local y contacto directo |
| 06 | `#/propuesta/studio` | Studio | Boutique, editorial y orgánico |
| 07 | `#/propuesta/motion` | Motion | Digital, neón y alto impacto |
| 08 | `#/propuesta/forge` | Forge | Industrial, crudo y contundente |
| 09 | `#/propuesta/zenith` | Zenith | Natural, equilibrado y sereno |
| 10 | `#/propuesta/pulse` | Pulse | Social, cálido y comunitario |

## Qué incluye

- Catálogo único con diez alternativas completas y navegación anterior/siguiente.
- Selector de vista previa de escritorio, tablet y móvil.
- Planes, servicios, galería, horarios, contacto, FAQ y llamadas a la acción.
- Flujo de usuario nuevo vs. afiliado existente: preinscripción, selección de plan, verificación demostrativa y renovación mensual.
- Formulario nuevo con nombre, tipo/número de documento, fecha de nacimiento, correo, celular y contacto de emergencia opcional.
- Interfaz demostrativa de biometría/passkey móvil. No captura ni almacena huellas reales; para producción requiere WebAuthn con desafíos y persistencia segura en backend.
- Checkout demostrativo, claramente etiquetado; no hay cobros reales ni campos bancarios.
- Visor de galería a pantalla completa con imagen en proporción original, navegación por flechas, miniaturas, contador, cierre y soporte de teclado.
- Diseño adaptable y estados visibles para las fotos de entrenadores que todavía no se han entregado.
- Hash routing y configuración de `BASE_PATH` para GitHub Pages.

## Instalación y ejecución (Windows PowerShell)

```powershell
npm ci
npm run dev
```

Abre `http://localhost:9000`.

## Verificación

```powershell
npm run typecheck
npm run lint
npm run check:assets
npm run build
```

No hay pruebas automatizadas de navegador incluidas. La revisión visual manual sigue siendo necesaria en anchos 320, 360, 390, 430, 768, 1024, 1280 y 1440 px.

## Contenido editable

- Datos comerciales, horarios, enlaces, entrenadores, planes y fotos: `src/data/gym.ts`.
- Catálogo y fichas comparativas: `src/data/concepts.ts`.
- Componentes visuales: `src/components/concepts/`.
- Fotos locales: agrégalas en `public/images/` y referencia `images/archivo.jpg` en `src/data/gym.ts`. Mantén exactamente las mayúsculas y la extensión.

### Fotos reales de entrenadores

El ZIP de origen no contenía retratos de entrenadores. No se inventaron ni se usaron fotos de stock para atribuirlas a personas reales. Cuando el gimnasio entregue las imágenes autorizadas, añade los archivos a `public/images/trainers/` y completa `photo` para cada entrenador en `src/data/gym.ts`.

## Publicar en GitHub Pages

1. Sube el contenido del proyecto a la rama `main`.
2. En GitHub, ve a **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. El workflow `.github/workflows/deploy.yml` instalará dependencias, verificará tipos, lint y recursos, compilará usando `BASE_PATH` y publicará `dist/spa`.
4. La URL final se muestra en el job de despliegue y tendrá formato `https://TU_USUARIO.github.io/TU_REPO/`.

Prueba local con la misma base de publicación:

```powershell
$env:BASE_PATH = "/TU_REPO/"
npm run build
```

## Pendientes antes de la publicación final

- [ ] Ejecutar los cuatro comandos de verificación anteriores en un entorno con Node.js compatible.
- [ ] Revisar las diez rutas y probar anterior/siguiente, catálogo y recarga.
- [ ] Verificar el checkout de cada propuesta y que el plan elegido coincida con el resumen.
- [ ] Probar la galería en móvil, teclado, carga y error de imagen.
- [ ] Revisar anchos 320, 360, 390, 430, 768, 1024, 1280 y 1440 px sin scroll horizontal.
- [ ] Sustituir las fotos de stock por fotos autorizadas del gimnasio y cargar los retratos reales de los entrenadores.
- [ ] Confirmar precios, horarios, dirección, WhatsApp, redes, beneficios y condiciones con el propietario.


## Planes y fotografías de referencia

Los valores visibles de membresías se extrajeron de los registros de servicios de la copia `ATPGYM_Oct_26_2026.SQL`: mensualidad pesas ($75.000), plan trimestral ($210.000), plan 6 meses ($360.000) y plan anual ($600.000 COP). Se marcan como referencia de base de datos, no como tarifa vigente confirmada. El propietario debe validar precios, beneficios y condiciones antes de publicar.

Los retratos de entrenadores y algunas imágenes del gimnasio son fotografías de stock cargadas desde Unsplash y se identifican como ilustrativas. No deben presentarse como personas reales que trabajen en el gimnasio; reemplázalas por imágenes autorizadas cuando estén disponibles.

Las propuestas 06–10 se rediseñaron con estructuras de página distintas, no solo con recoloración: Studio usa composición editorial boutique y filas minimalistas; Motion usa una portada deportiva de alto impacto, ticker y tarjetas compactas; Forge adopta un lenguaje industrial brutalista con manifiesto y lista técnica; Zenith utiliza una narrativa serena con recorrido vertical de membresías; Pulse presenta un collage cálido, tarjetas comunitarias y una sección de renovación. Las cinco incluyen llamadas visibles a “Paga tu mensualidad”. El checkout compartido permite seleccionar “Soy nuevo y quiero inscribirme” o “Ya soy afiliado”; para nuevos muestra el formulario y la interfaz de biometría móvil, y para afiliados solicita documento y celular antes del checkout demostrativo.
