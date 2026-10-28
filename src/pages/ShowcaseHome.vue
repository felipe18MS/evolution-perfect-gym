<template>
  <div class="sh">
    <header class="sh__top">
      <div class="sh__wrap sh__topin">
        <span class="sh__mark" aria-hidden="true">E</span>
        <span class="sh__brand">Evolution Perfect Gym <small>Design Showcase</small></span>
      </div>
    </header>

    <section class="sh__hero" aria-labelledby="sh-title">
      <div class="sh__wrap sh__herogrid">
        <div>
          <p class="sh__kicker">Florencia, Caquetá, Colombia</p>
          <h1 id="sh-title" class="sh__title">Elige la dirección visual de Evolution Perfect Gym</h1>
          <p class="sh__lead">
            Cada propuesta es un sitio completo que puedes abrir, recorrer y probar en computador, tablet y móvil.
            Al final, el propietario decide cuál se desarrolla.
          </p>
        </div>
        <ul class="sh__stats" aria-label="Resumen del showroom">
          <li><strong>{{ concepts.length }} de 10</strong><span>propuestas cargadas</span></li>
          <li><strong>3</strong><span>tamaños de pantalla</span></li>
          <li><strong>Sin cobros</strong><span>checkout solo demostrativo</span></li>
        </ul>
      </div>
    </section>

    <main class="sh__wrap sh__main">
      <section aria-labelledby="sh-cat">
        <h2 id="sh-cat" class="sh__h2">Catálogo de propuestas</h2>
        <ul class="sh__grid">
          <li v-for="(c, i) in concepts" :key="c.id" class="card">
            <router-link :to="{ name: 'proposal', params: { id: c.id } }" class="card__cover" :aria-label="`Abrir propuesta ${c.number}: Evolution ${c.label}`" :style="{ '--bg': c.cover.bg, '--fg': c.cover.fg, '--ac': c.cover.accent, fontFamily: c.cover.fontFamily }">
              <img :src="c.cover.photo" :alt="`Fotografía de referencia de la propuesta ${c.label}`" :loading="i < 2 ? 'eager' : 'lazy'" decoding="async" @error="hide($event)" />
              <span class="card__shade" aria-hidden="true"></span>
              <span class="card__num" aria-hidden="true">{{ String(c.number).padStart(2, '0') }}</span>
              <span class="card__name" aria-hidden="true">{{ c.label }}</span>
            </router-link>
            <div class="card__body">
              <h3 class="card__title">Evolution {{ c.label }}</h3>
              <p class="card__tag">{{ c.tagline }}</p>
              <p class="card__desc">{{ c.description }}</p>
              <router-link :to="{ name: 'proposal', params: { id: c.id } }" class="btn">
                Ver propuesta <q-icon name="arrow_forward" aria-hidden="true" />
              </router-link>
            </div>
          </li>

        </ul>
      </section>

      <section class="sh__cmp" aria-labelledby="sh-cmp">
        <h2 id="sh-cmp" class="sh__h2">Comparación rápida</h2>
        <div class="sh__tablewrap" role="region" tabindex="0" aria-label="Tabla comparativa de propuestas. Desplázate horizontalmente si no cabe.">
          <table>
            <caption class="sr-only">Comparación de las propuestas disponibles</caption>
            <thead>
              <tr><th scope="col">Propuesta</th><th scope="col">Tipografía</th><th scope="col">Hero</th><th scope="col">Planes</th><th scope="col">Ideal para</th></tr>
            </thead>
            <tbody>
              <tr v-for="c in concepts" :key="c.id">
                <th scope="row"><router-link :to="{ name: 'proposal', params: { id: c.id } }">{{ c.number }}. {{ c.label }}</router-link></th>
                <td>{{ c.typography }}</td><td>{{ c.hero }}</td><td>{{ c.plansLayout }}</td><td>{{ c.bestFor }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <footer class="sh__foot">
      <div class="sh__wrap">
        <p>
          Sitio conceptual de demostración. Precios, beneficios, perfiles, testimonios, WhatsApp y redes deben confirmarse con el propietario.
          Las imágenes actuales son referencias de stock, no fotografías oficiales del gimnasio. Ningún pago es real.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { concepts } from 'src/data/concepts';

function hide(e: Event): void {
  (e.target as HTMLImageElement).style.display = 'none';
}

onMounted(() => {
  document.title = 'Evolution Perfect Gym — Design Showcase';
});
</script>

<style scoped>
.sh { min-height: 100vh; background: #f4f5f2; color: #101010; font-family: system-ui, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.55; }
.sh__wrap { width: 100%; max-width: 1200px; margin: 0 auto; padding-inline: 1.25rem; }
.sh__top { background: #101010; color: #fff; border-bottom: 3px solid #a3e635; }
.sh__topin { display: flex; align-items: center; gap: .75rem; min-height: 64px; }
.sh__mark { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 8px; background: #a3e635; color: #101010; font-weight: 800; }
.sh__brand { font-weight: 700; font-size: 1.05rem; }
.sh__brand small { display: block; font-weight: 400; font-size: .8rem; color: #c7c7c7; }
.sh__hero { background: #101010; color: #fff; padding: 3rem 0 3.5rem; }
.sh__herogrid { display: grid; gap: 2.5rem; grid-template-columns: 1.4fr 1fr; align-items: end; }
.sh__kicker { margin: 0 0 .75rem; color: #a3e635; font-weight: 600; }
.sh__title { margin: 0; font-size: 2.1rem; font-size: clamp(1.9rem, 5vw, 3.2rem); line-height: 1.1; font-weight: 800; letter-spacing: -.01em; max-width: 18ch; }
.sh__lead { margin: 1.25rem 0 0; max-width: 56ch; font-size: 1.1rem; color: #dcdcdc; }
.sh__stats { display: grid; gap: .75rem; margin: 0; padding: 0; list-style: none; }
.sh__stats li { display: flex; align-items: baseline; gap: .75rem; padding: .9rem 1.1rem; border: 1px solid #3a3a3a; border-radius: 12px; background: #181818; }
.sh__stats strong { font-size: 1.4rem; color: #a3e635; }
.sh__stats span { color: #dcdcdc; }
.sh__main { padding-block: 3rem; display: grid; gap: 3.5rem; }
.sh__h2 { margin: 0 0 1.25rem; font-size: 1.5rem; font-weight: 800; }
.sh__grid { display: grid; gap: 1.5rem; margin: 0; padding: 0; list-style: none; grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr)); }
.card { display: flex; flex-direction: column; background: #fff; border: 1px solid #d9dbd4; border-radius: 16px; overflow: hidden; transition: transform .2s ease, box-shadow .2s ease; }
.card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(16, 16, 16, .12); }
.card__cover { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; background: var(--bg); color: var(--fg); text-decoration: none; }
.card__cover img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.card__shade { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, var(--bg) 100%); opacity: .92; }
.card__num { position: absolute; top: .9rem; left: .9rem; padding: .15rem .6rem; border-radius: 999px; background: var(--ac); color: #101010; font: 700 .85rem system-ui, sans-serif; }
.card__name { position: absolute; left: 1rem; right: 1rem; bottom: .8rem; font-size: 1.8rem; line-height: 1.05; font-weight: 800; }
.card__cover:focus-visible, .btn:focus-visible, .sh a:focus-visible { outline: 3px solid #101010; outline-offset: 3px; }
.card__body { display: flex; flex-direction: column; gap: .5rem; flex: 1; padding: 1.25rem; }
.card__title { margin: 0; font-size: 1.2rem; font-weight: 800; }
.card__tag { margin: 0; font-weight: 600; color: #3b4a14; }
.card__desc { margin: 0; color: #454a42; flex: 1; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; align-self: flex-start; min-height: 46px; margin-top: .5rem; padding: .55rem 1.2rem; border-radius: 10px; background: #101010; color: #fff; font-weight: 700; text-decoration: none; transition: background .15s ease; }
.btn:hover { background: #2b3a0a; }
.card--pending { background: transparent; border: 2px dashed #b8bbb0; }
.card--pending:hover { transform: none; box-shadow: none; }
.card__num2 { margin: 0; font-weight: 800; color: #6a6f63; }
.sh__tablewrap { overflow-x: auto; background: #fff; border: 1px solid #d9dbd4; border-radius: 12px; }
.sh table { width: 100%; min-width: 760px; border-collapse: collapse; }
.sh th, .sh td { padding: .9rem 1rem; text-align: left; vertical-align: top; border-bottom: 1px solid #e4e6df; }
.sh thead th { background: #f0f2ea; font-size: .85rem; }
.sh tbody tr:last-child > * { border-bottom: 0; }
.sh th a { color: #101010; font-weight: 700; }
.sh__foot { padding: 2rem 0 3rem; border-top: 1px solid #d9dbd4; color: #4a4f45; font-size: .9rem; }
.sh__foot p { margin: 0; max-width: 80ch; }
@media (max-width: 820px) { .sh__herogrid { grid-template-columns: 1fr; } .sh__hero { padding: 2.25rem 0 2.5rem; } }
</style>
