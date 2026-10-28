<template>
  <div class="extra" :class="`extra--${variant}`">
    <DemoNotice />
    <header class="extra__nav">
      <a class="extra__brand" href="#extra-home" @click.prevent="go('home')"><span class="extra__mark">E</span><span>EVOLUTION<small>PERFECT GYM · FLORENCIA</small></span></a>
      <button class="extra__menu" type="button" :aria-expanded="menuOpen" aria-controls="extra-links" @click="menuOpen = !menuOpen"><q-icon :name="menuOpen ? 'close' : 'menu'" /></button>
      <nav id="extra-links" class="extra__links" :class="{ 'is-open': menuOpen }" aria-label="Navegación principal">
        <button v-for="s in navItems" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button class="extra__navcta" type="button" @click="emit('enroll', 'monthly')">Ver membresías ↗</button>
      </nav>
    </header>

    <main>
      <section id="extra-home" class="extra__hero" :class="`extra__hero--${variant}`">
        <template v-if="variant === 'studio'">
          <div class="extra__hero-copy"><p class="extra__eyebrow">{{ config.eyebrow }}</p><h2>{{ config.headline }}</h2><p class="extra__lead">{{ config.lead }}</p><div class="extra__actions"><button type="button" class="extra__button" @click="go('plans')">Explorar membresías <span aria-hidden="true">↗</span></button><WhatsAppButton ghost label="Hablar con el gimnasio" /></div><div class="extra__micro"><span>PROPUESTA 06 · ESTUDIO BOUTIQUE</span><span>Entrena con intención</span></div></div>
          <div class="extra__hero-media"><PhotoSlot priority :src="gym.images.hero" alt="Persona entrenando, fotografía de referencia" label="Fotografía de referencia" ratio="4 / 5" /><div class="extra__stamp"><strong>EVOLUCIONA</strong><span>UN ESPACIO PARA TI</span></div></div>
        </template>
        <template v-else-if="variant === 'motion'">
          <div class="extra__hero-media"><PhotoSlot priority :src="gym.images.wide" alt="Entrenamiento de fuerza, fotografía de referencia" label="Acción en movimiento" ratio="3 / 4" /><div class="extra__motion-index">07<span> / 10</span></div></div>
          <div class="extra__hero-copy"><p class="extra__eyebrow">{{ config.eyebrow }}</p><h2>{{ config.headline }}</h2><p class="extra__lead">{{ config.lead }}</p><div class="extra__actions"><button type="button" class="extra__button" @click="go('plans')">Empieza ahora <span aria-hidden="true">↗</span></button><WhatsAppButton ghost label="Consulta" /></div><div class="extra__motion-stats"><span><strong>01</strong> ENERGÍA</span><span><strong>02</strong> RITMO</span><span><strong>03</strong> PROGRESO</span></div></div>
        </template>
        <template v-else-if="variant === 'forge'">
          <div class="extra__hero-media"><PhotoSlot priority :src="gym.images.hero" alt="Zona de fuerza, fotografía de referencia" label="Fotografía de entrenamiento" ratio="16 / 9" /></div>
          <div class="extra__hero-copy"><p class="extra__eyebrow">{{ config.eyebrow }} · PROPUESTA 08</p><h2>{{ config.headline }}</h2><p class="extra__lead">{{ config.lead }}</p><div class="extra__actions"><button type="button" class="extra__button" @click="go('plans')">VER PLANES <span aria-hidden="true">↗</span></button><WhatsAppButton ghost label="Contactar" /></div><div class="extra__forge-note"><strong>DISCIPLINA / TÉCNICA / CONSTANCIA</strong><span>Built one rep at a time.</span></div></div>
        </template>
        <template v-else-if="variant === 'zenith'">
          <div class="extra__zenith-intro"><p class="extra__eyebrow">{{ config.eyebrow }}</p><h2>{{ config.headline }}</h2><p class="extra__lead">{{ config.lead }}</p><div class="extra__actions"><button type="button" class="extra__button" @click="go('plans')">Encuentra tu ritmo <span aria-hidden="true">↗</span></button><WhatsAppButton ghost label="Hablar con el gimnasio" /></div></div>
          <div class="extra__hero-media"><PhotoSlot priority :src="gym.images.about" alt="Entrenamiento y bienestar, fotografía de referencia" label="Fotografía de bienestar" ratio="3 / 4" /><span class="extra__zenith-orbit">MOVE WELL · LIVE WELL</span></div><div class="extra__zenith-foot">PROPUESTA 09 <span>Progreso sostenible, a tu ritmo.</span></div>
        </template>
        <template v-else>
          <div class="extra__hero-copy"><p class="extra__eyebrow">{{ config.eyebrow }} · PROPUESTA 10</p><h2>{{ config.headline }}</h2><p class="extra__lead">{{ config.lead }}</p><div class="extra__actions"><button type="button" class="extra__button" @click="go('plans')">Encuentra tu plan <span aria-hidden="true">↗</span></button><WhatsAppButton ghost label="Escríbenos" /></div><div class="extra__pulse-people"><span>ENTRENA</span><span>COMPARTE</span><span>EVOLUCIONA</span></div></div>
          <div class="extra__hero-media extra__hero-media--collage"><PhotoSlot priority :src="gym.images.hero" alt="Persona entrenando, fotografía de referencia" label="Entrenamiento" ratio="4 / 5" /><div class="extra__pulse-tile"><PhotoSlot :src="gym.images.about" alt="Zona de gimnasio, fotografía de referencia" label="Comunidad" ratio="1 / 1" /><strong>JUNTOS<br />ES MEJOR.</strong></div><div class="extra__stamp"><strong>SOMOS EQUIPO</strong><span>FLORENCIA · CAQUETÁ</span></div></div>
        </template>
      </section>

      <section id="extra-services" class="extra__services extra__section">
        <div class="extra__sectionhead"><p class="extra__eyebrow">HECHO PARA TU PROGRESO</p><h3>{{ config.servicesTitle }}</h3><p>Una experiencia clara para conocer los espacios y elegir cómo quieres entrenar.</p></div>
        <div class="extra__servicegrid"><article v-for="(s, i) in gym.services" :key="s.id" class="extra__service"><span class="extra__service-num">0{{ i + 1 }}</span><q-icon :name="s.icon" size="30px" aria-hidden="true"/><h4>{{ s.title }}</h4><p>{{ s.description }}</p></article></div>
      </section>

      <section id="extra-plans" class="extra__plans extra__section" :class="`extra__plans--${variant}`">
        <div class="extra__sectionhead"><p class="extra__eyebrow">MEMBRESÍAS · VALORES DE REFERENCIA</p><h3>{{ config.plansTitle }}</h3><p>Valores recuperados de la copia de base de datos ATPGYM. Deben validarse con el gimnasio antes de publicarse como precios vigentes.</p></div>
        <div v-if="variant === 'studio'" class="extra__studio-planlist"><article v-for="(p, i) in gym.plans" :key="p.id" class="extra__studio-plan"><span class="extra__plan-no">0{{ i + 1 }}</span><div class="extra__studio-plan-name"><h4>{{ p.name }}</h4><p>{{ p.durationLabel }} · {{ p.benefits[0] }}</p></div><div class="extra__studio-plan-price"><PlanPrice :plan="p" /><small>Precio de referencia</small></div><button type="button" class="extra__button" @click="emit('enroll', p.id)">Seleccionar ↗</button></article></div>
        <div v-else-if="variant === 'motion'" class="extra__motion-plans"><article v-for="(p, i) in gym.plans" :key="p.id" class="extra__plan extra__motion-plan" :class="{ 'is-highlight': p.highlight }"><span class="extra__motion-plan-no">0{{ i + 1 }} / MEMBRESÍA</span><h4>{{ p.name }}</h4><p class="extra__months">{{ p.durationLabel }}</p><div class="extra__price"><PlanPrice :plan="p" /></div><ul><li v-for="b in p.benefits.slice(0, 2)" :key="b">✓ {{ b }}</li></ul><button type="button" class="extra__button extra__button--full" @click="emit('enroll', p.id)">Elegir plan ↗</button></article></div>
        <div v-else-if="variant === 'forge'" class="extra__forge-planlist"><article v-for="(p, i) in gym.plans" :key="p.id" class="extra__forge-plan"><span class="extra__forge-num">0{{ i + 1 }}</span><div><p class="extra__eyebrow">{{ p.durationLabel }} DE ENTRENAMIENTO</p><h4>{{ p.name }}</h4><p>{{ p.benefits[0] }}</p></div><strong class="extra__forge-price"><PlanPrice :plan="p" /></strong><button type="button" class="extra__button" @click="emit('enroll', p.id)">SELECCIONAR +</button></article></div>
        <div v-else-if="variant === 'zenith'" class="extra__zenith-planlist"><article v-for="p in gym.plans" :key="p.id" class="extra__zenith-plan"><div class="extra__zenith-dot" aria-hidden="true"></div><div class="extra__zenith-detail"><h4>{{ p.name }}</h4><p>{{ p.durationLabel }} · {{ p.benefits[0] }}</p></div><div class="extra__zenith-price"><PlanPrice :plan="p" /><small>Valor en base de referencia</small></div><button type="button" class="extra__button" @click="emit('enroll', p.id)">Continuar</button></article></div>
        <div v-else class="extra__pulse-plans"><article v-for="(p, i) in gym.plans" :key="p.id" class="extra__pulse-plan" :class="`extra__pulse-plan--${i + 1}`"><div class="extra__pulse-plan-head"><span>PLAN 0{{ i + 1 }}</span><span v-if="p.highlight">MÁS ELEGIDO EN ESTA DEMO</span></div><h4>{{ p.name }}</h4><p class="extra__months">{{ p.durationLabel }} para avanzar a tu manera</p><div class="extra__price"><PlanPrice :plan="p" /></div><ul><li v-for="b in p.benefits.slice(0, 2)" :key="b">✓ {{ b }}</li></ul><button type="button" class="extra__button extra__button--full" @click="emit('enroll', p.id)">Me interesa ↗</button></article></div>
        <p class="extra__disclaimer">* La base contiene servicios con distintos alcances y condiciones. Los beneficios resumidos aquí son descriptivos y deben confirmarse. El checkout es una simulación y no realiza cobros.</p>
      </section>

      <section id="extra-about" class="extra__about extra__section"><div class="extra__about-image"><PhotoSlot :src="gym.images.about" alt="Zona de entrenamiento, fotografía de referencia" label="Agregar fotografía real del gimnasio" ratio="5 / 4" /></div><div class="extra__about-copy"><p class="extra__eyebrow">{{ config.aboutKicker }}</p><h3>{{ config.aboutTitle }}</h3><p>Evolution Perfect Gym acompaña tu proceso de entrenamiento en Florencia, Caquetá. Esta propuesta prioriza una experiencia digital coherente, fácil de recorrer y adaptable a cualquier pantalla.</p><div class="extra__facts"><div><strong>01</strong><span>Objetivos claros</span></div><div><strong>02</strong><span>Planes comparables</span></div><div><strong>03</strong><span>Contacto directo</span></div></div><ScheduleList /></div></section>

      <section id="extra-gallery" class="extra__gallery extra__section"><div class="extra__sectionhead"><p class="extra__eyebrow">EL ESPACIO EN IMÁGENES</p><h3>{{ config.galleryTitle }}</h3><p>Las imágenes actuales son referencias de stock; deben sustituirse por fotografías autorizadas del gimnasio.</p></div><GalleryViewer :variant="variant === 'motion' ? 'rail' : 'mosaic'" /></section>

      <section id="extra-team" class="extra__team extra__section"><div class="extra__sectionhead"><p class="extra__eyebrow">ACOMPAÑAMIENTO</p><h3>Personas que te ayudan a avanzar</h3><p>Retratos de stock usados únicamente como referencia visual; no representan al equipo real del gimnasio.</p></div><div class="extra__teamgrid"><article v-for="t in gym.trainers" :key="t.id" class="extra__trainer"><PhotoSlot :src="t.photo" :alt="`Entrenador de referencia para ${t.role}`" label="Retrato de stock" ratio="3 / 4" /><div class="extra__trainer-info"><h4>{{ t.name }}</h4><p>{{ t.role }}</p><small>Imagen ilustrativa · reemplazar por retrato autorizado</small></div></article></div></section>

      <section id="extra-social" class="extra__quote extra__section"><p class="extra__eyebrow">TU PRÓXIMO PASO EMPIEZA AQUÍ</p><h3>La constancia se construye una sesión a la vez.</h3><p>Conoce los planes, resuelve tus dudas y encuentra la opción que se adapte a tus objetivos.</p><button type="button" class="extra__button" @click="go('plans')">Encuentra tu plan ↗</button></section>

      <section id="extra-faq" class="extra__section extra__faq"><div class="extra__sectionhead"><p class="extra__eyebrow">RESPUESTAS CLARAS</p><h3>Preguntas frecuentes</h3></div><FaqList /></section>

      <section id="extra-contact" class="extra__contact extra__section"><div><p class="extra__eyebrow">¿HABLAMOS?</p><h3>Da el siguiente paso.</h3><p>{{ gym.contact.address }}</p><p>{{ gym.contact.hours }}</p><WhatsAppButton label="Consultar por WhatsApp" /></div><div class="extra__contact-actions"><button type="button" class="extra__button" @click="emit('enroll', null)">Probar inscripción (demo)</button><a :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Ver ubicación en mapas ↗</a></div></section>
    </main>
    <footer class="extra__footer"><span>EVOLUTION PERFECT GYM</span><span>Florencia, Caquetá · Sitio conceptual de demostración</span><a href="#extra-home" @click.prevent="go('home')">Volver arriba ↑</a></footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { PlanId } from 'src/types/gym';
import gym from 'src/data/gym';
import DemoNotice from 'src/components/shared/DemoNotice.vue';
import WhatsAppButton from 'src/components/shared/WhatsAppButton.vue';
import PlanPrice from 'src/components/shared/PlanPrice.vue';
import PhotoSlot from 'src/components/shared/PhotoSlot.vue';
import ScheduleList from 'src/components/shared/ScheduleList.vue';
import GalleryViewer from 'src/components/shared/GalleryViewer.vue';
import FaqList from 'src/components/shared/FaqList.vue';

const props = defineProps<{ variant: 'studio' | 'motion' | 'forge' | 'zenith' | 'pulse' }>();
const emit = defineEmits<{ enroll: [planId: PlanId | null] }>();
const menuOpen = ref(false);
const navItems = [{ id: 'services', label: 'Experiencia' }, { id: 'plans', label: 'Membresías' }, { id: 'about', label: 'El gimnasio' }, { id: 'gallery', label: 'Galería' }, { id: 'contact', label: 'Contacto' }];
const configs = {
  studio: { eyebrow: 'ENTRENAMIENTO CON INTENCIÓN', headline: 'Haz espacio para tu mejor versión.', lead: 'Una experiencia boutique que une disciplina, bienestar y atención al detalle.', stamp: 'EVOLUCIONA', servicesTitle: 'Tu espacio para crecer.', plansTitle: 'Elige tu ritmo.', aboutKicker: 'EL VALOR ESTÁ EN EL PROCESO', aboutTitle: 'Entrenar también es cuidarte.', galleryTitle: 'Una mirada al entrenamiento.' },
  motion: { eyebrow: 'READY. SET. EVOLVE.', headline: 'Activa tu energía. Cambia el ritmo.', lead: 'Una experiencia digital dinámica, diseñada para convertir la motivación en acción.', stamp: 'GO BEYOND', servicesTitle: 'Activa cada zona.', plansTitle: 'Elige tu siguiente nivel.', aboutKicker: 'MODO EVOLUCIÓN: ON', aboutTitle: 'Tu progreso, en movimiento.', galleryTitle: 'Así se siente el movimiento.' },
  forge: { eyebrow: 'BUILT BY DISCIPLINE', headline: 'El trabajo habla por ti.', lead: 'Estética industrial, carácter fuerte y una ruta directa para comenzar a entrenar.', stamp: 'NO SHORTCUTS', servicesTitle: 'Herramientas para construir fuerza.', plansTitle: 'Invierte en tu trabajo.', aboutKicker: 'LA FUERZA SE CONSTRUYE', aboutTitle: 'Un día a la vez. Una repetición a la vez.', galleryTitle: 'El espacio de trabajo.' },
  zenith: { eyebrow: 'FUERZA EN EQUILIBRIO', headline: 'Encuentra tu propio punto de equilibrio.', lead: 'Un lenguaje visual sereno donde el rendimiento y el bienestar conviven.', stamp: 'MOVE WELL', servicesTitle: 'Entrena a tu manera.', plansTitle: 'Un plan que encaja contigo.', aboutKicker: 'PROGRESO SOSTENIBLE', aboutTitle: 'Tu bienestar también cuenta.', galleryTitle: 'Espacios para enfocarte.' },
  pulse: { eyebrow: 'LA ENERGÍA SE COMPARTE', headline: 'Entrenamos mejor cuando avanzamos juntos.', lead: 'Una propuesta cercana y social que pone en primer plano las personas y la comunidad.', stamp: 'SOMOS EQUIPO', servicesTitle: 'Encuentra tu comunidad.', plansTitle: 'Tu próxima etapa empieza aquí.', aboutKicker: 'UN GIMNASIO, MUCHAS HISTORIAS', aboutTitle: 'Cada persona tiene su propio objetivo.', galleryTitle: 'Momentos de la comunidad.' },
};
const config = computed(() => configs[props.variant]);
function go(id: string): void {
  menuOpen.value = false;
  const targetId = id === 'home' ? 'extra-home' : `extra-${id}`;
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
</script>

<style scoped>
.extra { --x-bg:#f4f1e9; --x-fg:#171916; --x-accent:#a3e635; --x-muted:#666a61; --x-card:#fffdf8; --x-line:rgba(23,25,22,.16); color:var(--x-fg); background:var(--x-bg); font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif; line-height:1.55; overflow:hidden; }
.extra--motion { --x-bg:#0b0c12; --x-fg:#f6f7ff; --x-accent:#a3e635; --x-muted:#b5b8c4; --x-card:#151722; --x-line:#303343; }
.extra--forge { --x-bg:#171716; --x-fg:#f4f0e8; --x-accent:#f06a3f; --x-muted:#b4b0a8; --x-card:#222220; --x-line:#44413b; }
.extra--zenith { --x-bg:#edf0e8; --x-fg:#27382f; --x-accent:#9bb7a2; --x-muted:#67766c; --x-card:#fafbf7; --x-line:#d2dbd1; }
.extra--pulse { --x-bg:#fff7f0; --x-fg:#22201e; --x-accent:#ff745c; --x-muted:#706a66; --x-card:#fff; --x-line:#eadbd2; }
.extra__nav { display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:1rem clamp(1rem,4vw,4rem); border-bottom:1px solid var(--x-line); background:var(--x-bg); position:relative; z-index:3; }
.extra__brand { display:flex; align-items:center; gap:.7rem; color:inherit; text-decoration:none; font-size:.85rem; font-weight:900; letter-spacing:.12em; }
.extra__brand small { display:block; margin-top:.15rem; color:var(--x-muted); font-size:.62rem; letter-spacing:.13em; }
.extra__mark { display:grid; place-items:center; width:42px; height:42px; background:var(--x-accent); color:#171916; font-size:1.5rem; font-weight:950; }
.extra__links { display:flex; align-items:center; gap:clamp(.6rem,1.5vw,1.5rem); }
.extra__links button,.extra__menu { border:0; background:transparent; color:inherit; cursor:pointer; font:inherit; font-size:.86rem; padding:.6rem .3rem; }
.extra__links button:hover,.extra__links button:focus-visible { text-decoration:underline; text-decoration-color:var(--x-accent); text-underline-offset:5px; }
.extra__links .extra__navcta { padding:.75rem 1rem; background:var(--x-accent); color:#171916; font-weight:800; }
.extra__menu { display:none; font-size:1.4rem; }
.extra__hero { display:grid; grid-template-columns:1.05fr .95fr; min-height:610px; padding:clamp(2rem,5vw,5rem) clamp(1rem,6vw,6rem); gap:clamp(2rem,6vw,6rem); align-items:center; }
.extra__hero-copy { max-width:700px; }
.extra__eyebrow { margin:0 0 1rem; color:var(--x-muted); font-size:.75rem; font-weight:850; letter-spacing:.17em; text-transform:uppercase; }
.extra__hero h2 { margin:0; max-width:12ch; font-size:clamp(3rem,6.3vw,6.4rem); font-weight:900; letter-spacing:-.065em; line-height:.97; }
.extra--studio .extra__hero h2,.extra--zenith .extra__hero h2 { font-family:Georgia,"Times New Roman",serif; font-weight:500; letter-spacing:-.05em; }
.extra--motion .extra__hero h2 { text-transform:uppercase; font-style:italic; }
.extra--forge .extra__hero h2 { text-transform:uppercase; font-family:Impact,"Arial Narrow Bold",sans-serif; letter-spacing:-.025em; }
.extra--pulse .extra__hero h2 { max-width:13ch; }
.extra__lead { max-width:48ch; margin:1.5rem 0; color:var(--x-muted); font-size:clamp(1rem,1.5vw,1.2rem); }
.extra__actions { display:flex; flex-wrap:wrap; align-items:center; gap:.75rem; }
.extra__button { display:inline-flex; align-items:center; justify-content:center; gap:.7rem; min-height:48px; padding:.85rem 1.15rem; border:1px solid var(--x-accent); background:var(--x-accent); color:#171916; text-decoration:none; font:inherit; font-size:.9rem; font-weight:850; cursor:pointer; transition:transform .2s ease,filter .2s ease; }
.extra__button:hover { transform:translateY(-2px); filter:brightness(1.04); }
.extra__button:focus-visible,.extra__links button:focus-visible,.extra__menu:focus-visible { outline:3px solid var(--x-accent); outline-offset:3px; }
.extra__micro { display:flex; justify-content:space-between; gap:1rem; margin-top:3.2rem; padding-top:1rem; border-top:1px solid var(--x-line); color:var(--x-muted); font-size:.72rem; letter-spacing:.08em; text-transform:uppercase; }
.extra__hero-media { position:relative; max-width:520px; width:100%; justify-self:end; }
.extra__hero-media :deep(.photo) { min-height:400px; border-radius:var(--x-radius,0); }
.extra--studio .extra__hero-media :deep(.photo) { border-radius:48% 48% 3px 3px; }
.extra--zenith .extra__hero-media :deep(.photo) { border-radius:180px 180px 4px 4px; }
.extra--pulse .extra__hero-media :deep(.photo) { border-radius:24px; }
.extra__stamp { position:absolute; bottom:1.25rem; left:-2rem; display:grid; gap:.3rem; padding:1.1rem 1.3rem; background:var(--x-accent); color:#171916; box-shadow:0 10px 30px #0002; transform:rotate(-3deg); }
.extra__stamp strong { font-size:1.3rem; line-height:1; }
.extra__stamp span { font-size:.55rem; font-weight:800; letter-spacing:.12em; }
.extra__section { padding:clamp(3rem,7vw,6rem) clamp(1rem,6vw,6rem); scroll-margin-top:1rem; }
.extra__sectionhead { max-width:740px; margin-bottom:2rem; }
.extra__sectionhead h3,.extra__about h3,.extra__quote h3,.extra__contact h3 { margin:0 0 1rem; font-size:clamp(2rem,4vw,4rem); font-weight:850; line-height:1.04; letter-spacing:-.045em; }
.extra--studio .extra__sectionhead h3,.extra--zenith .extra__sectionhead h3,.extra--studio .extra__about h3,.extra--zenith .extra__about h3 { font-family:Georgia,"Times New Roman",serif; font-weight:500; }
.extra__sectionhead>p:last-child,.extra__about-copy>p:not(.extra__eyebrow),.extra__quote>p:not(.extra__eyebrow),.extra__contact>div>p { color:var(--x-muted); max-width:60ch; }
.extra__servicegrid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); border-top:1px solid var(--x-line); border-bottom:1px solid var(--x-line); }
.extra__service { padding:1.5rem 1.2rem; border-right:1px solid var(--x-line); }
.extra__service:last-child { border-right:0; }
.extra__service-num { display:block; color:var(--x-accent); font-size:.75rem; font-weight:900; margin-bottom:1.5rem; }
.extra__service :deep(.q-icon) { color:var(--x-accent); }
.extra__service h4 { margin:.8rem 0 .4rem; font-size:1.1rem; }
.extra__service p { margin:0; color:var(--x-muted); font-size:.9rem; }
.extra__plans { background:color-mix(in srgb,var(--x-bg) 88%,var(--x-fg)); }
.extra__plangrid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1rem; align-items:stretch; }
.extra__plan { display:flex; flex-direction:column; min-width:0; padding:1.3rem; background:var(--x-card); border:1px solid var(--x-line); }
.extra__plan.is-highlight { border:2px solid var(--x-accent); transform:translateY(-8px); }
.extra__plan-top { display:flex; flex-wrap:wrap; justify-content:space-between; gap:.5rem; color:var(--x-muted); font-size:.75rem; }
.extra__recommended { color:var(--x-fg); font-size:.62rem; font-weight:850; }
.extra__plan h4 { margin:1.3rem 0 .25rem; font-size:1.45rem; }
.extra__months { margin:0; color:var(--x-muted); font-size:.85rem; }
.extra__price { margin:1.3rem 0; font-size:1.35rem; }
.extra__plan ul { flex:1; display:grid; gap:.65rem; margin:0 0 1.5rem; padding:0; list-style:none; color:var(--x-muted); font-size:.88rem; }
.extra__plan li { display:flex; gap:.4rem; align-items:flex-start; }
.extra__plan li :deep(.q-icon) { color:var(--x-accent); flex:none; margin-top:.2rem; }
.extra__button--full { width:100%; margin-top:auto; }
.extra__disclaimer { margin:1.5rem 0 0; color:var(--x-muted); font-size:.75rem; }
.extra__about { display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:clamp(2rem,7vw,7rem); }
.extra__about-image :deep(.photo) { min-height:300px; }
.extra__about-copy h3 { max-width:13ch; }
.extra__facts { display:grid; grid-template-columns:repeat(3,1fr); gap:.75rem; margin:2rem 0; }
.extra__facts div { display:grid; gap:.2rem; padding-top:.8rem; border-top:2px solid var(--x-accent); }
.extra__facts strong { font-size:1.5rem; }
.extra__facts span { color:var(--x-muted); font-size:.75rem; }
.extra__about-copy :deep(.sch) { margin-top:1.5rem; font-size:.86rem; }
.extra__gallery { background:var(--x-card); }
.extra__gallery :deep(.gal--mosaic) { grid-auto-rows:clamp(120px,17vw,220px); }
.extra__teamgrid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; }
.extra__trainer { display:flex; align-items:center; gap:1rem; padding:1rem; border:1px solid var(--x-line); background:var(--x-card); }
.extra__avatar { display:grid; place-items:center; flex:none; width:68px; aspect-ratio:1; border-radius:50%; background:var(--x-accent); color:#171916; font-weight:900; font-size:1.25rem; }
.extra__trainer h4 { margin:0; font-size:1rem; }
.extra__trainer p { margin:.2rem 0; color:var(--x-muted); font-size:.82rem; }
.extra__trainer small { color:var(--x-muted); font-size:.7rem; }
.extra__quote { background:var(--x-accent); color:#171916; text-align:center; }
.extra__quote .extra__eyebrow,.extra__quote>p:not(.extra__eyebrow) { color:#171916; }
.extra__quote h3 { max-width:18ch; margin-inline:auto; }
.extra__quote>p:not(.extra__eyebrow) { margin-inline:auto; }
.extra__quote .extra__button { background:#171916; color:white; border-color:#171916; }
.extra__faq { max-width:1000px; margin:auto; }
.extra__faq :deep(.faq__item) { --c-card:var(--x-card); --c-fg:var(--x-fg); --c-line:var(--x-line); --c-muted:var(--x-muted); }
.extra__contact { display:flex; align-items:center; justify-content:space-between; gap:2rem; background:var(--x-card); border-top:1px solid var(--x-line); }
.extra__contact h3 { max-width:12ch; }
.extra__contact-actions { display:grid; gap:1rem; justify-items:start; }
.extra__contact-actions a { color:var(--x-fg); font-weight:700; }
.extra__footer { display:flex; flex-wrap:wrap; justify-content:space-between; gap:1rem; padding:1.3rem clamp(1rem,4vw,4rem); background:#101010; color:#f5f5f5; font-size:.72rem; }
.extra__footer span:first-child { font-weight:900; letter-spacing:.12em; }
.extra__footer a { color:#a3e635; }

/* Cada una de las cinco propuestas adicionales tiene una composición distinta, no solo otra paleta. */
.extra__hero--studio { grid-template-columns:1fr .78fr; min-height:650px; }
.extra__hero--studio .extra__hero-copy { padding-left:clamp(1rem,7vw,7rem); }
.extra__hero--studio .extra__micro { letter-spacing:.12em; }
.extra__hero--motion { grid-template-columns:.82fr 1.18fr; gap:clamp(1.5rem,5vw,5rem); background:radial-gradient(circle at 15% 80%,#20253b,transparent 42%),var(--x-bg); }
.extra__hero--motion .extra__hero-media { justify-self:stretch; max-width:none; align-self:stretch; min-height:520px; }
.extra__hero--motion .extra__hero-media :deep(.photo) { height:100%; min-height:520px; border:1px solid #34384a; transform:skewY(-2deg); }
.extra__motion-index { position:absolute; right:-1rem; top:1.5rem; padding:1rem; background:var(--x-accent); color:#111; font-size:2rem; font-weight:950; }
.extra__motion-index span { font-size:.7rem; }
.extra__motion-stats { display:flex; flex-wrap:wrap; gap:1.2rem; margin-top:2.5rem; padding-top:1rem; border-top:1px solid var(--x-line); }
.extra__motion-stats span { display:grid; gap:.2rem; color:var(--x-muted); font-size:.63rem; letter-spacing:.12em; }
.extra__motion-stats strong { color:var(--x-accent); font-size:1.2rem; }
.extra__hero--forge { position:relative; display:flex; min-height:690px; align-items:flex-end; padding:0; background:#111; isolation:isolate; }
.extra__hero--forge .extra__hero-media { position:absolute; inset:0; z-index:-2; max-width:none; width:100%; }
.extra__hero--forge .extra__hero-media :deep(.photo) { min-height:100%; height:100%; opacity:.52; }
.extra__hero--forge::after { content:""; position:absolute; inset:0; z-index:-1; background:linear-gradient(90deg,#10100f 0%,rgba(16,16,15,.82) 45%,rgba(16,16,15,.08) 100%),linear-gradient(0deg,rgba(16,16,15,.75),transparent 55%); pointer-events:none; }
.extra__hero--forge .extra__hero-copy { max-width:850px; padding:clamp(2rem,8vw,7rem); }
.extra__hero--forge .extra__eyebrow { color:var(--x-accent); }
.extra__forge-note { display:flex; flex-wrap:wrap; gap:1rem; justify-content:space-between; margin-top:2.5rem; padding-top:1rem; border-top:2px solid var(--x-accent); font-size:.7rem; letter-spacing:.12em; }
.extra__forge-note span { color:var(--x-muted); }
.extra__hero--zenith { grid-template-columns:1fr .8fr; grid-template-rows:auto auto; gap:1rem 4rem; min-height:680px; }
.extra__zenith-intro { max-width:700px; align-self:end; padding-left:clamp(0rem,4vw,4rem); }
.extra__zenith-intro h2 { font-family:Georgia,"Times New Roman",serif; font-weight:500; }
.extra__hero--zenith .extra__hero-media { grid-column:2; grid-row:1 / span 2; align-self:center; justify-self:center; max-width:390px; }
.extra__hero--zenith .extra__hero-media :deep(.photo) { border-radius:48% 48% 8px 8px; min-height:440px; }
.extra__zenith-orbit { display:block; margin:.75rem auto 0; text-align:center; font-size:.65rem; letter-spacing:.2em; }
.extra__zenith-foot { grid-column:1; display:flex; gap:1rem; align-items:center; border-top:1px solid var(--x-line); padding:1rem clamp(0rem,4vw,4rem); color:var(--x-muted); font-size:.68rem; letter-spacing:.12em; }
.extra__zenith-foot span { font-size:.9rem; letter-spacing:normal; }
.extra__hero--pulse { grid-template-columns:1fr 1fr; min-height:680px; }
.extra__hero--pulse .extra__hero-copy { padding:clamp(1rem,3vw,3rem); }
.extra__pulse-people { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:2rem; }
.extra__pulse-people span { padding:.45rem .7rem; border:1px solid var(--x-line); border-radius:999px; font-size:.66rem; font-weight:900; letter-spacing:.1em; }
.extra__hero-media--collage { display:grid; grid-template-columns:1fr .72fr; align-items:center; gap:.7rem; max-width:600px; }
.extra__hero-media--collage > :deep(.photo) { min-height:430px; border-radius:24px; }
.extra__pulse-tile { align-self:end; display:grid; gap:.7rem; padding:.6rem; background:var(--x-accent); border-radius:20px; color:#211c1a; transform:translateY(2rem); }
.extra__pulse-tile :deep(.photo) { min-height:130px; border-radius:14px; }
.extra__pulse-tile strong { font-size:1.15rem; line-height:1.05; }
.extra__hero--pulse .extra__stamp { left:auto; right:18%; bottom:-.5rem; transform:rotate(3deg); }
.extra__plans--studio .extra__studio-planlist { border-top:1px solid var(--x-line); }
.extra__studio-plan { display:grid; grid-template-columns:50px 1fr minmax(150px,.5fr) auto; align-items:center; gap:1.5rem; padding:1.4rem .4rem; border-bottom:1px solid var(--x-line); }
.extra__plan-no { color:var(--x-accent); font-size:.8rem; font-weight:900; }
.extra__studio-plan-name h4,.extra__zenith-plan h4 { margin:0; font-size:1.2rem; }
.extra__studio-plan-name p,.extra__zenith-plan p { margin:.35rem 0 0; color:var(--x-muted); font-size:.85rem; }
.extra__studio-plan-price { display:grid; gap:.3rem; }
.extra__studio-plan-price small,.extra__zenith-price small { color:var(--x-muted); font-size:.65rem; }
.extra__plans--motion .extra__sectionhead { max-width:900px; }
.extra__motion-plans { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.8rem; }
.extra__motion-plan { border-radius:4px; min-height:330px; transform:skewY(-1deg); }
.extra__motion-plan:nth-child(even) { transform:skewY(1deg) translateY(1rem); }
.extra__motion-plan h4 { font-size:1.15rem; }
.extra__motion-plan-no { color:var(--x-accent); font-size:.62rem; font-weight:900; letter-spacing:.12em; }
.extra__plans--forge .extra__sectionhead { border-left:5px solid var(--x-accent); padding-left:1.25rem; }
.extra__forge-planlist { border-top:2px solid var(--x-accent); }
.extra__forge-plan { display:grid; grid-template-columns:60px 1fr minmax(160px,.45fr) auto; align-items:center; gap:1rem; padding:1.2rem .75rem; border-bottom:1px solid var(--x-line); }
.extra__forge-num { color:var(--x-accent); font-family:Impact,"Arial Narrow Bold",sans-serif; font-size:2rem; }
.extra__forge-plan h4 { margin:.1rem 0; text-transform:uppercase; font-size:1.3rem; }
.extra__forge-plan p:not(.extra__eyebrow) { color:var(--x-muted); font-size:.8rem; }
.extra__forge-plan .extra__eyebrow { margin:0; color:var(--x-accent); font-size:.6rem; }
.extra__forge-price { font-size:1.2rem; }
.extra__plans--zenith .extra__sectionhead { margin-inline:auto; text-align:center; }
.extra__zenith-planlist { max-width:920px; margin:auto; border-top:1px solid var(--x-line); }
.extra__zenith-plan { display:grid; grid-template-columns:20px 1fr minmax(150px,.5fr) auto; align-items:center; gap:1.25rem; padding:1.4rem .75rem; border-bottom:1px solid var(--x-line); }
.extra__zenith-dot { width:12px; height:12px; border:1px solid var(--x-accent); border-radius:50%; box-shadow:0 0 0 5px color-mix(in srgb,var(--x-accent) 22%,transparent); }
.extra__zenith-price { display:grid; gap:.3rem; }
.extra__plans--pulse .extra__sectionhead { max-width:820px; }
.extra__pulse-plans { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }
.extra__pulse-plan { padding:1.5rem; border:1px solid var(--x-line); border-radius:22px; background:var(--x-card); box-shadow:0 8px 0 rgba(34,32,30,.05); }
.extra__pulse-plan--2 { background:#fff0e8; }
.extra__pulse-plan--3 { background:#f8f3d9; }
.extra__pulse-plan--4 { background:#e8f4e9; }
.extra__pulse-plan-head { display:flex; justify-content:space-between; gap:.6rem; color:var(--x-muted); font-size:.62rem; font-weight:900; letter-spacing:.08em; }
.extra__pulse-plan h4 { margin:1.4rem 0 .2rem; font-size:1.5rem; }
.extra__pulse-plan ul { display:grid; gap:.5rem; margin:1rem 0 1.5rem; color:var(--x-muted); font-size:.82rem; }
.extra__plans .extra__button { color:#171916 !important; }
.extra__quote .extra__button { color:#fff !important; background:#171916; border-color:#171916; }
.extra__button:disabled { opacity:.6; cursor:not-allowed; }
.extra__button:focus-visible { outline:3px solid var(--x-fg); outline-offset:3px; }
.extra__trainer { display:block; padding:0; overflow:hidden; }
.extra__trainer :deep(.photo) { height:210px; min-height:210px; }
.extra__trainer-info { padding:1rem; }
.extra__trainer-info h4 { margin:0; font-size:1rem; }
.extra__trainer-info p { margin:.2rem 0; color:var(--x-muted); font-size:.82rem; }
.extra__trainer-info small { color:var(--x-muted); font-size:.68rem; }

@media(max-width:900px) { .extra__hero { grid-template-columns:1fr 0.8fr; gap:2rem; padding-inline:1.5rem; } .extra__hero h2 { font-size:clamp(2.7rem,7vw,4.6rem); } .extra__plangrid { grid-template-columns:repeat(2,minmax(0,1fr)); } .extra__plan.is-highlight { transform:none; } .extra__servicegrid { grid-template-columns:repeat(2,minmax(0,1fr)); } .extra__service:nth-child(2) { border-right:0; } .extra__service:nth-child(-n+2) { border-bottom:1px solid var(--x-line); } .extra__teamgrid { grid-template-columns:1fr; } }
@media(max-width:640px) { .extra__nav { padding:.8rem 1rem; } .extra__menu { display:block; } .extra__links { display:none; position:absolute; top:100%; left:0; right:0; padding:1rem; background:var(--x-bg); border-bottom:1px solid var(--x-line); align-items:stretch; flex-direction:column; box-shadow:0 12px 24px #0002; } .extra__links.is-open { display:flex; } .extra__links button { text-align:left; padding:.7rem; } .extra__hero { grid-template-columns:1fr; padding:3rem 1rem 2rem; gap:2rem; } .extra__hero h2 { max-width:11ch; font-size:clamp(3rem,14vw,4.5rem); } .extra__hero-media { width:88%; justify-self:center; } .extra__hero-media :deep(.photo) { min-height:280px; } .extra__stamp { left:-1rem; } .extra__micro { margin-top:2rem; font-size:.62rem; } .extra__section { padding:3rem 1rem; } .extra__sectionhead h3,.extra__about h3,.extra__quote h3,.extra__contact h3 { font-size:2.25rem; } .extra__plangrid { grid-template-columns:1fr; } .extra__servicegrid { grid-template-columns:1fr 1fr; } .extra__service { padding:1rem .75rem; } .extra__about { grid-template-columns:1fr; gap:2rem; } .extra__facts { gap:.4rem; } .extra__teamgrid { gap:.6rem; } .extra__contact { align-items:flex-start; flex-direction:column; } .extra__footer { flex-direction:column; } }
@media(max-width:900px) {
  .extra__motion-plans { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .extra__forge-plan { grid-template-columns:42px 1fr; }
  .extra__forge-price { grid-column:2; }
  .extra__forge-plan > .extra__button { grid-column:2; justify-self:start; }
  .extra__studio-plan { grid-template-columns:35px 1fr minmax(120px,.5fr); }
  .extra__studio-plan > .extra__button { grid-column:2 / -1; justify-self:start; }
  .extra__zenith-plan { grid-template-columns:18px 1fr minmax(120px,.5fr); }
  .extra__zenith-plan > .extra__button { grid-column:2 / -1; justify-self:start; }
}
@media(max-width:640px) {
  .extra__hero--motion { grid-template-columns:1fr; }
  .extra__hero--motion .extra__hero-media { min-height:300px; }
  .extra__hero--motion .extra__hero-media :deep(.photo) { min-height:300px; }
  .extra__hero--forge { min-height:620px; }
  .extra__hero--forge .extra__hero-copy { padding:2rem 1rem; }
  .extra__hero--zenith { grid-template-columns:1fr; }
  .extra__hero--zenith .extra__hero-media { grid-column:1; grid-row:auto; max-width:290px; }
  .extra__zenith-foot { grid-column:1; flex-wrap:wrap; }
  .extra__hero--pulse { grid-template-columns:1fr; }
  .extra__hero-media--collage { width:88%; }
  .extra__pulse-tile { transform:translateY(1rem); }
  .extra__studio-plan { grid-template-columns:26px 1fr; gap:.75rem; }
  .extra__studio-plan-price { grid-column:2; }
  .extra__studio-plan > .extra__button { grid-column:2; }
  .extra__motion-plans,.extra__pulse-plans { grid-template-columns:1fr; }
  .extra__motion-plan,.extra__motion-plan:nth-child(even) { transform:none; }
  .extra__zenith-plan { grid-template-columns:16px 1fr; gap:.8rem; }
  .extra__zenith-price { grid-column:2; }
  .extra__zenith-plan > .extra__button { grid-column:2; }
  .extra__forge-plan { padding-inline:0; }
  .extra__trainer :deep(.photo) { height:260px; min-height:260px; }
}

@media(prefers-reduced-motion:reduce) { .extra__button { transition:none; } }
</style>
