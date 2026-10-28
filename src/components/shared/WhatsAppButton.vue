<template>
  <a class="cx-btn" :class="{ 'cx-btn--ghost': ghost }" :href="href" target="_blank" rel="noopener noreferrer">
    <q-icon name="fa-brands fa-whatsapp" aria-hidden="true" />
    {{ label ?? 'Escribir por WhatsApp' }}
    <span class="sr-only">(se abre en una pestaña nueva)</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import gym from 'src/data/gym';
import { buildWhatsAppUrl } from 'src/utils/format';

const props = defineProps<{ label?: string; ghost?: boolean; message?: string }>();
const href = computed(() => buildWhatsAppUrl(gym.contact.whatsappNumber, props.message ?? gym.contact.whatsappMessage));
</script>
