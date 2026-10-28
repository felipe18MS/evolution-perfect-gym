<template>
  <div class="cf">
    <div v-if="sent" class="cf__done" role="status">
      <q-icon name="check_circle" size="28px" aria-hidden="true" />
      <p><strong>Mensaje de demostración validado.</strong> No se envió a ningún servidor ni a ninguna persona.</p>
      <div class="row">
        <WhatsAppButton label="Continuar por WhatsApp" :message="waMessage" />
        <button type="button" class="cx-btn cx-btn--ghost" @click="reset">Escribir otro mensaje</button>
      </div>
    </div>

    <q-form v-else ref="formRef" class="cf__form" novalidate @submit.prevent="submit">
      <q-input v-model="name" filled :dark="dark" label="Nombre completo" autocomplete="name" lazy-rules :rules="[rules.name]" />
      <q-input v-model="email" filled :dark="dark" label="Correo electrónico" type="email" autocomplete="email" lazy-rules :rules="[rules.email]" />
      <q-input v-model="phone" filled :dark="dark" label="Celular (10 dígitos)" type="tel" autocomplete="tel" hint="Ejemplo: 3001234567" lazy-rules :rules="[rules.phone]" />
      <q-input v-model="message" filled :dark="dark" label="Mensaje" type="textarea" autogrow lazy-rules :rules="[rules.message]" />
      <button type="submit" class="cx-btn">Enviar (demo)</button>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { QForm } from 'quasar';
import gym from 'src/data/gym';
import WhatsAppButton from './WhatsAppButton.vue';

defineProps<{ dark?: boolean }>();

const formRef = ref<QForm | null>(null);
const name = ref('');
const email = ref('');
const phone = ref('');
const message = ref('');
const sent = ref(false);

const rules = {
  name: (v: string): boolean | string => v.trim().length >= 3 || 'Escribe tu nombre completo.',
  email: (v: string): boolean | string => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Escribe un correo válido, por ejemplo nombre@correo.com.',
  phone: (v: string): boolean | string => /^3\d{9}$/.test(v.replace(/\s/g, '')) || 'Escribe un celular colombiano de 10 dígitos que empiece por 3.',
  message: (v: string): boolean | string => v.trim().length >= 10 || 'Cuéntanos en al menos 10 caracteres cómo podemos ayudarte.',
};

const waMessage = computed(() => `${gym.contact.whatsappMessage}\nNombre: ${name.value}`);

async function submit(): Promise<void> {
  const ok = await formRef.value?.validate();
  if (ok) sent.value = true;
}

function reset(): void {
  name.value = '';
  email.value = '';
  phone.value = '';
  message.value = '';
  sent.value = false;
}
</script>

<style scoped>
.cf__form { display: grid; gap: .5rem; }
.cf__form .cx-btn { justify-self: start; }
.cf__done { display: grid; gap: 1rem; padding: 1.25rem; border: 1px solid var(--c-accent); border-radius: var(--c-radius, 4px); }
</style>
