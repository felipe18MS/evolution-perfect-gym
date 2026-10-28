<template>
  <div class="site perf">
    <DemoNotice />
    <header class="perf__bar">
      <button type="button" class="perf__brand" @click="go('inicio')">EVOLUTION <span>Perfect Gym</span></button>
      <button type="button" class="sburger" :aria-expanded="menuOpen" aria-controls="perf-menu" aria-label="Menú de navegación" @click="menuOpen = !menuOpen">
        <q-icon :name="menuOpen ? 'close' : 'menu'" aria-hidden="true" />
      </button>
      <nav id="perf-menu" class="snav" :class="{ open: menuOpen }" aria-label="Principal">
        <button v-for="s in sections" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button type="button" class="cx-btn" @click="emit('enroll', 'monthly')">Paga tu mensualidad</button>
      </nav>
    </header>

    <section :id="'perf-inicio'" class="perf__hero">
      <PhotoSlot priority class="perf__hero-img" :src="gym.images.hero" alt="Atleta entrenando con barra en el gimnasio" label="Fotografía de acción pendiente" />
      <div class="perf__hero-copy">
        <p class="perf__kicker">Evolution Perfect Gym, Florencia, Caquetá</p>
        <h2 class="perf__huge">Evoluciona<br />tu rendimiento</h2>
        <p class="perf__sub">Entrenamiento serio, ambiente enfocado y un plan para cada meta.</p>
        <div class="row">
          <button type="button" class="cx-btn" @click="go('planes')">Ver membresías</button>
          <WhatsAppButton ghost label="Hablar por WhatsApp" />
        </div>
      </div>
    </section>

    <section class="perf__strip" aria-label="Planes disponibles">
      <span v-for="p in gym.plans" :key="p.id">{{ p.name }}</span>
    </section>

    <section id="perf-servicios" class="sec">
      <div class="wrap">
        <h3 class="perf__h">Áreas de entrenamiento</h3>
        <ul class="perf__services">
          <li v-for="s in gym.services" :key="s.id">
            <q-icon :name="s.icon" size="34px" aria-hidden="true" />
            <h4>{{ s.title }}</h4>
            <p class="muted">{{ s.description }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section id="perf-beneficios" class="sec perf__alt">
      <div class="wrap">
        <h3 class="perf__h">Beneficios de entrenar</h3>
        <ul class="perf__ben">
          <li v-for="b in gym.benefitsOfTraining" :key="b.id"><strong>{{ b.title }}</strong><span class="muted">{{ b.text }}</span></li>
        </ul>
      </div>
    </section>

    <section id="perf-gimnasio" class="sec">
      <div class="wrap perf__about">
        <div>
          <h3 class="perf__h">Nuestro gimnasio</h3>
          <p>Evolution Perfect Gym es un espacio de entrenamiento en Florencia, Caquetá. Este texto es una presentación de demostración: el propietario puede reemplazarlo con la historia, el equipamiento y los valores reales.</p>
        </div>
        <PhotoSlot :src="gym.images.about" alt="Interior del gimnasio" label="Foto del establecimiento pendiente" ratio="4 / 3" />
      </div>
    </section>

    <section id="perf-planes" class="sec perf__alt">
      <div class="wrap">
        <h3 class="perf__h">Membresías</h3>
        <ul class="perf__plans">
          <li v-for="p in gym.plans" :key="p.id" :class="{ hot: p.highlight }">
            <h4>{{ p.name }}</h4>
            <p class="perf__dur">{{ p.durationLabel }}</p>
            <PlanPrice :plan="p" class="perf__price" />
            <ul class="perf__list"><li v-for="b in p.benefits" :key="b">{{ b }}</li></ul>
            <p class="perf__cond">{{ p.conditions[0] }}</p>
            <button type="button" class="cx-btn cx-btn--block" :class="{ 'cx-btn--ghost': !p.highlight }" @click="emit('enroll', p.id)">{{ p.enrollLabel }}</button>
          </li>
        </ul>
      </div>
    </section>

    <section id="perf-comparador" class="sec">
      <div class="wrap">
        <h3 class="perf__h">Compara tu plan</h3>
        <ComparisonTable @select="emit('enroll', $event)" />
      </div>
    </section>

    <section id="perf-entrenadores" class="sec perf__alt">
      <div class="wrap perf__team">
        <div>
          <h3 class="perf__h">Entrenadores</h3>
          <ul class="perf__trainers">
            <li v-for="t in gym.trainers" :key="t.id">
              <PhotoSlot :src="t.photo" :alt="`Fotografía de ${t.name}`" label="Foto pendiente" ratio="1 / 1" />
              <h4>{{ t.name }}</h4><p class="muted">{{ t.role }}</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="perf__h">Clases</h3>
          <ul class="perf__classes">
            <li v-for="c in gym.classes" :key="c.id"><strong>{{ c.name }}</strong><span class="muted">{{ c.description }} {{ c.scheduleNote }}.</span></li>
          </ul>
        </div>
      </div>
    </section>

    <section id="perf-galeria" class="sec">
      <div class="wrap"><h3 class="perf__h">Galería</h3><GalleryViewer variant="mosaic" /></div>
    </section>

    <section id="perf-testimonios" class="sec perf__alt">
      <div class="wrap">
        <h3 class="perf__h">Testimonios de demostración</h3>
        <ul class="perf__quotes">
          <li v-for="t in gym.testimonials" :key="t.id">
            <blockquote>{{ t.text }}</blockquote>
            <p class="muted">{{ t.author }}<span v-if="t.isFictional">: testimonio ficticio</span></p>
          </li>
        </ul>
      </div>
    </section>

    <section id="perf-faq" class="sec">
      <div class="wrap perf__narrow"><h3 class="perf__h">Preguntas frecuentes</h3><FaqList /></div>
    </section>

    <section id="perf-contacto" class="sec perf__alt">
      <div class="wrap perf__contact">
        <div>
          <h3 class="perf__h">Entra hoy al ritmo</h3>
          <p>{{ gym.contact.address }}. Florencia, Caquetá.</p>
          <ScheduleList />
          <p class="muted" v-if="gym.contact.whatsappIsDemo">WhatsApp: número de demostración, configúrelo en src/data/gym.ts.</p>
          <div class="row perf__ctas">
            <WhatsAppButton />
            <a class="cx-btn cx-btn--ghost" :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Buscar en Google Maps<span class="sr-only"> (pestaña nueva)</span></a>
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
const { menuOpen, go, sections } = useConceptNav('perf');
</script>

<style scoped>
.perf {
  --c-bg: #101010; --c-fg: #fff; --c-muted: #c4c4c4; --c-accent: #a3e635; --c-on-accent: #101010;
  --c-card: #1b1b1b; --c-line: #3a3a3a; --c-focus: #a3e635; --c-radius: 2px; --ph-a: #1a1a1a; --ph-b: #33430f;
  font-family: 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif;
}
.perf h3, .perf h4, .perf__huge, .perf__brand { font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; font-weight: 400; text-transform: uppercase; letter-spacing: .02em; }
.perf__bar { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .25rem 1rem; padding: .5rem 1.25rem; background: #000; border-bottom: 3px solid var(--c-accent); }
.perf__brand { background: none; border: 0; cursor: pointer; font-size: 1.5rem; color: #fff; min-height: 44px; }
.perf__brand span { color: var(--c-accent); }
.perf__hero { position: relative; display: grid; align-items: end; min-height: 600px; isolation: isolate; }
.perf__hero-img { position: absolute; inset: 0; z-index: -2; }
.perf__hero::after { content: ''; position: absolute; inset: 0; z-index: -1; background: linear-gradient(90deg, rgba(0, 0, 0, .85) 25%, rgba(0, 0, 0, .15)); }
.perf__hero-copy { padding: 4rem 1.25rem 3rem; padding-inline: clamp(1rem, 5cqw, 3rem); max-width: 900px; display: grid; gap: 1rem; }
.perf__kicker { color: var(--c-accent); font-weight: 700; }
.perf__huge { font-size: 4rem; font-size: clamp(3rem, 13cqw, 8.5rem); line-height: .92; }
.perf__sub { max-width: 46ch; font-size: 1.15rem; }
.perf__strip { display: flex; flex-wrap: wrap; justify-content: space-around; gap: .5rem 1.5rem; padding: .9rem 1rem; background: var(--c-accent); color: #101010; font-family: Impact, 'Arial Narrow Bold', sans-serif; font-size: 1.3rem; text-transform: uppercase; }
.perf__alt { background: #161616; }
.perf__h { font-size: 2.4rem; font-size: clamp(2rem, 6cqw, 3.4rem); line-height: 1; margin-bottom: 1.5rem; }
.perf__services { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.perf__services li { padding: 1.25rem; background: var(--c-card); border-top: 4px solid var(--c-accent); display: grid; gap: .4rem; align-content: start; }
.perf__services h4 { font-size: 1.4rem; }
.perf__ben { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.perf__ben li { display: grid; gap: .25rem; padding-left: 1rem; border-left: 4px solid var(--c-accent); }
.perf__ben strong { font-size: 1.3rem; }
.perf__about { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); align-items: center; }
.perf__plans { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); align-items: stretch; }
.perf__plans > li { display: grid; gap: .6rem; align-content: start; padding: 1.5rem; background: var(--c-card); border: 1px solid var(--c-line); }
.perf__plans > li.hot { background: var(--c-accent); color: #101010; --c-line: #101010; }
.perf__plans h4 { font-size: 1.8rem; }
.perf__plans > li.hot .cx-btn { background: #101010; color: #fff; border-color: #101010; }
.perf__dur { font-weight: 700; }
.perf__price { font-size: 1.1rem; }
.perf__list { display: grid; gap: .3rem; }
.perf__list li::before { content: '+ '; font-weight: 700; }
.perf__cond { font-size: .8rem; opacity: .85; }
.perf__team { display: grid; gap: 2.5rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.perf__trainers { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
.perf__trainers h4 { margin-top: .5rem; font-size: 1.2rem; }
.perf__classes { display: grid; gap: .75rem; }
.perf__classes li { display: grid; gap: .1rem; padding: .75rem 0; border-bottom: 1px solid var(--c-line); }
.perf__quotes { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.perf__quotes li { padding: 1.25rem; background: var(--c-card); border-left: 4px solid var(--c-accent); display: grid; gap: .75rem; }
.perf__narrow { max-width: 820px; }
.perf__contact { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.perf__contact > div:first-child { display: grid; gap: 1rem; align-content: start; }
.perf__ctas { margin-block: .5rem; }
</style>
