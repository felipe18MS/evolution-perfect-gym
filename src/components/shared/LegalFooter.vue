<template>
  <footer class="lf">
    <div class="lf__top">
      <p class="lf__brand">{{ gym.brand.name }} · {{ gym.brand.city }}</p>
      <SocialLinks />
    </div>
    <p class="lf__legal">
      © {{ year }} {{ gym.brand.name }}. Sitio de demostración: no es el sitio oficial. Precios, horarios, testimonios y enlaces son ilustrativos hasta su confirmación.
    </p>
    <div class="row">
      <button type="button" class="cx-btn cx-btn--ghost" @click="show = 'privacy'">Política de privacidad</button>
      <button type="button" class="cx-btn cx-btn--ghost" @click="show = 'terms'">Términos y condiciones</button>
    </div>

    <q-dialog :model-value="show !== null" @update:model-value="show = null">
      <q-card style="width: min(92vw, 520px)">
        <q-card-section>
          <h2 class="text-h6">{{ show === 'privacy' ? 'Política de privacidad' : 'Términos y condiciones' }}</h2>
          <p class="q-mt-sm">Texto legal pendiente. Debe ser redactado y revisado por el gimnasio y su asesor legal (en Colombia, incluye el tratamiento de datos personales conforme a la Ley 1581 de 2012) antes de publicar el sitio.</p>
        </q-card-section>
        <q-card-actions align="right"><q-btn flat label="Cerrar" v-close-popup /></q-card-actions>
      </q-card>
    </q-dialog>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import gym from 'src/data/gym';
import SocialLinks from './SocialLinks.vue';

const year = new Date().getFullYear();
const show = ref<'privacy' | 'terms' | null>(null);
</script>

<style scoped>
.lf { display: grid; gap: 1rem; padding: 2rem clamp(1rem, 5cqw, 3rem); border-top: 1px solid var(--c-line); background: var(--c-footer, var(--c-bg)); color: var(--c-fg); }
.lf__top { display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; justify-content: space-between; }
.lf__brand { font-weight: 700; }
.lf__legal { font-size: .85rem; color: var(--c-muted); max-width: 70ch; }
</style>
