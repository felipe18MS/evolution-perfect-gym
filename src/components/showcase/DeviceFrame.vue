<template>
  <Teleport to="body" :disabled="!full">
    <div class="df" :class="{ 'df--full': full }">
      <div class="df__chrome">
        <span class="df__dots" aria-hidden="true"><span class="df__dot"></span><span class="df__dot"></span><span class="df__dot"></span></span>
        <span class="df__title">Vista previa simulada: {{ widthLabel }}</span>
        <div v-if="full" class="df__devices" role="group" aria-label="Tamaño de la vista previa">
          <button
            v-for="d in deviceList"
            :key="d.id"
            type="button"
            class="df__btn"
            :aria-pressed="device === d.id"
            @click="emit('update:device', d.id)"
          >
            <q-icon :name="d.icon" aria-hidden="true" /> {{ d.label }}
          </button>
        </div>
        <button
          ref="toggleBtn"
          type="button"
          class="df__btn df__btn--main"
          :aria-pressed="full"
          :aria-label="full ? 'Salir de pantalla completa' : 'Ver en pantalla completa'"
          @click="toggle"
        >
          <q-icon :name="full ? 'fullscreen_exit' : 'fullscreen'" aria-hidden="true" />
          {{ full ? 'Salir' : 'Pantalla completa' }}
        </button>
      </div>
      <div class="df__viewport" data-scroll-root tabindex="-1" :style="{ width: width }">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Device } from 'src/types/gym';

const props = defineProps<{ device: Device }>();
const emit = defineEmits<{ 'update:device': [device: Device] }>();

const widths: Record<Device, string> = { desktop: '100%', tablet: '768px', mobile: '390px' };
const labels: Record<Device, string> = { desktop: 'escritorio', tablet: 'tablet 768 px', mobile: 'móvil 390 px' };
const deviceList: { id: Device; label: string; icon: string }[] = [
  { id: 'desktop', label: 'Escritorio', icon: 'computer' },
  { id: 'tablet', label: 'Tablet', icon: 'tablet_mac' },
  { id: 'mobile', label: 'Móvil', icon: 'smartphone' },
];

const full = ref(false);
const toggleBtn = ref<HTMLButtonElement | null>(null);
const width = computed(() => widths[props.device]);
const widthLabel = computed(() => labels[props.device]);

function toggle(): void {
  full.value = !full.value;
  void nextTick(() => toggleBtn.value?.focus());
}

watch(full, (on) => {
  document.body.style.overflow = on ? 'hidden' : '';
});

function onKey(e: KeyboardEvent): void {
  // Esc sale de pantalla completa, salvo que haya un diálogo abierto (galería, checkout).
  if (e.key === 'Escape' && full.value && !document.querySelector('.q-dialog')) {
    full.value = false;
  }
}

onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.df { max-width: 1440px; margin: 0 auto; border: 2px solid #1b1b1b; border-radius: 10px; overflow: hidden; background: #d5d8dd; }
.df__chrome { display: flex; flex-wrap: wrap; align-items: center; gap: .4rem .75rem; padding: .4rem .8rem; background: #2a2a2a; color: #e5e5e5; font-size: .8rem; }
.df__dots { display: inline-flex; gap: .4rem; }
.df__dot { width: 10px; height: 10px; border-radius: 50%; background: #777; }
.df__title { margin-right: auto; }
.df__devices { display: inline-flex; gap: .3rem; }
.df__btn { display: inline-flex; align-items: center; gap: .3rem; min-height: 36px; padding: .2rem .7rem; background: transparent; color: #fff; border: 1px solid #8a8a8a; border-radius: 4px; font: inherit; cursor: pointer; }
.df__btn:hover { border-color: #a3e635; }
.df__btn[aria-pressed='true'] { background: #a3e635; color: #101010; border-color: #a3e635; font-weight: 700; }
.df__btn:focus-visible { outline: 3px solid #a3e635; outline-offset: 2px; }
.df__viewport {
  container-type: inline-size; max-width: 100%; height: 76vh; min-height: 480px; margin: 0 auto;
  overflow-y: auto; overflow-x: hidden; background: #fff; transition: width .25s ease;
}
.df--full { position: fixed; inset: 0; z-index: 2000; max-width: none; margin: 0; border: 0; border-radius: 0; display: flex; flex-direction: column; background: #1b1b1b; }
.df--full .df__viewport { flex: 1; height: auto; min-height: 0; }
</style>
