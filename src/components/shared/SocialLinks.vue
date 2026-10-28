<template>
  <ul class="soc" aria-label="Redes sociales">
    <li v-for="s in gym.socials" :key="s.id">
      <a v-if="s.url" class="soc__item" :href="s.url" target="_blank" rel="noopener noreferrer">
        <q-icon :name="s.icon" aria-hidden="true" /> {{ s.label }}
        <span class="sr-only">(se abre en una pestaña nueva)</span>
      </a>
      <span v-else class="soc__item soc__item--off" :title="`${s.label}: enlace pendiente de configurar`">
        <q-icon :name="s.icon" aria-hidden="true" /> {{ s.label }}
        <small>(pendiente)</small>
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import gym from 'src/data/gym';
</script>

<style scoped>
.soc { display: flex; flex-wrap: wrap; gap: .5rem; margin: 0; padding: 0; list-style: none; }
.soc__item {
  display: inline-flex; align-items: center; gap: .4rem; min-height: 44px; padding: .4rem .9rem;
  border: 1px solid var(--c-line); border-radius: var(--c-radius, 4px); color: inherit; text-decoration: none;
}
a.soc__item:hover { border-color: var(--c-accent); }
.soc__item--off { opacity: .75; border-style: dashed; cursor: default; }
</style>
