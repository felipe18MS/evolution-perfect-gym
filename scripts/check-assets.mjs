// Verifica los recursos visuales: rutas locales existentes (con mayúsculas exactas),
// ausencia de rutas del equipo local y listado de URLs remotas. Uso: npm run check:assets
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = walk(join(root, 'src')).filter((f) => /\.(ts|vue|css)$/.test(f));
const publicFiles = existsSync(join(root, 'public')) ? walk(join(root, 'public')).map((f) => relative(join(root, 'public'), f).replaceAll('\\', '/')) : [];

const problems = [];
const remote = new Map();
const local = [];

for (const f of files) {
  const text = readFileSync(f, 'utf8');
  const rel = relative(root, f).replaceAll('\\', '/');
  for (const m of text.matchAll(/stock\('(photo-[\w-]+)'/g)) remote.set(`https://images.unsplash.com/${m[1]}`, (remote.get(`https://images.unsplash.com/${m[1]}`) ?? new Set()).add(rel));
  for (const m of text.matchAll(/https:\/\/images\.unsplash\.com\/photo-[^\s'"`)$]+/g)) remote.set(m[0].split('?')[0], (remote.get(m[0].split('?')[0]) ?? new Set()).add(rel));
  if (/[A-Za-z]:\\Users\\|file:\/\//.test(text)) problems.push(`${rel}: referencia a ruta del equipo local`);
  const code = text.split('\n').filter((l) => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');
  for (const m of code.matchAll(/['"`]((?:images|img|assets)\/[^'"`\s]+\.(?:jpe?g|png|webp|avif|gif|svg|mp4|woff2?))['"`]/gi)) local.push([rel, m[1]]);
}
for (const [file, ref] of local) {
  if (!publicFiles.includes(ref)) {
    const ci = publicFiles.find((p) => p.toLowerCase() === ref.toLowerCase());
    problems.push(`${file}: "${ref}" ${ci ? `existe como "${ci}" (mayúsculas distintas)` : 'no existe en public/'}`);
  }
}

console.log(`Archivos revisados: ${files.length}`);
console.log(`Referencias locales: ${local.length} | archivos en public/: ${publicFiles.length}`);
console.log(`Fotografías remotas únicas (Unsplash): ${remote.size}`);
for (const [url, where] of remote) console.log(`  - ${url}  (${[...where].join(', ')})`);
if (problems.length) {
  console.error('\nProblemas:\n' + problems.map((p) => `  x ${p}`).join('\n'));
  process.exit(1);
}
console.log('\nSin referencias locales rotas.');
