<template>
  <span class="pp">
    <strong class="pp__value">{{ priceText(plan) }}</strong>
    <span v-if="plan.priceCOP !== null" class="pp__unit">COP</span>
    <span v-if="plan.priceStatus !== 'confirmed'" class="pp__badge">{{ plan.priceStatus === 'demo' ? 'Ref. BD' : 'Pendiente' }}</span>
  </span>
</template>

<script setup lang="ts">
import type { Plan } from 'src/types/gym';
import { priceText } from 'src/utils/format';

defineProps<{ plan: Plan }>();
</script>

<style scoped>
.pp { display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: .35rem; }
.pp__value { font-size: 1.5em; line-height: 1.1; }
.pp__unit { font-size: .8em; opacity: .85; }
.pp__badge { font-size: .7rem; font-weight: 700; padding: .1rem .4rem; border: 1px solid currentColor; border-radius: 3px; }
</style>
