import type { ConceptMeta } from 'src/types/gym';
import gym from 'src/data/gym';

export const concepts: ConceptMeta[] = [
  {
    id: 'performance', number: 1, cover: { bg: '#101010', fg: '#ffffff', accent: '#a3e635', fontFamily: "Impact, 'Arial Narrow Bold', sans-serif", photo: gym.images.hero }, letter: 'A', label: 'Performance',
    tagline: 'Oscuro, contundente y deportivo.',
    description: 'Fondo negro, titulares condensados de gran tamaño y verde lima como señal de acción. Hero a pantalla completa, tarjetas de plan de alto contraste y comparador de membresías protagonista.',
    typography: 'Sans condensada en mayúsculas, muy grande',
    hero: 'Fotografía a sangre con titular gigante',
    plansLayout: 'Cuatro tarjetas oscuras, plan destacado en lima',
    bestFor: 'Captar público joven y competitivo',
  },
  {
    id: 'elite', number: 2, cover: { bg: '#0e0e0e', fg: '#f5f5f2', accent: '#a3e635', fontFamily: "Georgia, 'Times New Roman', serif", photo: gym.gallery[3]!.src }, letter: 'B', label: 'Elite',
    tagline: 'Premium, editorial y sereno.',
    description: 'Composición de revista con mucho aire, serif elegante, fotografía amplia y filas de membresía diferenciadas. El lima aparece solo como línea fina.',
    typography: 'Serif de lectura con detalles en sans ligera',
    hero: 'Texto a la izquierda, retrato vertical a la derecha',
    plansLayout: 'Filas editoriales con precio a la derecha',
    bestFor: 'Posicionar servicios personalizados y mayor ticket',
  },
  {
    id: 'energy', number: 3, cover: { bg: '#a3e635', fg: '#101010', accent: '#101010', fontFamily: "'Arial Black', Arial, sans-serif", photo: gym.gallery[1]!.src }, letter: 'C', label: 'Energy',
    tagline: 'Dinámico, asimétrico y social.',
    description: 'Bloques inclinados, titulares expresivos y alternancia de lima, negro y blanco. Clases grupales, retos y comunidad con llamadas a la acción siempre visibles.',
    typography: 'Sans ultra pesada, titulares expresivos',
    hero: 'Bloque lima en diagonal con foto superpuesta',
    plansLayout: 'Tarjetas macizas ligeramente rotadas',
    bestFor: 'Captación con campañas, retos y clases',
  },
  {
    id: 'essential', number: 4, cover: { bg: '#ffffff', fg: '#101010', accent: '#a3e635', fontFamily: "system-ui, 'Segoe UI', Arial, sans-serif", photo: gym.gallery[0]!.src }, letter: 'D', label: 'Essential',
    tagline: 'Limpio, práctico y fácil de comparar.',
    description: 'Blanco predominante, navegación simple y tabla de precios para decidir rápido. Horarios, preguntas frecuentes y formularios cortos organizados para facilitar la compra.',
    typography: 'Sans de sistema, clara y neutra',
    hero: 'Texto breve con selector rápido de plan',
    plansLayout: 'Tabla de precios con equivalente mensual',
    bestFor: 'Reducir fricción y acelerar la inscripción',
  },
  {
    id: 'local', number: 5, cover: { bg: '#f6f7f1', fg: '#101010', accent: '#a3e635', fontFamily: "'Trebuchet MS', 'Segoe UI', sans-serif", photo: gym.gallery[4]!.src }, letter: 'E', label: 'Local Performance',
    tagline: 'Identidad de Florencia, Caquetá.',
    description: 'Gimnasio y ciudad como protagonistas: collage de imágenes de referencia que se sustituirán por fotos autorizadas, contacto directo por WhatsApp, redes, ubicación y testimonios por validar.',
    typography: 'Sans humanista cálida, titulares robustos',
    hero: 'Collage de tres fotos reales con barra de WhatsApp',
    plansLayout: 'Tarjetas horizontales en pesos colombianos',
    bestFor: 'Confianza local y contacto inmediato',
  },

  {
    id: 'studio', number: 6, cover: { bg: '#f4f1e9', fg: '#171916', accent: '#a3e635', fontFamily: "Georgia, 'Times New Roman', serif", photo: gym.gallery[2]!.src }, letter: 'F', label: 'Studio',
    tagline: 'Boutique, editorial y cuidadoso.',
    description: 'Estética de estudio boutique, serif editorial, formas suaves y jerarquía visual tranquila para presentar entrenamiento como una experiencia cuidada.',
    typography: 'Serif editorial combinada con sans moderna', hero: 'Titular expresivo y fotografía con marco orgánico', plansLayout: 'Tarjetas limpias con énfasis tipográfico', bestFor: 'Una marca cercana con posicionamiento boutique',
  },
  {
    id: 'motion', number: 7, cover: { bg: '#0b0c12', fg: '#f6f7ff', accent: '#a3e635', fontFamily: "'Arial Black', Arial, sans-serif", photo: gym.gallery[1]!.src }, letter: 'G', label: 'Motion',
    tagline: 'Digital, energético y de alto impacto.',
    description: 'Contraste nocturno, titulares inclinados, acentos de neón y navegación rápida pensada para campañas, retos y conversiones móviles.',
    typography: 'Sans pesada, mayúsculas y cursiva dinámica', hero: 'Composición dividida con sello gráfico superpuesto', plansLayout: 'Tarjetas oscuras con llamadas a la acción fuertes', bestFor: 'Campañas digitales y captación desde móvil',
  },
  {
    id: 'forge', number: 8, cover: { bg: '#171716', fg: '#f4f0e8', accent: '#f06a3f', fontFamily: "Impact, 'Arial Narrow Bold', sans-serif", photo: gym.gallery[4]!.src }, letter: 'H', label: 'Forge',
    tagline: 'Industrial, crudo y contundente.',
    description: 'Paleta carbón y óxido, titulares condensados y divisiones sólidas inspiradas en materiales industriales y trabajo de fuerza.',
    typography: 'Display condensada con sans técnica', hero: 'Titular en mayúsculas y bloque fotográfico vertical', plansLayout: 'Paneles compactos con separadores industriales', bestFor: 'Fuerza, musculación y entrenamiento intenso',
  },
  {
    id: 'zenith', number: 9, cover: { bg: '#edf0e8', fg: '#27382f', accent: '#9bb7a2', fontFamily: "Georgia, 'Times New Roman', serif", photo: gym.gallery[0]!.src }, letter: 'I', label: 'Zenith',
    tagline: 'Equilibrado, natural y sereno.',
    description: 'Verdes suaves, superficies amplias, bordes orgánicos y tono editorial centrado en hábitos sostenibles, bienestar y progreso personal.',
    typography: 'Serif humanista con sans ligera', hero: 'Fotografía vertical con arco y mensaje de bienestar', plansLayout: 'Tarjetas despejadas con jerarquía serena', bestFor: 'Comunicar salud, bienestar y constancia',
  },
  {
    id: 'pulse', number: 10, cover: { bg: '#fff7f0', fg: '#22201e', accent: '#ff745c', fontFamily: "'Trebuchet MS', Arial, sans-serif", photo: gym.gallery[3]!.src }, letter: 'J', label: 'Pulse',
    tagline: 'Social, cálido y comunitario.',
    description: 'Acentos coral, módulos redondeados y lenguaje cercano que pone el foco en pertenencia, clases y contacto inmediato.',
    typography: 'Sans humanista, redondeada y amigable', hero: 'Composición cálida con foto enmarcada y sello coral', plansLayout: 'Tarjetas redondeadas y comparables', bestFor: 'Comunidad, clases y públicos diversos',
  },
];
