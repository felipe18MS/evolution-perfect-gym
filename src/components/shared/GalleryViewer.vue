<template>
  <p v-if="items.length === 0" class="gal__empty">Aún no hay fotografías cargadas. Agrégalas en src/data/gym.ts.</p>
  <ul v-else class="gal" :class="`gal--${variant}`">
    <li v-for="(g, i) in items" :key="g.id">
      <button :ref="(el) => setTrigger(el, i)" type="button" class="gal__item" :aria-label="`Ampliar fotografía ${i + 1}: ${g.title}`" @click="open(i)">
        <PhotoSlot :src="g.src" :alt="g.alt" :label="g.title" />
        <span class="gal__cap"><span>{{ g.title }}</span><span class="gal__zoom" aria-hidden="true">↗</span></span>
      </button>
    </li>
  </ul>

  <q-dialog v-model="isOpen" maximized transition-show="fade" transition-hide="fade" @hide="restoreFocus">
    <div class="gal__overlay" tabindex="-1" @keydown.esc.prevent="close" @keydown.left.prevent="step(-1)" @keydown.right.prevent="step(1)">
      <header class="gal__head">
        <div class="gal__heading"><span class="gal__eyebrow">GALERÍA · EVOLUTION PERFECT GYM</span><h2>{{ current?.title ?? 'Fotografía' }}</h2><p>{{ current?.alt }}</p></div>
        <div class="gal__head-actions"><span class="gal__counter" aria-live="polite">{{ index + 1 }} / {{ items.length }}</span><button type="button" class="gal__close" aria-label="Cerrar galería" @click="close">×</button></div>
      </header>
      <main class="gal__viewer" tabindex="-1" aria-label="Visor de fotografías">
        <button class="gal__arrow gal__arrow--prev" type="button" aria-label="Fotografía anterior" :disabled="items.length < 2" @click="step(-1)"><q-icon name="chevron_left" size="34px" /></button>
        <div class="gal__image-stage">
          <img v-if="current && !imageFailed" :key="current.id" :src="currentUrl" :alt="current.alt" class="gal__image" decoding="async" @load="imageLoaded = true" @error="imageFailed = true" />
          <div v-else class="gal__image-error" role="status"><q-icon name="broken_image" size="40px"/><strong>No se pudo cargar esta fotografía.</strong><span>Verifica la URL o reemplázala por una imagen local.</span></div>
          <div v-if="!imageLoaded && !imageFailed" class="gal__loading" aria-hidden="true"><q-spinner size="36px" /></div>
        </div>
        <button class="gal__arrow gal__arrow--next" type="button" aria-label="Fotografía siguiente" :disabled="items.length < 2" @click="step(1)"><q-icon name="chevron_right" size="34px" /></button>
      </main>
      <footer class="gal__foot">
        <p class="gal__hint">Usa las flechas del teclado para navegar · Esc para cerrar</p>
        <div class="gal__thumbs" aria-label="Seleccionar fotografía">
          <button v-for="(g, i) in items" :key="g.id" type="button" class="gal__thumb" :class="{ 'is-active': i === index }" :aria-label="`Ver fotografía ${i + 1}: ${g.title}`" :aria-current="i === index ? 'true' : undefined" @click="select(i)">
            <img :src="assetUrl(g.src)" :alt="''" loading="lazy" decoding="async" />
          </button>
        </div>
      </footer>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import gym from 'src/data/gym';
import PhotoSlot from './PhotoSlot.vue';
import { assetUrl } from 'src/utils/format';

withDefaults(defineProps<{ variant?: 'grid' | 'mosaic' | 'rail' }>(), { variant: 'grid' });
const items = gym.gallery;
const isOpen = ref(false);
const index = ref(0);
const imageFailed = ref(false);
const imageLoaded = ref(false);
const triggers = ref<(HTMLElement | null)[]>([]);
const current = computed(() => items[index.value]);
const currentUrl = computed(() => assetUrl(current.value?.src ?? ''));
function setTrigger(el: unknown, i: number): void {
  if (el instanceof HTMLElement) triggers.value[i] = el;
}
function open(i: number): void {
  index.value = i;
  imageFailed.value = false;
  imageLoaded.value = false;
  isOpen.value = true;
  void nextTick(() => document.querySelector<HTMLElement>('.gal__overlay')?.focus());
}
function select(i: number): void {
  index.value = i;
  imageFailed.value = false;
  imageLoaded.value = false;
}
function step(delta: number): void {
  if (items.length < 2) return;
  select((index.value + delta + items.length) % items.length);
}
function close(): void { isOpen.value = false; }
function restoreFocus(): void { void nextTick(() => triggers.value[index.value]?.focus()); }
watch(currentUrl, () => { imageFailed.value = false; imageLoaded.value = false; });
</script>

<style scoped>
.gal { display:grid; gap:.75rem; margin:0; padding:0; list-style:none; }
.gal--grid { grid-template-columns:repeat(auto-fit,minmax(200px,1fr)); }
.gal--mosaic { grid-template-columns:repeat(4,minmax(0,1fr)); grid-auto-rows:160px; }
.gal--mosaic li:first-child { grid-column:span 2; grid-row:span 2; }
.gal--rail { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; padding-bottom:.5rem; }
.gal--rail li { flex:0 0 min(260px,78%); scroll-snap-align:start; height:220px; }
.gal li { min-height:0; }
.gal__item { position:relative; display:block; width:100%; height:100%; min-height:140px; padding:0; border:0; cursor:zoom-in; overflow:hidden; background:none; border-radius:var(--c-radius,4px); }
.gal__item :deep(.photo) { transition:transform .35s ease; }
.gal__item:hover :deep(.photo) { transform:scale(1.035); }
.gal__item:focus-visible { outline:3px solid var(--c-accent,#a3e635); outline-offset:3px; }
.gal__cap { position:absolute; left:0; right:0; bottom:0; display:flex; justify-content:space-between; align-items:center; gap:.75rem; padding:.7rem .85rem; text-align:left; color:#fff; background:linear-gradient(transparent,rgba(0,0,0,.82)); font-size:.85rem; }
.gal__zoom { display:grid; place-items:center; width:28px; height:28px; border:1px solid #ffffff90; border-radius:50%; }
.gal__empty { padding:1.5rem; border:1px dashed var(--c-line); text-align:center; }
.gal__overlay { display:flex; flex-direction:column; min-height:100dvh; padding:clamp(.8rem,2.5vw,2rem); background:rgba(9,10,10,.98); color:#f6f6f2; outline:none; }
.gal__head { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; max-width:1600px; width:100%; margin:0 auto; }
.gal__eyebrow { color:#a3e635; font-size:.68rem; font-weight:800; letter-spacing:.15em; }
.gal__heading h2 { margin:.25rem 0; font-size:clamp(1.25rem,2vw,2rem); line-height:1.1; }
.gal__heading p { margin:0; color:#b9bdb7; font-size:.88rem; }
.gal__head-actions { display:flex; align-items:center; gap:1rem; }
.gal__counter { color:#d7d9d4; font-variant-numeric:tabular-nums; white-space:nowrap; }
.gal__close { width:46px; height:46px; display:grid; place-items:center; border:1px solid #555; border-radius:50%; background:#171918; color:#fff; font-size:2rem; cursor:pointer; }
.gal__close:hover { border-color:#a3e635; }
.gal__viewer { display:grid; grid-template-columns:56px minmax(0,1fr) 56px; align-items:center; gap:clamp(.5rem,2vw,2rem); flex:1; min-height:0; width:100%; max-width:1600px; margin:1.5rem auto; outline:none; }
.gal__image-stage { position:relative; display:grid; place-items:center; width:100%; height:min(67vh,calc(100dvh - 260px)); min-height:220px; overflow:hidden; background:radial-gradient(ellipse at center,#202321 0,#111312 70%); border:1px solid #343735; }
.gal__image { display:block; width:100%; height:100%; object-fit:contain; }
.gal__loading { position:absolute; inset:0; display:grid; place-items:center; color:#a3e635; pointer-events:none; }
.gal__image-error { display:grid; place-items:center; gap:.6rem; padding:2rem; color:#d0d3cd; text-align:center; }
.gal__image-error :deep(.q-icon) { color:#a3e635; }
.gal__image-error span { color:#a4aaa2; font-size:.85rem; }
.gal__arrow { display:grid; place-items:center; width:52px; height:64px; border:1px solid #454a46; border-radius:6px; background:#171918; color:#fff; cursor:pointer; }
.gal__arrow:hover:not(:disabled) { border-color:#a3e635; color:#a3e635; }
.gal__arrow:disabled { opacity:.3; cursor:not-allowed; }
.gal__foot { max-width:1600px; width:100%; margin:0 auto; }
.gal__hint { margin:0 0 .75rem; color:#9da39b; text-align:center; font-size:.72rem; }
.gal__thumbs { display:flex; justify-content:center; gap:.5rem; max-width:100%; overflow-x:auto; padding:.25rem .1rem .5rem; }
.gal__thumb { flex:none; width:76px; height:52px; padding:2px; border:1px solid #484d49; background:#171918; cursor:pointer; opacity:.65; }
.gal__thumb img { display:block; width:100%; height:100%; object-fit:cover; }
.gal__thumb.is-active { opacity:1; border:2px solid #a3e635; }
.gal__thumb:focus-visible,.gal__arrow:focus-visible,.gal__close:focus-visible { outline:3px solid #a3e635; outline-offset:3px; }
@media(max-width:640px) { .gal--mosaic { grid-template-columns:repeat(2,minmax(0,1fr)); grid-auto-rows:140px; } .gal--mosaic li:first-child { grid-column:span 2; grid-row:span 1; } .gal__overlay { padding:.75rem; } .gal__head { align-items:center; } .gal__heading p { display:none; } .gal__eyebrow { font-size:.55rem; } .gal__head-actions { gap:.5rem; } .gal__close { width:40px; height:40px; } .gal__viewer { grid-template-columns:36px minmax(0,1fr) 36px; gap:.3rem; margin:.75rem auto; } .gal__arrow { width:34px; height:48px; } .gal__arrow :deep(.q-icon) { font-size:26px !important; } .gal__image-stage { height:calc(100dvh - 235px); min-height:180px; } .gal__thumb { width:58px; height:42px; } .gal__hint { font-size:.62rem; } }
@media(prefers-reduced-motion:reduce) { .gal__item :deep(.photo) { transition:none; } }
</style>
