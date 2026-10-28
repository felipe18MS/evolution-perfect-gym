import type { RouteRecordRaw } from 'vue-router';

const ids = 'performance|elite|energy|essential|local|studio|motion|forge|zenith|pulse';

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('src/pages/ShowcaseHome.vue') },
  { path: `/propuesta/:id(${ids})`, name: 'proposal', component: () => import('src/pages/ProposalView.vue') },
  // Enlaces de la versión anterior (#/elite) redirigen a la ruta nueva.
  { path: `/:id(${ids})`, redirect: (to) => ({ name: 'proposal', params: { id: String(to.params.id) } }) },
  { path: '/:catchAll(.*)*', redirect: '/' },
];

export default routes;
