<template>
  <div class="site energy">
    <DemoNotice />
    <header class="energy__bar">
      <button type="button" class="energy__brand" @click="go('inicio')">Evolution Perfect Gym<span>Energy</span></button>
      <button type="button" class="sburger" :aria-expanded="menuOpen" aria-controls="energy-menu" aria-label="Menú de navegación" @click="menuOpen = !menuOpen">
        <q-icon :name="menuOpen ? 'close' : 'menu'" aria-hidden="true" />
      </button>
      <nav id="energy-menu" class="snav" :class="{ open: menuOpen }" aria-label="Principal">
        <button v-for="s in sections" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button type="button" class="cx-btn" @click="emit('enroll', 'monthly')">Paga tu mensualidad</button>
      </nav>
    </header>

    <section id="energy-inicio" class="energy__hero">
      <div class="energy__hero-copy">
        <p class="energy__name">Evolution Perfect Gym, Florencia, Caquetá</p>
        <h2 class="energy__title">Muévete.<br />Suda.<br />Repite.</h2>
        <p class="energy__lead">Clases con ritmo, retos con amigos y un gimnasio que te empuja a volver mañana.</p>
        <div class="row">
          <button type="button" class="cx-btn energy__cta" @click="emit('enroll', 'quarterly')">Quiero mi plan</button>
          <WhatsAppButton ghost label="Pregunta por WhatsApp" />
        </div>
      </div>
      <PhotoSlot priority class="energy__hero-img" :src="gym.images.hero" alt="Grupo entrenando en una clase de alta energía" label="Foto de acción pendiente" ratio="4 / 5" />
    </section>

    <section id="energy-servicios" class="sec energy__dark">
      <div class="wrap">
        <h3 class="energy__h">Entrena a tu manera</h3>
        <ul class="energy__svc">
          <li v-for="s in gym.services" :key="s.id">
            <q-icon :name="s.icon" size="36px" aria-hidden="true" />
            <h4>{{ s.title }}</h4>
            <p>{{ s.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="energy-beneficios" class="sec">
      <div class="wrap">
        <h3 class="energy__h">Lo que te llevas</h3>
        <ul class="energy__ben">
          <li v-for="b in gym.benefitsOfTraining" :key="b.id"><strong>{{ b.title }}</strong> {{ b.text }}</li>
        </ul>
      </div>
    </section>

    <section id="energy-gimnasio" class="sec energy__lime">
      <div class="wrap energy__about">
        <PhotoSlot :src="gym.images.about" alt="Zona principal del gimnasio" label="Foto del gimnasio pendiente" ratio="4 / 3" />
        <div>
          <h3 class="energy__h">Un gimnasio con vida</h3>
          <p>Evolution Perfect Gym, en Florencia, Caquetá. Texto de presentación de demostración: reemplázalo con la historia real del lugar y su comunidad.</p>
        </div>
      </div>
    </section>

    <section id="energy-planes" class="sec">
      <div class="wrap">
        <h3 class="energy__h">Elige tu ritmo</h3>
        <ul class="energy__plans">
          <li v-for="p in gym.plans" :key="p.id" :class="{ hot: p.highlight }">
            <h4>{{ p.name }}</h4>
            <PlanPrice :plan="p" />
            <p class="energy__dur">{{ p.durationLabel }}</p>
            <ul class="energy__incl"><li v-for="b in p.benefits" :key="b">{{ b }}</li></ul>
            <button type="button" class="cx-btn cx-btn--block" @click="emit('enroll', p.id)">{{ p.enrollLabel }}</button>
          </li>
        </ul>
      </div>
    </section>

    <section id="energy-comparador" class="sec energy__dark">
      <div class="wrap"><h3 class="energy__h">Compara y decide</h3><ComparisonTable @select="emit('enroll', $event)" /></div>
    </section>

    <section id="energy-clases" class="sec">
      <div class="wrap">
        <h3 class="energy__h">Clases grupales</h3>
        <ul class="energy__classes">
          <li v-for="c in gym.classes" :key="c.id"><h4>{{ c.name }}</h4><p>{{ c.description }}</p><p class="energy__note">{{ c.scheduleNote }}</p></li>
        </ul>
      </div>
    </section>

    <section id="energy-retos" class="sec energy__lime">
      <div class="wrap">
        <h3 class="energy__h">Retos y campañas</h3>
        <ul class="energy__challenges">
          <li v-for="r in gym.challenges" :key="r.id"><h4>{{ r.title }}</h4><p>{{ r.text }}</p></li>
        </ul>
        <button type="button" class="cx-btn energy__join" @click="emit('enroll', null)">Unirme a un reto</button>
      </div>
    </section>

    <section id="energy-entrenadores" class="sec">
      <div class="wrap">
        <h3 class="energy__h">Tu equipo</h3>
        <ul class="energy__team">
          <li v-for="t in gym.trainers" :key="t.id">
            <PhotoSlot :src="t.photo" :alt="`Fotografía de ${t.name}`" label="Foto pendiente" ratio="1 / 1" />
            <h4>{{ t.name }}</h4><p>{{ t.role }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="energy-galeria" class="sec energy__dark">
      <div class="wrap"><h3 class="energy__h">Comunidad en acción</h3><GalleryViewer variant="rail" /></div>
    </section>

    <section id="energy-testimonios" class="sec">
      <div class="wrap">
        <h3 class="energy__h">Lo dicen (ejemplos ficticios)</h3>
        <ul class="energy__quotes">
          <li v-for="t in gym.testimonials" :key="t.id"><blockquote>{{ t.text }}</blockquote><p>{{ t.author }}, testimonio ficticio</p></li>
        </ul>
      </div>
    </section>

    <section id="energy-faq" class="sec energy__lime">
      <div class="wrap energy__narrow"><h3 class="energy__h">Preguntas frecuentes</h3><FaqList /></div>
    </section>

    <section id="energy-contacto" class="sec energy__dark">
      <div class="wrap energy__contact">
        <div>
          <h3 class="energy__h">Tu primera semana empieza aquí</h3>
          <p>{{ gym.contact.address }}. Florencia, Caquetá.</p>
          <ScheduleList />
          <p v-if="gym.contact.whatsappIsDemo" class="muted">Número de WhatsApp de demostración, configurable en src/data/gym.ts.</p>
          <div class="row energy__ctas"><WhatsAppButton /><a class="cx-btn cx-btn--ghost" :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Ver en mapa<span class="sr-only"> (pestaña nueva)</span></a></div>
          <SocialLinks />
        </div>
        <ContactForm dark />
      </div>
    </section>

    <LegalFooter />
  </div>
</template>

<script setup lang="ts">
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

const emit = defineEmits<{ enroll: [planId: PlanId | null] }>();
const { menuOpen, go, sections } = useConceptNav('energy');
</script>

<style scoped>
.energy {
  --c-bg: #fff; --c-fg: #101010; --c-muted: #3d3d3d; --c-accent: #101010; --c-on-accent: #fff;
  --c-card: #f3f4ee; --c-line: #101010; --c-focus: #101010; --c-radius: 0; --ph-a: #101010; --ph-b: #4d6a14;
  font-family: 'Arial Black', 'Segoe UI Black', Arial, sans-serif;
}
.energy p, .energy li, .energy blockquote { font-family: system-ui, 'Segoe UI', Arial, sans-serif; font-weight: 500; }
.energy__dark { --c-bg: #101010; --c-fg: #fff; --c-muted: #d0d0d0; --c-accent: #a3e635; --c-on-accent: #101010; --c-card: #1c1c1c; --c-line: #444; --c-focus: #a3e635; background: var(--c-bg); color: var(--c-fg); }
.energy__lime { --c-bg: #a3e635; --c-fg: #101010; --c-muted: #1f2a08; --c-accent: #101010; --c-on-accent: #fff; --c-card: #f4ffd8; --c-line: #101010; background: var(--c-bg); color: var(--c-fg); }
.energy__bar { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .25rem 1rem; padding: .5rem 1.25rem; background: #101010; color: #fff; --c-accent: #a3e635; --c-on-accent: #101010; --c-fg: #fff; --c-focus: #a3e635; }
.energy__brand { background: none; border: 0; cursor: pointer; font-size: 1.3rem; min-height: 44px; font-style: italic; }
.energy__brand span { margin-left: .35rem; padding: 0 .4rem; background: #a3e635; color: #101010; transform: skewX(-12deg); display: inline-block; }
.energy__hero { display: grid; grid-template-columns: 1.3fr 1fr; gap: 2rem; align-items: center; padding: 3rem clamp(1rem, 5cqw, 3rem) 6rem; background: #a3e635; clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%); }
.energy__title { font-size: 3.2rem; font-size: clamp(2.8rem, 11cqw, 7.5rem); line-height: .9; font-style: italic; text-transform: uppercase; letter-spacing: -.02em; }
.energy__name { font-weight: 800; font-size: 1.1rem; margin-bottom: .75rem; }
.energy__lead { max-width: 40ch; margin: 1.25rem 0 1.5rem; font-size: 1.2rem; }
.energy__cta { font-size: 1.1rem; padding-inline: 2rem; }
.energy__hero-img { transform: rotate(3deg); border: 6px solid #101010; box-shadow: 10px 10px 0 #101010; }
.energy__h { font-size: 2.2rem; font-size: clamp(1.8rem, 5.5cqw, 3.4rem); line-height: 1; font-style: italic; text-transform: uppercase; margin-bottom: 1.75rem; }
.energy__svc { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.energy__svc li { padding: 1.25rem; border: 3px solid #a3e635; display: grid; gap: .5rem; align-content: start; }
.energy__svc li:nth-child(even) { transform: translateY(14px); }
.energy__ben { display: grid; gap: .75rem; max-width: 70ch; }
.energy__ben li { padding: .75rem 1rem; border-left: 8px solid #a3e635; background: var(--c-card); }
.energy__about { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); align-items: center; }
.energy__plans { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); padding-block: .5rem; }
.energy__plans > li { display: grid; gap: .6rem; align-content: start; padding: 1.5rem; background: var(--c-card); border: 3px solid #101010; box-shadow: 6px 6px 0 #101010; }
.energy__plans > li:nth-child(odd) { transform: rotate(-1deg); }
.energy__plans > li:nth-child(even) { transform: rotate(1deg); }
.energy__plans > li.hot { background: #101010; color: #fff; --c-accent: #a3e635; --c-on-accent: #101010; box-shadow: 6px 6px 0 #a3e635; }
.energy__plans h4 { font-size: 1.6rem; text-transform: uppercase; }
.energy__dur { font-weight: 700; }
.energy__incl { display: grid; gap: .3rem; }
.energy__incl li::before { content: '+ '; font-weight: 900; }
.energy__classes, .energy__challenges { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); }
.energy__classes li { padding: 1.25rem; background: #101010; color: #fff; display: grid; gap: .4rem; clip-path: polygon(0 0, 100% 0, 100% 88%, 92% 100%, 0 100%); }
.energy__classes h4 { color: #a3e635; }
.energy__note { font-size: .85rem; opacity: .85; }
.energy__challenges li { padding: 1.25rem; background: #fff; border: 3px solid #101010; display: grid; gap: .4rem; }
.energy__join { margin-top: 1.5rem; }
.energy__team { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
.energy__team h4 { margin-top: .5rem; }
.energy__quotes { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.energy__quotes li { padding: 1.25rem; border: 3px solid #101010; background: var(--c-card); display: grid; gap: .6rem; }
.energy__narrow { max-width: 820px; }
.energy__contact { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.energy__contact > div:first-child { display: grid; gap: 1rem; align-content: start; }
.energy__ctas { margin-block: .5rem; }
@container (max-width: 760px) {
  .energy__hero { grid-template-columns: 1fr; padding-bottom: 5rem; }
  .energy__hero-img { max-width: 320px; justify-self: center; }
  .energy__svc li:nth-child(even) { transform: none; }
}
</style>
