<template>
  <div class="site loc">
    <DemoNotice />
    <header class="loc__bar">
      <button type="button" class="loc__brand" @click="go('inicio')">Evolution Perfect Gym<small>Florencia, Caquetá</small></button>
      <button type="button" class="sburger" :aria-expanded="menuOpen" aria-controls="loc-menu" aria-label="Menú de navegación" @click="menuOpen = !menuOpen">
        <q-icon :name="menuOpen ? 'close' : 'menu'" aria-hidden="true" />
      </button>
      <nav id="loc-menu" class="snav" :class="{ open: menuOpen }" aria-label="Principal">
        <button v-for="s in sections" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button type="button" class="cx-btn" @click="emit('enroll', 'monthly')">Paga tu mensualidad</button>
      </nav>
    </header>

    <section id="loc-inicio" class="sec loc__hero">
      <div class="wrap loc__hero-grid">
        <div class="loc__copy">
          <span class="loc__seal">Hecho en Florencia, Caquetá</span>
          <h2 class="loc__title">Evolution Perfect Gym, tu gimnasio en Florencia.</h2>
          <p class="loc__lead">Evolution Perfect Gym es el lugar para entrenar cerca de casa, con acompañamiento y comunidad.</p>
          <div class="row">
            <button type="button" class="cx-btn" @click="go('planes')">Ver planes en pesos</button>
            <WhatsAppButton ghost />
          </div>
        </div>
        <div class="loc__collage">
          <PhotoSlot priority :src="gym.images.local1" alt="Imagen de referencia para la fachada del gimnasio" label="Referencia de fachada; reemplazar por foto real" class="loc__c1" />
          <PhotoSlot :src="gym.images.local2" alt="Imagen de referencia para la sala de entrenamiento" label="Referencia de sala; reemplazar por foto real" class="loc__c2" />
          <PhotoSlot :src="gym.images.local3" alt="Imagen de referencia de personas entrenando" label="Referencia de entrenamiento; reemplazar por foto real" class="loc__c3" />
        </div>
      </div>
    </section>

    <section id="loc-servicios" class="sec loc__black">
      <div class="wrap">
        <h3 class="loc__h">Servicios y áreas</h3>
        <ul class="loc__svc">
          <li v-for="s in gym.services" :key="s.id"><q-icon :name="s.icon" size="30px" aria-hidden="true" /><div><h4>{{ s.title }}</h4><p class="muted">{{ s.description }}</p></div></li>
        </ul>
      </div>
    </section>

    <section id="loc-beneficios" class="sec">
      <div class="wrap">
        <h3 class="loc__h">Entrenar cambia tu día</h3>
        <ul class="loc__ben"><li v-for="b in gym.benefitsOfTraining" :key="b.id"><h4>{{ b.title }}</h4><p class="muted">{{ b.text }}</p></li></ul>
      </div>
    </section>

    <section id="loc-gimnasio" class="sec loc__black">
      <div class="wrap loc__about">
        <PhotoSlot :src="gym.images.about" alt="Imagen de referencia del interior del gimnasio" label="Reemplazar por una foto real del establecimiento" ratio="4 / 3" />
        <div>
          <h3 class="loc__h">Conoce Evolution Perfect Gym</h3>
          <p>Presentación de demostración. Cuéntale a Florencia quiénes son, desde cuándo entrenan aquí y qué los hace distintos. Usa fotos reales.</p>
          <p class="muted loc__addr">{{ gym.contact.address }}.</p>
          <ScheduleList />
        </div>
      </div>
    </section>

    <section id="loc-planes" class="sec">
      <div class="wrap">
        <h3 class="loc__h">Planes en pesos colombianos</h3>
        <ul class="loc__plans">
          <li v-for="p in gym.plans" :key="p.id" :class="{ hot: p.highlight }">
            <div><h4>{{ p.name }}</h4><p class="muted">{{ p.durationLabel }}</p></div>
            <PlanPrice :plan="p" class="loc__price" />
            <ul class="loc__incl"><li v-for="b in p.benefits" :key="b">{{ b }}</li></ul>
            <div class="row">
              <button type="button" class="cx-btn" @click="emit('enroll', p.id)">{{ p.enrollLabel }}</button>
              <WhatsAppButton ghost label="Preguntar" :message="`Hola, quiero información del plan ${p.name} de Evolution Perfect Gym.`" />
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section id="loc-comparador" class="sec loc__black">
      <div class="wrap"><h3 class="loc__h">Compara los planes</h3><ComparisonTable @select="emit('enroll', $event)" /></div>
    </section>

    <section id="loc-entrenadores" class="sec">
      <div class="wrap">
        <h3 class="loc__h">Entrenadores y clases</h3>
        <ul class="loc__team">
          <li v-for="t in gym.trainers" :key="t.id">
            <PhotoSlot :src="t.photo" :alt="`Fotografía de ${t.name}`" label="Retrato real pendiente de recibir" ratio="1 / 1" />
            <h4>{{ t.name }}</h4><p class="muted">{{ t.role }}</p>
          </li>
        </ul>
        <ul class="loc__classes"><li v-for="c in gym.classes" :key="c.id"><strong>{{ c.name }}</strong> <span class="muted">{{ c.description }} {{ c.scheduleNote }}.</span></li></ul>
      </div>
    </section>

    <section id="loc-galeria" class="sec loc__black">
      <div class="wrap"><h3 class="loc__h">Galería de nuestra gente</h3><GalleryViewer variant="grid" /></div>
    </section>

    <section id="loc-testimonios" class="sec">
      <div class="wrap">
        <h3 class="loc__h">Comunidad y testimonios</h3>
        <ul class="loc__quotes">
          <li v-for="t in gym.testimonials" :key="t.id">
            <blockquote>{{ t.text }}</blockquote>
            <p class="muted">{{ t.author }}</p>
            <p class="loc__flag">Ejemplo ficticio. Pendiente de verificación</p>
          </li>
        </ul>
        <p class="muted loc__rule">Para publicar testimonios reales: pide autorización escrita del socio, confirma su nombre y conserva la evidencia.</p>
      </div>
    </section>

    <section id="loc-faq" class="sec loc__black">
      <div class="wrap loc__narrow"><h3 class="loc__h">Preguntas frecuentes</h3><FaqList /></div>
    </section>

    <section id="loc-contacto" class="sec">
      <div class="wrap loc__contact">
        <div class="loc__info">
          <h3 class="loc__h">Ubicación y contacto</h3>
          <dl class="loc__dl">
            <dt>Ciudad</dt><dd>Florencia, Caquetá, Colombia</dd>
            <dt>Dirección</dt><dd>{{ gym.contact.address }}</dd>
            <dt>Horarios</dt><dd><ScheduleList /></dd>
            <dt>WhatsApp</dt><dd>Número de demostración, configurable en src/data/gym.ts</dd>
          </dl>
          <a class="cx-btn cx-btn--ghost" :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Buscar en Google Maps<span class="sr-only"> (pestaña nueva)</span></a>
          <h4>Síguenos</h4>
          <SocialLinks />
        </div>
        <ContactForm />
      </div>
    </section>

    <LegalFooter />

    <div class="loc__wa" role="complementary" aria-label="Contacto rápido">
      <span>¿Dudas? Escríbenos.</span>
      <WhatsAppButton label="WhatsApp" />
    </div>
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
const { menuOpen, go, sections } = useConceptNav('loc');
</script>

<style scoped>
.loc {
  --c-bg: #f6f7f1; --c-fg: #101010; --c-muted: #474747; --c-accent: #101010; --c-on-accent: #fff;
  --c-card: #fff; --c-line: #cfd2c4; --c-focus: #101010; --c-radius: 14px; --ph-a: #101010; --ph-b: #55741a;
  font-family: 'Trebuchet MS', 'Segoe UI', Verdana, sans-serif;
}
.loc__black { --c-bg: #101010; --c-fg: #fff; --c-muted: #cfcfcf; --c-accent: #a3e635; --c-on-accent: #101010; --c-card: #1c1c1c; --c-line: #3b3b3b; --c-focus: #a3e635; background: var(--c-bg); color: var(--c-fg); }
.loc__bar { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .25rem 1rem; padding: .35rem clamp(1rem, 5cqw, 3rem); background: #101010; color: #fff; --c-accent: #a3e635; --c-on-accent: #101010; --c-fg: #fff; --c-focus: #a3e635; }
.loc__brand { display: grid; text-align: left; background: none; border: 0; cursor: pointer; font-weight: 800; font-size: 1.1rem; min-height: 48px; }
.loc__brand small { font-weight: 400; color: #a3e635; }
.loc__hero-grid { display: grid; gap: 2.5rem; grid-template-columns: 1fr 1.1fr; align-items: center; }
.loc__copy { display: grid; gap: 1.1rem; justify-items: start; }
.loc__seal { padding: .3rem .9rem; background: #a3e635; color: #101010; font-weight: 700; border-radius: 999px; font-size: .9rem; }
.loc__title { font-size: 2.6rem; font-size: clamp(2.2rem, 7cqw, 4.4rem); line-height: 1; font-weight: 800; }
.loc__lead { max-width: 44ch; font-size: 1.15rem; color: var(--c-muted); }
.loc__collage { display: grid; gap: .75rem; grid-template-columns: 1.2fr 1fr; grid-template-rows: 150px 150px; }
.loc__c1 { grid-row: span 2; border-radius: var(--c-radius); } .loc__c2, .loc__c3 { border-radius: var(--c-radius); }
.loc__h { font-size: 1.9rem; font-size: clamp(1.6rem, 4.5cqw, 2.5rem); font-weight: 800; margin-bottom: 1.25rem; line-height: 1.1; }
.loc__svc { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.loc__svc li { display: flex; gap: .9rem; padding: 1rem; border: 1px solid var(--c-line); border-radius: var(--c-radius); }
.loc__svc h4, .loc__ben h4, .loc__team h4 { font-size: 1.1rem; font-weight: 700; }
.loc__ben { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.loc__about { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); align-items: center; }
.loc__addr { margin-top: 1rem; }
.loc__plans { display: grid; gap: 1rem; }
.loc__plans > li { display: grid; grid-template-columns: 1fr 1fr 1.4fr auto; gap: 1rem 1.5rem; align-items: center; padding: 1.25rem; background: #fff; border: 2px solid var(--c-line); border-radius: var(--c-radius); }
.loc__plans > li.hot { border-color: #101010; box-shadow: 6px 6px 0 #a3e635; }
.loc__plans h4 { font-size: 1.4rem; font-weight: 800; }
.loc__price { font-size: 1.1rem; }
.loc__incl { display: grid; gap: .2rem; font-size: .95rem; }
.loc__incl li::before { content: '✓ '; font-weight: 700; }
.loc__team { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); }
.loc__team li > :first-child { border-radius: var(--c-radius); margin-bottom: .5rem; }
.loc__classes { display: grid; gap: .6rem; margin-top: 2rem; }
.loc__classes li { padding: .75rem 1rem; background: #fff; border: 1px solid var(--c-line); border-radius: 10px; }
.loc__quotes { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.loc__quotes li { display: grid; gap: .5rem; padding: 1.25rem; background: #fff; border: 1px solid var(--c-line); border-radius: var(--c-radius); align-content: start; }
.loc__flag { font-size: .8rem; font-weight: 700; padding: .15rem .5rem; background: #fff3c4; border-radius: 4px; justify-self: start; }
.loc__rule { margin-top: 1rem; max-width: 70ch; }
.loc__narrow { max-width: 820px; }
.loc__contact { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start; }
.loc__info { display: grid; gap: 1rem; justify-items: start; }
.loc__dl { display: grid; grid-template-columns: auto 1fr; gap: .4rem 1rem; margin: 0; } .loc__dl dt { font-weight: 700; } .loc__dl dd { margin: 0; }
.loc__wa { position: sticky; bottom: 0; z-index: 4; display: flex; flex-wrap: wrap; gap: .5rem 1rem; align-items: center; justify-content: space-between; padding: .5rem clamp(1rem, 5cqw, 3rem); background: #a3e635; color: #101010; font-weight: 700; --c-accent: #101010; --c-on-accent: #fff; --c-focus: #101010; }
@container (max-width: 860px) {
  .loc__hero-grid { grid-template-columns: 1fr; }
  .loc__plans > li { grid-template-columns: 1fr; }
}
</style>
