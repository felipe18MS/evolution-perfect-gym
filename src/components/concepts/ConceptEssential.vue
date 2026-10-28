<template>
  <div class="site ess">
    <DemoNotice />
    <div class="ess__top">
      <span>{{ gym.brand.city }}</span>
      <WhatsAppButton ghost label="WhatsApp" />
    </div>
    <header class="ess__bar">
      <button type="button" class="ess__brand" @click="go('inicio')">Evolution Perfect Gym</button>
      <button type="button" class="sburger" :aria-expanded="menuOpen" aria-controls="ess-menu" aria-label="Menú de navegación" @click="menuOpen = !menuOpen">
        <q-icon :name="menuOpen ? 'close' : 'menu'" aria-hidden="true" />
      </button>
      <nav id="ess-menu" class="snav" :class="{ open: menuOpen }" aria-label="Principal">
        <button v-for="s in sections" :key="s.id" type="button" @click="go(s.id)">{{ s.label }}</button>
        <button type="button" class="cx-btn" @click="emit('enroll', 'monthly')">Paga tu mensualidad</button>
      </nav>
    </header>

    <section id="ess-inicio" class="sec ess__hero">
      <div class="wrap ess__hero-grid">
        <div class="ess__hero-copy">
          <h2 class="ess__title">Evolution Perfect Gym: elige tu plan y empieza a entrenar.</h2>
          <p class="ess__lead">Precios claros, información ordenada y un proceso corto para inscribirte.</p>
          <PhotoSlot priority :src="gym.images.hero" alt="Persona entrenando en el gimnasio" label="Foto principal pendiente" ratio="16 / 9" />
        </div>
        <form class="ess__quick" @submit.prevent="quickEnroll">
          <fieldset>
            <legend>Selección rápida de plan</legend>
            <label v-for="p in gym.plans" :key="p.id" class="ess__opt">
              <input v-model="quickPlan" type="radio" name="quick-plan" :value="p.id" />
              <span>{{ p.name }} <small class="muted">{{ p.durationLabel }}</small></span>
              <PlanPrice :plan="p" class="ess__optprice" />
            </label>
          </fieldset>
          <p v-if="quickError" class="ess__err" role="alert">Selecciona un plan para continuar.</p>
          <button type="submit" class="cx-btn cx-btn--block">Continuar con la inscripción</button>
        </form>
      </div>
    </section>

    <section id="ess-servicios" class="sec">
      <div class="wrap">
        <h3 class="ess__h">Servicios y áreas</h3>
        <ul class="ess__svc">
          <li v-for="s in gym.services" :key="s.id">
            <span class="ess__ico"><q-icon :name="s.icon" size="26px" aria-hidden="true" /></span>
            <div><h4>{{ s.title }}</h4><p class="muted">{{ s.description }}</p></div>
          </li>
        </ul>
      </div>
    </section>

    <section id="ess-planes" class="sec ess__gray">
      <div class="wrap">
        <h3 class="ess__h">Precios</h3>
        <div class="ess__tablewrap" role="region" tabindex="0" aria-label="Tabla de precios. Desplázate horizontalmente si no cabe.">
          <table class="ess__table">
            <caption class="sr-only">Planes, duración y precio. Valores de demostración.</caption>
            <thead><tr><th scope="col">Plan</th><th scope="col">Duración</th><th scope="col">Precio</th><th scope="col">Por mes aprox.</th><th scope="col"><span class="sr-only">Acción</span></th></tr></thead>
            <tbody>
              <tr v-for="p in gym.plans" :key="p.id" :class="{ hot: p.highlight }">
                <th scope="row">{{ p.name }}<span v-if="p.highlight" class="ess__tag">Más elegido en la demo</span></th>
                <td>{{ p.durationLabel }}</td>
                <td><PlanPrice :plan="p" /></td>
                <td>{{ pricePerMonthText(p) }}</td>
                <td><button type="button" class="cx-btn" @click="emit('enroll', p.id)">{{ p.enrollLabel }}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="muted ess__note">Precios DEMO o pendientes de confirmación. Condiciones: {{ gym.plans[0]!.conditions[0] }}.</p>
      </div>
    </section>

    <section id="ess-comparador" class="sec">
      <div class="wrap"><h3 class="ess__h">Compara beneficios</h3><ComparisonTable @select="emit('enroll', $event)" /></div>
    </section>

    <section id="ess-beneficios" class="sec ess__gray">
      <div class="wrap">
        <h3 class="ess__h">Beneficios de entrenar</h3>
        <ul class="ess__ben"><li v-for="b in gym.benefitsOfTraining" :key="b.id"><h4>{{ b.title }}</h4><p class="muted">{{ b.text }}</p></li></ul>
      </div>
    </section>

    <section id="ess-gimnasio" class="sec">
      <div class="wrap ess__about">
        <div>
          <h3 class="ess__h">El gimnasio y sus horarios</h3>
          <p>Evolution Perfect Gym en Florencia, Caquetá. Presentación de demostración, pendiente de reemplazar por el texto real.</p>
          <div class="ess__hours"><h4>Horarios</h4><ScheduleList /></div>
        </div>
        <PhotoSlot :src="gym.images.about" alt="Interior del gimnasio" label="Foto del gimnasio pendiente" ratio="4 / 3" />
      </div>
    </section>

    <section id="ess-entrenadores" class="sec ess__gray">
      <div class="wrap ess__team">
        <div>
          <h3 class="ess__h">Entrenadores</h3>
          <ul class="ess__teamlist"><li v-for="t in gym.trainers" :key="t.id"><PhotoSlot :src="t.photo" :alt="`Retrato de referencia para ${t.role}`" label="Foto de stock" ratio="3 / 4" /><div><strong>{{ t.name }}</strong><span class="muted">{{ t.role }}. {{ t.bio }} Imagen ilustrativa, no corresponde necesariamente al equipo real.</span></div></li></ul>
        </div>
        <div>
          <h3 class="ess__h">Clases</h3>
          <ul class="ess__list"><li v-for="c in gym.classes" :key="c.id"><strong>{{ c.name }}</strong><span class="muted">{{ c.description }} {{ c.scheduleNote }}.</span></li></ul>
        </div>
      </div>
    </section>

    <section id="ess-galeria" class="sec">
      <div class="wrap"><h3 class="ess__h">Galería</h3><GalleryViewer variant="grid" /></div>
    </section>

    <section id="ess-testimonios" class="sec ess__gray">
      <div class="wrap">
        <h3 class="ess__h">Testimonios de demostración</h3>
        <ul class="ess__quotes"><li v-for="t in gym.testimonials" :key="t.id"><blockquote>{{ t.text }}</blockquote><p class="muted">{{ t.author }} (ficticio)</p></li></ul>
      </div>
    </section>

    <section id="ess-faq" class="sec">
      <div class="wrap ess__narrow"><h3 class="ess__h">Preguntas frecuentes</h3><FaqList /></div>
    </section>

    <section id="ess-contacto" class="sec ess__gray">
      <div class="wrap ess__contact">
        <div>
          <h3 class="ess__h">Contacto</h3>
          <dl class="ess__dl">
            <dt>Dirección</dt><dd>{{ gym.contact.address }}</dd>
            <dt>Horarios</dt><dd><ScheduleList /></dd>
            <dt>Correo</dt><dd>{{ gym.contact.email }}</dd>
            <dt>WhatsApp</dt><dd>Número de demostración, configurable en src/data/gym.ts</dd>
          </dl>
          <div class="row ess__ctas">
            <WhatsAppButton />
            <a class="cx-btn cx-btn--ghost" :href="gym.contact.mapsUrl" target="_blank" rel="noopener noreferrer">Ver ubicación<span class="sr-only"> (pestaña nueva)</span></a>
          </div>
          <SocialLinks />
        </div>
        <ContactForm />
      </div>
    </section>

    <LegalFooter />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gym from 'src/data/gym';
import type { PlanId } from 'src/types/gym';
import { pricePerMonthText } from 'src/utils/format';
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
const { menuOpen, go, sections } = useConceptNav('ess');

const quickPlan = ref<PlanId | null>(null);
const quickError = ref(false);
function quickEnroll(): void {
  quickError.value = quickPlan.value === null;
  if (quickPlan.value) emit('enroll', quickPlan.value);
}
</script>

<style scoped>
.ess {
  --c-bg: #fff; --c-fg: #101010; --c-muted: #4a4a4a; --c-accent: #101010; --c-on-accent: #fff;
  --c-card: #fff; --c-line: #d6d6d6; --c-focus: #101010; --c-radius: 8px; --ph-a: #e9eadf; --ph-b: #cfe79a; --ph-fg: #101010;
  font-family: system-ui, 'Segoe UI', Roboto, Arial, sans-serif;
}
.ess__top { display: flex; flex-wrap: wrap; gap: .5rem; align-items: center; justify-content: space-between; padding: .35rem clamp(1rem, 5cqw, 3rem); background: #101010; color: #fff; font-size: .85rem; --c-fg: #fff; }
.ess__top .cx-btn { min-height: 36px; padding: .2rem .9rem; --c-accent: #a3e635; }
.ess__bar { position: sticky; top: 0; z-index: 5; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .25rem 1rem; padding: .35rem clamp(1rem, 5cqw, 3rem); background: #fff; border-bottom: 1px solid var(--c-line); }
.ess__brand { background: none; border: 0; cursor: pointer; font-weight: 800; font-size: 1.1rem; min-height: 44px; }
.ess__brand::after { content: ''; display: inline-block; width: 8px; height: 8px; margin-left: .35rem; border-radius: 50%; background: #a3e635; }
.ess__hero-grid { display: grid; gap: 2rem; grid-template-columns: 1.3fr 1fr; align-items: start; }
.ess__hero-copy { display: grid; gap: 1rem; }
.ess__title { font-size: 2.2rem; font-size: clamp(1.8rem, 5cqw, 3rem); line-height: 1.1; font-weight: 800; background: linear-gradient(transparent 62%, #a3e635 62%); justify-self: start; }
.ess__lead { color: var(--c-muted); max-width: 52ch; font-size: 1.1rem; }
.ess__quick { padding: 1.25rem; border: 2px solid #101010; border-radius: 8px; display: grid; gap: 1rem; background: #fff; }
.ess__quick fieldset { border: 0; padding: 0; margin: 0; display: grid; gap: .5rem; }
.ess__quick legend { font-weight: 700; margin-bottom: .5rem; padding: 0; }
.ess__opt { display: grid; grid-template-columns: auto 1fr auto; gap: .6rem; align-items: center; min-height: 48px; padding: .4rem .75rem; border: 1px solid var(--c-line); border-radius: 6px; cursor: pointer; }
.ess__opt input { width: 20px; height: 20px; accent-color: #101010; }
.ess__opt:has(input:checked) { border-color: #101010; background: #f1f9de; }
.ess__optprice { font-size: .9rem; }
.ess__err { color: #b00020; }
.ess__h { font-size: 1.7rem; font-weight: 800; margin-bottom: 1.25rem; }
.ess__gray { background: #f5f6f2; }
.ess__svc { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
.ess__svc li { display: flex; gap: .9rem; align-items: flex-start; }
.ess__ico { flex: none; display: grid; place-items: center; width: 48px; height: 48px; border-radius: 50%; background: #a3e635; color: #101010; }
.ess__svc h4, .ess__ben h4 { font-size: 1.05rem; font-weight: 700; }
.ess__tablewrap { overflow-x: auto; border: 1px solid var(--c-line); border-radius: 8px; background: #fff; }
.ess__table { width: 100%; min-width: 640px; border-collapse: collapse; }
.ess__table th, .ess__table td { padding: 1rem; text-align: left; border-bottom: 1px solid var(--c-line); vertical-align: middle; }
.ess__table tr:last-child > * { border-bottom: 0; }
.ess__table tr.hot { background: #f1f9de; }
.ess__tag { display: block; font-size: .75rem; font-weight: 400; color: var(--c-muted); }
.ess__note { margin-top: .75rem; font-size: .9rem; }
.ess__ben { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
.ess__about, .ess__team, .ess__contact { display: grid; gap: 2rem; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); align-items: start; }
.ess__hours { margin-top: 1rem; padding: 1rem; border-left: 4px solid #a3e635; background: #f5f6f2; }
.ess__list { display: grid; gap: .75rem; }
.ess__list li { display: grid; gap: .1rem; padding-bottom: .75rem; border-bottom: 1px solid var(--c-line); }
.ess__quotes { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.ess__quotes li { padding: 1.1rem; background: #fff; border: 1px solid var(--c-line); border-radius: 8px; display: grid; gap: .5rem; }
.ess__narrow { max-width: 820px; }
.ess__dl { display: grid; grid-template-columns: auto 1fr; gap: .5rem 1rem; margin: 0 0 1rem; }
.ess__dl dt { font-weight: 700; } .ess__dl dd { margin: 0; }
.ess__ctas { margin-bottom: 1rem; }
@container (max-width: 760px) { .ess__hero-grid { grid-template-columns: 1fr; } }
.ess__teamlist { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; margin:0; padding:0; list-style:none; }
.ess__teamlist li { min-width:0; border:1px solid var(--c-line); background:var(--c-card); }
.ess__teamlist :deep(.photo) { min-height:190px; height:190px; }
.ess__teamlist li > div { display:grid; gap:.4rem; padding:.85rem; }
.ess__teamlist li strong { font-size:.95rem; }
.ess__teamlist li span { font-size:.8rem; }
@media(max-width:640px) { .ess__teamlist { grid-template-columns:1fr; } .ess__teamlist :deep(.photo) { height:240px; } }

</style>
