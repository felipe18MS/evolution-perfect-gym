import { defineConfig } from '#q-app/wrappers';

// Base pública. Local: "/". GitHub Pages de un repositorio: "/nombre-repo/".
const rawBase = process.env.BASE_PATH ?? '/';
const base = `/${rawBase.replace(/^\/+|\/+$/g, '')}/`.replace(/^\/\/$/, '/');

export default defineConfig(() => ({
  boot: [],
  css: ['app.css'],
  extras: ['material-icons', 'fontawesome-v6'],
  build: {
    target: {
      browser: ['es2022', 'firefox115', 'chrome115', 'safari15'],
      node: 'node20',
    },
    vueRouterMode: 'hash' as const,
    publicPath: base,
    env: { ASSET_BASE: base },
  },
  devServer: { open: false },
  framework: {
    config: { brand: { primary: '#101010', secondary: '#a3e635', accent: '#a3e635' } },
    plugins: [],
  },
  animations: [],
}));
