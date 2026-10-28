<template>
  <dl class="sch" aria-label="Horarios de atención">
    <template v-for="item in gym.contact.schedule" :key="item.label">
      <dt>{{ item.label }}</dt>
      <dd>{{ item.hours }}</dd>
    </template>
  </dl>
</template>

<script setup lang="ts">
import gym from 'src/data/gym';
</script>

<style scoped>
.sch { display: grid; grid-template-columns: auto 1fr; gap: .3rem 1rem; margin: 0; }
.sch dt { font-weight: 700; }
.sch dd { margin: 0; }
</style>
