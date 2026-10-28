<template>
  <div class="pv">
    <header class="pv__bar">
      <router-link :to="{ name: 'home' }" class="pv__back"><q-icon name="arrow_back" aria-hidden="true" /> Catálogo</router-link>
      <div class="pv__title">
        <p class="pv__num">Propuesta {{ String(meta.number).padStart(2, '0') }} de {{ concepts.length }}</p>
        <h1 class="pv__h1">Evolution {{ meta.label }}</h1>
      </div>
      <nav class="pv__pager" aria-label="Cambiar de propuesta">
        <router-link :to="{ name: 'proposal', params: { id: prev.id } }" class="pv__nav" :aria-label="`Propuesta anterior: ${prev.label}`"><q-icon name="chevron_left" aria-hidden="true" /> <span>Anterior</span></router-link>
        <router-link :to="{ name: 'proposal', params: { id: next.id } }" class="pv__nav" :aria-label="`Propuesta siguiente: ${next.label}`"><span>Siguiente</span> <q-icon name="chevron_right" aria-hidden="true" /></router-link>
      </nav>
      <div class="pv__dev">
        <span id="pv-dev" class="sr-only">Tamaño de la vista previa</span>
        <q-btn-toggle v-model="device" aria-labelledby="pv-dev" unelevated no-caps dense toggle-color="black" color="white" text-color="black" :options="deviceOptions" />
      </div>
    </header>

    <main class="pv__stage">
      <DeviceFrame v-model:device="device">
        <component :is="view" :key="meta.id" @enroll="openCheckout" />
      </DeviceFrame>
    </main>

    <CheckoutDialog v-model="checkoutOpen" :plan-id="checkoutPlan" />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { concepts } from 'src/data/concepts';
import { proposalViews } from 'src/data/proposalViews';
import type { ConceptId, Device, PlanId } from 'src/types/gym';
import DeviceFrame from 'src/components/showcase/DeviceFrame.vue';
import CheckoutDialog from 'src/components/shared/CheckoutDialog.vue';

const route = useRoute();
const index = computed(() => Math.max(0, concepts.findIndex((c) => c.id === (route.params.id as ConceptId))));
const meta = computed(() => concepts[index.value]!);
const prev = computed(() => concepts[(index.value - 1 + concepts.length) % concepts.length]!);
const next = computed(() => concepts[(index.value + 1) % concepts.length]!);
const view = computed(() => defineAsyncComponent(proposalViews[meta.value.id]));

const device = ref<Device>('desktop');
const deviceOptions = [
  { value: 'desktop', label: 'Escritorio', icon: 'computer' },
  { value: 'tablet', label: 'Tablet', icon: 'tablet_mac' },
  { value: 'mobile', label: 'Móvil', icon: 'smartphone' },
];

const checkoutOpen = ref(false);
const checkoutPlan = ref<PlanId | null>(null);
function openCheckout(planId: PlanId | null): void {
  checkoutPlan.value = planId;
  checkoutOpen.value = true;
}

watchEffect(() => {
  document.title = `Evolution ${meta.value.label} | Evolution Perfect Gym`;
});
</script>

<style scoped>
.pv { min-height: 100vh; background: #e9ebe6; color: #101010; font-family: system-ui, 'Segoe UI', Roboto, Arial, sans-serif; }
.pv__bar { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1.25rem; padding: .75rem 1.25rem; background: #101010; color: #fff; border-bottom: 3px solid #a3e635; }
.pv__back, .pv__nav { display: inline-flex; align-items: center; gap: .3rem; min-height: 44px; padding: .4rem .9rem; border: 1px solid #6b6b6b; border-radius: 8px; color: #fff; text-decoration: none; font-weight: 600; }
.pv__back:hover, .pv__nav:hover { border-color: #a3e635; }
.pv__back:focus-visible, .pv__nav:focus-visible { outline: 3px solid #a3e635; outline-offset: 2px; }
.pv__title { margin-right: auto; min-width: 0; }
.pv__num { margin: 0; font-size: .8rem; color: #c9c9c9; }
.pv__h1 { margin: 0; font-size: 1.25rem; line-height: 1.2; font-weight: 800; }
.pv__pager { display: flex; gap: .5rem; }
.pv__dev :deep(.q-btn-group) { border: 1px solid #a3e635; }
.pv__stage { padding: 1rem 1rem 2rem; }
.pv__stage :deep(.df__viewport) { height: calc(100vh - 9.5rem); min-height: 520px; }
@media (max-width: 640px) {
  .pv__nav span { display: none; }
  .pv__stage { padding: .5rem .5rem 1.5rem; }
}
</style>
