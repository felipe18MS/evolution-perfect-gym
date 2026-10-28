<template>
  <div class="faq">
    <q-expansion-item
      v-for="f in gym.faqs"
      :key="f.id"
      group="faq"
      class="faq__item"
      :label="f.question"
      header-class="faq__head"
      switch-toggle-side
    >
      <p class="faq__body">{{ f.answer }}</p>
    </q-expansion-item>
  </div>
</template>

<script setup lang="ts">
import gym from 'src/data/gym';
</script>

<style scoped>
.faq { display: grid; gap: .5rem; }
.faq__item { background: var(--c-card); color: var(--c-fg); border: 1px solid var(--c-line); border-radius: var(--c-radius, 4px); }
.faq :deep(.faq__head) { min-height: 52px; font-weight: 600; color: var(--c-fg); }
.faq :deep(.q-icon) { color: var(--c-fg); }
.faq__body { padding: .25rem 1rem 1rem 3.2rem; color: var(--c-muted); }
</style>
