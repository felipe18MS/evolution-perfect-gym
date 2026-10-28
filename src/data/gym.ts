import type {
  BenefitItem, Challenge, ComparisonRow, ContactInfo, FaqItem, GalleryItem, GroupClass,
  Plan, ServiceItem, SocialLink, Testimonial, Trainer,
} from 'src/types/gym';

/**
 * Fotografías de stock gratuitas (Unsplash License), cargadas desde internet para la demostración.
 * No son fotos reales de Evolution Perfect Gym: reemplácelas por imágenes propias (public/images/).
 */
const stock = (id: string, width = 1400): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=70`;

const PHOTO = {
  woman: stock('photo-1571019613454-1cb2f99b2d8b'),
  dumbbell: stock('photo-1583454110551-21f2fa2afe61'),
  weights: stock('photo-1534438327276-14e5300c3a48'),
  bikes: stock('photo-1517836357463-d25dfeac3438'),
  gear: stock('photo-1581009146145-b5ef050c2e1e'),
  trainer1: stock('photo-1583454110551-21f2fa2afe61', 700),
  trainer2: stock('photo-1571019613454-1cb2f99b2d8b', 700),
  trainer3: stock('photo-1517836357463-d25dfeac3438', 700),
};

/**
 * FUENTE ÚNICA DE DATOS. Todo lo que aparece aquí es contenido de demostración
 * hasta que el propietario lo confirme. Edite este archivo para actualizar las diez propuestas.
 */

const plans: Plan[] = [
  {
    id: 'monthly', name: 'Mensualidad pesas', durationLabel: '30 días', months: 1,
    priceCOP: 75000, priceStatus: 'demo', highlight: false, enrollLabel: 'Elegir mensualidad',
    benefits: ['Acceso a zona de pesas', 'Vigencia de 30 días', 'Horario sujeto a las condiciones registradas del servicio'],
    conditions: [''],
  },
  {
    id: 'quarterly', name: 'Plan trimestral', durationLabel: '90 días', months: 3,
    priceCOP: 210000, priceStatus: 'demo', highlight: true, enrollLabel: 'Elegir trimestral',
    benefits: ['Vigencia de 90 días', 'Acceso según las condiciones del servicio registrado', 'Alternativa de mayor duración'],
    conditions: [''],
  },
  {
    id: 'semester', name: 'Plan 6 meses', durationLabel: '180 días', months: 6,
    priceCOP: 360000, priceStatus: 'demo', highlight: false, enrollLabel: 'Elegir semestre',
    benefits: ['Vigencia de 180 días', 'Acceso según las condiciones del servicio registrado', 'Plan de continuidad a medio plazo'],
    conditions: [''],
  },
  {
    id: 'annual', name: 'Plan anual', durationLabel: '365 días', months: 12,
    priceCOP: 600000, priceStatus: 'demo', highlight: false, enrollLabel: 'Elegir anual',
    benefits: ['Vigencia de 365 días', 'Acceso según las condiciones del servicio registrado', 'Alternativa de continuidad anual'],
    conditions: [''],
  },
];

const comparisonRows: ComparisonRow[] = [
  { id: 'zone', label: 'Zona de entrenamiento', values: { monthly: true, quarterly: true, semester: true, annual: true } },
  { id: 'classes', label: 'Clases grupales', values: { monthly: 'Según cupo', quarterly: true, semester: true, annual: true } },
  { id: 'eval', label: 'Evaluación física', values: { monthly: 'Básica', quarterly: 'Básica', semester: 'Completa', annual: 'Completa' } },
  { id: 'trainer', label: 'Sesiones con entrenador', values: { monthly: false, quarterly: '1 sesión', semester: '2 sesiones', annual: '4 sesiones' } },
  { id: 'pause', label: 'Pausa del plan', values: { monthly: false, quarterly: false, semester: 'Por confirmar', annual: 'Por confirmar' } },
];

const services: ServiceItem[] = [
  { id: 's1', title: 'Musculación', description: 'Máquinas y peso libre para ganar fuerza con técnica segura.', icon: 'fitness_center' },
  { id: 's2', title: 'Cardio', description: 'Zona para resistencia, quema de calorías y recuperación activa.', icon: 'directions_run' },
  { id: 's3', title: 'Entrenamiento funcional', description: 'Circuitos de movimiento completo para el día a día y el deporte.', icon: 'sports_gymnastics' },
  { id: 's4', title: 'Clases grupales', description: 'Sesiones guiadas con ritmo, música y compañía.', icon: 'groups' },
  { id: 's5', title: 'Entrenamiento personalizado', description: 'Rutinas diseñadas según tu objetivo, nivel y disponibilidad.', icon: 'person' },
  { id: 's6', title: 'Evaluación física', description: 'Punto de partida claro para medir tu progreso.', icon: 'monitor_heart' },
];

const benefitsOfTraining: BenefitItem[] = [
  { id: 'b1', title: 'Más energía', text: 'Entrenar con constancia mejora la resistencia en tu rutina diaria.' },
  { id: 'b2', title: 'Fuerza y movilidad', text: 'Músculos y articulaciones preparados para moverte mejor.' },
  { id: 'b3', title: 'Hábito sostenible', text: 'Un plan claro hace más fácil volver cada semana.' },
  { id: 'b4', title: 'Bienestar mental', text: 'El ejercicio regular ayuda a manejar el estrés y a dormir mejor.' },
];

const trainers: Trainer[] = [
  { id: 't1', name: 'Entrenador/a 1', role: 'Musculación y técnica', bio: 'Perfil ilustrativo; nombre y trayectoria por confirmar.', photo: PHOTO.trainer1 },
  { id: 't2', name: 'Entrenador/a 2', role: 'Funcional y clases grupales', bio: 'Perfil ilustrativo; nombre y trayectoria por confirmar.', photo: PHOTO.trainer2 },
  { id: 't3', name: 'Entrenador/a 3', role: 'Acondicionamiento y cardio', bio: 'Perfil ilustrativo; nombre y trayectoria por confirmar.', photo: PHOTO.trainer3 },
];

const classes: GroupClass[] = [
  { id: 'c1', name: 'Funcional en grupo', description: 'Circuitos de cuerpo completo para todos los niveles.', scheduleNote: 'Horario de la clase por confirmar' },
  { id: 'c2', name: 'Cardio guiado', description: 'Intervalos con música para subir pulsaciones.', scheduleNote: 'Horario de la clase por confirmar' },
  { id: 'c3', name: 'Fuerza y movilidad', description: 'Trabajo de técnica, estabilidad y rango de movimiento.', scheduleNote: 'Horario de la clase por confirmar' },
  { id: 'c4', name: 'Clase de prueba', description: 'Conoce el ambiente antes de elegir tu plan.', scheduleNote: 'Disponibilidad por confirmar' },
];

const challenges: Challenge[] = [
  { id: 'r1', title: 'Reto de 30 días', text: 'Campaña de demostración: asiste con regularidad y registra tu avance.' },
  { id: 'r2', title: 'Reto en equipo', text: 'Campaña de demostración: entrena con amigos y sumen metas juntos.' },
  { id: 'r3', title: 'Reto de regreso', text: 'Campaña de demostración: para quienes retoman el gimnasio.' },
];

const testimonials: Testimonial[] = [
  { id: 'q1', author: 'Cliente de ejemplo A', text: 'Ejemplo ficticio: me gustó que el plan fuera fácil de entender desde el primer día.', isFictional: true },
  { id: 'q2', author: 'Cliente de ejemplo B', text: 'Ejemplo ficticio: las clases grupales me ayudaron a mantener la constancia.', isFictional: true },
  { id: 'q3', author: 'Cliente de ejemplo C', text: 'Ejemplo ficticio: la orientación inicial me dio confianza para empezar.', isFictional: true },
];

const faqs: FaqItem[] = [
  { id: 'f1', question: '¿Cómo me inscribo?', answer: 'Elige un plan en este sitio y completa el flujo de demostración, o escribe por WhatsApp. En la versión final, el gimnasio definirá el proceso real.' },
  { id: 'f2', question: '¿Cuáles son los horarios?', answer: 'Lunes a viernes de 5:00 a. m. a 12:00 m. y de 2:00 p. m. a 10:00 p. m. Sábados de 7:00 a. m. a 12:00 m. y de 2:00 p. m. a 6:00 p. m. Festivos de 7:00 a. m. a 12:00 m.' },
  { id: 'f3', question: '¿Qué métodos de pago habrá?', answer: 'Por definir. La demo muestra métodos ilustrativos; los reales dependerán de la pasarela que se contrate.' },
  { id: 'f4', question: '¿Puedo probar antes de pagar?', answer: 'Por confirmar. Pregunta por WhatsApp si existe una clase o visita de prueba.' },
  { id: 'f5', question: '¿Puedo pausar mi plan?', answer: 'Las condiciones de pausa están por confirmar con el gimnasio.' },
];

const gallery: GalleryItem[] = [
  { id: 'g1', title: 'Zona de pesas', alt: 'Zona de pesas del gimnasio', src: PHOTO.weights },
  { id: 'g2', title: 'Área de cardio', alt: 'Área de cardio del gimnasio', src: PHOTO.bikes },
  { id: 'g3', title: 'Fuerza', alt: 'Mujer entrenando con barra', src: PHOTO.woman },
  { id: 'g4', title: 'Entrenamiento funcional', alt: 'Hombre entrenando con mancuerna', src: PHOTO.dumbbell },
  { id: 'g5', title: 'Equipamiento', alt: 'Equipamiento de pesas', src: PHOTO.gear },
  { id: 'g6', title: 'Pesas libres', alt: 'Zona de pesas libres', src: PHOTO.weights },
];

/** Deje la URL vacía para mostrar el estado "pendiente de configurar". */
const socials: SocialLink[] = [
  { id: 'instagram', label: 'Instagram', url: '', icon: 'fa-brands fa-instagram' },
  { id: 'facebook', label: 'Facebook', url: '', icon: 'fa-brands fa-facebook' },
  { id: 'tiktok', label: 'TikTok', url: '', icon: 'fa-brands fa-tiktok' },
];

const contact: ContactInfo = {
  whatsappNumber: '573000000000',
  whatsappIsDemo: true,
  whatsappMessage: 'Hola, quiero información sobre las membresías de Evolution Perfect Gym.',
  address: 'Dirección por confirmar',
  hours: 'Lunes a viernes: 5:00 a. m. a 12:00 m. y 2:00 p. m. a 10:00 p. m. Sábados: 7:00 a. m. a 12:00 m. y 2:00 p. m. a 6:00 p. m. Festivos: 7:00 a. m. a 12:00 m.',
  schedule: [
    { label: 'Lunes a viernes', hours: '5:00 a. m. a 12:00 m. y 2:00 p. m. a 10:00 p. m.' },
    { label: 'Sábados', hours: '7:00 a. m. a 12:00 m. y 2:00 p. m. a 6:00 p. m.' },
    { label: 'Festivos', hours: '7:00 a. m. a 12:00 m.' },
  ],
  email: 'Correo por confirmar',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Evolution+Perfect+Gym+Florencia+Caquet%C3%A1',
};

/** Rutas dentro de public/ (por ejemplo "images/hero.jpg") o URLs https. Vacío = espacio reservado. */
const images = {
  hero: PHOTO.woman, about: PHOTO.weights, wide: PHOTO.weights,
  local1: PHOTO.bikes, local2: PHOTO.weights, local3: PHOTO.dumbbell,
};

const brand = {
  name: 'Evolution Perfect Gym',
  city: 'Florencia, Caquetá, Colombia',
  slogan: 'Entrena con propósito',
};

const gym = {
  brand, plans, comparisonRows, services, benefitsOfTraining, trainers, classes, challenges,
  testimonials, faqs, gallery, socials, contact, images,
};

export default gym;
