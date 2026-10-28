# Datos comerciales: confirmados y por validar

## Confirmados (indicados por el propietario)
- Nombre: Evolution Perfect Gym. Ciudad: Florencia, Caquetá, Colombia.
- Horarios: lunes a viernes 5:00 a. m. a 12:00 m. y 2:00 p. m. a 10:00 p. m.; sábados 7:00 a. m. a 12:00 m. y 2:00 p. m. a 6:00 p. m.; festivos 7:00 a. m. a 12:00 m. (`contact.schedule`).

## Provisionales (el propietario debe confirmar o reemplazar)
| Dato | Dónde editar | Estado |
|---|---|---|
| Precios de los planes | `plans[].priceCOP` | Referencia de la copia ATPGYM: mensual pesas $75.000, trimestral $210.000, 6 meses $360.000, anual $600.000 COP; confirmar vigencia |
| Beneficios y condiciones de cada plan | `plans[]`, `comparisonRows` | De referencia |
| Servicios, entrenadores, clases, retos | `services`, `trainers`, `classes`, `challenges` | De referencia; retratos de stock, reemplazar por fotos autorizadas |
| Testimonios | `testimonials` | Ficticios, rotulados |
| Preguntas frecuentes | `faqs` | Redactadas de forma genérica |
| WhatsApp | `contact.whatsappNumber` | Número de ejemplo |
| Dirección, correo | `contact.address`, `contact.email` | Por confirmar |
| Instagram, Facebook, TikTok | `socials[].url` | Vacías |
| Métodos de pago y pasarela | `src/services/payment.ts` | No existe; checkout solo demostrativo |
| Texto legal | `LegalFooter.vue` | Pendiente de redacción legal |


## Valores extraídos de la copia de base de datos

| Registro en `servicio` | Vigencia registrada | Precio COP |
|---|---:|---:|
| MENSUALIDAD PESAS | 30 días | $75.000 |
| PLAN TRIMESTRAL | 90 días | $210.000 |
| PLAN 6 MESES | 180 días | $360.000 |
| PLAN ANUAL | 365 días | $600.000 |

Estos importes se muestran en el proyecto como referencia de la copia recibida, no como garantía de que sigan vigentes. Validarlos con el propietario antes de publicar.
