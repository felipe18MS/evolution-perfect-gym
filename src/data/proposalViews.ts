import type { Component } from 'vue';
import type { ConceptId } from 'src/types/gym';

/** Carga diferida: solo se descarga el diseño que el usuario abre. */
export const proposalViews: Record<ConceptId, () => Promise<Component>> = {
  performance: () => import('src/components/concepts/ConceptPerformance.vue'),
  elite: () => import('src/components/concepts/ConceptElite.vue'),
  energy: () => import('src/components/concepts/ConceptEnergy.vue'),
  essential: () => import('src/components/concepts/ConceptEssential.vue'),
  local: () => import('src/components/concepts/ConceptLocal.vue'),
  studio: () => import('src/components/concepts/ConceptStudio.vue'),
  motion: () => import('src/components/concepts/ConceptMotion.vue'),
  forge: () => import('src/components/concepts/ConceptForge.vue'),
  zenith: () => import('src/components/concepts/ConceptZenith.vue'),
  pulse: () => import('src/components/concepts/ConceptPulse.vue'),
};
