<template>
  <div class="cmp" role="region" tabindex="0" aria-label="Comparador de membresías. Si no cabe, desplázate horizontalmente.">
    <table>
      <caption class="sr-only">Comparación de beneficios entre planes. Valores de demostración.</caption>
      <thead>
        <tr>
          <th scope="col">Beneficio</th>
          <th v-for="p in gym.plans" :key="p.id" scope="col" :class="{ hl: p.highlight }">{{ p.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in gym.comparisonRows" :key="r.id">
          <th scope="row">{{ r.label }}</th>
          <td v-for="p in gym.plans" :key="p.id" :class="{ hl: p.highlight }">
            <template v-if="isBool(r.values[p.id])">
              <q-icon :name="r.values[p.id] ? 'check_circle' : 'remove'" size="22px" aria-hidden="true" />
              <span class="sr-only">{{ r.values[p.id] ? 'Incluido' : 'No incluido' }}</span>
            </template>
            <template v-else>{{ r.values[p.id] }}</template>
          </td>
        </tr>
        <tr>
          <th scope="row">Precio</th>
          <td v-for="p in gym.plans" :key="p.id" :class="{ hl: p.highlight }"><PlanPrice :plan="p" /></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td v-for="p in gym.plans" :key="p.id" :class="{ hl: p.highlight }">
            <button type="button" class="cx-btn" @click="emit('select', p.id)">
              Elegir<span class="sr-only"> plan {{ p.name }}</span>
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script setup lang="ts">
import gym from 'src/data/gym';
import type { PlanId } from 'src/types/gym';
import PlanPrice from './PlanPrice.vue';

const emit = defineEmits<{ select: [planId: PlanId] }>();
const isBool = (v: boolean | string): v is boolean => typeof v === 'boolean';
</script>

<style scoped>
.cmp { overflow-x: auto; border: 1px solid var(--c-line); border-radius: var(--c-radius, 4px); background: var(--c-card); color: var(--c-fg); }
table { width: 100%; min-width: 640px; border-collapse: collapse; }
th, td { padding: .85rem 1rem; text-align: center; border-bottom: 1px solid var(--c-line); vertical-align: middle; }
thead th { font-weight: 700; }
tbody th { text-align: left; font-weight: 600; }
tfoot td { border-bottom: 0; }
.hl { background: color-mix(in srgb, var(--c-accent) 16%, transparent); }
</style>
