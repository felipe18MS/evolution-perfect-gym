<template>
  <div class="photo" :style="ratio ? { aspectRatio: ratio } : undefined">
    <img v-if="url && !failed" :src="url" :alt="alt" :loading="priority ? 'eager' : 'lazy'" :fetchpriority="priority ? 'high' : 'auto'" decoding="async" @error="failed = true" />
    <div v-else class="photo__ph" role="img" :aria-label="`Espacio para fotografía real: ${alt}`">
      <q-icon name="photo_camera" size="32px" aria-hidden="true" />
      <span>{{ label ?? 'Fotografía real pendiente' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { assetUrl } from 'src/utils/format';

const props = defineProps<{ src?: string; alt: string; label?: string; ratio?: string; priority?: boolean }>();
const url = computed(() => assetUrl(props.src ?? ''));
const failed = ref(false);
watch(url, () => { failed.value = false; });
</script>

<style scoped>
.photo { position: relative; overflow: hidden; min-height: 140px; height: 100%; background: var(--c-card); }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; }
.photo__ph {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: .5rem;
  height: 100%; min-height: inherit; padding: 1rem; text-align: center; font-size: .85rem;
  color: var(--ph-fg, #fff);
  background:
    repeating-linear-gradient(135deg, rgba(255, 255, 255, .05) 0 14px, transparent 14px 28px),
    linear-gradient(135deg, var(--ph-a, #222), var(--ph-b, #444));
}
</style>
