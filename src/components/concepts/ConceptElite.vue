<template>
  <div class="site elite">
    <DemoNotice />
    <header class="elite__bar">
      <button type="button" class="elite__brand" @click="go('inicio')">Evolution Perfect Gym</button>
      <button type="button" class="sburger" :aria-expanded="menuOpen" aria-controls="elite-menu" aria-label="Menú de navegación" @click="menuOpen = !menuOpen">
        <q-icon :name="menuOpen ? 'close' : 'menu'" aria-hidden="true" />
      </button>
      <nav id="elite-menu" class="snav elite__nav" :class="{ open: menuOpen }" aria-label="Principal">
        <button v-for="s in sections" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button type="button" class="cx-btn" @click="emit('enroll', 'monthly')">Paga tu mensualidad</button>
      </nav>
    </header>

    <section id="elite-inicio" class="elite__hero sec">
      <div class="elite__hero-copy">
        <p class="elite__rule">Evolution Perfect Gym, Florencia, Caquetá</p>
        <h2 class="elite__title">Entrena con intención, mejora con método.</h2>
        <p class="elite__lead">Un espacio pensado para quienes valoran la atención personal, la técnica y el tiempo bien usado.</p>
        <div class="row">
          <button type="button" class="cx-btn" @click="go('planes')">Conocer membresías</button>
          <WhatsAppButton ghost label="Reservar una conversación" />
        </div>
      </div>
      <PhotoSlot priority :src="gym.images.hero" alt="Retrato de una persona entrenando con concentración" label="Retrato vertical pendiente" ratio="4 / 5" />
    </section>

    <section id="elite-servicios" class="sec elite__services">
      <div class="wrap">
        <h3 class="elite__h">Servicios personalizados</h3>
        <ul class="elite__svc">
          <li v-for="s in gym.services" :key="s.id">
            <q-icon :name="s.icon" size="28px" aria-hidden="true" />
            <div><h4>{{ s.title }}</h4><p class="muted">{{ s.description }}</p></div>
          </li>
        </ul>
      </div>
    </section>

    <section id="elite-gimnasio" class="elite__wide" aria-label="Presentación del gimnasio">
      <PhotoSlot :src="gym.images.wide" alt="Vista amplia del gimnasio" label="Fotografía panorámica del gimnasio pendiente" ratio="21 / 9" />
      <div class="sec elite__intro wrap">
        <h3 class="elite__h">El lugar</h3>
        <p>Evolution Perfect Gym recibe a sus socios en Florencia, Caquetá. Esta presentación es un texto de demostración que el propietario puede sustituir por su historia y su propuesta de valor.</p>
      </div>
    </section>

    <section id="elite-beneficios" class="sec">
      <div class="wrap">
        <h3 class="elite__h">Por qué entrenar</h3>
        <ul class="elite__ben">
          <li v-for="b in gym.benefitsOfTraining" :key="b.id"><h4>{{ b.title }}</h4><p class="muted">{{ b.text }}</p></li>
        </ul>
      </div>
    </section>

    <section id="elite-planes" class="sec elite__plans">
      <div class="wrap">
        <h3 class="elite__h">Membresías</h3>
        <ul>
          <li v-for="p in gym.plans" :key="p.id" class="elite__plan" :class="{ hot: p.highlight }">
            <div><h4>{{ p.name }}</h4><p class="muted">{{ p.durationLabel }}</p></div>
            <p class="elite__ben-line">{{ p.benefits.join(', ') }}.</p>
            <div class="elite__buy">
              <PlanPrice :plan="p" />
              <button type="button" class="cx-btn cx-btn--ghost" @click="emit('enroll', p.id)">{{ p.enrollLabel }}</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section id="elite-comparador" class="sec">
      <div class="wrap"><h3 class="elite__h">Comparar beneficios</h3><ComparisonTable @select="emit('enroll', $event)" /></div>
    </section>

    <section id="elite-entrenadores" class="sec elite__services">
      <div class="wrap">
        <h3 class="elite__h">Entrenadores y clases</h3>
        <ul class="elite__trainers">
          <li v-for="t in gym.trainers" :key="t.id">
            <PhotoSlot :src="t.photo" :alt="`Retrato de ${t.name}`" label="Retrato pendiente" ratio="3 / 4" />
            <h4>{{ t.name }}</h4><p class="muted">{{ t.role }}</p>
          </li>
        </ul>
        <ul class="elite__classes">
          <li v-for="c in gym.classes" :key="c.id"><h4>{{ c.name }}</h4><p class="muted">{{ c.description }}</p><p class="muted">{{ c.scheduleNote }}</p></li>
        </ul>
      </div>
    </section>

    <section id="elite-galeria" class="sec">
      <div class="wrap"><h3 class="elite__h">Galería</h3><GalleryViewer variant="mosaic" /></div>
    </section>

    <section id="elite-testimonios" class="sec elite__quote">
      <div class="wrap">
        <figure>
          <blockquote>{{ current.text }}</blockquote>
          <figcaption class="muted">{{ current.author }}<span v-if="current.isFictional">: testimonio ficticio de demostración</span></figcaption>
        </figure>
        <div class="row">
          <button type="button" class="cx-btn cx-btn--ghost" aria-label="Testimonio anterior" @click="shift(-1)"><q-icon name="chevron_left" aria-hidden="true" /></button>
          <span aria-live="polite">{{ idx + 1 }} de {{ gym.testimonials.length }}</span>
          <button type="button" class="cx-btn cx-btn--ghost" aria-label="Testimonio siguiente" @click="shift(1)"><q-icon name="chevron_right" aria-hidden="true" /></button>
        </div>
      </div>
    </section>

    <section id="elite-faq" class="sec">
      <div class="wrap elite__narrow"><h3 class="elite__h">Preguntas frecuentes</h3><FaqList /></div>
    </section>

    <section id="elite-contacto" class="sec elite__services">
      <div class="wrap elite__contact">
        <div>
          <h3 class="elite__h">Hablemos</h3>
          <p>{{ gym.contact.address }}.</p>
          <ScheduleList />
          <p v-if="gym.contact.whatsappIsDemo" class="muted">Número de WhatsApp de demostración, configurable en src/data/gym.ts.</p>
          <div class="row elite__ctas">
            <WhatsAppButton />
            <a class="cx-btn cx-btn--ghost" :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Ver ubicación<span class="sr-only"> (pestaña nueva)</span></a>
          </div>
          <SocialLinks />
        </div>
        <ContactForm dark />
      </div>
    </section>

    <LegalFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import gym from 'src/data/gym';
import type { PlanId } from 'src/types/gym';
import { useConceptNav } from 'src/composables/useConceptNav';
import PhotoSlot from 'src/components/shared/PhotoSlot.vue';
import PlanPrice from 'src/components/shared/PlanPrice.vue';
import ComparisonTable from 'src/components/shared/ComparisonTable.vue';
import FaqList from 'src/components/shared/FaqList.vue';
import GalleryViewer from 'src/components/shared/GalleryViewer.vue';
import ContactForm from 'src/components/shared/ContactForm.vue';
import SocialLinks from 'src/components/shared/SocialLinks.vue';
import WhatsAppButton from 'src/components/shared/WhatsAppButton.vue';
import DemoNotice from 'src/components/shared/DemoNotice.vue';
import ScheduleList from 'src/components/shared/ScheduleList.vue';
import LegalFooter from 'src/components/shared/LegalFooter.vue';

const emit = defineEmits<{ enroll: [planId: PlanId] }>();
const { menuOpen, go, sections } = useConceptNav('elite');

const idx = ref(0);
const current = computed(() => gym.testimonials[idx.value]!);
function shift(d: number): void {
  idx.value = (idx.value + d + gym.testimonials.length) % gym.testimonials.length;
}
</script>

<style scoped>
.elite {
  --c-bg: #0e0e0e; --c-fg: #f5f5f2; --c-muted: #bdbdb8; --c-accent: #a3e635; --c-on-accent: #101010;
  --c-card: #161616; --c-line: #353535; --c-focus: #a3e635; --c-radius: 0; --ph-a: #181818; --ph-b: #2b3a12;
  font-family: Georgia, 'Times New Roman', serif; line-height: 1.7;
}
.elite h3, .elite h4, .elite__title, .elite__brand { font-weight: 400; }
.elite__bar { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .25rem 1rem; padding: .75rem clamp(1rem, 5cqw, 3rem); background: rgba(14, 14, 14, .96); border-bottom: 1px solid var(--c-line); }
.elite__brand { background: none; border: 0; cursor: pointer; font-size: 1.35rem; letter-spacing: .04em; min-height: 44px; }
.elite__nav button { font-family: system-ui, sans-serif; font-size: .9rem; letter-spacing: .03em; }
.elite__hero { display: grid; gap: 4rem; grid-template-columns: 1fr 1fr; align-items: center; padding-block: clamp(3rem, 10cqw, 7rem); }
.elite__hero-copy { display: grid; gap: 1.5rem; }
.elite__rule { display: inline-block; padding-bottom: .5rem; border-bottom: 1px solid var(--c-accent); justify-self: start; font-family: system-ui, sans-serif; font-size: .9rem; }
.elite__title { font-size: 2.6rem; font-size: clamp(2.2rem, 6.5cqw, 4.6rem); line-height: 1.05; }
.elite__lead { max-width: 44ch; font-size: 1.15rem; color: var(--c-muted); }
.elite__h { font-size: 2rem; font-size: clamp(1.7rem, 4cqw, 2.6rem); margin-bottom: 2rem; }
.elite__services { background: #131313; }
.elite__svc { display: grid; gap: 2rem 3rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.elite__svc li { display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--c-line); }
.elite__svc h4, .elite__ben h4, .elite__trainers h4, .elite__classes h4 { font-size: 1.25rem; }
.elite__wide { display: grid; }
.elite__intro { max-width: 760px; font-size: 1.1rem; }
.elite__ben { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.elite__plans li.elite__plan { display: grid; gap: 1rem 2rem; grid-template-columns: 1fr 2fr auto; align-items: center; padding: 1.75rem 0; border-top: 1px solid var(--c-line); }
.elite__plan.hot { border-top: 2px solid var(--c-accent); }
.elite__plan h4 { font-size: 1.6rem; }
.elite__buy { display: grid; gap: .6rem; justify-items: end; }
.elite__trainers { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.elite__classes { display: grid; gap: 1.5rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-top: 3rem; }
.elite__classes li { padding-top: 1rem; border-top: 1px solid var(--c-line); }
.elite__quote blockquote { max-width: 28ch; margin-bottom: 1rem; font-size: 2rem; font-size: clamp(1.5rem, 4.5cqw, 3rem); line-height: 1.25; font-style: italic; }
.elite__quote figure { margin-bottom: 1.5rem; }
.elite__narrow { max-width: 820px; }
.elite__contact { display: grid; gap: 3rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.elite__ctas { margin-block: 1rem; }
@container (max-width: 820px) {
  .elite__hero { grid-template-columns: 1fr; gap: 2rem; }
  .elite__plans li.elite__plan { grid-template-columns: 1fr; }
  .elite__buy { justify-items: start; }
}
</style>
